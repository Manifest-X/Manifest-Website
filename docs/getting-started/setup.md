# Setup

Get Indux with CDN links or copied from <a href="https://github.com/andrewmatlock/Indux/tree/master/src" target="_blank">GitHub</a>.

---

## Overview

Indux consists of Alpine plugin scripts and CSS stylesheets, available individually for targeted use cases, or conveniently bundled for broad application.

---

## Scripts
Indux scripts are plugins that extend <a href="https://alpinejs.dev" target="_blank">Alpine JS</a> v3 and above.

Load the script tags once in the index head (or anywhere in the body), in any order, using one of three approaches:

<x-code-group copy>

```html "Quickstart (420kb)"
<!-- Indux (all plugins), Alpine JS, and Tailwind CSS bundled together -->
<script defer src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.quickstart.min.js"></script>
```

```html "All Plugins (120kb)"
<!-- Alpine JS -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux (all plugins) -->
<script src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.min.js"></script>
```

```html "Individual Plugins (<10kb)"
<!-- Alpine JS -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux (individual plugins) -->
<script src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.components.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.icons.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.themes.min.js"></script>
...
```

</x-code-group>

::: brand icon="lucide:info"
Any script tag loading Alpine JS must include `defer` to function.
:::

---

## Stylesheets
Add the desired Indux CSS stylesheets to the `<head>` of your HTML file. Like scripts, they're available individually or bundled:

<x-code-group copy>

```html "All Styles"
<head>
  <!-- Other tags -->

  <!-- Styles -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.theme.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.css">

  <!-- Other tags -->
</head>
```

```html "Individual Styles"
<head>
  <!-- Other tags -->

  <!-- Styles -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.reset.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.theme.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.buttons.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.utilities.css">

  <!-- Other tags -->
</head>
```

</x-code-group>

::: brand icon="lucide:info"
Individual stylesheets typically reference `indux.theme.css` for global CSS variables, using static fallback values in its absence.
:::

---

## Command Line

Indux also provides `npx` commands to manage local files.

### Individual File Updates

Download or update specific core Indux files:

```bash copy
npx @indux/indux.js
npx @indux/indux.quickstart.js
npx @indux/indux.css
npx @indux/indux.theme.css
npx @indux/indux.code.css
```

---

### Bulk Update

Scan your project directory and update all existing Indux files (except `indux.theme.css`, which is typically customized):

```bash copy
npx @indux/update
```