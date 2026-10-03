# Text Edit

A rich text editor built from your own markup, storing markdown.

---

## Overview

`x-text-edit` has two roles. On its own, it makes an element an editable area bound to a value. With a command modifier, it makes any element a control for that area. It ships no toolbar of its own — you build one from your own buttons and inputs, styled like the rest of your page.

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

Point `x-text-edit`{copy} at a value and the element becomes editable in place. `placeholder` shows while it's empty. The stored value is markdown, so [x-markdown](/docs/core-plugins/markdown) can render it anywhere else on the page — below, the second box re-renders the value as you type.

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

With no value to point at, the element's existing markup is the starting content and the element itself holds the result. Don't combine it with `x-html` — both would write to the same element.

---

## Commands

Commands are named after the tag they produce. On a `<button>` the command runs on click, without moving focus out of the text. On a `<select>` or `<input>` it runs on change, and the control also reflects the state at the caret — the block dropdown below reads "Heading" while the caret sits in one. A command that takes an argument gets it from the next modifier or from an expression: `.align.center`, `.img="url"`.

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
        <select class="ghost sm" x-text-edit.block aria-label="Block">
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
| Lists, inserts | `ul` `ol` `checklist` `indent` `outdent` `hr` `br` `img` `a` `unlink` |
| Style (`.html`) | `align` `color` `background` `font` `size` `leading` |
| Table (`.html`) | `table` `row-before` `row-after` `row-remove` `column-before` `column-after` `column-remove` `merge` `split` `table-header` `table-remove` |
| Other | `clear` `undo` `redo` |

A command whose output markdown can't store — underline, colours, tables — is disabled unless the area uses `.html`. Disabled controls get `aria-disabled="true"` rather than `disabled`, so they stay focusable; every control on this page is disabled until the caret is in an area it can act on. An inline command clicked with nothing selected applies to the next text you type. Colour inputs apply live as you pick — each tick restyles the selection, and undo removes the whole colour pass in one step.

---

## Links

A single `<input>` handles links end to end. Select text and type a URL to link it; click inside a link — clicking never navigates while editing — and the field shows its `href`; clear the field, or press an `unlink` button, to remove it. A bare domain gets `https://` for you, and something that isn't a URL at all is refused: the field re-syncs to the real `href`, showing it didn't take.

<div x-code-group>

```html copy
<div x-data="{ post: 'Visit [Manifest](https://manifestx.dev) today.' }">
    <input type="url" x-text-edit.a placeholder="https://" aria-label="Link">
    <button x-text-edit.unlink>Unlink</button>
    <div x-text-edit="post" aria-label="Post"></div>
</div>
```

::: frame
<div x-data="{ post: 'Visit [Manifest](https://manifestx.dev) today.' }" class="col gap-2 w-full">
    <div class="row gap-2">
        <input type="url" class="sm grow" x-text-edit.a placeholder="https://" aria-label="Link">
        <button class="ghost sm" x-text-edit.unlink>Unlink</button>
    </div>
    <div x-text-edit="post" aria-label="Post" style="--text-edit-min-height: 4rem"></div>
</div>
:::

</div>

---

## Typing Markdown

Type markdown and it becomes the real thing. Inline marks — `**bold**`, `*italic*`, `` `code` `` — convert the moment you type the closing marker. Block shortcuts — headings, lists, quotes — work at the start of a line and convert when you press Enter. `.literal` turns the shortcuts off.

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

`merge` joins the selected cells, or the caret's cell with the one to its right. Tab walks cell to cell and adds a row past the last one; arrows leave a cell only at its edge. Inserting a table while the caret is inside one lands the new table after it — tables never nest.

| Command | Effect |
|---|---|
| `table` | Insert; size as a modifier or expression: `.table.3x2`, `.table="cols + 'x' + rows"` (default 3×3) |
| `row-before`, `row-after` | Add a row above / below the caret's |
| `row-remove` | Remove the caret's row |
| `column-before`, `column-after` | Add a column before / after the caret's |
| `column-remove` | Remove the caret's column |
| `merge` | Join the selected cells, or the caret's cell with its right neighbour |
| `split` | Undo a merge: split the caret's spanning cell |
| `table-header` | Toggle the first row between header and body cells |
| `table-remove` | Remove the whole table |

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

Pasted content keeps its text and marks, not the source's styling.

---

## Scattered Controls

A control finds its area in this order:

1. The nearest ancestor with `x-text-edit-for="selector"`{copy}.
2. The nearest ancestor holding exactly one area.
3. The last focused area.

A shared toolbar is disabled until an area has been focused.

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

Controls disable themselves while the caret sits in some other editable element, so a page-level toolbar can't write into the wrong field.

---

## Selection Menu

Put `x-text-edit-menu`{copy} on an element holding commands and it becomes a selection bubble: shown over the selection of the area it belongs to (found the same way any control finds its area), hidden once the selection is gone. It's promoted to a manual popover, so the click that makes the selection can't close it.

<div x-code-group>

```html copy
<div x-data="{ post: 'Select some of this text.' }">
    <menu x-text-edit-menu>
        <button x-text-edit.strong>Bold</button>
        <button x-text-edit.em>Italic</button>
    </menu>
    <div x-text-edit="post" aria-label="Post"></div>
</div>
```

::: frame
<div x-data="{ post: 'Select some of this text.' }" class="w-full">
    <menu class="unstyle" x-text-edit-menu>
        <button class="ghost sm" x-text-edit.strong>Bold</button>
        <button class="ghost sm" x-text-edit.em>Italic</button>
    </menu>
    <div x-text-edit="post" aria-label="Post" style="--text-edit-min-height: 4rem"></div>
</div>
:::

</div>

For a menu of your own, the same plumbing is exposed directly: the area fires `text-edit:selection`{copy} with `{ collapsed, text, x, y, width, height, top, right, bottom, left }`, or `null` once the selection is gone, and the same box is written as `--text-edit-selection-x`, `-y`, `-width`, `-height` and `-center` custom properties on the area and on `:root` — so anything can position itself over the selection without script.

---

## Editing a Data Value

Bind the editor to a field of a [data source](/docs/core-plugins/local-data) row and the edit is stored in that row — the field simply holds the markup. Below, each editor is bound to a product's `name`; the code on the right isn't part of the pattern, it just shows the stored value updating as you type.

<div x-code-group>

```html copy
<template x-for="p in $x.example.products" :key="p.name">
    <div x-text-edit.html.minimal="p.name" aria-label="Name"></div>
</template>
```

::: frame
<div class="col gap-3 w-full">
    <template x-for="p in ($x.example.products || []).slice(0, 3)" :key="p.name">
        <div class="grid grid-cols-2 gap-4 items-center">
            <div x-text-edit.html.minimal="p.name" aria-label="Name" style="--text-edit-min-height: 2.5rem; --text-edit-padding: 0.4rem 0.6rem"></div>
            <code class="text-xs text-content-subtle" x-text="'name: ' + JSON.stringify(p.name)"></code>
        </div>
    </template>
</div>
:::

</div>

---

## Page Styling

Add `.page` to `font`, `size`, `leading`, `align`, `color` or `background` and the command styles the whole area instead of the selection. Page styles live as CSS variables on the area, not as tags in the content, so the stored document stays clean. Read or assign them with `$text.page`; `text-edit:page`{copy} fires with the current set whenever they change.

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
        <select class="ghost sm" x-text-edit.font.page aria-label="Page font">
            <option value="">Default</option>
            <option value="Georgia">Georgia</option>
            <option value="ui-monospace">Mono</option>
        </select>
        <select class="ghost sm" x-text-edit.leading.page aria-label="Page spacing">
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

`$text`{copy} resolves to the editable area the expression's element sits in, or failing that, the last focused area.

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
    <button :disabled="!doc" @click="doc = ''">Clear</button>

    <div x-text-edit.html="doc" aria-label="Document" @input="md = $text.markdown()"></div>
    <pre x-text="md"></pre>
</div>
```

::: frame
<div x-data="{ doc: '<p>Hello <strong>world</strong></p>', md: '' }" class="col gap-2 w-full">
    <div class="row gap-1">
        <button class="ghost sm" @click="$text.selectAll()">Select all</button>
        <button class="ghost sm" :disabled="!doc" @click="doc = ''">Clear</button>
    </div>
    <div x-text-edit.html="doc" aria-label="Document" @input="md = $text.markdown()" style="--text-edit-min-height: 4rem"></div>
    <pre class="text-xs p-2 bg-surface-2 rounded whitespace-pre-wrap" x-text="md || '(markdown appears here as you type)'"></pre>
</div>
:::

</div>

Literal `*` and `_` come back escaped from `markdown()` — in an `.html` area they're ordinary characters, and the escape is what keeps them ordinary on the way back in.

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
