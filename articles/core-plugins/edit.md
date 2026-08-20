# Edit

Turn a live page into its own editor.

---

## Overview

Edit marks regions of a page as editable with `x-edit`. Inside a marked region, text can be rewritten in place, children reordered by drag or keyboard, elements resized by handles, classes changed, and theme variables tuned — all against the running page, not a separate admin screen.

Every change is appended to a typed delta log. That log is the single source of truth; everything else is a projection of it. Undo and redo walk a cursor along it, the overlay that survives a reload is the log replayed, and publishing resolves it into patches against your source files.

Edit is **opt-in**. Visitors should never download editor chrome, so it is not part of the default plugin set — load it behind whatever gate suits your project.

---

## Setup

```html
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="+edit"></script>
```

The `+` prefix keeps the default plugins and adds edit. To load it only for signed-in editors, leave it out of the tag and call the loader yourself:

```html
<script>
    if (isEditor) Manifest.loadPlugin('edit');
</script>
```

Editor styles are included in Manifest CSS or as a standalone stylesheet.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.edit.css">
```

</div>

---

## Basic Usage

`x-edit` takes a key that names the region. Deltas are stored against it, so keep it stable — renaming a key orphans that region's edits.

```html
<header x-edit="hero">
    <h1>Bloom &amp; Bramble</h1>
    <p>Seasonal arrangements, delivered weekly.</p>
</header>
```

By default a region gets sort, text, and style. Naming any capability replaces that default:

```html
<div x-edit.sort.text="features">…</div>
<div x-edit.size="panel">…</div>
```

| Capability | What it allows |
|---|---|
| **`.text`** | Rewrite text leaves in place |
| **`.sort`** | Reorder children by drag or keyboard |
| **`.style`** | Right-click an element to edit its classes |
| **`.size`** | Drag handles to resize (opt-in) |
| **`.data`** | Edit the values behind an `x-for` list (opt-in) |
| **`.lock`** | Opt this element and its subtree out |
| **`.gated`** | Editable only after `$edit.on()` |

---

## Three Regimes

Edit classifies each region by what it actually contains, because the same gesture has to resolve to a different place in each case.

| Regime | Detected by | An edit becomes |
|---|---|---|
| **Static** | Plain HTML | A patch against the source markup |
| **Data** | A `template x-for` | A reorder or field write against the data source |
| **Component** | A `data-component` root | An override on one instance, or on the component itself |

A component region can be edited for **this instance** or for **all** instances — right-click to switch scope. Instance overrides always win over component-wide ones, and either can be reverted independently.

---

## Resizing

`.size` adds drag handles. Sizes are written in the unit the element already used, so an element authored in `rem` stays in `rem`. Configuration comes from CSS variables rather than directive arguments, so it cascades:

| Variable | Default | Description |
|---|---|---|
| **`--edit-size`** | `both` | `both`, `x`, `y`, or `none` |
| **`--edit-size-edges`** | all | Explicit handle list; accepts logical `start`/`end` |
| **`--edit-size-handle`** | `1rem` | Handle hit area |
| **`--edit-size-snap`** | — | Snap stops, both axes |
| **`--edit-size-snap-x`** / **`-y`** | — | Per-axis stops |
| **`--edit-size-snap-distance`** | `0` | Magnet tolerance — not a grid step |
| **`--edit-size-collapse-x`** / **`-y`** | — | Below this, set `[data-edit-collapsed]` |

Minimum and maximum sizes come from the element's own `min-width`/`max-width`/`min-height`/`max-height`.

```html
<aside x-edit.size="sidebar"
       style="--edit-size-edges: end;
              --edit-size-snap: 12rem 18rem;
              --edit-size-snap-distance: 1rem;
              --edit-size-collapse-x: 8rem;
              min-width: 6rem; max-width: 30rem">
</aside>
```

Handles are focusable: arrow keys resize, Shift makes a larger step.

Two events fire on the element and bubble:

| Event | When | `detail` |
|---|---|---|
| **`edit:size`** | During the drag, and once on commit | `width`, `height`, `css`, `collapsed`, `done` |
| **`edit:collapse`** | A drag ends below a collapse threshold | — |

```html
<aside x-edit.size="sidebar" @edit:size="if ($event.detail.done) chart.resize()"></aside>
```

<aside>

`x-edit.size` supersedes the [Resize](/docs/core-plugins/resize) plugin. Resize still works and is not going anywhere yet, but new projects should reach for `x-edit.size` — it preserves units, snaps by magnet rather than grid, resolves logical edges for RTL, and its changes are undoable and publishable.

</aside>

---

## Theme Controls

`x-edit.cssvar` binds an input to a CSS variable. A bare variable name writes to `:root`; a `scope:` prefix writes onto the element that declared that scope with `x-edit.theme`, so the same variable name can mean two different things on one page.

```html
<main x-edit.theme="site">…</main>

<label>Brand <input type="color" x-edit.cssvar="site:--color-brand-content"></label>
<label>Radius <input type="range" min="0" max="2" step="0.125" data-unit="rem"
                    x-edit.cssvar="--radius"></label>
```

`data-unit` appends a unit to a numeric input's value.

---

## Publishing

`$edit.publish()` resolves the log into source patches and sends them. During local development `npx mnfst-run --edit` accepts them and writes your files — static HTML edits into `index.html`, data reorders and field writes into the registered data file, theme variables into the stylesheet that declared them.

Source write-back is authoring-only: the endpoint is off unless you pass `--edit`, refuses anything but a local origin, and is never part of a deployed site.

For anything else — a database, a review queue, another user's overlay — set a handler and the patches come to you instead:

```html
<div x-data x-init="$edit.onPublish = (patches) => api.save(patches)"></div>
```

| Member | Description |
|---|---|
| **`$edit.active`** | Whether `.gated` regions are currently editable |
| **`$edit.on()`** / **`.off()`** / **`.toggle()`** | Activate gated regions |
| **`$edit.undo()`** / **`.redo()`** | Walk the log cursor |
| **`$edit.canUndo`** / **`.canRedo`** | For wiring your own buttons |
| **`$edit.lock(el)`** / **`.unlock(el)`** | Lock a subtree at runtime; not logged |
| **`$edit.publish()`** | Resolve and send patches |
| **`$edit.patches()`** | The resolved patches, without sending |
| **`$edit.export()`** | The raw log — persist it to move edits between devices |

Edits persist to `localStorage` as they are made, so a reload picks up where the editor left off. `$edit.export()` hands you the same log if you would rather store it yourself.

---

## Safety

Replayed content is sanitized on capture and again on apply, which matters once overlays can arrive from another user: only inline formatting tags survive, attributes are stripped, and `javascript:` links are dropped. Each delta also records the tag it was captured against — if the source structure has since changed, that delta is skipped rather than applied to the wrong node.

---

## Styles

Every affordance the plugin injects is an attribute, so restyling never fights specificity:

| Selector | Element |
|---|---|
| **`[data-edit-armed]`** | An armed region; `data-edit-label` holds its caption |
| **`[data-edit-sortable]`** | A reorderable child |
| **`[data-edit-grabbed]`** / **`[data-edit-dragging]`** | Reorder states |
| **`[data-edit-sizable]`** | An element with size handles |
| **`[data-edit-handle]`** | One handle; the value is its edge or corner |
| **`[data-edit-collapsed]`** | Dragged past a collapse threshold |
| **`[data-edit-toolbar]`** | The built-in toolbar |
| **`[data-edit-menu]`** | The class and scope menu |

`--edit-accent` recolours every affordance at once; it falls back to `--color-brand-content`.

---

## Related

- [Prose](/docs/core-plugins/prose) — a rich text field, rather than editing the page itself
- [Resize](/docs/core-plugins/resize) — the older, standalone resize directive
