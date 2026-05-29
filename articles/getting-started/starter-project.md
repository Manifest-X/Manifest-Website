# Starter Project

Kickstart new websites and apps with a turnkey template.

---

## Install

Install the starter project locally with the `npx` command:

```bash copy
npx mnfst-starter Name
```

"Name" is the modifiable root directory title — name it after your project.

Alternatively, download the template directory from <a href="https://github.com/Manifest-X/Manifest/tree/master/templates/starter" target="_blank">GitHub</a>.

---

## Run

<div x-code-group>

```bash "From Root" copy
npx mnfst-run
```

```bash "From Subdirectory" copy
npx mnfst-run path
```

</div>

Run this project locally from the project root with `npx mnfst-run`{copy}, or any subdirectory with `npx mnfst-run path`{copy}, where "path" is the folder path. Alternatively, most local server solutions can run Manifest projects.

See [websites](/docs/publishing/websites) for deploying live to production.

---

## Capabilities

The project is provided with ready-made content for:

- Routing (page-level views & 404 content)
- Header, footer, and logo components
- Responsive layout with mobile sidebar
- Color modes
- Localization (English, Arabic, and Chinese examples)
- Markdown article injection

---

## Files & Folders

The project begins with this folder structure for both development and deployment:

```
Project Name/
├── assets/                   # Visual files
│   ├── fonts                 # Web fonts
│   │   └── Inter.woff2
│   └── icons                 # Web app icons               
│       ├── 192x192.png
│       └── 512x512.png
├── components/               # HTML components
│   ├── header.html
│   ├── footer.html
│   └── logo.html
├── _redirects                # SPA routing support for modern static hosts
├── favicon.ico               # Browser tab icon
├── index.html                # Rendering entry point / main page
├── LICENSE.md                # MIT License
├── locales.csv               # Translated content in English, Arabic, and Chinese
├── manifest.json             # Project & web app manifest
├── manifest.theme.css        # Project theme variables
├── privacy.md                # Privacy policy template, required by most sites & apps
└── README.md                 # Project README
```

::: brand icon="lucide:info"
The only mandatory file required is `index.html`. All other files and folders are provided for template purposes.
:::

---

## index.html

This main HTML file serves as the router's single-page application (SPA) entry point. It includes:

- **Head tags** for Manifest framework loading (from CDN), SEO, and web app configuration.
- **Component placeholders** (`<x-header>`, `<x-footer>`) of [HTML templates](/docs/core-plugins/components).
- **Routing views** (`x-route="..."`) for [URL-specific content](/docs/core-plugins/router).
- **Dynamic references** (`x-text="$x.content.page1"`) to localized [data source](/docs/core-plugins/local-data) values.

---

## manifest.json

This <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest" target="_blank">web application manifest</a> allows browsers to identify and export the website as an app to mobile and desktop devices. As a progressive web app (PWA), your project is often more portable, scalable, and popular than traditional native apps, and can be packaged for app store distribution.

This project also uses the manifest to register its [components](/docs/core-plugins/components) and [localized](/docs/core-plugins/localization) content, and to define `author` and `email` fields referenced by the Privacy Policy.