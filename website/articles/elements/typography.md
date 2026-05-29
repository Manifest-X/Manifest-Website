# Typography

Heading, paragraph, and inline text styling.

---

## Setup

Typography styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.typography.css" />
```

</div>

---

## Block Text

<div x-code-group>

```html copy
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<p>Paragraph. Lorem ipsum dolor sit amet.</p>
<small>Small text. Lorem ipsum dolor sit amet.</small>
<figcaption>Caption. Lorem ipsum dolor sit amet.</figcaption>
<ul>
    <li>List item. Lorem ipsum dolor sit amet.</li>
    <li>List item. Lorem ipsum dolor sit amet.</li>
</ul>
<ol>
    <li>List item. Lorem ipsum dolor sit amet.</li>
    <li>List item. Lorem ipsum dolor sit amet.</li>
</ol>
<blockquote>Blockquote. Lorem ipsum dolor sit amet.</blockquote>
```

::: frame col gap-3 text-base
<span class="h1">Heading 1 style</span>
<span class="h2">Heading 2 style</span>
<span class="h3">Heading 3 style</span>
<span class="h4">Heading 4 style</span>
<span class="h5">Heading 5 style</span>
<span class="h6">Heading 6 style</span>
<p>Paragraph. Lorem ipsum dolor sit amet.</p>
<small>Small text. Lorem ipsum dolor sit amet.</small>
<figcaption>Caption. Lorem ipsum dolor sit amet.</figcaption>
<ul>
    <li>List item. Lorem ipsum dolor sit amet.</li>
    <li>List item. Lorem ipsum dolor sit amet.</li>
</ul>
<ol>
    <li>List item. Lorem ipsum dolor sit amet.</li>
    <li>List item. Lorem ipsum dolor sit amet.</li>
</ol>
<blockquote>Blockquote. Lorem ipsum dolor sit amet.</blockquote>
:::

</div>

See [code blocks](/docs/elements/code) for use of the `<pre>` element.

---

## Inline Text
<div x-code-group>

```html copy
<p>Text can be <b>bold</b> or <strong>strong</strong>.</p>
<p>It can also be <i>italic</i> or <em>emphasized</em>.</p>
<p>Text often contains <a href="#">inline links</a>.</p>
<p>Inline <code>code</code> and keyboard tags like <kbd>SHIFT</kbd><kbd>⌘</kbd><kbd>Z</kbd> are handy.</p>
```

::: frame col gap-3 text-base
<p>Text can be <b>bold</b> or <strong>strong</strong>.</p>
<p>It can also be <i>italic</i> or <em>emphasized</em>.</p>
<p>Text often contains <a href="#">inline links</a>.</p>
<p>Inline <code>code</code> and keyboard tags like <kbd>SHIFT</kbd><kbd>⌘</kbd><kbd>Z</kbd> are handy.</p>
:::

</div>

See [badges](/docs/elements/badges) for use of the `<mark>` tag.

---

## Lists

List styles are carefully styled to keep markers aligned with content above and below, rather than default browser behaviour where they float outside.

<div x-code-group>

```html copy
<ul>
    <li>First level item
        <ul>
            <li>Second level item</li>
            <li>Another second level</li>
            <ol>
                <li>Third level ordered</li>
                <li>Another third level</li>
            </ol>
        </ul>
    </li>
    <li>Another first level</li>
</ul>
```

::: frame !block text-base
<p>This is a preceding paragraph.</p><br>
<ul>
    <li>First level item</li>
    <ul>
        <li>Second level item</li>
        <li>Another second level item</li>
        <ol>
            <li>Third level ordered item</li>
            <li>Another third level item</li>
        </ol>
    </ul>
    <li>Another first level item</li>
</ul><br>
<p>This is a following paragraph</p>
:::

</div>

### Icon Markers

List markers can be overwritten with inline [icons](/docs/elements/icons) using the `x-icon` attribute. The generated SVG is placed directly before any text content.

<div x-code-group>

```html copy
<ul>
    <li>Regular marker</li>
    <li x-icon="lucide:house">House icon marker</li>
    <li x-icon="lucide:heart">Heart icon marker</li>
    <li x-icon="lucide:check">Checkmark icon marker</li>
</ul>
```

::: frame text-base
<ul>
    <li>Regular marker</li>
    <li x-icon="lucide:house">House icon marker</li>
    <li x-icon="lucide:heart">Heart icon marker</li>
    <li x-icon="lucide:check">Check icon marker</li>
</ul>
:::

</div>

Depending on your icon library's baked-in padding, you may wish to adjust marker positioning. Override default CSS by adjusting the `top` and `left` properties:

```css copy
/* Target text lists while omitting nav and menu lists */
:where(ol):not(nav ol):not(menu ol),
:where(ul):not(nav ul):not(menu ul) {

    /* Target list items with the x-icon attribute */
    & li:has([x-icon]) {

        /* Target the generated icon marker */
        & [x-icon] {
            position: absolute;
            top: 0.45ch;
            left: -1.75ch;
        }
    }
}
```

---

## Utilities

Text elements accept [utility](/docs/styles/utilities) classes, which can be stacked in any combination.

### Elements

Utility classes named for a corresponding text element will apply that element's styles to any other.

| Class | Description |
|--------------|---------------------|
| `h1`{copy} | Heading 1 styles |
| `h2`{copy} | Heading 2 styles |
| `h3`{copy} | Heading 3 styles |
| `h4`{copy} | Heading 4 styles |
| `h5`{copy} | Heading 5 styles |
| `h6`{copy} | Heading 6 styles |
| `paragraph`{copy} | Paragraph styles |
| `small`{copy} | Small text styles |
| `caption`{copy} | Caption/figcaption styles |

<div x-code-group>

```html copy
<span class="h1">Heading 1 style</span>
<span class="h2">Heading 2 style</span>
<span class="h3">Heading 3 style</span>
<span class="h4">Heading 4 style</span>
<span class="h5">Heading 5 style</span>
<span class="h6">Heading 6 style</span>
<span class="paragraph">Paragraph style</span>
<span class="small">Small text style</span>
<span class="caption">Caption style</span>
```

::: frame col gap-3 text-base
These are all spans:
<span class="h1">Heading 1 style</span>
<span class="h2">Heading 2 style</span>
<span class="h3">Heading 3 style</span>
<span class="h4">Heading 4 style</span>
<span class="h5">Heading 5 style</span>
<span class="h6">Heading 6 style</span>
<span class="paragraph">Paragraph style</span>
<span class="small">Small text style</span>
<span class="caption">Caption style</span>
:::

</div>

---

### Colors

All text elements accept Manifest color utility classes, either directly or inherited from a parent.

#### Direct

<div x-code-group>

```html copy
<!-- Stark variant -->
<h3 class="stark">Lorem ipsum dolor sit amet.</h3>

<!-- Neutral variant -->
<h3 class="neutral">Lorem ipsum dolor sit amet.</h3>

<!-- Subtle variant -->
<h3 class="subtle">Lorem ipsum dolor sit amet.</h3>

<!-- Brand variant -->
<h3 class="brand">Lorem ipsum dolor sit amet.</h3>

<!-- Accent variant -->
<h3 class="accent">Lorem ipsum dolor sit amet.</h3>

<!-- Positive variant -->
<h3 class="positive">Lorem ipsum dolor sit amet.</h3>

<!-- Negative variant -->
<h3 class="negative">Lorem ipsum dolor sit amet.</h3>
```

::: frame col gap-3 text-base
<span class="h3 stark">Lorem ipsum dolor sit amet.</span>
<span class="h3 neutral">Lorem ipsum dolor sit amet.</span>
<span class="h3 subtle">Lorem ipsum dolor sit amet.</span>
<span class="h3 brand">Lorem ipsum dolor sit amet.</span>
<span class="h3 accent">Lorem ipsum dolor sit amet.</span>
<span class="h3 positive">Lorem ipsum dolor sit amet.</span>
<span class="h3 negative">Lorem ipsum dolor sit amet.</span>
:::

</div>

#### Inherited

<div x-code-group>

```html copy
<!-- Stark variant -->
<div class="stark">
    <h3>Lorem ipsum dolor sit amet.</h3>
</div>

<!-- Neutral variant -->
<div class="neutral">
    <h3>Lorem ipsum dolor sit amet.</h3>
</div>

<!-- Subtle variant -->
<div class="subtle">
    <h3>Lorem ipsum dolor sit amet.</h3>
</div>

<!-- Brand variant -->
<div class="brand">
    <h3>Lorem ipsum dolor sit amet.</h3>
</div>

<!-- Accent variant -->
<div class="accent">
    <h3>Lorem ipsum dolor sit amet.</h3>
</div>

<!-- Positive variant -->
<div class="positive">
    <h3>Lorem ipsum dolor sit amet.</h3>
</div>

<!-- Negative variant -->
<div class="negative">
    <h3>Lorem ipsum dolor sit amet.</h3>
</div>
```

::: frame col gap-3 text-base
<div class="h3 stark">
    <span>Lorem ipsum dolor sit amet.</span>
</div>
<div class="h3 neutral">
    <span>Lorem ipsum dolor sit amet.</span>
</div>
<div class="h3 subtle">
    <span>Lorem ipsum dolor sit amet.</span>
</div>
<div class="h3 brand">
    <span>Lorem ipsum dolor sit amet.</span>
</div>
<div class="h3 accent">
    <span>Lorem ipsum dolor sit amet.</span>
</div>
<div class="h3 positive">
    <span>Lorem ipsum dolor sit amet.</span>
</div>
<div class="h3 negative">
    <span>Lorem ipsum dolor sit amet.</span>
</div>
:::

</div>

---

## Styles

### Theme

Default text elements use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-content-stark`{copy} | High contrast text color |
| `--color-content-neutral`{copy} | Medium contrast text |
| `--color-content-subtle`{copy} | Low contrast text color |
| `--spacing`{copy} | Base spacing unit used for blockquote spacing |
| `--radius`{copy} | Border radius for inline code and kbd elements |
| `--transition`{copy} | Transition duration for link hover states |
| `--font-sans`{copy} | Sans-serif font stack applied to all elements by default |

---

### Fonts

The global font and text color is set in the [theme](/docs/styles/theme), with the default value being the user's system UI font or fallbacks. To apply a different font to individual text elements, use custom CSS to modify its `font-family` property (like in the Customization example below).

`<pre>` and `<code>` elements have a specialty font set by separate [code styles](/docs/elements/code#styles), and otherwise use the user's system monospace font or other fallbacks.

---

### Customization

Modify base text element styles with custom CSS for its respective selector.

<div x-code-group>

```css
h3 {
    font-family: Playfair Display, Abril Fatface;
    font-style: italic;
}
```

::: frame text-base
<style>
.h3.custom {
    font-family: Playfair Display, Abril Fatface;
    font-style: italic;
}
</style>

<span class="h3 custom">This is a custom h3 element.</span>
:::

</div>