# Appwrite Setup

Use <a href="https://appwrite.io/" target="_blank" rel="noopener">Appwrite</a> to turn Manifest projects into production-ready applications.

---

## Overview

Appwrite provides turnkey backend infrastructure, available <a href="https://github.com/appwrite/appwrite" target="_blank">open source</a> or <a href="https://appwrite.io/" target="_blank">cloud hosted</a> with a generous free tier. Together with Manifest you can quickly generate feature-complete applications including user authentication, databases, and storage.

---

## Appwrite Setup

Establish a project with any name and region in <a href="https://appwrite.io/" target="_blank" rel="noopener">Appwrite</a>. Once created you'll access the project console:

::: frame
<img src="/assets/examples/appwrite.overview.webp" alt="Appwrite project"/>
:::

---

### Credentials

Your Manifest project will need the Appwrite project's <b>Project ID</b> and <b>API Endpoint</b> to connect. Get them from the Appwrite project's general <b>Settings</b>, under API credentials:

::: frame
<img src="/assets/examples/appwrite.credentials.webp" alt="Appwrite credentials"/>
:::

---

### Dev Key

An optional <b>Dev Key</b> can also be used during Manifest project development to bypass Appwrite's rate limits. It should not be included in production. Get one from <b>Overview</b> > <b>Dev keys</b>:

::: frame
<img src="/assets/examples/appwrite.devkey.webp" alt="Appwrite dev key"/>
:::

---

## Manifest Setup

### Scripts

Add the Appwrite SDK and `manifest.js` scripts to the HTML head. `manifest.json` is also required to register Appwrite credentials and data sources.

Appwrite plugins can be loaded in two ways: explicitly via the `data-plugins` attribute, or automatically when Appwrite credentials are declared in `manifest.json`. When auto-detected, only the relevant Appwrite plugins are loaded based on the credentials and data sources present. The supporting core data plugin will also be loaded whether or not it's declared.

<div x-code-group>

```html "All Plugins (default)" copy
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective" copy
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="appwrite-auth,appwrite-data"></script>
```

</div>

---

### manifest.json

Add the Appwrite project credentials detailed [above](#credentials) to `manifest.json` under an `appwrite` property. These are inherited by any other objects in the manifest that reference Appwrite, like database or storage sources.

The Project ID and API Endpoint are public and safe to commit — Appwrite enforces access via its own project-level permissions. The Dev Key is sensitive (it bypasses rate limits) and must not be committed. Reference it via `${APPWRITE_DEV_KEY}` and put the value in a gitignored `.env` file. The same `${VAR}` syntax is also supported for the Project ID and API Endpoint if you prefer to keep them out of source.

<div x-code-group>

```json "manifest.json" copy
{
    "appwrite": {
        "projectId": "your-project-id",
        "endpoint": "your-API-endpoint",
        "devKey": "${APPWRITE_DEV_KEY}"
    }
}
```

```env ".env" copy
APPWRITE_DEV_KEY=your-appwrite-dev-key
```

</div>

::: brand icon="lucide:info"
**How `${VAR}` resolution works.** The framework substitutes `${VAR}` placeholders in `manifest.json` against `window.env` at runtime. The `npx mnfst-run`{copy} dev server reads your project's `.env` at startup and injects a `window.env = {…}` block into served HTML automatically — so the substitution just works in local development. If you serve the project with your own local server (Python's `http.server`, `live-server`, `serve`, etc.), it won't inject `window.env` for you; you'll need to add a `<script>window.env = {…}</script>` block to `index.html` before the `manifest.min.js` tag, or your placeholders will reach the plugin unresolved and the auth/data plugins will refuse to initialize.
:::

::: brand icon="lucide:info"
**Production deployments.** Static hosts (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, etc.) serve `manifest.json` verbatim — no runtime substitution. The Dev Key should not ship to production in the first place: it's strictly a development-time convenience for bypassing Appwrite's rate limits, and Appwrite enforces real auth through project-level permissions for live users. For any other `${VAR}` values you actually need in production, either hardcode them directly in `manifest.json` (acceptable for public values like Project ID and API Endpoint), bake them into the prerendered HTML at build time, or use your host's env-var injection feature.
:::

Alternatively, credentials can be added directly into specific [database](/docs/appwrite-plugins/databases) or [storage](/docs/appwrite-plugins/storage) sources, declared within the `data` object.

```json "manifest.json" copy
{
    "data": {
        "projects": {
            "projectId": "your-project-id",
            "endpoint": "your-API-endpoint",
            "appwriteDatabaseId": "your-database-id",
            "appwriteTableId": "your-table-id"
        },
        "assets": {
            "projectId": "your-project-id",
            "endpoint": "your-API-endpoint",
            "appwriteBucketId": "your-bucket-id"
        },
        "other-content": "/local/whatever.csv"
    }
}
```

If credentials are declared in both `appwrite` and `data` objects, the `data` credentials take precedence for their own items.

---

## Next Steps

After a successful setup above, your Manifest project should be paired with your Appwrite project(s). Proceed to configuring:

- [Users](/docs/appwrite-plugins/users) or [Teams](/docs/appwrite-plugins/teams)
- [Databases](/docs/appwrite-plugins/databases) or [Storage](/docs/appwrite-plugins/storage)