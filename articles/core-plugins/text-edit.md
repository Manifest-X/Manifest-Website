# Text Edit

A rich text editor assembled from your own markup.

---

## Overview

`x-text-edit` is one directive with two roles. Without a command modifier it marks an element as an editable area and binds its value. With one, it turns any element into a control for that area.

```html
<button x-text-edit.strong>Bold</button>

<div x-text-edit="post"></div>
```

Controls need no toolbar element, no wrapper, and no shared parent — a control can sit anywhere in the document and still find the area it belongs to. That is what lets two dialogs loaded into the same DOM keep their editors separate without either knowing the other exists.

The bound value is markdown by default, so [Markdown](/docs/core-plugins/markdown) renders it straight back.

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

Editor styles are included in Manifest CSS or as a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.text.edit.css">
```

</div>

---

## The Editable Area

Point `x-text-edit` at a piece of state. The element becomes editable in place — no wrapper is inserted, so whatever you styled it as, it stays.

```html
<div x-data="{ post: '# Hello\n\nStart writing.' }">
    <div x-text-edit="post" placeholder="Write a post…" aria-label="Post body"></div>
    <div x-markdown="post"></div>
</div>
```

`placeholder` shows while the area is empty. Give every area an `aria-label` or an adjacent label — it is a text box, and screen readers announce it as one.

The plugin adds no DOM of its own — not a wrapper, not a toolbar. Your element becomes editable and nothing else changes, so whatever you styled it as, it stays.

A toolbar is therefore just markup. Use the elements Manifest already styles, and `x-icon` where an icon reads better than a word:

```html
<div class="row-wrap gap-1 items-center p-2 bg-surface-1 border border-line rounded">
    <button class="ghost sm" x-text-edit.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
    <button class="ghost sm" x-text-edit.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>

    <div class="divider vertical h-6"></div>

    <select x-text-edit.block class="sm hug" aria-label="Paragraph style">
        <option value="p">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="blockquote">Quote</option>
    </select>

    <label class="row items-center gap-1 hug">
        <span x-icon="lucide:baseline"></span>
        <input type="color" class="unstyle w-6 h-6" x-text-edit.color aria-label="Text colour">
    </label>
</div>

<div x-text-edit.html="doc"></div>
```

Because a control resolves by containment, that block works wherever you put it — above the editor, in a sidebar, inside a dialog.

---

## Commands

Every command is named for the tag it produces. There is no Manifest vocabulary to learn on top of HTML: `.blockquote` makes a `<blockquote>`, `.strong` makes a `<strong>`.

```html
<button x-text-edit.strong>Bold</button>
<button x-text-edit.h2>Heading</button>
<button x-text-edit.blockquote>Quote</button>
```

**Inline tags** — `.strong` `.b` `.em` `.i` `.u` `.s` `.del` `.ins` `.code` `.mark` `.small` `.sub` `.sup` `.kbd` `.samp` `.var` `.abbr` `.cite` `.q` `.dfn` `.time` `.span`

**Block tags** — `.p` `.h1`–`.h6` `.blockquote` `.pre` `.address` `.figure` `.figcaption` `.dl` `.dt` `.dd` `.div` `.section` `.article` `.aside`

**Lists and insertions** — `.ul` `.ol` `.checklist` `.hr` `.img` `.br` `.table` `.a`

**Operations with no tag of their own** — `.indent` `.outdent` `.align` `.color` `.background` `.font` `.size` `.leading` `.clear` `.undo` `.redo` `.block`

An argument is either the next modifier or an expression:

```html
<button x-text-edit.align.center>Centre</button>
<button x-text-edit.table.4x3>Insert table</button>
<button x-text-edit.img="photoUrl">Insert image</button>
```

### What markdown can carry

Markdown has syntax for some of these and not others. Rather than let a command write something the next save would silently drop, a command that markdown cannot represent reports itself **unavailable** in markdown mode and disables its control.

| Available in | Commands |
|---|---|
| **Every mode** | `strong` `b` `em` `i` `s` `del` `code` `a` `img` `ul` `ol` `checklist` `hr` `br` `p` `h1`–`h6` `blockquote` `pre` `indent` `outdent` `clear` `undo` `redo` `block` |
| **`.html` only** | `u` `mark` `small` `sub` `sup` `kbd` `samp` `var` `abbr` `cite` `q` `ins` `dfn` `time` `span` `address` `figure` `figcaption` `dl` `dt` `dd` `table` `color` `background` `font` `size` `align` `leading` |

### With nothing selected

A tag command with no selection **arms**: press Bold, then type, and what you type is bold. The control stays lit until you use it or move the caret away — arming lapses deliberately rather than firing somewhere you did not mean.

`.a`, `.color`, `.background`, `.font` and `.size` need something to act on, so they report themselves unavailable until you select text — or, for the style four, use their page-level form below.

So colour, font, size and alignment work — in `.html` mode, where they survive. In markdown mode their controls dim themselves rather than pretending.

---

## Populating Options Yourself

Any element with a `value` becomes a control that both **sets** and **reflects**. The plugin never writes an option, a swatch or a font list — you do, and it fills in the current state.

```html
<select x-text-edit.block>
    <option value="p">Paragraph</option>
    <option value="h2">Heading</option>
    <option value="blockquote">Quote</option>
    <option value="pre">Code block</option>
</select>

<select x-text-edit.font>
    <option value="inherit">Default</option>
    <option value="Georgia">Georgia</option>
</select>

<select x-text-edit.size>
    <option value="16px">16</option>
    <option value="24px">24</option>
</select>

<input type="color" x-text-edit.color aria-label="Text colour">
<input type="color" x-text-edit.background aria-label="Highlight">
```

Values are exact tag names (`p`, `h1`–`h6`, `blockquote`, `pre`, `address`, `figcaption`, …) — the same names the command modifiers use.

A `<select>` is never blanked by a value you did not offer. If the caret sits in a font or block your list does not contain, the control is left alone rather than showing empty.

---

## Links

One `<input>` is the whole define, edit and clear surface. It shows the current `href`, sets it on change, and removes the link when emptied.

```html
<input type="url" x-text-edit.a placeholder="https://">
```

Select some text and type a URL to create the link; put the caret back inside it and the field shows the existing `href` for editing; clear the field to unlink. `Cmd/Ctrl + K` toggles a link at the caret, and `$text.link` is the same value in script.

With nothing selected, setting a URL inserts it as its own link.

---

## Typing Markdown

Markdown typed into the editor becomes the element it describes — **when you press Enter**, not while you are still typing the line. Finish `## Title` and press Enter, and the line you just left becomes a heading.

Converting mid-keystroke fights the writer: a `*` gets reinterpreted the moment a second one appears, and typing markdown literally becomes impossible. Waiting for the line to be finished also keeps the window in which what you see and what is stored disagree down to the line you are on.

It is not only a convenience, either. Without any conversion the two genuinely drift: `## Title` left sitting in a paragraph is *stored* as a heading and comes back as one on the next load, having looked like body text the whole time it was being written.

| Type | Get |
|---|---|
| `# ` … `###### ` | `h1`–`h6` |
| `- ` `* ` `+ ` | Bulleted list |
| `1. ` | Numbered list |
| `[ ] ` `[x] ` | Task list |
| `> ` | Blockquote |
| ` ``` ` | Code block |
| `**bold**` `__bold__` | `strong` |
| `*italic*` | `em` |
| `~~struck~~` | `del` |
| `` `code` `` | `code` |
| `[text](url)` | Link |

Block rules only fire at the start of a line, so `Mix ## into a sentence` stays literal. Add **`.literal`** to turn the whole thing off and keep the characters as typed.

---

## Enter

Enter finishes the line and starts a plain paragraph. A heading or a quote **does not continue itself** — the line after a title is body text, which is what a writer means by pressing Enter.

| In | Enter gives |
|---|---|
| A heading, quote, or any other block | A paragraph |
| A list item | The next item |
| An **empty** list item | A paragraph after the list |
| A code block | A new line of code |
| An **empty** last line of a code block | A paragraph after the block |

Empty-item and empty-line exits matter for more than convenience: with Tab bound to indent, they are the only way out of a list or a code block that does not involve the mouse.

**Shift + Enter** breaks the line without leaving the block.

---

## Keyboard

| Key | Action |
|---|---|
| **Enter** | Finish the line — see above |
| **Shift + Enter** | Line break without leaving the block |
| **Tab** | Next table cell · nest the list item · indent the block |
| **Shift + Tab** | Previous cell · outdent |
| **Backspace** at the start of a line | Merge into the line above, plainly — no inlined styles. At the start of a list item it leaves the list; at the start of the first block it demotes a heading to a paragraph |
| **Escape** | Leave the editor |
| **Cmd/Ctrl + Z** / **Shift + Z** | Undo / redo |
| **Cmd/Ctrl + B / I / U** | `strong` / `em` / `u` |
| **Cmd/Ctrl + K** | Link |

Tab indents rather than moving focus, the way every editor behaves — so **Escape** is the way out, and keyboard users are never trapped. Inside a table Tab walks cell to cell and adds a row at the end. List nesting is capped at one level deeper than the item above it; indenting a plain block is a margin, so that half only applies in `.html` mode, and the indent controls dim where they would do nothing.

Undo is the editor's own, not the browser's. Wrapping a tag or moving a list item is a plain DOM edit that the browser's undo stack never sees, so the editor keeps its own history and coalesces typing into single steps.

Pasted content is converted to the editor's own subset rather than carried over as the source application's markup — pasting from a word processor brings the text and its marks, not its styling.

---

## How a Control Finds Its Area

Resolution runs in this order, and stops at the first answer:

1. **Pinned** — the nearest ancestor with `x-text-edit-for`, resolved as a selector. One attribute can pin a whole toolbar.
2. **Contained** — the nearest ancestor that holds exactly one area. This is what scopes a component's controls to that component's editor.
3. **Focused** — otherwise, the area that was last focused. This is what makes one shared toolbar drive several editors.

When an ancestor holds more than one area, visible areas win over hidden ones, and the last-focused visible one wins over the rest. A closed dialog therefore never steals a shared toolbar.

```html
<!-- Contained: each dialog's toolbar drives only its own editor -->
<dialog popover id="reply-a">
    <button x-text-edit.strong>Bold</button>
    <div x-text-edit="draftA"></div>
</dialog>

<dialog popover id="reply-b">
    <button x-text-edit.strong>Bold</button>
    <div x-text-edit="draftB"></div>
</dialog>

<!-- Pinned: drives A from anywhere, whatever has focus -->
<div x-text-edit-for="#body-a">
    <button x-text-edit.strong>Bold in A</button>
</div>

<!-- Focused: no enclosing area, so it follows the caret -->
<header>
    <button x-text-edit.strong>Bold</button>
</header>
```

Controls never take the caret. A button suppresses the focus change outright; a `<select>` or text input has to take focus to work, so each area remembers its own last selection and puts it back before the command runs. That is what makes a "type a URL, then press Link" flow work across two separate fields.

---

## Page-Level Styling

A document font or line spacing is **presentation, not content**. The stored value is the area's markup, and burying a wrapper in it to carry a font would misdescribe what the document says — so page-level styling is written as CSS custom properties on the area instead.

Add `.page` to a style command and it applies to the whole document:

```html
<select x-text-edit.font.page>
    <option value="">Default</option>
    <option value="Georgia">Georgia</option>
</select>

<select x-text-edit.leading.page>
    <option value="1.4">Tight</option>
    <option value="2">Double</option>
</select>

<input type="color" x-text-edit.background.page aria-label="Page colour">
```

`.font` `.size` `.leading` `.align` `.color` `.background` all take `.page`. Page controls need no caret, so they stay usable when focus is anywhere on the screen, and they reflect the current page value rather than the selection's.

| Variable | Set by |
|---|---|
| `--text-edit-font` | `.font.page` |
| `--text-edit-size` | `.size.page` |
| `--text-edit-leading` | `.leading.page` |
| `--text-edit-align` | `.align.page` |
| `--text-edit-color` | `.color.page` |
| `--text-edit-background` | `.background.page` |

Set them yourself in CSS for a document's default look; the controls only override.

Because page styling is separate from the document, it is **yours to persist**. `$text.page` reads the set values back as a plain object, and assigning replaces them:

```html
<div x-data="{ doc: '', look: {} }"
     x-init="$text.page = look"
     @text-edit:page="look = $event.detail">
```

A `text-edit:page` event fires on the area whenever a page control changes something.

---

## New Page

Document lifecycle is the application's, not the editor's — a new page is just a new value:

```html
<button @click="doc = ''; $text.page = {}; $text.focus()">New page</button>
```

Replacing the value from outside **resets the editor's undo history**, so a new page cannot undo its way back into the previous one. `$text.selectAll()` is there when a command should apply to everything.

---

## Modes

| Modifier | Stores | Use for |
|---|---|---|
| *(none)* | Markdown | Post bodies, descriptions, anything you also render |
| **`.html`** | Sanitized HTML | Content pasted from elsewhere that must keep its exact structure |
| **`.plain`** | Text | Notes and messages, where formatting would be noise |

Plus:

| Modifier | Effect |
|---|---|
| **`.minimal`** | Inline marks only. Block controls disable themselves |
| **`.literal`** | Do not resolve typed markdown into elements |
| **`.autofocus`** | Focus the area on load |

`.html` sanitizes on the way in and out: script-like elements are removed, unknown tags are unwrapped to keep their text, attributes are stripped, and `javascript:` links are dropped.

---

## $text

For reading and scripting, rather than for building toolbars — controls handle that declaratively. `$text` resolves to the area the element sits in, or the last focused one.

| Member | Returns | Description |
|---|---|---|
| **`$text.value`** | String | The stored value; assignable. Assigning resets undo history |
| **`$text.page`** | Object | Page-level styles; assignable, `{}` to clear |
| **`$text.link`** | String | The `href` at the caret; assignable, empty to unlink |
| **`$text.selectAll()`** | — | Select the whole document |
| **`$text.run(cmd, arg)`** | — | Apply a command |
| **`$text.active(cmd)`** | Boolean | Whether it is on at the caret |
| **`$text.can(cmd)`** | Boolean | Whether this area's mode allows it |
| **`$text.markdown()`** | String | Content as markdown, whatever the mode |
| **`$text.html()`** | String | Content as sanitized HTML, whatever the mode |
| **`$text.focus()`** | — | Focus the area |

---

## Theme

Text Edit uses the following [theme](/docs/styles/theme) variables:

- `--color-surface-1` — area background
- `--color-surface-2` — a surface for chrome you author around it
- `--color-line` — border and blockquote rule
- `--color-content-subtle` — placeholder
- `--color-brand-content` — links
- `--radius` — corner rounding

Controls are styled where they sit, by `[data-text-edit-control]` and `[data-text-edit-active]` — there is no toolbar element to hang styles on, because there is no toolbar unless you write one.

Three variables tune the area itself, and can be set per instance:

| Variable | Default | Description |
|---|---|---|
| **`--text-edit-min-height`** | `8rem` | Minimum editable height |
| **`--text-edit-max-height`** | `none` | Scrolls past this height |
| **`--text-edit-padding`** | `0.75rem` | Padding around the content |

```html
<div x-text-edit="note" style="--text-edit-min-height: 4rem; --text-edit-max-height: 20rem"></div>
```

---

## Styles

Everything is addressed by attribute, so restyling never fights specificity:

| Selector | Element |
|---|---|
| **`[data-text-edit]`** | An editable area; the value is its storage mode |
| **`[data-text-edit-minimal]`** | An area restricted to inline marks |
| **`[data-text-edit-control]`** | A control; the value is its command |
| **`[data-text-edit-active]`** | On a control whose command is active at the caret |
| **`[data-checklist]`** | A task list, on the `ul` |

```css
/* Borderless area that only shows its chrome on focus */
[data-text-edit] {
    border-color: transparent;
}

[data-text-edit]:focus {
    border-color: var(--color-line);
}
```

---

## Scope

The markdown round trip covers headings, bold, italic, strikethrough, inline code, links, images, bullet and numbered lists (nested), task lists, blockquotes, code fences, hard breaks and horizontal rules. Markdown outside that set — tables, footnotes, reference links — is not silently converted.

Everything else in the command list is HTML, and lives in `.html` mode. That is the trade the two modes make: markdown for content you want portable, HTML for content that needs the full range a word processor offers.

---

## Related

- [Markdown](/docs/core-plugins/markdown) — render the value back out
- [Edit](/docs/core-plugins/edit) — editing the page itself, rather than a field in it
