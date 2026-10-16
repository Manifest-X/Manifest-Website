# Move

Drag pieces to reorder them, nest them, and move them between regions.

---

## Overview

`.move` makes every piece of a region draggable. One drag covers every kind of move: among its siblings, into a container, out of one, or into another region. While you drag, a faint stand-in shows where the piece will land and the container it would land in gets a dashed outline.

A piece drags from anywhere on it, its text included: a press that moves a few pixels picks the piece up, and a click that doesn't move edits the text. While you're typing in a piece, dragging across its text selects words instead. The cursor shows a text caret over text and a grab hand elsewhere on a piece.

A drop the browser would rewrite is refused and the piece goes back: a `<div>` into a `<p>`, a `<li>` outside a list, a link inside a link, and anything else HTML doesn't allow.

`x-edit.move` is part of [Edit](/docs/framework/core-plugins/edit): set it up there first. A region with no capability named, as in `x-edit="key"`, moves and edits text; `x-edit.move` moves only.

---

## Grab Handles

To make a piece drag only from one part of it, such as a dotted handle, put `x-edit.grab` on that part. The rest of the piece then edits and clicks as usual, and only the handle picks it up, so the piece shows no grab cursor elsewhere. The handle is never editable text, and it stays in your markup through copies, duplicates, and publishing. Keep the text beside the handle in its own element, as in the `<span>` here: a text element that holds a handle isn't edited as one piece of text.

<div x-code-group>

```html copy
<div x-edit="walkers">
    <div class="row items-center gap-3">
        <span x-edit.grab x-icon="lucide:grip-vertical"></span>
        <span>Poochie's morning walker</span>
    </div>
    <div class="row items-center gap-3">
        <span x-edit.grab x-icon="lucide:grip-vertical"></span>
        <span>Poochie's evening walker</span>
    </div>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-2 w-full" x-edit="walkers-demo">
    <div class="row items-center gap-3 p-3 bg-surface-2 rounded">
        <span class="text-content-subtle" x-edit.grab x-icon="lucide:grip-vertical"></span>
        <span>Poochie's morning walker</span>
    </div>
    <div class="row items-center gap-3 p-3 bg-surface-2 rounded">
        <span class="text-content-subtle" x-edit.grab x-icon="lucide:grip-vertical"></span>
        <span>Poochie's evening walker</span>
    </div>
</div>
</template>
</div>
:::

</div>

A handle belongs to the nearest piece around it. Pieces nested inside a piece with a handle still drag from their own surface.

---

## In a List or Grid

Pieces in a list, a row, or a grid take the order you drop them in. Hovering a piece outlines it, so you can see what you're about to pick up.

<div x-code-group>

```html copy
<ul x-edit.move="queue">
    <li>Wash Poochie</li>
    <li>Trim nails</li>
    <li>Brush coat</li>
    <li>Photo shoot</li>
</ul>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<ul class="col gap-2 m-0 p-0 list-none w-full" x-edit.move="queue-demo">
    <li class="m-0 p-3 bg-surface-2 rounded">Wash Poochie</li>
    <li class="m-0 p-3 bg-surface-2 rounded">Trim nails</li>
    <li class="m-0 p-3 bg-surface-2 rounded">Brush coat</li>
    <li class="m-0 p-3 bg-surface-2 rounded">Photo shoot</li>
</ul>
</template>
</div>
:::

</div>

By keyboard, Tab to a piece and press **Space** or **Enter** to pick it up. The arrow keys move it, **Enter** or **Space** drops it, and **Escape** puts it back. **Alt + Up** and **Alt + Down** move a focused piece one step at once, and work while you're typing in it too; in text, Space and Enter keep typing, so press **Alt + Enter** first to step out to the piece, then pick it up.

A list rendered by `x-for` reorders its data instead of the markup: the array itself changes order. Each record needs an `id`, given to the loop as its `:key`. Add `.data` to edit record fields too: the row, or any element in it, whose `x-text` or `x-html` is a record field, such as `x-text="walk.name"`, becomes editable, and the edit updates the record when the text loses focus. A row that is itself the field drags from its surface, like other text. Rows from data stay in their own list.

To publish a list's order and field edits with `mnfst-run --edit`, its records must come from a CSV or JSON file declared as a data source in `manifest.json`, as in `$x.walks`. A list written inline in `x-data`, like the one here, edits on the page and reaches `onPublish`, but has no file to write to.

<div x-code-group>

```html copy
<div x-data="{ walks: [{ id: 1, name: 'Main Street' }, { id: 2, name: 'Beach' }, { id: 3, name: 'Park' }] }">
    <ul x-edit.move.data="walks">
        <template x-for="walk in walks" :key="walk.id">
            <li x-text="walk.name"></li>
        </template>
    </ul>
    <p x-text="walks.map(w => w.name).join(' → ')"></p>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-3 w-full" x-data="{ walks: [{ id: 1, name: 'Main Street' }, { id: 2, name: 'Beach' }, { id: 3, name: 'Park' }] }">
    <ul class="col gap-2 m-0 p-0 list-none" x-edit.move.data="walks-demo">
        <template x-for="walk in walks" :key="walk.id">
            <li class="m-0 p-3 bg-surface-2 rounded" x-text="walk.name"></li>
        </template>
    </ul>
    <p class="m-0 text-sm text-content-subtle" x-text="walks.map(w => w.name).join(' → ')"></p>
</div>
</template>
</div>
:::

</div>

## Nesting

Any element in a moving region that holds other elements is a container, empty ones included. Paragraphs, headings, and other text elements are always pieces, never containers. Dropping a piece in the middle of a container puts it inside; dropping near the container's edge puts it beside it. Dragging a piece out of its container un-nests it. While you drag, empty containers grow enough to drop into.

By keyboard, **Alt + Right** moves a focused piece into the container just before it, and **Alt + Left** moves it out one level. In text, Alt + Left and Right keep jumping by word, so press Alt + Enter first.

<div x-code-group>

```html copy
<div x-edit.move="kennel">
    <p>Biscuit</p>
    <div>
        <p>Poochie</p>
        <p>Rex</p>
    </div>
    <p>Mochi</p>
    <div></div>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-2 w-full" x-edit.move="kennel-demo">
    <p class="m-0 p-3 bg-surface-2 rounded">Biscuit</p>
    <div class="col gap-2 p-3 border border-line rounded">
        <p class="m-0 p-3 bg-surface-2 rounded">Poochie</p>
        <p class="m-0 p-3 bg-surface-2 rounded">Rex</p>
    </div>
    <p class="m-0 p-3 bg-surface-2 rounded">Mochi</p>
    <div class="col gap-2 p-3 border border-line rounded"></div>
</div>
</template>
</div>
:::

</div>

## Between Regions

A piece can be dragged from one region into another that also allows moving. Every region it could land in shows a dashed outline while you drag, an empty one included, and a drop just outside a region still lands in it. The move is one step of the history, and publishing writes it to both places.

<div x-code-group>

```html copy
<div class="grid grid-cols-2 gap-4">
    <ul x-edit.move="monday">
        <li>Bath</li>
        <li>Walk</li>
    </ul>
    <ul x-edit.move="tuesday">
        <li>Vet</li>
    </ul>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="grid grid-cols-2 gap-4 w-full">
    <div class="col gap-2">
        <span class="text-sm text-content-subtle">Monday</span>
        <ul class="col gap-2 m-0 p-0 list-none" x-edit.move="monday-demo">
            <li class="m-0 p-3 bg-surface-2 rounded">Bath</li>
            <li class="m-0 p-3 bg-surface-2 rounded">Walk</li>
        </ul>
    </div>
    <div class="col gap-2">
        <span class="text-sm text-content-subtle">Tuesday</span>
        <ul class="col gap-2 m-0 p-0 list-none" x-edit.move="tuesday-demo">
            <li class="m-0 p-3 bg-surface-2 rounded">Vet</li>
        </ul>
    </div>
</div>
</template>
</div>
:::

</div>

Regions of written markup, in the page or in component files, can trade pieces, whole components included. Rows of a data list and the parts inside a component stay where they are, and so does a piece that is itself a region.

## Freeform

Whether a dropped piece flows or sits where you let go is decided by CSS, after the drop. If the piece is in normal flow in its new container, as in a block, flex, or grid layout, it takes its place in that order, and any `left` and `top` left over from an earlier freeform drop are removed. If it ends up absolutely positioned, by its own CSS or its container's, it's placed at the drop point. The new `left` and `top` are written in the units the piece already uses, so a `%` position stays fluid.

Here the canvas positions its children absolutely and the tray doesn't, so the same sticker sits where you drop it on the canvas and lines up in the tray. They're two regions, so a sticker crosses between them as in [Between Regions](#between-regions).

<div x-code-group>

```html copy
<div class="grid grid-cols-2 gap-4">
    <div x-edit.move="canvas" class="relative h-48 [&>*]:absolute">
        <span style="left: 1rem; top: 1rem">Fetch</span>
        <span style="left: 40%; top: 5rem">Nap</span>
    </div>
    <div x-edit.move="tray" class="col gap-2">
        <span>Dinner</span>
    </div>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="grid grid-cols-2 gap-4 w-full">
    <div class="relative h-48 bg-surface-2 rounded [&>*]:absolute" x-edit.move="canvas-demo">
        <span class="py-2 px-3 bg-surface-1 border border-line rounded" style="left: 1rem; top: 1rem">Fetch</span>
        <span class="py-2 px-3 bg-surface-1 border border-line rounded" style="left: 40%; top: 5rem">Nap</span>
    </div>
    <div class="col gap-2 p-3 border border-line rounded" x-edit.move="tray-demo">
        <span class="py-2 px-3 bg-surface-1 border border-line rounded">Dinner</span>
    </div>
</div>
</template>
</div>
:::

</div>

`[&>*]:absolute` gives every child of the canvas `position: absolute`. Dropped in the tray, a sticker is no longer a child of the canvas, so it's in flow and its `left` and `top` are removed; dropped back on the canvas, it's positioned again at the drop point. A piece that is absolutely positioned by its own `style` or classes stays positioned wherever it goes.

A positioned piece is dropped inside its container's box, never past its edges. With one focused, the arrow keys nudge it by 4 pixels, or 16 with Shift.

---

## Styles

### Drop Targets

While you drag, the container a piece would land in gets a dashed outline, other regions it could land in are marked with `data-edit-drop-target`, and the stand-in holding its place is marked `data-edit-ghost`.

<div x-code-group>

```html copy
<style>
    .targets [data-edit-drop-target],
    .targets :has(> [data-edit-ghost]) {
        outline: none;
        background: color-mix(in oklch, #16a34a 12%, transparent);
    }
    .targets [data-edit-ghost] {
        opacity: 1;
        outline: 2px dashed #16a34a;
    }
</style>

<div class="targets grid grid-cols-2 gap-4">
    <ul x-edit.move="indoor"><li>Puzzle</li><li>Tug</li></ul>
    <ul x-edit.move="outdoor"><li>Frisbee</li></ul>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="w-full">
    <style>
        .targets [data-edit-drop-target],
        .targets :has(> [data-edit-ghost]) {
            outline: none;
            background: color-mix(in oklch, #16a34a 12%, transparent);
        }
        .targets [data-edit-ghost] {
            opacity: 1;
            outline: 2px dashed #16a34a;
        }
    </style>
    <div class="targets grid grid-cols-2 gap-4">
        <ul class="col gap-2 m-0 p-2 list-none rounded" x-edit.move="indoor-demo">
            <li class="m-0 p-3 bg-surface-2 rounded">Puzzle</li>
            <li class="m-0 p-3 bg-surface-2 rounded">Tug</li>
        </ul>
        <ul class="col gap-2 m-0 p-2 list-none rounded" x-edit.move="outdoor-demo">
            <li class="m-0 p-3 bg-surface-2 rounded">Frisbee</li>
        </ul>
    </div>
</div>
</template>
</div>
:::

</div>

---

## Related

- [Edit](/docs/framework/core-plugins/edit) sets up regions, text editing, history, and the `$edit` reference.
- [Resize](/docs/framework/core-plugins/resize) adds edge handles to an element.
- [Publishing](/docs/framework/core-plugins/edit-publishing) writes moves back to your source.
