# Webhooks

Get told when a publish goes live or fails, instead of polling.

---

## Set Up an Endpoint

A webhook endpoint is an `https` URL on your side. It receives a `POST` for each event on the projects your API keys created. Your other projects send no events.

To add one, email [team@manifestx.dev](mailto:team@manifestx.dev) with the URL, your account `id` from [`GET /me`](/docs/api/reference/authentication#send-the-key), and, optionally, which events it should receive. Without a list, it receives every event. Each endpoint gets its own signing secret, starting `whsec_`{copy}, shown once.

### Test It

Once the endpoint is set up, publish to staging on a project your keys created. A [file update](/docs/api/guides/edit#update-files) is the quickest. A `publish.ready` event should arrive within a minute. If it doesn't, check that your endpoint answers `2xx` and verifies the signature.

---

## Events

| Event | Sent when |
|---|---|
| `publish.ready`{copy} | A publish, content request, or file update is live on its environment. |
| `publish.failed`{copy} | A publish stopped before going live, including an upload not finished within a day. What was live is unchanged. |

Events come from every publish of those projects, including ones made from Claude. Promotes and rollbacks send no event. New fields and event types may be added, so ignore what you don't recognise.

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

</div>

On `publish.failed`{copy}, `error`{copy} is a short code: `store_failed`{copy}, `ingest_failed`{copy}, `upload_expired`{copy}, `storage_cap_reached`{copy} (see [Limits](/docs/api/reference/limits)), or `publish_failed`{copy}. Start a new publish to recover.

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
