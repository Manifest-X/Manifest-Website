# Text Edit

A rich text editor built from your own markup, storing markdown.

---

## Overview

`x-text-edit` has two roles. Alone, it makes an element an editable area bound to a value. With a command modifier, it makes any element a control for that area. It adds no toolbar of its own.

<div x-code-group>

```html copy
<div x-data="{ post: '# Hello\n\nSelect a word, then press **Bold**.' }">
    <button x-text-edit.strong>Bold</button>
    <button x-text-edit.em>Italic</button>
    <button x-text-edit.h2>Heading</button>
    <button x-text-edit.ul>List</button>

    <div x-text-edit="post" aria-label="Post"></div>
    <pre x-text="post"></pre>
</div>
```

::: frame
<div x-data="{ post: '# Hello\n\nSelect a word, then press **Bold**.' }" class="col gap-2 w-full">
    <div class="row-wrap gap-1">
        <button class="ghost sm" x-text-edit.strong>Bold</button>
        <button class="ghost sm" x-text-edit.em>Italic</button>
        <button class="ghost sm" x-text-edit.h2>Heading</button>
        <button class="ghost sm" x-text-edit.ul>List</button>
    </div>
    <div x-text-edit="post" aria-label="Post"></div>
    <pre class="text-xs p-2 bg-surface-2 rounded whitespace-pre-wrap" x-text="post"></pre>
</div>
:::

</div>

---

## Setup

Text Edit is included in `manifest.js` with all core plugins, or can be selectively loaded.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="text-edit"></script>
```

</div>

Editor styles are included in Manifest CSS or as a standalone stylesheet.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.text.edit.css">
```

</div>

---

## Editable Area

Point `x-text-edit`{copy} at a value. The element becomes editable in place. `placeholder` shows while it is empty. [Markdown](/docs/core-plugins/markdown) renders the value straight back.

<div x-code-group>

```html copy
<div x-data="{ note: 'A **markdown** note.' }">
    <div x-text-edit="note" placeholder="Write a note…" aria-label="Note"></div>
    <div x-markdown="note"></div>
</div>
```

::: frame
<div x-data="{ note: 'A **markdown** note.' }" class="col gap-2 w-full">
    <div x-text-edit="note" placeholder="Write a note…" aria-label="Note" style="--text-edit-min-height: 4rem"></div>
    <div x-markdown="note" class="p-2 border border-line rounded"></div>
</div>
:::

</div>

| Modifier | Effect |
|---|---|
| *(none)* | Stores markdown |
| `.html` | Stores sanitized HTML; every command available |
| `.plain` | Stores text; no commands |
| `.minimal` | Inline marks only |
| `.literal` | No typed-markdown shortcuts |
| `.autofocus` | Focus on load |

Without a value, the element's existing markup is the initial content. Do not combine with `x-html`.

---

## Commands

Commands are named for the tag they produce. A `<button>` runs on click and never takes the caret. A `<select>` or `<input>` runs on change and reflects the state at the caret. An argument is the next modifier or an expression: `.align.center`, `.img="url"`.

<div x-code-group>

```html copy
<div x-data="{ doc: '<p>Select a word, then pick a command.</p>' }">
    <select x-text-edit.block>
        <option value="p">Paragraph</option>
        <option value="h2">Heading</option>
        <option value="blockquote">Quote</option>
    </select>
    <button x-text-edit.strong>Bold</button>
    <button x-text-edit.code>Code</button>
    <button x-text-edit.align.center>Center</button>
    <input type="color" x-text-edit.color aria-label="Colour">
    <button x-text-edit.undo>Undo</button>

    <div x-text-edit.html="doc" aria-label="Document"></div>
</div>
```

::: frame
<div x-data="{ doc: '<p>Select a word, then pick a command.</p>' }" class="col gap-2 w-full">
    <div class="row-wrap gap-1 items-center">
        <select class="sm hug" x-text-edit.block aria-label="Block">
            <option value="p">Paragraph</option>
            <option value="h2">Heading</option>
            <option value="blockquote">Quote</option>
        </select>
        <button class="ghost sm" x-text-edit.strong>Bold</button>
        <button class="ghost sm" x-text-edit.code>Code</button>
        <button class="ghost sm" x-text-edit.align.center>Center</button>
        <input type="color" class="unstyle w-6 h-6 rounded border border-line" x-text-edit.color aria-label="Colour">
        <button class="ghost sm" x-text-edit.undo>Undo</button>
    </div>
    <div x-text-edit.html="doc" aria-label="Document" style="--text-edit-min-height: 5rem"></div>
</div>
:::

</div>

| Group | Commands |
|---|---|
| Inline | `strong` `b` `em` `i` `s` `del` `code` and, in `.html`, `u` `mark` `small` `sub` `sup` `kbd` `samp` `var` `abbr` `cite` `q` `ins` `dfn` `time` `span` |
| Block | `p` `h1`–`h6` `blockquote` `pre` `block` and, in `.html`, `address` `figure` `figcaption` `dl` `dt` `dd` |
| Lists, inserts | `ul` `ol` `checklist` `indent` `outdent` `hr` `br` `img` `a` |
| Style (`.html`) | `align` `color` `background` `font` `size` `leading` |
| Table (`.html`) | `table` `row-before` `row-after` `row-remove` `column-before` `column-after` `column-remove` `merge` `split` `table-header` `table-remove` |
| Other | `clear` `undo` `redo` |

A command markdown cannot store is disabled in markdown mode. A disabled control gets `aria-disabled="true"`, never `disabled`. An inline command with nothing selected arms for the next text typed.

---

## Links

One `<input>` defines, edits and clears a link. Select text and enter a URL to link it; the field shows the `href` at the caret; empty it to unlink.

<div x-code-group>

```html copy
<div x-data="{ post: 'Visit [Manifest](https://manifestx.dev) today.' }">
    <input type="url" x-text-edit.a placeholder="https://" aria-label="Link">
    <div x-text-edit="post" aria-label="Post"></div>
</div>
```

::: frame
<div x-data="{ post: 'Visit [Manifest](https://manifestx.dev) today.' }" class="col gap-2 w-full">
    <input type="url" class="sm" x-text-edit.a placeholder="https://" aria-label="Link">
    <div x-text-edit="post" aria-label="Post" style="--text-edit-min-height: 4rem"></div>
</div>
:::

</div>

---

## Typing Markdown

A line converts when you press Enter. Block rules apply at the start of a line; `.literal` turns conversion off.

<div x-code-group>

```html copy
<div x-data="{ draft: '' }">
    <div x-text-edit="draft" placeholder="Type ## Title and press Enter" aria-label="Draft"></div>
</div>
```

::: frame
<div x-data="{ draft: '' }" class="w-full">
    <div x-text-edit="draft" placeholder="Type ## Title and press Enter" aria-label="Draft" style="--text-edit-min-height: 5rem"></div>
</div>
:::

</div>

| Type | Get |
|---|---|
| `# ` … `###### ` | Heading |
| `- ` `* ` `+ ` / `1. ` | Bulleted / numbered list |
| `[ ] ` `[x] ` | Task list |
| `> ` | Blockquote |
| ` ``` ` / `---` | Code block / rule |
| `**bold**` `*italic*` `~~struck~~` `` `code` `` | Inline marks |
| `[text](url)` `![alt](src)` | Link, image |

---

## Tables

Tables are `.html` only. Every operation is a command and is disabled while the caret is outside a table. Drag a cell border to resize.

<div x-code-group>

```html copy
<div x-data="{ doc: '<table><tr><td>Stem</td><td>Price</td></tr><tr><td>Rose</td><td>4</td></tr></table>' }">
    <button x-text-edit.table.3x2>Insert 3×2</button>
    <button x-text-edit.row-after>Row below</button>
    <button x-text-edit.column-after>Column after</button>
    <button x-text-edit.merge>Merge</button>
    <button x-text-edit.table-header>Header row</button>
    <button x-text-edit.table-remove>Remove</button>

    <div x-text-edit.html="doc" aria-label="Document"></div>
</div>
```

::: frame
<div x-data="{ doc: '<table><tr><td>Stem</td><td>Price</td></tr><tr><td>Rose</td><td>4</td></tr></table>' }" class="col gap-2 w-full">
    <div class="row-wrap gap-1">
        <button class="ghost sm" x-text-edit.table.3x2>Insert 3×2</button>
        <button class="ghost sm" x-text-edit.row-after>Row below</button>
        <button class="ghost sm" x-text-edit.column-after>Column after</button>
        <button class="ghost sm" x-text-edit.merge>Merge</button>
        <button class="ghost sm" x-text-edit.table-header>Header row</button>
        <button class="ghost sm" x-text-edit.table-remove>Remove</button>
    </div>
    <div x-text-edit.html="doc" aria-label="Document" style="--text-edit-min-height: 5rem"></div>
</div>
:::

</div>

`merge` joins the selected cells, or the caret's cell with the one to its right. Tab walks cell to cell and adds a row past the last one; arrows leave a cell only at its edge.

---

## Keyboard

| Key | Action |
|---|---|
| Enter | New paragraph. In a list: next item; from an empty item, leave the list. In a code block: new line; from an empty last line, leave the block |
| Shift + Enter | Line break |
| Tab / Shift + Tab | Next / previous cell; nest / unnest a list item; indent / outdent a block (`.html`) |
| Backspace at line start | Join the line above; leave a list; demote a heading |
| Escape | Leave the editor |
| Cmd/Ctrl + Z / Shift + Z | Undo / redo (the editor keeps its own history) |
| Cmd/Ctrl + B / I / U | Bold / italic / underline (`.html`) |
| Cmd/Ctrl + K | Toggle a link: removes the one at the caret, otherwise asks for a URL (the area's `x-text-edit.a` field where there is one) and links the selection |

Pasted content keeps its text and marks, not the source's styling.

---

## Scattered Controls

A control finds its area in this order: the nearest ancestor with `x-text-edit-for="selector"`{copy}; else the nearest ancestor holding exactly one area; else the last focused area. A shared toolbar is disabled until an area has been focused.

<div x-code-group>

```html copy
<div x-data="{ a: 'First **draft**', b: 'Second draft' }">
    <button x-text-edit.strong>Bold (last focused)</button>
    <span x-text-edit-for="#note-b">
        <button x-text-edit.em>Italic in B</button>
    </span>

    <div x-text-edit="a" aria-label="A"></div>
    <div x-text-edit="b" id="note-b" aria-label="B"></div>
</div>
```

::: frame
<div x-data="{ a: 'First **draft**', b: 'Second draft' }" class="col gap-2 w-full">
    <div class="row-wrap gap-1">
        <button class="ghost sm" x-text-edit.strong>Bold (last focused)</button>
        <span x-text-edit-for="#te-note-b">
            <button class="ghost sm" x-text-edit.em>Italic in B</button>
        </span>
    </div>
    <div x-text-edit="a" aria-label="A" style="--text-edit-min-height: 3rem"></div>
    <div x-text-edit="b" id="te-note-b" aria-label="B" style="--text-edit-min-height: 3rem"></div>
</div>
:::

</div>

Controls go quiet when the caret moves into any other editable element.

---

## Selection Menu

The area fires `text-edit:selection`{copy} with `{ collapsed, text, x, y, width, height, top, right, bottom, left }`, or `null` when it lets go. The same box is written as `--text-edit-selection-x`, `-y`, `-width`, `-height` and `-center` on the area and on `:root`, so a popover positions itself without script.

<div x-code-group>

```html copy
<div x-data="{ post: 'Select some of this text.',
        bubble(d) {
            const el = this.$refs.menu, open = el.matches(':popover-open'), want = !!d && !d.collapsed;
            if (want && !open) el.showPopover();
            if (!want && open) el.hidePopover();
        } }"
     @text-edit:selection="bubble($event.detail)">
    <div popover="manual" x-ref="menu" style="position: fixed; margin: 0; inset: auto;
         transform: translate(-50%, -125%); left: var(--text-edit-selection-center); top: var(--text-edit-selection-y)">
        <button x-text-edit.strong>Bold</button>
        <button x-text-edit.em>Italic</button>
    </div>
    <div x-text-edit="post" aria-label="Post" @focusout="bubble(null)"></div>
</div>
```

::: frame
<div x-data="{ post: 'Select some of this text.', bubble(d) { const el = this.$refs.menu, open = el.matches(':popover-open'), want = !!d && !d.collapsed; if (want && !open) el.showPopover(); if (!want && open) el.hidePopover(); } }" @text-edit:selection="bubble($event.detail)" class="w-full">
    <div popover="manual" x-ref="menu" class="row gap-1 p-1 bg-surface-1 border border-line rounded shadow" style="position: fixed; margin: 0; inset: auto; transform: translate(-50%, -125%); left: var(--text-edit-selection-center); top: var(--text-edit-selection-y)">
        <button class="ghost sm" x-text-edit.strong>Bold</button>
        <button class="ghost sm" x-text-edit.em>Italic</button>
    </div>
    <div x-text-edit="post" aria-label="Post" @focusout="bubble(null)" style="--text-edit-min-height: 4rem"></div>
</div>
:::

</div>

Use `popover="manual"`: an auto popover closes on the outside click that selects the text. `focusout` covers clicks that land outside the editor.

---

## Editing a Data Value

Bind the editor to a field of a [data source](/docs/core-plugins/local-data) row and the row stores the markup.

<div x-code-group>

```html copy
<template x-for="p in $x.example.products" :key="p.name">
    <div x-text-edit.html.minimal="p.name" aria-label="Name"></div>
</template>
```

::: frame
<div class="col gap-2 w-full">
    <template x-for="p in ($x.example.products || []).slice(0, 3)" :key="p.name">
        <div class="row gap-3 items-center">
            <div x-text-edit.html.minimal="p.name" aria-label="Name" class="grow" style="--text-edit-min-height: 2.5rem; --text-edit-padding: 0.4rem 0.6rem"></div>
            <code class="text-xs" x-text="p.name"></code>
        </div>
    </template>
</div>
:::

</div>

---

## Page Styling

Add `.page` to `font`, `size`, `leading`, `align`, `color` or `background` to style the whole area. Page styles are CSS variables on the area, not content: read or assign them with `$text.page`, and `text-edit:page`{copy} fires with the current set.

<div x-code-group>

```html copy
<div x-data="{ doc: '<p>Page styles live outside the document.</p>', look: {} }">
    <select x-text-edit.font.page>
        <option value="">Default</option>
        <option value="Georgia">Georgia</option>
        <option value="ui-monospace">Mono</option>
    </select>
    <select x-text-edit.leading.page>
        <option value="">Default</option>
        <option value="2">Double</option>
    </select>

    <div x-text-edit.html="doc" aria-label="Document" @text-edit:page="look = $event.detail"></div>
    <code x-text="JSON.stringify(look)"></code>
</div>
```

::: frame
<div x-data="{ doc: '<p>Page styles live outside the document.</p>', look: {} }" class="col gap-2 w-full">
    <div class="row-wrap gap-1">
        <select class="sm hug" x-text-edit.font.page aria-label="Page font">
            <option value="">Default</option>
            <option value="Georgia">Georgia</option>
            <option value="ui-monospace">Mono</option>
        </select>
        <select class="sm hug" x-text-edit.leading.page aria-label="Page spacing">
            <option value="">Default</option>
            <option value="2">Double</option>
        </select>
    </div>
    <div x-text-edit.html="doc" aria-label="Document" @text-edit:page="look = $event.detail" style="--text-edit-min-height: 4rem"></div>
    <code class="text-xs" x-text="JSON.stringify(look)"></code>
</div>
:::

</div>

---

## $text

`$text`{copy} is the area the element sits in, otherwise the last focused area.

| Member | Description |
|---|---|
| `value` | Stored value; assigning resets undo history |
| `page` | Page styles object; assign `{}` to clear |
| `link` | `href` at the caret; assign to set, empty to unlink |
| `selection` | The last reported selection, or `null` |
| `run(cmd, arg)` `active(cmd)` `can(cmd)` | Apply, test, or check availability of a command |
| `markdown()` `html()` | Content as markdown or sanitized HTML, whatever the mode |
| `focus()` `selectAll()` | Focus the area; select everything |

<div x-code-group>

```html copy
<div x-data="{ doc: '<p>Hello <strong>world</strong></p>', md: '' }">
    <button @click="$text.selectAll()">Select all</button>
    <button @click="doc = ''">New page</button>

    <div x-text-edit.html="doc" aria-label="Document" @input="md = $text.markdown()"></div>
    <pre x-text="md"></pre>
</div>
```

::: frame
<div x-data="{ doc: '<p>Hello <strong>world</strong></p>', md: '' }" class="col gap-2 w-full">
    <div class="row-wrap gap-1 items-center">
        <button class="ghost sm" @click="$text.selectAll()">Select all</button>
        <button class="ghost sm" @click="doc = ''">New page</button>
        <small class="text-content-subtle">Click in the editor first</small>
    </div>
    <div x-text-edit.html="doc" aria-label="Document" @input="md = $text.markdown()" style="--text-edit-min-height: 4rem"></div>
    <pre class="text-xs p-2 bg-surface-2 rounded whitespace-pre-wrap" x-text="md || '(markdown appears here as you type)'"></pre>
</div>
:::

</div>

---

## Styles

The area uses `--color-surface-1`, `--color-line`, `--color-content-subtle`, `--color-brand-content` and `--radius` from the [theme](/docs/styles/theme). Set these per instance:

| Variable | Default | Sets |
|---|---|---|
| `--text-edit-min-height` | `8rem` | Minimum height |
| `--text-edit-max-height` | `none` | Scrolls past this |
| `--text-edit-padding` | `0.75rem` | Content padding |
| `--text-edit-font` `-size` `-leading` `-align` `-color` `-background` | inherit | Page styles; `.page` controls override |

Style by attribute: `[data-text-edit]` (value is the mode), `[data-text-edit-empty]`, `[data-text-edit-selected]`, `[data-text-edit-control]` (value is the command), `[data-text-edit-active]`, and `[aria-disabled="true"]`, which the reset already dims.

---

## Related

- [Markdown](/docs/core-plugins/markdown) renders the stored value.
- [Edit](/docs/core-plugins/edit) edits the page itself; an `x-text-edit` element inside an `x-edit` region is owned by the rich editor.
