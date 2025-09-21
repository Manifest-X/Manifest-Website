# Avatars

---

## Setup

Avatar styles are included in Indux CSS, or a standalone stylesheet.

<x-code-group copy>

```html "Indux CSS"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.css" />
</head>
```

```html "Standalone"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.theme.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.avatar.css" />
</head>
```

</x-code-group>

---

## Default

The `avatar` class allows an element to display an icon, text, or a profile pic.

::: frame
<div class="avatar" x-icon="lucide:user"></div>
<div class="avatar">W</div>
<div class="avatar bg-[url(/assets/examples/user.jpg)]"></div>
<div class="avatar"><span>W</span><img src="/assets/examples/user.jpg"></div>
<div class="avatar"><figure></figure><span>W</span><img src="/assets/examples/user.jpg"></div>
:::

```html copy
<!-- Icon -->
<div class="avatar" x-icon="lucide:user"></div>

<!-- Initial -->
<div class="avatar">W</div>

<!-- Background image -->
<div class="avatar bg-[url(/assets/examples/user.jpg)]"></div>

<!-- Initials and/or profile image -->
<div class="avatar">
    <span>W</span>
    <img src="/assets/examples/user.jpg">
</div>

<!-- With status indicator -->
<div class="avatar">
    <figure></figure>
    <span>W</span>
    <img src="/assets/examples/user.jpg">
</div>
```

To display text or icon by default while supporting an optional profile pic, use nested `span` and `img` tags. If an image is present it will render overtop the text or icon. Add a `figure` tag for a coloured status indicator.

---

## Interactive

Buttons accept the `avatar` class and can be used to trigger an action like opening a [dropdown](/elements/dropdowns) or [modal](/elements/modals).

::: frame
<button class="avatar" x-icon="lucide:user"></button>
<button class="avatar">W</button>
<button class="avatar bg-[url(/assets/examples/user.jpg)]"></button>
<button class="avatar"><span>W</span><img src="/assets/examples/user.jpg"></button>
:::

```html copy
<!-- Icon -->
<button class="avatar" x-icon="lucide:user"></button>

<!-- Initial -->
<button class="avatar">W</button>

<!-- Background image -->
<button class="avatar bg-[url(/assets/examples/user.jpg)]"></button>

<!-- Initials and/or profile image -->
<button class="avatar">
    <span>W</span>
    <img src="/assets/examples/user.jpg">
</button>
```

---

## Wide

The `avatar-wide` container class displays a nested avatar alongside additional content.

::: frame
<div class="avatar-wide">
    <div class="avatar">W</div>
    <span>wesley@acme.com</span>
</div>

<button class="avatar-wide ghost">
    <span class="avatar">W</span>
    <div class="col items-start">
        <span class="text-sm text-content-neutral font-semibold">wesley@acme.com</span>
        <span class="text-xs text-content-subtle -mt-0.5">Superadmin</span>
    </div>
</button>
:::

```html copy
<!-- Static wide avatar -->
<div class="avatar-wide">
    <div class="avatar">W</div>
    <span>wesley@acme.com</span>
</div>

<!-- Interactive wide avatar -->
<button class="avatar-wide ghost">
    <span class="avatar">W</span>
    <div class="col items-start">
        <span class="text-sm text-content-neutral font-semibold">wesley@acme.com</span>
        <span class="text-xs text-content-subtle -mt-0.5">Superadmin</span>
    </div>
</button>
```

Within the `avatar-wide` container, all elements besides `avatar` rely on custom styles.

---

## Utilities

Avatars accept Indux [utility](/styles/utilities) classes, which can be stacked in any combination.

### Colors
::: frame
<div class="avatar brand">W</div>
<div class="avatar accent">W</div>
<div class="avatar positive">W</div>
<div class="avatar negative">W</div>
:::

```html copy
<!-- Brand variant -->
<div class="avatar brand">W</div>

<!-- Accent variant -->
<div class="avatar accent">W</div>

<!-- Positive variant -->
<div class="avatar positive">W</div>

<!-- Negative variant -->
<div class="avatar negative">W</div>
```

#### Status Indicators

Color classes also modify the status indicators.

::: frame
<div class="avatar">
    <span>W</span>
    <figure class="positive"></figure>
</div>
<div class="avatar">
    <span>W</span>
    <figure class="negative"></figure>
</div>
<div class="avatar">
    <span>W</span>
    <figure class="brand"></figure>
</div>
<div class="avatar">
    <span>W</span>
    <figure class="accent"></figure>
</div>
:::

```html copy
<!-- Brand variant -->
<div class="avatar">
    <span>W</span>
    <figure class="positive"></figure>
</div>

<!-- Accent variant -->
<div class="avatar">
    <span>W</span>
    <figure class="negative"></figure>
</div>

<!-- Positive variant -->
<div class="avatar">
    <span>W</span>
    <figure class="brand"></figure>
</div>

<!-- Negative variant -->
<div class="avatar">
    <span>W</span>
    <figure class="accent"></figure>
</div>
```

---

### Size
::: frame
<div class="avatar sm">W</div>
<div class="avatar">W</div>
<div class="avatar lg">W</div>
:::

```html copy
<!-- Small variant -->
<div class="avatar sm">W</div>

<!-- Default size -->
<div class="avatar">W</div>

<!-- Large variant -->
<div class="avatar lg">W</div>
```

---

### Appearance
::: frame
<button class="avatar ghost">W</button>
<button class="avatar outlined">W</button>
<button class="avatar transparent">W</button>
:::

```html copy
<!-- No background until hover -->
<button class="avatar ghost">W</button>

<!-- Border included -->
<button class="avatar outlined">W</button>

<!-- No background at all -->
<button class="avatar transparent">W</button>
```

---

## Groups

Horizontally group avatars together with a `role="group"` attribute added to the parent container.

::: frame !bg-page
<div role="group">
    <div class="avatar">X</div>
    <div class="avatar">Y</div>
    <div class="avatar">Z</div>
</div>
:::

```html copy
<div role="group">
    <div class="avatar">X</div>
    <div class="avatar">Y</div>
    <div class="avatar">Z</div>
</div>
```

Grouped avatars are given a bunching effect with negative margins.

---

## Theme

Default avatars use the following [theme](/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface` | Avatar background color |
| `--color-field-surface-hover` | Button avatar hover/active background color |
| `--color-field-inverse` | Avatar text color |
| `--spacing-field-height` | Avatar width and height |
| `--radius` | Border radius for avatar corners |
| `--transition` | Transition for interactive states |

---

## Styles

Modify avatar styles with custom CSS.

::: frame
<style>
.avatar-custom {
    border-radius: 50%;
    outline: 1px solid blue;
    outline-offset: 1px;
}
</style>
<button class="avatar avatar-custom">W</button>
:::

```css copy
.avatar {
    border-radius: 50%;
    outline: 1px solid blue;
    outline-offset: 1px;
}
```