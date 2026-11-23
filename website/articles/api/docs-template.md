# Docs Template

Generate a documentation site from Markdown pages in one request.

---

## Send Pages

Send a name, a theme, navigation groups, and Markdown pages, and Manifest builds a documentation site from its docs template. There's no build step on your side.

The template is a shortcut. For your own navigation, files, images, and design, [publish your own build](/docs/api/guides/publish) instead.

::: negative icon="lucide:triangle-alert"
Each request replaces the whole site on that environment. Send every page each time, not only the ones that changed.
:::

Save the content as `content.json`:

```json "content.json" copy
{
  "template": "docs",
  "env": "staging",
  "site": {
    "name": "Acme Help",
    "description": "Answers for Acme customers.",
    "theme": {
      "tokens": { "color-brand-surface": "oklch(55% 0.2 260)" },
      "dark": { "color-brand-surface": "#6677ff" }
    }
  },
  "groups": [{ "slug": "start", "description": "First steps with Acme." }],
  "articles": [
    { "group": "Getting started", "group_slug": "start", "title": "Welcome", "slug": "welcome", "markdown": "Hello from Acme.", "order": 1 },
    { "group": "Billing", "title": "Invoices", "slug": "invoices", "markdown": "## Download\n\nUse the portal.", "icon": "lucide:receipt" }
  ]
}
```

Then send it:

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/content \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: help-center-sync-0193" \
  -H "Content-Type: application/json" \
  -d @content.json
```

```js "JavaScript"
import { readFile } from 'node:fs/promises'

const res = await fetch(`https://api.manifestx.dev/v1/projects/${projectId}/content`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Idempotency-Key': 'help-center-sync-0193',
    'Content-Type': 'application/json',
  },
  body: await readFile('content.json'),
})
const { deployment, url } = await res.json()
```

</div>

The site answers `201 Created` and is live on that environment's address straight away:

```json
{
  "deployment": { "id": "dep_…", "env": "staging", "status": "ready", "files": 10, "bytes": 26676 },
  "template": { "name": "docs", "version": "0.1.2" },
  "url": "https://acme-docs-staging.manifestx.ai",
  "request_id": "…"
}
```

The Invoices page is now at `/docs/billing/invoices` on that address. [Promote, rollback, and the deployment list](/docs/api/guides/publish) work exactly as for your own builds.

Good to know:

- **Projects your keys created only.** On your other projects, content answers `422 not_api_project`, so it never replaces a project you built another way. [Publish a zip](/docs/api/guides/publish) to those instead.
- **Production ingests** also return a `prerender` object, usually `{ "status": "pending" }`. Manifest renders every page to static HTML in the background, then swaps that version in.
- **A `warning`** with code `post_publish_incomplete` means the site is live but a follow-up step, like setting up the default address, didn't finish. Don't resend. It completes on the next publish that changes the content, and `url` can be `null` until then.

---

## Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `template` | string | yes | `docs`. |
| `env` | string | no | `staging` (default) or `production`. |
| `site.name` | string | yes | Page title, header, and app name. |
| `site.description` | string | no | Meta description and the landing-page intro. |
| `site.theme` | object | no | `tokens` (light) and `dark`: theme token names mapped to CSS values. See [Theme Values](#theme-values). |
| `groups` | array | no | `{ slug, description? }` per group. Listed groups come first, in this order, with their description. |
| `articles` | array | yes | The pages. At least one. |

Each entry in `articles` is one page:

| Field | Type | Required | Notes |
|---|---|---|---|
| `group` | string | yes | Group name shown in the navigation. |
| `group_slug` | string | no | The group's URL segment. Defaults to the group name, lowercased, with hyphens. |
| `title` | string | yes | The page title. |
| `slug` | string | yes | The page's URL segment. See [Slugs](#slugs). |
| `markdown` | string | yes | The page body. If its first line isn't a `# ` heading, the title is added as one. |
| `icon` | string | no | An Iconify name, like `lucide:receipt`. Defaults to `lucide:file-text`. |
| `order` | number | no | Position within the group. Pages without one follow, in the order sent. |

Any field not listed here is refused, and so is Markdown with control characters. Images and other files aren't part of the request, so link to them by full URL.

---

## Unchanged Content

On staging, content identical to what's live there answers `200 OK` with `unchanged: true`. No deployment is created, and nothing counts toward the daily publish limit. So a scheduled sync can send everything every time, and the site rebuilds only when something changed.

```json
{
  "unchanged": true,
  "deployment": { "id": "dep_…", "env": "staging", "status": "ready", "files": 10, "bytes": 26676 },
  "template": { "name": "docs", "version": "0.1.2" },
  "url": "https://acme-docs-staging.manifestx.ai",
  "request_id": "…"
}
```

Good to know:

- **Order matters, formatting doesn't.** Key order and whitespace are ignored, but the order of `articles` and `groups` counts.
- **It compares with what's live**, not your last request. After a [file update or rollback](/docs/api/guides/publish) to a version your content didn't build, the next ingest deploys.
- **Production always deploys**, even when nothing changed.

---

## Slugs

A page is served at `/docs/<group_slug>/<slug>`. Slugs are lowercase words joined by single hyphens, like `payment-methods`.

- A page slug is unique across all groups, not only its own.
- A page slug can't match a group slug. Name a `billing` page in a `billing` group `billing-overview` instead.
- Neither can be `docs`, the segment the site lives under.
- Each `group_slug` has one group name, and two groups can't share a name.

---

## Theme Values

`tokens` and `dark` map the template's theme token names to CSS values. Write names with or without the leading `--`, but not both for one token.

- **Allowed:** colors, numbers, lengths, quoted font names, and the functions `rgb`, `rgba`, `hsl`, `hsla`, `hwb`, `lab`, `lch`, `oklab`, `oklch`, `color`, `color-mix`, `var`, `calc`, `min`, `max`, `clamp`, and `light-dark`.
- **Refused:** `url()`, comments, semicolons, braces, unclosed quotes or parentheses, and values over 200 characters.

---

## Template Version

A project's first successful ingest pins the docs template version it used. Later ingests keep that version, so a template update never changes a live site unasked. The version is in every response.

---

## Limits

| Limit | Value |
|---|---|
| Request body | 12 MB |
| Pages per request | 1,000 |
| Markdown per page | 512 KB |
| Markdown per request, in total | 10 MB |
| Entries in `groups` | 100 |
| Slug and `group_slug` | 80 characters, including a `group_slug` made from the group name |
| Group name, page title | 200 characters |
| Group description, site description | 1,000 characters |
| Site name | 120 characters |
| Theme tokens | 100 each for light and dark |
| Theme value | 200 characters |

---

## Retries

Send an `Idempotency-Key` with every request. A retry with the same key and body returns the first answer and creates no second deployment. See [Idempotency](/docs/api/reference/errors#idempotency).

---

## Errors

Every error has the [same shape](/docs/api/reference/errors). A content problem answers `422` with a `field` naming the page and property, and no deployment is created:

```json
{
  "error": "invalid_content",
  "message": "articles[1].slug: invalid slug \"Bad Slug\".",
  "field": "articles[1].slug",
  "request_id": "…"
}
```

| Status | `error` | Meaning |
|---|---|---|
| 400 | `invalid_input` | The body isn't UTF-8 JSON or an object, has an unknown top-level field, or `template` or `env` is wrong. |
| 403 | `plan_required` | The project's plan doesn't include publishing to that environment. |
| 403 | `storage_cap_reached` | The site would take the account over its storage cap. Nothing changed. See [Limits](/docs/api/reference/limits). |
| 404 | `not_found` | No such project, or the key can't reach it. |
| 413 | `payload_too_large` | The body is over 12 MB. |
| 422 | `invalid_content` | A slug, size, theme value, or page field is invalid. `field` says which. |
| 422 | `not_api_project` | The project wasn't created through the API. Publish a zip to it instead. |
| 429 | `publish_limit_reached` | A Free project's daily publish limit is reached. Wait the seconds in `Retry-After`. |
| 500 | `ingest_failed` | The deployment failed before going live. What was live is unchanged. Retry. |
| 503 | `template_unavailable` | The docs template couldn't load. Retry shortly. |
