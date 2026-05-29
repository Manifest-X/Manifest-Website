# Accordions

Collapsible content panels that expand on demand.

---

## Setup

Accordion styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.accordion.css" />
```

</div>

---

## Default

<div x-code-group>

```html copy
<details>
    <summary>Accordion Item</summary>
    <p>This is the accordion content that can be expanded and collapsed by clicking the summary.</p>
</details>
```

::: frame h-fit text-base
<details>
    <summary>Accordion Item</summary>
    <p>This is the accordion content that can be expanded and collapsed by clicking the summary.</p>
</details>
:::

</div>

Accordions use the native HTML `<details>` element with custom styling. The `<summary>` acts as the clickable header, and any elements below it are shown/hidden when toggled.

---

## Multiple Items

Multiple accordions can be stacked one after the other. To make them part of the same series where only one can be open at a time, add `name` attributes with matching values.

<div x-code-group>

```html copy
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

::: frame col h-fit text-base
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

</div>

---

## Open by Default

Add the `open` attribute to accordions that should be open on page load.

<div x-code-group>

```html copy
<details open>
    <summary>Pre-opened Item</summary>
    <p>This accordion item starts in the open state.</p>
</details>
<details>
    <summary>Closed Item</summary>
    <p>This accordion item starts closed.</p>
</details>
```

::: frame col h-fit text-base
<details open>
    <summary>Pre-opened Item</summary>
    <p>This accordion item starts in the open state.</p>
</details>
<details>
    <summary>Closed Item</summary>
    <p>This accordion item starts closed.</p>
</details>
:::

</div>

---

## Styles

### Theme

Default accordions use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-content-stark`{copy} | Summary text color |
| `--color-field-surface`{copy} | Icon background color |
| `--color-field-inverse`{copy} | Icon color |
| `--spacing-field-padding`{copy} | Content padding |
| `--spacing`{copy} | Summary margin when open |
| `--transition`{copy} | Transition for interactive states |

---

### Icon

The accordion icon is an encoded SVG in the accordion style's `--icon-accordion` variable. To modify it:

1. Choose a desired icon from <a href="https://icon-sets.iconify.design/" target="_blank" rel="noopener">Iconify</a> or other SVG icon source.
2. Copy the encoded SVG string (in Iconify, go to an icon's CSS tab and find the <code>--svg</code> value). Otherwise, use an <a href="https://yoksel.github.io/url-encoder/" target="_blank" rel="noopener">SVG encoder</a>.
3. Overwrite the `--icon-accordion` variable value with the encoded SVG string.

```css "Default chevron icon" copy
:root {
    --icon-accordion: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'%3E%3Cpath fill='%23000' d='m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17'/%3E%3C/svg%3E")
}
```

---

### Customization

Modify base accordion styles with custom CSS for the `<details>` selector.

<div x-code-group>

```css copy
details.custom {
    padding: 2px;
    background-color: var(--color-surface-3);
    
    & summary {
        padding: 0 1rem;
        font-weight: regular;
    }

    & summary + * {
        margin-top: 1rem;
        padding: 1rem;
        background-color: var(--color-page);
    }
}
```

::: frame text-base
<style>
details.custom {
    padding: 2px;
    background-color: var(--color-surface-3);
    
    & summary {
        padding: 0 1rem;
        font-weight: regular;
    }

    & summary + * {
        margin-top: 1rem;
        padding: 1rem;
        background-color: var(--color-page);
    }
}
</style>

<details class="custom">
    <summary>Custom Accordion</summary>
    <p>This is an accordion with custom styles.</p>
</details>
:::

</div>