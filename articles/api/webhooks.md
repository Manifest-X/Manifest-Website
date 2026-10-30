# Webhooks

Get told when a publish goes live or fails, instead of polling.

---

## Endpoints

A webhook endpoint is an `https` URL on your side that receives a `POST` for each event on your API account's projects. Each endpoint has its own signing secret, starting `whsec_`{copy}, shown once when the endpoint is created. To add an endpoint, email [team@manifestx.dev](mailto:team@manifestx.dev) with the URL and, optionally, the events it should receive. Without a list it receives every event.

---

## Events

| **Event**                | **Sent when**                                                                                  |
|--------------------------|------------------------------------------------------------------------------------------------|
| `publish.ready`{copy}    | A publish, content ingest, or file update is live on its environment.                          |
| `publish.failed`{copy}   | A publish stopped before it went live, including an upload that never finished within a day. What was live is unchanged. |

Each event is one JSON body with `type`, `timestamp` (ISO 8601, when the event happened), and `data`:

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

`publish.failed`{copy} carries `project_id`, `source_id`, `deployment_id`, `env`, and `error`, a short code such as `store_failed`{copy}, `ingest_failed`{copy}, `upload_expired`{copy}, or `publish_failed`{copy}. Start a new publish to recover. New fields and event types may be added, so ignore what you don't recognise.

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
