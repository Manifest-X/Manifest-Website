# Code Blocks

---

## Setup

Code blocks are supported by an Alpine plugin, available on its own or as part of Indux bundles.

<x-code-group copy>

```html "Standalone"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux code blocks plugin -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.code.js"></script>
```

```html "Indux JS"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux JS -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.js"></script>
```

```html "Quickstart"
<!-- Indux JS, Alpine, and Tailwind combined -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.quickstart.js"></script>
```

</x-code-group>

Code block styles are included in Indux CSS, or as standalone stylesheets.

<x-code-group copy>

```html "Indux CSS"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.css" />
</head>
```

```html "Standalone"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.theme.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.code.css" />
</head>
```

</x-code-group>

---

## Default

Use the `<x-code>` custom element for syntax highlighting:

::: frame
<x-code language="javascript">
function hello() {
  console.log('Hello, World!');
  return true;
}
</x-code>
:::

```html copy
<x-code language="javascript">
function hello() {
  console.log('Hello, World!');
  return true;
}
</x-code>
```

The code block plugin uses <a href="https://highlightjs.org" target="_blank">highlight.js</a>, which is automatically loaded from its CDN when an `x-code` directive is encountered in the current view.

See the [markdown](/plugins/markdown) plugin for how ``` represents `x-code` tags in markdown files.

---

## Attributes

::: frame
<x-code language="javascript" title="Function" numbers copy>
function hello() {
  console.log('Hello, World!');
  return true;
}</x-code>
:::

```html copy
<x-code language="javascript" title="Function" numbers copy>
function hello() {
  console.log('Hello, World!');
  return true;
}
</x-code>
```

`x-code` tags support the following attributes:
- `language` - specifies syntax highlighting from the <a href="https://highlightjs.readthedocs.io/en/latest/supported-languages.html" target="_blank">highlight.js</a> library.
- `title` - adds a header with title to the block.
- `numbers` - adds line numbers.
- `copy` - adds a button for users to copy the code snippet.

---

## Code Groups

Group multiple code blocks with tabs using `<x-code-group>`:

::: frame
<x-code-group numbers copy>

<x-code language="html" name="HTML"><div class="container">
  <h1>Hello World</h1>
</div></x-code>

<x-code language="css" name="CSS">
.container {
  display: flex;
  justify-content: center;
}
</x-code>

<x-code language="javascript" name="JavaScript">
function hello() {
  console.log('Hello, World!');
}
</x-code>

</x-code-group>
:::

```html numbers copy
<!-- Group -->
<x-code-group numbers copy>

  <!-- Snippet tab -->
  <x-code language="html" name="HTML">
  <div class="container">
    <h1>Hello World</h1>
  </div>
  </x-code>

  <!-- Snippet tab -->
  <x-code language="css" name="CSS">
  .container {
    display: flex;
    justify-content: center;
  }
  </x-code>

  <!-- Snippet tab -->
  <x-code language="javascript" name="JavaScript">
  function hello() {
    console.log('Hello, World!');
  }
  </x-code>

</x-code-group>
```

The `numbers` and `copy` attributes can be added to the `x-code-group` tag and will apply to all tabs.

---

## Theme

Default code blocks use the following [theme](/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface` | Code block background |
| `--color-content-stark` | Default text color |
| `--spacing-field-padding` | Content padding |
| `--radius` | Border radius |

Additional text color variables like `--color-code-keyword` for syntax highlighting are found with code block styles.

---

## Copy Icons

`--icon-copy-code` and `--icon-copied-code` are variables with encoded SVGs, found in code block styles. To modify them:

1. Choose a desired icon from [Iconify](https://icon-sets.iconify.design/) or other SVG icon source.
2. Copy the encoded SVG string (in Iconify, go to an icon's CSS tab and find the `--svg` value). Otherwise, use an [SVG encoder](https://yoksel.github.io/url-encoder/).
3. Overwrite the `--icon-copy-code` or `--icon-copied-code` variable value with the encoded SVG string.

```css "Default icons" copy
:root {
  --icon-copy-code: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Crect width='14' height='14' x='8' y='8' rx='2' ry='2'/%3E%3Cpath d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'/%3E%3C/g%3E%3C/svg%3E");
  --icon-copied-code: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M20 6L9 17l-5-5'/%3E%3C/svg%3E");
}
```

---

## Styles

Code block styles can be modified with custom CSS.

### Syntax Colors

Override syntax highlighting colors with CSS custom properties:

```css copy
:root {
    --color-code-keyword: #ff6b6b;
    --color-code-string: #4ecdc4;
    --color-code-comment: #95a5a6;
}
```

The full list of colors can be found in the default code block styles.

---

### Block Appearance

Customize the appearance of code blocks and their nested elements:

```css copy
x-code-group, x-code, [x-code] {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Title header */
  & > .header {
    background: #f8f9fa;

    /* Tab buttons */
    & button[role="tab"] {
    
      /* Selected tab */
      &.selected {
        background: blue;

        /* Underline */*
        &::after {
          background-color: blue;
        }
      }
    }
  }

  /* Line numbers */
  & .lines {
    color: #6c757d;
  }

  /* Copy button */
  & .copy {
    background: #007bff;
  }
}
```