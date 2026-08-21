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
| **`.authoring`** | Treat this region as a page being edited — see below |
| **`.theme`** | Declare a theme scope — see [Theme Controls](#theme-controls) |

`.theme` on its own does not make an area. It names a cascade target for `x-edit.cssvar` and nothing more, so it can sit on a wrapper without swallowing the editable regions inside it.

---
## The Smallest Version

Edit is a page editor, but nothing about it requires a page. A drag-to-reorder list is one attribute:

```html
<ul x-edit.sort.data="tasks">
    <template x-for="task in tasks" :key="task.id">
        <li x-text="task.label"></li>
    </template>
</ul>
```

Dragging reorders the array itself, so `tasks` is always the source of truth and whatever you already do with it keeps working. Rows identify themselves by the `x-for`'s `:key`; a `:data-key` attribute overrides it if you need something else.

Nothing else appears — no dashed outline, no region label, no floating toolbar. **That is the default**, because most of what this plugin is asked to do is a resizable panel or a sortable list, and those should look like themselves. The page editor is the deepest thing it can do, not the ordinary thing.

The default also decides what an edit *means*. Outside an authoring region the plugin is behaviour, the app owns the state, and changes never become source patches or persist to the editor's overlay. `$edit.undo()` still works for the session.

Without a data source it works the same way on plain markup:

```html
<div class="row-wrap gap-2" x-edit.sort="chips">
    <span>Roses</span>
    <span>Peonies</span>
    <span>Eucalyptus</span>
</div>
```

---
## Authoring a Page

Add **`.authoring`** when a region really is a page being edited. That turns on the chrome — the dashed outline, the region label, the floating toolbar — and opts the region into publishing: its deltas become source patches and persist to the overlay between reloads.

```html
<header x-edit.text.authoring="hero">…</header>
```

Everything about that chrome is CSS. The plugin sets attributes — `data-edit-authoring`, `data-edit-armed`, `data-edit-label` — and the stylesheet decides what is drawn:

```css
/* A solid frame instead of the dashed default, and no region labels */
[data-edit-armed][data-edit-authoring] { outline: 2px solid var(--color-brand-content) }
[data-edit-armed][data-edit-authoring]::before { content: none }
```

One thing is not CSS's to decide: whether a toolbar should exist at all depends on which route is on screen, and no selector can ask that. Script sets `data-edit-active` on `<html>` when a visible authoring region exists; the stylesheet does the rest, so hiding or restyling the toolbar never means touching the plugin.

---
## Three Regimes

Edit classifies each region by what it actually contains, because the same gesture has to resolve to a different place in each case.

| Regime | Detected by | An edit becomes |
|---|---|---|
| **Static** | Plain HTML | A patch against the source markup |
| **Data** | A `template x-for` | A reorder or field write against the data source |
| **Component** | A `data-component` root | An override on one instance, or on the component itself |

Rows added after the page loads — a new `x-for` item, anything appended — become sortable on their own; the container is watched for them.

A component region can be edited for **this instance** or for **all** instances — right-click to switch scope. Instance overrides always win over component-wide ones, and either can be reverted independently.

---
## Reordering

The dragged item leaves the flow and follows the pointer. A **stand-in** takes its slot and moves ahead of it, so the gap you see is a real element showing exactly where a release would land. By default it is a translucent copy of what you are dragging; it is yours to restyle:

```css
/* Fainter */
[data-edit-ghost] { --edit-ghost-opacity: .2 }

/* Or an empty outlined slot instead of a preview */
[data-edit-ghost] { opacity: 1; outline: 2px dashed var(--color-line); border-radius: var(--radius) }
[data-edit-ghost] > * { visibility: hidden }
```

Items shift as you cross their midpoints, one position at a time.

| Input | Action |
|---|---|
| **Drag** | Mouse, touch or pen — a 5px threshold means a tap is still a tap |
| **Escape** during a drag | Put it back where it started |
| **Space** / **Enter** on a focused item | Grab and drop |
| **Arrow keys** while grabbed | Move a position |
| **Escape** while grabbed | Cancel |

Keyboard moves are announced through a live region, so a grab, each move and the drop are all spoken.

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
## Block Operations

Copy, cut, paste, duplicate and delete act on a **block**: the sortable child a node sits in, or — where the region is not sortable at all — the outermost element inside the area that contains it. Deleting a heading does not require the region to have been declared reorderable.

They are on the store, and they default to whichever block the last right-click reported, which is what a menu wants:

| Member | Does |
|---|---|
| **`$edit.target`** | The block in play; assignable |
| **`$edit.can(op)`** | Whether that operation applies right now |
| **`$edit.copy()`** **`.cut()`** **`.paste()`** | The plugin's own clipboard, not the system one |
| **`$edit.duplicate()`** **`.remove()`** | |
| **`$edit.block(node)`** | The block containing a node, or null |

Each takes an optional element if you would rather be explicit than rely on `target`.

### Hotkeys

A focused block already has a tabindex from reordering, so the shortcuts ride it: **Cmd/Ctrl + C / X / V / D**, and **Delete** or **Backspace** to remove. They stay out of the way of text — nothing fires while a caret is in a field or an input, so Cmd+C inside a paragraph still copies the words.

### A context menu

Right-click reports the block and the pointer. Call `preventDefault()` and the menu is yours.

The event fires **after the pointer comes up**, not during the right-click. A popover opened while the button is still down is closed again by the release that follows it — the browser decides light dismissal on pointerup, and by then the menu was not yet open when the press was recorded. Waiting for the release is what lets a menu opened in the handler survive; you do not have to do anything about it.

`$edit.can()` and `$edit.target` are reactive, so `:disabled` bindings track the block the menu is acting on:

```html
<div @edit:context="
        $event.preventDefault();
        const m = $refs.menu;
        m.style.left = $event.detail.x + 'px';
        m.style.top = $event.detail.y + 'px';
        m.showPopover();">

    <ul x-edit.sort.data="tasks">…</ul>

    <menu popover x-ref="menu" class="p-1 col">
        <button class="ghost sm" :disabled="!$edit.can('duplicate')" @click="$edit.duplicate()">Duplicate</button>
        <button class="ghost sm" :disabled="!$edit.can('remove')" @click="$edit.remove()">Delete</button>
    </menu>
</div>
```

`$event.detail` carries `target`, `area`, `x`, `y` and a `can(op)` of its own. Leave the event alone and the built-in class and scope menus open instead — but only in an `.authoring` region, since those are authoring chrome. A right-click that lands outside any block keeps the browser's own menu.

Use a real `popover`, as above. Resize handles deliberately paint above ordinary page chrome, and a menu positioned with a `z-index` will lose to them somewhere; the top layer is above every stacking context on the page, so it cannot. The built-in menus are popovers for the same reason.

### What it means per regime

- **Data** — the array is the truth, so a duplicate clones the record with a fresh id and a delete splices it out. The record travels in the delta, so undo can put it back. These stay in the session: what the array should hold is yours to persist, so they never become source patches.
- **Static** — the container's child order and the markup of whatever was added or removed. Proportional to the edit, not a snapshot of the region.

  Static blocks are addressed by **content**, not by position. Each one is given a `data-edit-key` derived from its tag and the start of its text the first time the region is armed, and it keeps that key for the rest of the session. Duplicating a block, deleting one, or dragging one to the top therefore does not renumber the others, so an edit recorded before a structural change still finds the element it was recorded against afterwards. A reorder is stored as a permutation of those keys rather than a snapshot of the markup.

  The key is assigned once and then left alone. Deriving it afresh from current content would move it the moment the text was edited — and the child order recorded a moment earlier would then name an element that no longer answers to that name. Two identical siblings are told apart by an ordinal (`P:Roses#2`).
- **Component** — not restructured. An instance is overridden, not rebuilt, so `can()` reports false there.

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
## With the Text Editor

The two plugins are independent, and they stack. Put [`x-text-edit`](/docs/core-plugins/text-edit) on an element inside an editable region and the rich editor owns it: `x-edit` stops making its leaves editable, stops addressing nodes inside it, and stops competing for the caret.

```html
<article x-edit.text.authoring="post">
    <h1>A title, edited plainly</h1>
    <div x-text-edit.html>A body, edited richly.</div>
</article>
```

What happens to the value depends on whether the rich editor has one of its own:

- **No expression** — `x-edit` captures what it produces as an ordinary text delta, so it undoes and publishes like any other edit in the region. Its block markup is vetted by the text editor's allowlist rather than `x-edit`'s stricter inline-only one, so headings and lists survive.
- **An expression** — the app owns the value and `x-edit` leaves it alone entirely.

Neither plugin requires the other. Load whichever you need.

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
| **`[data-edit-menu]`** | The class and scope menu — a `popover`, so it sits in the top layer |
| **`[data-edit-authoring]`** | A region declared `.authoring` |
| **`[data-edit-key]`** | The content-derived identity of a static block |
| **`[data-edit-movable]`** | An element that can be dragged freely, not just reordered |
| **`[data-edit-field]`** | A text leaf bound to a data field; `data-edit-rich` if a rich editor owns it |
| **`[data-edit-dragging-in]`** | On the region a drag is currently over |
| **`[data-edit-overlay]`** | The full-page shield that keeps a resize drag from selecting text |

`data-edit-active` goes on `<html>` whenever a visible authoring region exists — the one thing CSS cannot work out for itself.

`--edit-accent` recolours every affordance at once; it falls back to `--color-brand-content`.

---
## Related

- [Text Edit](/docs/core-plugins/text-edit) — a rich text field, rather than editing the page itself
- [Resize](/docs/core-plugins/resize) — the older, standalone resize directive
