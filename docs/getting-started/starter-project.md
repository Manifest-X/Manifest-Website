# Starter Project

---

## Installation

Every Indux plugin and stylesheet can operate independently for existing projects. This starter project template is designed to give new projects a head start with a simple setup.

Install it with this `npx` command:

```bash copy
npx @indux/starter my-project
```

"my-project" is the modifiable root directory name. The project includes a built-in SPA router, requiring a local server to run. See the README for more details.

---

## Files & Folders
The starter project begins with this folder structure for both development and deployment:

```
my-project
├─ 📁 assets
├─ 📁 components
├─ 📁 icons
├─ 📁 scripts
├─ 📁 styles
├─ favicon.ico
├─ index.html
├─ manifest.json
├─ robots.txt
├─ sitemap.xml
└─ LICENSE
```

::: brand icon="lucide:info"
The only mandatory files required for operation are `index.html`, `indux.quickstart.js`, `indux.css`, and `manifest.json`. All other files and folders are provided for template purposes.
:::

### / root
The root folder (using any name) contains essential configuration and documentation files. Important files include:
- `index.html` as the rendering entry point.
- `manifest.json` as the project configuration file, used to define components, dynamic data sources, web app settings, and more.
- Website-specific files (`favicon.ico`, `robots.txt`, `sitemap.xml`) which can be removed for app-only projects.

---

### / assets
Contains static assets like images, fonts, and other media files used throughout the project.

---

### / components
Holds reusable HTML templates including a placeholder header, footer, and logo.

---

### / icons
Contains icons for web app (PWA) usage.

---

### / scripts
Contains the `indux.quickstart.js` framework script, bundling all Indux plugins with Alpine JS and Tailwind CSS, and is a good spot for other scripts.

---

### / styles
Contains `indux.css`, including modifiable theme variables at the top. You can drop your custom stylesheets here too.

---

### index.html

The main HTML file serves as the single-page application entry point. It includes:

- **Meta tags** for SEO, web app configuration, and theme colors
- **Indux CSS** (`/styles/indux.css`) for styling
- **Indux Quickstart** (`/scripts/indux.quickstart.js`) bundling all plugins with Alpine JS and Tailwind CSS, requiring `defer` in its script tag
- **Component placeholders** (`<x-header>`, `<x-footer>`) to dynamically load [HTML templates](/plugins/components)
- **Routing views** (`x-route="/"`, `x-route="/other"`) for [URL-specific content](/plugins/router)

---

### manifest.json

The web app manifest defines PWA behavior and Indux configuration:

- **PWA settings** (name, icons, display mode, theme colors)
- **Component registry** for [dynamic component loading](/plugins/components)
- **Preloaded components** for loading common components, optimizing performance
- **Data sources** for [dynamic content](/plugins/data-sources) and [localization](/plugins/localization)