# Prose

A rich text editor that stores markdown.

---

## Overview

Prose turns an element into a formatting-aware editor with `x-prose`. Authors get a familiar toolbar — headings, bold, italic, lists, links — while the value bound to your state stays portable markdown, which [Markdown](/docs/core-plugins/markdown) renders straight back.

The editor writes real block elements, so what you see while typing is what the stored markdown describes. Serialization runs both ways over exactly what the toolbar can author, so a value survives any number of edit-and-save cycles unchanged.

---

## Setup

Prose is included in `manifest.js` with all core plugins, or can be selectively loaded.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="prose"></script>
```

</div>

Editor styles are included in Manifest CSS or as a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.prose.css">
```

</div>

---

## Basic Usage

Point `x-prose` at a piece of state. The editor reads it on load and writes back on every change.

```html
<div x-data="{ post: '# Hello\n\nStart writing.' }">
    <div x-prose="post" placeholder="Write a post…" aria-label="Post body"></div>
    <div x-markdown="post"></div>
</div>
```

`placeholder` shows while the editor is empty. Give every editor an `aria-label` (or an adjacent label) — it is a text box, and screen readers announce it as one.

---

## Storage Modes

The value can be stored three ways. Markdown is the default because it survives being rendered, diffed, and stored anywhere.

| Modifier | Stores | Use for |
|---|---|---|
| *(none)* | Markdown | Post bodies, descriptions, anything you also render |
| **`.html`** | Sanitized HTML | Content pasted from elsewhere that must keep its exact structure |
| **`.plain`** | Text | Notes and messages, where formatting would be noise |

```html
<div x-prose="post"></div>
<div x-prose.html="page"></div>
<div x-prose.plain="note"></div>
```

`.html` sanitizes on the way in and out: script-like elements are removed, unknown tags are unwrapped to keep their text, attributes are stripped, and `javascript:` links are dropped.

---

## Modifiers

| Modifier | Effect |
|---|---|
| **`.html`** | Store sanitized HTML instead of markdown |
| **`.plain`** | Plain text, no toolbar, no formatting |
| **`.minimal`** | Inline marks only — bold, italic, strike, code, link. No blocks |
| **`.bare`** | No built-in toolbar (drive it with `$prose` instead) |
| **`.sticky`** | Toolbar sticks to the top while scrolling a long document |
| **`.autofocus`** | Focus the editor on load |

```html
<div x-prose.minimal="bio" placeholder="Short bio…"></div>
<div x-prose.sticky="chapter"></div>
```

---

## Custom Toolbars

`.bare` drops the built-in toolbar; `$prose` gives you the commands to build your own. It resolves to the editor the element sits inside, or the focused one.

```html
<div class="row-wrap gap-1">
    <button class="ghost sm" :class="$prose.active('bold') && 'selected'"
            @click="$prose.run('bold')">Bold</button>
    <button class="ghost sm" :class="$prose.active('h2') && 'selected'"
            @click="$prose.run('h2')">Heading</button>
    <button class="ghost sm" @click="$prose.run('link')">Link</button>
</div>

<div x-prose.bare="page"></div>
```

Commands: `bold`, `italic`, `strike`, `code`, `h1`, `h2`, `quote`, `ul`, `ol`, `link`, `rule`.

| Member | Returns | Description |
|---|---|---|
| **`$prose.run(cmd)`** | — | Apply a command at the caret |
| **`$prose.active(cmd)`** | Boolean | Whether that command is on at the caret |
| **`$prose.value`** | String | The stored value; assignable |
| **`$prose.markdown()`** | String | Content as markdown, whatever the mode |
| **`$prose.html()`** | String | Content as sanitized HTML, whatever the mode |
| **`$prose.focus()`** | — | Focus the editor |

---

## Keyboard

| Shortcut | Action |
|---|---|
| **Cmd/Ctrl + B** | Bold |
| **Cmd/Ctrl + I** | Italic |
| **Cmd/Ctrl + K** | Link (or unlink) |

Pasted content is converted to the editor's own subset rather than carried over as the source application's markup — so pasting from a word processor brings the text and its marks, not its styling.

---

## Theme

Prose uses the following [theme](/docs/styles/theme) variables:

- `--color-surface-1` — editor background
- `--color-surface-2` — toolbar background
- `--color-line` — border and blockquote rule
- `--color-content-subtle` — placeholder
- `--color-brand-content` — links
- `--radius` — corner rounding

Three variables tune the editor itself, and can be set per instance:

| Variable | Default | Description |
|---|---|---|
| **`--prose-min-height`** | `8rem` | Minimum editable height |
| **`--prose-max-height`** | `none` | Scrolls past this height |
| **`--prose-padding`** | `0.75rem` | Padding around the content |

```html
<div x-prose="note" style="--prose-min-height: 4rem; --prose-max-height: 20rem"></div>
```

---

## Styles

The editor is built from attributes, so it restyles without fighting specificity:

| Selector | Element |
|---|---|
| **`[data-prose]`** | The wrapper; the attribute's value is the storage mode |
| **`[data-prose-toolbar]`** | The toolbar |
| **`[data-prose-tool]`** | A toolbar button; the attribute's value is the command |
| **`[data-prose-active]`** | On a button whose command is active at the caret |
| **`[data-prose-input]`** | The editable surface |

```css
/* Borderless editor that only shows its chrome on focus */
[data-prose] {
    border-color: transparent;
}

[data-prose]:focus-within {
    border-color: var(--color-line);
}
```

---

## Scope

The markdown round trip covers what the toolbar can author: headings, bold, italic, strikethrough, inline code, links, bullet and numbered lists (nested), blockquotes, code fences, and horizontal rules. Markdown the editor cannot author — tables, footnotes, reference links — is not silently converted. Use `.html` when content needs to keep structures beyond that set.

---

## Related

- [Markdown](/docs/core-plugins/markdown) — render the value back out
- [Edit](/docs/core-plugins/edit) — editing the page itself, rather than a field in it
