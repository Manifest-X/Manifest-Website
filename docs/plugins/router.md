# Router

Set page navigation paths in your project.

---

## Setup

Routing is supported by an Alpine plugin, available on its own or as part of Indux bundles.

<x-code-group copy>

```html "Standalone"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux tabs plugin only -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.router.js"></script>
```

```html "Indux JS"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux JS -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.js"></script>
```

```html "Quickstart"
<!-- Indux JS, Alpine, and Tailwind combined -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.quickstart.js"></script>
```

</x-code-group>

With the router plugin, Indux turns your project into a single-page application (SPA), where URL paths can be used to show or hide any element, including [components](/plugins/components).

::: brand icon="lucide:info"
Indux routing should be used independent of other routing systems or frameworks.
:::

---

## Routing

`index.html` is the entrypoint for rendering, where high-level elements, layout structures, and [components](/plugins/components) can be applied. Within `index.html` or any component HTML file, use the `x-route` attribute to make any element conditional on a URL path.

<x-code-group>

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

</x-code-group>

If an element in `index.html` has no `x-route` attribute or value, it will render on all routes. Use `/` for rendering only at the base domain route (e.g. `acme.com` instead of `acme.com/page`).

---

### Wildcard Routes

A wildcard route can be used to match any route that starts with the given path.

```html
<div x-route="about/*">...</div>
```

This will match any route that has a subpage after `/about/`, such as `/about/location` or `/about/team`. It will not render for `/about` on its own. Conversely, `x-route="about"` will render for `/about` *and* all subpages, since the value always matches one of the slugs.

A bare wildcard `*` will appear on all routes, similar to having no route defined at all.

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

### Undefined Routes

Use `!*` to show an element on a route that is not defined by any other `x-route` attributes in the project. This is useful for displaying 404 content if the user goes to a bad link. Note that a bare wildcard `*` appears on all routes, defined or not.

```html
<div x-route="!*">404 page not found</div>
```

---

## Page Head Content

The static content in the `index.html` `<head>` tag is global across all routes. To make head content like the title, metas, scripts, or stylesheets conditional to a specific route, place them in a `<template data-head>` tag, subject to its own route condition or that of a parent's.

<x-code-group>

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

        <!-- Specialty page component -->
        <x-specialty x-route="specialty"></x-specialty>

    </body>
</html>
```

```html "specialty.html"
<!-- These assets only append to the head if the specialty page component is rendered -->
<template data-head>
    <title>Specialty Page</title>
    <link rel="stylesheet" href="/styles/specialty.css">
    <script src="/scripts/specialty.js"></script>
</template>

<!-- data-head content can also be nested in a route-specific container -->
 <div x-route="specialty/*">
    <template data-head>
        <script src="/scripts/even-more.js"></script>
    </template>
</div>

...
```
</x-code-group>

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

The router also handles smooth scrolling to anchors within scrollable containers (not part of the page scroll). A default 100px scroll offset is added for better visibility on landing. Initial page loads with hash fragments are also handled automatically.

---

## Anchor Lists

Use `<template x-anchors="...">` to automatically generate anchor links from any elements in your page content, like the "On this page" list in this Indux page. Elements can be identified by tag name, class, or an existing ID. If an element does not have an existing ID, the plugin will auto-generate one from its text content, or otherwise apply a random one.

The `x-anchors` directive uses a pipeline syntax to specify the scope and target elements: `scope | targets`.

```html
<!-- Generates links from h2 and h3 headings within .prose -->
<template x-anchors=".prose | h2, h3">
  <a :href="anchor.link" x-text="anchor.text"></a>
</template>
```

The plugin auto-expands the template with an `anchor` property:

```html
<!-- Indux automatically adds these attributes -->
<template x-anchors=".prose | h2, h3" x-for="anchor in anchors || []" :key="anchor.id">
  <a :href="anchor.link" x-text="anchor.text"></a>
</template>
```

Multiple scopes and targets can be comma-separated:

```html
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

```html
<!-- Scan entire page for headings -->
<template x-anchors="h1, h2, h3, #title, .card">
  <a :href="anchor.link" x-text="anchor.text"></a>
</template>
```

### Styles

Template tags can only have one child. Use a parent container to arrange the links. Alpine binding can be used to conditionally style anchor links based on their target tag, class, or ID.

```html
<template x-anchors=".prose | h2, h3, .callout">
    <div class="col gap-2">
        <a :href="anchor.link" 
            :class="{
                'pl-0': anchor.tag === 'h2',
                'bg-red-100': anchor.class === '.red',
                'opacity-50': anchor.id === '#footnotes'
            }"
            x-text="anchor.text">
        </a>
    </div>
</template>
```

---

## URL Queries

See the Indux plugins for [localization](/plugins/localization) and [URL queries](/plugins/url-queries) that can inject additional information into the URL.