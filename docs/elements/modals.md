# Modals

---

## Setup

Modal styles are included in Indux CSS, or a standalone stylesheet.

<x-code-group copy>

```html "Indux CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.theme.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.modal.css" />
```

</x-code-group>

---

## Default

Modals are supported in pure HTML using the `<dialog>` element as a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API" target="_blank">popover</a>. The `<button>` that opens the modal requires the `popovertarget="ID"` attribute, matching the dialog ID.

::: frame
<button popovertarget="modal-default-preview">Open Empty Modal</button>
<dialog popover id="modal-default-preview"></dialog>
:::

```html copy
<button popovertarget="modal-default">Open Empty Modal</button>
<dialog popover id="modal-default"></dialog>
```

::: brand icon="lucide:info"
Browser versions from 2023 and earlier require a polyfill script like <a href="https://github.com/oddbird/popover-polyfill" target="_blank">OddBird</a> to mimic HTML popover behaviour.
:::

---

## Light Dismiss

Popovers operate by default as lightboxes, and clicking anywhere outside the modal or pressing <kbd>esc</kbd> will close it, know as "light dismiss". Prevent this with the `popover="manual"` attribute.

::: frame
<button popovertarget="modal-manual-preview">Open Modal</button>
<dialog popover="manual" id="modal-manual-preview" class="col center gap-2">
    <p>Click outside, I dare you.<p>
    <button popovertarget="modal-manual-preview" popoveraction="hide">Close</button>
</dialog>
:::

```html copy
<button popovertarget="modal-manual-preview">Open Modal</button>
<dialog popover="manual" id="modal-manual-preview" class="col center gap-2">
    <p>Click outside, I dare you.<p>
    <button popovertarget="modal-manual-preview" popoveraction="hide">Close</button>
</dialog>
```

Manual popovers require internal close buttons, with a `popovertarget` ID'ing the dialog and `popoveraction="hide"` to close it.

---

## Layout

Use the `<header>`, `<main>`, and/or `<footer>` elements as direct children of the dialog element for a typical modal layout.

::: frame
<button popovertarget="modal-formatted">Open Formatted Modal</button>

<dialog popover id="modal-formatted">
    <header>
        <span class="h2">Modal Title</span>
        <button popovertarget="modal-formatted" aria-label="Close" x-icon="lucide:x"></button>
    </header>
    <main>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
    </main>
    <footer>
        <button popovertarget="modal-formatted">Cancel</button>
        <button popovertarget="modal-formatted" class="brand">Confirm</button>
    </footer>
</dialog>
:::

```html copy
<button popovertarget="modal-formatted">Open Formatted Modal</button>

<dialog popover id="modal-formatted">

    <header>
        <h2>Modal Title</h2>
        <button popovertarget="modal-formatted" aria-label="Close" x-icon="lucide:x"></button>
    </header>

    <main>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
    </main>

    <footer>
        <button popovertarget="modal-formatted">Cancel</button>
        <button popovertarget="modal-formatted" class="brand">Confirm</button>
    </footer>

</dialog>
```

The layout containers have default styles for padding, and the header will spread its content while the footer aligns it to the end.

---

## Nesting

Modals can open or close from each other in a visual stack. [Dropdowns](/plugins/dropdowns) are also popovers that can control modals and exist within them.

::: frame
<button popovertarget="modal-first">Open First Modal</button>

<!-- Open modal from dropdown -->
<button x-dropdown="dropdown-start">Dropdown</button>
<menu id="dropdown-start">
    <button popovertarget="modal-first">Open First Modal</button>
</menu>

<!-- First modal -->
<dialog popover id="modal-first">
    <header>
        <span class="h3">First Modal</span>
        <button popovertarget="modal-first" aria-label="Close" x-icon="lucide:x"></button>
    </header>
    <main>
        <p>This modal can open another.</p>
        <p>Dropdowns will close when a modal is opened.</p>
        <p>Buttons can be used to switch or close modals.</p>
    </main>
    <footer>
        <button popovertarget="modal-second">Open Second Modal</button>

        <!-- Nested Dropdown -->
        <button x-dropdown="dropdown-internal">Dropdown</button>
        <menu id="dropdown-internal">
            <button popovertarget="modal-second">Open Second Modal</button>
        </menu>
        <button popovertarget="modal-first">Close</button>
    </footer>
</dialog>

<!-- Nested second modal -->
<dialog popover id="modal-second">
    <header>
        <span class="h3">Second Modal</span>
        <button popovertarget="modal-second" aria-label="Close" x-icon="lucide:x"></button>
    </header>
    <main>
        <p>This modal opens above the first one. The Close All button targets the first modal, automatically closing both.</p>
    </main>
    <footer>
        <button popovertarget="modal-second" popoveraction="hide">Go Back</button>
        <button popovertarget="modal-first" popoveraction="hide">Close All</button>
    </footer>
</dialog>
:::

```html numbers copy
<button popovertarget="modal-first">Open First Modal</button>

<!-- Open modal from dropdown -->
<button x-dropdown="dropdown-start">Dropdown</button>
<menu id="dropdown-start">
    <button popovertarget="modal-first">Open First Modal</button>
</menu>

<!-- First modal -->
<dialog popover id="modal-first">
    <header>
        <h3>First Modal</h3>
        <button popovertarget="modal-first" aria-label="Close" x-icon="lucide:x"></button>
    </header>
    <main>
        <p>This modal can open another.</p>
        <p>Dropdowns will close when a modal is opened.</p>
        <p>Buttons can be used to switch or close modals.</p>
    </main>
    <footer>
        <button popovertarget="modal-second">Open Second Modal</button>

        <!-- Nested Dropdown -->
        <button x-dropdown="dropdown-internal">Dropdown</button>
        <menu id="dropdown-internal">
            <button popovertarget="modal-second">Open Second Modal</button>
        </menu>
        <button popovertarget="modal-first">Close</button>
    </footer>
</dialog>

<!-- Nested second modal -->
<dialog popover id="modal-second">
    <header>
        <h3>Second Modal</h3>
        <button popovertarget="modal-second" aria-label="Close" x-icon="lucide:x"></button>
    </header>
    <main>
        <p>This modal opens above the first one. The Close All button targets the first modal, automatically closing both.</p>
    </main>
    <footer>
        <button popovertarget="modal-second" popoveraction="hide">Go Back</button>
        <button popovertarget="modal-first" popoveraction="hide">Close All</button>
    </footer>
</dialog>
```

---

## Templating

HTML IDs must identify single elements on a page, and generating multiple modals in a <a href="https://alpinejs.dev/essentials/templating#looping-elements" target="_blank">template loop</a> requires each modal be assigned a unique ID. These can be generated with Alpine using template literals like `${i}`.

::: frame
<template x-for="i in 3" :key="i">
    <div">
        <button :popovertarget="`modal-template-${i}`" x-text="`Modal ${i}`"></button>
        <dialog popover :id="`modal-template-${i}`">
            <header>
                <span class="h3" x-text="`Template Modal ${i}`"></span>
                <button :popovertarget="`modal-template-${i}`" aria-label="Close" x-icon="lucide:x"></button>
            </header>
            <main>
                <p x-text="`This is modal number ${i} generated from a template.`"></p>
            </main>
            <footer>
                <button :popovertarget="`modal-template-${i}`">Close</button>
            </footer>
        </dialog>
    </div>
</template>
:::

```html numbers copy
<template x-for="i in 3" :key="i">

    <!-- Multiple elements need to be wrapped in a container, since template tags only recognize their first child. -->
    <div>

        <!-- Button template -->
        <button :popovertarget="`modal-template-${i}`" x-text="`Modal ${i}`"></button>
        
        <!-- Modal template -->
        <dialog popover :id="`modal-template-${i}`">
            <header>
                <h3 x-text="`Template Modal ${i}`"></h3>
                <button :popovertarget="`modal-template-${i}`" aria-label="Close" x-icon="lucide:x"></button>
            </header>
            <main>
                <p x-text="`This is modal number ${i} generated from a template.`"></p>
            </main>
            <footer>
                <button :popovertarget="`modal-template-${i}`">Close</button>
            </footer>
        </dialog>

    </div>

</template>
```

---

## Styles

### Theme

Default modals use the following [theme](/styles/theme) variables:

| Variable | Purpose |
|----------|----------|
| `--color-content-stark` | Modal text color |
| `--color-popover-surface` | Modal background color |
| `--radius` | Modal border radius (doubled for modals) |
| `--spacing` | Modal layout gaps and padding |

---

### Backdrop

Modal <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop" target="_blank">backdrops</a> (the light dismiss area) have arbitrary background colors with transparency. They can be styled with custom CSS in light and dark modes.

::: frame
<div>
<style>
dialog[popover].override::backdrop {
    background-color: rgba(255, 0, 0, 0.2);
}

/* Dark theme backdrop */
.dark dialog[popover].override::backdrop {
    background-color: rgba(0, 0, 255, 0.2);
}
</style>
<button popovertarget="modal-backdrop-preview">Open Custom Backdrop Modal</button>

<dialog popover id="modal-backdrop-preview" class="override"></dialog>
</div>
:::

```css copy
/* Light theme backdrop */
dialog[popover]::backdrop {
    background-color: rgba(255, 0, 0, 0.2);
}

/* Dark theme backdrop */
.dark dialog[popover]::backdrop {
    background-color: rgba(0, 0, 255, 0.2);
}
```

---

### Transitions

Default open/close transitions for all popovers—including modals—are defined in [reset](/styles/reset) styles. Override them with custom CSS.

<x-code-group numbers copy>

```css "All Popovers"
[popover] {
    display: none;
    transition: opacity .15s ease-in, scale .15s ease-in, display .15s ease-in;
    transition-behavior: allow-discrete;

    &:popover-open {
        display: flex
    }

    /* Opening state */
    @starting-style {
        scale: .9;
        opacity: 0
    }

    /* Closing state */
    &:not(:popover-open) {
        display: none !important;
        scale: 1;
        opacity: 0;
        transition-duration: .15s;
        transition-timing-function: ease-out
    }
}
```

```css "Modals Only"
dialog[popover] {
    display: none;
    transition: opacity .15s ease-in, scale .15s ease-in, display .15s ease-in;
    transition-behavior: allow-discrete;

    &:popover-open {
        display: flex
    }

    /* Opening state */
    @starting-style {
        scale: .9;
        opacity: 0
    }

    /* Closing state */
    &:not(:popover-open) {
        display: none !important;
        scale: 1;
        opacity: 0;
        transition-duration: .15s;
        transition-timing-function: ease-out
    }
}
```

</x-code-group>

::: brand icon="lucide:info"
Modifying `display` properties can result in popovers not working properly.
Remember to update `transition` with any new properties.
:::

---

### Tailwind CSS

If using Tailwind, individual modals can be customized with utility classes. Modals will automatically adjust their size and positioning based on content.

::: frame
<button popovertarget="modal-tailwind-preview">Custom Size & Position</button>
<dialog popover id="modal-tailwind-preview" class="w-96 h-80 mt-20">
    <header>
        <span class="h3">Tailwind Modal</span>
        <button popovertarget="modal-tailwind-preview" aria-label="Close" x-icon="lucide:x"></button>
    </header>
    <main>
        <p>This modal uses Tailwind utility classes for custom sizing and positioning.</p>
    </main>
    <footer>
        <button popovertarget="modal-tailwind-preview">Close</button>
    </footer>
</dialog>
:::

```html copy
<button popovertarget="modal-tailwind-preview">Custom Size & Position</button>
<dialog popover id="modal-tailwind-preview" class="w-96 h-80 mt-20">
    <header>
        <h3>Tailwind Modal</h3>
        <button popovertarget="modal-tailwind-preview" aria-label="Close" x-icon="lucide:x"></button>
    </header>
    <main>
        <p>This modal uses Tailwind utility classes for custom sizing and positioning.</p>
    </main>
    <footer>
        <button popovertarget="modal-tailwind-preview">Close</button>
    </footer>
</dialog>
```

---

### Customization

Modify base modal styles with custom CSS for the `dialog[popover]` selector.

::: frame
<style>
dialog[popover].custom {
    background-color: #f0f8ff;
    border: 2px solid #3b82f6;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
}

dialog[popover].custom::backdrop {
    background-color: rgba(59, 130, 246, 0.1);
}

dialog[popover].custom :where(header, main, footer) {
    padding: 2rem;
}
</style>

<button popovertarget="custom-modal-preview">Custom Modal</button>
<dialog popover id="custom-modal-preview" class="custom">
    <header>
        <span class="h3">Custom Modal</span>
        <button popovertarget="custom-modal-preview" aria-label="Close" x-icon="lucide:x"></button>
    </header>
    <main>
        <p>This modal has custom styling.</p>
    </main>
    <footer>
        <button popovertarget="custom-modal-preview">Close</button>
    </footer>
</dialog>
:::

```css copy
dialog[popover] {
    background-color: #f0f8ff;
    border: 2px solid #3b82f6;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);

    &::backdrop {
        background-color: rgba(59, 130, 246, 0.1);
    }

    & :where(header, main, footer) {
        padding: 2rem;
    }
}
```