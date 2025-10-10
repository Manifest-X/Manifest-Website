# Starter Project

Kickstart new websites and apps with a turnkey template.

---

## Installation

Install the starter project locally with the `npx` command:

```bash copy
npx @indux/starter MyProject
```

"MyProject" is the modifiable root directory name—name it after your project.

Alternatively, download the template directory from <a href="https://github.com/andrewmatlock/Indux/tree/master/templates/starter" target="_blank">GitHub</a>.

### Running Locally

The project includes a built-in SPA router requiring a local server to run. See the project README for local server suggestions.

---

## Capabilities

The project is provided with ready-made content for:

- Routing (page-level views & 404 content)
- Header, footer, and logo components
- Responsive layout with mobile sidebar
- Colour themes
- Localization (English, Arabic, and Chinese examples)
- Markdown article injection

---

## Files & Folders

The project begins with this folder structure for both development and deployment:

```
project-name/
├── components/               # Reusable HTML components
│   ├── header.html           # Page header
│   ├── footer.html           # Page footer
│   └── logo.html             # Logo
├── data/                     # Data sources
│   ├── content.ar.yaml       # Arabic localized content
│   ├── content.en.yaml       # English localized content
│   └── content.zh.yaml       # Chinese localized content
├── icons/                    # Web app (PWA) icons referenced in manifest.json
│   ├── 192x192.png           # Small icon variant
│   ├── 512x512.png           # Large icon variant
├── styles/                   # CSS stylesheets
│   ├── custom.css            # Place for custom styles
│   └── indux.css             # Project theme + Indux framework styles
├── scripts/                  # JavaScript files
│   └── indux.quickstart.js   # Indux framework + Alpine + Tailwind
├── _redirects                # SPA routing support for modern static hosts
├── .htaccess                 # SPA routing support for Apache-based hosts
├── favicon.ico               # Browser tab icon
├── index.html                # Rendering entry point / main page
├── LICENSE.md                # MIT License
├── manifest.json             # Project & web app manifest
├── privacy.md                # Privacy policy template, required by most sites & apps
├── README.md                 # This file
├── robots.txt                # Website SEO asset
└── sitemap.xml               # Website SEO asset
```

::: brand icon="lucide:info"
The only mandatory files required for operation are `index.html`, `indux.quickstart.js`, `indux.css`, and `manifest.json`. All other files and folders are provided for template purposes.
:::

---

## index.html

This main HTML file serves as the router's single-page application (SPA) entry point. It includes:

- **Head tags** for resource loading, SEO, and web app configuration.
- **Component placeholders** (`<x-header>`, `<x-footer>`) of [HTML templates](/plugins/components).
- **Routing views** (`x-route="..."`) for [URL-specific content](/plugins/router).
- **Dynamic references** (`x-text="$x.content.page1"`) to localized [data source](/plugins/data-sources) values.

---

## manifest.json

A <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest" target="_blank">web application manifest</a> is the standardized JSON file allowing browsers to identify and export the website as an app to mobile and desktop devices. These progressive web apps (PWAs) and often more portable, scalable, and popular than traditional native apps, and can be packaged for app store distribution.

### Indux Additions

Manifests aren't limited to web app properties. As a root-level JSON file, Indux uses the manifest as your registry of the project's [components](/plugins/components) and [data sources](/plugins/data-sources). The file already exists, so why not use it!

You can also give the manifest custom properties for use as a [data source](/plugins/data-sources) itself. This is exampled in the starter project with the `author` and `email` fields, whose values are use by the Privacy Policy.