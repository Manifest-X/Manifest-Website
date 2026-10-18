# Introduction

Create, publish, and manage Manifest-hosted sites from your own code.

---

## What the API does

The Manifest API lets your backend create sites and keep them published without a person in the loop. Each site is an ordinary Manifest project, so it has its own deployments, staging and production environments, domains, and team. Your API key also reaches the projects you already have, so you can publish them from your own code.

There are two ways to publish a site today:

- **Send content for a Manifest template.** Send the site's pages, written in Markdown, plus its settings and theme, and Manifest builds the site from one of its templates. Today that is the docs template, for documentation and help sites. See [Content](/docs/api/projects/content).
- **Upload your own site files** as a zip: a Manifest project, custom or from any template, or any other static build. Any static build works from frameworks like Manifest, React, Vite, Astro, or just plain HTML. See [Publish](/docs/api/projects/publish).

Either way, the site goes to staging first and moves to production when you [promote](/docs/api/projects/publish#promote-staging-to-production) it.

---

## Getting access

Every Manifest account can use the API. Create an API key in the [dashboard](https://dash.manifestx.dev/settings) under **Settings**, then **API keys**. See [Authentication](/docs/api/setup/authentication#create-an-api-key).

A key works on two kinds of project:

- **Your own projects.** It can publish, promote, roll back, and manage domains on every project you own or admin. Each project keeps its own plan, so a Pro feature such as rollback needs that project on Pro.
- **Projects it creates.** Your keys share a free allowance of 2 projects created through the API, on the Free plan.

For more projects, ask about a platform account at [team@manifestx.dev](mailto:team@manifestx.dev). Platform accounts are set up by contract, with a higher project cap and projects created without the Manifest badge. See [Manage](/docs/api/projects/manage#what-a-key-can-manage).

---

## Base URL

All requests go to one versioned base URL:

```text copy
https://api.manifestx.dev/v1
```

Requests and responses are JSON. Every response carries a `request_id`{copy}; quote it when you contact Manifest.

---

## How it works

1. **Get an API key** from the dashboard. See [Authentication](/docs/api/setup/authentication).
2. **Create a project** for each site, keyed by your own id for it. See [Manage](/docs/api/projects/manage).
3. **Publish to staging**, either a zip or content, and check the staging URL.
4. **Promote to production.** Attach a custom domain whenever you like with [Domains](/docs/api/projects/domains).

Every request that changes something is safe to retry. See [Idempotency](/docs/api/reference/idempotency).

The [Quickstart](/docs/api/setup/quickstart) runs through all of this in five requests.
