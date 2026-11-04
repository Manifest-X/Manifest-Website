# Security

Manifest's security defaults and the places to opt in to more.

---

## Overview

Manifest hardens itself by default and gives you minimal surface to misconfigure. The framework isolates dev tooling to your machine, keeps unresolved `.env` placeholders out of published builds, and never interprets data-source values as code.

Markdown and SVG render their input as HTML and treat it as developer-controlled; use their `.safe` modifier for content from a party you don't fully trust. Tooltips and toasts show expression results as plain text unless you opt in to HTML.

---

## Built-in Protections

Defaults that apply to every Manifest project, no setup required:

| Protection | What it does |
|---|---|
| Loopback-only dev server | `mnfst-run` binds `127.0.0.1` and validates the `Host` header on every request. Closes both LAN exposure and DNS-rebinding attacks from third-party pages the developer visits. |
| Env placeholders | `${VAR}` values in `manifest.json` resolve at runtime from `window.env`, which `mnfst-run` fills from `.env`. `mnfst-render` strips any unresolved placeholder from the published copy and never bakes `process.env` values into it. |
| Prototype-pollution guards | CSV / JSON / YAML loaders refuse keys named `__proto__`, `constructor`, or `prototype` at any path depth — user-submitted data files cannot mutate `Object.prototype`. |
| Path-traversal blocking | `mnfst-run` and `mnfst-test` static servers resolve every URL through a prefix check and reject `..` segments and NUL bytes. |
| Session-secret isolation | For cross-tab sync, the auth plugin mirrors the signed-in user's profile and a session summary with secrets stripped to `localStorage`. Session secrets stay in the auth provider's cookie. |
| No data evaluation | Data-source values, URL parameters, and text content are never evaluated as code — only expressions you write in attributes and component scripts are. |

---

## Developer-Controlled Surfaces

These places execute code or render HTML by design. The framework doesn't sanitize them, because doing so would block the legitimate uses they exist for. Treat each as the same trust level as code you author in `index.html`:

- **Inline scripts.** `<script>` tags execute as written wherever they appear: in `index.html`, inside component HTML files referenced from `manifest.json`, and inside `<template data-head>` blocks for per-route head injection. Don't compose their bodies from data-source values or URL parameters.
- **HTML and SVG rendering.** `x-markdown`, `x-svg`, and any custom `x-html` binding render their inputs as HTML so authors can include icons, formatting, and Manifest's custom-element extensions, as do `x-tooltip.html`, `x-toast.html`, and `$toast(message, { html: true })`. If the content comes from a party you don't control — user-submitted markdown, uploaded avatars, third-party API responses — use `x-markdown.safe` or `x-svg.safe`, or sanitize at the source before binding.
- **Component registry.** The `components` and `preloadedComponents` arrays in `manifest.json` are fetched and executed at runtime. Keep these static — don't generate paths from URL parameters or data-source values.
- **URL parameters.** `$url` exposes the query string as reactive data. Use values via `x-text`, `x-show`, or attribute bindings (safe by default); don't feed them back into a directive that would re-evaluate them as expressions.

### CDN Resource Integrity

To pin the loader itself, load a specific version of the unminified `manifest.js` with an `integrity` hash plus `crossorigin="anonymous"`. The browser refuses to run the script if its bytes don't match.

```html copy
<script src="https://cdn.jsdelivr.net/npm/mnfst@<version>/lib/manifest.js"
	integrity="sha384-..."
	crossorigin="anonymous"
	data-version="<version>"></script>
```

Each version's hashes are published alongside it in `lib/manifest.integrity.json` (`https://cdn.jsdelivr.net/npm/mnfst@<version>/lib/manifest.integrity.json`); use the `manifest.js` entry. The hash covers the unminified file only — `manifest.min.js` is minified by the CDN and won't match. The plugin scripts the loader fetches afterwards are not hash-checked.

---

## Production Checklist

Before deploying:

- [ ] Run `npx mnfst-test`{copy} to catch stale data-source references, broken routes, accessibility regressions, and console errors
- [ ] Confirm `manifest.json` contains no inlined credentials — it is published with the site
- [ ] Confirm `.env` is in `.gitignore` and absent from the published directory
- [ ] Serve the site over HTTPS
- [ ] Configure a [Content Security Policy](https://developer.mozilla.org/docs/Web/HTTP/CSP) header. Alpine evaluates attribute expressions, so `script-src` needs `'unsafe-eval'`, plus `https://cdn.manifestx.dev https://cdn.jsdelivr.net https://unpkg.com` in `script-src`, `style-src`, and `connect-src`. Icons also need `https://api.iconify.design` in `connect-src`, and runtime utility classes need `style-src 'unsafe-inline'`

---

## Reporting

If you discover a security issue, please report it to [team@manifestx.dev](mailto:team@manifestx.dev). We will respond promptly and coordinate disclosure timing with you.