# Content

Send articles as JSON and Manifest builds a documentation site from them.

---

## Send content

If you have the content but no front end, send the articles as JSON and Manifest builds a documentation site from its docs template. There is no build step on your side and no zip. Each ingest is a new deployment of the whole site, so it replaces everything the previous ingest published.

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/content \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: help-center-sync-0193" \
  -H "Content-Type: application/json" \
  -d @content.json
```

```json
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

| **Field**          | **Type** | **Required** | **Notes**                                                                                           |
|--------------------|----------|--------------|-----------------------------------------------------------------------------------------------------|
| `template`         | string   | yes          | `docs`.                                                                                             |
| `env`              | string   | no           | `staging` (default) or `production`.                                                                |
| `site.name`        | string   | yes          | Page title, header, and app name. Up to 120 characters.                                              |
| `site.description` | string   | no           | Meta description and the landing-page intro. Up to 1,000 characters.                               |
| `site.theme`       | object   | no           | `tokens` (light) and `dark`: theme token names mapped to CSS values. See below.                     |
| `groups`           | array    | no           | `{slug, description?}` per group. Listed groups come first, in this order, with their description.  |
| `articles`         | array    | yes          | At least one article.                                                                               |

Each article:

| **Field**    | **Type** | **Required** | **Notes**                                                                                     |
|--------------|----------|--------------|-----------------------------------------------------------------------------------------------|
| `group`      | string   | yes          | Group name shown in the navigation.                                                           |
| `group_slug` | string   | no           | URL segment of the group. Defaults to the group name in lowercase with hyphens.               |
| `title`      | string   | yes          | Up to 200 characters.                                                                         |
| `slug`       | string   | yes          | URL segment of the article. See the slug rules below.                                         |
| `markdown`   | string   | yes          | The article body. If its first line isn't a `# ` heading, the title is added as one.          |
| `icon`       | string   | no           | An Iconify name such as `lucide:receipt`. Defaults to `lucide:file-text`.                     |
| `order`      | number   | no           | Sort position inside the group. Articles without one follow, in the order you sent them.      |

Articles carry markdown only: a field not listed here is refused, in an article, `site`, `site.theme`, or `groups`, and so is markdown containing control characters. Images and other files are not part of the payload, so link to them by absolute URL.

The site answers `201 Created` and is live on that environment's URL straight away:

```json
{
  "deployment": { "id": "dep_…", "env": "staging", "status": "ready", "files": 10, "bytes": 26676 },
  "template": { "name": "docs", "version": "0.1.2" },
  "url": "https://acme-docs-staging.manifestx.ai",
  "request_id": "…"
}
```

Rarely, the site goes live but a follow-up step, such as setting up the default hostname, doesn't finish. The answer is still `201`, with a `warning`:

```json
{ "warning": { "code": "post_publish_incomplete", "message": "The site is live, but a follow-up step …" } }
```

The deployment is live and counts as published, so don't resend it. The step completes on the next publish, and `url` can be `null` until then.

An article is served at `/docs/<group_slug>/<slug>`. [Promote](/docs/api/projects/publish#promote-staging-to-production), [rollback](/docs/api/projects/publish#roll-back), and the [deployment list](/docs/api/projects/publish#list-deployments) work exactly as for your own builds.

---

## Template version

A project's first successful ingest pins the docs template version it was built with, and every later ingest uses the same version, so a template update never changes a live site unasked. The pinned version is in every response.

---

## Slug rules

Slugs are lowercase letters and digits in words joined by single hyphens, such as `payment-methods`, up to 80 characters. Because the site matches a link against every part of its path:

- an article slug is unique across **all** groups, not only within its own;
- an article slug can't equal any group slug: a `billing` article inside a `billing` group is refused, so name it `billing-overview`;
- neither can be `docs`, the segment the site lives under;
- one `group_slug` has one group name, and two groups can't share a name.

---

## Theme values

Token names are the template's theme tokens, with or without the leading `--`. Values can be colors, numbers, lengths, quoted font names, and these functions: `rgb`, `rgba`, `hsl`, `hsla`, `hwb`, `lab`, `lch`, `oklab`, `oklch`, `color`, `color-mix`, `var`, `calc`, `min`, `max`, `clamp`, `light-dark`. `url()`, comments, semicolons, braces, unclosed quotes or parentheses, and values over 200 characters are refused. Up to 100 tokens each for light and dark.

---

## Content limits

| **Limit**                     | **Value**    |
|-------------------------------|--------------|
| Request body                  | 12 MB        |
| Articles per ingest           | 1,000        |
| Markdown per article          | 512 KB       |
| Markdown per ingest, in total | 10 MB        |
| Entries in `groups`           | 100          |
| Slug and `group_slug`         | 80 characters, including a `group_slug` derived from the group name |
| Group name, article title     | 200 characters |
| Group description             | 1,000 characters |
| Site name                     | 120 characters |
| Site description              | 1,000 characters |
| Theme tokens                  | 100 each for light and dark |
| Theme value                   | 200 characters |

---

## Retrying an ingest

Send an `Idempotency-Key` with every ingest. A retry with the same key and body returns the first response and creates no second deployment; the same key with a different body is `422 idempotency_key_reused`. A `5xx` is never stored, so a retry after one runs again.

---

## Errors

A content problem answers `422` with a `field` that names the article and property, and no deployment is created:

```json
{
  "error": "invalid_content",
  "message": "articles[1].slug: invalid slug \"Bad Slug\".",
  "field": "articles[1].slug",
  "request_id": "…"
}
```

| **Status** | **`error`**              | **Meaning**                                                                                              |
|------------|--------------------------|----------------------------------------------------------------------------------------------------------|
| 400        | `invalid_input`          | The body isn't UTF-8 JSON, isn't an object, has an unknown top-level field, `template` isn't `docs`, or `env` is wrong.|
| 404        | `not_found`              | No such project in your API account.                                                                 |
| 413        | `payload_too_large`      | The body is over 12 MB.                                                                                  |
| 422        | `invalid_content`        | A slug, size, theme value, or article field is invalid. `field` says which.                               |
| 500        | `ingest_failed`          | The deployment failed before going live. Whatever was live on that environment is unchanged (or nothing, on a first ingest). Retry the request. |
| 503        | `template_unavailable`   | The docs template couldn't be loaded. Retry shortly.                                                     |

