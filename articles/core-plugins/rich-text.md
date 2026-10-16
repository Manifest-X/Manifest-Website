# Rich Text

A text field with formatting, built from your own markup and storing markdown.

---

## Overview

`x-rich-text` makes an element a text field that holds formatting: bold, headings, lists, links and more. Point it at a value and the field reads and writes it, as markdown by default. There's no built-in toolbar; any button, dropdown or input becomes a control with a command, so the toolbar looks like the rest of your page.

<div x-code-group>

```html copy
<div x-data="{ post: '## Hello\n\nSelect a word, then press **Bold**.' }">
    <div class="row gap-1">
        <button x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
        <button x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
        <button x-rich-text.h2 aria-label="Heading"><span x-icon="lucide:heading-2"></span></button>
        <button x-rich-text.ul aria-label="Bulleted list"><span x-icon="lucide:list"></span></button>
    </div>

    <div x-rich-text="post" aria-label="Post"></div>
    <pre x-text="post"></pre>
</div>
```

::: frame
<div x-data="{ post: '## Hello\n\nSelect a word, then press **Bold**.' }" class="col gap-2 w-full">
    <div class="row gap-1">
        <button class="ghost sm" x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
        <button class="ghost sm" x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
        <button class="ghost sm" x-rich-text.h2 aria-label="Heading"><span x-icon="lucide:heading-2"></span></button>
        <button class="ghost sm" x-rich-text.ul aria-label="Bulleted list"><span x-icon="lucide:list"></span></button>
    </div>
    <div x-rich-text="post" aria-label="Post"></div>
    <pre class="m-0 p-3 text-xs bg-surface-2 rounded whitespace-pre-wrap" x-text="post"></pre>
</div>
:::

</div>

The buttons stay disabled until the caret is in the field, then light up for the formatting under it. The box below the field is the stored value, updating as you type.

---

## Setup

Rich Text isn't in the default bundle. With the default plugins, or a `data-plugins` list starting with `+`, it loads by itself as soon as the page uses `x-rich-text` or `$rich`, including in components and markdown added later. A `data-plugins` list without `+` loads only what it names, so add `rich-text` to it. [Edit](/docs/framework/core-plugins/edit) loads Rich Text too, because page text is edited with it.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="rich-text,markdown"></script>
```

</div>

Until Rich Text has loaded, `$rich` reads as an empty field that does nothing, so an expression that uses it never throws; once it loads, bindings that read it run again.

Rich Text reads and writes markdown on its own. Showing a stored value as formatted text elsewhere on the page, as some examples here do, uses the [Markdown](/docs/framework/core-plugins/markdown) plugin's `x-markdown`, which is in the default bundle; a selective list needs `markdown` for that, as above.

Field and control styles are included in Manifest CSS or as a standalone stylesheet. Both reference [theme](/docs/framework/styles/theme) variables, such as the surface, line and brand colours fields and the style examples use, so load the theme stylesheet too.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.theme.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.theme.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.rich.text.css">
```

</div>

::: brand icon="lucide:info"
Rich Text was called Text Edit before. Its old names, `x-text-edit`, `$text` and the `text-edit` plugin name, aren't aliased: rename them to `x-rich-text`, `$rich` and `rich-text` when you upgrade.
:::

---

## Text Elements

A field stores its text in one of three formats, chosen by modifier. The value is a string in every case.

| Write | Stores | Formatting available |
|---|---|---|
| `x-rich-text="value"` | Markdown | What markdown can hold: bold, italics, strikethrough, code, links, images, headings, lists, quotes, code blocks and rules |
| `x-rich-text.html="value"` | HTML, cleaned of anything unsafe | Every command |
| `x-rich-text.plain="value"` | Plain text, with line breaks | None |

Type in each field below and watch what it stores.

<div x-code-group>

```html copy
<div x-data="{ md: 'A **bold** start', html: '<p>A <strong>bold</strong> start</p>', text: 'A plain start' }">
    <div x-rich-text="md" aria-label="Markdown"></div>
    <code x-text="md"></code>

    <div x-rich-text.html="html" aria-label="HTML"></div>
    <code x-text="html"></code>

    <div x-rich-text.plain="text" aria-label="Plain text"></div>
    <code x-text="text"></code>
</div>
```

::: frame
<div x-data="{ md: 'A **bold** start', html: '<p>A <strong>bold</strong> start</p>', text: 'A plain start' }" class="grid grid-cols-3 gap-3 w-full">
    <div class="col gap-2">
        <div x-rich-text="md" aria-label="Markdown" style="--rich-text-min-height: 5rem"></div>
        <code class="text-xs break-all" x-text="md"></code>
    </div>
    <div class="col gap-2">
        <div x-rich-text.html="html" aria-label="HTML" style="--rich-text-min-height: 5rem"></div>
        <code class="text-xs break-all" x-text="html"></code>
    </div>
    <div class="col gap-2">
        <div x-rich-text.plain="text" aria-label="Plain text" style="--rich-text-min-height: 5rem"></div>
        <code class="text-xs break-all" x-text="text"></code>
    </div>
</div>
:::

</div>

Without a value, as in `<div x-rich-text>`, the element's own markup is the starting content, empty paragraphs and figures included, and the element itself holds the result; read it with [`$rich`](#reference). Don't combine `x-rich-text` with `x-html` or `x-text` on the same element: both would write to it.

Each field gets `role="textbox"`; give it an `aria-label`, or a `<label>` that points to it, so screen readers can name it. `placeholder` shows while the field is empty.

### One-Line Fields

`.inline` makes a one-line field, for a title or a product name. Words can still be bold, italic or linked, but there are no paragraphs: Enter doesn't start a new line, and headings, lists and quotes aren't available. Pasted or dropped text with several lines is joined into one. Tab moves to the next field as usual.

Enter fires `rich-text:enter` on the field instead, with `detail.value` and `detail.shiftKey`, so you can treat it as submitting.

<div x-code-group>

```html copy
<div x-data="{ title: 'Spring *sale*', saved: '' }">
    <div x-rich-text.inline="title" aria-label="Title" @rich-text:enter="saved = $event.detail.value"></div>
    <p>Saved on Enter: <code x-text="saved"></code></p>
</div>
```

::: frame
<div x-data="{ title: 'Spring *sale*', saved: '' }" class="col gap-2 w-full">
    <div x-rich-text.inline="title" aria-label="Title" @rich-text:enter="saved = $event.detail.value"></div>
    <p class="m-0 text-sm">Saved on Enter: <code x-text="saved"></code></p>
</div>
:::

</div>

### Options

| Modifier | Effect |
|---|---|
| *(none)* | Markdown |
| `.html` | HTML |
| `.plain` | Plain text, no formatting |
| `.inline` | One line, as above; combines with any format |
| `.literal` | No [markdown shortcuts](#typing-markdown) while typing |
| `.autofocus` | Focus the field when it appears |

### Pasting

Pasting brings in the text and its structure, not the look of the page it came from. Colours, fonts, classes and inline styles are dropped, and scripts and other unsafe content never get in.

| Pasted into | Keeps |
|---|---|
| Markdown | Headings, paragraphs, lists, quotes, code, links, images, and the bold, italic, strikethrough and code marks. Other marks, such as underline or highlight, are dropped and their text kept. A table becomes one line per row with ` · ` between cells. Description lists, figures and addresses become paragraphs |
| HTML | Every tag a command can make, tables included |
| Plain text | The text, one line per line |
| One-line | The formatting its format allows, on one line |

Text without paragraphs of its own, such as a few copied words, goes in at the caret, inside the paragraph you're in. Pasting over a selection that spans paragraphs first deletes it as typing would: the paragraphs at either end join.

### Typing Markdown

Type markdown and it turns into formatting as you go. Marks turn over the moment you type the closing character, and what you type next is outside the mark; block shortcuts at the start of a line turn over when you press Enter. `.literal` turns this off, and `.plain` never does it.

<div x-code-group>

```html copy
<div x-data="{ draft: '' }">
    <div x-rich-text="draft" placeholder="Type ## Title and press Enter" aria-label="Draft"></div>
    <pre x-text="draft"></pre>
</div>
```

::: frame
<div x-data="{ draft: '' }" class="col gap-2 w-full">
    <div x-rich-text="draft" placeholder="Type ## Title and press Enter" aria-label="Draft" style="--rich-text-min-height: 6rem"></div>
    <pre class="m-0 p-3 text-xs bg-surface-2 rounded whitespace-pre-wrap" x-show="draft" x-text="draft"></pre>
</div>
:::

</div>

| Type | Get | When |
|---|---|---|
| `# ` to `###### ` | Heading 1 to 6 | Enter |
| `- ` `* ` `+ ` | Bulleted list | Enter |
| `1. ` | Numbered list | Enter |
| `[ ] ` `[x] ` | Task list item | Enter |
| `> ` | Quote | Enter |
| ` ``` ` | Code block | Enter |
| `---` `***` `___` | Rule | Enter |
| `**bold**` `__bold__` | Bold | Closing characters |
| `*italic*` | Italic | Closing `*` |
| `~~struck~~` | Strikethrough | Closing `~~` |
| `` `code` `` | Code | Closing `` ` `` |
| `[text](url)` | Link | Closing `)` |
| `![alt](src)` | Image | Closing `)` |

### Markdown Written Elsewhere

A markdown field reads and writes one subset of markdown, so markdown written by hand or by another tool can change when the field first saves it. The text is never lost, but its notation may be rewritten, or read as plain text:

| Written as | Shown as | Saved as |
|---|---|---|
| `* item` or `+ item` | A bulleted list | `- item` |
| `3. item` | A numbered list | `1. item`: lists are renumbered from 1 |
| A list nested by 2 spaces | One level, not nested | Nesting needs 4 spaces or a tab per level |
| `***` or `___` | A rule | `---` |
| ` ```js ` | A code block | ` ``` `: the language is dropped |
| `__bold__` or `_italic_` | The characters as typed | `\_\_bold\_\_`: underscores are escaped |
| Pipe tables, setext headings (`===` underlines), reference links, autolinks (`<https://…>`), links with a title | The characters as typed | The same text, with `[`, `]`, `<` and `>` escaped |
| Indented code | A paragraph | The text without its indentation |
| HTML tags | The tags as text | The tags with `<` and `>` escaped |
| Several blank lines | One gap | One blank line |

Characters that would otherwise read as formatting are escaped with a backslash when saved: `\ ` `` ` `` `*` `_` `~` `[` `]` `<` `>`, an `&` that starts an entity, and `#`, `-`, `+` or `1.` at the start of a line.

---

## Controls

Any element becomes a control with a command as its modifier: `x-rich-text.strong` bolds, `x-rich-text.h2` makes a heading. Commands are named after the HTML tag they make, plus a few for actions such as `undo` or `align`; [All Commands](#all-commands) lists every one.

A control acts on the field it [resolves to](#toolbars). It's disabled until the caret has been in that field, and whenever its command can't apply there, including while focus is in some other input or editor: in a `.plain` field, for a block command in a one-line field, or for an HTML-only command in a markdown field. Disabled controls get `aria-disabled="true"` rather than `disabled`, so a click on one doesn't take focus away from the field.

### Buttons

A button runs its command when clicked, without taking focus from the field, so the selection stays where it was. Inline commands toggle: Bold on bold text removes it. Block commands switch the block: Heading on a heading turns it back into a paragraph. The plugin sets `aria-pressed` and `data-rich-text-active` while the command is active at the caret.

<div x-code-group>

```html copy
<div x-data="{ note: 'Make *this* stand out.' }">
    <button x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
    <button x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
    <button x-rich-text.s aria-label="Strikethrough"><span x-icon="lucide:strikethrough"></span></button>
    <button x-rich-text.code aria-label="Code"><span x-icon="lucide:code"></span></button>

    <div x-rich-text="note" aria-label="Note"></div>
</div>
```

::: frame
<div x-data="{ note: 'Make *this* stand out.' }" class="col gap-2 w-full">
    <div class="row gap-1">
        <button class="ghost sm" x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
        <button class="ghost sm" x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
        <button class="ghost sm" x-rich-text.s aria-label="Strikethrough"><span x-icon="lucide:strikethrough"></span></button>
        <button class="ghost sm" x-rich-text.code aria-label="Code"><span x-icon="lucide:code"></span></button>
    </div>
    <div x-rich-text="note" aria-label="Note" style="--rich-text-min-height: 4rem"></div>
</div>
:::

</div>

Every icon-only button in these examples has an `aria-label`: an icon has no text, so without one a screen reader announces only "button", and the pressed state the plugin sets would have nothing to describe.

An inline command clicked with nothing selected is armed: the button shows it as active, and it applies to the characters you type next at that spot. Inside text that already has it, it ends there instead, so what you type next is plain. Moving the caret first cancels it.

After you click away from a field, its controls keep the selection it had: pressing one puts you back in the field and acts on that selection.

A button can also run a command from script with [`$rich`](#reference), as in `@click="$rich.strong()"`. A plain button takes focus when pressed, though, and with more than one field near it, `$rich` then can't tell which field you meant and does nothing. Add `@mousedown.prevent` so the click leaves focus in the field, or use a command modifier, which does that for you.

```html copy
<button @mousedown.prevent @click="$rich.strong(); $rich.em()">Bold italic</button>
```

### Dropdowns & Inputs

A `<select>` or `<input>` runs its command with its own value, when it changes or when you press Enter in it. It also shows the value at the caret: the block dropdown below reads Heading while the caret is in one. Choosing from a dropdown or a colour picker keeps the selection.

<div x-code-group>

```html copy
<div x-data="{ doc: '<p>Select some words, then pick a style.</p>' }">
    <select x-rich-text.block aria-label="Block">
        <option value="p">Paragraph</option>
        <option value="h2">Heading</option>
        <option value="blockquote">Quote</option>
    </select>
    <select x-rich-text.font aria-label="Font">
        <option value="">Default</option>
        <option value="Georgia">Georgia</option>
        <option value="ui-monospace">Mono</option>
    </select>
    <select x-rich-text.size aria-label="Size">
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="24">24</option>
    </select>
    <select x-rich-text.align aria-label="Align">
        <option value="start">Start</option>
        <option value="center">Center</option>
        <option value="end">End</option>
    </select>
    <input type="color" x-rich-text.color aria-label="Text colour">

    <div x-rich-text.html="doc" aria-label="Document"></div>
</div>
```

::: frame
<div x-data="{ doc: '<p>Select some words, then pick a style.</p>' }" class="col gap-2 w-full">
    <div class="row-wrap items-center gap-1">
        <select class="sm hug" x-rich-text.block aria-label="Block">
            <option value="p">Paragraph</option>
            <option value="h2">Heading</option>
            <option value="blockquote">Quote</option>
        </select>
        <select class="sm hug" x-rich-text.font aria-label="Font">
            <option value="">Default</option>
            <option value="Georgia">Georgia</option>
            <option value="ui-monospace">Mono</option>
        </select>
        <select class="sm hug" x-rich-text.size aria-label="Size">
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="24">24</option>
        </select>
        <select class="sm hug" x-rich-text.align aria-label="Align">
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
        </select>
        <input type="color" class="unstyle w-6 h-6 rounded border border-line" x-rich-text.color aria-label="Text colour">
    </div>
    <div x-rich-text.html="doc" aria-label="Document" style="--rich-text-min-height: 5rem"></div>
</div>
:::

</div>

A colour input recolours the selection live as you move through the picker, and the whole pass is one step of the history. Font, size and colour need a selection, and each wraps it in a `<span>` with that style. An empty value, like the Default font above, removes that style from the selection again, as [`clear`](#all-commands) does with all formatting. Alignment and line height apply to the block the caret is in.

A command that takes a value gets it from, in order: the modifier after the command, as in `x-rich-text.align.center` or `x-rich-text.table.3x2`; the control's expression, as in `x-rich-text.img="photoUrl"`; or a dropdown's or input's own value. The expression is read when the control runs.

| Command | Value |
|---|---|
| `align` | A `text-align` value: `start`, `center`, `end`, `justify`; `start` when none is given |
| `leading` | A `line-height` value, such as `1.6` or `2rem` |
| `font` | A `font-family` value |
| `size` | A number of pixels, or any CSS length such as `1.25rem` |
| `color`, `background` | Any CSS colour; a colour input gives `#rrggbb` |
| `a` | The address; see [Links](#links) |
| `img` | The source, or an array of source and alt text; a `data:` source must be a PNG, JPEG, GIF, WebP or AVIF image |
| `table` | Columns × rows: `3x2`, `[3, 2]`, or `3` for 3 × 3 |
| `abbr`, `dfn` | The `title`: the expansion or definition |
| `bdo` | The direction: `rtl` (default), `ltr` or `auto` |
| `data` | The machine-readable `value` |
| `time` | The `datetime` |
| `block` | A block tag name, such as `h2`, `blockquote` or `ul` |

### Toolbars

A toolbar is just controls grouped together, and each control finds its field on its own:

1. Inside an element with `x-rich-text-for="selector"`, the field that selector matches, or the field inside it.
2. Otherwise the nearest container that holds exactly one field.
3. Where a container holds several, the one last focused among them. With none of them focused, the controls stay disabled.

So a toolbar next to its field needs nothing more, and one toolbar can serve a whole page of fields, following whichever was last focused.

<div x-code-group>

```html copy
<div x-data="{ body: 'Write here, then use the toolbar.' }">
    <div role="toolbar" aria-label="Formatting">
        <select x-rich-text.block aria-label="Block">
            <option value="p">Paragraph</option>
            <option value="h2">Heading</option>
            <option value="h3">Subheading</option>
        </select>
        <button x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
        <button x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
        <button x-rich-text.ul aria-label="Bulleted list"><span x-icon="lucide:list"></span></button>
        <button x-rich-text.ol aria-label="Numbered list"><span x-icon="lucide:list-ordered"></span></button>
        <button x-rich-text.blockquote aria-label="Quote"><span x-icon="lucide:text-quote"></span></button>
        <button x-rich-text.undo aria-label="Undo"><span x-icon="lucide:undo-2"></span></button>
        <button x-rich-text.redo aria-label="Redo"><span x-icon="lucide:redo-2"></span></button>
    </div>
    <div x-rich-text="body" aria-label="Body"></div>
</div>
```

::: frame
<div x-data="{ body: 'Write here, then use the toolbar.' }" class="col gap-2 w-full">
    <div class="row-wrap items-center gap-1 p-1 border border-line rounded" role="toolbar" aria-label="Formatting">
        <select class="sm hug" x-rich-text.block aria-label="Block">
            <option value="p">Paragraph</option>
            <option value="h2">Heading</option>
            <option value="h3">Subheading</option>
        </select>
        <button class="ghost sm" x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
        <button class="ghost sm" x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
        <button class="ghost sm" x-rich-text.ul aria-label="Bulleted list"><span x-icon="lucide:list"></span></button>
        <button class="ghost sm" x-rich-text.ol aria-label="Numbered list"><span x-icon="lucide:list-ordered"></span></button>
        <button class="ghost sm" x-rich-text.blockquote aria-label="Quote"><span x-icon="lucide:text-quote"></span></button>
        <button class="ghost sm" x-rich-text.undo aria-label="Undo"><span x-icon="lucide:undo-2"></span></button>
        <button class="ghost sm" x-rich-text.redo aria-label="Redo"><span x-icon="lucide:redo-2"></span></button>
    </div>
    <div x-rich-text="body" aria-label="Body" style="--rich-text-min-height: 6rem"></div>
</div>
:::

</div>

While the caret is in some other editable element, an input or another editor, the controls disable themselves, so a page-wide toolbar never writes into the wrong place.

### Selection Menu

`x-rich-text-menu` on an element holding controls makes it a menu that appears over the selected text of its field, found the same way a toolbar finds it, and hides when the selection goes. It's shown as a popover, set to manual so the click that makes the selection doesn't close it, and it follows the selection as the page scrolls. The `unstyle` class keeps Manifest's [dropdown](/docs/framework/elements/dropdowns) styles off the menu, so its buttons sit in a row.

<div x-code-group>

```html copy
<div x-data="{ post: 'Select some of this text to see the menu.' }">
    <menu class="unstyle" x-rich-text-menu>
        <button x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
        <button x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
        <button x-rich-text.mark aria-label="Highlight"><span x-icon="lucide:highlighter"></span></button>
    </menu>
    <div x-rich-text.html="post" aria-label="Post"></div>
</div>
```

::: frame
<div x-data="{ post: 'Select some of this text to see the menu.' }" class="w-full">
    <menu class="unstyle" x-rich-text-menu>
        <button class="ghost sm" x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
        <button class="ghost sm" x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
        <button class="ghost sm" x-rich-text.mark aria-label="Highlight"><span x-icon="lucide:highlighter"></span></button>
    </menu>
    <div x-rich-text.html="post" aria-label="Post" style="--rich-text-min-height: 4rem"></div>
</div>
:::

</div>

To build a menu of your own, the same information is available directly. The field fires `rich-text:selection` whenever the selection changes, with `{ collapsed, text, x, y, width, height, top, right, bottom, left }`, or `null` when the field lets go of it. The numbers are pixels in viewport coordinates, as from `getBoundingClientRect()`, so they suit `position: fixed`. While text is selected, its box is also written as `--rich-text-selection-x`, `-y`, `-width`, `-height` and `-center` on `:root`, so anything can be positioned over the selection with CSS alone.

### All Commands

Commands are HTML tag names, so the name says what it makes. **Markdown** marks the commands a markdown field can store; the rest need `.html`.

**Text inside a line.** With text selected, these wrap it, or unwrap it when it already has the tag.

| Command | Makes | Markdown |
|---|---|---|
| `strong` | Strong importance, shown bold | Yes, as `**…**` |
| `b` | Bold, without extra importance | Yes, as `**…**`; reads back as `strong` |
| `em` | Emphasis, shown italic | Yes, as `*…*` |
| `i` | Italic, without emphasis, such as a term or a ship's name | Yes, as `*…*`; reads back as `em` |
| `s` | Strikethrough: no longer accurate | Yes, as `~~…~~` |
| `del` | Deleted text | Yes, as `~~…~~`; reads back as `s` |
| `code` | Code | Yes, as `` `…` `` |
| `u` | Underline | No |
| `mark` | Highlight | No |
| `small` | Small print, such as a side comment | No |
| `sub`, `sup` | Subscript, superscript | No |
| `kbd` | A key or keyboard input | No |
| `samp` | Sample output from a program | No |
| `var` | A variable | No |
| `cite` | The title of a work | No |
| `q` | A short quotation; the browser adds quotation marks | No |
| `ins` | Inserted text | No |
| `abbr` | An abbreviation; its value is the expansion, shown on hover | No |
| `dfn` | The term being defined; its value is the definition | No |
| `data` | A value with a machine-readable form; its value | No |
| `time` | A date or time; its value is the `datetime` | No |
| `bdi` | Text kept apart from the surrounding writing direction | No |
| `bdo` | Text forced into a writing direction; `rtl` by default | No |
| `span` | A plain wrapper with no meaning of its own | No |

**Inserted at the caret.**

| Command | Makes | Markdown |
|---|---|---|
| `a` | A link; see [Links](#links) | Yes |
| `unlink` | Removes the link at the caret | Yes |
| `br` | A line break within the block | Yes, as two spaces at the end of the line |
| `wbr` | A place a long word may break | No |
| `img` | An image | Yes |
| `hr` | A rule between blocks | Yes, as `---` |

**Blocks.** These change the block the caret is in. Pressing a block command again turns the block back into a paragraph.

| Command | Makes | Markdown |
|---|---|---|
| `p` | A paragraph | Yes |
| `h1` to `h6` | A heading, level 1 to 6 | Yes, as `#` to `######` |
| `blockquote` | A quote | Yes, as `> ` |
| `pre` | A code block | Yes, as ` ``` ` |
| `ul` | A bulleted list; in a numbered list, switches it | Yes |
| `ol` | A numbered list; in a bulleted list, switches it | Yes |
| `li` | A list item, joining the list just above, or a new bulleted list; in a list item, turns it back into a paragraph | Yes |
| `checklist` | A task list, with a checkbox per item | Yes, as `- [ ]` and `- [x]` |
| `address` | Contact details | No |
| `figure` | A figure around the block, with a caption below it; again removes both | No |
| `figcaption` | Moves to the figure's caption, inside a figure | No |
| `dl` | A description list: the block becomes a term with an empty description | No |
| `dt`, `dd` | Switches between term and description, inside a description list | No |
| `block` | Any of the above by name, for a dropdown | Each tag as above |

**Layout and style.** `.all` applies the style to the whole document instead; see [Styling the Whole Document](#styling-the-whole-document).

| Command | Does | Markdown |
|---|---|---|
| `indent`, `outdent` | Nests or un-nests a list item; indents or outdents any other block by 2rem | List items only |
| `align` | Aligns the block | No, unless `.all` |
| `leading` | Sets the block's line height | No, unless `.all` |
| `font`, `size`, `color`, `background` | Styles the selected text | No, unless `.all` |

**Tables.** All need `.html`; see [Tables](#tables).

| Command | Does |
|---|---|
| `table` | Inserts a table, columns × rows; 3 × 3 by default, up to 20 × 20 |
| `row-before`, `row-after` | Adds a row above or below the caret's |
| `column-before`, `column-after` | Adds a column before or after the caret's |
| `row-remove`, `column-remove` | Removes the caret's row or column; the last one removes the table |
| `merge` | Joins the selected cells, or the caret's cell and the one after it |
| `split` | Splits a joined cell back into single cells |
| `table-header` | Turns the first row into a header row, or back |
| `table-remove` | Removes the table |

**Editing.**

| Command | Does | Markdown |
|---|---|---|
| `clear` | Removes inline formatting and links from the selection | Yes |
| `undo`, `redo` | Steps through the field's history; these also work in `.plain` fields | Yes |

---

## Multiple Editors

Each field has its own value, history and selection. Controls follow the [toolbar rules](#toolbars): a toolbar shared by several fields acts on the one last focused, and `x-rich-text-for` pins controls to one field, so they never act on another.

<div x-code-group>

```html copy
<div x-data="{ a: 'First **draft**', b: 'Second draft' }">
    <button x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
    <span x-rich-text-for="#notes-b">
        <button x-rich-text.em aria-label="Italic in B"><span x-icon="lucide:italic"></span> B</button>
    </span>

    <div x-rich-text="a" aria-label="A"></div>
    <div x-rich-text="b" id="notes-b" aria-label="B"></div>
</div>
```

::: frame
<div x-data="{ a: 'First **draft**', b: 'Second draft' }" class="col gap-2 w-full">
    <div class="row gap-1">
        <button class="ghost sm" x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
        <span x-rich-text-for="#rich-notes-b">
            <button class="ghost sm" x-rich-text.em aria-label="Italic in B"><span x-icon="lucide:italic"></span> B</button>
        </span>
    </div>
    <div x-rich-text="a" aria-label="A" style="--rich-text-min-height: 3rem"></div>
    <div x-rich-text="b" id="rich-notes-b" aria-label="B" style="--rich-text-min-height: 3rem"></div>
</div>
:::

</div>

Bold follows the field you were last in, and stays disabled until you've been in one. The italic button works on B only: it's ready while the caret is in B, and disabled while it's in A.

---

## Links

Typing `[text](url)` makes a link as you close it. A single `<input>` with `x-rich-text.a` handles links from a control: select some text, type an address into the input and press Enter. With the caret in a link, the input shows that link's address, and editing it changes the address; clearing it removes the link. A link in a field is never followed, whether you click it, middle-click it or press Enter on it, so it can be edited like any other text; links inside an element marked `contenteditable="false"` still work.

<div x-code-group>

```html copy
<div x-data="{ post: 'Visit [Manifest](https://manifestx.dev) today.' }">
    <input type="url" x-rich-text.a placeholder="https://" aria-label="Link address">
    <button x-rich-text.unlink aria-label="Unlink"><span x-icon="lucide:unlink"></span></button>

    <div x-rich-text="post" aria-label="Post"></div>
</div>
```

::: frame
<div x-data="{ post: 'Visit [Manifest](https://manifestx.dev) today.' }" class="col gap-2 w-full">
    <div class="row items-center gap-1">
        <input type="url" class="sm grow" x-rich-text.a placeholder="https://" aria-label="Link address">
        <button class="ghost sm" x-rich-text.unlink aria-label="Unlink"><span x-icon="lucide:unlink"></span></button>
    </div>
    <div x-rich-text="post" aria-label="Post" style="--rich-text-min-height: 4rem"></div>
    <code class="text-xs" x-text="post"></code>
</div>
:::

</div>

The address can be a full URL, a `mailto:`, `tel:` or `sms:` link, a path or `#anchor` on the site, or a bare domain such as `example.com`, which gets `https://` added. Anything else, a script address included, is refused and the text is left as it was. A button can link too, with the address as its value, as in `x-rich-text.a="url"`.

Links can't hold links. Linking part of an existing link splits it: the selected words take the new address and the rest keep the old one. `unlink` removes the whole link at the caret, or only the selected part of one. A field that is itself a link or a button, or sits inside one, takes no links at all. `$rich.link` reads the address at the caret, and assigning to it links or unlinks like the input.

Rich Text leaves **Cmd/Ctrl + K** to the page, where it often opens search.

---

## Tables

Tables need `.html`. Every table command stays disabled while the caret is outside a table, and inserting a table while inside one puts the new one after it: tables never nest. Drag across cells to select a rectangle of them, and drag a cell's border to resize its column or row.

<div x-code-group>

```html copy
<div x-data="{ doc: '<table><tr><th>Dog</th><th>Age</th></tr><tr><td>Poochie</td><td>4</td></tr></table>' }">
    <button x-rich-text.table.3x2>Insert 3 × 2</button>
    <button x-rich-text.row-after>Row below</button>
    <button x-rich-text.column-after>Column after</button>
    <button x-rich-text.merge>Merge</button>
    <button x-rich-text.split>Split</button>
    <button x-rich-text.table-header>Header row</button>
    <button x-rich-text.row-remove>Remove row</button>
    <button x-rich-text.table-remove>Remove table</button>

    <div x-rich-text.html="doc" aria-label="Document"></div>
</div>
```

::: frame
<div x-data="{ doc: '<table><tr><th>Dog</th><th>Age</th></tr><tr><td>Poochie</td><td>4</td></tr></table>' }" class="col gap-2 w-full">
    <div class="row-wrap gap-1">
        <button class="ghost sm" x-rich-text.table.3x2>Insert 3 × 2</button>
        <button class="ghost sm" x-rich-text.row-after>Row below</button>
        <button class="ghost sm" x-rich-text.column-after>Column after</button>
        <button class="ghost sm" x-rich-text.merge>Merge</button>
        <button class="ghost sm" x-rich-text.split>Split</button>
        <button class="ghost sm" x-rich-text.table-header>Header row</button>
        <button class="ghost sm" x-rich-text.row-remove>Remove row</button>
        <button class="ghost sm" x-rich-text.table-remove>Remove table</button>
    </div>
    <div x-rich-text.html="doc" aria-label="Document" style="--rich-text-min-height: 6rem"></div>
</div>
:::

</div>

Sizes are columns × rows, so `x-rich-text.table.3x2` inserts three columns and two rows, and `$rich.table(3, 2)` does the same from script. `merge` joins the selected cells into one, or with no cells selected, the caret's cell and the one after it; `split` undoes it. Tab moves to the next cell and adds a row after the last one; the arrow keys move between cells at a cell's edge and keep the column. Column widths are saved on the table's `<colgroup>` and row heights on its rows.

In a markdown field, a pasted table is kept as text, one line per row; see [Pasting](#pasting).

---

## Styling the Whole Document

A style command with `.all` styles the whole field instead of the selection: `font`, `size`, `leading`, `align`, `color` and `background`. These document-wide styles are CSS variables on the field, not tags in the content, so the stored value stays clean, and they work in markdown fields too. `.all` controls are ready as soon as their field can be found, without the caret being in it.

Because they aren't part of the value, save them yourself. `$rich.all` reads them as an object, such as `{ font: 'Georgia', leading: '2' }`, and assigning an object sets them all at once (`{}` clears them). `rich-text:all` fires on the field with the same object whenever an `.all` control changes them; assigning `$rich.all` doesn't fire it.

<div x-code-group>

```html copy
<div x-data="{ doc: 'The whole page follows these controls.', look: { font: 'Georgia' } }">
    <select x-rich-text.font.all aria-label="Page font">
        <option value="">Default</option>
        <option value="Georgia">Georgia</option>
        <option value="ui-monospace">Mono</option>
    </select>
    <select x-rich-text.leading.all aria-label="Line spacing">
        <option value="">Default</option>
        <option value="2">Double</option>
    </select>
    <select x-rich-text.align.all aria-label="Page alignment">
        <option value="">Start</option>
        <option value="center">Center</option>
    </select>

    <div x-rich-text="doc" aria-label="Document"
         x-effect="$rich.all = look" @rich-text:all="look = $event.detail"></div>
    <code x-text="JSON.stringify(look)"></code>
</div>
```

::: frame
<div x-data="{ doc: 'The whole page follows these controls.', look: { font: 'Georgia' } }" class="col gap-2 w-full">
    <div class="row-wrap gap-1">
        <select class="sm hug" x-rich-text.font.all aria-label="Page font">
            <option value="">Default</option>
            <option value="Georgia">Georgia</option>
            <option value="ui-monospace">Mono</option>
        </select>
        <select class="sm hug" x-rich-text.leading.all aria-label="Line spacing">
            <option value="">Default</option>
            <option value="2">Double</option>
        </select>
        <select class="sm hug" x-rich-text.align.all aria-label="Page alignment">
            <option value="">Start</option>
            <option value="center">Center</option>
        </select>
    </div>
    <div x-rich-text="doc" aria-label="Document" x-effect="$rich.all = look" @rich-text:all="look = $event.detail" style="--rich-text-min-height: 4rem"></div>
    <code class="text-xs" x-text="JSON.stringify(look)"></code>
</div>
:::

</div>

Here `look` holds the styles: `x-effect` applies them to the field, including the saved `Georgia` on load, and the event writes every change back. Store `look` next to the document, wherever you keep it. An `.all` style without a value, like the Default options, removes that style.

---

## Editing Data

A field can edit a value anywhere Alpine can reach: a list in `x-data`, a store, or a record from a [data source](/docs/framework/core-plugins/local-data) such as `$x.products`. Below, each field edits one product's `name`, and the text beside it is that value, updating as you type.

<div x-code-group>

```html copy
<div x-data="{ products: [
    { id: 1, name: 'Peony bouquet' },
    { id: 2, name: 'Tulip bunch' },
    { id: 3, name: 'Rose box' }
] }">
    <template x-for="product in products" :key="product.id">
        <div>
            <div x-rich-text.inline="product.name" aria-label="Product name"></div>
            <code x-text="product.name"></code>
        </div>
    </template>
</div>
```

::: frame
<div class="col gap-3 w-full" x-data="{ products: [{ id: 1, name: 'Peony bouquet' }, { id: 2, name: 'Tulip bunch' }, { id: 3, name: 'Rose box' }] }">
    <template x-for="product in products" :key="product.id">
        <div class="grid grid-cols-2 items-center gap-4">
            <div x-rich-text.inline="product.name" aria-label="Product name"></div>
            <code class="text-xs" x-text="product.name"></code>
        </div>
    </template>
</div>
:::

</div>

The loop is keyed by each record's `id`. Keying it by the field being edited, as in `:key="product.name"`, would make every keystroke look like a new record, so Alpine would rebuild the row and the field would lose the caret after one character. Key a list by something that doesn't change while you edit it.

---

## History

Each field keeps its own history. **Cmd/Ctrl + Z** undoes and **Shift + Cmd/Ctrl + Z** redoes, as does **Ctrl + Y** outside the Mac, and so do the browser's Undo and Redo menu items. Typing is grouped into one step once you pause for a moment, and every command, paste and markdown conversion is a step of its own. A history holds the latest 200 steps.

The browser's own undo can't do this: it doesn't know about the changes the plugin makes itself, such as a heading made from `## ` or a list made by a button, and it would undo only some of them. The field replaces it with a history of its own so every change steps back in order.

`x-rich-text.undo` and `.redo` controls disable themselves when there's nothing to step to, and unlike other commands they're ready without the caret in the field.

<div x-code-group>

```html copy
<div x-data="{ story: 'Change this text, then step back and forth.' }">
    <button x-rich-text.undo aria-label="Undo"><span x-icon="lucide:undo-2"></span></button>
    <button x-rich-text.redo aria-label="Redo"><span x-icon="lucide:redo-2"></span></button>
    <button x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>

    <div x-rich-text="story" aria-label="Story"></div>
</div>
```

::: frame
<div x-data="{ story: 'Change this text, then step back and forth.' }" class="col gap-2 w-full">
    <div class="row gap-1">
        <button class="ghost sm" x-rich-text.undo aria-label="Undo"><span x-icon="lucide:undo-2"></span></button>
        <button class="ghost sm" x-rich-text.redo aria-label="Redo"><span x-icon="lucide:redo-2"></span></button>
        <button class="ghost sm" x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
    </div>
    <div x-rich-text="story" aria-label="Story" style="--rich-text-min-height: 4rem"></div>
</div>
:::

</div>

The history starts again whenever the value is set from outside the field, by your own code or by assigning `$rich.value`, because the steps before no longer describe the text. It lives as long as the page does: a reload starts fresh. Inside an [Edit](/docs/framework/core-plugins/edit#history) region, the page's history takes over from the field's once you leave the text.

---

## Keyboard

| Key | In a field |
|---|---|
| Enter | A new paragraph. In a list, a new item; in an empty item, leaves the list. In a code block, a new line; on an empty last line, leaves the block. In a description list, alternates term and description. In a caption, a paragraph after the figure. A heading ends, and the next line is a paragraph. A quote made by typing `> ` ends the same way, while a quote holding paragraphs, such as one loaded from markdown, gets a new paragraph inside it; Enter on its empty last paragraph leaves the quote. In a one-line field, fires `rich-text:enter` |
| Shift + Enter | A line break inside the block. In a one-line field, fires `rich-text:enter` with `shiftKey` |
| Tab, Shift + Tab | In a table, the next or previous cell; past the last cell, a new row. In a list, nests or un-nests the item. In an HTML field, indents or outdents the block. In a multi-line field Tab never leaves it: press Escape first. One-line and plain fields keep Tab for moving between fields |
| Backspace at the start of a block | Joins the block to the one above: a list item to the item above, the first item out of its list, a paragraph into the last item of a list above it. Removes a rule just above. The field's first block becomes a paragraph if it isn't one |
| Backspace in a table cell | With the whole cell selected, or one character left in it, empties the cell and keeps the table |
| Arrow keys in a table | Move to the next cell at a cell's edge, keeping the column |
| Escape | Leaves the field |
| Cmd/Ctrl + B, I, U | Bold, italic, underline, where the field allows them; the browser's own formatting never applies |
| Cmd/Ctrl + Z, Shift + Cmd/Ctrl + Z | Undo, redo; Ctrl + Y also redoes outside the Mac |
| Cmd/Ctrl + K | Left to the page |

---

## Reference

### Fields

| Write | Effect |
|---|---|
| `x-rich-text="value"` | A field bound to `value`, stored as markdown |
| `x-rich-text` | A field whose content is its own markup |
| `.html`, `.plain` | Store HTML or plain text instead |
| `.inline` | One line |
| `.literal` | No markdown shortcuts while typing |
| `.autofocus` | Focus the field when it appears |
| `placeholder` | Shown while the field is empty |

### Controls

| Write | Effect |
|---|---|
| `x-rich-text.<command>` | Makes the element a control for that command |
| `x-rich-text.<command>.<value>` | A fixed value, such as `.align.center` or `.table.3x2` |
| `x-rich-text.<command>="expression"` | The value from an expression, read when the control runs |
| `x-rich-text.<command>.all` | For `font`, `size`, `leading`, `align`, `color`, `background`: style the whole field |
| `x-rich-text-for="selector"` | On a control or any element around it: pins controls to that field |
| `x-rich-text-menu` | On an element holding controls: shows it over the field's selection |

On a button, dropdown, input or link, a misspelt command logs a warning with the closest match and leaves the element alone.

### $rich

`$rich` is the field the expression's element sits in; outside a field, the field a control there would act on. With no field to act on, it reads as empty and does nothing.

| Member | Description |
|---|---|
| `value` | The stored value; assigning replaces the document and restarts the history |
| `all` | Document-wide styles as an object; assign an object to set them, `{}` to clear |
| `link` | The address of the link at the caret; assign to link or unlink |
| `selection` | The last reported selection, as in `rich-text:selection`, in viewport coordinates, or `null` |
| `run(command, value)` | Runs a command |
| `active(command)` | Whether a command is active at the caret |
| `can(command)` | Whether a command can run here now |
| `markdown()` | The content as markdown, whatever the format |
| `html()` | The content as cleaned HTML, whatever the format |
| `focus()` | Focuses the field |
| `selectAll()` | Focuses the field and selects everything |
| `strong()`, `h2()`, `table(3, 2)`, … | Every command as a method; `table(columns, rows)` and `img(src, alt)` take two values |

`markdown()` escapes literal `*` and `_` and the other characters in [Markdown Written Elsewhere](#markdown-written-elsewhere): in an HTML field they're ordinary characters, and the escape keeps them ordinary if the markdown is read back in.

### Events

| Event | Fires on | `detail` |
|---|---|---|
| `input` | The field, on every change | — |
| `rich-text:selection` | The field, whenever its selection changes | `{ collapsed, text, x, y, width, height, top, right, bottom, left }`, or `null` when the field lets go |
| `rich-text:all` | The field, when an `.all` control changes a document-wide style | The `$rich.all` object |
| `rich-text:enter` | A one-line field, on Enter | `{ value, shiftKey }` |

### JavaScript

`window.ManifestRichText` gives the same engine to code outside Alpine.

| Member | Description |
|---|---|
| `attach(el, options)` | Makes `el` a field and returns a handle: the `$rich` members, plus `el`, `detach()` and `newest()` |
| `toMarkdown(el)` | The markdown for an element's content |
| `fromMarkdown(markdown)` | Cleaned HTML for a markdown string |
| `sanitize(html, blocks, styles)` | Cleans HTML to what Rich Text allows: inline tags only unless `blocks` is true, and `style` attributes only when `styles` is true |
| `commands()` | Every command name |

`attach()` takes `{ format, mode, breaks, all, value, literal, onChange }`: `format` is `'markdown'` (default), `'html'` or `'plain'`; `mode: 'inline'` makes a one-line field; `breaks: true` lets a one-line HTML field keep line breaks, with Shift + Enter adding one; `all: false` turns off document-wide styles, so `.all` controls stay disabled and `$rich.all` can't be set; `value` is the starting value, otherwise the element's markup; `literal` turns off markdown shortcuts; and `onChange(value)` is called after every change. `detach()` removes editing and restores the element's own attributes, and `newest()` returns the markup of the newest step in the field's history, recording any typing still in progress first.

```js copy
const note = ManifestRichText.attach(document.querySelector('#note'), {
    format: 'html',
    value: '<p>Hello</p>',
    onChange: value => localStorage.setItem('note', value)
});
note.strong();
note.detach();
```

---

## Styles

A field looks like an input by default, using the theme's surface, line and radius. Add `unstyle` for a document that should look like the page itself: the background, border, padding and minimum height drop away and the text takes its element's own type, while every command keeps working.

<div x-code-group>

```html copy
<div x-data="{ page: '# A page, not a box\n\nEverything here is editable.' }">
    <div x-rich-text="page" class="unstyle" aria-label="Page"></div>
</div>
```

::: frame
<div x-data="{ page: '# A page, not a box\n\nEverything here is editable.' }" class="w-full">
    <div x-rich-text="page" class="unstyle" aria-label="Page"></div>
</div>
:::

</div>

The variables set the field's look one field at a time, or for every field when set on `:root`.

<div x-code-group>

```html copy
<div x-data="{ note: 'A roomier, tinted field that scrolls past 8rem.' }">
    <div x-rich-text="note" aria-label="Note"
         style="--rich-text-padding: 1.5rem; --rich-text-min-height: 4rem; --rich-text-max-height: 8rem;
                --rich-text-background: color-mix(in oklch, var(--color-brand-content) 8%, transparent)"></div>
</div>
```

::: frame
<div x-data="{ note: 'A roomier, tinted field that scrolls past 8rem.' }" class="w-full">
    <div x-rich-text="note" aria-label="Note" style="--rich-text-padding: 1.5rem; --rich-text-min-height: 4rem; --rich-text-max-height: 8rem; --rich-text-background: color-mix(in oklch, var(--color-brand-content) 8%, transparent)"></div>
</div>
:::

</div>

Controls are styled through the attributes the plugin sets on them. Here active commands get the brand colour and disabled ones fade further.

<div x-code-group>

```html copy
<style>
    .brand-tools [data-rich-text-active] {
        background: var(--color-brand-surface);
        color: var(--color-brand-inverse);
    }
    .brand-tools [aria-disabled="true"] {
        opacity: 0.25;
    }
</style>

<div x-data="{ text: 'Put the caret in **bold** text.' }" class="brand-tools">
    <button x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
    <button x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
    <div x-rich-text="text" aria-label="Text"></div>
</div>
```

::: frame
<div class="w-full">
    <style>
        .brand-tools [data-rich-text-active] {
            background: var(--color-brand-surface);
            color: var(--color-brand-inverse);
        }
        .brand-tools [aria-disabled="true"] {
            opacity: 0.25;
        }
    </style>
    <div x-data="{ text: 'Put the caret in **bold** text.' }" class="col gap-2 brand-tools">
        <div class="row gap-1">
            <button class="ghost sm" x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
            <button class="ghost sm" x-rich-text.em aria-label="Italic"><span x-icon="lucide:italic"></span></button>
        </div>
        <div x-rich-text="text" aria-label="Text" style="--rich-text-min-height: 3rem"></div>
    </div>
</div>
:::

</div>

The field's own states are attributes too: style the empty state's placeholder, or the field while it has focus.

<div x-code-group>

```html copy
<style>
    .dashed[data-rich-text-empty]::before {
        font-style: italic;
    }
    .dashed[data-rich-text-focused] {
        border-style: dashed;
        border-color: var(--color-brand-content);
    }
</style>

<div x-data="{ text: '' }">
    <div x-rich-text="text" class="dashed" placeholder="Nothing yet…" aria-label="Text"></div>
</div>
```

::: frame
<div class="w-full">
    <style>
        .dashed[data-rich-text-empty]::before {
            font-style: italic;
        }
        .dashed[data-rich-text-focused] {
            border-style: dashed;
            border-color: var(--color-brand-content);
        }
    </style>
    <div x-data="{ text: '' }">
        <div x-rich-text="text" class="dashed" placeholder="Nothing yet…" aria-label="Text" style="--rich-text-min-height: 3rem"></div>
    </div>
</div>
:::

</div>

### Variables

| Variable | Default | Sets |
|---|---|---|
| `--rich-text-min-height` | `8rem`; `auto` in a one-line field | Minimum height |
| `--rich-text-max-height` | `none` | Height past which the field scrolls |
| `--rich-text-padding` | `0.75rem` | Padding |
| `--rich-text-background` | `--color-surface-1` | Background; also set by `background.all` |
| `--rich-text-font`, `-size`, `-leading`, `-align`, `-color` | inherited; `start` for align | Document-wide styles, set by `.all` controls |
| `--rich-text-selection-x`, `-y`, `-width`, `-height`, `-center` | — | Written by the plugin on `:root`: the selection's box, in viewport pixels |

### Attributes

| Attribute | Set on |
|---|---|
| `data-rich-text` | Every field; its value is the format |
| `data-rich-text-inline` | A one-line field |
| `data-rich-text-bound` | A field bound to a value |
| `data-rich-text-empty` | A field with no text |
| `data-rich-text-focused` | A field while it has the caret, kept while one of its dropdowns or inputs has focus |
| `data-rich-text-selected` | A field with text selected, and `<html>` while any field has |
| `data-rich-text-control` | Every control; its value is the command |
| `data-rich-text-active` | A control whose command is active at the caret |
| `data-rich-text-all` | An `.all` control |
| `aria-disabled`, `aria-pressed` | A control that can't run now; a button's active state |
| `data-rich-text-menu` | A selection menu |
| `data-rich-text-cell` | Table cells in a dragged selection |
| `data-rich-text-border` | A field while the pointer is on a table border: `x` or `y` |
| `data-rich-text-resizing` | A field while a table border is dragged: `x` or `y` |

::: brand icon="lucide:info"
Some words mean different things in [Edit](/docs/framework/core-plugins/edit). Here, `size` sets font size and a *block* is a paragraph-level tag; in Edit, `.size` resizes an element and a block is any piece of the page.
:::

---

## Related

- [Markdown](/docs/framework/core-plugins/markdown) displays a stored value.
- [Edit](/docs/framework/core-plugins/edit) edits the page itself, and uses Rich Text for its text.
