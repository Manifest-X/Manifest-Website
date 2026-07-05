# Project

- **Name:** Manifest-Website
- **What it is:** Manifest marketing + docs site (manifestx.dev). Prerendered (website type) — edit source, never /website/.
- **Staging URL:** https://manifest-website-staging.manifestx.ai
- **Production URL:** https://manifestx.dev
- **Hosting:** Manifest managed
- **Default branch:** `staging`
- **Live branch:** `production`

> The contributor working in this repo may be non-technical. Speak plainly. When you make a change, describe what they will *see* (in the preview), not what you *did* in code.

## Framework

This project is built on the [Manifest framework](https://manifestx.dev). Manifest is an Alpine.js-based framework that runs directly in the browser — no build step. Edit HTML, CSS, and data files. It's HTML-first but not frontend-only: it also has plugins for dynamic data (REST/GraphQL APIs) and an Appwrite-backed backend (auth, databases, storage), so backend needs are in scope.

When you're unsure about Manifest syntax, attributes, directives, plugins, or APIs, consult the AI-crawlable docs rather than guessing: **https://manifestx.dev/llms.txt** (index), **https://manifestx.dev/llms-full.txt** (full text), or **https://manifestx.dev/docs**.

You don't need to read this whole framework section to make small edits. Skip ahead if the user just asked for a copy change or color tweak.

> **Before building or restructuring any UI** — a page, section, layout, or reusable component — **load the `manifest-layout` and `manifest-styling` skills first** (and `manifest-component` when extracting something reusable), and **design the structure before writing code**. The condensed rules below are a pointer, not a substitute: they're just enough to feel unstuck and they skew you toward hand-rolled CSS. This is a precondition of *authoring*, not a QA step — non-idiomatic markup (a `<style>` block, bespoke classes, wrapper-div soup) caught *after* the user's visual review is too late to fix cheaply. A `UserPromptSubmit` hook (`.claude/hooks/ui-guard.mjs`) reminds you of this automatically when a request looks visual; don't wait for it.

### Project type

- **SPA**: served from the repo root. No render step. The browser is the runtime.
- **Website**: source files live at the repo root; pre-rendered HTML is generated into `/website/` for SEO and faster first paint. **Edit the source, never `/website/` directly.** The render regenerates `/website/` from source.

To tell which: look for a `prerender` block in `manifest.json` or a `/website/` folder. If neither, treat as SPA.

### Where things live in the starter template

- `index.html` — the page. Routes are populated by elements with an `x-route` attribute.
- `components/*.html` — reusable HTML chunks. Used as `<x-filename>` (e.g. `header.html` → `<x-header>`).
- `manifest.json` — registers components, data sources, and project metadata. **Update this when adding components or data sources.**
- `manifest.theme.css` — colors, fonts, spacing, radii. CSS custom properties. **Edit values here, never hardcode colors elsewhere.**
- `locales.csv` — translations (if the project is multi-language).

### Key conventions

**Routing.** Routes are visibility-based, not navigation-based. A `<section x-route="pricing">` shows when the URL matches `/pricing`. Patterns:

- `x-route="/"` — root only
- `x-route="about"` — `/about` and any subroutes
- `x-route="=about"` — exact `/about` only
- `x-route="about/*"` — subroutes only
- `x-route="!admin"` — everywhere except `/admin`
- `x-route="!*"` — fallback (404)

**Components.** A file at `components/card.html` becomes `<x-card>` anywhere on the page. Register it in `manifest.json`:
- `preloadedComponents` — loaded on initial page load (use for header/footer/anything visible immediately)
- `components` — lazy-loaded on demand (use for everything else)

To expose customization points to instances, use `$modify('attrName')` inside the component HTML — attributes on `<x-card heading="Hello">` then flow through.

**Data.** Data sources are registered under `"data"` in `manifest.json`:
```json
"data": {
  "products": "/data/products.csv",
  "team": "/data/team.json"
}
```
Then accessed in templates via `$x.products`, `$x.team`, etc. CSV with first column header `id` (case-insensitive) is tabular; otherwise it's key/value with dot-notation nesting.

**Theme.** Use the semantic CSS variables in `manifest.theme.css`:
- Surfaces: `--color-page`, `--color-surface-1/2/3`
- Text: `--color-content-stark`, `--color-content-neutral`, `--color-content-subtle`
- Brand: `--color-brand-surface`, `--color-brand-content`, etc.
- Sizing: `--radius`, `--spacing`, `--spacing-content-width`

When a non-technical user says "make it more rounded" or "use a warmer brand color", change the variable, not individual elements.

**Styling — the layer cascade.** (For anything beyond a one-off tweak, load `manifest-styling`/`manifest-layout` first — see the precondition above.) When styling a specific element, reach for tools in this order:
1. **Pre-styled HTML.** Manifest auto-styles raw `<button>`, `<input>`, `<select>`, `<textarea>`, `<form>`, `<dialog popover>`, `<details>`/`<summary>`, `<table>`, `<aside popover>`, `<menu popover>`. Don't wrap them in custom classes for basic styling.
2. **Manifest semantic classes.** Layout: `page`, `content`, `row`, `row-wrap`, `col`, `col-wrap`, `center`. Color modifiers (on buttons, inputs, text): `brand`, `accent`, `negative`, `positive`. Appearance: `ghost`, `outlined`, `hug`, `selected`, `transparent`. Sizes: `sm`, `lg`. Typography: `h1`–`h6`, `paragraph`, `small`, `caption`, `prose` (use on long-form text containers like article bodies). Misc: `unstyle` (opt out of Manifest styling on an element), `overlay-dark`/`overlay-light` (banner overlays), `trailing` (push icon to right edge), `no-focus`, `no-scrollbar`.
3. **Theme-derived utilities.** Manifest auto-generates Tailwind-compatible utilities from the theme variables: `bg-brand-surface`, `text-content-stark`, `border-line`, etc. Use these for one-off styling that should still respect the theme.
4. **Tailwind utilities.** Tailwind is opt-in via `data-tailwind` on the `<script>` tag (default ON in the starter). Use Tailwind for layout/spacing utilities the semantic classes don't cover.

**Never use inline `style="..."` or hardcoded color/font/size values.** If the right variable doesn't exist, add one to `manifest.theme.css`.

**Directives & magic methods quick reference.** Recognise these in HTML; they're Manifest- or Alpine-specific:
- `x-route="path"` — show/hide based on URL
- `x-icon="lucide:name"` — Iconify icon (200k+ icons; common sets: `lucide`, `mdi`, `simple-icons`)
- `x-markdown="'inline string'"` / `x-markdown="'/path.md'"` / `x-markdown="$x.source.field"` — render markdown
- `x-tooltip="text"` — hover tooltip (modifiers: `.top`, `.bottom`, `.start`, `.end`)
- `x-dropdown="menu-id"` — open `<menu popover id="menu-id">`
- `x-toast="message"` — push notification (modifiers: `.brand`, `.accent`, `.positive`, `.negative`)
- `x-tab="id"` / `x-tabpanel="id"` — tab control + content
- `x-resize` — drag-to-resize edges/corners
- `x-colorpicker.swatch` — dropdown color picker UI
- `$x.sourceName` — registered data source
- `$url.paramName.value/.set()/.add()/.remove()` — URL query params (filters, search)
- `$x.source.$route('field')` — find data item matching current URL segment
- `$auth` — Appwrite auth (only if Appwrite is configured)

For client-side state persistence (e.g. game saves, draft form state), Alpine has `$persist`. For cloud persistence, use Appwrite (see the `manifest-appwrite` skill if installed).

## Workflow — slash commands or plain language

These are buttons. Press one and it runs end-to-end. **Natural language works identically** — "put it on the web to review" = `/staging`, "take it live" / "publish the site" = `/publish`, "roll it back" = a rollback, "pull the latest" = `/sync`. The command and the spoken request resolve to the **same** pipeline; pick whichever the user used.

1. **`/preview`** — start the LOCAL preview server (also: "preview it", "let me see it first", "review before it goes live"). Nothing is published — it opens in the preview panel. Only deploy a web preview if the user explicitly wants it *on the web* (see `/staging`).
2. **`/sync`** — pull the latest from teammates. Run at the start of a work session.
3. **`/staging`** — put your work on a reviewable web preview.
4. **`/publish`** — take it live.
5. **`/status`** — plain-English summary of where things stand.

> If a slash command reports **"unknown command"**, the Manifest commands just aren't installed in this folder yet (a fresh clone often won't have them). Run `manifest_install_skills` (or ask "install the Manifest commands") and they'll work. The plain-language equivalent ("take it live") works regardless.

### How publishing works — two independent settings

The commands detect both and route accordingly. You do **not** need different commands for different setups.

- **Source control** — is the project on GitHub? `git remote get-url origin 2>/dev/null` answers it. Governs `/sync` and teammates. Local-only is a valid, permanent choice.
- **Hosting backend** — where the live site runs, recorded in `## Project` → **Hosting**:
  - **Manifest managed** — published to `*.manifestx.ai` via the `manifest_publish` / `manifest_promote` / `manifest_rollback` tools. Zero setup, **no GitHub required**. The default for anyone who just wants their site online.
  - **Own host via GitHub** — `/staging` and `/publish` push the `staging`/`production` branches; a connected host (Appwrite Sites, Netlify, Cloudflare Pages) auto-deploys. Requires GitHub + the **manifest-deploy** skill.
  - **External (self-managed)** — the user deploys by their own means (manual upload, their own CI, a host we don't drive). Manifest doesn't control publishing here; `/staging` and `/publish` won't try to. We just help build and, if a repo exists, `/sync`.
  - **(none yet)** — nothing published.

### Detecting the pipeline (do this first in `/staging` and `/publish`)

The **Hosting** field in `## Project` is the source of truth. Decide in this order:

1. **Is Hosting explicitly set?** Obey it — don't second-guess it from other signals.
   - `Manifest managed` → use the **publish tools** (`manifest_publish` / `manifest_promote`). No git needed.
   - `Own host via GitHub` → use the **git-branch flow** (push `staging`/`production`); the connected host auto-deploys.
   - `External (self-managed)` → **don't drive a deploy.** Tell the user this project publishes through their own host, so `/staging` and `/publish` don't apply; offer to commit/`/sync` if there's a repo, and offer to switch to managed or GitHub hosting (**manifest-deploy**) if they'd like Manifest to handle it.
2. **Hosting unset?** Infer once: a `*.manifestx.ai` Staging/Production URL OR `manifest_deployments` returning rows ⇒ treat as `Manifest managed`; else a git `origin` remote ⇒ treat as `Own host via GitHub`; else it's local-only with nothing published.
3. **Local-only, nothing published** → don't fail; offer the one-time setup:
   - **(a) Publish straight to the web** on Manifest hosting — instant, no GitHub. (`manifest_publish`)
   - **(b) Save to GitHub** for a team workflow — **manifest-github**, then **manifest-deploy** for the host.
   - For a solo, non-technical user who "just wants it online," lead with (a).

Whichever the project uses, the slash command and the plain-English request both reach the same outcome.

### Changing hosting later

A project's hosting can change as it grows — e.g. a solo user starts on **Manifest managed**, later forms a team and moves to **Own host via GitHub** (or vice-versa). When the user asks to switch ("move this to GitHub", "host this on my own Cloudflare/Netlify/Appwrite", "go back to Manifest hosting"), run the **manifest-deploy** skill — it walks the migration and, crucially, **updates the Hosting field** so every command routes to the new backend from then on. The old backend's site keeps serving until explicitly removed, so there's no downtime during the switch.

## Rules for Claude

- **Before any UI work, design first and load the design skills.** For a page, section, layout, or reusable component, load `manifest-layout` + `manifest-styling` (and `manifest-component` if extracting) and decide the semantic structure *before* writing markup — don't improvise idioms from memory or lean on the condensed rules above. Enforce the styling cascade at authoring time, not at QA: idiom violations found after the user approves the look are too late. (The `ui-guard` hook nudges you, but the responsibility is yours regardless.)
- **Work on the shared `staging` branch — do NOT create or switch branches.** Teammates and other Claude sessions edit the same files on `staging`, and the live preview serves that working tree. Do not `git checkout -b`, `git switch`, or make a feature branch **unless the user explicitly asks** — branching diverges sessions, breeds merge conflicts, and makes the preview suddenly drop other sessions' work. This **overrides** the generic "branch before committing" habit; committing straight to `staging` is correct.
- **Stay in sync with other sessions.** Pull (`/sync`) at the start of work and again before committing; commit in **small** steps and **push immediately** so every session and the preview converge. Uncommitted changes you didn't make belong to another live session — never stash, `reset`, discard, or branch around them; build on top or leave them.
- **Never commit directly to the live branch (`production`).** Promote from staging via `/publish`.
- **Never force-push, never `--no-verify`, never skip git hooks.**
- **Never commit anything that looks like a secret** (`.env`, `*.key`, `*.pem`, `credentials*`). Stop and warn the user if one is staged.
- **Edit source files, not generated output in `/website/`.**
- **Use theme variables, not hardcoded colors or fonts.** If the right variable doesn't exist, add one to `manifest.theme.css` rather than inlining.
- **Update `manifest.json` when you add a component or data source** — otherwise it won't load.
- **Use semantic HTML.** `<button>` for buttons (not `<div onclick>`); label-input nesting for forms (`<label>Name<input></label>`); `alt` attribute on every `<img>`; one `<h1>` per page. Manifest's pre-styling and accessibility behaviour assume semantic markup.
- **Keep markup minimal — no Tailwind-template wrapper soup.** Manifest's CSS targets semantic HTML directly. If a `<div>` exists only to apply one class to its child, hoist the class up and delete the wrapper. If you find yourself nesting three divs to position one element, you're fighting the framework — reach for a Manifest semantic class (`row`, `col`, `center`, `content`) instead.
- **Keep comments minimal — they ship to the browser.** HTML/CSS/JS comments appear in page source and the inspector. Use them only for orientation/separation (e.g. `<!-- Header -->`), never to explain decisions or narrate code. No verbose comment blocks unless the user explicitly asks for them.
- **Design mobile and desktop with shared markup.** Don't write two separate layouts swapped at a breakpoint. Use layouts that flex naturally (`row-wrap`, `col`, `grow`, `gap-N`) and reach for `md:`/`lg:` Tailwind prefixes only when the layout genuinely needs to change shape — not as a default.
- **For anything unusual** (detached HEAD, merge in progress, unexpected remote state, missing branches): stop, explain in plain terms, ask before recovering. Do not improvise destructive fixes.
- **After making a visible change, verify in the preview panel** before reporting done. Describe what changed in user-visible terms ("the hero headline is now larger and centered"), not as a diff.
