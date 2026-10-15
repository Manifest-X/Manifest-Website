# Edit

Turn a live page into its own editor.

---

## Overview

`x-edit` marks a region of the page as editable. Inside it, text can be rewritten in place, elements can be dragged to new spots, and elements you mark can be resized by their edges. Every change joins one undo history, and publishing writes the changes back to your source files or hands them to your own backend.

<div x-code-group>

```html copy
<section x-edit="adopt">
    <h2>Meet Poochie</h2>
    <div class="grid grid-cols-3 gap-3">
        <article>
            <h3>Good with kids</h3>
            <p>Gentle, patient, endlessly cuddly.</p>
        </article>
        <article>
            <h3>House-trained</h3>
            <p>Knows sit, stay and the way to the door.</p>
        </article>
        <article>
            <h3>Loves walks</h3>
            <p>Any weather, any distance.</p>
        </article>
    </div>
    <figure x-edit.size="adopt-photo" style="width: 14rem; height: 9rem; min-width: 8rem; max-width: 100%">
        <img src="/assets/examples/poochie.webp" alt="Poochie the dog">
    </figure>
</section>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<section class="col gap-4 w-full" x-edit="adopt-demo">
    <h2 class="m-0">Meet Poochie</h2>
    <div class="grid grid-cols-3 gap-3">
        <article class="col gap-1 p-4 bg-surface-2 rounded">
            <h3 class="m-0 text-lg">Good with kids</h3>
            <p class="m-0 text-sm">Gentle, patient, endlessly cuddly.</p>
        </article>
        <article class="col gap-1 p-4 bg-surface-2 rounded">
            <h3 class="m-0 text-lg">House-trained</h3>
            <p class="m-0 text-sm">Knows sit, stay and the way to the door.</p>
        </article>
        <article class="col gap-1 p-4 bg-surface-2 rounded">
            <h3 class="m-0 text-lg">Loves walks</h3>
            <p class="m-0 text-sm">Any weather, any distance.</p>
        </article>
    </div>
    <figure class="m-0" x-edit.size="adopt-photo-demo" style="width: 14rem; height: 9rem; min-width: 8rem; max-width: 100%">
        <img class="w-full h-full object-cover rounded m-0" src="/assets/examples/poochie.webp" alt="Poochie the dog">
    </figure>
</section>
</template>
</div>
:::

</div>

Click the headline and type a new one. Drag a card by its padding to put it somewhere else, or drag the photo's edges and corners to resize it. **Cmd/Ctrl + Z** undoes each change and **Shift + Cmd/Ctrl + Z** redoes it.

---

## Setup

Edit is opt-in and never part of the default Manifest bundle, so visitors don't download editor code. The `+` prefix keeps the default plugins and adds it; the standalone tab loads Edit on its own. Either way, Edit loads [Rich Text](/docs/framework/core-plugins/rich-text) automatically, because page text is edited with it.

<div x-code-group copy>

```html "All Plugins + Edit"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="+edit"></script>
```

```html "Standalone"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="edit"></script>
```

</div>

To load it only for signed-in editors, leave it out of `data-plugins` and call `Manifest.loadPlugin('edit')`{copy} once you know the visitor can edit; regions marked [`.gated`](#regions) then stay switched off until `$edit.on()`.

Editor styles are included in Manifest CSS, or as standalone stylesheets for Edit and Rich Text.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.edit.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.rich.text.css">
```

</div>

---

## Regions

A region is an element marked with `x-edit`, together with everything inside it. Its value is a key that names the region's edits, so a publish knows where in your source they belong. Keep the key stable and unique on the page: renaming it strands edits already made under the old name, and a key that appears on the page more than once, from two regions sharing it or a component used several times, isn't editable anywhere (Edit warns in the console), because a publish couldn't tell which one is meant.

Modifiers say what a region allows. With no capability named, a region allows text and move; naming one or more replaces that default, so `x-edit.move` allows moving only.

| Write | Means |
|---|---|
| `x-edit="key"` | This region can be edited: its text, and its pieces moved |
| `.text` | Its text can be rewritten in place |
| `.move` | Its pieces can be dragged to new places |
| `.size` | This element can be resized by its edges |
| `.data` | Fields of the records in its `x-for` list can be edited |
| `.gated` | Editing stays off until `$edit.on()` |
| `.persist` | Unpublished edits survive a reload in this browser |
| `.bare` | Editable, but draws none of the editing visuals |
| `.theme`, `.cssvar` | [Theme controls](#theme-controls) |

A piece is any element directly inside the region, or inside a container in it, that can be picked up and moved. A region inside another region sets its own capabilities for what it holds, and is itself a piece of the outer one. That's how the photo above can be resized while its section moves.

What a region holds decides where its edits go when published:

- **Markup** you wrote, in the page or in a component's HTML file: text, order, nesting, sizes and attributes are written back into that markup. A component's root element is the exception: its own attributes and classes come partly from where the component is used, so they aren't editable.
- **A list from data**, an `x-for` directly inside the region: moving reorders the array and `.data` edits record fields, see [In a List or Grid](#in-a-list-or-grid).
- **A component instance**, such as `<x-card>`: its text and classes can be edited, and with `.size` the region resized, but its parts don't move. Edits apply to this instance; `$edit.scope('main')` makes them apply to the component itself, and so to every instance, and `$edit.revert()` drops an instance's own edits.

### Lock

`x-edit.lock` on an element inside a region keeps it and everything inside it from being edited. Add an action to block only that one: `.lock.move`, `.lock.remove`, `.lock.duplicate`, `.lock.text`, `.lock.attrs` (attributes and classes) or `.lock.size`. Actions can be combined, as in `.lock.move.remove`.

<div x-code-group>

```html copy
<ul x-edit="rules">
    <li>Rewrite or drag me</li>
    <li x-edit.lock>Locked: no edits at all</li>
    <li x-edit.lock.move>Fixed in place, but you can rewrite me</li>
    <li x-edit.lock.text>Read-only text, but you can drag me</li>
</ul>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<ul class="col gap-2 m-0 p-0 list-none w-full" x-edit="rules-demo">
    <li class="m-0 p-3 bg-surface-2 rounded">Rewrite or drag me</li>
    <li class="m-0 p-3 bg-surface-2 rounded" x-edit.lock>Locked: no edits at all</li>
    <li class="m-0 p-3 bg-surface-2 rounded" x-edit.lock.move>Fixed in place, but you can rewrite me</li>
    <li class="m-0 p-3 bg-surface-2 rounded" x-edit.lock.text>Read-only text, but you can drag me</li>
</ul>
</template>
</div>
:::

</div>

A piece locked from moving can't be picked up, though other pieces can still be dropped before or after it, and stepping a neighbour by keyboard skips over it. To let the people using your editor lock things themselves, see [Blocks](#blocks).

---

## Text

Text in a region is edited in place. The first click on a piece of text selects all of it, so replacing a line is one click and typing; click again to place the caret. Enter does nothing, so a heading stays one heading, and **Shift + Enter** starts a new line inside it. **Escape** leaves the text. The change is recorded when the text loses focus, as one step of the history.

Page text runs on [Rich Text](/docs/framework/core-plugins/rich-text) in its one-line mode, so Rich Text's controls and shortcuts format it: **Cmd/Ctrl + B**, **I** and **U** for bold, italic and underline, and any [Rich Text button](/docs/framework/core-plugins/rich-text#buttons) for inline formatting. The buttons don't take focus, so they act on whichever text you're in.

<div x-code-group>

```html copy
<div class="row gap-1">
    <button x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
    <button x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
    <button x-rich-text.mark aria-label="Highlight"><span x-icon="lucide:highlighter"></span></button>
</div>

<article x-edit="story">
    <h3>Every word here can be bold, even in the title</h3>
    <p>Select some words and press Bold, or <strong>Cmd/Ctrl + B</strong>.</p>
</article>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-3 w-full">
    <div class="row gap-1">
        <button class="ghost sm" x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
        <button class="ghost sm" x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
        <button class="ghost sm" x-rich-text.mark aria-label="Highlight"><span x-icon="lucide:highlighter"></span></button>
    </div>
    <article class="col gap-2" x-edit="story-demo">
        <h3 class="m-0">Every word here can be bold, even in the title</h3>
        <p class="m-0">Select some words and press Bold, or <strong>Cmd/Ctrl + B</strong>.</p>
    </article>
</div>
</template>
</div>
:::

</div>

The buttons stay disabled until the caret is in a piece of text, and block-level commands such as headings and lists never apply to page text. Each `aria-label` names an icon-only button for screen readers.

Text that holds only plain formatting, such as bold, italics, links and line breaks, is one piece: the paragraph above is edited as a whole, with its bold words inside. HTML comments inside the text are kept as written. An element inside the text with its own class or Alpine directive is left as a separate piece instead, so its styling and bindings survive.

Links follow HTML's rule that a link can't hold another link: text that is itself a link or a button takes no links, and linking part of an existing link splits it, so the rest keeps its own address.

To allow headings, lists and other blocks in part of a region, put [`x-rich-text`](/docs/framework/core-plugins/rich-text) on that element, with no value of its own. It becomes a full Rich Text field, and Edit records the markup it produces as an ordinary text edit.

```html copy
<article x-edit="post">
    <h2>A title, edited in place</h2>
    <div x-rich-text.html class="unstyle">
        <p>A body that can hold <strong>headings</strong>, lists and quotes.</p>
    </div>
</article>
```

Some text can't be edited because it isn't written in the page: anything rendered by `x-text`, `x-html`, `x-markdown`, `x-icon` or another directive that produces its own content, and the rows an `x-for` or `x-if` renders, unless the region is a [data list](#in-a-list-or-grid). The contents of `<script>`, `<style>`, `<textarea>` and `<title>` are never editable.

::: brand icon="lucide:info"
Edit's `.text` means *text can be edited*. Alpine's `x-text` is the opposite case: text rendered from an expression, which Edit leaves alone.
:::

---

## Move

`.move` makes every piece of a region draggable. One drag covers every kind of move: among its siblings, into a container, out of one, or into another region. While you drag, a faint stand-in shows where the piece will land and the container it would land in gets a dashed outline.

A piece that is text has a small grip at its start edge, because its own surface is for typing; drag the grip to move it. Other pieces drag from anywhere on them that isn't text. In a region that allows moving but not text, every piece drags from its whole surface.

A drop the browser would rewrite is refused and the piece goes back: a `<div>` into a `<p>`, a `<li>` outside a list, a link inside a link, and anything else HTML doesn't allow.

### In a List or Grid

Pieces in a list, a row or a grid take the order you drop them in. Hovering a piece outlines it, so you can see what you're about to pick up.

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

By keyboard, Tab to a piece and press **Space** or **Enter** to pick it up. The arrow keys move it, **Enter** or **Space** drops it, and **Escape** puts it back. **Alt + Up** and **Alt + Down** move a focused piece one step at once, and work while you're typing in it too; in text, Space and Enter keep typing, so press Escape first to pick the piece up.

A list rendered by `x-for` reorders its data instead of the markup: the array itself changes order. Each record needs an `id`, given to the loop as its `:key`. Add `.data` to edit record fields too: any element in a row whose `x-text` or `x-html` is a record field, such as `x-text="walk.name"`, becomes editable, and the edit updates the record when the text loses focus. Here the field is a `<span>` inside the row, so the row around it stays something to drag; a row that is itself the field can be edited too, but only moved by keyboard. Rows from data stay in their own list.

<div x-code-group>

```html copy
<div x-data="{ walks: [{ id: 1, name: 'Park' }, { id: 2, name: 'Beach' }, { id: 3, name: 'Woods' }] }">
    <ul x-edit.move.data="walks">
        <template x-for="walk in walks" :key="walk.id">
            <li><span x-text="walk.name"></span></li>
        </template>
    </ul>
    <p x-text="walks.map(w => w.name).join(' → ')"></p>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-3 w-full" x-data="{ walks: [{ id: 1, name: 'Park' }, { id: 2, name: 'Beach' }, { id: 3, name: 'Woods' }] }">
    <ul class="col gap-2 m-0 p-0 list-none" x-edit.move.data="walks-demo">
        <template x-for="walk in walks" :key="walk.id">
            <li class="m-0 p-3 bg-surface-2 rounded"><span x-text="walk.name"></span></li>
        </template>
    </ul>
    <p class="m-0 text-sm text-content-subtle" x-text="walks.map(w => w.name).join(' → ')"></p>
</div>
</template>
</div>
:::

</div>

### Nesting

Any element in a moving region that holds other elements is a container, empty ones included. Paragraphs, headings and other text elements are always pieces, never containers. Dropping a piece in the middle of a container puts it inside; dropping near the container's edge puts it beside it. Dragging a piece out of its container un-nests it. While you drag, empty containers grow enough to drop into.

By keyboard, **Alt + Right** moves a focused piece into the container just before it, and **Alt + Left** moves it out one level. In text, Alt + Left and Right keep jumping by word, so press Escape first.

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

### Between Regions

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

Regions whose markup is written in the page can trade pieces. Rows of a data list and parts of a component stay where they are, and so does a piece that is itself a region.

### Freeform

Whether a dropped piece flows or sits where you let go is decided by CSS, after the drop. If the piece is in normal flow in its new container, as in a block, flex or grid layout, it takes its place in that order, and any `left` and `top` left over from an earlier freeform drop are removed. If it ends up absolutely positioned, by its own CSS or its container's, it's placed at the drop point. The new `left` and `top` are written in the units the piece already uses, so a `%` position stays fluid.

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

## Resize

`.size` gives an element handles on its edges and corners. The new width and height are written in the units the element already uses, so `rem` stays `rem` and `%` stays `%`. The element's own `min-` and `max-` width and height are the limits.

Each panel below has a handle on its inner edge. Drag it near 12rem or 16rem and it snaps there; drag it below 6rem and it closes. The buttons reopen it, and so does undo.

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

### Handles and Limits

| Variable | Default | Sets |
|---|---|---|
| `--edit-size` | `both` | Which way it resizes: `both`, `x`, `y` or `none` |
| `--edit-size-edges` | every edge and corner of those axes | The handles, from `top` `right` `bottom` `left`, corners such as `bottom-right`, and logical `start` `end` `top-start` `bottom-end` that follow the writing direction |
| `--edit-size-handle` | `1rem` | How wide each handle's grab area is |

A handle shows when you hover the element, and it can be focused with Tab: the arrow keys then resize by 8 pixels, or 32 with Shift. `edit:size` fires on the element throughout a resize, and once more when it's recorded, with `detail.done` set.

Handles are drawn inside the element, so an image, video or other element that can't hold children is resized through a wrapper, like the `<figure>` in the [overview](#overview).

### Snap Points

`--edit-size-snap` lists sizes the edge is pulled to, in any CSS length, such as `12rem 16rem 50%`. `--edit-size-snap-distance` sets how close the edge must come before it's pulled in. Without a distance, the size is always the nearest snap point. `-x` and `-y` variants, such as `--edit-size-snap-x`, set each axis on its own and take priority over the shared value.

### Close and Reopen

`--edit-size-close` (or `-close-x`, `-close-y`) closes the element when it's released below that size. Closing rides `x-show`: the element shrinks to its minimum size, or keeps the size it had if it has no minimum, and its `x-show` variable is set to `false`, so Alpine hides it. Reopen it with your own button that sets the variable back, or undo: one undo restores both the size and the visibility.

The `x-show` value must be something that can be assigned, such as `left` or `panels.left`. Without one, Edit warns in the console and a resize released below the close size goes back to the size it had. Closing and reopening are part of the page state, not the content: they aren't kept by [`.persist`](#history) or published.

---

## Blocks

A block is a piece the person editing acts on as a whole: copy, cut, paste, duplicate or delete it. With a piece focused, and not while typing in it, **Cmd/Ctrl + C**, **X**, **V** and **D** copy, cut, paste and duplicate it, and **Delete** or **Backspace** deletes it. A paste lands after the focused piece.

For a right-click menu, put [`x-dropdown.context`](/docs/framework/elements/dropdowns#context-menu) on the region. Right-clicking a piece opens your menu, and `$edit.target` is the piece you clicked, set before the menu opens; every `$edit` action uses it when called without an element. `$edit.can(action)` says whether an action applies to it, so a button bound to it disables itself.

<div x-code-group>

```html copy
<ul x-edit.move="toys" x-dropdown.context="toy-menu">
    <li>Ball</li>
    <li x-edit.lock.remove>Rope (can't be deleted)</li>
    <li>Squeaky duck</li>
</ul>

<menu popover id="toy-menu">
    <button @click="$edit.copy()">Copy</button>
    <button :disabled="!$edit.can('cut')" @click="$edit.cut()">Cut</button>
    <button :disabled="!$edit.can('paste')" @click="$edit.paste()">Paste</button>
    <button :disabled="!$edit.can('duplicate')" @click="$edit.duplicate()">Duplicate</button>
    <button :disabled="!$edit.can('remove')" @click="$edit.remove()">Delete</button>
    <hr>
    <button x-show="$edit.can('remove')" @click="$edit.lock($edit.target, 'remove')">Lock deleting</button>
    <button x-show="!$edit.can('remove')" @click="$edit.unlock($edit.target, 'remove')">Unlock deleting</button>
</menu>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="w-full">
    <ul class="col gap-2 m-0 p-0 list-none" x-edit.move="toys-demo" x-dropdown.context="toy-menu-demo">
        <li class="m-0 p-3 bg-surface-2 rounded">Ball</li>
        <li class="m-0 p-3 bg-surface-2 rounded" x-edit.lock.remove>Rope (can't be deleted)</li>
        <li class="m-0 p-3 bg-surface-2 rounded">Squeaky duck</li>
    </ul>
    <menu popover id="toy-menu-demo">
        <button @click="$edit.copy()">Copy</button>
        <button :disabled="!$edit.can('cut')" @click="$edit.cut()">Cut</button>
        <button :disabled="!$edit.can('paste')" @click="$edit.paste()">Paste</button>
        <button :disabled="!$edit.can('duplicate')" @click="$edit.duplicate()">Duplicate</button>
        <button :disabled="!$edit.can('remove')" @click="$edit.remove()">Delete</button>
        <hr>
        <button x-show="$edit.can('remove')" @click="$edit.lock($edit.target, 'remove')">Lock deleting</button>
        <button x-show="!$edit.can('remove')" @click="$edit.unlock($edit.target, 'remove')">Unlock deleting</button>
    </menu>
</div>
</template>
</div>
:::

</div>

Right-click a toy, copy it, then right-click another and paste. Lock deleting on one and the Delete button disables itself for it.

`$edit.lock(el, action)` and `$edit.unlock(el, action)` do at runtime what `.lock` does in markup, so the people using your editor can protect parts of a page from their own mistakes. Leave out the action to lock everything. A runtime lock is a step of the history, so it undoes, and `.persist` keeps it, but it's never written to your source: it belongs to the editing session, not the page. Unlocking also lifts a `.lock` written in the markup.

`$edit.can()` answers for `move`, `remove`, `duplicate`, `text`, `attrs`, `class`, `size`, `copy`, `cut` and `paste`, taking the region's capabilities and every lock into account. Other actions for menus and panels are in the [reference](#reference): `$edit.move()`, `nest()` and `unnest()` move a piece by script, and `$edit.attr()` and `$edit.classes` change attributes and classes as recorded edits.

::: brand icon="lucide:info"
In [Rich Text](/docs/framework/core-plugins/rich-text), *block* means a paragraph-level tag such as a heading or a list. Here it means any piece of the page.
:::

---

## History

Every edit on the page joins one history, shared by every region, in the order the edits were made. **Cmd/Ctrl + Z** undoes the last one and **Shift + Cmd/Ctrl + Z** (or **Ctrl + Y**) redoes it, wherever you are on the page, except in form fields and in elements with their own `x-rich-text`, which keep their own undo. While you're in a piece of text, the shortcuts first step through what you've done in it since you clicked in, typing burst by typing burst, then through the page's history. Put `data-edit-hotkeys="off"` on a region, or on any element above it such as `<html>`, to leave the shortcuts to your own code.

The browser's own undo can't do this: it only knows about typing in one field at a time, not about pieces moving, nesting, resizing or closing. Edit replaces it with one history of its own, so moves, nesting, resizes, closes, locks and text edits all step back in the order they were made.

There's no built-in toolbar. Build your own from buttons that call `$edit.undo()`, `$edit.redo()` and `$edit.publish()`, and bind them to `$edit.canUndo` and `$edit.canRedo` so they disable themselves when there's nothing to step to.

<div x-code-group>

```html copy
<div x-data="{ sent: '', init() { this.$edit.onPublish = patches => this.sent = 'Published at ' + new Date().toLocaleTimeString() } }">
    <div class="row gap-1">
        <button :disabled="!$edit.canUndo" @click="$edit.undo()" aria-label="Undo"><span x-icon="lucide:undo-2"></span></button>
        <button :disabled="!$edit.canRedo" @click="$edit.redo()" aria-label="Redo"><span x-icon="lucide:redo-2"></span></button>
        <button @click="$edit.publish()">Publish</button>
        <span x-text="sent"></span>
    </div>

    <ul x-edit.persist="chores">
        <li>Fill the water bowl</li>
        <li>Buy kibble</li>
        <li>Book the groomer</li>
    </ul>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-3 w-full" x-data="{ sent: '', init() { this.$edit.onPublish = patches => this.sent = 'Published at ' + new Date().toLocaleTimeString() } }">
    <div class="row items-center gap-1">
        <button class="ghost sm" :disabled="!$edit.canUndo" @click="$edit.undo()" aria-label="Undo"><span x-icon="lucide:undo-2"></span></button>
        <button class="ghost sm" :disabled="!$edit.canRedo" @click="$edit.redo()" aria-label="Redo"><span x-icon="lucide:redo-2"></span></button>
        <button class="brand sm" @click="$edit.publish()">Publish</button>
        <span class="text-sm text-content-subtle" x-text="sent"></span>
    </div>
    <ul class="col gap-2 m-0 p-0 list-none" x-edit.persist="chores-demo">
        <li class="m-0 p-3 bg-surface-2 rounded">Fill the water bowl</li>
        <li class="m-0 p-3 bg-surface-2 rounded">Buy kibble</li>
        <li class="m-0 p-3 bg-surface-2 rounded">Book the groomer</li>
    </ul>
</div>
</template>
</div>
:::

</div>

The undo and redo buttons step through the whole page's history, so they also undo edits made in the other examples on this page. Publish sends the edits and clears the history; here they only go to a handler that shows the time, see [Publishing](#publishing).

### What a Reload Keeps

Edits live in memory, so a reload loses the ones not yet published. `.persist` keeps a region's unpublished edits, and their undo history, in this browser's `localStorage`, and replays them when the page loads again. Edit the list above, reload, and your changes are still there. A publish clears them.

It's opt-in because the saved edits belong to one browser on one device, are invisible to everyone else, and go stale if the source changes underneath them; on a shared computer the next person would see them too. Use it for an editor where people work across reloads before they publish.

`.persist` keeps text, order, nesting, sizes, attributes and classes, runtime locks, and a data list's order and record fields. Theme values are kept when `.persist` is on their control or their `.theme` scope. It doesn't keep closes, which are page state, or rows added, duplicated or deleted in a data list. The history is one for the whole document, so in a single-page app it carries across routes, and it's saved under every path the page has shown, capped at the latest 400 steps.

---

## Publishing

Edits are kept as a history of changes until you publish them. `$edit.patches()` turns that history into patches: the final state of each changed region, in terms of your source. Below, change something in any example on this page, then show the patches.

<div x-code-group>

```html copy
<div x-data="{ patches: '' }">
    <button @click="patches = JSON.stringify($edit.patches(), null, 2)">Show patches</button>
    <pre x-text="patches"></pre>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-3 w-full" x-data="{ patches: '' }">
    <button class="sm self-start" @click="patches = JSON.stringify($edit.patches(), null, 2) || '[]'">Show patches</button>
    <pre class="m-0 p-3 text-xs bg-surface-2 rounded max-h-64 overflow-auto" x-show="patches" x-text="patches"></pre>
</div>
</template>
</div>
:::

</div>

`$edit.publish()` sends them, and where they go depends on who the editor is for.

**Your own product.** Set `$edit.onPublish` to a function and publish hands it the patches. Send them wherever your product keeps its content: your API, a database row, or the pipeline that rebuilds a published site. Return the response, or a promise of it; unless it reports an error, the edits count as published and the history starts again from there.

```html copy
<div x-data="{
    init() {
        this.$edit.onPublish = patches => fetch('/api/pages/home', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patches)
        }).then(r => r.json());
    }
}"></div>
```

A response shaped `{ results: [...] }` in which any result has `status: 'error'` counts as failed, and the history is kept so nothing is lost.

**Your own project.** Run the local development server with editing switched on, edit the page in the browser, and publish: with no `onPublish` set, the patches go to the server, which writes them straight into your source files.

```bash copy
npx mnfst-run --edit
```

| Edited | Written to |
|---|---|
| Markup in a region | `index.html`, or the component's HTML file when the region is written in one |
| A data list's order and record fields | The CSV or JSON file the data source names in `manifest.json` (a JSON file must hold an array of records) |
| A component instance | The instance's attributes in `index.html`, or the component's HTML file in `main` scope |
| Theme values | The file named by the scope's `data-edit-theme-file`, otherwise `styles/core/manifest.theme.css` |

Each kind of edit writes only its own kind of file (HTML, CSS or data), inside the project, and never into a hidden folder such as `.git` or into `node_modules`. Theme values go only to `styles/core/manifest.theme.css`, a stylesheet `index.html` links, or a file named by `data-edit-theme-file`. A publish is all or nothing: if any patch can't be applied, no file is written and every result says why. Publishes run one at a time: a second waits for the first to finish, then builds on its result.

When the page loads, it reads from the server how each source file looks, and publishing needs that. If it couldn't be read, because the page isn't served by `mnfst-run --edit` or the server didn't answer, a publish is refused and the edits are kept.

In a single-page app, a region that isn't on screen keeps its edits: they wait in the history, show again when the region comes back, and publish then.

### Changed Source

A publish checks that the source still matches what the page loaded. The development server reloads an open page whenever an HTML file changes, so the page normally shows the source as it is now. While edits that `.persist` doesn't keep are waiting to be published, though, that reload is held back so they aren't lost: Edit warns in the console, adds the files to `$edit.stale` and fires `edit:stale`. Publish them with `rebase`, as below, and the page reloads itself afterwards.

If an HTML file the publish would rewrite has changed since the page loaded, the whole publish is refused, so a stale page can't overwrite newer work. Stylesheets and data files aren't checked this way, because their edits are written value by value: a CSS or data file saved in your code editor while the page is open doesn't block a publish.

A refused publish keeps the history, lists the changed files in `$edit.stale`, and fires `edit:stale` on the document with `detail.files`. Either reload, to start again from the new source, or call `$edit.publish({ rebase: true })` to take the source as it is now and write the edits over it, each into the element it belongs to. After a rebase that wrote over changes, the page reloads itself shortly afterwards to show the result, and until it has, a plain publish is refused as stale.

```html copy
<div x-data @edit:stale.document="console.warn('Changed since this page loaded:', $event.detail.files)">
    <p x-show="$edit.stale.length">
        <span x-text="$edit.stale.join(', ')"></span> changed since this page loaded.
        <button @click="$edit.publish({ rebase: true })">Publish over it</button>
        <button @click="location.reload()">Reload</button>
    </p>
</div>
```

The page also remembers each element it shows as it was when it loaded: its tag, its attributes and its own text. A publish that edits an element changed in the meantime is refused with *reload to continue*, rebase or not, because its edit could land on the wrong thing. The same goes for identical elements, such as two `<li>Walk</li>`, when any of them moved or changed: the page can no longer tell which one you edited. Changes elsewhere in the file, outside the elements you edited, don't get in the way of a rebase.

Edits kept from before, by `.persist` or by a region coming back on screen, can find their element changed or gone from the source. Those edits can't be shown or published, so they're dropped from the history and reported: `$edit.conflicts` lists them, `edit:conflict` fires on the document with `detail.conflicts`, and Edit warns in the console. Each entry names its `region`, the element's `key` and its tag and text as `element`, and the `prop` and `value` the edit set. If a container whose pieces you moved no longer holds what it held, every move in that region is dropped, reported once as `{ region, prop: 'structure' }`.

The server only accepts edits from pages it serves on your machine, and its editing endpoints don't exist without `--edit`.

---

## Theme Controls

`x-edit.cssvar` binds an input to a CSS variable, so a control panel can restyle the page live. A bare variable name writes it on `:root`, for the whole page. A name with a `scope:` prefix writes it on the element that declares that scope with `x-edit.theme`, so it applies only inside that element. `data-unit` adds a unit to a number or range input's value.

<div x-code-group>

```html copy
<div x-edit.theme="card" style="--color-brand-surface: #7c3aed; --color-brand-inverse: #ffffff; --radius: 0.5rem">
    <button class="brand">Adopt me</button>
</div>

<label>Brand <input type="color" x-edit.cssvar="card:--color-brand-surface"></label>
<label>Radius <input type="range" min="0" max="2" step="0.125" data-unit="rem" x-edit.cssvar="card:--radius"></label>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-4 w-full">
    <div class="p-4 bg-surface-2 rounded" x-edit.theme="card-demo" style="--color-brand-surface: #7c3aed; --color-brand-inverse: #ffffff; --radius: 0.5rem">
        <button class="brand">Adopt me</button>
    </div>
    <div class="row-wrap items-center gap-6">
        <label class="row items-center gap-2">Brand <input type="color" x-edit.cssvar="card-demo:--color-brand-surface"></label>
        <label class="row items-center gap-2 grow">Radius <input type="range" min="0" max="2" step="0.125" data-unit="rem" x-edit.cssvar="card-demo:--radius"></label>
    </div>
</div>
</template>
</div>
:::

</div>

The variable changes live as the input moves, and is recorded as a step of the history when the input commits its value: when you let go of a slider or close the colour picker, and at each arrow-key step on a focused slider. Undo puts the previous value back. `.theme` on its own only declares a scope and makes nothing editable, so it can wrap regions safely. When published, a scoped value is written to the file named by `data-edit-theme-file` on the scope element, and anything else to `styles/core/manifest.theme.css`; see [Publishing](#publishing). `.persist` on the control, or on its scope element, keeps unpublished values across a reload.

---

## Reference

### Modifiers

| Modifier | On | Effect |
|---|---|---|
| *(none)* | A region | Text and move |
| `.text` | A region | Text can be rewritten in place |
| `.move` | A region | Pieces can be moved: reordered, nested, un-nested, between regions |
| `.size` | An element | Resize handles on its edges and corners |
| `.data` | A region with an `x-for` list | Record fields shown with `x-text` or `x-html`, in a row or as the row itself, can be edited |
| `.gated` | A region | Off until `$edit.on()` |
| `.persist` | A region, a `.cssvar` control or a `.theme` scope | Unpublished edits survive a reload in this browser |
| `.bare` | A region | No editing visuals; everything else works |
| `.lock` | An element in a region | No edits to it or anything inside it |
| `.lock.move` `.lock.remove` `.lock.duplicate` `.lock.text` `.lock.attrs` `.lock.size` | An element in a region | Blocks one action; combine as needed |
| `.theme` | Any element | Declares a scope for `.cssvar`, named by its value |
| `.cssvar` | An input | Binds the input to `--var` or `scope:--var` |

### $edit

| Member | Description |
|---|---|
| `active`, `on()`, `off()`, `toggle()` | Whether `.gated` regions are on; switch them |
| `undo()`, `redo()` | Step through the history |
| `canUndo`, `canRedo` | Whether there's a step to undo or redo |
| `version` | A number that changes with every edit and target change; read it to make a binding re-evaluate |
| `target` | The piece last right-clicked; assignable |
| `can(action, el)` | Whether an action applies: `move`, `remove`, `duplicate`, `text`, `attrs`, `class`, `size`, `copy`, `cut`, `paste` |
| `copy(el)`, `cut(el)`, `paste(el)`, `duplicate(el)`, `remove(el)` | Block actions; `paste` lands after `el` |
| `move(el, dest, before)` | Move a piece into `dest`, a container element or a region's key, before `before` or at the end |
| `nest(el)`, `unnest(el)` | Move a piece into the container before it, or out one level |
| `lock(el, action)`, `unlock(el, action)` | Lock or unlock one action, or every action without one; recorded in the history |
| `block(node)` | The piece holding a node, or `null` |
| `attr(name, value, el)` | Set an attribute: a string sets it, `true` sets it empty, `null` or `false` removes it |
| `classes.add(cls, el)`, `.remove()`, `.toggle(cls, el, force)`, `.set(value, el)`, `.has()`, `.list(el)` | Change and read an element's classes; classes from a `:class` binding are left to it |
| `scope(value, el)` | A component region's scope: read it, or set `'instance'` or `'main'` |
| `revert(el)` | Drop a component instance's edits to one element, or to all of them when `el` is the region |
| `patches()` | The patches a publish would send |
| `publish(options)` | Send the patches, after any publish still running; resolves with the response. `{ rebase: true }` writes over source that changed since the page loaded |
| `stale` | Files changed since the page loaded: from a refused publish, or a reload held back to keep unpublished edits |
| `conflicts` | Edits dropped because their element changed in the source: `{ region, key, element, prop, value, before }` each |
| `onPublish` | A function that receives the patches instead of the development server |
| `export()` | The raw history, `{ log, cursor }` |

Methods that take `el` use `$edit.target` when it's left out, and return `true` when they made a change or `false` when they didn't apply.

### Events

| Event | Fires on | `detail` |
|---|---|---|
| `edit:size` | The resized element, throughout a resize and once when it's recorded | `width`, `height` (pixels), `css` (`{ width, height }` as written), `done` |
| `edit:stale` | `document`, when a publish is refused because source files changed, or a reload is held back | `files` |
| `edit:conflict` | `document`, when edits are dropped because their element changed in the source | `conflicts`, as in `$edit.conflicts` |

### Attributes

| Attribute | On | Purpose |
|---|---|---|
| `data-edit-hotkeys="off"` | A region or any element above it | Turns off the undo and redo shortcuts there |
| `data-edit-theme-file` | A `.theme` scope element | The CSS file its values are published to |
| `data-unit` | A `.cssvar` input | A unit added to the input's value |
| `data-key` | A row of a data list | The record's `id`, when the `x-for` has no `:key` |

---

## Styles

Every editing visual is drawn by CSS on the elements being edited, keyed off `data-edit-*` attributes the plugin sets, and wrapped in `:where()` so your own rules win without a fight. No box is ever drawn around a region: a page being edited still looks like the page. `.bare` turns all of it off.

### Accent

`--edit-accent` colours every visual at once. Set it on a region to recolour that region, its grip included, or on `:root` for everything.

<div x-code-group>

```html copy
<ul x-edit="treats" style="--edit-accent: #db2777">
    <li>Peanut butter biscuits</li>
    <li>Carrot sticks</li>
</ul>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<ul class="col gap-2 m-0 p-0 list-none w-full" x-edit="treats-demo" style="--edit-accent: #db2777">
    <li class="m-0 p-3 bg-surface-2 rounded">Peanut butter biscuits</li>
    <li class="m-0 p-3 bg-surface-2 rounded">Carrot sticks</li>
</ul>
</template>
</div>
:::

</div>

### Hover and Focus

A piece shows a thin outline on hover and a solid one when focused. Text shows its own outline while you edit it.

<div x-code-group>

```html copy
<style>
    .chunky [data-edit-piece]:hover {
        outline: 2px dashed currentColor;
        outline-offset: 6px;
    }
</style>

<ul x-edit.move="beds" class="chunky">
    <li>Basket</li>
    <li>Cushion</li>
</ul>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="w-full">
    <style>
        .chunky [data-edit-piece]:hover {
            outline: 2px dashed currentColor;
            outline-offset: 6px;
        }
    </style>
    <ul class="col gap-3 m-0 p-0 list-none chunky" x-edit.move="beds-demo">
        <li class="m-0 p-3 bg-surface-2 rounded">Basket</li>
        <li class="m-0 p-3 bg-surface-2 rounded">Cushion</li>
    </ul>
</div>
</template>
</div>
:::

</div>

### Grip

The grip that drags a piece of text is one element at the end of `<body>`, shown beside whichever piece you hover or focus. It takes `--edit-accent`, `--edit-grip-size` and `--edit-grip-offset` from that piece, so set them on the region as you would any other variable.

<div x-code-group>

```html copy
<div x-edit="notes" style="--edit-accent: #db2777; --edit-grip-size: 1.25rem; --edit-grip-offset: 0.5rem">
    <p>Hover me, then drag the dotted grip.</p>
    <p>Or drag me instead.</p>
</div>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-2 ps-6 w-full" x-edit="notes-demo" style="--edit-accent: #db2777; --edit-grip-size: 1.25rem; --edit-grip-offset: 0.5rem">
    <p class="m-0">Hover me, then drag the dotted grip.</p>
    <p class="m-0">Or drag me instead.</p>
</div>
</template>
</div>
:::

</div>

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

### Resize Handles

Each handle is a `<span data-edit-handle>` inside the element, valued by its edge. Its grab area is transparent and its visible line is its `::before`.

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

### Variables

| Variable | Default | Sets |
|---|---|---|
| `--edit-accent` | `--color-brand-content` | Colour of every editing visual |
| `--edit-ghost-opacity` | `0.4` | Opacity of the stand-in during a drag |
| `--edit-grip-size` | `0.75rem` | Width of the grip; its height is 1.5 times this |
| `--edit-grip-offset` | `0.25rem` | Gap between the grip and its text |
| `--edit-drop-reach` | `48px` | How far outside another region a drop still lands in it |
| `--edit-size` | `both` | Resize axes: `both`, `x`, `y`, `none` |
| `--edit-size-edges` | every edge and corner of those axes | Which handles to draw |
| `--edit-size-handle` | `1rem` | Grab area of each handle |
| `--edit-size-snap`, `-x`, `-y` | none | Snap points |
| `--edit-size-snap-distance`, `-x`, `-y` | none, always the nearest point | How close an edge must come to snap |
| `--edit-size-close`, `-x`, `-y` | none | Below this, an `x-show` element closes |

### Attributes

| Attribute | Set on |
|---|---|
| `data-edit-area` | Every region; `bare` on a `.bare` one |
| `data-edit-piece` | Every piece that can be moved |
| `data-edit-text` | Page text being edited with Rich Text |
| `data-edit-grip` | The grip for dragging text |
| `data-edit-dragging` | The piece being dragged; `keyboard` when picked up by keyboard |
| `data-edit-ghost` | The stand-in holding a dragged piece's place |
| `data-edit-drop-target` | Other regions a dragged piece can land in |
| `data-edit-handle` | A resize handle, valued by its edge |
| `data-edit-key` | Source elements in a region, naming them for publishing; never set or change it |

---

## Related

- [Rich Text](/docs/framework/core-plugins/rich-text) edits a field's text with formatting, and powers page text here.
- [Dropdowns](/docs/framework/elements/dropdowns#context-menu) build the right-click menus.
