# Introduction

Create, update, and publish projects from your own code.

---

## What the API Is For

The API does from code what Claude does in a session: it creates projects, updates them, and publishes them. A project can be anything that runs in a browser, like a website, app, dashboard, or game. Manifest hosts it, with staging, HTTPS, and custom domains.

For example, you could:

- **Publish at scale**, like a page for every product, location, or event.
- **Give your customers projects**, like a help center or portal for each one.
- **Publish from your own tools**, like a content system or a build pipeline.

Your API key also reaches the projects you already have.

---

## How It Works

1. **Create a project**, tagged with your own ID so you can find it again.
2. **Send updates**: a full build, or just the files that changed. Updates land on staging.
3. **Check staging**, a separate address each project has for checking changes.
4. **Promote**, so the exact version you checked goes live.
5. **Add a domain**, if you want one, like `help.example.com`.

Each publish creates a **deployment**, one saved version of the project. Manifest keeps recent ones, so a Pro project can roll back.

Both addresses are public, but staging is kept out of search results. It's for checking a change before visitors see it on production, not for keeping it private.

The [Quickstart](/docs/api/getting-started/quickstart) runs through all of this in a few minutes.

---

## Ways to Update

- **Upload a build.** Zip your project's files and upload them. Any static build works, from the Manifest framework or any other. See [Publish](/docs/api/guides/publish).
- **Change files.** Send only the files that changed: pages, data, settings, styles, or images. See [Edit](/docs/api/guides/edit).
- **Use the docs template.** Send Markdown pages and get a documentation site, with no build of your own. See [Docs Template](/docs/api/guides/docs-template).

---

## What's Included

Every Manifest account can use the API. Create a key on the dashboard's <a href="https://dash.manifestx.dev/api" target="_blank">API page</a>; see [Authentication](/docs/api/reference/authentication). No account yet? Signing in to the dashboard creates a free one.

Projects your key creates are ordinary Manifest projects. They show in your dashboard and in Claude, and can be upgraded to Pro there.

| | Every account | Enterprise |
|---|---|---|
| Projects created through the API | Two, on the Free plan | A higher cap, by contract |
| Your existing projects | ✓ | |
| "Made with Manifest" badge | Shown | None |
| How to get it | Dashboard | <a href="/support?topic=enterprise#contact" target="_blank">Talk to us</a> |

Each project keeps its own plan, so a Pro feature such as rollback needs that project on Pro. An Enterprise account's keys reach only the projects that account creates. Rate limits and storage caps are on [Limits](/docs/api/reference/limits).

---

## Base URL

All requests go to one versioned base URL:

```text copy
https://api.manifestx.dev/v1
```

Only `/v1` paths exist on this host.

---

## Conventions

- **JSON.** Requests and responses are JSON.
- **Bearer key.** Every request sends `Authorization: Bearer <key>`{copy}. See [Authentication](/docs/api/reference/authentication).
- **Server only.** Call the API from your server. Browsers are refused.
- **Timestamps** are Unix seconds, like `1760140800`.
- **Ids** start with a prefix: `acct_` for accounts, `proj_` for projects, `dep_` for deployments.
- **`request_id`** is on every response. Quote it when you contact Manifest.
- **Safe retries.** Every request that changes something can be retried safely. See [Idempotency](/docs/api/reference/errors#idempotency).

Stuck? [Common Problems](/docs/api/reference/errors#common-problems) maps symptoms to fixes.
