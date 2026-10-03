# Edit

Turn a live page into its own editor.

---

## Overview

`x-edit` marks a region of the page as editable. Inside it, elements can be reordered, resized, moved, and text can be edited. Every change is recorded in the region's undo/redo history, it survives reload, and publishing applies changes to your source files.

<div x-code-group>

```html copy
<section x-edit.authoring="hero">
    <h1>Bloom &amp; Bramble</h1>
    <p>Seasonal arrangements, delivered weekly.</p>
    <p>Click any text to edit it. Drag a line to reorder.</p>
</section>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<section class="col gap-2 p-4" x-edit.authoring="hero-demo">
    <span class="h3">Bloom &amp; Bramble</span>
    <p>Seasonal arrangements, delivered weekly.</p>
    <p class="text-content-subtle">Click any text to edit it. Drag a line to reorder.</p>
</section>
</template>
</div>
:::

</div>

`.authoring` applies editing UI on interactions, which can be customized with CSS (see [Styles](#styles)). The same UI is available without authoring semantics: put `data-edit-ui` on a region, or on any ancestor to cover a whole editor view. Without either, a region is just as editable but has no visual cues.

---

## Setup

Edit is opt-in and never part of the default bundle, so visitors don't download editor code. The `+` prefix keeps the default plugins and adds it; `Manifest.loadPlugin('edit')`{copy} loads it from script, so you can load it only for signed-in editors.

<div x-code-group copy>

```html "Script Tag"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="+edit"></script>
```

```html "Gated"
<script>
    if (isEditor) Manifest.loadPlugin('edit');
</script>
```

</div>

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

## Editable Regions

`x-edit` takes a key that names the region. Edits are stored against that key, so keep it stable — renaming it strands the edits already made under the old name. By default a region allows sorting, text and style edits; naming any capability replaces that default with only the ones you name.

<div x-code-group>

```html copy
<blockquote x-edit.text="quote" data-edit-ui>
    <p>Click to rewrite this line. Nothing else changes.</p>
    <cite>A customer</cite>
</blockquote>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<blockquote class="col gap-1 m-0" x-edit.text="quote-demo" data-edit-ui>
    <p class="m-0">Click to rewrite this line. Nothing else changes.</p>
    <cite class="text-content-subtle">A customer</cite>
</blockquote>
</template>
</div>
:::

</div>

Focusing text selects all of it, so replacing a line is one click and typing; click again to place the caret for a smaller edit. A text edit is saved when the element loses focus. Only inline formatting is kept: bold, italics, links and similar tags survive, and anything else — including pasted block markup — is reduced to its text.

---

## Reorder

`.sort` makes the region's children draggable. Drag by pointer, or focus a row and press Space to grab it, the arrow keys to move it and Enter to drop it; Escape cancels either way. Inside an editing-UI scope each row shows an inline grip on approach.

Over an `x-for` list, reordering moves the records themselves: the underlying array changes order, with rows identified by the loop's `:key`, so records need an `id`. Add `.data` — plus a `:data-key` on each row — to also edit record fields in place. Field edits update the data source, not the HTML.

<div x-code-group>

```html copy
<div x-data="{ tasks: [{ id: 1, label: 'Cut stems' }, { id: 2, label: 'Arrange' }, { id: 3, label: 'Deliver' }] }">
    <ul x-edit.sort.data="tasks" data-edit-ui>
        <template x-for="task in tasks" :key="task.id">
            <li :data-key="task.id"><span x-text="task.label"></span></li>
        </template>
    </ul>
    <small x-text="tasks.map(t => t.label).join(' → ')"></small>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div x-data="{ tasks: [{ id: 1, label: 'Cut stems' }, { id: 2, label: 'Arrange' }, { id: 3, label: 'Deliver' }] }" class="col gap-3">
    <ul class="col gap-2 m-0 p-0 list-none" x-edit.sort.data="tasks-demo" data-edit-ui>
        <template x-for="task in tasks" :key="task.id">
            <li class="row items-center p-3 bg-surface-1 border border-line rounded" :data-key="task.id"><span x-text="task.label"></span></li>
        </template>
    </ul>
    <small class="text-content-subtle" x-text="tasks.map(t => t.label).join(' → ')"></small>
</div>
</template>
</div>
:::

</div>

---

## Move

A positioned child — `position: absolute` or `fixed` — isn't reordered, it's moved: drag it anywhere in its containing block, or focus it and nudge with the arrow keys (Shift takes a larger step). The new `left` and `top` are written in whatever unit the element already uses, so a `%`-positioned element stays fluid. This is the freeform mode for canvas-style editing; in-flow siblings in the same region still reorder.

<div x-code-group>

```html copy
<div x-edit.sort="stage" data-edit-ui style="position: relative; height: 10rem">
    <span style="position: absolute; left: 5%; top: 1rem">Drag me anywhere</span>
    <span style="position: absolute; left: 50%; top: 5rem">Me too</span>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div class="bg-surface-2 rounded" x-edit.sort="stage-demo" data-edit-ui style="position: relative; height: 10rem">
    <span class="py-2 px-3 bg-surface-1 border border-line rounded" style="position: absolute; left: 5%; top: 1rem">Drag me anywhere</span>
    <span class="py-2 px-3 bg-surface-1 border border-line rounded" style="position: absolute; left: 50%; top: 5rem">Me too</span>
</div>
</template>
</div>
:::

</div>

Dragging between regions — lifting an element out of one parent and dropping it into another — isn't supported yet.

---

## Resize

`.size` adds drag handles. The new size is written in whatever unit the element already uses, and the element's own `min-` and `max-` width and height set the limits. Which edges get handles, snap stops and collapse thresholds are configured with the `--edit-size-*` variables listed under [Styles](#styles).

<div x-code-group>

```html copy
<div x-data="{ w: '16rem' }">
    <div x-edit.size="panel" data-edit-ui @edit:size="w = $event.detail.css.width"
         style="width: 16rem; height: 5rem; min-width: 8rem; max-width: 24rem;
                --edit-size-edges: end bottom; --edit-size-snap: 12rem 20rem; --edit-size-snap-distance: 1rem">
        <span x-text="w"></span>
    </div>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div x-data="{ w: '16rem' }">
    <div class="p-4 bg-surface-2 rounded text-content-subtle" x-edit.size="panel-demo" data-edit-ui @edit:size="w = $event.detail.css.width"
         style="width: 16rem; height: 5rem; min-width: 8rem; max-width: 24rem; --edit-size-edges: end bottom; --edit-size-snap: 12rem 20rem; --edit-size-snap-distance: 1rem">
        <span x-text="w"></span>
    </div>
</div>
</template>
</div>
:::

</div>

Handles are focusable: the arrow keys resize, and Shift takes a larger step. `edit:size` fires throughout the drag and once more with `detail.done` when it commits.

---

## Block Operations

A block is the unit these operations act on: the sortable child in a region that sorts, otherwise the region's outermost element. A focused block responds to **Cmd/Ctrl + C, X, V, D** and **Delete** — copy, cut, paste, duplicate and delete.

Right-clicking a block fires `edit:context` with the block and the pointer position. Call `preventDefault()` and open your own menu; with no handler, an `.authoring` region opens the built-in class menu instead.

<div x-code-group>

```html copy
<div x-data>
    <div x-edit.sort="chips" data-edit-ui @edit:context="$event.preventDefault();
            $refs.menu.style.inset = 'auto';
            $refs.menu.style.left = $event.detail.x + 'px';
            $refs.menu.style.top = $event.detail.y + 'px';
            $refs.menu.showPopover()">
        <span>Roses</span>
        <span>Peonies</span>
        <span>Eucalyptus</span>
    </div>

    <menu popover x-ref="menu">
        <button :disabled="!$edit.can('duplicate')" @click="$edit.duplicate(); $refs.menu.hidePopover()">Duplicate</button>
        <button :disabled="!$edit.can('remove')" @click="$edit.remove(); $refs.menu.hidePopover()">Delete</button>
    </menu>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div x-data class="col gap-3">
    <div class="row-wrap gap-2" x-edit.sort="chips-demo" data-edit-ui @edit:context="$event.preventDefault(); $refs.menu.style.inset = 'auto'; $refs.menu.style.left = $event.detail.x + 'px'; $refs.menu.style.top = $event.detail.y + 'px'; $refs.menu.showPopover()">
        <span class="py-2 px-3 bg-surface-2 rounded">Roses</span>
        <span class="py-2 px-3 bg-surface-2 rounded">Peonies</span>
        <span class="py-2 px-3 bg-surface-2 rounded">Eucalyptus</span>
    </div>
    <menu popover x-ref="menu">
        <button :disabled="!$edit.can('duplicate')" @click="$edit.duplicate(); $refs.menu.hidePopover()">Duplicate</button>
        <button :disabled="!$edit.can('remove')" @click="$edit.remove(); $refs.menu.hidePopover()">Delete</button>
    </menu>
</div>
</template>
</div>
:::

</div>

The event fires after the pointer is released, so a popover opened in the handler isn't immediately closed by the same click. `$edit.can()` is reactive: bound to a button's `disabled`, it updates as the targeted block changes.

---

## Theme Controls

`x-edit.cssvar` binds an input to a CSS variable, so a control panel can restyle the page live. A bare variable name writes to `:root` and applies everywhere. A `scope:` prefix writes onto the element that declared that scope with `x-edit.theme`, so the change applies only inside it. `data-unit` appends a unit to a numeric input's value.

<div x-code-group>

```html copy
<div x-edit.theme="card" style="--color-brand-surface: #7c3aed; --radius: 0.5rem">
    <button class="brand">Order now</button>
</div>

<label><data>Brand</data> <input type="color" x-edit.cssvar="card:--color-brand-surface"></label>
<label><data>Radius</data> <input type="range" min="0" max="2" step="0.125" data-unit="rem" x-edit.cssvar="card:--radius"></label>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div class="col gap-4">
    <div class="p-4 bg-surface-2 rounded" x-edit.theme="card-demo" style="--color-brand-surface: #7c3aed; --radius: 0.5rem">
        <button class="brand">Order now</button>
    </div>
    <div class="row-wrap gap-6">
        <label><data>Brand</data> <input type="color" x-edit.cssvar="card-demo:--color-brand-surface"></label>
        <label class="grow"><data>Radius</data> <input type="range" min="0" max="2" step="0.125" data-unit="rem" x-edit.cssvar="card-demo:--radius"></label>
    </div>
</div>
</template>
</div>
:::

</div>

`.theme` on its own only declares a scope — it makes nothing editable — so it can safely wrap other regions.

---

## With the Text Editor

Text edits in a plain region keep inline formatting only. For rich text, put [`x-text-edit`](/docs/core-plugins/text-edit) on an element inside the region: the rich editor takes over that element, and `x-edit` records whatever it produces — headings, lists and other block markup included — as an ordinary text edit, so undo and publishing treat it like everything else.

<div x-code-group>

```html copy
<button x-text-edit.strong>Bold</button>
<button x-text-edit.em>Italic</button>

<article x-edit.text.authoring="post">
    <p>A title, edited plainly.</p>
    <div x-text-edit.html><p>A body, <strong>edited richly</strong>.</p></div>
</article>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div class="col gap-3">
    <div class="row gap-1">
        <button class="ghost sm" x-text-edit.strong>Bold</button>
        <button class="ghost sm" x-text-edit.em>Italic</button>
    </div>
    <article class="col gap-2 p-4" x-edit.text.authoring="post-demo">
        <p class="m-0">A title, edited plainly.</p>
        <div x-text-edit.html><p>A body, <strong>edited richly</strong>.</p></div>
    </article>
</div>
</template>
</div>
:::

</div>

Here `x-text-edit` has no expression of its own, so the content belongs to the page and the edit lands in the region's history. Give it an expression and that value belongs to your app instead — the region no longer records it.

---

## Publishing

Edits in `.authoring` regions are saved to the browser's `localStorage` as they happen, so they're still there after a reload. Edits outside `.authoring` last for the session only; undo works either way.

`$edit.publish()` turns the recorded edits into patches: concrete changes to the page's source. Set `$edit.onPublish` to receive them and send them wherever your product stores content — your API, a database row, or the pipeline that regenerates a published site. That's the shape of most real editors: the person edits in place, and publish hands you the result.

Editing your own project while you build it is the other case: without an `onPublish` handler, publish posts the patches to `npx mnfst-run --edit`{copy} — the local development server — which writes them straight into your source files.

<div x-code-group>

```html copy
<div x-data="{ out: '' }" x-init="$edit.onPublish = patches => out = JSON.stringify(patches, null, 2)">
    <button @click="$edit.publish()">Publish</button>
    <pre x-text="out"></pre>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div x-data="{ out: '' }" x-init="$edit.onPublish = patches => out = JSON.stringify(patches, null, 2)" class="col gap-3">
    <div class="row gap-2">
        <button @click="$edit.publish()">Publish</button>
        <button class="ghost" :disabled="!$edit.canUndo" @click="$edit.undo()">Undo</button>
        <button class="ghost" :disabled="!$edit.canRedo" @click="$edit.redo()">Redo</button>
    </div>
    <pre class="text-xs max-h-64 overflow-auto" x-show="out" x-text="out"></pre>
</div>
</template>
</div>
:::

</div>

---

## Reference

| Modifier | Effect |
|---|---|
| `.text` | Rewrite text in place |
| `.sort` | Reorder children by drag or keyboard; positioned children move freely |
| `.style` | Right-click class menu (needs `.authoring`) |
| `.size` | Resize by handles |
| `.data` | Edit `x-for` record fields; rows need `:data-key` |
| `.lock` | Exclude this element and everything inside it |
| `.gated` | Editable only after `$edit.on()` |
| `.authoring` | Editing UI, persistence and publishing |
| `.theme` | Declare a scope for `x-edit.cssvar` |
| `.cssvar` | Bind an input to `--var` or `scope:--var` |

| `$edit` | Description |
|---|---|
| `active`, `on()`, `off()`, `toggle()` | Activate `.gated` regions |
| `undo()`, `redo()`, `canUndo`, `canRedo` | Step through the edit history |
| `target`, `can(op)`, `block(node)` | The current block and which operations apply to it |
| `copy()`, `cut()`, `paste()`, `duplicate()`, `remove()` | Block operations; optional element argument |
| `lock(el)`, `unlock(el)` | Lock a subtree at runtime; not recorded in the history |
| `publish()`, `onPublish`, `patches()`, `export()` | Send patches, intercept them, read them, or export the raw history |

| Event | Fires on | `detail` |
|---|---|---|
| `edit:context` | The region, after right-click | `target`, `area`, `x`, `y`, `can(op)` |
| `edit:size` | The element, during and after a resize | `width`, `height`, `css`, `collapsed`, `done` |
| `edit:collapse` | The element, ending below `--edit-size-collapse-x`/`-y` | — |

---

## Styles

All editing UI is drawn only inside a `data-edit-ui` scope — the attribute on the region itself, or on any ancestor to cover a whole view. `.authoring` sets it on its region automatically. Outside the scope everything still works (cursors and hit areas remain); it just draws nothing.

| Variable | Default | Purpose |
|---|---|---|
| `--edit-accent` | `--color-brand-content` | Colour of every editing affordance |
| `--edit-grip` | `0.6rem` | Size of the inline drag grip on sortable rows |
| `--edit-grip-display` | `inline-block` | `none` removes the grip (e.g. grid rows, where it would occupy a cell) |
| `--edit-ghost-opacity` | `0.4` | Opacity of the drag stand-in |
| `--edit-toolbar` | `flex` | The floating toolbar; `none` hides it |
| `--edit-size` | `both` | Resize axes: `both`, `x`, `y`, `none` |
| `--edit-size-edges` | all | Which edges get handles; accepts logical `start` and `end` |
| `--edit-size-handle` | `1rem` | Handle hit area |
| `--edit-size-snap` | — | Snap stops; `-x` and `-y` per axis |
| `--edit-size-snap-distance` | `0` | Magnet tolerance; `-x` and `-y` per axis |
| `--edit-size-collapse-x`, `-y` | — | Below this, set `data-edit-collapsed` |

Every affordance is addressable — style them like any other markup:

| Selector | What it is |
|---|---|
| `[data-edit-ui]` | The scope that turns the UI on |
| `[data-edit-armed]` | An active editable region; `::before` shows `data-edit-label` |
| `[data-edit-sortable]` | A draggable row; `::before` is the grip |
| `[data-edit-grabbed]` | A row grabbed by keyboard |
| `[data-edit-ghost]` | The stand-in holding the drop slot during a drag |
| `[data-edit-movable]` | A positioned, freely draggable element |
| `[data-edit-sizable]`, `[data-edit-handle]` | A resizable element and its handles (valued by edge) |
| `[data-edit-collapsed]` | Resized below the collapse threshold |
| `[data-edit-toolbar]` | The floating undo/redo/publish toolbar |
| `[data-edit-menu]` | The built-in right-click class menu |
| `html[data-edit-active]` | Set while an authoring region is active on screen |

---

## Related

- [Text Edit](/docs/core-plugins/text-edit) — a rich text field
