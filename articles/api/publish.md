# Publish

Publish your own build, promote it, and roll it back.

---

## Publishing your own build

If you already build the site, publish the output as a zip. Any static build works from frameworks like Manifest, React, Vite, Astro, or just plain HTML. Publishing is two steps: ask the API for a one-time upload URL, then send the zip to it. Every publish lands as a new deployment, and staging and production each keep their history, so a bad release is one call away from being undone.

If you have content but no site, send the pages as Markdown instead and Manifest builds the site from its docs template. See [Content](/docs/api/projects/content).

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
| `env`{copy}        | string   | no           | `staging`{copy} (default) or `production`{copy}.                                                                                    |
| `source`{copy}     | string   | yes          | `spa`{copy} for any static build (React, Vite, Astro, plain HTML, or a Manifest app). `render`{copy} for `mnfst-render` output.     |
| `output_dir`{copy} | string   | no           | Folder inside the zip the site is served from, such as `dist`. Defaults to the zip root for `spa`{copy}, `website` for `render`{copy}. |

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

The upload URL works once and expires after 15 minutes. The token in the URL is its own authority, so the upload and the status checks need no `Authorization`{copy} header, and the machine that uploads never needs your API key. With an `Idempotency-Key`{copy}, a retried start returns the same URL instead of opening a second deployment.

---

## Upload the zip

```bash copy
curl -X POST "$UPLOAD_URL" \
  -H "x-mnfst-async: 1" \
  --data-binary @site.zip
```

With `x-mnfst-async: 1`{copy} the upload answers `202` with `"status": "ingesting"` as soon as the zip is stored. Poll `status_url`{copy} about once a second until `status`{copy} is `done`{copy} or `error`{copy}:

```json
{ "status": "done", "ok": true, "deployment_id": "dep_…", "env": "staging", "files": 42, "bytes": 318211, "url": "https://acme-docs-staging.manifestx.ai" }
```

Without the header the upload waits and answers with the same outcome. The site is live on that environment's URL the moment the status is `done`{copy}. `.env` files, `.git`, `node_modules`, and `.claude` are never published, even when they are in the zip.

| **Limit**             | **Value** |
|-----------------------|-----------|
| Zip size              | 80 MB     |
| Unzipped size         | 250 MB    |
| Largest single file   | 25 MB     |
| Files per deployment  | 10,000    |

An upload over a limit answers `413`, and an expired URL answers `410` with "Publish link expired or already used. Start a new publish." Start a new publish in either case. Sending the zip again to a URL whose upload already finished publishes nothing new: it answers with that first outcome, so a retry after a dropped response is safe.

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

Each promote copies the build into a new production deployment, so send an `Idempotency-Key`{copy}: a retry with the same key returns the first result and copies nothing.

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
| `env`{copy}           | string   | no           | `production`{copy} (default) or `staging`{copy}.                                            |
| `deployment_id`{copy} | string   | no           | The version to restore. Omit it to go back to the version before the live one. |

Rollback is instant: it points the environment back at an earlier deployment without copying anything. It answers `{ "env": "production", "live_deployment_id": "dep_…", "url": "https://acme-docs.manifestx.ai", "request_id": "…" }`. To roll forward again, roll back to the newer `deployment_id`{copy}.

---

## List deployments

```bash copy
curl "https://api.manifestx.dev/v1/projects/proj_…/deployments?env=staging" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

`env`{copy} is `production`{copy} by default. The answer lists the environment's deployments, newest first:

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

`ready`{copy} and `superseded`{copy} deployments can be restored with a rollback; `uploading`{copy} and `failed`{copy} ones can't. Each environment keeps its five most recent deployments plus the live one. Older ones are deleted when a new deployment lands, so keep your build artifacts if you need an older version.

---

## Errors

| **Status** | **`error`**             | **Meaning**                                                                                  |
|------------|-------------------------|----------------------------------------------------------------------------------------------|
| 400        | `invalid_input`{copy}         | Missing or malformed field, unknown field, or an `env`{copy} that isn't `staging`{copy} or `production`{copy}. |
| 404        | `not_found`{copy}             | No such project in your API account.                                                         |
| 404        | `unknown_deployment`{copy}    | `deployment_id`{copy} isn't one of this project's deployments for that environment.                |
| 409        | `nothing_on_staging`{copy}    | Promote with nothing live on staging. Publish to staging first.                              |
| 409        | `promote_in_progress`{copy}   | Another promote of this project is still copying. Retry shortly.                             |
| 409        | `no_earlier_version`{copy}    | Rollback without `deployment_id`{copy}, and there is no earlier version to go back to.             |
| 409        | `already_live`{copy}          | That deployment is already live.                                                             |
| 409        | `not_restorable`{copy}        | That deployment is still uploading or failed.                                                |
| 503        | `publish_unavailable`{copy}   | A publish couldn't be started. Retry shortly.                                                |
