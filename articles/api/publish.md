# Publish

Publish your own build, update individual files, promote, and roll back.

---

## Publishing your own build

If you already build the site, publish the output as a zip. Any static build works from frameworks like Manifest, React, Vite, Astro, or just plain HTML. Publishing is two steps: ask the API for a one-time upload URL, then send the zip to it. Every publish lands as a new deployment, and staging and production each keep their history, so a bad release is one call away from being undone.

If you have content but no site, send the pages as Markdown instead and Manifest builds the site from its docs template. See [Content](/docs/api/projects/content).

To change a few files without sending the whole build again, [update individual files](#update-individual-files).

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

## Update individual files

When only a few files change, such as an article, a data file, a stylesheet, or an image, send just those files. Manifest copies what is live on staging, applies your changes, and publishes the result as a new staging deployment. Every file you don't send stays as it was. Promote to ship the result to production.

```bash copy
curl -X PATCH https://api.manifestx.dev/v1/projects/proj_…/files \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: edit-intro-0042" \
  -H "Content-Type: application/json" \
  -d '{
    "base": "dep_…",
    "files": [
      { "path": "articles/intro.md", "content": "# Introduction\n\nUpdated text." },
      { "path": "data/team.yaml", "content": "- name: Ada\n  role: Editor\n" },
      { "path": "media/logo.png", "content_base64": "iVBORw0KGgo…" },
      { "path": "articles/old.md", "delete": true }
    ]
  }'
```

| **Field** | **Type** | **Required** | **Notes** |
|-----------|----------|--------------|-----------|
| `env`{copy} | string | no | `staging`{copy}, the default and only value. Promote to reach production. |
| `base`{copy} | string | no | The deployment your changes start from, usually the `deployment.id`{copy} of your last update. If staging has moved on since, nothing changes and the answer is `409`. |
| `files`{copy} | array | yes | 1 to 1,000 changes, one per path. |

Each change has a `path`{copy} and exactly one of these:

| **Field** | **Type** | **Notes** |
|-----------|----------|-----------|
| `content`{copy} | string | The new file as UTF-8 text, for Markdown, YAML, JSON, CSV, HTML, CSS, and other text files. |
| `content_base64`{copy} | string | The new file as standard base64, for images and other binary files. |
| `delete`{copy} | boolean | `true`{copy} removes the file. |

`path`{copy} starts at the site root, so `articles/intro.md`{copy} is served at `/articles/intro.md`. If the build was published with an `output_dir`{copy}, paths start inside that folder. A path that doesn't exist yet adds a file.

The answer is `201 Created`:

```json
{
  "deployment": { "id": "dep_…", "env": "staging", "status": "ready", "files": 43, "bytes": 320544, "base": "dep_…" },
  "changes": { "updated": 3, "deleted": 1 },
  "url": "https://acme-docs-staging.manifestx.ai",
  "request_id": "…"
}
```

The new version is live on the staging URL as soon as the answer arrives. Send its `deployment.id`{copy} as `base`{copy} on your next update. That way two editors working from the same version can't overwrite each other: the second update gets `409 base_mismatch`{copy} with the `live_deployment_id`{copy}, so read the current files from staging, apply the change again, and send it with that id as `base`{copy}. Without `base`{copy}, the changes apply to whatever is live on staging. Either way, if another publish lands on staging while an update is running, the update is refused with the same `409`, and you can send it again.

Every update is a new deployment, so [rollback](#roll-back) works as for any publish. Staging keeps its five most recent deployments, so frequent updates push older versions out of reach. Send an `Idempotency-Key`{copy} so a retried update doesn't publish twice.

If nothing is live on staging yet, the files start a new site and must include `index.html`{copy}. A change that would remove `index.html`{copy} is refused. `.env` files, `.git`, `node_modules`, and `.claude` are refused, and so are the files Manifest writes on every publish: `precache.json`{copy}, `manifest.utilities.css`{copy}, `_redirects.json`{copy}, and `_headers.json`{copy}. To change redirects or headers, update `_redirects`{copy} or `_headers`{copy}.

Some sites carry a `notices`{copy} list in the answer:

| **Notice** | **Meaning** |
|------------|-------------|
| `template_site`{copy} | The site was built by [Content](/docs/api/projects/content). The next content request rebuilds the whole site and replaces these changes. |
| `prerendered_site`{copy} | The build is `render`{copy} output. Pages prerendered from the changed files are not rebuilt, so publish a new build to refresh them. |

| **Limit**             | **Value** |
|-----------------------|-----------|
| Request body          | 12 MB     |
| Largest single file   | 8 MB, after base64 decoding. Publish larger files in a zip. |
| Changes per request   | 1,000     |
| Resulting deployment  | The zip limits: 250 MB and 10,000 files |

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
| 400        | `staging_only`{copy}          | A file update sent `env`{copy} `production`{copy}. Update staging, then promote.              |
| 404        | `not_found`{copy}             | No such project in your API account.                                                         |
| 404        | `unknown_deployment`{copy}    | `deployment_id`{copy} isn't one of this project's deployments for that environment.                |
| 409        | `nothing_on_staging`{copy}    | Promote with nothing live on staging. Publish to staging first.                              |
| 409        | `promote_in_progress`{copy}   | Another promote of this project is still copying. Retry shortly.                             |
| 409        | `no_earlier_version`{copy}    | Rollback without `deployment_id`{copy}, and there is no earlier version to go back to.             |
| 409        | `already_live`{copy}          | That deployment is already live.                                                             |
| 409        | `not_restorable`{copy}        | That deployment is still uploading or failed.                                                |
| 409        | `base_mismatch`{copy}         | A file update's `base`{copy} isn't live on staging anymore. Reapply the change on `live_deployment_id`{copy}. |
| 413        | `payload_too_large`{copy}     | A file update body is over 12 MB.                                                            |
| 413        | `file_too_large`{copy}        | A file is over 8 MB. Publish it in a zip.                                                    |
| 413        | `deployment_too_large`{copy}  | The updated site would pass 250 MB or 10,000 files.                                          |
| 422        | `invalid_path`{copy}          | A path is unsafe, private, written by Manifest, or listed twice. `field`{copy} names it.           |
| 422        | `invalid_file`{copy}          | A change needs exactly one of `content`{copy}, `content_base64`{copy}, and `delete`{copy}, or its base64 is invalid. |
| 422        | `file_not_found`{copy}        | A delete names a file that isn't on staging.                                                 |
| 422        | `no_index`{copy}              | The update would leave the site without `index.html`{copy}.                                        |
| 500        | `update_failed`{copy}         | The update failed before going live, and staging is unchanged. Retry.                        |
| 503        | `publish_unavailable`{copy}   | A publish couldn't be started. Retry shortly.                                                |
