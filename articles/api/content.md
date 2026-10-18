# Content

Send the site's pages as Markdown, and Manifest builds a documentation site from them.

---

## Send content

If you have the content but no site, send it in one JSON request: the site's pages, written in Markdown, plus site settings and theme. Manifest builds them into a documentation site from its docs template. There is no build step on your side and no zip. Each ingest is a new deployment of the whole site, so it replaces everything the previous ingest published.

Content works on projects the key created through the API. On your other projects it answers `422 not_api_project`, so it never replaces a site you built another way; [publish a zip](/docs/api/projects/publish) to those instead.

In the request, each page is an entry in `articles`{copy}, with a `title`{copy}, a `slug`{copy} for its URL, the `group`{copy} it is listed under in the navigation, and its `markdown`{copy}.

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
| `template`{copy}         | string   | yes          | `docs`{copy}.                                                                                             |
| `env`{copy}              | string   | no           | `staging`{copy} (default) or `production`{copy}.                                                                |
| `site.name`{copy}        | string   | yes          | Page title, header, and app name. Up to 120 characters.                                              |
| `site.description`{copy} | string   | no           | Meta description and the landing-page intro. Up to 1,000 characters.                               |
| `site.theme`{copy}       | object   | no           | `tokens`{copy} (light) and `dark`{copy}: theme token names mapped to CSS values. See below.                     |
| `groups`{copy}           | array    | no           | `{slug, description?}` per group. Listed groups come first, in this order, with their description.  |
| `articles`{copy}         | array    | yes          | At least one page.                                                                               |

Each entry in `articles`{copy} is one page:

| **Field**    | **Type** | **Required** | **Notes**                                                                                     |
|--------------|----------|--------------|-----------------------------------------------------------------------------------------------|
| `group`{copy}      | string   | yes          | Group name shown in the navigation.                                                           |
| `group_slug`{copy} | string   | no           | URL segment of the group. Defaults to the group name in lowercase with hyphens.               |
| `title`{copy}      | string   | yes          | Up to 200 characters.                                                                         |
| `slug`{copy}       | string   | yes          | URL segment of the page. See the slug rules below.                                         |
| `markdown`{copy}   | string   | yes          | The page body. If its first line isn't a `# ` heading, the title is added as one.          |
| `icon`{copy}       | string   | no           | An Iconify name such as `lucide:receipt`{copy}. Defaults to `lucide:file-text`{copy}.                     |
| `order`{copy}      | number   | no           | Sort position inside the group. Pages without one follow, in the order you sent them.      |

Pages carry markdown only: a field not listed here is refused, in a page, `site`{copy}, `site.theme`{copy}, or `groups`{copy}, and so is markdown containing control characters. Images and other files are not part of the payload, so link to them by absolute URL.

The site answers `201 Created` and is live on that environment's URL straight away:

```json
{
  "deployment": { "id": "dep_…", "env": "staging", "status": "ready", "files": 10, "bytes": 26676 },
  "template": { "name": "docs", "version": "0.1.2" },
  "url": "https://acme-docs-staging.manifestx.ai",
  "request_id": "…"
}
```

Rarely, the site goes live but a follow-up step, such as setting up the default hostname, doesn't finish. The answer is still `201`, with a `warning`{copy}:

```json
{ "warning": { "code": "post_publish_incomplete", "message": "The site is live, but a follow-up step …" } }
```

The deployment is live and counts as published, so don't resend it. The step completes on the next publish, and `url`{copy} can be `null` until then.

A page is served at `/docs/<group_slug>/<slug>`. [Promote](/docs/api/projects/publish#promote-staging-to-production), [rollback](/docs/api/projects/publish#roll-back), and the [deployment list](/docs/api/projects/publish#list-deployments) work exactly as for your own builds.

---

## Template version

A project's first successful ingest pins the docs template version it was built with, and every later ingest uses the same version, so a template update never changes a live site unasked. The pinned version is in every response.

---

## Slug rules

Slugs are lowercase letters and digits in words joined by single hyphens, such as `payment-methods`, up to 80 characters. Because the site matches a link against every part of its path:

- a page slug is unique across **all** groups, not only within its own;
- a page slug can't equal any group slug: a `billing` page inside a `billing` group is refused, so name it `billing-overview`;
- neither can be `docs`{copy}, the segment the site lives under;
- one `group_slug`{copy} has one group name, and two groups can't share a name.

---

## Theme values

Token names are the template's theme tokens, with or without the leading `--`. Values can be colors, numbers, lengths, quoted font names, and these functions: `rgb`, `rgba`, `hsl`, `hsla`, `hwb`, `lab`, `lch`, `oklab`, `oklch`, `color`, `color-mix`, `var`, `calc`, `min`, `max`, `clamp`, `light-dark`. `url()`, comments, semicolons, braces, unclosed quotes or parentheses, and values over 200 characters are refused. Up to 100 tokens each for light and dark.

---

## Content limits

| **Limit**                     | **Value**    |
|-------------------------------|--------------|
| Request body                  | 12 MB        |
| Pages per ingest           | 1,000        |
| Markdown per page          | 512 KB       |
| Markdown per ingest, in total | 10 MB        |
| Entries in `groups`{copy}           | 100          |
| Slug and `group_slug`{copy}         | 80 characters, including a `group_slug`{copy} derived from the group name |
| Group name, page title     | 200 characters |
| Group description             | 1,000 characters |
| Site name                     | 120 characters |
| Site description              | 1,000 characters |
| Theme tokens                  | 100 each for light and dark |
| Theme value                   | 200 characters |

---

## Retrying an ingest

Send an `Idempotency-Key`{copy} with every ingest. A retry with the same key and body returns the first response and creates no second deployment; the same key with a different body is `422 idempotency_key_reused`. A `5xx` is never stored, so a retry after one runs again.

---

## Errors

A content problem answers `422` with a `field`{copy} that names the page and property, and no deployment is created:

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
| 400        | `invalid_input`{copy}          | The body isn't UTF-8 JSON, isn't an object, has an unknown top-level field, `template`{copy} isn't `docs`{copy}, or `env`{copy} is wrong.|
| 404        | `not_found`{copy}              | No such project, or the key can't reach it.                                                              |
| 413        | `payload_too_large`{copy}      | The body is over 12 MB.                                                                                  |
| 422        | `invalid_content`{copy}        | A slug, size, theme value, or page field is invalid. `field`{copy} says which.                               |
| 422        | `not_api_project`{copy}        | The project wasn't created through the API. Publish a zip to it instead.                                 |
| 429        | `publish_limit_reached`{copy}  | A Free project's daily publish limit is reached. Wait the seconds in `Retry-After`{copy}.                     |
| 500        | `ingest_failed`{copy}          | The deployment failed before going live. Whatever was live on that environment is unchanged (or nothing, on a first ingest). Retry the request. |
| 503        | `template_unavailable`{copy}   | The docs template couldn't be loaded. Retry shortly.                                                     |

