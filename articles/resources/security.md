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
| Env placeholders | `${VAR}` values in `manifest.json` resolve at runtime from `window.env`, which `mnfst-run` fills with the `PUBLIC_`-prefixed values in `.env`; other values are never sent to the browser. `mnfst-render` strips any unresolved placeholder from the published copy and never bakes `process.env` values into it. |
| Prototype-pollution guards | CSV / JSON / YAML loaders refuse keys named `__proto__`, `constructor`, or `prototype` at any path depth — user-submitted data files cannot mutate `Object.prototype`. |
| Path-traversal blocking | `mnfst-run` and `mnfst-test` static servers resolve every URL through a prefix check and reject `..` segments and NUL bytes. |
| Session-secret isolation | For cross-tab sync, the auth module mirrors the signed-in user's profile and a session summary with secrets stripped to `localStorage`. Session secrets stay in the auth provider's cookie. |
| No data evaluation | Data-source values, URL parameters, and text content are never evaluated as code — only expressions you write in attributes and component scripts are. |

---

## Developer-Controlled Surfaces

These places execute code or render HTML by design. The framework doesn't sanitize them, because doing so would block the legitimate uses they exist for. Treat each as the same trust level as code you author in `index.html`:

- **Inline scripts.** `<script>` tags execute as written wherever they appear: in `index.html`, inside component HTML files referenced from `manifest.json`, and inside `<template data-head>` blocks for per-route head injection. Don't compose their bodies from data-source values or URL parameters.
- **HTML and SVG rendering.** `x-markdown`, `x-svg`, and any custom `x-html` binding render their inputs as HTML so authors can include icons, formatting, and Manifest's custom-element extensions, as do `x-tooltip.html`, `x-toast.html`, and `$toast(message, { html: true })`. If the content comes from a party you don't control — user-submitted markdown, uploaded avatars, third-party API responses — use `x-markdown.safe` or `x-svg.safe`, or sanitize at the source before binding.
- **Component registry.** The `components` and `preloadedComponents` arrays in `manifest.json` are fetched and executed at runtime. Keep these static — don't generate paths from URL parameters or data-source values.
- **URL parameters.** `$url` exposes the query string as reactive data, and anyone can write a link that sets it. Values are safe in `x-text` and `x-show`. Don't feed them back into a directive that would re-evaluate them as expressions.
- **Link and source attributes.** A value bound into `:href`, `:src`, `:action`, or `:formaction` is used as a URL, and a URL starting with `javascript:` runs as code when followed. Before binding a URL that comes from the query string, a data source, or another user, check that it starts with `/`, `https://`, or `http://`.

```html "Checking a URL before binding it" copy
<a :href="/^(\/(?!\/)|https?:\/\/)/.test($url.next.value) ? $url.next.value : '/'">Continue</a>
```

### CDN Resource Integrity

Pin the loader to an exact version and add an `integrity` hash plus `crossorigin="anonymous"`. The browser refuses to run the loader if its bytes don't match. The loader then checks everything it and its modules load from a CDN against hashes published with that version.

```html copy
<script src="https://cdn.manifestx.dev/npm/mnfst@<version>/lib/manifest.min.js"
	integrity="sha384-..."
	crossorigin="anonymous"></script>
```

Copy the hash from the `manifest.min.js` entry in that version's `lib/manifest.integrity.json` (for example `https://cdn.manifestx.dev/npm/mnfst@<version>/lib/manifest.integrity.json`). The file lists every script and stylesheet in the release, so your stylesheet `<link>` tags can carry `integrity` too.

What gets checked:

- The modules, the Tailwind engine and Alpine.
- The third-party libraries modules load: marked and DOMPurify (markdown, SVG), highlight.js and its language files, CodeJar (code), the d3 modules and map data (charts), js-yaml and PapaParse (data), html2canvas-pro and jsPDF (export), and Polar's checkout script (payments).

What isn't checked:

- Checkout scripts hosted by Stripe, Paddle, Revolut, Lemon Squeezy and Razorpay. They change in place, so they can't carry a hash.
- Icon artwork from the Iconify API.
- The service worker module, when your `/sw.js` imports it from a CDN (see below).
- Anything your own page loads; give those tags their own `integrity`.

How checks behave:

- Each script the loader adds carries `integrity` and `crossorigin="anonymous"`.
- A file that doesn't match its hash is blocked. The console shows an error naming it, and the loader tries the next CDN. A file that matches on no CDN isn't loaded.
- Modules load at the loader's own version, so `data-version` isn't needed. If `data-version` names another version or `latest`, no modules load and the console says why.
- If the published hash list itself can't be verified, no modules load.
- Alpine is checked at its default version, and at every version an earlier release defaulted to. If `data-alpine` sets another version or URL, add `data-alpine-integrity="sha384-..."`. Without it, Alpine doesn't load.
- With checks on, code highlighting loads the highlight.js bundle plus a verified file per extra language. Code blocks with `edit` import their verified CodeJar from a `blob:` URL.
- With a Content Security Policy, the loader reads its hash lists, map data and CodeJar with `fetch`, so the CDN hosts (`https://cdn.manifestx.dev https://cdn.jsdelivr.net https://unpkg.com`) belong in `connect-src` as well as `script-src`. Add `blob:` to `script-src` if you use code blocks with `edit`.

`data-integrity="warn"` logs a warning instead of refusing in the cases above (a different `data-version`, an Alpine without a hash), and loads those files unchecked. A file that fails its hash is never loaded, and if the published hash list can't be verified, modules still don't load. Bare `data-integrity` turns the checks on for a loader tag without `integrity`, such as a self-hosted copy. `data-integrity="off"` or `"false"` turns them off.

`importScripts` can't carry a hash, so with checks on, the [service worker](/docs/framework/publishing/web-apps) registers only when `/sw.js` doesn't import its module from another origin. To keep it, copy `lib/manifest.sw.min.js` from the same release into your `/sw.js`. Otherwise it stays off and the console says so. Set `data-sw="off"` to skip it quietly. `data-integrity="warn"` registers it anyway.

Loaders before 0.5.309 don't check the scripts they add.

---

## Production Checklist

Before deploying:

- [ ] Run `npx mnfst-test`{copy} to catch stale data-source references, broken routes, accessibility regressions, and console errors
- [ ] Confirm `manifest.json` contains no inlined credentials — it is published with the site
- [ ] Confirm `.env` is in `.gitignore` and absent from the published directory
- [ ] Serve the site over HTTPS
- [ ] Send a [Content Security Policy](#content-security-policy) header

---

## Content Security Policy

A Content Security Policy (CSP) is a response header that tells the browser which scripts, styles, and connections a page may use. The policy below is enough to run a Manifest project that uses the default CDNs, icons, and code blocks.

```text "Content-Security-Policy" copy
default-src 'self';
script-src 'self' 'unsafe-eval' https://cdn.manifestx.dev https://cdn.jsdelivr.net https://unpkg.com https://esm.run;
style-src 'self' 'unsafe-inline' https://cdn.manifestx.dev https://cdn.jsdelivr.net https://unpkg.com;
connect-src 'self' https://cdn.manifestx.dev https://cdn.jsdelivr.net https://unpkg.com https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com;
img-src 'self' data: blob: https:;
font-src 'self' data:;
worker-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'self'
```

Send the policy as a single line, then add the entries that match what your project uses.

| If the project uses | Add |
|---|---|
| Appwrite | Your Appwrite endpoint in `connect-src`, as both `https://` and `wss://` |
| A prerendered site with color modes | The `sha256-` hash of the inline theme script in `script-src`. The browser console prints the hash when it blocks the script. |
| Code blocks with `edit`, with integrity checks on | `blob:` in `script-src` |
| Payments | The provider's script host in `script-src` and its checkout host in `frame-src` |
| Manifest hosting | `https://static.cloudflareinsights.com` in `script-src` and `https://cloudflareinsights.com` in `connect-src`, for analytics |

Three of those entries are looser than a strict policy would allow, and each is there for a reason:

- **`'unsafe-eval'` in `script-src`.** Alpine turns the expressions in your attributes into functions, so no expression runs without it.
- **`'unsafe-inline'` in `style-src`.** Utility classes are compiled into a `<style>` element in the browser, and directives such as `x-show` write `style` attributes.
- **`https://esm.run` in `script-src`.** Code highlighting loads its language files from there unless integrity checks are on.

The policy stops inline `<script>` tags and `onclick`-style attributes that reach the page through injected HTML. It also stops embedded objects, framing by other sites, and requests to hosts you haven't listed.

The policy doesn't stop injected HTML that carries Alpine directives. With `'unsafe-eval'` allowed, an injected `x-init` runs like one of your own, so keep untrusted content out of HTML sinks or render it with `.safe`.

jsDelivr and unpkg serve every package on npm, so listing them lets a page load any script published there. If your loader tag carries `integrity`, you can drop both of them, along with `https://esm.run`, and keep only `https://cdn.manifestx.dev`, which serves only the packages Manifest itself loads. The loader then has no second CDN to fall back to if that one is unreachable.

To try a policy without breaking the page, send it as `Content-Security-Policy-Report-Only` first and read what the browser console reports.

On Manifest hosting, response headers go in a `_headers` file at the root of the published folder.

```text "_headers" copy
/*
  Content-Security-Policy: <the policy above, on one line>
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

Each path line is followed by its header lines, indented, and `/*` matches every page. Hosting accepts only security headers, which are `Content-Security-Policy`, `Content-Security-Policy-Report-Only`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`, `Strict-Transport-Security`, the three `Cross-Origin-*-Policy` headers, and `X-Robots-Tag`. Any other header in the file is ignored.

---

## Reporting

If you discover a security issue, please report it to [team@manifestx.dev](mailto:team@manifestx.dev). We will respond promptly and coordinate disclosure timing with you.