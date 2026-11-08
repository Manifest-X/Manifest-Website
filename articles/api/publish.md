# Publish

Publish a build, take it live, and roll back.

---

## Publish a Build

If you build the project yourself, publish the output as a zip. Any static build works, from the Manifest framework or any other.

1. [Start a publish](#start-a-publish) to get a one-time upload URL.
2. [Upload the zip](#upload-the-zip) to that URL.
3. [Check the status](#check-the-status) until it's live.
4. [Promote](#promote-to-production) staging to production.

Every publish is a new deployment, so a bad release can be [rolled back](#roll-back). To change a few files without a new zip, see [Edit](/docs/api/guides/edit).

---

## Start a Publish

Get a one-time upload URL for a new deployment.

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/publish \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: build-4182-staging" \
  -H "Content-Type: application/json" \
  -d '{ "env": "staging", "source": "spa" }'
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/publish', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Idempotency-Key': 'build-4182-staging',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ env: 'staging', source: 'spa' }),
})
const { upload_url, status_url } = await res.json()
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `source`{copy} | string | yes | `spa`{copy} for any static build. `render`{copy} for `mnfst-render` output. |
| `env`{copy} | string | no | `staging`{copy} (default) or `production`{copy}. |
| `output_dir`{copy} | string | no | The folder inside the zip to serve, such as `dist`. Defaults to the zip root for `spa`{copy}, and `website` for `render`{copy}. |

The answer is `201 Created`:

```json
{
  "deployment": { "id": "dep_…", "env": "staging", "source": "spa", "output_dir": "", "status": "uploading" },
  "upload_url": "https://api.manifestx.dev/v1/uploads/put_…",
  "status_url": "https://api.manifestx.dev/v1/uploads/put_…/status",
  "expires_in_seconds": 900,
  "request_id": "…"
}
```

- **One use, 15 minutes.** The upload URL works once and expires after 15 minutes.
- **No key needed to upload.** The token in the URL is its own authority, so the machine that uploads never needs your API key.
- **Safe to retry.** With an `Idempotency-Key`{copy}, a retried start returns the same URL instead of opening a second deployment.

---

## Upload the Zip

Send the zip to `upload_url`{copy}. No `Authorization`{copy} header is needed.

<div x-code-group copy>

```bash "cURL"
curl -X POST "$UPLOAD_URL" \
  -H "x-mnfst-async: 1" \
  --data-binary @site.zip
```

```js "JavaScript"
import { readFile } from 'node:fs/promises'

const upload = await fetch(upload_url, {
  method: 'POST',
  headers: { 'x-mnfst-async': '1' },
  body: await readFile('site.zip'),
})
```

</div>

With `x-mnfst-async: 1`{copy}, the upload answers `202` as soon as the zip is stored, and you [check the status](#check-the-status) from there:

```json
{
  "status": "ingesting",
  "deployment_id": "dep_…",
  "env": "staging",
  "status_url": "https://api.manifestx.dev/v1/uploads/put_…/status",
  "poll_after_ms": 1000,
  "message": "Upload stored — publishing continues with each status poll. Poll status_url until status is \"done\"."
}
```

Without the header, the upload waits and answers with the final outcome, the same as a `done`{copy} or `error`{copy} status.

- **Limits.** A zip can be up to 80 MB, or 250 MB unzipped, with up to 10,000 files of 25 MB each. See [Limits](/docs/api/reference/limits).
- **Never published.** `.env` files, `.git`, `node_modules`, and `.claude` are skipped, even when they're in the zip.
- **Only changes are stored.** Manifest stores each file's content once per project, so a publish only stores files that changed.
- **Sending again is safe.** Sending the zip again to a finished URL publishes nothing new. It answers with the first outcome.

---

## Check the Status

Poll `status_url`{copy} about once a second until `status`{copy} is `done`{copy} or `error`{copy}.

<div x-code-group copy>

```bash "cURL"
curl "$STATUS_URL"
```

```js "JavaScript"
let status
do {
  await new Promise((r) => setTimeout(r, 1000))
  status = await (await fetch(status_url)).json()
} while (status.status === 'pending' || status.status === 'ingesting')
```

</div>

```json
{ "status": "done", "ok": true, "deployment_id": "dep_…", "env": "staging", "files": 42, "bytes": 318211, "url": "https://acme-docs-staging.manifestx.ai" }
```

| `status` | HTTP | Meaning |
|---|---|---|
| `pending`{copy} | 200 | The URL is valid, and no upload has arrived yet. |
| `ingesting`{copy} | 200 | The zip is stored and being published. `written`{copy} and `files`{copy} show progress. |
| `done`{copy} | 200 | Live on that environment's URL. |
| `error`{copy} | 200 | The publish failed. `error`{copy} and `message`{copy} say why, and `http_status`{copy} is what the upload would have answered, such as `413`. |
| `unknown`{copy} | 404 | The URL expired or doesn't exist (`unknown_token`{copy}). Start a new publish. |

::: negative icon="lucide:triangle-alert"
Keep polling until the status settles. Each poll carries the publish forward, so a large upload that nobody polls may not finish.
:::

Status reads are capped at 120 a minute per IP address. A [`publish.ready` webhook](/docs/api/guides/webhooks) can also tell your systems when a publish is live. Upload and status errors are listed in [Errors](/docs/api/reference/errors).

---

## Promote to Production

Ship exactly what is live on staging to production, with no rebuild.

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/promote \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: promote-build-4182"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/promote', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Idempotency-Key': 'promote-build-4182',
  },
})
```

</div>

```json
{
  "deployment": { "id": "dep_…", "env": "production", "files": 42 },
  "live_deployment_id": "dep_…",
  "url": "https://acme-docs.manifestx.ai",
  "request_id": "…"
}
```

Promote doesn't copy files, so even large projects promote in seconds. Each promote creates a new production deployment, so send an `Idempotency-Key`{copy}: a retry with the same key returns the first result. Some projects are also [prerendered](#prerender) after a promote.

---

## Roll Back

Point an environment back at an earlier deployment, instantly and without copying anything.

::: brand icon="lucide:info"
Rollback is part of Pro. On a Free project it answers `402 pro_required`{copy}.
:::

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/rollback \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: rollback-build-4182" \
  -H "Content-Type: application/json" \
  -d '{ "env": "production" }'
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/rollback', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Idempotency-Key': 'rollback-build-4182',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ env: 'production' }),
})
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `env`{copy} | string | no | `production`{copy} (default) or `staging`{copy}. |
| `deployment_id`{copy} | string | no | The version to restore. Omit it to go back to the version before the live one. |

```json
{ "env": "production", "live_deployment_id": "dep_…", "url": "https://acme-docs.manifestx.ai", "request_id": "…" }
```

To roll forward again, roll back to the newer `deployment_id`{copy}.

### Undo on Free

Without rollback, undo a mistake by sending the earlier version again as a new deployment:

- **Your own build:** publish the earlier zip to staging, then promote it.
- **Docs template:** send the earlier content again.
- **File updates:** send the earlier file contents, or restore deleted files.

Keep your earlier builds and content. The API only reads files from what's live now.

---

## List Deployments

See an environment's recent deployments, newest first.

<div x-code-group copy>

```bash "cURL"
curl "https://api.manifestx.dev/v1/projects/proj_…/deployments?env=staging" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/deployments?env=staging', {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `env`{copy} | string | no | `production`{copy} (default) or `staging`{copy}. |

```json
{
  "env": "staging",
  "live_deployment_id": "dep_b…",
  "deployments": [
    { "id": "dep_b…", "env": "staging", "source": "spa", "status": "ready", "is_live": true, "files": 42, "bytes": 318211, "created_at": 1760140800 },
    { "id": "dep_a…", "env": "staging", "source": "spa", "status": "superseded", "is_live": false, "files": 40, "bytes": 301877, "created_at": 1760054400 }
  ],
  "request_id": "…"
}
```

`ready`{copy} and `superseded`{copy} deployments can be restored with a rollback. `uploading`{copy} and `failed`{copy} ones can't.

Each environment keeps its five most recent deployments plus the live one, and older ones are deleted. Keep your build artifacts if you might need an older version. Production on a prerendered project keeps ten, since each promoted deployment and its prerendered copy count separately.

---

## Prerender

Some production deployments are prerendered: Manifest renders every page to static HTML in the background, then makes that live. This applies to projects built from the [Docs Template](/docs/api/guides/docs-template) and to `spa`{copy} projects with prerendering turned on.

Their promote answer includes a `prerender`{copy} object, usually `{ "status": "pending" }`{copy}. The new version is live straight away as built. The prerendered version replaces it when done, unless production has moved on.

| `prerender.status` | Meaning |
|---|---|
| `pending`{copy}, `running`{copy} | Queued or rendering. |
| `done`{copy} | The prerendered deployment is live. |
| `failed`{copy} | It didn't finish. The deployment you promoted stays live. |
| `superseded`{copy} | A newer production deployment replaced it first. |

Follow it in the [production deployment list](#list-deployments). There, `prerender`{copy} also shows `routes`{copy} (`done`{copy} and `total`{copy}) while it runs, the prerendered `deployment_id`{copy} once done, and `error`{copy} if it failed. The prerendered deployment itself has `source`{copy} `render`{copy} and `"prerender": { "status": "done", "from": "dep_…" }`{copy}.

---

## Errors

Every error code for uploads, file updates, promotes, and rollbacks is in [Errors](/docs/api/reference/errors), with what to do.
