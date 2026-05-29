# Code

Syntax-highlighted code elements using standard HTML, with numerous configurable options.

---

## Setup

Code block styles ship as a separate stylesheet (independent of `manifest.css`) and reference [theme](/docs/styles/theme) variables.

Code block functionality is included in `manifest.js` with all core plugins, or it can be loaded selectively.

<div x-code-group copy>

```html "All Plugins (default)"
<!-- Code block styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.code.min.css" />

<!-- Manifest JS -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<!-- Code block styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.code.min.css" />

<!-- Manifest JS: code plugin only -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
  data-plugins="code"></script>
```

</div>

The plugin loads [highlight.js](https://highlightjs.org) on demand the first time an element with an `x-code`{copy} attribute scrolls into view. The code snippet's language may be auto-detected, or can be explicitly set with a value like `x-code="html"`{copy} or `x-code="javascript"`{copy}.

---

## Inline Code

Add an `x-code`{copy} attribute to `<code>`, `<span>`, or other inline elements for syntax highlighting. They can also be given click-to-copy functionality.

<div x-code-group copy>

```html "HTML"
<p>If at first you don’t succeed, just <code x-code="html" copy><del></del></code> and pretend it never happened.</p>
```

```markdown "Markdown"
If at first you don’t succeed, just `<del></del>`{copy} and pretend it never happened.
```

::: frame text-base
<p>If at first you don’t succeed, just <code x-code="html" copy><del></del></code> and pretend it never happened.</p>
:::

</div>

The `copy`{copy} attribute on an inline element makes inline code click-copyable, triggered with Tab + Enter for keyboard users.

If the [tooltip plugin](/docs/elements/tooltips) is loaded and the element has no `x-tooltip`{copy} of its own, a confirmation tooltip automatically appears on copy.

If writing the inline code in markdown (using backticks), a trailing brace can be used to specify the snippet's language, whether it's copyable, and to add any CSS classes, e.g. `` `npx mnfst-run`{copy} `` or `` `<button>Click Me</button>`{html copy .btn-red} ``.

Supported tokens inside the braces:

| Token | Effect |
|---|---|
| `copy`{copy} | Adds `[copy]` for click-to-copy with tooltip confirmation |
| `<language>`{copy} | Bareword like `bash`, `js`, `html` becomes the language hint for highlighting |
| `.class`{copy} | Appended to the element's class list |
| `key="value"`{copy} | Any arbitrary attribute |

---

## Code Blocks

Add `x-code`{copy} to any block text element to apply syntax highlighting.

Use a `<pre x-code>`{copy} element to visualize the same line breaks and indents as the written snippet. In markdown files, fenced code blocks (```` ``` ````) are automatically compiled to `<pre x-code>`, with every character of the body landing in the rendered output unchanged. See the [markdown plugin](/docs/core-plugins/markdown) for the fence info-string syntax.

<div x-code-group copy>

```html "HTML" copy
<pre x-code="javascript" name="Demo" lines copy>
function hello() {
  console.log('Hello, World!');
  return true;
}
</pre>
```

````html "Markdown" copy
```javascript "Demo" lines copy
function hello() {
  console.log('Hello, World!');
  return true;
}
```
````

</div>

The above snippets each create this code block:

```javascript "Demo" lines copy
function hello() {
  console.log('Hello, World!');
  return true;
}
```

Every block-level feature is a plain HTML attribute on:

| Attribute | Purpose |
|---|---|
| `x-code="language"`{copy} | Language for syntax highlighting (e.g. `javascript`, `css`, `html`, `bash`). Omit the value to auto-detect. |
| `name="…"`{copy} | Adds a title bar above the code. Also used as the tab label when inside a group. |
| `lines`{copy} | Renders a line-numbers gutter on the left. |
| `copy`{copy} | Adds a copy-to-clipboard button at the top-end. |
| `collapse`{copy} / `collapse="N"`{copy} | Caps the block to N visible lines (default 20) with a `+N` / `−` toggle below. |
| `edit`{copy} | Mounts a [CodeJar](https://github.com/antonmedv/codejar) editor on the block. Fully editable with live re-highlighting on each keystroke. |
| `from="#id"`{copy} | Pulls the source from another element's `innerHTML`. Useful for showing a live demo and its source from a single authored element. |

---

### Collapse

Long blocks can be capped to a preview length with a toggle below. Use `collapse`{copy} without a value for a default 20 lines, or `collapse="#"`{copy} to set the threshold. Blocks shorter than the threshold render normally with no toggle.

<div x-code-group copy>

```html "HTML"
<pre x-code="javascript" collapse="5">
// …
</pre>
```

````markdown "Markdown"
```javascript collapse="5"
// …
```
````

</div>

::: frame
<pre x-code="javascript" collapse="5">
// Line 1
// Line 2
// Line 3
// Line 4
// Line 5
// Line 6 — hidden until expanded
// Line 7
// Line 8
</pre>
:::

---

### Edit

Add `edit`{copy} to make the block text-editable. The editor uses <a href="https://github.com/antonmedv/codejar" target="_blank" rel="noopener">CodeJar</a> (~4 KB gzipped, loaded lazily), with highlight.js re-highlighting on every keystroke.

```html copy
<pre x-code="javascript" edit>
function hello() {
  console.log('Hello, World!');
  return true;
}
</pre>
```

<pre x-code="javascript" edit name="Try editing me">
function hello() {
  console.log('Hello, World!');
  return true;
}
</pre>

The CodeJar instance is exposed on the element as `pre._codeJar`, and a `code:editor-ready` event fires once it's mounted. This lets you integrate the editor with Alpine state, custom commands, or external save logic.

```html copy
<pre x-code="javascript" edit x-ref="editor"></pre>
<script>
  document.querySelector('[x-ref=editor]').addEventListener('code:editor-ready', (e) => {
    e.detail.editor.onUpdate(code => console.log('user typed:', code));
  });
</script>
```

---

### HTML Source

When rendered HTML on the page is a snippet's source of truth, link a code block to it with `from="#id"`. The block reads the referenced element's `innerHTML` as its source, so you only write the example once.

::: frame col gap-4
<pre x-code="html" from="#counter-demo"></pre>
<div id="counter-demo">
  <button x-data="{ n: 0 }" @click="n++">Clicked <span x-text="n">0</span> times</button>
</div>
:::

```html copy
<!-- Code block -->
<pre x-code="html" from="#counter-demo"></pre>

<!-- Reference HTML -->
<div id="counter-demo" class="frame">
  <button x-data="{ n: 0 }" @click="n++">
    Clicked <span x-text="n">0</span> times
  </button>
</div>
```

In markdown, to render a demo and show its source in one go, add the `demo` modifier to the [frame](/docs/core-plugins/markdown#frames) fence. The plugin emits both the live frame contents and a sibling `<pre x-code="html" copy>` showing the same source.

````markdown copy
::: frame demo
<button class="primary">Click me</button>
:::
````

---

## Tab Groups

Group multiple panels into a tabbed interface with `x-code-group`{copy} on any wrapper element (`<pre>`, `<div>`, `<section>`, etc.). The plugin normalizes the wrapper to a `<pre>` at process time so the same CSS targets both standalone and grouped blocks. This tab group block is a rendered example of its own snippets:

<div x-code-group copy>

```html "HTML"
<pre x-code-group copy>
  <pre x-code="html" name="HTML">…</pre>
  <pre x-code="markdown" name="Markdown">…</pre>
</pre>
```

````markdown "Markdown"
<div x-code-group copy>

```html "HTML"
...
```

```markdown "Markdown"
...
```

</div>
````

</div>

Direct children with a `name` attribute become tab panels. Children without `name` are always-visible ambient content.

The `lines`, `copy`, `edit`, and `collapse` attributes can be set on the wrapper for panels that don't set them themselves. This avoids repeating the same feature across every tab:

<div x-code-group copy>

```html "HTML"
<pre x-code-group lines>
  <pre x-code="html" name="HTML">…</pre>            <!-- inherits lines -->
  <pre x-code="css" name="CSS" collapse="5">…</pre> <!-- inherits lines, has its own collapse -->
  <pre x-code="js" name="JS" edit>…</pre>           <!-- inherits lines, has its own edit -->
</pre>
```

````markdown "Markdown"
<div x-code-group lines>

```html "HTML"
...
```

```css "CSS" collapse="5"
...
```

```js "JS" edit
...
```

</div>
````

</div>

### Visual Tabs

Similar to [HTML Source](#html-source) above, content can be visualized within a code block using `<aside class="frame">` as unique panels.

<div x-code-group copy>

```html "HTML" copy
<div x-code-group>

  <!-- Code tabs -->
  <pre x-code="html" name="HTML">...</pre>
  <pre x-code="css" name="CSS">...</pre>

  <!-- Frame paired with HTML tab due to matching name -->
  <aside class="frame" name="HTML">...</aside>

  <!-- Frame is a standalone tab due to unique name -->
  <aside class="frame" name="Demo">...</aside>

  <!-- Frame is always visible due to no name -->
  <aside class="frame">...</aside>

</div>
```

````markdown "Markdown"

```html "HTML"
...
```

```css "CSS"
...
```

::: frame name="HTML"
...
:::

::: frame name="Demo"
...
:::

::: frame
...
:::

````

</div>

---

## Accessibility

The plugin applies ARIA attributes automatically when authors don't supply them:

| Element | Applied |
|---|---|
| `<pre x-code>` (standalone) | `role="region"`, `aria-label="…"` (from `name`) |
| `<pre x-code>` inside `<pre x-code-group>` | `role="tabpanel"`, `aria-labelledby` (the tab's button id) |
| Tab strip | `<div role="tablist" aria-label="Code examples">` inside `<header>` |
| Tab buttons | `role="tab"`, `aria-selected`, full keyboard navigation (Arrow / Home / End) |
| Copy button | `aria-label="Copy code to clipboard"` |
| Inline `[copy]` | `role="button"`, `tabindex="0"`, `aria-label="Click to copy"` |
| Line numbers gutter | `aria-hidden="true"` |
| Collapse toggle | `aria-expanded`, `aria-label` ("Show N more lines" / "Show less") |

Any of these can be overridden by setting the attribute yourself before the plugin processes the element.

---

## Styles

### Theme

Default code blocks use these [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|---|---|
| `--color-page`{copy} | Code block background |
| `--color-content-neutral`{copy} | Default code text color |
| `--color-content-stark`{copy} | Inline code text color, editor caret |
| `--color-content-subtle`{copy} | Line numbers, expand toggle text |
| `--color-brand-content`{copy} | Active tab indicator |
| `--color-field-surface`{copy} | Header (title or tab strip) background |
| `--color-line`{copy} | Block border |
| `--spacing-field-height`{copy} | Header and expand-toggle height |
| `--radius`{copy} | Border radius |

Plus the syntax-color set (`--color-code-keyword`, `--color-code-string`, `--color-code-comment`, etc.) defined in `manifest.code.css`. Override any of them in your project's theme stylesheet.

```css copy
:root {
  --color-code-keyword: #ff6b6b;
  --color-code-string: #4ecdc4;
  --color-code-comment: #95a5a6;
}
```

---

### Icons

CSS variables hold the encoded SVGs used by the copy button:

| Variable | Used for |
|---|---|
| `--icon-code-copy`{copy} | Idle copy button state |
| `--icon-code-copied`{copy} | Briefly after a successful copy, plus the inline-copy tooltip flash |

To override:

1. Pick an icon from [Iconify](https://icon-sets.iconify.design/) or another SVG source.
2. Copy the encoded SVG string (Iconify's CSS tab provides the `--svg` value), or use an [SVG encoder](https://yoksel.github.io/url-encoder/).
3. Override the variable in your CSS.

```css "Default icons" copy
:root {
  --icon-code-copy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Crect width='14' height='14' x='8' y='8' rx='2' ry='2'/%3E%3Cpath d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'/%3E%3C/g%3E%3C/svg%3E");
  --icon-code-copied: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M20 6L9 17l-5-5'/%3E%3C/svg%3E");
}
```

---

### Customization

Style blocks directly with CSS, using `<pre>`, `[x-code]`, `[x-code-group]`, or a combination to target desired elements.

```css lines copy
pre[x-code], pre[x-code-group] {
  background: var(--color-surface-1);
  border: 1px solid var(--color-line);
  border-radius: 0;

  /* Header (title bar or tab strip wrapper) */
  & > header {
    font-family: var(--font-mono);
    font-weight: bold;

    & > [role="tablist"] {
      & > button[role="tab"][aria-selected="true"] {
        background: var(--color-accent-content);

        &::after {
          background: var(--color-accent-content);
        }
      }
    }
  }

  /* Line numbers gutter */
  & .lines {
    background: var(--color-surface-2);
    border-radius: 0;
  }

  /* Code area */
  & > code {
    background: var(--color-surface-3);
  }

  /* Copy button (absolute over the top-end of the wrapper) */
  & > button.copy {
    background: transparent;
    border-radius: 0;
  }

  /* Expand and collapse toggle (full-width, bottom row) */
  & > button.expand {
    background: var(--color-surface-2);
  }
}
```