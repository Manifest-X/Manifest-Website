# Webhooks

Get told when a publish goes live or fails, a promote or rollback lands, or a project is deleted, instead of polling.

---

## Endpoints

A webhook endpoint is an `https` URL on your side that receives a `POST` for each event on the projects your API account created. Projects made outside the API don't send events. Each endpoint has its own signing secret, starting `whsec_`{copy}, shown once when the endpoint is created. An endpoint can list the events it receives; without a list it receives every event. An account can have 3 endpoints on the free allowance and 10 on a platform account, disabled endpoints included.

### Create an endpoint

```bash copy
curl -X POST https://api.manifestx.dev/v1/webhooks \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/hooks/manifest", "events": ["publish.ready", "publish.failed"]}'
```

`events`{copy} is optional: leave it out to receive every event, including types added later. The response is `201`{copy} and carries the secret once:

```json
{
  "webhook": {
    "id": "whep_…",
    "url": "https://example.com/hooks/manifest",
    "events": ["publish.ready", "publish.failed"],
    "created_at": 1762590000,
    "status": "enabled",
    "disabled_at": null,
    "disabled_reason": null,
    "delivery": {
      "last_attempt_at": null,
      "last_status": null,
      "last_error": null,
      "last_success_at": null,
      "consecutive_failures": 0,
      "failing_since": null,
      "pending": 0,
      "dead": 0
    }
  },
  "secret": "whsec_…",
  "request_id": "…"
}
```

Store the secret where your receiver reads it, for example `MANIFEST_WEBHOOK_SECRET`{copy}. It is never shown again. To replace it, delete the endpoint, then create a new one. Send an `Idempotency-Key`{copy} so a retried request returns the same endpoint and secret instead of creating a second. See [Idempotency](/docs/api/reference/idempotency).

The URL must be `https`{copy} on the default port, name a public host (such as `hooks.example.com`{copy}), and carry no username or password. IP addresses, `localhost`{copy}, and `.local`{copy} or `.internal`{copy} names are refused with `400 invalid_url`{copy}.

### List endpoints

`GET /webhooks`{copy} lists the account's endpoints, oldest first, with their delivery health. It never returns a secret.

```bash copy
curl https://api.manifestx.dev/v1/webhooks \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

`GET /webhooks/:id`{copy} returns one endpoint in the same shape, as `webhook`{copy}.

### Delete an endpoint

```bash copy
curl -X DELETE https://api.manifestx.dev/v1/webhooks/whep_… \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```json
{ "deleted": "whep_…", "request_id": "…" }
```

Nothing more is sent to it, including retries of events it hadn't yet received.

### Send a test event

```bash copy
curl -X POST https://api.manifestx.dev/v1/webhooks/whep_…/test \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```json
{ "message_id": "msg_test_…", "event": "webhook.test", "request_id": "…" }
```

The response is `202`{copy}: a `webhook.test`{copy} event is on its way to that endpoint only, signed and retried like any other event, whatever events the endpoint lists. Its `data`{copy} is `{"endpoint_id": "whep_…"}`{copy}. Use it to check your receiver verifies the signature, then watch `delivery`{copy} on the endpoint for the result.

---

## Events

| **Event**                | **Sent when**                                                                                  |
|--------------------------|------------------------------------------------------------------------------------------------|
| `publish.ready`{copy}    | A publish, content ingest, or file update is live on its environment.                          |
| `publish.failed`{copy}   | A publish stopped before it went live, including an upload that never finished within a day. What was live is unchanged. |
| `promote.done`{copy}     | What was live on staging is live on production.                                                |
| `rollback.done`{copy}    | An environment points at an earlier deployment again.                                          |
| `project.deleted`{copy}  | A project was deleted. Its sites are dark; Manifest can restore it for 30 days.               |
| `webhook.test`{copy}     | You asked for a test event. Only the endpoint under test receives it, and it can't be listed in `events`{copy}. |

Promotes and rollbacks send their event whichever way they are made: the API, Claude, or the dashboard. Each event is one JSON body with `type`, `timestamp` (ISO 8601, when the event happened), and `data`:

```json
{
  "type": "publish.ready",
  "timestamp": "2026-10-31T09:14:05.000Z",
  "data": {
    "project_id": "proj_…",
    "source_id": "site_8232",
    "deployment_id": "dep_…",
    "env": "staging",
    "url": "https://acme-docs-staging.manifestx.ai",
    "files": 42,
    "bytes": 318211
  }
}
```

Every project event carries `project_id`{copy} and `source_id`{copy}. The rest of `data`{copy}:

| **Event**                | **Also in `data`**                                                                             |
|--------------------------|------------------------------------------------------------------------------------------------|
| `publish.ready`{copy}    | `deployment_id`, `env`, `url`, `files`, `bytes`                                                |
| `publish.failed`{copy}   | `deployment_id`, `env`, `error`                                                                |
| `promote.done`{copy}     | `deployment_id` (the new production deployment), `env` (`production`), `from_deployment_id` (the staging deployment it copies), `url`, `files` |
| `rollback.done`{copy}    | `deployment_id` (now live), `env`, `previous_deployment_id` (live before), `url`              |
| `project.deleted`{copy}  | `deleted_at` and `restorable_until`, both Unix seconds                                         |

`publish.failed`{copy}'s `error` is a short code such as `store_failed`{copy}, `ingest_failed`{copy}, `upload_expired`{copy}, `storage_cap_reached`{copy} (the account's storage cap, see [Limits](/docs/api/reference/limits)), or `publish_failed`{copy}. Start a new publish to recover. `url`{copy} can be `null`{copy} when the address couldn't be read at that moment. New fields and event types may be added, so ignore what you don't recognise.

---

## Verify the signature

Requests follow [Standard Webhooks](https://www.standardwebhooks.com), so any Standard Webhooks library verifies them. Each request carries three headers:

| **Header**                    | **Value**                                                                                  |
|-------------------------------|--------------------------------------------------------------------------------------------|
| `webhook-id`{copy}            | The message id. The same on every retry of the same event.                                 |
| `webhook-timestamp`{copy}     | Unix seconds when this attempt was sent.                                                   |
| `webhook-signature`{copy}     | `v1,` and a base64 HMAC-SHA256 of `webhook-id.webhook-timestamp.body`, keyed with the base64-decoded part of the secret after `whsec_`. |

Verify against the raw request body, before parsing it:

```js copy
import express from 'express';
import { Webhook } from 'standardwebhooks';

const wh = new Webhook(process.env.MANIFEST_WEBHOOK_SECRET);
const app = express();

app.post('/hooks/manifest', express.raw({ type: 'application/json' }), (req, res) => {
  let event;
  try {
    event = wh.verify(req.body.toString('utf8'), req.headers);
  } catch {
    return res.status(400).end();
  }
  if (event.type === 'publish.ready') {
    // event.data.url is live
  }
  res.status(204).end();
});
```

```python copy
import os
from standardwebhooks.webhooks import Webhook

wh = Webhook(os.environ["MANIFEST_WEBHOOK_SECRET"])
event = wh.verify(request.get_data(), dict(request.headers))  # raises on a bad signature or stale timestamp
```

The libraries also reject a `webhook-timestamp`{copy} more than five minutes from your clock, which stops replays.

---

## Retries

Answer with any `2xx` within 10 seconds. Anything else, a timeout, or a redirect counts as a failure, and the event is sent again: one minute later, then after doubling waits (2, 4, 8 minutes and on) of at most 6 hours, for 24 hours after the event. After that it is dropped. A retry carries the same `webhook-id`{copy} and body with a new timestamp and signature.

- **Deduplicate on `webhook-id`{copy}.** Delivery is at least once: a response lost on the way back means the same event arrives again.
- **Answer first, then work.** Queue the event and return `2xx` straight away, so slow processing doesn't turn into a retry.
- **Don't rely on order.** Events can arrive out of order. Compare `timestamp`, or read the current state with [`GET /projects/:id/deployments`](/docs/api/projects/publish#list-deployments).

---

## Delivery health

Each endpoint's `delivery`{copy} shows how sending to it is going:

| **Field**                       | **Meaning**                                                                                  |
|---------------------------------|----------------------------------------------------------------------------------------------|
| `last_attempt_at`{copy}         | Unix seconds of the last attempt.                                                            |
| `last_status`{copy}             | Your HTTP status on that attempt, or `null`{copy} when there was none (a timeout or a connection error). |
| `last_error`{copy}              | Why the last attempt failed, such as `HTTP 503`{copy}; `null`{copy} after a success.         |
| `last_success_at`{copy}         | Unix seconds of the last `2xx`.                                                              |
| `consecutive_failures`{copy}    | Failed attempts in a row since the last success.                                             |
| `failing_since`{copy}           | Unix seconds of the first of those failures; `null`{copy} while healthy.                     |
| `pending`{copy}                 | Events not yet delivered and still being retried.                                            |
| `dead`{copy}                    | Events dropped in the last 30 days after 24 hours of failures.                               |

An endpoint that has failed at least 10 attempts in a row, over 3 days of continuous retries, is disabled: `status`{copy} becomes `disabled`{copy}, with `disabled_at`{copy} and `disabled_reason: "failing"`{copy}. A disabled endpoint receives nothing and can't be tested. Once your receiver is fixed, delete the disabled endpoint, then create a new one: a disabled endpoint still counts toward the cap. A single success resets the count, and so does a gap of more than 24 hours with no attempts, so neither a short outage nor a quiet spell disables an endpoint.

---

## Errors

| **Status** | **Error**                     | **When**                                                                 |
|------------|-------------------------------|--------------------------------------------------------------------------|
| 400        | `invalid_input`{copy}         | `POST /webhooks`{copy}: the body isn't `{"url", "events"?}`{copy}, or `events`{copy} names an unknown event. |
| 400        | `invalid_url`{copy}           | `POST /webhooks`{copy}: the URL isn't a public `https`{copy} address on the default port. |
| 404        | `not_found`{copy}             | No endpoint with that id in this account.                                |
| 409        | `webhook_limit`{copy}         | `POST /webhooks`{copy}: the account has 3 endpoints on the free allowance or 10 on a platform account, disabled ones included. Delete one first. |
| 409        | `endpoint_disabled`{copy}     | `POST /webhooks/:id/test`{copy}: the endpoint is disabled.               |
| 503        | `webhooks_unavailable`{copy}  | Webhooks can't be set up right now. Retry later.                         |
