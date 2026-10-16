# Resize

Resize elements by their edges, with limits, snap points, and closing.

---

## Overview

`.size` gives an element handles on its edges and corners. The new width and height are written in the units the element already uses, so `rem` stays `rem` and `%` stays `%`. The element's own `min-` and `max-` width and height are the limits.

Each panel below has a handle on its inner edge. Drag it near 12rem or 16rem and it snaps there, and the edge thickens while it holds. Drag it below 6rem and the panel closes as you drag; drag back out and it reopens. Let go while it's closed and it stays closed: the buttons reopen it, and so does undo.

<div x-code-group>

```html copy
<div x-data="{ left: true, right: true }" class="row h-48 border border-line">
    <div x-edit.size="left-panel" x-show="left"
           style="width: 12rem; min-width: 8rem; max-width: 20rem;
                  --edit-size: x; --edit-size-edges: end;
                  --edit-size-snap: 12rem 16rem; --edit-size-snap-distance: 1rem;
                  --edit-size-close: 6rem">
        Left panel
    </div>

    <main class="grow col gap-2">
        <span>Main content</span>
        <button @click="left = !left">Toggle left</button>
        <button @click="right = !right">Toggle right</button>
    </main>

    <div x-edit.size="right-panel" x-show="right"
           style="width: 12rem; min-width: 8rem; max-width: 20rem;
                  --edit-size: x; --edit-size-edges: start;
                  --edit-size-snap: 12rem 16rem; --edit-size-snap-distance: 1rem;
                  --edit-size-close: 6rem">
        Right panel
    </div>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div x-data="{ left: true, right: true }" class="row h-48 w-full border border-line">
    <div class="p-4 bg-surface-2 border-e border-line" x-edit.size="left-panel-demo" x-show="left" style="width: 12rem; min-width: 8rem; max-width: 20rem; --edit-size: x; --edit-size-edges: end; --edit-size-snap: 12rem 16rem; --edit-size-snap-distance: 1rem; --edit-size-close: 6rem">Left panel</div>
    <main class="grow col gap-2 p-4">
        <span>Main content</span>
        <button class="sm" @click="left = !left">Toggle left</button>
        <button class="sm" @click="right = !right">Toggle right</button>
    </main>
    <div class="p-4 bg-surface-2 border-s border-line" x-edit.size="right-panel-demo" x-show="right" style="width: 12rem; min-width: 8rem; max-width: 20rem; --edit-size: x; --edit-size-edges: start; --edit-size-snap: 12rem 16rem; --edit-size-snap-distance: 1rem; --edit-size-close: 6rem">Right panel</div>
</div>
</template>
</div>
:::

</div>

Everything is set with `--edit-size-*` variables, on the element or anywhere above it, so a theme file can set project-wide defaults. Snapping and closing are off unless you set them. `none` on any of the variables cancels a value inherited from above.

`x-edit.size` is part of [Edit](/docs/framework/core-plugins/edit): set it up there first. It can go on its own element, or on a region that also moves and edits text.

---

## Handles and Limits

| Variable | Default | Sets |
|---|---|---|
| `--edit-size` | `both` | Which way it resizes: `both`, `x`, `y`, or `none` |
| `--edit-size-edges` | every edge and corner of those axes | The handles, from `top` `right` `bottom` `left`, corners such as `bottom-right`, and logical `start` `end` `top-start` `bottom-end` that follow the writing direction |
| `--edit-size-handle` | `1rem` | How wide each handle's grab area is |

A handle shows when you hover the element, and it can be focused with Tab: the arrow keys then resize by 8 pixels, or 32 with Shift. `edit:size` fires on the element throughout a resize, and once more when it's recorded, with `detail.done` set.

Handles are drawn inside the element, so an image, video, or other element that can't hold children is resized through a wrapper, like the `<figure>` in the [Edit overview](/docs/framework/core-plugins/edit#overview).

## Snap Points

`--edit-size-snap` lists sizes the edge is pulled to, in any CSS length, such as `12rem 16rem 50%`. `--edit-size-snap-distance` sets how close the edge must come before it's pulled in. Without a distance, the size is always the nearest snap point. `-x` and `-y` variants, such as `--edit-size-snap-x`, set each axis on its own and take priority over the shared value.

While an edge sits on a snap point, the element and its handle carry `data-edit-snapped`, and the edge is drawn thicker, so you can feel the snap before you let go.

## Close and Reopen

`--edit-size-close` (or `-close-x`, `-close-y`) closes the element as soon as the edge is dragged past that size, while you're still holding it, and reopens it if you drag back out. Closing rides `x-show`: its `x-show` variable is set to `false`, so Alpine hides it. Let go while it's closed and the close is recorded: the element keeps its minimum size, or the size it had if it has no minimum, ready to reopen. Reopen it with your own button that sets the variable back, or undo: one undo restores both the size and the visibility. Pressing Escape mid-drag, or any cancelled drag, reopens it.

The `x-show` value must be something that can be assigned, such as `left` or `panels.left`. Without one, Edit warns in the console and a resize dragged below the close size goes back to the size it had when released. Closing and reopening are part of the page state, not the content: they aren't kept by [`.persist`](/docs/framework/core-plugins/edit#history) or published.

---

## Styles

### Handles

Each handle is a `<span data-edit-handle>` inside the element, valued by its edge. Its grab area is transparent and its visible line is its `::before`. While a handle is being dragged it carries `data-edit-resizing`, and `data-edit-snapped` while its edge sits on a snap point.

<div x-code-group>

```html copy
<style>
    .thick-handles [data-edit-handle]::before {
        background-color: var(--color-line);
        border-radius: 999px;
    }
    .thick-handles [data-edit-handle="right"]::before { width: 4px; height: 2.5rem; }
    .thick-handles [data-edit-handle="bottom"]::before { width: 2.5rem; height: 4px; }
</style>

<div x-edit.size="kennel-size" class="thick-handles"
     style="width: 16rem; height: 6rem; --edit-size-edges: right bottom">
    Drag the right or bottom edge
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="py-4">
    <style>
        .thick-handles [data-edit-handle]::before {
            background-color: var(--color-line);
            border-radius: 999px;
        }
        .thick-handles [data-edit-handle="right"]::before { width: 4px; height: 2.5rem; }
        .thick-handles [data-edit-handle="bottom"]::before { width: 2.5rem; height: 4px; }
    </style>
    <div class="p-4 bg-surface-2 rounded thick-handles" x-edit.size="kennel-size-demo" style="width: 16rem; height: 6rem; --edit-size-edges: right bottom">Drag the right or bottom edge</div>
</div>
</template>
</div>
:::

</div>

---

## Related

- [Edit](/docs/framework/core-plugins/edit) sets up regions, history, and the `$edit` reference.
- [Move](/docs/framework/core-plugins/move) drags pieces to new places.
- [Publishing](/docs/framework/core-plugins/edit-publishing) writes sizes back to your source.
