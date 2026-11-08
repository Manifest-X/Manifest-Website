# Quickstart

Go from an API key to a live documentation site in a few minutes.

---

## Before You Start

You need an API key from the dashboard. See [Authentication](/docs/api/reference/authentication). The cURL steps use `jq` to read ids from responses. The JavaScript steps build one script, such as `quickstart.mjs`, for Node 18 or later.

::: brand icon="lucide:info"
The project you create here uses one of the two projects your free allowance can create through the API, until you delete it. The last step deletes it.
:::

---

<div class="step">

## Check the Key

Put your key in an environment variable, then ask the API who you are.

<div x-code-group copy>

```bash "cURL"
export MANIFEST_ACCOUNT_KEY="mnfst_api_…"

curl https://api.manifestx.dev/v1/me \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const API = 'https://api.manifestx.dev/v1'
const headers = {
  Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
  'Content-Type': 'application/json',
}

const me = await fetch(`${API}/me`, { headers }).then((r) => r.json())
console.log(me.account.name)
```

</div>

A `200` with your account's name means the key works.

</div>

<div class="step">

## Create a Project

`source_id` is your own id for this project, such as a record id in your system. Keep the new project's id for the next steps.

Subdomains are unique across all of Manifest, so `acme-docs` may already be taken. Replace it with your own, or leave `subdomain` out to get a free one made from `name`.

<div x-code-group copy>

```bash "cURL"
PROJECT_ID=$(curl -s -X POST https://api.manifestx.dev/v1/projects \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "source_id": "site_8231", "name": "Acme Docs", "subdomain": "acme-docs" }' \
  | jq -r .project.id)

echo $PROJECT_ID
```

```js "JavaScript"
const { project } = await fetch(`${API}/projects`, {
  method: 'POST',
  headers,
  body: JSON.stringify({ source_id: 'site_8231', name: 'Acme Docs', subdomain: 'acme-docs' }),
}).then((r) => r.json())

const projectId = project.id
```

</div>

The answer is `201 Created`:

```json
{
  "project": {
    "id": "proj_…",
    "source_id": "site_8231",
    "name": "Acme Docs",
    "plan": "free",
    "status": "active",
    "project_key_prefix": "mfst_free_AbCd1234",
    "created_at": 1792138921,
    "urls": {
      "production": "https://acme-docs.manifestx.ai",
      "staging": "https://acme-docs-staging.manifestx.ai"
    },
    "published": { "production": false, "staging": false }
  },
  "project_key": "mfst_free_…",
  "request_id": "…"
}
```

You can ignore `project_key` for now. See [Projects](/docs/api/guides/projects#create-a-project).

A `409 subdomain_taken` means someone else has that subdomain. Pick another and send the create again. If any step answers an error, see [Common Problems](/docs/api/reference/errors#common-problems).

</div>

<div class="step">

## Send the Content

Two Markdown pages, listed under two groups, become a documentation site.

<div x-code-group copy>

```bash "cURL"
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

```js "JavaScript"
const content = await fetch(`${API}/projects/${projectId}/content`, {
  method: 'POST',
  headers: { ...headers, 'Idempotency-Key': 'acme-help-sync-1' },
  body: JSON.stringify({
    template: 'docs',
    site: { name: 'Acme Help', description: 'Answers for Acme customers.' },
    articles: [
      { group: 'Getting started', title: 'Welcome', slug: 'welcome', markdown: 'Hello from Acme.' },
      { group: 'Billing', title: 'Invoices', slug: 'invoices', markdown: '## Download\n\nUse the portal.' },
    ],
  }),
}).then((r) => r.json())

console.log(content.url)
```

</div>

```json
{
  "deployment": { "id": "dep_…", "env": "staging", "status": "ready", "files": 10, "bytes": 26537 },
  "template": { "name": "docs", "version": "0.1.2" },
  "url": "https://acme-docs-staging.manifestx.ai",
  "request_id": "…"
}
```

</div>

<div class="step">

## Open Staging

The site is live at `url` as soon as the request returns. The Invoices page is at `/docs/billing/invoices` on that address. The production address still says "This site hasn't been published yet."

Staging isn't private. Search engines skip it, but anyone with its address can open it, so treat it as a preview, not a place for secrets.

</div>

<div class="step">

## Promote

Once staging looks right, make it live.

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/projects/$PROJECT_ID/promote \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: acme-help-promote-1"
```

```js "JavaScript"
const promoted = await fetch(`${API}/projects/${projectId}/promote`, {
  method: 'POST',
  headers: { ...headers, 'Idempotency-Key': 'acme-help-promote-1' },
}).then((r) => r.json())

console.log(promoted.url)
```

</div>

```json
{
  "deployment": { "id": "dep_…", "env": "production", "files": 10 },
  "live_deployment_id": "dep_…",
  "url": "https://acme-docs.manifestx.ai",
  "prerender": { "status": "pending" },
  "request_id": "…"
}
```

The site now answers at the production `url`. In the background, Manifest also prerenders its pages to static HTML, and swaps that version in when it's done. See [Publish](/docs/api/guides/publish).

</div>

<div class="step">

## Clean Up

When you're done trying it, delete the project to free its place in your allowance.

<div x-code-group copy>

```bash "cURL"
curl -X DELETE https://api.manifestx.dev/v1/projects/$PROJECT_ID \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
await fetch(`${API}/projects/${projectId}`, { method: 'DELETE', headers })
```

</div>

::: negative icon="lucide:triangle-alert"
Deleting takes both addresses offline at once. The `source_id` `site_8231` stays taken, so use a new one next time. See [Delete a Project](/docs/api/guides/projects#delete-a-project).
:::

</div>

---

## Next Steps

- **Update the site** by sending new [content](/docs/api/guides/docs-template) whenever the pages change. Each request replaces the whole site on staging.
- **Use your own domain** with [Domains](/docs/api/guides/domains).
- **Publish your own build** instead with [Publish](/docs/api/guides/publish).
- **Get notified** when a publish finishes with [Webhooks](/docs/api/guides/webhooks).
