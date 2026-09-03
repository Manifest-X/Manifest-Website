# Edit

Turn a live page into its own editor.

---

## Overview

`x-edit` marks a region of the page as editable. Inside it, text is rewritten in place, children are reordered, elements are resized and classes are changed. Every change is appended to a delta log; undo, redo, reload and publishing replay that log.

<div x-code-group>

```html copy
<section x-edit.authoring="hero">
    <h1>Bloom &amp; Bramble</h1>
    <p>Seasonal arrangements, delivered weekly.</p>
    <p>Click any text to edit it. Drag a line to reorder. Right-click for classes.</p>
</section>
```

::: frame
<div x-data="{ ready: false }" x-init="(Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit')).then(() => setTimeout(() => { ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<section class="col gap-2 p-4" x-edit.authoring="hero-demo">
    <span class="h3">Bloom &amp; Bramble</span>
    <p>Seasonal arrangements, delivered weekly.</p>
    <p class="text-content-subtle">Click any text to edit it. Drag a line to reorder. Right-click for classes.</p>
</section>
</template>
</div>
:::

</div>

`.authoring` adds the chrome: a dashed outline, a region label and the floating toolbar. Without it a region is plain behaviour.

---

## Setup

Edit is opt-in. The `+` prefix keeps the default plugins and adds it; `Manifest.loadPlugin('edit')`{copy} loads it behind your own gate.

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

`x-edit` takes a key that names the region; keep it stable. A region allows sort, text and style by default. Naming any capability replaces that default.

<div x-code-group>

```html copy
<blockquote x-edit.text="quote">
    <p>Click to rewrite this line. Nothing else changes.</p>
    <cite>A customer</cite>
</blockquote>
```

::: frame
<div x-data="{ ready: false }" x-init="(Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit')).then(() => setTimeout(() => { ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<blockquote class="col gap-1 m-0" x-edit.text="quote-demo">
    <p class="m-0">Click to rewrite this line. Nothing else changes.</p>
    <cite class="text-content-subtle">A customer</cite>
</blockquote>
</template>
</div>
:::

</div>

Text commits on blur. Only inline formatting survives.

---

## Reorder

`.sort` makes children draggable. Over an `x-for` list the array itself is reordered; rows are identified by the loop's `:key` and records need an `id`. Add `.data` and a `:data-key` to edit field values in place too.

<div x-code-group>

```html copy
<div x-data="{ tasks: [{ id: 1, label: 'Cut stems' }, { id: 2, label: 'Arrange' }, { id: 3, label: 'Deliver' }] }">
    <ul x-edit.sort.data="tasks">
        <template x-for="task in tasks" :key="task.id">
            <li :data-key="task.id"><span x-text="task.label"></span></li>
        </template>
    </ul>
    <small x-text="tasks.map(t => t.label).join(' → ')"></small>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="(Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit')).then(() => setTimeout(() => { ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div x-data="{ tasks: [{ id: 1, label: 'Cut stems' }, { id: 2, label: 'Arrange' }, { id: 3, label: 'Deliver' }] }" class="col gap-3">
    <ul class="col gap-2 m-0 p-0 list-none" x-edit.sort.data="tasks-demo">
        <template x-for="task in tasks" :key="task.id">
            <li class="row items-center gap-3 p-3 bg-surface-1 border border-line rounded" :data-key="task.id"><span x-icon="lucide:grip-vertical" class="text-content-subtle"></span><span x-text="task.label"></span></li>
        </template>
    </ul>
    <small class="text-content-subtle" x-text="tasks.map(t => t.label).join(' → ')"></small>
</div>
</template>
</div>
:::

</div>

Focus a row and press Space to grab it, the arrow keys to move it and Enter to drop. Escape cancels any drag.

---

## Resize

`.size` adds drag handles. The size is written in the unit the element already uses; limits come from its own `min-` and `max-` width and height. Options are CSS variables.

<div x-code-group>

```html copy
<div x-data="{ w: '16rem' }">
    <div x-edit.size="panel" @edit:size="w = $event.detail.css.width"
         style="width: 16rem; height: 5rem; min-width: 8rem; max-width: 24rem;
                --edit-size-edges: end bottom; --edit-size-snap: 12rem 20rem; --edit-size-snap-distance: 1rem">
        <span x-text="w"></span>
    </div>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="(Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit')).then(() => setTimeout(() => { ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div x-data="{ w: '16rem' }">
    <div class="center bg-surface-2 rounded text-content-subtle" x-edit.size="panel-demo" @edit:size="w = $event.detail.css.width"
         style="width: 16rem; height: 5rem; min-width: 8rem; max-width: 24rem; --edit-size-edges: end bottom; --edit-size-snap: 12rem 20rem; --edit-size-snap-distance: 1rem">
        <span x-text="w"></span>
    </div>
</div>
</template>
</div>
:::

</div>

Handles are focusable: the arrow keys resize, Shift takes a larger step. `edit:size` fires during the drag and once with `detail.done` on commit.

---

## Block Operations

Copy, cut, paste, duplicate and delete act on a block: the sortable child, or the outermost element in a region that is not sortable. A focused block takes **Cmd/Ctrl + C, X, V, D** and **Delete**. Right-click fires `edit:context` with the block and pointer position; call `preventDefault()` and open your own menu.

<div x-code-group>

```html copy
<div x-data>
    <div x-edit.sort="chips" @edit:context="$event.preventDefault();
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
<div x-data="{ ready: false }" x-init="(Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit')).then(() => setTimeout(() => { ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div x-data class="col gap-3">
    <div class="row-wrap gap-2" x-edit.sort="chips-demo" @edit:context="$event.preventDefault(); $refs.menu.style.inset = 'auto'; $refs.menu.style.left = $event.detail.x + 'px'; $refs.menu.style.top = $event.detail.y + 'px'; $refs.menu.showPopover()">
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

The event fires after the pointer is released, so a popover opened in the handler survives the click. `$edit.can()` is reactive. Without a handler, an `.authoring` region opens the built-in class menu.

---

## Theme Controls

`x-edit.cssvar` binds an input to a CSS variable. A bare name writes to `:root`; a `scope:` prefix writes onto the element that declared that scope with `x-edit.theme`. `data-unit` appends a unit to a numeric value.

<div x-code-group>

```html copy
<div x-edit.theme="card" style="--color-brand-surface: #7c3aed; --radius: 0.5rem">
    <button class="brand">Order now</button>
</div>

<label>Brand <input type="color" x-edit.cssvar="card:--color-brand-surface"></label>
<label>Radius <input type="range" min="0" max="2" step="0.125" data-unit="rem" x-edit.cssvar="card:--radius"></label>
```

::: frame
<div x-data="{ ready: false }" x-init="(Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit')).then(() => setTimeout(() => { ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
<template x-if="ready">
<div class="col gap-4">
    <div class="p-4 bg-surface-2 rounded" x-edit.theme="card-demo" style="--color-brand-surface: #7c3aed; --radius: 0.5rem">
        <button class="brand">Order now</button>
    </div>
    <div class="row-wrap gap-4">
        <label>Brand <input type="color" x-edit.cssvar="card-demo:--color-brand-surface"></label>
        <label>Radius <input type="range" min="0" max="2" step="0.125" data-unit="rem" x-edit.cssvar="card-demo:--radius"></label>
    </div>
</div>
</template>
</div>
:::

</div>

`.theme` on its own declares a cascade target, not an editable area, so it can wrap other regions.

---

## With the Text Editor

Put [`x-text-edit`](/docs/core-plugins/text-edit) on an element inside a region and the rich editor owns it: `x-edit` records what it produces as a text delta, block markup included.

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
<div x-data="{ ready: false }" x-init="(Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit')).then(() => setTimeout(() => { ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
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

Give `x-text-edit` an expression and the app owns that value instead.

---

## Publishing

Edits in `.authoring` regions persist to `localStorage` and survive a reload. Elsewhere the app owns the state and edits last for the session; undo still works.

`$edit.publish()` resolves the log into patches against your source. During development, `npx mnfst-run --edit`{copy} accepts them and writes your files. Set `$edit.onPublish` to receive the patches yourself.

<div x-code-group>

```html copy
<div x-data="{ out: '' }" x-init="$edit.onPublish = patches => out = JSON.stringify(patches, null, 2)">
    <button @click="$edit.publish()">Publish</button>
    <pre x-text="out"></pre>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="(Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit')).then(() => setTimeout(() => { ready = true; setTimeout(() => Alpine.store('edit').on()) }))">
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
| `.text` | Rewrite text leaves in place |
| `.sort` | Reorder children by drag or keyboard |
| `.style` | Right-click class menu (`.authoring` only) |
| `.size` | Resize by handles |
| `.data` | Edit `x-for` field values; rows need `:data-key` |
| `.lock` | Opt this element and its subtree out |
| `.gated` | Editable only after `$edit.on()` |
| `.authoring` | Chrome, persistence and publishing |
| `.theme` | Declare a scope for `x-edit.cssvar` |
| `.cssvar` | Bind an input to `--var` or `scope:--var` |

| `$edit` | Description |
|---|---|
| `active`, `on()`, `off()`, `toggle()` | Activate `.gated` regions |
| `undo()`, `redo()`, `canUndo`, `canRedo` | Walk the log |
| `target`, `can(op)`, `block(node)` | The block in play and what applies to it |
| `copy()`, `cut()`, `paste()`, `duplicate()`, `remove()` | Block operations; optional element argument |
| `lock(el)`, `unlock(el)` | Lock a subtree at runtime; not logged |
| `publish()`, `onPublish`, `patches()`, `export()` | Send patches, intercept them, read them, or export the log |

| Event | Fires on | `detail` |
|---|---|---|
| `edit:context` | The region, after right-click | `target`, `area`, `x`, `y`, `can(op)` |
| `edit:size` | The element, during and after a resize | `width`, `height`, `css`, `collapsed`, `done` |
| `edit:collapse` | The element, ending below `--edit-size-collapse-x`/`-y` | — |

---

## Styles

| Variable | Default | Purpose |
|---|---|---|
| `--edit-accent` | `--color-brand-content` | Colour of every affordance |
| `--edit-ghost-opacity` | `0.4` | Opacity of the drag stand-in |
| `--edit-size` | `both` | Resize axes: `both`, `x`, `y`, `none` |
| `--edit-size-edges` | all | Handle list; accepts `start` and `end` |
| `--edit-size-handle` | `1rem` | Handle hit area |
| `--edit-size-snap` | — | Snap stops; `-x` and `-y` per axis |
| `--edit-size-snap-distance` | `0` | Magnet tolerance; `-x` and `-y` per axis |
| `--edit-size-collapse-x`, `-y` | — | Below this, set `data-edit-collapsed` |

---

## Related

- [Text Edit](/docs/core-plugins/text-edit) — a rich text field
- [Resize](/docs/core-plugins/resize) — the standalone resize directive
