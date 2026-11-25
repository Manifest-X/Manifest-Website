# Webhooks

Get told when a publish goes live or fails, a promote or rollback lands, or a project is deleted, instead of polling.

---

## Set Up an Endpoint

A webhook endpoint is an `https` URL on your side. It receives a `POST` for each event on the projects your API keys created. Your other projects send no events.

Each endpoint has its own signing secret, starting `whsec_`{copy}, shown once when the endpoint is created. An account can have 3 endpoints on the free allowance and 10 on Enterprise, counting disabled ones.

### Create an Endpoint

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/webhooks \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: add-webhook-prod-1" \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://example.com/hooks/manifest", "events": ["publish.ready", "publish.failed"] }'
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/webhooks', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Idempotency-Key': 'add-webhook-prod-1',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com/hooks/manifest',
    events: ['publish.ready', 'publish.failed'],
  }),
})
const { webhook, secret } = await res.json()
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `url`{copy} | string | yes | Where events are sent. See the rules below. |
| `events`{copy} | array | no | The [events](#events) to receive. Omit it to receive every event, including types added later. |

The response is `201` and carries the secret once:

```json
{
  "webhook": {
    "id": "whep_…",
    "url": "https://example.com/hooks/manifest",
    "events": ["publish.ready", "publish.failed"],
    "created_at": 1793437200,
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

- **Store the secret** where your receiver reads it, such as `MANIFEST_WEBHOOK_SECRET`{copy}. It is never shown again. To replace it, delete the endpoint, then create a new one.
- **Send an `Idempotency-Key`{copy}** so a retried request returns the same endpoint and secret instead of creating a second. See [Idempotency](/docs/api/reference/errors#idempotency).
- **`events`{copy}** is `null`{copy} on an endpoint that receives every event.
- **The URL** must be `https`{copy} on the default port, with no username or password. It must name a public host, such as `hooks.example.com`{copy}. IP addresses, single-label names, names ending in a dot, `localhost`{copy}, `localhost.localdomain`{copy}, and names ending in `.localhost`{copy}, `.local`{copy} or `.internal`{copy} answer `400 invalid_url`{copy}.

### List Endpoints

`GET /webhooks`{copy} lists the account's endpoints, oldest first, each with its [delivery health](#delivery-health). It never returns a secret.

<div x-code-group copy>

```bash "cURL"
curl https://api.manifestx.dev/v1/webhooks \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/webhooks', {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
const { webhooks } = await res.json()
```

</div>

```json
{
  "webhooks": [
    {
      "id": "whep_…",
      "url": "https://example.com/hooks/manifest",
      "events": null,
      "created_at": 1793437200,
      "status": "enabled",
      "disabled_at": null,
      "disabled_reason": null,
      "delivery": {
        "last_attempt_at": 1793440800,
        "last_status": 204,
        "last_error": null,
        "last_success_at": 1793440800,
        "consecutive_failures": 0,
        "failing_since": null,
        "pending": 0,
        "dead": 0
      }
    }
  ],
  "request_id": "…"
}
```

`GET /webhooks/:id`{copy} returns one endpoint in the same shape, as `webhook`{copy}.

### Delete an Endpoint

<div x-code-group copy>

```bash "cURL"
curl -X DELETE https://api.manifestx.dev/v1/webhooks/whep_… \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
await fetch(`https://api.manifestx.dev/v1/webhooks/${webhookId}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
```

</div>

```json
{ "deleted": "whep_…", "request_id": "…" }
```

Nothing more is sent to it, including retries of events it hadn't received yet.

### Test It

Send a test event to check that your receiver answers `2xx` and verifies the signature.

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/webhooks/whep_…/test \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch(`https://api.manifestx.dev/v1/webhooks/${webhookId}/test`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
const { message_id } = await res.json()
```

</div>

```json
{ "message_id": "msg_test_…", "event": "webhook.test", "request_id": "…" }
```

The response is `202`: a `webhook.test`{copy} event is on its way to that endpoint only, whatever events it lists. It is signed and retried like any other event, and `message_id`{copy} is its `webhook-id`{copy} header. Read the endpoint again to see the result under `delivery`{copy}.

---

## Events

| Event | Sent when |
|---|---|
| `publish.ready`{copy} | A publish, content request, or file update is live on its environment. |
| `publish.failed`{copy} | A publish stopped before going live, including an upload not finished within a day. What was live is unchanged. |
| `promote.done`{copy} | A staging deployment is live on production: what staging served, or the one the promote named. |
| `rollback.done`{copy} | An environment points at an earlier deployment again. |
| `project.deleted`{copy} | A project was deleted. Its sites are offline, and Manifest can restore it for 30 days. |
| `webhook.test`{copy} | You [asked for a test event](#test-it). Only that endpoint receives it, and it can't be listed in `events`{copy}. |

Publishes, promotes, and rollbacks send their events whether they're made through the API, from Claude, or in the dashboard. Deletes send theirs from the API or the dashboard. New fields and event types may be added, so ignore what you don't recognise.

---

## Payload

Each event is one JSON body with `type`{copy}, `timestamp`{copy} (ISO 8601, when it happened), and `data`{copy}.

<div x-code-group>

```json "publish.ready"
{
  "type": "publish.ready",
  "timestamp": "2026-10-31T09:14:05.000Z",
  "data": {
    "project_id": "proj_…",
    "source_id": "site_8232",
    "deployment_id": "dep_…",
    "env": "staging",
    "label": "v2.4.0",
    "url": "https://acme-docs-staging.manifestx.ai",
    "files": 42,
    "bytes": 318211
  }
}
```

```json "publish.failed"
{
  "type": "publish.failed",
  "timestamp": "2026-10-31T09:14:05.000Z",
  "data": {
    "project_id": "proj_…",
    "source_id": "site_8232",
    "deployment_id": "dep_…",
    "env": "staging",
    "error": "upload_expired"
  }
}
```

```json "promote.done"
{
  "type": "promote.done",
  "timestamp": "2026-10-31T09:14:05.000Z",
  "data": {
    "project_id": "proj_…",
    "source_id": "site_8232",
    "deployment_id": "dep_…",
    "env": "production",
    "from_deployment_id": "dep_…",
    "label": "v2.4.0",
    "url": "https://acme-docs.manifestx.ai",
    "files": 42
  }
}
```

```json "rollback.done"
{
  "type": "rollback.done",
  "timestamp": "2026-10-31T09:14:05.000Z",
  "data": {
    "project_id": "proj_…",
    "source_id": "site_8232",
    "deployment_id": "dep_…",
    "env": "production",
    "previous_deployment_id": "dep_…",
    "url": "https://acme-docs.manifestx.ai"
  }
}
```

```json "project.deleted"
{
  "type": "project.deleted",
  "timestamp": "2026-10-31T09:14:05.000Z",
  "data": {
    "project_id": "proj_…",
    "source_id": "site_8232",
    "deleted_at": 1793438045,
    "restorable_until": 1796030045
  }
}
```

```json "webhook.test"
{
  "type": "webhook.test",
  "timestamp": "2026-10-31T09:14:05.000Z",
  "data": {
    "endpoint_id": "whep_…"
  }
}
```

</div>

- **`publish.failed`{copy}:** `error`{copy} is a short code, such as `upload_expired`{copy}, `storage_cap_reached`{copy} (see [Limits](/docs/api/reference/limits)), `store_failed`{copy}, `ingest_failed`{copy}, `bad_zip`{copy}, `too_large`{copy}, or `publish_failed`{copy}. Treat any other code as a failure too. Start a new publish to recover.
- **`promote.done`{copy}:** `deployment_id`{copy} is the new production deployment, and `from_deployment_id`{copy} is the staging deployment it was made from. `files`{copy} is the number of files the production deployment serves. `label`{copy} is the staging deployment's label.
- **`rollback.done`{copy}:** `deployment_id`{copy} is live now, and `previous_deployment_id`{copy} was live before. `env`{copy} is `production`{copy} or `staging`{copy}.
- **`project.deleted`{copy}:** `deleted_at`{copy} and `restorable_until`{copy} are Unix seconds. It is sent once per delete.
- **`label`{copy}** on `publish.ready`{copy} and `promote.done`{copy} is the name the deployment was published with, or `null`{copy}.
- **`url`{copy}** can be `null`{copy} when the address couldn't be read at that moment.

---

## Verify the Signature

Requests follow <a href="https://www.standardwebhooks.com" target="_blank">Standard Webhooks</a>, so any Standard Webhooks library verifies them. Verify against the raw request body, before parsing it.

<div x-code-group copy>

```js "Node (Express)"
import express from 'express'
import { Webhook } from 'standardwebhooks'

const wh = new Webhook(process.env.MANIFEST_WEBHOOK_SECRET)
const app = express()

app.post('/hooks/manifest', express.raw({ type: 'application/json' }), (req, res) => {
  let event
  try {
    event = wh.verify(req.body.toString('utf8'), req.headers)
  } catch {
    return res.status(400).end()
  }
  if (event.type === 'publish.ready') {
    // event.data.url is live
  }
  res.status(204).end()
})
```

```python "Python (Flask)"
import os
from flask import Flask, request
from standardwebhooks.webhooks import Webhook

wh = Webhook(os.environ["MANIFEST_WEBHOOK_SECRET"])
app = Flask(__name__)

@app.post("/hooks/manifest")
def manifest_hook():
    try:
        event = wh.verify(request.get_data(), dict(request.headers))
    except Exception:
        return "", 400
    if event["type"] == "publish.ready":
        pass  # event["data"]["url"] is live
    return "", 204
```

</div>

The libraries also reject a timestamp more than five minutes from your clock, which stops replays. Each request carries three headers:

| Header | Value |
|---|---|
| `webhook-id`{copy} | The message id. The same on every retry of the same event. |
| `webhook-timestamp`{copy} | Unix seconds when this attempt was sent. |
| `webhook-signature`{copy} | `v1,` and a base64 HMAC-SHA256 of `webhook-id.webhook-timestamp.body`, keyed with the base64-decoded part of the secret after `whsec_`. |

---

## Retries

Answer with any `2xx` within 10 seconds. Anything else, a timeout, or a redirect counts as a failure, and the event is sent again.

Retries start after one minute, then wait twice as long each time (2, 4, 8 minutes and on), up to 6 hours apart. They stop 24 hours after the event. A retry has the same `webhook-id`{copy} and body, with a new timestamp and signature.

- **Deduplicate on `webhook-id`{copy}.** Delivery is at least once, so the same event can arrive twice.
- **Answer first, then work.** Queue the event and return `2xx` straight away, so slow processing doesn't cause a retry.
- **Don't rely on order.** Events can arrive out of order. Compare `timestamp`{copy}, or read the current state from [List Deployments](/docs/api/guides/publish#list-deployments).

---

## Delivery Health

Each endpoint's `delivery`{copy} shows how sending to it is going.

| Field | Meaning |
|---|---|
| `last_attempt_at`{copy} | Unix seconds of the last attempt. |
| `last_status`{copy} | Your HTTP status on that attempt, or `null`{copy} when there was none, such as a timeout or a connection error. |
| `last_error`{copy} | Why the last attempt failed, such as `HTTP 503`{copy}. `null`{copy} after a success. |
| `last_success_at`{copy} | Unix seconds of the last `2xx`. |
| `consecutive_failures`{copy} | Failed attempts in a row since the last success. |
| `failing_since`{copy} | Unix seconds of the first of those failures. `null`{copy} while healthy. |
| `pending`{copy} | Events not yet delivered and still being retried. |
| `dead`{copy} | Events given up on in the last 30 days: retried for 24 hours without a `2xx`, or still waiting when the endpoint was disabled. |

### Disabled Endpoints

An endpoint is disabled once it has failed at least 10 attempts in a row and the first of those failures is 3 or more days old. `status`{copy} becomes `disabled`{copy}, with `disabled_at`{copy} and `"disabled_reason": "failing"`{copy}.

- **A disabled endpoint** receives nothing, and a test answers `409 endpoint_disabled`{copy}.
- **To recover,** fix your receiver, delete the disabled endpoint, then create a new one. A disabled endpoint still counts toward the cap.
- **The count resets** on a single success, and after more than 24 hours with no attempts. A short outage or a quiet spell doesn't disable an endpoint.

---

## Errors

Every error has the [same shape](/docs/api/reference/errors). These are the ones specific to webhook endpoints.

| Status | `error` | Meaning |
|---|---|---|
| 400 | `invalid_input`{copy} | On create: the body isn't `{"url", "events"?}`{copy}, `events`{copy} is empty or names an unknown event, or a field is unknown. |
| 400 | `invalid_url`{copy} | On create: the URL isn't a public `https`{copy} address on the default port. The message says why. |
| 404 | `not_found`{copy} | No endpoint with that id in this account. |
| 409 | `webhook_limit`{copy} | On create: the account has its 3 endpoints on the free allowance, or 10 on Enterprise, counting disabled ones. Delete one first. |
| 409 | `endpoint_disabled`{copy} | On a test: the endpoint is disabled. Create a new one. |
| 503 | `webhooks_unavailable`{copy} | Webhooks are briefly unavailable. Retry later. |

Idempotency errors are on [Errors](/docs/api/reference/errors#idempotency).
