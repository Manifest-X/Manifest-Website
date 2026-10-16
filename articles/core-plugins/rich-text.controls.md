# Controls

Buttons, dropdowns, toolbars, and menus that format [Rich Text](/docs/framework/core-plugins/rich-text) fields.

---

## Overview

Any element becomes a control with a command as its modifier: `x-rich-text.strong` bolds, `x-rich-text.h2` makes a heading. Commands are named after the HTML tag they make, plus a few for actions such as `undo` or `align`; [All Commands](#all-commands) lists every one.

A control acts on the field it [resolves to](#toolbars). It's disabled until the caret has been in that field, and whenever its command can't apply there, including while focus is in some other input or editor: in a `.plain` field, for a block command in a one-line field, or for an HTML-only command in a markdown field. Disabled controls get `aria-disabled="true"` rather than `disabled`, so a click on one doesn't take focus away from the field.

---

## Buttons

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

A toolbar that serves one field keeps that field's selection after you click away: pressing a control puts you back in the field and acts on the selection it had. A toolbar shared by several fields works differently; see [Toolbars](#toolbars).

A button can also run a command from script with [`$rich`](/docs/framework/core-plugins/rich-text#reference), as in `@click="$rich.strong()"`. A plain button takes focus when pressed, though, and with more than one field near it, `$rich` then can't tell which field you meant and does nothing. Add `@mousedown.prevent` so the click leaves focus in the field, or use a command modifier, which does that for you.

```html copy
<button @mousedown.prevent @click="$rich.strong(); $rich.em()">Bold italic</button>
```

---

## Dropdowns & Inputs

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
        <select class="sm" x-rich-text.block aria-label="Block">
            <option value="p">Paragraph</option>
            <option value="h2">Heading</option>
            <option value="blockquote">Quote</option>
        </select>
        <select class="sm" x-rich-text.font aria-label="Font">
            <option value="">Default</option>
            <option value="Georgia">Georgia</option>
            <option value="ui-monospace">Mono</option>
        </select>
        <select class="sm" x-rich-text.size aria-label="Size">
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="24">24</option>
        </select>
        <select class="sm" x-rich-text.align aria-label="Align">
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

A colour input recolours the selection live as you move through the picker, and the whole pass is one step of the history. Font, size, and colour need a selection, and each wraps it in a `<span>` with that style. An empty value, like the Default font above, removes that style from the selection again, as [`clear`](#all-commands) does with all formatting. Alignment and line height apply to the block the caret is in.

A command that takes a value gets it from, in order: the modifier after the command, as in `x-rich-text.align.center` or `x-rich-text.table.3x2`; the control's expression, as in `x-rich-text.img="photoUrl"`; or a dropdown's or input's own value. The expression is read when the control runs.

| Command | Value |
|---|---|
| `align` | A `text-align` value: `start`, `center`, `end`, `justify`; `start` when none is given |
| `leading` | A `line-height` value, such as `1.6` or `2rem` |
| `font` | A `font-family` value |
| `size` | A number of pixels, or any CSS length such as `1.25rem` |
| `color`, `background` | Any CSS colour; a colour input gives `#rrggbb` |
| `a` | The address; see [Links](/docs/framework/core-plugins/rich-text#links) |
| `img` | The source, or an array of source and alt text; a `data:` source must be a PNG, JPEG, GIF, WebP, or AVIF image |
| `table` | Columns × rows: `3x2`, `[3, 2]`, or `3` for 3 × 3 |
| `abbr`, `dfn` | The `title`: the expansion or definition |
| `bdo` | The direction: `rtl` (default), `ltr`, or `auto` |
| `data` | The machine-readable `value` |
| `time` | The `datetime` |
| `block` | A block tag name, such as `h2`, `blockquote`, or `ul` |

---

## Toolbars

A toolbar is just controls grouped together, and each control finds its field on its own:

1. Inside an element with `x-rich-text-for="selector"`, the field that selector matches, or the field inside it.
2. Otherwise the nearest container that holds exactly one field.
3. Where a container holds several, the field that has focus, or, while focus is on one of the controls, the field last focused. Once focus moves anywhere else on the page, the controls disable themselves until you're back in a field.

So a toolbar next to its field needs nothing more, and keeps that field's selection after a click away. One toolbar can also serve a whole page of fields, following whichever field you're in.

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
        <select class="sm" x-rich-text.block aria-label="Block">
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

---

## Selection Menu

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

To build a menu of your own, the same information is available directly. The field fires `rich-text:selection` whenever the selection changes, with `{ collapsed, text, x, y, width, height, top, right, bottom, left }`, or `null` when the field lets go of it. The numbers are pixels in viewport coordinates, as from `getBoundingClientRect()`, so they suit `position: fixed`. While text is selected, its box is also written as `--rich-text-selection-x`, `-y`, `-width`, `-height`, and `-center` on `:root`, so anything can be positioned over the selection with CSS alone.

---

## All Commands

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
| `a` | A link; see [Links](/docs/framework/core-plugins/rich-text#links) | Yes |
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

**Layout and style.** `.all` applies the style to the whole document instead; see [Whole Document Styles](/docs/framework/core-plugins/rich-text#whole-document-styles).

| Command | Does | Markdown |
|---|---|---|
| `indent`, `outdent` | Nests or un-nests a list item; indents or outdents any other block by 2rem | List items only |
| `align` | Aligns the block | No, unless `.all` |
| `leading` | Sets the block's line height | No, unless `.all` |
| `font`, `size`, `color`, `background` | Styles the selected text | No, unless `.all` |

**Tables.** All need `.html`; see [Tables](/docs/framework/core-plugins/rich-text#tables).

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

Each field has its own value, history, and selection. Controls follow the [toolbar rules](#toolbars): a toolbar shared by several fields acts on the field you're in, or the one you were last in while you use its controls, and disables itself once focus moves anywhere else on the page. `x-rich-text-for` pins controls to one field, so they never act on another.

<div x-code-group>

```html copy
<div x-data="{ a: 'First **draft**', b: 'Second draft' }">
    <button x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
    <span x-rich-text-for="#notes-second">
        <button x-rich-text.em aria-label="Italic, second field only">
            <span x-icon="lucide:italic"></span> Second only
        </button>
    </span>

    <div x-rich-text="a" aria-label="First field"></div>
    <div x-rich-text="b" id="notes-second" aria-label="Second field"></div>
</div>
```

::: frame
<div x-data="{ a: 'First **draft**', b: 'Second draft' }" class="col gap-2 w-full">
    <div class="row gap-1">
        <button class="ghost sm" x-rich-text.strong aria-label="Bold"><span x-icon="lucide:bold"></span></button>
        <span x-rich-text-for="#rich-notes-second">
            <button class="ghost sm" x-rich-text.em aria-label="Italic, second field only"><span x-icon="lucide:italic"></span> Second only</button>
        </span>
    </div>
    <div x-rich-text="a" aria-label="First field" style="--rich-text-min-height: 3rem"></div>
    <div x-rich-text="b" id="rich-notes-second" aria-label="Second field" style="--rich-text-min-height: 3rem"></div>
</div>
:::

</div>

Bold follows the field you're in, and is disabled while you're in neither. The italic button works on the second field only: it's ready while the caret is in the second field, and disabled while it's in the first.

---

## Related

- [Rich Text](/docs/framework/core-plugins/rich-text) sets up fields, links, tables, and the `$rich` reference.
- [Edit](/docs/framework/core-plugins/edit) uses these controls for page text.
