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

To get a working toolbar without writing one, add `.toolbar`:

```html
<div x-text-edit.toolbar="post"></div>
```

This follows the same convention as the [Colorpicker](/docs/core-plugins/colorpicker) library: default chrome is generated at runtime, marked `data-mnfst-generated` so the prerenderer drops it instead of baking it into the page, and **replaced wholesale by a `<template>` you supply**.

```html
<template x-text-edit.toolbar>
    <button class="ghost sm" x-text-edit.strong>B</button>
    <select x-text-edit.block>…</select>
</template>
```

The buttons it writes are ordinary `x-text-edit` controls, so the built-in set has no privileges a hand-written one lacks — and it only offers commands the area's mode allows. It is the one case where the plugin adds DOM: the area is **wrapped** rather than gaining a sibling, because an area is often a flex or grid child where a sibling would land beside it. Without `.toolbar` your element is untouched.

If you are writing your own controls anyway, skip `.toolbar` entirely and place them wherever you like.

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

**Operations with no tag of their own** — `.indent` `.outdent` `.align` `.color` `.background` `.font` `.size` `.clear` `.undo` `.redo` `.block`

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
| **`.html` only** | `u` `mark` `small` `sub` `sup` `kbd` `samp` `var` `abbr` `cite` `q` `ins` `dfn` `time` `span` `address` `figure` `figcaption` `dl` `dt` `dd` `div` `section` `article` `aside` `table` `color` `background` `font` `size` `align` |

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

## Keyboard

| Key | Action |
|---|---|
| **Tab** | Nest the current list item, or indent the current block |
| **Shift + Tab** | Outdent |
| **Escape** | Leave the editor |
| **Cmd/Ctrl + B / I / U** | `strong` / `em` / `u` |
| **Cmd/Ctrl + K** | Link |

Tab indents rather than moving focus, the way every editor behaves; **Escape** is the way out, so keyboard users are never trapped. Nesting is capped at one level deeper than the item above it, and indenting a plain block is a margin, so that half only applies in `.html` mode.

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
| **`.toolbar`** | Write the default toolbar |
| **`.sticky`** | A `.toolbar` sticks to the top while scrolling a long document |
| **`.autofocus`** | Focus the area on load |

`.html` sanitizes on the way in and out: script-like elements are removed, unknown tags are unwrapped to keep their text, attributes are stripped, and `javascript:` links are dropped.

---

## Keyboard

| Shortcut | Action |
|---|---|
| **Cmd/Ctrl + B** | Bold |
| **Cmd/Ctrl + I** | Italic |
| **Cmd/Ctrl + K** | Link |

Pasted content is converted to the editor's own subset rather than carried over as the source application's markup — pasting from a word processor brings the text and its marks, not its styling.

---

## $text

For reading and scripting, rather than for building toolbars — controls handle that declaratively. `$text` resolves to the area the element sits in, or the last focused one.

| Member | Returns | Description |
|---|---|---|
| **`$text.value`** | String | The stored value; assignable |
| **`$text.link`** | String | The `href` at the caret; assignable, empty to unlink |
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
- `--color-surface-2` — toolbar background
- `--color-line` — border and blockquote rule
- `--color-content-subtle` — placeholder
- `--color-brand-content` — links
- `--radius` — corner rounding

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
| **`[data-text-edit-toolbar]`** | A toolbar row — yours or the built-in one |
| **`[data-text-edit-field]`** | The wrapper `.toolbar` adds |
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
