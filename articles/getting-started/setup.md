# Setup

Get Manifest with CDN links or copied from <a href="https://github.com/Manifest-X/Manifest/tree/master/lib" target="_blank">GitHub</a>.

---

## Overview

Manifest consists of:

- `manifest.js` script for your project's functionality.
- `manifest.json` for central management of your project.
- `manifest.*.css` stylesheets for your project's UX/UI.

These files are modular, designed to work alone or together to best suit your project. A project using all Manifest features would be set up like:

```html "<head>" copy
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>

<!-- Styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
<link rel="stylesheet" href="/manifest.theme.css">
```

---

## manifest.json

Outside this framework, `manifest.json` is a <a href="https://en.wikipedia.org/wiki/Progressive_web_app#Manifest" target="_blank">common file</a> for web applications to centrally store project-level metadata. It's stored in the root for automatic browser detection.


We leverage this file as a place to declare HTML components and local or cloud data sources. It can also be used as a data source itself to render content.

```json "manifest.json" copy collapse="10"
{
	// Web standard content
	"name": "My Project",
  	"short_name": "Project name",
	"description": "Lorem ipsum dolor sit amet.",
  	"start_url": "/",
  	"scope": "/",
  	"display": "standalone",
  	"orientation": "any",
  	"background_color": "#FFFFFF",
  	"icons": [
		{ "src": "/icons/192x192.png", "sizes": "192x192", "type": "image/png" },
		{ "src": "/icons/512x512.png", "sizes": "512x512", "type": "image/png" }
	],

	// Declarations for Manifest plugins
  	"components": [
		"components/home.html",
		"components/about.html"
  	],
  	"preloadedComponents": [
		"components/footer.html",
		"components/header.html",
		"components/logo.html"
  	],
  	"data": {
		"i18n": {
			"locales": "/translations.csv"
		}
  	}
}
```

An optional `version` field acts as a release stamp that busts component caches on deploy — see [browser caching](/docs/core-plugins/components#browser-caching). Projects published through Manifest are stamped automatically.

If your project is not a downloadable web app, and does not include HTML components or data sources, `manifest.json` can be omitted.

---

## Script

`manifest.js` dynamically loads <a href="https://alpinejs.dev" target="_blank">Alpine JS</a> and our plugins to make your project functional. Add the `<script>` tag anywhere in the HTML head or body (within `index.html` if [routing](/docs/core-plugins/router)).

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Select Plugins"
<!-- Load only specified plugins -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
	data-plugins="components,router,utilities"></script>
```

```html "Omit Plugins"
<!-- Load all core plugins except omitted ones -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
	data-omit="markdown,resize"></script>
```

```html "Include Tailwind CSS"
<!-- Include Tailwind CSS -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
	data-tailwind></script>
```

</div>

The script loads:

- **Manifest Plugins** (latest versions) from our CDN. The optional `data-plugins` or `data-omit` attributes will include or omit comma-separated plugins—otherwise all are loaded by default. Prefix a name with `+` to add it on top of the defaults (`data-plugins="+chat"`) instead of replacing them.
- **Alpine JS** (latest version) from its CDN, unless it's been added separately to your project.
- **Tailwind CSS** (modified production version from our CDN) *if* the `data-tailwind` attribute is added.

Scripts load the latest version from CDN by default. Load a specified version by referencing it in the URL and with a `data-version` attribute for plugins:

```html copy
<script src="https://cdn.jsdelivr.net/npm/mnfst@0.5.17/lib/manifest.min.js"
	data-version="0.5.17"></script>
```

---

## Styles
Stylesheets are divided by UI category, available individually or bundled in `manifest.css`.

A separate `manifest.theme.css` can be <a target="_blank" href="https://github.com/Manifest-X/Manifest/tree/master/lib/manifest.theme.css">downloaded from GitHub</a> for local modification. It maintains CSS variables referenced by the other sheets if present, centralizing your project's visual identity. See [theme](/docs/styles/theme) for more.

Add the desired Manifest CSS files to the HTML head (within `index.html` if [routing](/docs/core-plugins/router)). 

<div x-code-group copy>

```html "Bundled (47kb)"
  <link rel="stylesheet" href="/manifest.theme.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
```

```html "Individual (<10kb)"
  <link rel="stylesheet" href="/manifest.theme.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.reset.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.buttons.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.utilities.css">
```

</div>

---

## CLI Commands

Manifest provides a handful of handy `npx` commands to assist with project development:

| Command | Purpose | Reference |
|---------|---------|-----------|
| `npx mnfst-starter <name>`{copy} | Scaffold a new Manifest project | [Starter Project](/docs/getting-started/starter-project) |
| `npx mnfst-run`{copy} | Zero-dependency dev server with live reload | [Setup](#run-a-project) |
| `npx mnfst-render`{copy} | Prerender the SPA into a static MPA | [Websites](/docs/publishing/websites) |
| `npx mnfst-types`{copy} | Generate TypeScript ambient types from `manifest.json` | [TypeScript](/docs/resources/typescript) |
| `npx mnfst-test`{copy} | Project linter + component-test harness | [Testing](/docs/publishing/testing) |

### Run a Project

Enter `npx mnfst-run`{copy} to fire up a local server of the project. Sub-directories can be targeted with a path like `npx mnfst-run website`{copy} for `/website`.

```bash copy
npx mnfst-run
```

The server provides the following conveniences:

- **Auto launch** — launches a new browser tab when started.
- **Auto reload** — refreshes when content edits are made to `html`, `css`, `json`, `yaml`, `csv`, or `md` files.
- **Auto close** — kills the server instance if all its browser tabs are closed.
- **No duplication** — on launch, provides an existing localhost URL if the project is already running on the device.