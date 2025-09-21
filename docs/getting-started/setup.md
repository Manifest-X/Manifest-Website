# Setup

Bring Indux into your project by CDN or copied from <a href="https://github.com/andrewmatlock/Indux" target="_blank">GitHub</a>.

---

## Overview

Indux consists of Alpine plugin scripts and CSS stylesheets, available individually for targeted use cases, or conveniently bundled for broad application.

---

## Scripts
Indux scripts are plugins that extend [Alpine JS](https://alpinejs.dev) v3 and above.

Load the script tags once in the index head (or anywhere in the body), in any order, using one of three approaches:

<x-code-group copy>

```html "Quickstart"
<!-- Indux (all plugins), Alpine JS, and Tailwind CSS bundled together -->
<script defer src="https://cdn.jsdelivr.net/npm/indux/dist/indux.alpine.tailwind.js"></script>
```

```html "All Plugins"
<!-- Alpine JS -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux (all plugins) -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.js"></script>
```

```html "Individual Plugins"
<!-- Alpine JS -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux (individual plugins) -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.components.js"></script>
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.icons.js"></script>
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.themes.js"></script>
...
```

</x-code-group>

::: brand icon="lucide:info"
Any script tag loading Alpine JS must include `defer` to function.

All-Inclusive contains a local copy of Tailwind's Play CDN script, modified to support custom utility classes at runtime.
:::

---

## Stylesheets
Add the desired Indux CSS stylesheets to the `<head>` of your HTML file. Like scripts, they're available individually or bundled:

<x-code-group copy>

```html "All Styles"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.css">
</head>
```

```html "Individual Styles"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.reset.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.theme.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.buttons.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.utilities.css">
    ...
</head>
```

</x-code-group>

::: brand icon="lucide:info"
Individual stylesheets typically reference `indux.theme.css` for global CSS variables, using static fallback values in its absence.
:::