# Edit

Read and change a project's files.

---

## How Editing Works

Any file in a project can be changed: pages, data, `manifest.json`, styles, images, and more. Each update becomes a new deployment on staging, so you can check it before you [promote it](/docs/api/guides/publish#promote-to-production).

::: brand icon="lucide:info"
You read and change the files Manifest serves. For projects built with the Manifest framework or plain HTML, those are the files you wrote. Frameworks like React, Vite, or Astro serve compiled output instead, so change their source and [publish a new build](/docs/api/guides/publish).
:::

To start from nothing, [publish a build](/docs/api/guides/publish), or send an update that includes an `index.html`. For a documentation site from Markdown, the [Docs Template](/docs/api/guides/docs-template) builds one in a single request.

---

## Read Files

List the files of the live deployment, so you can see what to change.

<div x-code-group copy>

```bash "cURL"
curl "https://api.manifestx.dev/v1/projects/proj_…/files?env=staging" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/files?env=staging', {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `env`{copy} | string | no | `staging`{copy} (default) or `production`{copy}. |
| `limit`{copy} | number | no | Files per page, 1 to 1,000. Defaults to 1,000. |
| `cursor`{copy} | string | no | The `next_cursor`{copy} from the previous page. |

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

- **Paths** match what a file update takes, sorted by path.
- **`etag`{copy}** changes when a file's content does. Treat it as opaque: the same content can carry a different `etag`{copy} if published another way.
- **`compiled_from`{copy}** marks a file Manifest compiles. Edit the source file instead.
- **Left out:** `precache.json`{copy} and `manifest.utilities.css`{copy}, which Manifest writes on every publish.
- **Nothing live yet:** `deployment_id`{copy} is `null`{copy} and `files`{copy} is empty.
- **More pages:** send `next_cursor`{copy} as `cursor`{copy}. A cursor keeps reading the same deployment, even if a new one goes live meanwhile.

### Read One File

Fetch one file's content from the deployment live on `env`{copy} (`staging`{copy} by default).

<div x-code-group copy>

```bash "cURL"
curl "https://api.manifestx.dev/v1/projects/proj_…/files/articles/intro.md" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/files/articles/intro.md', {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
const text = await res.text()
const base = res.headers.get('x-manifest-deployment')
```

</div>

The answer is the file itself, not JSON, with these headers:

| Header | Value |
|---|---|
| `Content-Type`{copy} | The file's type, such as `text/markdown; charset=utf-8`{copy} or `image/png`{copy}. |
| `ETag`{copy} | The file's `etag`{copy} from the list, in quotes. |
| `x-manifest-deployment`{copy} | The deployment the file came from. Send it as `base`{copy} with your update. |

HTML comes back as stored, without the tags Manifest adds when serving. Send `If-None-Match`{copy} with the `ETag`{copy} to get `304 Not Modified` when nothing changed. Encode special characters in the path the way a browser would, such as a space as `%20`{copy}.

---

## Update Files

When only a few files change, send just those. Manifest keeps everything else that is live on staging and publishes the result as a new staging deployment.

<div x-code-group copy>

```bash "cURL"
curl -X PATCH https://api.manifestx.dev/v1/projects/proj_…/files \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: edit-intro-0042" \
  -H "Content-Type: application/json" \
  -d '{
    "base": "dep_…",
    "files": [
      { "path": "articles/intro.md", "content": "# Introduction\n\nUpdated text." },
      { "path": "media/logo.png", "content_base64": "iVBORw0KGgo…" },
      { "path": "articles/old.md", "delete": true }
    ]
  }'
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/files', {
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Idempotency-Key': 'edit-intro-0042',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    base: 'dep_…',
    files: [
      { path: 'articles/intro.md', content: '# Introduction\n\nUpdated text.' },
      { path: 'media/logo.png', content_base64: 'iVBORw0KGgo…' },
      { path: 'articles/old.md', delete: true },
    ],
  }),
})
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `files`{copy} | array | yes | 1 to 1,000 changes, one per path. |
| `base`{copy} | string | no | The deployment your changes start from. If staging has moved on since, nothing changes and the answer is `409 base_mismatch`{copy}. |
| `env`{copy} | string | no | Only `staging`{copy}. Promote to reach production. |

Each change has a `path`{copy} from the project root (inside `output_dir`{copy}, if the build has one) and exactly one of these:

| Field | Type | Notes |
|---|---|---|
| `content`{copy} | string | The new file as UTF-8 text, for Markdown, JSON, HTML, CSS, and other text files. |
| `content_base64`{copy} | string | The new file as standard base64, for images and other binary files. |
| `delete`{copy} | boolean | `true`{copy} removes the file. |

A path that doesn't exist yet adds a file. The answer is `201 Created`, and the new version is live on the staging URL straight away:

```json
{
  "deployment": { "id": "dep_…", "env": "staging", "status": "ready", "files": 43, "bytes": 320544, "base": "dep_…" },
  "changes": { "updated": 2, "deleted": 1 },
  "url": "https://acme-docs-staging.manifestx.ai",
  "request_id": "…"
}
```

::: negative icon="lucide:triangle-alert"
On a project built from the [Docs Template](/docs/api/guides/docs-template), the next template request rebuilds everything and replaces these changes. The answer warns with a `template_site`{copy} notice.
:::

### Avoid Overwriting Others

Send the last `deployment.id`{copy} you saw as `base`{copy}, so two editors can't overwrite each other.

1. [Read the files](#read-files) and note the `deployment_id`{copy}.
2. Send your update with that id as `base`{copy}.
3. On `409 base_mismatch`{copy}, read the files again, reapply your change, and send it with the new `live_deployment_id`{copy}.

Without `base`{copy}, changes apply to whatever is live on staging. Either way, an update is refused with the same `409` if another publish lands while it runs, and you can send it again.

### Good to Know

- **Limits.** A request can be up to 12 MB, with each file up to 8 MB after decoding. Publish larger files in a zip.
- **First publish.** If nothing is live on staging yet, the files become the project's first version and must include `index.html`{copy}. No update can remove `index.html`{copy}.
- **Refused paths.** `.env` files, `.git`, `node_modules`, `.claude`, `precache.json`{copy}, and `manifest.utilities.css`{copy} are refused.
- **Redirects and headers.** Manifest compiles `_redirects`{copy} and `_headers`{copy} into `.json` files. Update the source file, not the compiled one.
- **HTML read back is fine.** The analytics and badge tags Manifest adds when serving a page are removed before the file is stored.
- **Prerendered builds.** On `render`{copy} output, the answer carries a `prerendered_site`{copy} notice: pages built from the changed files aren't rebuilt, so publish a new build to refresh them.
- **It counts as a publish.** Each update counts toward a Free project's daily publish limit. It's also a new deployment, so frequent updates push older versions out of [rollback](/docs/api/guides/publish#roll-back) reach.
- **A rare warning.** If a follow-up step doesn't finish, the answer is still `201` with a `warning`{copy}. Don't resend it: the step completes on the next publish.
