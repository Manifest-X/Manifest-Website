# Websites
Publish Manifest projects live to the web.

---

## Default (SPA)

Manifest projects function as a single page application (SPA) by default, using JavaScript for routing. To deploy live on a host environment:

- Deploy the project root directory
- Set the root to `./` if applicable
- Set the fallback file to `./index.html` if applicable

The [starter project](/docs/getting-started/starter-project) includes a `_redirects` file to assist the host with SPA routing.

---

## Optimized (MPA)

Search engines and AI crawlers will execute limited or no JavaScript when indexing websites, effectively rendering SPAs invisible. To adapt, Manifest provides a CLI build script to generate a multi-page application (MPA), where every route is represented by a static, crawlable `index.html`.

### Prerendering

The CLI build script prerenders your SPA into an MPA. From the project root run:

```bash copy
npx mnfst-render
```

By default, output is generated in a `/website` folder which includes:

- Copies of all folders and assets from the project, preserving path references.
- Folders for each route containing its compiled `index.html` page.
- Folders for each locale (e.g. `/fr`, `/zh`), and page sub-folder as applicable.
- Translated text content on locale pages (from CSV or YAML/JSON data sources).
- Locale-prefixed navigation links on locale pages (e.g. `/fr/pricing`).
- Canonical and hreflang links added to each page.
- `og:locale`/`og:locale:alternate` for localized builds when Open Graph tags exist.
- Compiled Tailwind CSS (when `data-tailwind` is used).
- `sitemap.xml`, `robots.txt`, `llms.txt`, and `llms-full.txt` files for crawler discovery.
- Per-route `og:image` PNG snapshots under `/og/`, plus injected OpenGraph, Twitter Card, and JSON-LD meta tags for rich social previews and structured-data search results.
- `.prettierignore`, `.gitattributes`, `.editorconfig`, and `.vscode/settings.json` to help preserve whitespace in code blocks.

---

### Configuration

Use `manifest.json` to optionally customize the MPA build. The `live_url` top-level key sets the domain used in `sitemap.xml`, `robots.txt`, and canonical link tags.

```json "manifest.json" copy
{
  "live_url": "https://example.com",
  "prerender": {
    "output": "website",
    "routerBase": "",
    "locales": ["en", "fr", "zh"],
    "paths": ["legal/privacy", "legal/terms"],
    "localeRouteExclude": ["legal"],
    "redirects": [
      { "from": "/old", "to": "/new", "status": 301 }
    ],
    "wait": 15000,
    "concurrency": 2,
    "retries": 2,
    "browserRecycleEvery": 40,
    "tailwindInput": "styles/tailwind.css"
  }
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `output` | `string` | `"website"` | Output folder name relative to the project root. |
| `routerBase` | `string` | `""` | Base path baked into asset references in prerendered HTML. Leave empty when the output is deployed as the site root. |
| `locales` | `string[]` | auto-discovered | Locale codes to build (e.g. `["en", "fr", "zh"]`). When omitted, locales are inferred from your data source keys or CSV column headers. Set to `["en"]` (your default locale only) to skip locale folder generation when only specific pages use translated example data. |
| `paths` | `string[]` | `[]` | Additional paths to render beyond those auto-discovered from `x-route` attributes (e.g. `["legal/privacy"]`). Each entry is expanded to all locale variants. |
| `localeRouteExclude` | `string[]` | `[]` | Route prefixes that should not receive locale variants (e.g. `["legal"]` keeps `/legal/terms` as-is without generating `/fr/legal/terms`). |
| `redirects` | `object[]` | `[]` | Redirect rules written to the output. Each entry is `{ "from": "/old", "to": "/new", "status": 301 }`. |
| `wait` | `number` | auto | Milliseconds to wait for a page to finish rendering before snapshot. When omitted the renderer waits for a `manifest:render-ready` signal from the data plugin. |
| `concurrency` | `number` | `2` | Number of pages rendered in parallel. Increase for faster builds on high-core machines; decrease if memory is constrained. |
| `retries` | `number` | `2` | Number of retry attempts for pages that fail to render. |
| `browserRecycleEvery` | `number` | `50` | Recycle the browser after this many pages to prevent memory buildup on large sites. |
| `tailwindInput` | `string` | — | Path to a custom Tailwind CSS entry file relative to the project root. Tailwind compilation is otherwise auto-detected via the `data-tailwind` attribute on the manifest script tag. |

---

### SEO & AEO

The prerender automatically fills in head meta, OpenGraph / Twitter Cards, JSON-LD structured data, OG image snapshots, and llms.txt — no configuration required. Layered precedence (highest first): each layer only fills slots not already taken by higher layers.

| # | Source | Notes |
|---|--------|-------|
| 1 | `<template data-head>` per-route | Co-located with the route component. Most intentional. Already supports `$x.*` bindings. |
| 2 | `<head>` in `index.html` | Site-wide author intent. |
| 3 | `manifest.json` `prerender.meta` | Per-route Alpine expressions evaluated in the live page. |
| 4 | `manifest.json` `prerender.meta.fallback` | Static strings used when expressions evaluate empty. |
| 5 | Smart defaults from rendered DOM | `<h1>` for title, first `<p>` for description, OG image snapshot, etc. |
| 6 | `manifest.json` PWA fields | `name` / `description` / `author` / `icons` as last-resort fallback. |

`<title>` and `<meta name="description">` slots are also considered "open" if empty OR if their value matches `manifest.json`'s `name` / `description` (the placeholder rule), so the static `<title>Site</title>` in `index.html` doesn't block route-specific smart-default titles.

#### Configuration

```json "manifest.json" copy
{
  "prerender": {
    "meta": {
      "title":       "$x.docs.$route('path').name + ' — ' + $x.site.name",
      "description": "$x.docs.$route('path').description",
      "image":       "$x.docs.$route('path').image",
      "ogType":      "'article'",
      "imageSnapshots": true,
      "defaults": true,
      "fallback": {
        "title":       "Manifest",
        "description": "Supercharge HTML for rapid, feature-rich website and web app development.",
        "image":       "/assets/og-default.png"
      }
    },
    "structuredData": {
      "WebSite":        true,
      "Article":        true,
      "BreadcrumbList": true
    }
  }
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `meta.title` / `meta.description` / `meta.image` / `meta.ogType` / `meta.author` | Alpine expression | — | Per-route values evaluated in the live page context. Use `$x.*` to access any data source. Strings are treated as JS expressions, so wrap literals in quotes (e.g. `"'article'"`). |
| `meta.fallback.*` | string | — | Static fallback used when the corresponding expression returns null/empty. |
| `meta.imageSnapshots` | boolean | `true` | Auto-snapshot each page (1200×630 PNG saved under `/og/`) and use as `og:image`. Set `false` to skip snapshots and rely on existing image sources only. |
| `meta.defaults` | boolean | `true` | Smart defaults derived from the rendered DOM (h1, first p, etc.). Set `false` for fully explicit control. |
| `structuredData.<Type>` | object \| `true` \| `false` | — | Inject JSON-LD `<script>` blocks. Pass `true` for auto-fill from page content (`WebSite`, `Article`, `BreadcrumbList`), an object for explicit field values, or `false` to suppress. |

#### llms.txt

The renderer writes `/llms.txt` (curated index) and `/llms-full.txt` (concatenated full content) per the <a href="https://llmstxt.org" target="_blank">llmstxt.org</a> convention. LLM crawlers prefer this structured plaintext over scraping rendered HTML. Pages are grouped into sections by their first URL segment.

#### Sitemap `<lastmod>`

Each route's `<lastmod>` is derived from the source markdown file's mtime when discoverable (`articles/<path>.md` or `articles/<path-without-section-prefix>.md`), falling back to the prerendered HTML mtime. This keeps the sitemap honest about content freshness across rebuilds.

---

### Hydration

The prerendering build process makes all HTML/Alpine content static. To preserve dynamic functionality on a specific element, apply the `data-hydrate` attribute. The prerender will restore that element's source code at runtime so Alpine can initialize it normally.

<x-code-group>

```html "Hydrated"
/* Maintains source code & dynamic functionality */
<div x-data="{ counter: 0 }" data-hydrate>
  <button @click="counter++" x-text="counter"></button>
</div>
```

```html "Default/Static"
/* Uses static value from prerendered snapshot */
<div x-data="{ counter: 0 }">
  <button @click="counter++">0</button>
</div>
```

</x-code-group>

Interactive directives like `x-color`, `x-model`, `@click`, and `:class` are automatically handled by the hydration system and generally do not need `data-hydrate`.

---

### Dynamic Routes

Routes with sub-pages driven by data (e.g. a `<x-docs>` component that resolves articles from a YAML file) need a wildcard `*` to be discovered by the prerender. Use comma-separated conditions to match both the prefix and its children:

```html "index.html" copy
<x-docs x-route="/docs, /docs/*"></x-docs>
```

The renderer will then enumerate every `path:` entry in the matching data source under `/docs/`, producing a static page per article.

---

### Page Transitions

Manifest enables <a href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API" target="_blank">view transitions</a> for both SPA route changes and prerendered MPA navigations. Pages crossfade automatically in supporting browsers; browsers without support fall back to instant navigation.

For **MPA** (prerendered) navigations, transitions are always on — the browser handles them natively in parallel with page load.

For **SPA** route changes, the framework picks a default based on page size, with explicit override:

| Mode | When |
|---|---|
| `<html data-view-transitions>` | Force on, regardless of page size |
| `<html data-no-view-transitions>` | Force off |
| (neither) | Auto: on under ~3,000 DOM elements, off above |

The auto threshold exists because the View Transitions API rasterizes the full viewport for both the "before" and "after" snapshots; on heavy pages this can add 500ms+ of perceived navigation latency. Use force-on if the visual transition is worth the cost on a busy page; use force-off to keep things instant on a light one.

Tune the default duration and easing via CSS custom properties:

```css copy
:root {
    --view-transition-duration: 200ms;
    --view-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Opt specific elements out of the transition by adding `data-no-view-transition` (singular) or setting `view-transition-name: none` in CSS. Live/embedded content like `<iframe>`, `<video>`, and `<canvas>` are excluded by default to prevent flicker mid-transition.

```html copy
<div data-no-view-transition>
    <!-- Excluded from page transition snapshot -->
</div>
```

Authors who want elements to morph between pages (e.g. a hero image shared between list and detail views) can give matching elements the same `view-transition-name`:

```css copy
.hero-image {
    view-transition-name: hero;
}
```

::: brand icon="lucide:info"
Respects `prefers-reduced-motion` automatically through Manifest's existing reduced-motion reset.
:::

---

### Publishing

To deploy an MPA on a host environment, set the root directory to the prerendered output directory (i.e. `./website`).

---

## Pre-deploy Check

Run the project linter before publishing to catch regressions — typo'd component tags, dead data sources, syntax errors in Alpine expressions, console errors, a11y violations, and broken internal links:

```bash copy
npx mnfst-test
```

Pass a path to target a different directory:

```bash copy
npx mnfst-test ./website
```

Exits non-zero on any errors, suitable for CI gating. See [Testing](/docs/getting-started/testing) for full details.
