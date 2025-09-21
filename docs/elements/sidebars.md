# Sidebars

---

## Setup

Sidebar styles are included in Indux CSS, or as standalone stylesheets.

<x-code-group copy>

```html "Indux CSS"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.css" />
</head>
```

```html "Standalone"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.theme.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.utilities.css" />
</head>
```

</x-code-group>

::: brand icon="lucide:info"
Browser versions from 2023 and earlier require a polyfill script like <a href="https://github.com/oddbird/popover-polyfill" target="_blank">OddBird</a> to mimic HTML popover behaviour.
:::

---

## Default

Sidebars are supported in pure HTML using the `<aside>` element as a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API" target="_blank">popover</a>. The `<button>` that opens the sidebar requires the `popovertarget="ID"` attribute, matching the aside ID.

::: frame
<button popovertarget="sidebar-default-preview">Open Sidebar</button>
<aside popover id="sidebar-default-preview" class="col gap-4">
    <span class="h4">Sidebar</span>
    <p>This sidebar slides in from the right by default.</p>
</aside>
:::

```html copy
<button popovertarget="sidebar-default">Open Sidebar</button>
<aside popover id="sidebar-default" class="col gap-4">
    <h4>Sidebar</h4>
    <p>This sidebar slides in from the right by default.</p>
</aside>
```

---

## Positioning

By default, sidebars slide in from the inline-end (right in LTR, left in RTL). Add the `start` class to make the sidebar originate from the inline-start (left in LTR, right in RTL).

::: frame
<button popovertarget="sidebar-start-preview">Open Start Sidebar</button>
<aside popover id="sidebar-start-preview" class="start col gap-4">
    <span class="h4">Start Sidebar</span>
    <p>This sidebar slides in from the left in LTR screens.</p>
</aside>
:::

```html copy
<button popovertarget="sidebar-start">Open Start Sidebar</button>

<aside popover id="sidebar-start" class="start col gap-4">
    <h4>Start Sidebar</h4>
    <p>This sidebar slides in from the left in LTR screens.</p>
</aside>
```

---

## Styles

### Theme

Default sidebars use the following [theme](/styles/theme) variables:

| Variable | Purpose |
|----------|----------|
| `--color-popover-surface` | Sidebar background color |
| `--spacing` | Sidebar padding and gaps |
| `--spacing-content-width` | Maximum content width |

---

### Customization

Sidebars can be modified with custom CSS and/or utility classes.

::: frame
<button popovertarget="sidebar-custom-preview">Custom Sidebar</button>
<aside popover id="sidebar-custom-preview" class="w-80 bg-brand-surface">
    <div class="p-4">
        <span class="h4 text-brand-inverse">Custom Styled</span>
        <p class="text-brand-inverse">This sidebar has custom width and colors.</p>
    </div>
</aside>
:::

```html copy
<button popovertarget="sidebar-custom">Custom Sidebar</button>

<aside popover id="sidebar-custom" class="w-80 bg-brand-surface">
    <div class="p-4">
        <h4 class="text-brand-inverse">Custom Styled</h4>
        <p class="text-brand-inverse">This sidebar has custom width and colors.</p>
    </div>
</aside>
```

---

### Transitions

Sidebars use custom transform animations for sliding effects. Opacity and scale are set to overwrite defaults in [reset styles](/styles/reset).

```css
aside[popover] {
    transition: opacity .15s ease-in, transform .15s ease-in, display .15s ease-in;
    transition-behavior: allow-discrete;

    /* Opening state - slide in from inline-end */
    @starting-style {
        transform: translateX(100%);
        opacity: 1;
        scale: 1;
    }

    /* Closing state - slide out to inline-end */
    &:not(:popover-open) {
        transform: translateX(100%);
        opacity: 1;
        scale: 1;
    }

    /* RTL support - slide from left in RTL context */
    [dir="rtl"] & {
        @starting-style {
            transform: translateX(-100%);
        }

        &:not(:popover-open) {
            transform: translateX(-100%);
        }
    }

    /* Modifier class to originate sidebar from inline-start */
    &.start {

        @starting-style {
            transform: translateX(-100%);
        }

        &:not(:popover-open) {
            transform: translateX(-100%);
        }
    }
}
```

::: brand icon="lucide:info"
Modifying `display` properties can result in popovers not working properly.
Remember to update `transition` with any new properties.
:::