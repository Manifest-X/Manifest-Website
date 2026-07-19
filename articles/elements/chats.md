# Chats

Conversation layouts with message bubbles, attachments, and input composers.

---

## Overview

Chat styles turn semantic HTML into a full conversation surface: a message log that stays pinned to the newest message, bubbles for your own messages, media attachments, and a composer that grows as you type. There are only two class names to learn. Add `chat-wrapper` to the container and `own` to the user's own messages, and everything else is styled through native elements and attributes.

The styles don't care where messages come from. They work with a static array, [local data](/docs/core-plugins/local-data), your own backend, or the [chat plugin](/docs/core-plugins/chat). The plugin renders nothing itself, so neither requires the other.

---

## Setup

Chat styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables. Remove buttons in the composer come from [form](/docs/elements/forms) styles.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.chat.css" />
```

</div>

---

## Default

The `chat-wrapper` class is a column shell that fills its container — give that container a bounded height, or the log has nothing to scroll inside. A conversation is three parts: a log, a message column, and a form.

<div x-code-group>

```html lines copy
<div class="chat-wrapper" x-data="{
    draft: '',
    messages: [
        { id: 1, own: false, text: 'The venue is booked for Friday 🎉' },
        { id: 2, own: true, text: 'Amazing — I\'ll bring the projector.' },
        { id: 3, own: false, text: 'Doors open at 7, come early if you can.' }
    ],
    send() {
        if (!this.draft.trim()) return;
        this.messages.push({ id: Date.now(), own: true, text: this.draft });
        this.draft = '';
    }
}">

    <!-- Message log -->
    <div role="log">
        <div>
            <template x-for="m in messages" :key="m.id">
                <div :class="m.own && 'own'" x-text="m.text"></div>
            </template>
        </div>
    </div>

    <!-- Composer -->
    <form class="bg-popover-surface border border-line focus-within:outlined rounded-lg" @submit.prevent="send()">
        <textarea class="transparent no-focus" placeholder="Message…" x-model="draft"
            @keydown.enter="if (!$event.shiftKey) { $event.preventDefault(); send() }"></textarea>
        <button type="submit" class="transparent" x-icon="lucide:corner-down-left" aria-label="Send"></button>
    </form>

</div>
```

::: frame h-112 p-0
<div class="chat-wrapper" x-data="{
    draft: '',
    messages: [
        { id: 1, own: false, text: 'The venue is booked for Friday 🎉' },
        { id: 2, own: true, text: 'Amazing — I\'ll bring the projector.' },
        { id: 3, own: false, text: 'Doors open at 7, come early if you can.' }
    ],
    send() {
        if (!this.draft.trim()) return;
        this.messages.push({ id: Date.now(), own: true, text: this.draft });
        this.draft = '';
    }
}">
    <div role="log">
        <div>
            <template x-for="m in messages" :key="m.id">
                <div :class="m.own && 'own'" x-text="m.text"></div>
            </template>
        </div>
    </div>
    <form class="bg-popover-surface border border-line focus-within:outlined rounded-lg" @submit.prevent="send()">
        <textarea class="transparent no-focus" placeholder="Message…" x-model="draft"
            @keydown.enter="if (!$event.shiftKey) { $event.preventDefault(); send() }"></textarea>
        <button type="submit" class="transparent me-1 mb-1" x-icon="lucide:corner-down-left" aria-label="Send"></button>
    </form>
</div>
:::

</div>

Send a few messages: the log stays pinned to the newest one, and multi-line drafts grow the composer without hiding it. The form's surface classes are yours to choose — the chat styles handle layout, not the field's look.

---

## Message Log

`role="log"` is the correct ARIA role for a chat history — assistive tech announces new entries as they arrive — and the styles use the same attribute as their hook. The log is the scroll container; the `<div>` inside it is the message column, centered at the theme's content width.

Pinning is pure CSS: the log lays out in reverse column order, which browsers natively keep anchored to the end. That means no scroll-to-bottom JavaScript, new messages never yank the view while someone is reading history, and a growing composer shrinks the log from the top — the latest message stays visible.

```html copy
<div role="log">
    <div>
        <!-- messages -->
    </div>
</div>
```

---

## Messages

Messages are plain elements inside the column — one `<div>` per message is typical. Paragraph spacing is tuned for rendered [markdown](/docs/core-plugins/markdown). Add the `own` class to the current user's messages: they become right-aligned, fit-content bubbles on a surface tint.

```html copy
<template x-for="m in messages" :key="m.id">
    <div :class="m.own && 'own'" x-markdown.safe="m.text"></div>
</template>
```

With the [Chat plugin](/docs/core-plugins/chat), the condition compares the author to the conversation's identity:

```html copy
<div :class="m.author?.id === chat.me?.id && 'own'"></div>
```

`own` is a reserved name inside `chat-wrapper` — the styles are scoped to the log, so the class won't leak elsewhere, but avoid defining your own global `.own` rules that would fight it.

---

## Attachments

Media inside a message is styled by element: images and videos are capped to a comfortable reading size, audio players get a fixed width, and a link with the `download` attribute renders as a file chip.

<div x-code-group>

```html copy
<div class="own">
    <img src="/assets/examples/user.jpg" alt="Profile photo">
    <a href="/assets/examples/user.jpg" download>
        <i x-icon="lucide:file"></i> photo.jpg
    </a>
</div>
```

::: frame h-80 p-0
<div class="chat-wrapper">
    <div role="log">
        <div>
            <div>Here's the headshot for the badge:</div>
            <div class="own">
                <img src="/assets/examples/user.jpg" alt="Profile photo">
                <a href="/assets/examples/user.jpg" download>
                    <i x-icon="lucide:file"></i> photo.jpg
                </a>
            </div>
        </div>
    </div>
</div>
:::

</div>

`<video>` and `<audio>` elements follow the same pattern — drop them inside the message and they're sized for the column.

---

## Composer

The chat form is a wrapping row aligned to the reading column. A textarea inside it flexes to fill the row and grows with its content (`field-sizing: content`), while buttons sit at the row's end. Two named buttons carry the conventions: `type="submit"` sends, and `name="attach"` triggers the file picker (see [forms](/docs/elements/forms) for name-based buttons).

Pending attachments live in an `<output>` element, the native element for showing the result of a user action. Screen readers announce its additions politely. Its children can be any elements: an `<img>` renders as a square thumbnail, a `<span>` as a file chip, and each can carry a [remove button](/docs/elements/forms#remove-buttons).

Placement is flexible. The strip and the buttons are styled anywhere inside `chat-wrapper`, so the strip can sit inside the form or just above it as a sibling. Only the textarea needs to be inside the form, which is what lays out the composer row. A send button placed elsewhere still submits if you point it at the form with a `form="form-id"` attribute.

<div x-code-group>

```html lines copy
<form @submit.prevent="send()">

    <!-- Pending attachments -->
    <output x-show="files.length">
        <template x-for="(f, i) in files" :key="f.url">
            <div>
                <img x-show="f.kind === 'image'" :src="f.url" :alt="f.name" @error="f.kind = 'file'">
                <span x-show="f.kind !== 'image'"><i x-icon="lucide:file"></i> <span x-text="f.name"></span></span>
                <button type="button" name="remove" aria-label="Remove attachment" @click="remove(i)"></button>
            </div>
        </template>
    </output>

    <!-- File picker -->
    <input type="file" multiple x-ref="picker" hidden @change="add($event.target.files); $event.target.value = ''">
    <button type="button" name="attach" class="transparent" x-icon="lucide:paperclip" aria-label="Attach files" @click="$refs.picker.click()"></button>

    <!-- Draft -->
    <textarea class="transparent no-focus" placeholder="Message…" x-model="draft"></textarea>

    <!-- Send -->
    <button type="submit" class="transparent" x-icon="lucide:corner-down-left" aria-label="Send"></button>

</form>
```

::: frame p-0
<div class="chat-wrapper" x-data="{
    draft: '', files: [],
    add(list) {
        for (const f of [...list]) {
            const kind = /^image\/(png|jpe?g|gif|webp|avif|svg\+xml)$/.test(f.type) ? 'image' : 'file';
            this.files.push({ url: URL.createObjectURL(f), name: f.name, kind });
        }
    },
    remove(i) { URL.revokeObjectURL(this.files[i].url); this.files.splice(i, 1); }
}" style="height: auto">
    <form class="bg-popover-surface border border-line focus-within:outlined rounded-lg" @submit.prevent="draft = ''; files = []">
        <output x-show="files.length">
            <template x-for="(f, i) in files" :key="f.url">
                <div>
                    <img x-show="f.kind === 'image'" :src="f.url" :alt="f.name" @error="f.kind = 'file'">
                    <span x-show="f.kind !== 'image'"><i x-icon="lucide:file"></i> <span x-text="f.name"></span></span>
                    <button type="button" name="remove" aria-label="Remove attachment" @click="remove(i)"></button>
                </div>
            </template>
        </output>
        <input type="file" multiple x-ref="picker" hidden @change="add($event.target.files); $event.target.value = ''">
        <button type="button" name="attach" class="transparent ms-1 mb-1" x-icon="lucide:paperclip" aria-label="Attach files" @click="$refs.picker.click()"></button>
        <textarea class="transparent no-focus" placeholder="Attach some files…" x-model="draft"></textarea>
        <button type="submit" class="transparent me-1 mb-1" x-icon="lucide:corner-down-left" aria-label="Send"></button>
    </form>
</div>
:::

</div>

Only classify files as images when the browser can decode them (the demo's regex) and fall back on the `@error` event — otherwise an unsupported format like HEIC renders a broken thumbnail. If you're sending attachments to an AI model, the same check earns its keep twice: providers accept a similar short list of image formats.

---

## Styles

### Theme

Chat layouts use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--spacing-content-width`{copy} | Reading-column and composer width |
| `--color-surface-2`{copy} | Own-message bubble and file chips |
| `--radius`{copy} | Bubbles, media, and chip corners |
| `--spacing-field-height`{copy} | Composer minimum height and thumbnail size |
| `--shadow`{copy} | Wrapper shadow |
| `--transition`{copy} | Interactive states |

---

### Selectors

Everything inside the wrapper is addressed by element or attribute:

| Selector | Purpose |
|---|---|
| `.chat-wrapper` | Column shell; fills a bounded-height container |
| `[role="log"]` | Scrolling message log, natively pinned to the newest message |
| `[role="log"] > div` | Centered message column |
| `.own` | The current user's messages, right-aligned bubbles |
| `img`, `video`, `audio` | In-message media sizing |
| `a[download]` | File chip |
| `form` | Composer row at reading width |
| `textarea` | Growing draft field |
| `output` | Pending-attachments strip |
| `button[name="attach"]` | File picker trigger |
| `button[name="remove"]` | Floating dismiss affordance, from [form](/docs/elements/forms#remove-buttons) styles |

---

### Customization

Target any of the selectors above with custom CSS.

```css copy
.chat-wrapper {
    box-shadow: none;

    [role="log"] > div {
        gap: 1rem;
    }

    .own {
        background: var(--color-brand-surface);
        color: var(--color-brand-content);
    }
}
```