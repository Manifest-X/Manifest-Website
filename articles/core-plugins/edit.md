# Edit

Turn a live page into its own editor.

---

## Overview

`x-edit` marks a region of the page as editable. Inside it, text can be rewritten in place, elements can be dragged to new spots, and elements you mark can be resized by their edges. Every change joins one undo history, and publishing writes the changes back to your source files or hands them to your own backend.

<div x-code-group>

```html copy
<section x-edit="poochie">
    <h2>Meet Poochie</h2>
    <div class="grid grid-cols-3 gap-3">
        <article>
            <h3>Loves pasta</h3>
            <p>And ice cream, whenever she can get it.</p>
        </article>
        <article>
            <h3>Always quiet</h3>
            <p>Never barks at the mail carrier.</p>
        </article>
        <article>
            <h3>Well trained</h3>
            <p>Knows sit, stay, and the way to the door.</p>
        </article>
    </div>
    <figure x-edit.size="poochie-photo" style="width: 14rem; height: 9rem; min-width: 8rem; max-width: 100%">
        <img src="/assets/examples/poochie.webp" alt="Poochie the dog">
    </figure>
</section>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<section class="col gap-4 w-full" x-edit="poochie-demo">
    <h2 class="m-0">Meet Poochie</h2>
    <div class="grid grid-cols-3 gap-3">
        <article class="col gap-1 p-4 bg-surface-2 rounded">
            <h3 class="m-0 text-lg">Loves pasta</h3>
            <p class="m-0 text-sm">And ice cream, whenever she can get it.</p>
        </article>
        <article class="col gap-1 p-4 bg-surface-2 rounded">
            <h3 class="m-0 text-lg">Always quiet</h3>
            <p class="m-0 text-sm">Never barks at the mail carrier.</p>
        </article>
        <article class="col gap-1 p-4 bg-surface-2 rounded">
            <h3 class="m-0 text-lg">Well trained</h3>
            <p class="m-0 text-sm">Knows sit, stay, and the way to the door.</p>
        </article>
    </div>
    <figure class="m-0" x-edit.size="poochie-photo-demo" style="width: 14rem; height: 9rem; min-width: 8rem; max-width: 100%">
        <img class="w-full h-full object-cover rounded m-0" src="/assets/examples/poochie.webp" alt="Poochie the dog">
    </figure>
</section>
</template>
</div>
:::

</div>

Click a heading and type a new one. Drag a card from anywhere on it to put it somewhere else, or drag the photo's edges and corners to resize it. **Cmd/Ctrl + Z** undoes each change and **Shift + Cmd/Ctrl + Z** redoes it.

---

## Setup

Edit is opt-in and never part of the default Manifest bundle, so visitors don't download editor code. The `+` prefix keeps the default plugins and adds it; the selective tab loads Edit without the other default plugins. Edit has no script of its own to link: it needs the Manifest loader, which brings in Alpine and [Rich Text](/docs/framework/core-plugins/rich-text) with it. Either way, Rich Text loads automatically, because page text is edited with it.

<div x-code-group copy>

```html "All Plugins + Edit"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="+edit" data-tailwind></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="edit" data-tailwind></script>
```

</div>

The examples on this page also use Tailwind utility classes, such as `grid-cols-3`, `h-48`, and `[&>*]:absolute`, which need the `data-tailwind` attribute shown here; see [Setup](/docs/framework/getting-started/setup). Without it, copy the markup and style it your own way.

To load it only for signed-in editors, leave it out of `data-plugins` and call `Manifest.loadPlugin('edit')`{copy} once you know the visitor can edit. The regions already on the page become editable when it loads, except those marked [`.gated`](#regions), which stay switched off until `$edit.on()`. Until then, `$edit` is an idle stand-in, so bindings such as `:disabled="!$edit.canUndo"` work before Edit loads and pick up the real state once it has; anything assigned to it in the meantime, such as `onPublish`, is kept and carries over to Edit when it loads.

Editor styles are included in Manifest CSS, or as standalone stylesheets for Edit and Rich Text. Both reference [theme](/docs/framework/styles/theme) variables, such as the brand colours the editing visuals and examples use. Link your project's own `manifest.theme.css`, which can be <a target="_blank" href="https://github.com/Manifest-X/Manifest/tree/master/lib/manifest.theme.css">downloaded from GitHub</a> for local modification, as in [Setup](/docs/framework/getting-started/setup#styles).

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
<link rel="stylesheet" href="/manifest.theme.css">
```

```html "Standalone"
<link rel="stylesheet" href="/manifest.theme.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.edit.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.rich.text.css">
```

</div>

---

## Regions

A region is an element marked with `x-edit`, together with everything inside it. Its value is a key that names the region's edits, so a publish knows where in your source they belong. Keep the key stable and unique on the page: renaming it strands edits already made under the old name, and a key that appears on the page more than once, from two regions sharing it or a component used several times, isn't editable anywhere (Edit warns in the console), because a publish couldn't tell which one is meant.

A piece is any element directly inside the region, or inside a container in it, that can be picked up and moved. Modifiers say what a region allows. With no capability named, a region allows text and move; naming one or more replaces that default, so `x-edit.move` allows moving only.

| Write | Means |
|---|---|
| `x-edit="key"` | This region can be edited: its text, and its pieces moved |
| `.text` | Its text can be rewritten in place |
| `.move` | Its pieces can be dragged to new places; see [Move](/docs/framework/core-plugins/move) |
| `.size` | This element can be resized by its edges; see [Resize](/docs/framework/core-plugins/resize) |
| `.data` | Fields of the records in its `x-for` list can be edited |
| `.gated` | Editing stays off until `$edit.on()` |
| `.persist` | Unpublished edits survive a reload in this browser |
| `.bare` | Editable, but draws none of the editing visuals |
| `.theme`, `.cssvar` | [Theme controls](#theme-controls) |

A region inside another region sets its own capabilities for what it holds, and is itself a piece of the outer one. That's how the photo above can be resized while its section moves.

What a region holds decides where its edits go when published:

- **Markup** you wrote, in the page or in a component's HTML file: text, order, nesting, sizes, and attributes are written back into that markup. A component's root element is the exception: its own attributes and classes come partly from where the component is used, so they aren't editable.
- **A list from data**, an `x-for` directly inside the region: moving reorders the array and `.data` edits record fields, see [In a List or Grid](/docs/framework/core-plugins/move#in-a-list-or-grid).
- **A component**, such as `<x-card>`, among other content: it's one piece, moved as a whole. Like any piece, it drags, steps with Alt + arrows, nests, locks, duplicates into a new instance, and deletes. It can also move into another region, in this file or another, but it can't be copied or cut. Its own markup isn't edited from here. A region written inside the component's file is edited there, in its own right; duplicating such a component puts that region on the page twice, so it stops being editable.
- **Exactly one component** and nothing else, with no region of its own: its text and classes can be edited, and with `.size` the region resized, as overrides for this instance. `$edit.scope('main')` makes edits apply to the component itself, and so to every instance, and `$edit.revert()` drops an instance's own edits.

### Lock

`x-edit.lock` on an element inside a region keeps it and everything inside it from being edited. Add an action to block only that one: `.lock.move`, `.lock.remove`, `.lock.duplicate`, `.lock.text`, `.lock.attrs` (attributes and classes), or `.lock.size`. Actions can be combined, as in `.lock.move.remove`.

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

Page text is edited with [Rich Text](/docs/framework/core-plugins/rich-text), Manifest's text editing plugin. Edit loads it automatically, so there's nothing to add: each piece of text in a region becomes an inline Rich Text field. That's why Rich Text's shortcuts and controls work on page text, as below, while headings, lists, and other blocks stay out of it, so a heading stays one heading.

The first click on a piece of text selects all of it, so replacing a line is one click and typing; click again to place the caret. **Enter** starts a new line inside the same element, and **Escape** leaves the text. The change is recorded when the text loses focus, as one step of the history. A press on text that moves before you let go drags the piece instead; see [Move](/docs/framework/core-plugins/move). While you're typing in a piece, dragging across its text selects words as usual.

To format it, use **Cmd/Ctrl + B**, **I**, and **U** for bold, italic, and underline, or any [Rich Text button](/docs/framework/core-plugins/rich-text-controls#buttons) for inline formatting. The buttons don't take focus, so they act on whichever text you're in.

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

Text that holds only plain formatting, such as bold, italics, links, and line breaks, is one piece: the paragraph above is edited as a whole, with its bold words inside. HTML comments inside the text are kept as written. An element inside the text with its own class or Alpine directive is left as a separate piece instead, so its styling and bindings survive.

Clicking a link in page text, with the middle button too, or pressing Enter on it, never follows it while its region is editable, so you can edit it without leaving the page; links inside an element marked `contenteditable="false"` still work. Links follow HTML's rule that a link can't hold another link: text that is itself a link or a button takes no links, and linking part of an existing link splits it, so the rest keeps its own address.

To allow headings, lists, and other blocks in part of a region, put [`x-rich-text`](/docs/framework/core-plugins/rich-text) on that element, with no value of its own. It becomes a full Rich Text field, and Edit records the markup it produces as an ordinary text edit.

```html copy
<article x-edit="post">
    <h2>A title, edited in place</h2>
    <div x-rich-text.html class="unstyle">
        <p>A body that can hold <strong>headings</strong>, lists and quotes.</p>
    </div>
</article>
```

Some text can't be edited because it isn't written in the page: anything rendered by `x-text`, `x-html`, `x-markdown`, `x-icon`, or another directive that produces its own content, and the rows an `x-for` or `x-if` renders, unless the region is a [data list](/docs/framework/core-plugins/move#in-a-list-or-grid). The contents of `<script>`, `<style>`, `<textarea>`, and `<title>` are never editable.

Such an element is still a piece, and its own attributes and classes can be changed: an icon's size and colour are classes, and a `<textarea>`'s `placeholder` is an attribute. Change them from your own controls with [`$edit.classes`](#edit) and [`$edit.attr()`](#edit), which record them in the history and publish them like any other edit.

::: brand icon="lucide:info"
Edit's `.text` means *text can be edited*. Alpine's `x-text` is the opposite case: text rendered from an expression, which Edit leaves alone.
:::

---

## Blocks

A block is a piece the person editing acts on as a whole: copy, cut, paste, duplicate, or delete it. With a piece focused, and not while typing in it, **Cmd/Ctrl + C**, **X**, **V**, and **D** copy, cut, paste, and duplicate it, and **Delete** or **Backspace** deletes it. A paste lands after the focused piece.

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

`$edit.can()` answers for `move`, `remove`, `duplicate`, `text`, `attrs`, `class`, `size`, `copy`, `cut`, and `paste`, taking the region's capabilities and every lock into account. A component piece answers `false` for `copy` and `cut`. Other actions for menus and panels are in the [reference](#reference): `$edit.move()`, `nest()`, and `unnest()` move a piece by script, and `$edit.attr()` and `$edit.classes` change attributes and classes as recorded edits.

::: brand icon="lucide:info"
In [Rich Text](/docs/framework/core-plugins/rich-text), *block* means a paragraph-level tag such as a heading or a list. Here it means any piece of the page.
:::

---

## History

Every edit on the page joins one history, shared by every region, in the order the edits were made. **Cmd/Ctrl + Z** undoes the last one and **Shift + Cmd/Ctrl + Z** (or **Ctrl + Y**) redoes it, wherever you are on the page, except in form fields and in elements with their own `x-rich-text`, which keep their own undo. While you're in a piece of text, the shortcuts first step through what you've done in it since you clicked in, typing burst by typing burst, then through the page's history. Put `data-edit-hotkeys="off"` on a region, or on any element above it such as `<html>`, to leave the shortcuts to your own code.

The browser's own undo can't do this: it only knows about typing in one field at a time, not about pieces moving, nesting, resizing, or closing. Edit replaces it with one history of its own, so moves, nesting, resizes, closes, locks, and text edits all step back in the order they were made.

There's no built-in toolbar. Build your own from buttons that call `$edit.undo()`, `$edit.redo()`, and `$edit.publish()`, and bind them to `$edit.canUndo` and `$edit.canRedo` so they disable themselves when there's nothing to step to.

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

The undo and redo buttons step through the whole page's history, so they also undo edits made in the other examples on this page. Publish sends the edits and clears the history; here they only go to a handler that shows the time, see [Publishing](/docs/framework/core-plugins/edit-publishing).

### What a Reload Keeps

Edits live in memory, so a reload loses the ones not yet published. `.persist` keeps a region's unpublished edits, and their undo history, in this browser's `localStorage`, and replays them when the page loads again. Edit the list above, reload, and your changes are still there. A publish clears them.

It's opt-in because the saved edits belong to one browser on one device, are invisible to everyone else, and go stale if the source changes underneath them; on a shared computer the next person would see them too. Use it for an editor where people work across reloads before they publish.

`.persist` keeps text, order, nesting, sizes, attributes and classes, runtime locks, and a data list's order and record fields. Theme values are kept when `.persist` is on their control or their `.theme` scope. It doesn't keep closes, which are page state, or rows added, duplicated, or deleted in a data list. The history is one for the whole document, so in a single-page app it carries across routes, and it's saved under every path the page has shown, capped at the latest 400 steps.

---

## Theme Controls

`x-edit.cssvar` binds an input to a CSS variable, so a control panel can restyle the page live. A bare variable name writes it on `:root`, for the whole page. A name with a `scope:` prefix writes it on the element that declares that scope with `x-edit.theme`, so it applies only inside that element. `data-unit` adds a unit to a number or range input's value.

<div x-code-group>

```html copy
<div x-edit.theme="card" style="--color-brand-surface: #7c3aed; --color-brand-inverse: #ffffff; --radius: 0.5rem">
    <button class="brand">Give Poochie a treat</button>
</div>

<label>Brand <input type="color" x-edit.cssvar="card:--color-brand-surface"></label>
<label>Radius <input type="range" min="0" max="2" step="0.125" data-unit="rem" x-edit.cssvar="card:--radius"></label>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-4 w-full">
    <div class="p-4 bg-surface-2 rounded" x-edit.theme="card-demo" style="--color-brand-surface: #7c3aed; --color-brand-inverse: #ffffff; --radius: 0.5rem">
        <button class="brand">Give Poochie a treat</button>
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

The variable changes live as the input moves, and is recorded as a step of the history when the input commits its value: when you let go of a slider or close the colour picker, and at each arrow-key step on a focused slider. Undo puts the previous value back. `.theme` on its own only declares a scope and makes nothing editable, so it can wrap regions safely. When published, a global value is written to the `manifest.theme.css` that `index.html` links, or `styles/core/manifest.theme.css` if none is. A scoped value is written into the scope element's own `style` attribute, never into a stylesheet, so it never reaches `:root`; a scope element inside content another plugin generates has no file to write to, so its values are refused by name. Publishing global values needs the project's own `manifest.theme.css`, linked from `index.html`. See [Publishing](/docs/framework/core-plugins/edit-publishing). `.persist` on the control, or on its scope element, keeps unpublished values across a reload.

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
| `.persist` | A region, a `.cssvar` control, or a `.theme` scope | Unpublished edits survive a reload in this browser |
| `.bare` | A region | No editing visuals; everything else works |
| `.lock` | An element in a region | No edits to it or anything inside it |
| `.lock.move` `.lock.remove` `.lock.duplicate` `.lock.text` `.lock.attrs` `.lock.size` | An element in a region | Blocks one action; combine as needed |
| `.grab` | An element inside a piece | Makes it the piece's handle: the piece drags only from it. See [Grab Handles](/docs/framework/core-plugins/move#grab-handles) |
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
| `lock(el, action)`, `unlock(el, action)` | Lock or unlock one action, or every action without one, a component piece included; recorded in the history |
| `block(node)` | The piece holding a node, or `null`; a component is one piece |
| `attr(name, value, el)` | Set an attribute: a string sets it, `true` sets it empty, `null` or `false` removes it |
| `classes.add(cls, el)`, `.remove()`, `.toggle(cls, el, force)`, `.set(value, el)`, `.has()`, `.list(el)` | Change and read an element's classes; classes from a `:class` binding are left to it |
| `scope(el)`, `scope(value, el)` | For a region wrapping exactly one component: `scope(el)` reads the scope of `el`'s region, `'instance'` or `'main'`; `scope(value, el)` sets it |
| `revert(el)` | Drop a component instance's edits to one element, or to all of them when `el` is the region |
| `patches()` | The patches a publish would send |
| `publish(options)` | Send the patches, after any publish still running; resolves with the response. `{ rebase: true }` writes over source that changed since the page loaded |
| `stale` | Files changed since the page loaded: from a refused publish, or a reload held back to keep unpublished edits |
| `conflicts` | Edits dropped because the source changed under them: `{ region, key, element, prop, value, before, reason }` each |
| `clearConflicts()` | Empty `conflicts`; for `.persist` regions they're kept across reloads until this is called |
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
| `data-unit` | A `.cssvar` input | A unit added to the input's value |
| `:data-key` | A row of a data list | The record's `id`, bound as in `:data-key="walk.id"`, when the `x-for` has no `:key` |
---

## Styles

Every editing visual is drawn by CSS on the elements being edited, keyed off `data-edit-*` attributes the plugin sets, and wrapped in `:where()` so your own rules win without a fight. No box is ever drawn around a region: a page being edited still looks like the page. `.bare` turns all of it off.

### Accent

`--edit-accent` colours every visual at once. Set it on a region to recolour that region, or on `:root` for everything.

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

A piece shows a thin outline on hover and a solid one when focused. Text shows its own outline while you edit it, and a text cursor over it, while the rest of a piece shows a grab cursor.

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

### Variables

| Variable | Default | Sets |
|---|---|---|
| `--edit-accent` | `--color-brand-content` | Colour of every editing visual |
| `--edit-ghost-opacity` | `0.4` | Opacity of the stand-in during a drag |
| `--edit-drop-reach` | `48px` | How far outside another region a drop still lands in it |
| `--edit-size` | `both` | Resize axes: `both`, `x`, `y`, `none`; see [Resize](/docs/framework/core-plugins/resize) |
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
| `data-edit-grabbable` | A piece with its own `x-edit.grab` handle |
| `data-edit-text` | Page text being edited with Rich Text |
| `data-edit-dragging` | The piece being dragged; `keyboard` when picked up by keyboard |
| `data-edit-ghost` | The stand-in holding a dragged piece's place |
| `data-edit-drop-target` | Other regions a dragged piece can land in |
| `data-edit-handle` | A resize handle, valued by its edge |
| `data-edit-resizing` | The handle being dragged |
| `data-edit-snapped` | The element being resized, and its handle, while an edge sits on a snap point |
| `data-edit-key` | Source elements in a region, naming them for publishing; never set or change it |
---

## Related

- [Move](/docs/framework/core-plugins/move) drags pieces within and between regions.
- [Resize](/docs/framework/core-plugins/resize) adds edge handles, snap points, and closing.
- [Publishing](/docs/framework/core-plugins/edit-publishing) sends the edits to your backend or writes them into your source files.
- [Rich Text](/docs/framework/core-plugins/rich-text) edits a field's text with formatting, and powers page text here.
- [Dropdowns](/docs/framework/elements/dropdowns#context-menu) build the right-click menus.
