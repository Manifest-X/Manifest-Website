# Accordions

---

## Setup

Accordion styles are included in Indux CSS, or a standalone stylesheet.

<x-code-group copy>

```html "Indux CSS"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.css" />
</head>
```

```html "Standalone"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.theme.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.accordion.css" />
</head>
```

</x-code-group>

---

## Default

::: frame
<details>
    <summary>Accordion Item</summary>
    <p>This is the accordion content that can be expanded and collapsed by clicking the summary.</p>
</details>
:::

```html copy
<details>
    <summary>Accordion Item</summary>
    <p>This is the accordion content that can be expanded and collapsed by clicking the summary.</p>
</details>
```

Accordions use the native HTML `<details>` element with custom styling. The summary acts as the clickable header, and content below is shown/hidden when toggled.

---

## Multiple Items

Multiple accordions can be stacked one after the other. To make them part of the same series where only one can be open at a time, add `name` attributes with matching values.

::: frame col
<details name="faq">
    <summary>First Item</summary>
    <p>Content for the first accordion item.</p>
</details>
<details name="faq">
    <summary>Second Item</summary>
    <p>Content for the second accordion item.</p>
</details>
<details name="faq">
    <summary>Third Item</summary>
    <p>Content for the third accordion item.</p>
</details>
:::

```html copy numbers
<details name="faq">
    <summary>First Item</summary>
    <p>Content for the first accordion item.</p>
</details>
<details name="faq">
    <summary>Second Item</summary>
    <p>Content for the second accordion item.</p>
</details>
<details name="faq">
    <summary>Third Item</summary>
    <p>Content for the third accordion item.</p>
</details>
```

---

## Open by Default

Add the `open` attribute to accordions that should be open on page load.

::: frame col
<details open>
    <summary>Pre-opened Item</summary>
    <p>This accordion item starts in the open state.</p>
</details>
<details>
    <summary>Closed Item</summary>
    <p>This accordion item starts closed.</p>
</details>
:::

```html copy numbers
<details open>
    <summary>Pre-opened Item</summary>
    <p>This accordion item starts in the open state.</p>
</details>
<details>
    <summary>Closed Item</summary>
    <p>This accordion item starts closed.</p>
</details>
```

---

## Theme

Default accordions use the following [theme](/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-content-stark` | Summary text color |
| `--color-field-surface` | Icon background color |
| `--color-field-inverse` | Icon color |
| `--spacing-field-padding` | Content padding |
| `--spacing` | Summary margin when open |
| `--transition` | Transition for interactive states |

---

## Icon

The accordion icon is an encoded SVG in the accordion style's `--icon-accordion` variable. To modify it:

1. Choose a desired icon from [Iconify](https://icon-sets.iconify.design/) or other SVG icon source.
2. Copy the encoded SVG string (in Iconify, go to an icon's CSS tab and find the `--svg` value). Otherwise, use an [SVG encoder](https://yoksel.github.io/url-encoder/).
3. Overwrite the `--icon-accordion` variable value with the encoded SVG string.

```css "Default chevron icon" copy
:root {
    --icon-accordion: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'%3E%3Cpath fill='%23000' d='m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17'/%3E%3C/svg%3E")
}
```

---

## Remove Styles

Add the `unset` class to disable Indux styling and use the browser's default appearance.

::: frame
<details class="unset">
    <summary>Default Accordion</summary>
    <p>This accordion uses the browser's default styling.</p>
</details>
:::

```html copy
<details class="unset">
    <summary>Default Accordion</summary>
    <p>This accordion uses the browser's default styling.</p>
</details>
```
