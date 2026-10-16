# Partner API
Provision and publish Manifest sites for your own customers from your backend.

---

## Overview

The partner API lets a platform create and run Manifest-hosted sites on behalf of its customers. Each customer site is an ordinary Manifest project owned by your partner account, so it keeps its own deployments, staging and production environments, domains and team.

All requests go to one versioned base URL:

```text copy
https://mcp.manifestx.dev/partner/v1
```

Requests and responses are JSON.

---

## Quickstart

From a partner key to a live help centre in five requests. Each step below is a request you can paste into a terminal.

**1. Check the key.** Put your partner key in an environment variable and ask the API who you are:

```bash copy
export MANIFEST_PARTNER_KEY="mfst_partner_…"

curl https://mcp.manifestx.dev/partner/v1/me \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY"
```

A `200` with your partner account's name means the key works.

**2. Create a project** for one of your customers. `external_id` is your own id for that customer:

```bash copy
curl -X POST https://mcp.manifestx.dev/partner/v1/projects \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "external_id": "cust_8231", "name": "Acme Docs", "subdomain": "acme-docs" }'
```

The answer is `201 Created`. Keep `project.id` for the next steps:

```json
{
  "project": {
    "id": "proj_…",
    "external_id": "cust_8231",
    "name": "Acme Docs",
    "status": "active",
    "api_key_prefix": "mfst_live_AbCd1234",
    "created_at": 1792138921,
    "urls": {
      "production": "https://acme-docs.manifestx.ai",
      "staging": "https://acme-docs-staging.manifestx.ai"
    },
    "published": { "production": false, "staging": false }
  },
  "api_key": "mfst_live_…",
  "request_id": "…"
}
```

`api_key` is the project's own key, shown once; the partner API doesn't need it (see [Create a project](#create-a-project)).

```bash copy
export PROJECT_ID="proj_…"
```

**3. Send the content.** Two articles in two groups become a documentation site:

```bash copy
curl -X POST https://mcp.manifestx.dev/partner/v1/projects/$PROJECT_ID/content \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY" \
  -H "Idempotency-Key: acme-help-sync-1" \
  -H "Content-Type: application/json" \
  -d '{
    "template": "docs",
    "site": { "name": "Acme Help", "description": "Answers for Acme customers." },
    "articles": [
      { "group": "Getting started", "title": "Welcome", "slug": "welcome", "markdown": "Hello from Acme." },
      { "group": "Billing", "title": "Invoices", "slug": "invoices", "markdown": "## Download\n\nUse the portal." }
    ]
  }'
```

```json
{
  "deployment": { "id": "dep_…", "env": "staging", "status": "ready", "files": 10, "bytes": 26537 },
  "template": { "name": "docs", "version": "0.1.2" },
  "url": "https://acme-docs-staging.manifestx.ai",
  "request_id": "…"
}
```

**4. Open the staging URL.** The site is live at `url` as soon as the request returns. The Invoices article is at `https://acme-docs-staging.manifestx.ai/docs/billing/invoices`. Production still answers "This site hasn't been published yet."

**5. Promote to production** once the staging site looks right:

```bash copy
curl -X POST https://mcp.manifestx.dev/partner/v1/projects/$PROJECT_ID/promote \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY" \
  -H "Idempotency-Key: acme-help-promote-1"
```

```json
{
  "deployment": { "id": "dep_…", "env": "production", "files": 12 },
  "live_deployment_id": "dep_…",
  "url": "https://acme-docs.manifestx.ai",
  "request_id": "…"
}
```

The same site now answers at `https://acme-docs.manifestx.ai`. From here, send new content whenever your customer's articles change (each request replaces the whole site on staging), point the customer's own domain at it with [Domains](#domains), or publish a build of your own with [Publishing your own build](#publishing-your-own-build).

---

## Authentication

Your partner account comes with a partner key, issued by Manifest when the account is set up. It starts with `mfst_partner_` and is shown once, so store it in your secrets manager. Send it on every request as a bearer token:

```bash copy
curl https://mcp.manifestx.dev/partner/v1/me \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY"
```

`GET /me` confirms the key works and returns the partner account it belongs to:

```json
{
  "partner": {
    "id": "ptnr_…",
    "name": "Acme Docs",
    "max_projects": 100,
    "created_at": 1760140800
  },
  "key": { "prefix": "mfst_partner_AbCd1234" },
  "request_id": "…"
}
```

Keep the key on your server. It can act on every project your partner account owns, so never ship it to a browser or a customer's repository.

::: brand icon="lucide:info"
**A partner key works only on the partner API.** It is refused by the Manifest connector, the dashboard API and every other endpoint. Project keys and connector sign-ins don't work on the partner API either.
:::

| **Status** | **`error`**      | **Meaning**                                                  |
|------------|------------------|--------------------------------------------------------------|
| 401        | `unauthorized`   | The key is missing, malformed, or not a partner key.         |
| 401        | `key_revoked`    | The key was revoked. Switch to a current key.                |
| 404        | `not_found`      | The route doesn't exist.                                     |

### Revoked keys

A revoked key stops working on the next request. If a key leaks, contact Manifest to revoke it and receive a replacement.

---

## Projects

Each customer site is one project. Create it once, keyed by your own id for that customer, and the API keeps it idempotent for you.

### Create a project

```bash copy
curl -X POST https://mcp.manifestx.dev/partner/v1/projects \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "external_id": "cust_8231", "name": "Acme Docs", "subdomain": "acme-docs" }'
```

| **Field**     | **Type** | **Required** | **Notes**                                                                                                                          |
|---------------|----------|--------------|------------------------------------------------------------------------------------------------------------------------------------|
| `external_id` | string   | yes          | Your id for this customer site (1–128 characters). Unique within your partner account; blank values are rejected.                  |
| `name`        | string   | yes          | Display name (1–120 characters). The default subdomain is derived from it.                                                         |
| `subdomain`   | string   | no           | Exact label to use instead of the derived one: 1–40 lowercase letters, digits or single hyphens. The site gets `<label>.manifestx.ai` and `<label>-staging.manifestx.ai`. |

Unknown fields are rejected with `400 invalid_input`.

A new project answers `201 Created`:

```json
{
  "project": {
    "id": "proj_…",
    "external_id": "cust_8231",
    "name": "Acme Docs",
    "status": "active",
    "api_key_prefix": "mfst_live_AbCd1234",
    "created_at": 1760140800,
    "urls": {
      "production": "https://acme-docs.manifestx.ai",
      "staging": "https://acme-docs-staging.manifestx.ai"
    },
    "published": { "production": false, "staging": false }
  },
  "api_key": "mfst_live_…",
  "request_id": "…"
}
```

`api_key` is the project's own key, returned **once**. It is a normal Manifest project key: hand it to the customer's CI if they publish headless, or keep it in your vault. It is not needed for the partner API itself, which acts on every project with your partner key. The subdomains are reserved immediately; `published` flips to `true` per environment after the first publish there.

Every project you create is private by default (it never appears in the Manifest showcase) and carries no badge.

### Idempotent creates

`external_id` is the idempotency key for creates, so a retry is always safe without any extra header:

| **Request**                                              | **Response**                                                                                  |
|----------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| Same `external_id`, same `name` (and `subdomain`, if sent) | `200 OK` with the existing project. No `api_key`: it was returned when the project was created. |
| Same `external_id`, different `name` or `subdomain`      | `409 external_id_conflict`, naming the existing project id. Nothing is changed.              |
| Two creates for the same `external_id` at the same moment | One project. The first wins (`201`); the other sees it (`200`).                               |

### Retrying other requests

Every other mutating request is made retry-safe with an `Idempotency-Key` header. See [Idempotency](#idempotency).

### Project cap

Each partner account has a project cap (shown as `max_projects` on `GET /me`). A create that would exceed it is refused with `403 project_cap_reached` and the cap in the message; existing projects are unaffected, and re-sending an existing `external_id` still returns it. Contact Manifest to raise the cap.

### List projects

```bash copy
curl https://mcp.manifestx.dev/partner/v1/projects \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY"
```

Returns `{ "projects": [ … ], "request_id": "…" }` with every live project in your partner account, newest first, in the same shape as the create response (without `api_key`). Deleted projects and projects outside your account are never included.

### Get a project

```bash copy
curl https://mcp.manifestx.dev/partner/v1/projects/proj_… \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY"
```

Returns `{ "project": { … }, "request_id": "…" }`. A project that is not in your partner account answers `404 not_found`, the same as one that doesn't exist.

### Errors

| **Status** | **`error`**                 | **Meaning**                                                                                   |
|------------|-----------------------------|-----------------------------------------------------------------------------------------------|
| 400        | `invalid_input`             | Missing or malformed field, blank `external_id`, unknown field, or a body that isn't JSON.    |
| 400        | `invalid_subdomain`         | `subdomain` isn't a clean label (lowercase letters, digits, single hyphens, 1–40 characters). |
| 400        | `invalid_idempotency_key`   | `Idempotency-Key` is blank or longer than 200 characters.                                     |
| 403        | `project_cap_reached`       | The account's project cap is reached. The message names the cap.                              |
| 404        | `not_found`                 | No such project in your partner account.                                                      |
| 409        | `external_id_conflict`      | `external_id` already names a project with a different `name` or `subdomain`.                 |
| 409        | `external_id_deleted`       | `external_id` named a project that has since been deleted. Use a new `external_id`.          |
| 409        | `subdomain_taken`           | The requested subdomain belongs to another project.                                           |
| 409        | `idempotency_in_progress`   | The first request with this `Idempotency-Key` is still running. Retry shortly.                |
| 422        | `subdomain_reserved`        | The requested subdomain is a reserved label (for example `login` or `billing`).               |
| 422        | `idempotency_key_reused`    | `Idempotency-Key` was already used with a different request body.                             |
| 503        | `idempotency_unavailable`   | Idempotent requests are temporarily unavailable. Retry later, or without the header.          |

---

## Publishing your own build

If your platform already builds the customer's site, publish the output as a zip. Publishing is two steps: ask the API for a one-time upload URL, then send the zip to it. Every publish lands as a new deployment; staging and production each keep their history, so a bad release is one call away from being undone.

### Start a publish

```bash copy
curl -X POST https://mcp.manifestx.dev/partner/v1/projects/proj_…/publish \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY" \
  -H "Idempotency-Key: build-4182-staging" \
  -H "Content-Type: application/json" \
  -d '{ "env": "staging", "source": "spa" }'
```

| **Field**    | **Type** | **Required** | **Notes**                                                                                                               |
|--------------|----------|--------------|-------------------------------------------------------------------------------------------------------------------------|
| `env`        | string   | no           | `staging` (default) or `production`.                                                                                    |
| `source`     | string   | yes          | `spa` for any static build (React, Vite, Astro, plain HTML or a Manifest app). `render` for `mnfst-render` output.     |
| `output_dir` | string   | no           | Folder inside the zip the site is served from, e.g. `dist`. Defaults to the zip root for `spa`, `website` for `render`. |

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

The upload URL works once and expires after 15 minutes. It carries its own authority, so the machine that uploads never needs your partner key. With an `Idempotency-Key`, a retried start returns the same URL instead of opening a second deployment.

### Upload the zip

```bash copy
curl -X POST "$UPLOAD_URL" \
  -H "x-mnfst-async: 1" \
  --data-binary @site.zip
```

With `x-mnfst-async: 1` the upload answers `202` with `"status": "ingesting"` as soon as the zip is stored. Poll `status_url` about once a second until `status` is `done` or `error`:

```json
{ "status": "done", "ok": true, "deployment_id": "dep_…", "env": "staging", "files": 42, "bytes": 318211, "url": "https://acme-docs-staging.manifestx.ai" }
```

Without the header the upload waits and answers with the same outcome. The site is live on that environment's URL the moment the status is `done`. `.env` files, `.git`, `node_modules` and `.claude` are never published, even when they are in the zip.

| **Limit**             | **Value** |
|-----------------------|-----------|
| Zip size              | 80 MB     |
| Unzipped size         | 250 MB    |
| Largest single file   | 25 MB     |
| Files per deployment  | 10,000    |

An upload over a limit answers `413` and an expired URL answers `410`; start a new publish in either case. Sending the zip again to a URL whose upload already finished publishes nothing new: it answers with that first outcome, so a retry after a dropped response is safe.

### Promote staging to production

```bash copy
curl -X POST https://mcp.manifestx.dev/partner/v1/projects/proj_…/promote \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY" \
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

### Roll back

```bash copy
curl -X POST https://mcp.manifestx.dev/partner/v1/projects/proj_…/rollback \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "env": "production" }'
```

| **Field**       | **Type** | **Required** | **Notes**                                                                       |
|-----------------|----------|--------------|---------------------------------------------------------------------------------|
| `env`           | string   | no           | `production` (default) or `staging`.                                            |
| `deployment_id` | string   | no           | The version to restore. Omit it to go back to the version before the live one. |

Rollback is instant: it points the environment back at an earlier deployment without copying anything. It answers `{ "env": "production", "live_deployment_id": "dep_…", "url": "https://acme-docs.manifestx.ai", "request_id": "…" }`. To roll forward again, roll back to the newer `deployment_id`.

### List deployments

```bash copy
curl "https://mcp.manifestx.dev/partner/v1/projects/proj_…/deployments?env=staging" \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY"
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

`ready` and `superseded` deployments can be restored with a rollback; `uploading` and `failed` ones can't. Each environment keeps its five most recent deployments plus the live one; older ones are deleted when a new deployment lands, so keep your build artefacts if you need an older version.

### Errors

| **Status** | **`error`**             | **Meaning**                                                                                  |
|------------|-------------------------|----------------------------------------------------------------------------------------------|
| 400        | `invalid_input`         | Missing or malformed field, unknown field, or an `env` that isn't `staging` or `production`. |
| 404        | `not_found`             | No such project in your partner account.                                                     |
| 404        | `unknown_deployment`    | `deployment_id` isn't one of this project's deployments for that environment.                |
| 409        | `nothing_on_staging`    | Promote with nothing live on staging. Publish to staging first.                              |
| 409        | `promote_in_progress`   | Another promote of this project is still copying. Retry shortly.                             |
| 409        | `no_earlier_version`    | Rollback without `deployment_id`, and there is no earlier version to go back to.             |
| 409        | `already_live`          | That deployment is already live.                                                             |
| 409        | `not_restorable`        | That deployment is still uploading or failed.                                                |
| 503        | `publish_unavailable`   | A publish couldn't be started. Retry shortly.                                                |

---

## Content ingest (docs template)

If your platform has the content but no front end, send the articles as JSON and Manifest builds a documentation site from its docs template. There is no build step on your side and no zip. Each ingest is a new deployment of the whole site, so it replaces everything the previous ingest published.

```bash copy
curl -X POST https://mcp.manifestx.dev/partner/v1/projects/proj_…/content \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY" \
  -H "Idempotency-Key: help-centre-sync-0193" \
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
| `site.name`        | string   | yes          | Page title, header and app name. Up to 120 characters.                                              |
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

Articles carry markdown only: a field not listed here is refused, in an article, in `site`, `site.theme` or `groups`, and so is markdown containing control characters. Images and other files are not part of the payload, so link to them by absolute URL.

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

An article is served at `/docs/<group_slug>/<slug>`. Promote, rollback and the deployment list work exactly as for your own builds.

### Template version

A project's first successful ingest pins the docs template version it was built with, and every later ingest uses the same version, so a template update never changes a live site unasked. The pinned version is in every response.

### Slug rules

Slugs are lowercase letters and digits in words joined by single hyphens, such as `payment-methods`, up to 80 characters. Because the site matches a link against every part of its path:

- an article slug is unique across **all** groups, not only within its own;
- an article slug can't equal any group slug: a `billing` article inside a `billing` group is refused, so name it `billing-overview`;
- neither can be `docs`, the segment the site lives under;
- one `group_slug` has one group name, and two groups can't share a name.

### Theme values

Token names are the template's theme tokens, with or without the leading `--`. Values can be colours, numbers, lengths, quoted font names and these functions: `rgb`, `rgba`, `hsl`, `hsla`, `hwb`, `lab`, `lch`, `oklab`, `oklch`, `color`, `color-mix`, `var`, `calc`, `min`, `max`, `clamp`, `light-dark`. `url()`, comments, semicolons, braces, unclosed quotes or parentheses and values over 200 characters are refused. Up to 100 tokens each for light and dark.

### Content limits

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

### Retrying an ingest

Send an `Idempotency-Key` with every ingest. A retry with the same key and body returns the first response and creates no second deployment; the same key with a different body is `422 idempotency_key_reused`. A `5xx` is never stored, so a retry after one runs again.

### Errors

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
| 404        | `not_found`              | No such project in your partner account.                                                                 |
| 413        | `payload_too_large`      | The body is over 12 MB.                                                                                  |
| 422        | `invalid_content`        | A slug, size, theme value or article field is invalid. `field` says which.                               |
| 500        | `ingest_failed`          | The deployment failed before going live. Whatever was live on that environment is unchanged (or nothing, on a first ingest). Retry the request. |
| 503        | `template_unavailable`   | The docs template couldn't be loaded. Retry shortly.                                                     |

---

## Domains

A customer site can answer on the customer's own domain as well as its `manifestx.ai` address. You attach the domain, the customer adds a DNS record at their DNS provider, and the HTTPS certificate is issued automatically. Domains are the customer's own; Manifest doesn't register or sell them.

### Attach a domain

```bash copy
curl -X POST https://mcp.manifestx.dev/partner/v1/projects/proj_…/domains \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY" \
  -H "Idempotency-Key: domain-cust_8231-docs" \
  -H "Content-Type: application/json" \
  -d '{ "hostname": "docs.acme.com", "env": "production", "validation": "http" }'
```

| **Field**    | **Type** | **Required** | **Notes**                                                                                                                         |
|--------------|----------|--------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `hostname`   | string   | yes          | The customer's hostname, e.g. `docs.acme.com`. No scheme or path.                                                                 |
| `env`        | string   | no           | `production` (default) or `staging`: the environment the domain serves.                                                          |
| `validation` | string   | no           | `http` (default) issues the certificate once the routing record is in place. `txt` issues it first, for a domain that is live elsewhere. |

A new domain answers `201 Created` with the records to hand to the customer:

```json
{
  "domain": {
    "hostname": "docs.acme.com",
    "requested": "docs.acme.com",
    "env": "production",
    "validation": "http",
    "status": "pending",
    "certificate_status": "pending_validation"
  },
  "records": [
    { "purpose": "Point the domain to the site", "type": "CNAME", "name": "docs", "value": "cname.manifestx.ai" }
  ],
  "root_redirect": null,
  "request_id": "…"
}
```

`name` is the label to type into the DNS provider's Name/Host field, which adds the domain itself. These are the same records the Manifest connector gives for the same domain.

- **Root domains.** A root such as `acme.com` is served at `www.acme.com` (`domain.hostname`), because most DNS providers can't put a CNAME on a root. `root_redirect` then describes the forwarding to set up at the registrar so `acme.com` goes to `https://www.acme.com`.
- **Moving a live domain.** With `"validation": "txt"`, `records` starts with a TXT record. Add only that one first: the certificate is issued while the old site keeps serving. Add the CNAME once the status shows the certificate `active`, and traffic moves with HTTPS on both sides.

Sending the same hostname again updates it in place (for example, to switch `validation`) and answers `200`. A hostname already attached to another project is refused.

### Check status

```bash copy
curl https://mcp.manifestx.dev/partner/v1/projects/proj_…/domains/docs.acme.com \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY"
```

```json
{
  "domain": {
    "hostname": "docs.acme.com",
    "env": "production",
    "status": "pending",
    "hostname_status": "pending",
    "certificate_status": "pending_validation",
    "certificate_validation": { "method": "http", "expected_records": [], "errors": [] }
  },
  "request_id": "…"
}
```

`status` is one of:

| **`status`** | **Meaning**                                                                                                   |
|--------------|---------------------------------------------------------------------------------------------------------------|
| `pending`    | Waiting for the DNS record or the certificate. Usually a few minutes after the record is added.               |
| `active`     | The domain is verified, has its certificate, and serves the site.                                             |
| `error`      | Validation failed or timed out, or the domain was removed at the provider. Check the records and attach again. |

`hostname_status` and `certificate_status` are the underlying states; `certificate_validation` appears until the certificate is active and lists what is still expected. Poll every minute or so while `status` is `pending`. The domain serves the site from the first check that reads `active`. After that, a later `error` (for example a certificate renewal that timed out, or the CNAME removed) is reported but doesn't take the site off the domain; fix the records and attach again. The exception is a domain whose `hostname_status` reads `deleted`: it has no certificate or routing left, so it stops serving. Attaching it again issues a new certificate, and the domain reads `pending` until it validates.

### Remove a domain

```bash copy
curl -X DELETE https://mcp.manifestx.dev/partner/v1/projects/proj_…/domains/docs.acme.com \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY"
```

Answers `{ "removed": "docs.acme.com", "request_id": "…" }`. The site stops answering on that domain at once and the domain is free to attach elsewhere. The customer can delete the CNAME at their DNS provider.

### Errors

| **Status** | **`error`**                   | **Meaning**                                                                       |
|------------|-------------------------------|-----------------------------------------------------------------------------------|
| 400        | `invalid_input`               | Missing or malformed field, or an unknown field.                                  |
| 400        | `invalid_hostname`            | `hostname` isn't a hostname, e.g. it has spaces, no dot, or is an IP address.     |
| 403        | `domain_cap_reached`          | The project has 25 custom domains. Remove one first.                              |
| 404        | `not_found`                   | No such project in your partner account, or no such domain on the project.        |
| 409        | `hostname_taken`              | The hostname is attached to another project.                                      |
| 422        | `hostname_reserved`           | The hostname is on a Manifest domain (`manifestx.ai`, `manifestx.dev`).           |
| 502        | `domain_attach_failed`        | The domain couldn't be attached. Check the hostname and retry.                    |
| 503        | `domain_status_unavailable`   | The status couldn't be read just now. Retry shortly.                              |
| 503        | `domains_unavailable`         | Custom domains are temporarily unavailable. Retry later.                          |

---

## Idempotency

Every request can be retried safely. Creates are idempotent on your own id; everything else uses a header.

- **Creates:** `external_id` is the key. Re-sending the same body returns the existing project (`200`), so a create needs no header. See [Idempotent creates](#idempotent-creates).
- **Everything else that changes something** (content, publish, promote, rollback, domains): send an `Idempotency-Key` header, 1 to 200 characters, unique per operation and scoped to your partner account. Derive it from your own job id, such as `help-centre-sync-0193`, so a retry of the same job reuses it.

```bash copy
curl -X POST https://mcp.manifestx.dev/partner/v1/projects \
  -H "Authorization: Bearer $MANIFEST_PARTNER_KEY" \
  -H "Idempotency-Key: 6f1c2a8e-create-cust_8232" \
  -H "Content-Type: application/json" \
  -d '{ "external_id": "cust_8232", "name": "Beta Docs" }'
```

| **Repeat with the same key**             | **Result**                                                                                                  |
|------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| Same body, first request finished        | The stored response, byte for byte, with an `Idempotent-Replayed: true` header. Nothing runs twice.         |
| Same body, first request still running   | `409 idempotency_in_progress`. Retry shortly.                                                               |
| Different body                           | `422 idempotency_key_reused`. Nothing runs.                                                                 |
| First request answered `409` or `5xx`    | Not stored: the retry runs the request again.                                                               |

Responses are kept for 24 hours. JSON key order and whitespace don't change the match, and the header is ignored on `GET`. A replayed create returns the original `api_key`, so a retry after a dropped response still receives the project key.

---

## Error handling

Every error has the same shape. `message` is written for a person; branch on `error`. Quote the `request_id` when you contact Manifest.

```json
{
  "error": "unauthorized",
  "message": "That partner key is not recognised.",
  "request_id": "…"
}
```

A content error also names the field, for example `"field": "articles[1].slug"`. Each section above lists its own codes. In general:

| **Status** | **What to do**                                                                                                  |
|------------|-----------------------------------------------------------------------------------------------------------------|
| 400, 422   | Fix the request. The `message` says what is wrong; don't retry unchanged.                                       |
| 401        | Check the key. A revoked key stays revoked.                                                                     |
| 403        | A cap is reached (projects or domains). The message names it.                                                   |
| 404        | The project, deployment or domain isn't in your partner account, or the route doesn't exist.                    |
| 409        | A conflict or an operation still running. The `error` code says which; retry the `_in_progress` ones shortly. |
| 413        | The body is too large. See [Limits](#limits).                                                                   |
| 5xx        | Retry with the same `Idempotency-Key`. Failures are never stored, so the retry runs again.                      |

---

## Limits

| **Limit**                                | **Value**                                          |
|------------------------------------------|----------------------------------------------------|
| Projects per partner account             | `max_projects` on `GET /me`. Contact Manifest to raise it. |
| Custom domains per project               | 25                                                 |
| Content ingest request body              | 12 MB. Per-article and per-field limits are in [Content limits](#content-limits). |
| Zip upload                               | 80 MB zipped, 250 MB unzipped, 25 MB per file, 10,000 files |
| Upload URL lifetime                      | 15 minutes, one upload                             |
| `Idempotency-Key`                        | 1 to 200 characters, kept 24 hours                 |
| Deployments kept                         | The 5 most recent per environment, plus the live one |
