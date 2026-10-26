# Publish

Publish your own build, read and update individual files, promote, and roll back.

---

## Publishing your own build

If you already build the site, publish the output as a zip. Any static build works from frameworks like Manifest, React, Vite, Astro, or just plain HTML. Publishing is two steps: ask the API for a one-time upload URL, then send the zip to it. Every publish lands as a new deployment, and staging and production each keep their history, so a bad release is one call away from being undone.

If you have content but no site, send the pages as Markdown instead and Manifest builds the site from its docs template. See [Content](/docs/api/projects/content).

To change a few files without sending the whole build again, [read the files](#read-files) and [update individual files](#update-individual-files).

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

The upload URL works once and expires after 15 minutes. If the build takes longer, keep the URL alive with `POST $UPLOAD_URL/renew`{copy} before it expires: each renewal keeps it working for 15 more minutes from then, up to 3 hours after the publish started, and answers `200` with `"status": "pending"`{copy} and `expires_in_seconds`{copy}. A URL that was already used or has expired answers `410` and can't be renewed. Renewals are limited to 30 a minute per IP address; over that they answer `429`. Renewing every few minutes is plenty. The token in the URL is its own authority, so the upload, the renewals, and the status checks need no `Authorization`{copy} header, and the machine that uploads never needs your API key. With an `Idempotency-Key`{copy}, a retried start returns the same URL instead of opening a second deployment.

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

Without the header the upload waits and answers with the same outcome. The site is live on that environment's URL the moment the status is `done`{copy}. `.env` files, `.git`, `node_modules`, and `.claude` are never published, even when they are in the zip. Manifest stores each file's content once per project, so a publish only stores files that changed since what's live.

| **Limit**             | **Value** |
|-----------------------|-----------|
| Zip size              | 80 MB     |
| Unzipped size         | 250 MB    |
| Largest single file   | 25 MB     |
| Files per deployment  | 10,000    |

An upload over a limit answers `413`, and an expired URL answers `410` with "Publish link expired or already used. Start a new publish." Start a new publish in either case. Sending the zip again to a URL whose upload already finished publishes nothing new: it answers with that first outcome, so a retry after a dropped response is safe.

---

## Read files

Read what is live before you change it. List the files of the live deployment, fetch the ones you need, and send your changes back as a [file update](#update-individual-files) with the listed `deployment_id`{copy} as `base`{copy}.

```bash copy
curl "https://api.manifestx.dev/v1/projects/proj_…/files?env=staging" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

| **Parameter** | **Notes** |
|---------------|-----------|
| `env`{copy} | `staging`{copy} (default) or `production`{copy}. |
| `limit`{copy} | Files per page, 1 to 1,000. Defaults to 1,000. |
| `cursor`{copy} | The `next_cursor`{copy} of the previous page. |

The answer lists the files, sorted by path:

```json
{
  "env": "staging",
  "deployment_id": "dep_…",
  "files": [
    { "path": "_redirects", "size": 64, "content_type": "application/octet-stream", "etag": "9b2e…" },
    { "path": "_redirects.json", "size": 210, "content_type": "application/json; charset=utf-8", "etag": "41c7…", "compiled_from": "_redirects" },
    { "path": "articles/intro.md", "size": 1834, "content_type": "text/markdown; charset=utf-8", "etag": "e3b0…" },
    { "path": "index.html", "size": 2210, "content_type": "text/html; charset=utf-8", "etag": "5d41…" }
  ],
  "next_cursor": null,
  "request_id": "…"
}
```

Paths start at the site root, inside `output_dir`{copy} when the build has one, exactly as a file update takes them. `etag`{copy} changes whenever a file's content does, so compare it to tell which files changed since your last read. Treat it as opaque: the same content can carry a different `etag`{copy} in versions published different ways. `precache.json`{copy} and `manifest.utilities.css`{copy} are left out because Manifest writes them on every publish. A file with `compiled_from`{copy} is compiled from that source file, so edit the source instead. If nothing is live yet, `deployment_id`{copy} is `null`{copy} and `files`{copy} is empty.

When `next_cursor`{copy} isn't `null`{copy}, send it as `cursor`{copy} for the next page. A cursor keeps reading the same deployment even if a new one goes live in the meantime, so every page comes from one version of the site.

### Read one file

```bash copy
curl "https://api.manifestx.dev/v1/projects/proj_…/files/articles/intro.md" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

The answer is the file itself, not JSON, from the deployment live on `env`{copy} (`staging`{copy} by default):

| **Header** | **Value** |
|------------|-----------|
| `Content-Type`{copy} | The file's type, such as `text/markdown; charset=utf-8`{copy} or `image/png`{copy}. |
| `ETag`{copy} | The file's `etag`{copy} from the list, in quotes. |
| `x-manifest-deployment`{copy} | The deployment the file came from. Send it as `base`{copy} with your update. |

HTML comes back as stored, without the analytics, badge, and stylesheet tags Manifest adds when it serves or publishes a page. Send `If-None-Match`{copy} with the `ETag`{copy} to get `304 Not Modified` when the file hasn't changed. Encode special characters in a path the way a browser would, such as a space as `%20`{copy}. A file that isn't in the live site, or that Manifest writes itself, answers `404 file_not_found`{copy}.

---

## Update individual files

When only a few files change, such as an article, a data file, a stylesheet, or an image, send just those files. Manifest stores only the files you send, keeps everything else that is live on staging, and publishes the result as a new staging deployment. Every file you don't send stays as it was, so an update takes about as long for a 10,000-file site as for a small one. Promote to ship the result to production.

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

The new version is live on the staging URL as soon as the answer arrives. Send its `deployment.id`{copy} as `base`{copy} on your next update. That way two editors working from the same version can't overwrite each other: the second update gets `409 base_mismatch`{copy} with the `live_deployment_id`{copy}, so [read the current files](#read-files) from staging, apply the change again, and send it with that id as `base`{copy}. Without `base`{copy}, the changes apply to whatever is live on staging. Either way, if another publish lands on staging while an update is running, the update is refused with the same `409`, and you can send it again.

Every update is a new deployment, so [rollback](#roll-back) works as for any publish. Staging keeps its five most recent deployments, so frequent updates push older versions out of reach. Send an `Idempotency-Key`{copy} so a retried update doesn't publish twice.

If nothing is live on staging yet, the files start a new site and must include `index.html`{copy}. A change that would remove `index.html`{copy} is refused. `.env` files, `.git`, `node_modules`, and `.claude` are refused, and so are `precache.json`{copy} and `manifest.utilities.css`{copy}, which Manifest writes on every publish. When the site has a `_redirects`{copy} or `_headers`{copy} file, Manifest compiles it to `_redirects.json`{copy} or `_headers.json`{copy}, so update the source file instead, or delete it in the same update. Each file update counts as a publish toward a Free project's daily limit.

HTML read back from the staging URL can be sent as is: the analytics and badge tags Manifest adds when serving a page are removed before the file is stored.

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

Each promote creates a new production deployment, so send an `Idempotency-Key`{copy}: a retry with the same key returns the first result and creates nothing. Promote doesn't copy the site's files, so even large sites promote in seconds.

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

Rollback is part of Pro: on a Free project it answers `402 pro_required`. Rollback is instant: it points the environment back at an earlier deployment without copying anything. It answers `{ "env": "production", "live_deployment_id": "dep_…", "url": "https://acme-docs.manifestx.ai", "request_id": "…" }`. To roll forward again, roll back to the newer `deployment_id`{copy}.

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
| 400        | `invalid_cursor`{copy}        | A file list `cursor`{copy} isn't valid for this project, or its deployment is gone. List again without it. |
| 400        | `invalid_path`{copy}          | A file read's path doesn't name a file, for example it ends in `/`{copy} or contains `..`{copy}.       |
| 402        | `pro_required`{copy}          | Rollback on a Free project. Upgrade the project to Pro in the dashboard.                     |
| 403        | `forbidden`{copy}             | You are a member of this project, not its owner or an admin.                                 |
| 404        | `not_found`{copy}             | No such project, or the key can't reach it.                                                  |
| 404        | `unknown_deployment`{copy}    | `deployment_id`{copy} isn't one of this project's deployments for that environment.                |
| 404        | `file_not_found`{copy}        | A file read names a file that isn't in the live site, or nothing is live on that environment yet. |
| 409        | `nothing_on_staging`{copy}    | Promote with nothing live on staging. Publish to staging first.                              |
| 409        | `promote_in_progress`{copy}   | Another promote of this project is still copying. Retry shortly.                             |
| 409        | `no_earlier_version`{copy}    | Rollback without `deployment_id`{copy}, and there is no earlier version to go back to.             |
| 409        | `already_live`{copy}          | That deployment is already live.                                                             |
| 409        | `not_restorable`{copy}        | That deployment is still uploading or failed.                                                |
| 409        | `base_mismatch`{copy}         | A file update's `base`{copy} isn't live on staging anymore. Reapply the change on `live_deployment_id`{copy}. |
| 413        | `payload_too_large`{copy}     | A file update body is over 12 MB.                                                            |
| 413        | `file_too_large`{copy}        | A file is over 8 MB. Publish it in a zip.                                                    |
| 413        | `deployment_too_large`{copy}  | The updated site would pass 250 MB or 10,000 files.                                          |
| 422        | `invalid_path`{copy}          | A path is unsafe, private, written by Manifest, compiled from `_redirects`{copy} or `_headers`{copy}, or listed twice. `field`{copy} names it. |
| 422        | `invalid_file`{copy}          | A change needs exactly one of `content`{copy}, `content_base64`{copy}, and `delete`{copy}, or its base64 is invalid. |
| 422        | `file_not_found`{copy}        | A delete names a file that isn't on staging.                                                 |
| 422        | `no_index`{copy}              | The update would leave the site without `index.html`{copy}.                                        |
| 429        | `publish_limit_reached`{copy} | A Free project's daily publish limit is reached. Wait the seconds in `Retry-After`{copy}.          |
| 500        | `update_failed`{copy}         | The update failed. The message says whether staging is unchanged, or to check [deployments](#list-deployments) before retrying. |
| 503        | `update_timed_out`{copy}      | Storing the changed files took too long, and staging is unchanged. Retry, or send fewer files per request. |
| 503        | `promote_failed`{copy}        | A promote couldn't finish, and production is unchanged. Retry shortly.                       |
| 503        | `publish_unavailable`{copy}   | A publish couldn't be started. Retry shortly.                                                |
