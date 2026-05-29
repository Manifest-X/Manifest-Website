# SEO & AEO

Help search engines and AI crawlers find, understand, and rank your site.

---

## Overview

Search engine optimization (SEO) and answer engine optimization (AEO, for AI crawlers) both rely on the same fundamentals. Pages need clear titles, descriptions, preview images, and machine-readable hints about what each page contains.

When you render your site into an MPA with `npx mnfst-render`{copy} (see [websites](/docs/publishing/websites)), Manifest generates all of this automatically. No configuration is needed for most sites. This article covers what gets generated, when you'd want to customize it, and how.

---

## Automation

The rendering process automatically populates:

- **Page titles** and **descriptions** for browser tabs and search results
- **OpenGraph** and **Twitter Card tags** for previews when your pages are shared on social media
- **OG image snapshots**, automatic 1200×630 PNG screenshots of each page, used as the social preview image
- **Structured data** in JSON-LD format, so search engines understand the content type (article, breadcrumb, product, etc.) and can render rich results
- **sitemap.xml** listing every page so crawlers can find them
- **robots.txt** telling crawlers what they can and can't index
- **llms.txt** and **llms-full.txt** for AI crawlers, per the <a href="https://llmstxt.org" target="_blank">llmstxt.org</a> convention

Defaults are derived from each page's rendered content. The first `<h1>` becomes the title, the first `<p>` becomes the description, a screenshot of the page becomes the social-share image. For most sites that's enough.

### llms.txt

The renderer writes `llms.txt` (a curated index of your site) and `llms-full.txt` (the concatenated full content) per the <a href="https://llmstxt.org" target="_blank">llmstxt.org</a> convention. AI crawlers prefer reading this structured plaintext over scraping rendered HTML. Pages are grouped into sections by their first URL segment.

---

### Sitemap Freshness

`sitemap.xml` lists every rendered route. Each entry includes a `<lastmod>` timestamp telling crawlers when the page last changed, so they know when to re-check it.

The renderer computes `<lastmod>` from the most recent modification time across every file that contributes content to the route. This includes local `csv`, `json`, `yaml`, and `md` files, but excludes remote sources like Appwrite or HTTP endpoints, since there's no local modification time to reference.

---

## Customization

The most common reasons to override the auto-generated values are:

- A designed social-share image for important pages, instead of a page screenshot
- Per-page titles and descriptions sourced from your CMS or data files
- A branded title pattern across the whole site (e.g. every page reads `Page Name — Site Name`)
- Article structured data with author, publish date, and similar metadata

Manifest gives you four ways to set these values, applied in priority order. If a value is already set by a higher-priority source, the lower-priority ones are skipped for that value.

**1. Per-route head tags in a component.** The most direct override, useful for one-off pages, placed directly in their HTML:

```html "component.html" copy
<template data-head>
    <title>About Us — Acme</title>
    <meta name="description" content="Founded in 1985, Acme builds…">
    <meta property="og:image" content="/assets/og/about.png">
</template>
```

**2. Global head tags** in `index.html`'s `<head>`, applied as a fallback to every page (e.g. a default social-share image used for any page that doesn't supply its own).

**3. Per-route expressions** in `manifest.json`'s `render.meta`. Useful for generating titles and descriptions from a data source across many routes at once:

```json "manifest.json" copy
{
    "render": {
        "meta": {
            "title": "$x.docs.$route('path').name + ' — Acme'",
            "description": "$x.docs.$route('path').description",
            "image": "$x.docs.$route('path').image"
        }
    }
}
```

**4. Static fallbacks** in `manifest.json`'s `render.meta.fallback`. Used when the expression above returns nothing:

```json "manifest.json" copy
{
    "render": {
        "meta": {
            "fallback": {
                "title": "Acme",
                "description": "We build things since 1985.",
                "image": "/assets/og/default.png"
            }
        }
    }
}
```

If none of these set a value, Manifest falls back to the smart defaults derived from the page content. If even those come up empty, your `manifest.json`'s PWA fields (`name`, `description`, `icons`) act as a last-resort.

::: brand icon="lucide:info"
A `<title>` or `<meta name="description">` in `index.html` whose value matches your `manifest.json`'s `name` or `description` is treated as a placeholder, so a default like `<title>Acme</title>` doesn't block route-specific smart-default titles from filling in.
:::

---

## Structured Data

Structured data tells search engines what type of content each page contains. Google uses it to render rich results, like article cards, breadcrumb trails, FAQ accordions, and product cards. Manifest can inject three common types automatically:

```json "manifest.json" copy
{
    "render": {
        "structuredData": {
            "WebSite":        true,
            "Article":        true,
            "BreadcrumbList": true
        }
    }
}
```

Pass `true` to auto-fill from page content, an object to specify exact field values, or `false` to suppress that type.

---

## Reference

The full set of options under `render.meta` in `manifest.json`, plus the `render.structuredData` row covered above:

```json "manifest.json" copy
{
  "render": {
    "meta": {
      "title":       "$x.docs.$route('path').name + ' — ' + $x.site.name",
      "description": "$x.docs.$route('path').description",
      "image":       "$x.docs.$route('path').image",
      "ogType":      "'article'",
      "imageSnapshots": true,
      "defaults": true,
      "fallback": {
        "title":       "Acme",
        "description": "We build things since 1985.",
        "image":       "/assets/og/default.png"
      }
    }
  }
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `meta.title` / `meta.description` / `meta.image` / `meta.ogType` / `meta.author` | Alpine expression | — | Per-route values evaluated in the live page context. Use `$x.*` to access any data source. Strings are treated as JS expressions, so wrap literals in quotes (e.g. `"'article'"`). |
| `meta.fallback.*` | string | — | Static fallback used when the corresponding expression returns null or empty. |
| `meta.imageSnapshots` | boolean | `true` | Auto-snapshot each page (1200×630 PNG saved under `/og/`) and use as `og:image`. Set `false` to skip snapshots and rely on existing image sources only. |
| `meta.defaults` | boolean | `true` | Smart defaults derived from the rendered page (h1, first p, etc.). Set `false` for fully explicit control. |
| `structuredData.<Type>` | object \| `true` \| `false` | — | Inject JSON-LD `<script>` blocks. Pass `true` for auto-fill from page content (`WebSite`, `Article`, `BreadcrumbList`), an object for explicit field values, or `false` to suppress. |