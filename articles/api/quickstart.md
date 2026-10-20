# Quickstart

From an API key to a live documentation site in five requests.

---

## Before you start

You need an API key. See [Authentication](/docs/api/setup/authentication). Each step below is a request you can paste into a terminal.

---

## 1. Check the key

Put your API key in an environment variable and ask the API who you are:

```bash copy
export MANIFEST_ACCOUNT_KEY="mnfst_api_…"

curl https://api.manifestx.dev/v1/me \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

A `200` with your API account's name means the key works.

---

## 2. Create a project

`source_id`{copy} is your own id for this site, such as a record id in your system:

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "source_id": "site_8231", "name": "Acme Docs", "subdomain": "acme-docs" }'
```

The answer is `201 Created`. Keep `project.id`{copy} for the next steps:

```json
{
  "project": {
    "id": "proj_…",
    "source_id": "site_8231",
    "name": "Acme Docs",
    "status": "active",
    "project_key_prefix": "mfst_live_AbCd1234",
    "created_at": 1792138921,
    "urls": {
      "production": "https://acme-docs.manifestx.ai",
      "staging": "https://acme-docs-staging.manifestx.ai"
    },
    "published": { "production": false, "staging": false }
  },
  "project_key": "mfst_live_…",
  "request_id": "…"
}
```

`project_key`{copy} is the project's own key, shown once. It is not your API key, and you don't need it for the API (see [Create a project](/docs/api/projects/manage#create-a-project)).

```bash copy
export PROJECT_ID="proj_…"
```

---

## 3. Send the content

Two Markdown pages, listed under two groups, become a documentation site:

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects/$PROJECT_ID/content \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
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

---

## 4. Open the staging URL

The site is live at `url`{copy} as soon as the request returns. The Invoices article is at `/docs/billing/invoices` on that URL. Production still answers "This site hasn't been published yet."

---

## 5. Promote to production

Once the staging site looks right:

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects/$PROJECT_ID/promote \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
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

The same site now answers at `https://acme-docs.manifestx.ai`.

---

## Next steps

- Send new [content](/docs/api/projects/content) whenever the pages change. Each request replaces the whole site on staging.
- Point a domain of your own at the site with [Domains](/docs/api/projects/domains).
- Publish a build of your own instead with [Publish](/docs/api/projects/publish).
