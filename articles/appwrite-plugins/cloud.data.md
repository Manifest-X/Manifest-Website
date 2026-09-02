# Cloud Data

Access Appwrite databases and storage with the same `$x` API as [local data](/docs/core-plugins/local-data).

---

## Setup

Complete the [Appwrite setup](/docs/appwrite-plugins/appwrite-setup) steps to connect your Appwrite and Manifest projects.

Add the Appwrite SDK and `manifest.js` scripts to the HTML head. `manifest.json` is also required for Appwrite credentials and to register database tables or storage buckets.

<div x-code-group copy>

```html "All Plugins (default)"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="appwrite-data"></script>
```

</div>

::: brand icon="lucide:info"
If the Manifest script uses selective loading but omits the core `data` plugin (with its `$x` magic method), it will be auto loaded to enable Appwrite database and storage operations in the frontend.
:::

---

## Overview

Appwrite's cloud data sources work identically to local data sources in the frontend, using the same `$x` magic method syntax. The plugin automatically handles authentication, permissions, and realtime updates.

**Key Features:**
- **Unified Syntax**: Same `$x.sourceName` pattern for databases, storage, and local files
- **Realtime Updates**: Changes sync automatically across all active sessions
- **Permission-Aware**: Respects Appwrite permissions and scopes
- **CRUD Operations**: Create, read, update, and delete using intuitive methods
- **Team Scoping**: Automatically scope queries by team, user, or role

---

## How Data Updates

Reading `$x.products` subscribes only to the `products` source. When one source updates — including a realtime change from another session — only the parts of the page that read it re-render; everything else is left alone.

Rows keep their identity. When new data arrives for rows you already have, the existing rows are updated in place, so lists don't flicker and edits you are making are not disturbed. Fields you add to a row yourself (a `_pending` flag on a placeholder, say) survive too — the network never sends them, so nothing clears them for you; clear them explicitly once the real data has landed.

Your own changes show immediately. `$create`, `$update`, `$delete` and direct assignments appear on the page at once, even while data is still arriving from the network.

Network updates are batched. Many arriving at once are applied together, once per frame.

If a source was loaded before, you see its cached rows immediately while fresh data loads. `$x.products.$stale` is `true` until the fresh data has landed, and `$x.products.$fresh` is a promise that resolves at that moment, for a single reveal. A reload keeps the rows on screen and merges the fresh data in place; a failed reload keeps the old rows and sets `$error`. Identical concurrent loads make one request.

```html copy
<small x-show="$x.products.$stale">Refreshing…</small>
```

---

## Rendering Untrusted Content

Cloud data is the case where Manifest's default-permissive rendering deserves a second thought: the values in an Appwrite table can be written by your end users (reviews, comments, bios, uploaded SVGs, etc.), not just by you.

For those cases, prefer the safe variants when rendering into HTML or SVG sinks:

| Source | Default render | Safe opt-in |
|---|---|---|
| User-submitted markdown | `<div x-markdown="$x.comments.body">` | `<div x-markdown.safe="$x.comments.body">` |
| User-uploaded SVG | `<span x-svg="$x.profile.avatar">` | `<span x-svg.safe="$x.profile.avatar">` |
| Plain text in toasts/tooltips | `$toast($x.errors.message)` | Escape at source, or render via `x-text` |

`x-text`, attribute bindings (`:href`, `:src`, `:alt`), and the standard Alpine `x-show` / `x-if` always treat values as data — they're safe by default. The `.safe` opt-ins exist for the HTML/SVG sinks where the default has to be permissive so authors can render their own rich content.

---

## Next Steps

Complete cloud data support using the guides for:

- [Databases](/docs/appwrite-plugins/databases) of cloud-hosted content
- [Storage](/docs/appwrite-plugins/storage) of cloud-hosted files
