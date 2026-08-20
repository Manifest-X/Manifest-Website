# Text Edit

A rich text editor assembled from your own markup.

---

## Overview

`x-text-edit` is one directive with two roles. Without a command modifier it marks an element as an editable area and binds its value. With one, it turns any element into a control for that area.

```html
<button x-text-edit.bold>Bold</button>

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

To get a working toolbar without writing one, add `.toolbar`. It is the only case where the plugin adds DOM: the area is wrapped so the toolbar can sit above it. The buttons it writes are ordinary `x-text-edit` controls, so there is no privileged path — the built-in set is just markup you did not have to type.

```html
<div x-text-edit.toolbar="post"></div>
```

---

## Controls

Any element becomes a control by naming a command as a modifier.

```html
<button x-text-edit.bold>Bold</button>
<button x-text-edit.heading.2>Heading</button>
<button x-text-edit.quote>Quote</button>
```

| Command | Effect |
|---|---|
| **`.bold`** **`.italic`** **`.strike`** **`.code`** | Inline marks |
| **`.heading`** | Toggle a heading; the level follows as a modifier or an expression (default 2) |
| **`.paragraph`** | Set the block back to a paragraph |
| **`.quote`** | Toggle a blockquote |
| **`.bullets`** **`.numbers`** | Lists |
| **`.divider`** | Insert a horizontal rule |
| **`.link`** **`.unlink`** | Links |
| **`.clear`** | Remove formatting from the selection |
| **`.undo`** **`.redo`** | Step the editor's own history |
| **`.block`** | For a `<select>` — see below |

An argument can be static or dynamic:

```html
<button x-text-edit.heading.3>H3</button>
<button x-text-edit.heading="level">Heading</button>
<button x-text-edit.link="url">Link</button>
```

`.link` with no argument prompts for a URL, and toggles an existing link off.

### Populating options yourself

A `<select>` with `.block` reads the options **you** wrote, and reflects the caret's current block back into the field:

```html
<select x-text-edit.block>
    <option value="p">Paragraph</option>
    <option value="h2">Heading</option>
    <option value="h3">Subheading</option>
    <option value="quote">Quote</option>
    <option value="pre">Code block</option>
</select>
```

Values are `p`, `h1`–`h6`, `quote`, and `pre`. Offer as many or as few as your document format allows — the plugin never adds options of its own.

### Control state

Every control is kept in sync with the caret:

- `data-text-edit-active` while its command is on
- `aria-pressed` on buttons
- `aria-disabled="true"` when the command is unavailable — in a `.minimal` area, in a `.plain` area, or when no area resolves at all

Manifest's reset already dims `[aria-disabled="true"]` and blocks its pointer events, so a control that cannot act looks and behaves like it.

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
    <button x-text-edit.bold>Bold</button>
    <div x-text-edit="draftA"></div>
</dialog>

<dialog popover id="reply-b">
    <button x-text-edit.bold>Bold</button>
    <div x-text-edit="draftB"></div>
</dialog>

<!-- Pinned: drives A from anywhere, whatever has focus -->
<div x-text-edit-for="#body-a">
    <button x-text-edit.bold>Bold in A</button>
</div>

<!-- Focused: no enclosing area, so it follows the caret -->
<header>
    <button x-text-edit.bold>Bold</button>
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

The markdown round trip covers what the commands can author: headings, bold, italic, strikethrough, inline code, links, bullet and numbered lists (nested), blockquotes, code fences, and horizontal rules. Markdown outside that set — tables, footnotes, reference links — is not silently converted. Use `.html` when content needs to keep structures beyond it.

---

## Related

- [Markdown](/docs/core-plugins/markdown) — render the value back out
- [Edit](/docs/core-plugins/edit) — editing the page itself, rather than a field in it
