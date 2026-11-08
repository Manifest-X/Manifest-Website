# Starter Project

Kickstart new websites and apps with a turnkey template.

---

## Install

Install the starter project locally with the `npx` command:

<div x-code-group>

```bash "New Folder" copy
npx mnfst-starter Name
```

```bash "Current Folder" copy
npx mnfst-starter --here
```

</div>

`npx mnfst-starter Name` creates a `Name/` folder and sets it as the project name in `manifest.json`. It stops if that folder already exists.

`npx mnfst-starter --here` installs into the current folder instead, using the folder's name as the project name.

Add `--name` to either command to set a different project name:

<div x-code-group>

```bash "New Folder" copy
npx mnfst-starter my-site --name "My Site"
```

```bash "Current Folder" copy
npx mnfst-starter --here --name "My Site"
```

</div>

Names may contain letters, numbers, spaces, dots, underscores, and hyphens, and can't start or end with a dot or space. If the current folder's name has other characters, pass `--name`.

Alternatively, download the template directory from <a href="https://github.com/Manifest-X/Manifest/tree/master/templates/starter" target="_blank">GitHub</a>.

### Existing Files

`--here` never overwrites files. If any template file already exists in the folder, nothing is written and the conflicts are listed:

```
Error: these files already exist in this folder and would be overwritten:
  index.html
  manifest.json
  README.md
Move them aside, or re-run with --force to overwrite them.
```

Move those files aside, or add `--force` to replace them with the template versions. Other files are never touched, apart from the config merges below.

```bash copy
npx mnfst-starter --here --force
```

`--force` lists every file it overwrote. It keeps the project name already in `manifest.json` unless `--name` is also given; everything else in `manifest.json` is replaced by the template. Outside `--here`, `--force` has no effect and the starter prints a warning; likewise a folder name passed alongside `--here` is ignored with a warning.

### Merged Config

Some files are merged with what's already in the folder rather than replaced, even with `--force`:

- `.gitignore` keeps its existing rules. Any missing starter entries (such as `.env`) are appended under `# Added by Manifest`.
- `.mcp.json` keeps its other servers. Only the `manifest` server entry is added or updated.
- `.claude/settings.json` keeps its settings. `mcp__manifest` is added to `permissions.allow`.
- `.env` keeps its other variables. Only `MANIFEST_API_KEY` is added or updated.

The last three apply only when Manifest's [AI plugins](/docs/ai/setup/introduction) set up the project, which passes a project ID and key for you. If `.mcp.json` or `.claude/settings.json` isn't valid JSON, the starter stops before writing anything.

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

See [websites](/docs/framework/publishing/websites) for deploying live to production.

---

## Capabilities

The project is provided with ready-made content for:

- Routing (page-level views & 404 content)
- Header, footer, and logo components
- Responsive layout with mobile sidebar
- Color modes
- Localization (English, Spanish, Arabic, and Chinese examples)
- Markdown article injection

---

## Files & Folders

The project begins with this folder structure for both development and deployment:

```
Project Name/
├── assets/                   # Visual files
│   ├── fonts/                # Web fonts
│   │   └── Inter.woff2
│   └── icons/                # Web app icons
│       ├── 192x192.png
│       └── 512x512.png
├── components/               # HTML components
│   ├── header.html
│   ├── footer.html
│   └── logo.html
├── .gitignore                # Files Git should skip
├── _redirects                # SPA routing support for modern static hosts
├── favicon.ico               # Browser tab icon
├── index.html                # Rendering entry point / main page
├── LICENSE.md                # MIT License
├── locales.csv               # Translated content in English, Spanish, Arabic, and Chinese
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
- **Component placeholders** (`<x-header>`, `<x-footer>`) of [HTML templates](/docs/framework/core-plugins/components).
- **Routing views** (`x-route="..."`) for [URL-specific content](/docs/framework/core-plugins/router).
- **Dynamic references** (`x-text="$x.content.page1"`) to localized [data source](/docs/framework/core-plugins/local-data) values.

---

## manifest.json

This <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest" target="_blank">web application manifest</a> allows browsers to identify and export the website as an app to mobile and desktop devices. As a progressive web app (PWA), your project is often more portable, scalable, and popular than traditional native apps, and can be packaged for app store distribution.

This project also uses the manifest to register its [components](/docs/framework/core-plugins/components) and [localized](/docs/framework/core-plugins/localization) content, and to define `author` and `email` fields referenced by the Privacy Policy.