# Router

Set page navigation paths in your project.

---

## Overview

With the router plugin, Manifest turns your project into a single-page application (SPA), where URL paths can be used to show or hide any element, including [components](/docs/framework/core-plugins/components).

See [website publishing](/docs/framework/publishing/websites) for generating static sites that are optimized for search engines and AI crawlers, also supported by this router.

::: brand icon="lucide:info"
Don't combine this router with another client-side router; both would intercept links.
:::

---

## Setup

The router is included in `manifest.js` with all core plugins, or can be selectively loaded.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="router"></script>
```

</div>

---

## Routing

`index.html` is the entrypoint for rendering, where high-level elements, layout structures, and components can be applied. Within `index.html` or any component HTML file, use the `x-route` attribute to make any element conditional on a URL path.

<div x-code-group>

```html "index.html"
<!DOCTYPE html>
<html>
    <head>
        ...
    </head>
    <body>
        <x-header></x-header>
        <main>

            <!-- Only renders at the base domain -->
            <x-home x-route="/"></x-home>

            <!-- Only renders at the /about route -->
            <h1 x-route="about">About Us</h1>
            <x-about x-route="about"></x-about>

        </main>
        <x-footer></x-footer>
    </body>
</html>
```

```html "home.html"
<div>There's no place like home</div>
```

```html "about.html"
<div>We're all about the Benjamins</div>
```

</div>

If an element in `index.html` has no `x-route` attribute or value, it will render on all routes. Use `/` for rendering only at the base domain route.

Routing accounts for URL content that does not affect the path:
- **Localization codes**: `/fr/features` matches `features` (after stripping the language code)
- **URL parameters**: `features?filter=active` matches `features` (query parameters are ignored)
- **Anchors**: `features#section` matches `features` (hash fragments are ignored)

An element can combine `x-route` with `x-show`, rendering only when both the route matches and the expression is true. An inline `display` set on a routed element is kept when its route hides and shows it again.

```html
<!-- Shows on /settings, and only while advanced is true -->
<div x-route="settings" x-show="advanced">...</div>
```

---

### Exact Routes

Use `=route` to match only the exact route, excluding any subpaths.

```html
<div x-route="=about">...</div>
```

This is useful when you want to show content only on a specific route without it appearing on subroutes.

---

### Wildcard Routes

A wildcard route can be used to match any route that starts with the given path.

```html
<div x-route="about/*">...</div>
```

This will match any route that has a subpage after `/about/`, such as `/about/location` or `/about/team`. It will not render for `/about` on its own.

A bare value like `x-route="about"` matches any path that contains the text, so it also renders on `/about/team`, `/team/about-us` and `/blog/what-about`. Where precise matching matters, use `/about` (the route and its subpages) or `=about` (the route only).

| Value | Renders on |
|---|---|
| `about` | any path containing "about" |
| `/about` | `/about` and its subpages |
| `=about` | `/about` only |
| `about/*` | subpages of `/about` only |
| `!about` | every path not containing "about" |
| `!*` | routes no other `x-route` defines (404) |

A bare, top-level wildcard (`x-route="*"`) matches all routes, and is redundant since it's the same as having no `x-route` attribute at all.

---

### Multiple Routes

Multiple comma-separated values allow the element to render if any of the routes match the current route.

```html
<div x-route="/,about,contact">...</div>
```

---

### Omitted Routes

A leading `!` in front of a value will hide the element from that route.

```html
<div x-route="!features,!pricing">...</div>
```

---

### Catch-all (404) Routes

Use `!*` to show an element on a route that is not defined by any other `x-route` in the project. This is useful for displaying 404 content if the user goes to a bad link. Note that a bare wildcard `*` appears on all routes, defined or not.

```html
<div x-route="!*">404 page not found</div>
```

When using the prerender script, the 404 view is captured at build time and written to `404.html` in the render output folder (`website/` by default), so static hosts can serve it for unknown paths.

---

### Other Paths

The router supports non-navigation paths. See [data](/docs/framework/core-plugins/local-data), [localization](/docs/framework/core-plugins/localization), and [URL parameters](/docs/framework/core-plugins/url-parameters) for plugins that apply additional path segments to the URL for content purposes.

---

### Links

The router handles same-origin links without reloading the page. A link with `target="_blank"` opens its resolved URL (base path and language included) in a new tab, with `noopener` applied. Clicks with a modifier key or the middle mouse button, and links targeting a named frame or window, are left to the browser.

---

## Component Prefetching

Components are fetched lazily by default — only the components needed for the current route are downloaded. The router accelerates this with two automatic optimizations:

- **Parallel batch on route change.** When the route changes, every `<x-*>` tag inside the matching `[x-route]` subtree starts loading at the same time, instead of one-by-one as each tag is encountered. Total wait drops from the sum of fetch times to the slowest single fetch.
- **Hover prefetch.** When the user's pointer enters an internal `<a href>`, the router derives the target route, scans its `[x-route]` subtree for components, and starts fetching them. By the time the user clicks, the components are warm in cache and the navigation feels instant.

Each component is fetched at most once per page, and repeat encounters reuse the cache. To opt a specific link out of hover prefetching, give it the `data-no-prefetch` attribute (the router will still navigate normally, just without warming the components in advance).

---

## Route Magic Property

The router provides a `$route` magic property that returns the current route as a string, enabling conditional statements.

<div x-code-group>

```html copy
<p>Current logical route: <span x-text="$route"></span></p>
<p :class="$route === '/docs/framework/core-plugins/router' ? 'text-brand-content' : ''">I'm a brand color because of the route.</p>
```

::: frame col text-base
<p>Current logical route: <span class="font-bold" x-text="$route"></span></p>
<p class="font-bold" :class="$route === '/docs/framework/core-plugins/router' ? 'text-brand-content' : ''">I'm a brand color because of the route.</p>
:::

</div>

---

## Page Head Content

The static content in the `index.html` `<head>` tag is global across all routes. To make head content like the title, metas, scripts, or stylesheets conditional to a specific route, place them in a `<template data-head>` tag, subject to its own route condition or that of a parent's.

<div x-code-group>

```html "index.html"
<!DOCTYPE html>
<html>
    <head>
        ...
    </head>
    <body>

        <!-- The script will only append to the head in the base and /about routes -->
        <template data-head x-route="/,about">
            <script>
                console.log('Always use your head');
            </script>
        </template>

        <!-- Special page component -->
        <x-special-page x-route="special"></x-special-page>

    </body>
</html>
```

```html "special-page.html"
<!-- These assets only append to the head if the special page component is rendered -->
<template data-head>
    <title>Special Page</title>
    <link rel="stylesheet" href="/styles/special.css">
    <script src="/scripts/special.js"></script>
</template>

<!-- data-head content can also be nested in a route-specific container -->
 <div x-route="special/*">
    <template data-head>
        <script src="/scripts/even-more.js"></script>
    </template>
</div>

...
```
</div>

::: brand icon="lucide:info"
`<script>` content inside `<template data-head>` is moved to the document head and executed — that's how the per-route head injection works. Treat anything inside these script bodies as the same trust level as a script in `index.html`: never compose the script source from data-source values or URL parameters.
:::

---

## Scroll Reset

On a route change the router scrolls the window to the top, along with any scrolled containers (`div`, `main`, `section`, `article`, `aside`, `nav`, `header`, `footer`, or `.prose` elements). Routes with an anchor are skipped so the browser can scroll to the target instead.

Add `data-scroll-keep` to a container or any of its ancestors to keep its scroll position across route changes, like a list that stays on screen while selecting its items changes the route.

```html copy
<div x-route="contacts" class="row">
    <!-- Keeps its scroll position as the selected contact changes -->
    <nav data-scroll-keep class="overflow-y-auto">...</nav>
    <main class="overflow-y-auto">...</main>
</div>
```

The container is kept on every route change, including when its route is hidden and shown again. The attribute is checked on each navigation, so adding or removing it at runtime takes effect on the next one. It only applies to containers: the window still scrolls to the top, even with `data-scroll-keep` on `<html>` or `<body>`, where it keeps every container instead.

---

## Anchor Navigation

The router follows typical anchor link behaviour with smooth scrolling. Link to any element with an `id` attribute using standard HTML.

```html
<!-- Navigate to an element on the same page -->
<a href="#section">Go to Section</a>

<!-- Target element -->
<h2 id="section">Section Title</h2>
```

It also works for anchors in different routes.

```html
<a href="/about#team">About Our Team</a>
```

The router also handles smooth scrolling to anchors within scrollable containers (not part of the page scroll). Initial page loads with hash fragments are also handled automatically. To keep targets clear of a sticky header, set `scroll-margin-top` on them (e.g. `[id] { scroll-margin-top: 5rem }`).

---

## Anchor Lists

Use `<template x-anchors="...">` to automatically list anchor links from any elements in your page content, like the "On this page" menu next to this article. Elements can be identified by tag name, class, or an existing ID. If an element does not have an existing ID, the plugin will auto-generate one from its text content, or otherwise apply a random one.

The `x-anchors` directive uses a pipeline syntax to specify the scope and target elements: `scope | targets`.

```html copy
<!-- Generates links from h2 and h3 headings within .prose -->
<template x-anchors=".prose | h2, h3">
  <a :href="anchor.link" x-text="anchor.text"></a>
</template>
```

Each match clones the template's `<a>` (inside an optional wrapping `<div>`), with `href` and text filled in. Other markup in the template is dropped, and only a `:class` binding is evaluated per link, with `anchor` in scope:

| Property | Description |
|---|---|
| `anchor.id` | The target's ID, without `#` |
| `anchor.text` | The target's text |
| `anchor.link` | `#` plus the ID |
| `anchor.tag` | Lowercase tag name, e.g. `h2` |
| `anchor.class` | The target's first class name |
| `anchor.classes` | All of the target's class names |

`$store.anchors.count` holds the number of matches.

Multiple scopes and targets can be comma-separated:

```html copy
<!-- Multiple scopes and targets -->
<template x-anchors="#article, .content, main | h1, h2, h3, .card">
  <a :href="anchor.link" 
     class="text-content-subtle hover:text-content-neutral text-sm no-underline" 
     :class="anchor.tag === 'h3' ? 'pl-2' : ''"
     x-text="anchor.text">
  </a>
</template>
```

Omit the scope to scan the entire page for the targets:

```html copy
<!-- Scan entire page for headings -->
<template x-anchors="h1, h2, h3, #title, .card">
  <a :href="anchor.link" x-text="anchor.text"></a>
</template>
```

### Styles

Template tags can only have one child. Use a parent container to arrange the links. Alpine binding can be used to conditionally style anchor links based on their target tag, class, or ID.

```html copy
<template x-anchors=".prose | h2, h3, .callout">
    <div class="col gap-2">
        <a :href="anchor.link" 
            :class="{
                'pl-0': anchor.tag === 'h2',
                'bg-red-100': anchor.classes.includes('red'),
                'opacity-50': anchor.id === 'footnotes'
            }"
            x-text="anchor.text">
        </a>
    </div>
</template>
```

---

## View Transitions

Route changes crossfade with the browser's view transitions, on automatically for pages under about 3,000 elements. Add `data-view-transitions` or `data-no-view-transitions` to `<html>` to force them on or off. See [page transitions](/docs/framework/publishing/websites#page-transitions) for timing and styling.

---

## Events

The router dispatches `manifest:route-change`{copy} on `window` after each route change, with `{ from, to, normalizedPath }` in `$event.detail`.

```html copy
<div x-data @manifest:route-change.window="console.log('route:', $event.detail.to)"></div>
```
