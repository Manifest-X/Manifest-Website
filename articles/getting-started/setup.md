# Setup

Get Manifest with CDN links or copied from <a href="https://github.com/Manifest-X/Manifest/tree/master/lib" target="_blank">GitHub</a>.

---

## Overview

Manifest consists of:

- `manifest.js` script for your project's functionality.
- `manifest.json` for central management of your project.
- `manifest.*.css` stylesheets for your project's UX/UI.

The script and stylesheets are modular, designed to work alone or together to best suit your project. A project using all Manifest features would be setup like:

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

```json "manifest.json" numbers copy
{
	// Web standard content
	"name": "My Project",
  	"short_name": "Project name",
	"description": "Lorem ipsum dolar sit amet.",
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

If your project is not a downloadable web app, and does not include HTML components or data sources, `manifest.json` can be omitted.

---

## Script

`manifest.js` dynamically loads <a href="https://alpinejs.dev" target="_blank">Alpine JS</a> and our plugins to make your project functional. Add the `<script>` tag anywhere in the HTML head or body (within `index.html` if [routing](/docs/core-plugins/router)).

<x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Select Plugins"
<!-- Load only specified plugins -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js" 
		  data-plugins="components,router,utilities"></script>
```

```html "Omit Plugins"
<!-- Load all core plugins except ommitted ones -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js" 
		  data-omit="markdown,resize"></script>
```

```html "Include Tailwind CSS"
<!-- Include Tailwind CSS -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js" 
		  data-tailwind></script>
```

</x-code-group>

The script loads:

- **Manifest Plugins** (latest versions) from our CDN. The optional `data-plugins` or `data-omit` attributes will include or omit comma-separated plugins—otherwise all are loaded by default.
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

<x-code-group copy>

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

</x-code-group>

---

## CLI Commands

Manifest provides a handful of handy `npx` commands to assist with project development:

| Command | Purpose | Reference |
|---------|---------|-----------|
| `npx mnfst-starter <name>` | Scaffold a new Manifest project | [Starter Project](/docs/getting-started/starter-project) |
| `npx mnfst-run` | Zero-dependency dev server with live reload | [Setup](#run-a-project) |
| `npx mnfst-render` | Prerender the SPA into a static MPA | [Websites](/docs/publishing/websites) |
| `npx mnfst-types` | Generate TypeScript ambient types from `manifest.json` | [Setup](#typescript) |
| `npx mnfst-test` | Project linter + component-test harness | [Testing](/docs/getting-started/testing) |

### Run a Project

Enter `npx mnfst-run` to fire up a local server of the project. Sub-directories can be targeted with a path like `npx mnfst-run website` for `/website`.

```bash copy
npx mnfst-run
```

The server provides the following conveniences:

- **Auto launch** — launches a new browser tab when started.
- **Auto reload** — refreshes when content edits are made to `html`, `css`, `json`, `yaml`, `csv`, or `md` files.
- **Auto close** — kills the server instance if all its browser tabs are closed.
- **No duplication** — on launch, provides an existing localhost URL if the project is already running on the device.

---

### Typescript

Get intellisense for editors and AI agents for `$x`, `$route`, and Manifest's other magic globals without adding a build step.

The optional `mnfst-types` CLI generates a single `manifest.d.ts` in the project root that declares the framework's globals and adds project-specific types for every data source registered in `manifest.json` — inferred from the actual CSV / JSON / YAML files or integrated Appwrite database configuration. Project files stay `.js` and `.html` — VS Code, Cursor, and AI tooling pick the declarations up automatically.

Run from the project root (next to `manifest.json`):

```bash copy
npx mnfst-types
```

Re-run whenever a data source is added or its shape changes.

#### CLI options

```
npx mnfst-types [options]

  --manifest <path>   Path to manifest.json (default: ./manifest.json)
  --out <path>        Output .d.ts path (default: ./manifest.d.ts)
  --init              Also write a baseline jsconfig.json (only if missing)
  -h, --help          Show usage
```

`--init` is for projects that want JSDoc errors surfaced as squiggles in `.js` files. Without it, the declarations still power autocomplete and inline type info.

#### manifest.json autocomplete

For autocomplete and validation in `manifest.json` itself, add a `$schema` reference at the top of the file. The starter project includes this line by default:

```json "manifest.json" copy
{
    "$schema": "https://manifestx.dev/manifest.schema.json",
    "name": "My Project",
    "data": { ... }
}
```

VS Code and most JSON-aware editors fetch and apply the schema automatically.

#### Regeneration

The generated `manifest.d.ts` has a static portion (magic globals, source-state operators, base types — same for every project) and a project augmentation block bracketed by `// AUGMENTATION:start` and `// AUGMENTATION:end`. Re-running the CLI overwrites the augmentation block; the static portion is also refreshed so it stays in sync with the installed framework version.