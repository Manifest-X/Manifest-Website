# Publish

Publish your own build, promote it, and roll it back.

---

## Publishing your own build

If you already build the site, publish the output as a zip. Publishing is two steps: ask the API for a one-time upload URL, then send the zip to it. Every publish lands as a new deployment, and staging and production each keep their history, so a bad release is one call away from being undone.

If you have content but no build, send it as JSON instead. See [Content](/docs/api/projects/content).

---

## Start a publish

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/publish \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: build-4182-staging" \
  -H "Content-Type: application/json" \
  -d '{ "env": "staging", "source": "spa" }'
```

| **Field**    | **Type** | **Required** | **Notes**                                                                                                               |
|--------------|----------|--------------|-------------------------------------------------------------------------------------------------------------------------|
| `env`        | string   | no           | `staging` (default) or `production`.                                                                                    |
| `source`     | string   | yes          | `spa` for any static build (React, Vite, Astro, plain HTML, or a Manifest app). `render` for `mnfst-render` output.     |
| `output_dir` | string   | no           | Folder inside the zip the site is served from, such as `dist`. Defaults to the zip root for `spa`, `website` for `render`. |

The answer is `201 Created`:

```json
{
  "deployment": { "id": "dep_…", "env": "staging", "source": "spa", "output_dir": "", "status": "uploading" },
  "upload_url": "https://mcp.manifestx.dev/publish/put_…",
  "status_url": "https://mcp.manifestx.dev/publish/put_…/status",
  "expires_in_seconds": 900,
  "request_id": "…"
}
```

The upload URL works once and expires after 15 minutes. It carries its own authority, so the machine that uploads never needs your API key. With an `Idempotency-Key`, a retried start returns the same URL instead of opening a second deployment.

---

## Upload the zip

```bash copy
curl -X POST "$UPLOAD_URL" \
  -H "x-mnfst-async: 1" \
  --data-binary @site.zip
```

With `x-mnfst-async: 1` the upload answers `202` with `"status": "ingesting"` as soon as the zip is stored. Poll `status_url` about once a second until `status` is `done` or `error`:

```json
{ "status": "done", "ok": true, "deployment_id": "dep_…", "env": "staging", "files": 42, "bytes": 318211, "url": "https://acme-docs-staging.manifestx.ai" }
```

Without the header the upload waits and answers with the same outcome. The site is live on that environment's URL the moment the status is `done`. `.env` files, `.git`, `node_modules`, and `.claude` are never published, even when they are in the zip.

| **Limit**             | **Value** |
|-----------------------|-----------|
| Zip size              | 80 MB     |
| Unzipped size         | 250 MB    |
| Largest single file   | 25 MB     |
| Files per deployment  | 10,000    |

An upload over a limit answers `413` and an expired URL answers `410`; start a new publish in either case. Sending the zip again to a URL whose upload already finished publishes nothing new: it answers with that first outcome, so a retry after a dropped response is safe.

---

## Promote staging to production

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/promote \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: promote-build-4182"
```

Promote ships exactly what is live on staging to production, with no rebuild:

```json
{
  "deployment": { "id": "dep_…", "env": "production", "files": 42 },
  "live_deployment_id": "dep_…",
  "url": "https://acme-docs.manifestx.ai",
  "request_id": "…"
}
```

Each promote copies the build into a new production deployment, so send an `Idempotency-Key`: a retry with the same key returns the first result and copies nothing.

---

## Roll back

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/rollback \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "env": "production" }'
```

| **Field**       | **Type** | **Required** | **Notes**                                                                       |
|-----------------|----------|--------------|---------------------------------------------------------------------------------|
| `env`           | string   | no           | `production` (default) or `staging`.                                            |
| `deployment_id` | string   | no           | The version to restore. Omit it to go back to the version before the live one. |

Rollback is instant: it points the environment back at an earlier deployment without copying anything. It answers `{ "env": "production", "live_deployment_id": "dep_…", "url": "https://acme-docs.manifestx.ai", "request_id": "…" }`. To roll forward again, roll back to the newer `deployment_id`.

---

## List deployments

```bash copy
curl "https://api.manifestx.dev/v1/projects/proj_…/deployments?env=staging" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

`env` is `production` by default. The answer lists the environment's deployments, newest first:

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

`ready` and `superseded` deployments can be restored with a rollback; `uploading` and `failed` ones can't. Each environment keeps its five most recent deployments plus the live one. Older ones are deleted when a new deployment lands, so keep your build artifacts if you need an older version.

---

## Errors

| **Status** | **`error`**             | **Meaning**                                                                                  |
|------------|-------------------------|----------------------------------------------------------------------------------------------|
| 400        | `invalid_input`         | Missing or malformed field, unknown field, or an `env` that isn't `staging` or `production`. |
| 404        | `not_found`             | No such project in your API account.                                                         |
| 404        | `unknown_deployment`    | `deployment_id` isn't one of this project's deployments for that environment.                |
| 409        | `nothing_on_staging`    | Promote with nothing live on staging. Publish to staging first.                              |
| 409        | `promote_in_progress`   | Another promote of this project is still copying. Retry shortly.                             |
| 409        | `no_earlier_version`    | Rollback without `deployment_id`, and there is no earlier version to go back to.             |
| 409        | `already_live`          | That deployment is already live.                                                             |
| 409        | `not_restorable`        | That deployment is still uploading or failed.                                                |
| 503        | `publish_unavailable`   | A publish couldn't be started. Retry shortly.                                                |
