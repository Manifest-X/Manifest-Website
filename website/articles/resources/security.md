# Security

Manifest's security defaults and the places to opt in to more.

---

## Overview

Manifest hardens itself by default and gives you minimal surface to misconfigure. The framework verifies every script it loads, isolates dev tooling to your machine, prevents inlined credentials from shipping to production, and never interprets data-source values as code.

Anything that renders rich HTML — markdown, SVG, tooltips, toasts — treats its input as developer-controlled. If you bind any of those to content sourced from a party you don't fully trust, sanitize at the source before binding.

---

## Built-in Protections

Defaults that apply to every Manifest project, no setup required:

| Protection | What it does |
|---|---|
| Subresource Integrity | The loader injects every plugin script with a SHA-384 hash baked in at build time. If a CDN response doesn't match, the browser refuses to execute it — defends against CDN poisoning and npm package hijack. |
| Loopback-only dev server | `mnfst-run` binds `127.0.0.1` and validates the `Host` header on every request. Closes both LAN exposure and DNS-rebinding attacks from third-party pages the developer visits. |
| Credential relocation | `mnfst-render` scans `manifest.json` for credential-shaped fields holding literal values, moves them to `.env`, and rewrites the source to use `${VAR}` placeholders. Secrets cannot ship. |
| Sandboxed prerenderer | Puppeteer launches with Chrome's process sandbox enabled. A renderer exploit can't escape the sandbox to reach the developer's filesystem. |
| Prototype-pollution guards | CSV / JSON / YAML loaders refuse keys named `__proto__`, `constructor`, or `prototype` at any path depth — user-submitted data files cannot mutate `Object.prototype`. |
| Path-traversal blocking | `mnfst-run` and `mnfst-test` static servers resolve every URL through a prefix check and reject `..` segments and NUL bytes. |
| Session-secret isolation | The auth plugin syncs only non-sensitive fields (user ID, expiry, provider) across tabs. Bearer secrets stay in the cookie scope of the auth provider, not in `localStorage`. |
| No dynamic eval | The framework never `eval`s, `Function`-constructs, or otherwise interprets data-source values, URL parameters, or DOM text as code. |

---

## Developer-Controlled Surfaces

These places execute code or render HTML by design. The framework doesn't sanitize them, because doing so would block the legitimate uses they exist for. Treat each as the same trust level as code you author in `index.html`:

- **Inline scripts.** `<script>` tags execute as written wherever they appear: in `index.html`, inside component HTML files referenced from `manifest.json`, and inside `<template data-head>` blocks for per-route head injection. Don't compose their bodies from data-source values or URL parameters.
- **HTML and SVG rendering.** `x-markdown`, `x-svg`, `x-tooltip`, `$toast`, and any custom `x-html` binding render their inputs as HTML so authors can include icons, formatting, and Manifest's custom-element extensions. If the content comes from a party you don't control — user-submitted markdown, uploaded avatars, third-party API responses — sanitize at the source before binding.
- **Component registry.** The `components` and `preloadedComponents` arrays in `manifest.json` are fetched and executed at runtime. Keep these static — don't generate paths from URL parameters or data-source values.
- **URL parameters.** `$url` exposes the query string as reactive data. Use values via `x-text`, `x-show`, or attribute bindings (safe by default); don't feed them back into a directive that would re-evaluate them as expressions.

### CDN Resource Integrity

When loading a Manifest script from CDN, apply additional security by pinning a version and adding an `integrity` hash plus `crossorigin="anonymous"`. The browser will then refuse to execute the script if the bytes don't match, defending against any CDN compromise.

```html copy
<script src="https://cdn.jsdelivr.net/npm/mnfst@0.5.17/lib/manifest.min.js"
	integrity="sha384-..."
	crossorigin="anonymous"
	data-version="0.5.17"></script>
```

The loader's hash for each version is published alongside it as `lib/manifest.integrity.json` (e.g. `https://cdn.jsdelivr.net/npm/mnfst@0.5.83/lib/manifest.integrity.json`). Once the loader is verified, it applies SRI automatically to every plugin it injects.

---

## Production Checklist

Before deploying:

- [ ] Run `npx mnfst-test`{copy} to catch stale data-source references, broken routes, accessibility regressions, and console errors
- [ ] Confirm `manifest.json` contains no inlined credentials (`mnfst-render` enforces this, but verify your build output)
- [ ] Confirm `.env` is in `.gitignore` and absent from the published directory
- [ ] Serve the site over HTTPS
- [ ] Configure a [Content Security Policy](https://developer.mozilla.org/docs/Web/HTTP/CSP) header that allows `https://cdn.jsdelivr.net` for scripts, styles, and fonts; Manifest's runtime utility-class generation requires `style-src 'unsafe-inline'`

---

## Reporting

If you discover a security issue, please report it to [team@manifestx.dev](mailto:team@manifestx.dev). We will respond promptly and coordinate disclosure timing with you.