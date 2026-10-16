# Publishing

Send edits to your own backend, or write them into your source files.

---

## Overview

Edits are kept as a history of changes until you publish them. `$edit.patches()` turns that history into patches: the final state of each changed region, in terms of your source. `$edit.publish()` sends them, and where they go depends on who the editor is for:

- **Your own product**, where people edit content you store: set [`$edit.onPublish`](#to-your-own-backend) and the patches go to your code.
- **Your own project**, which you edit in the browser while you build it: run [`mnfst-run --edit`](#to-your-source-files) and the patches are written into your source files.

Publishing is part of [Edit](/docs/framework/core-plugins/edit): set it up there first.

---

## Patches

Edit the profile below and watch its patches change. Each edit updates the list as soon as it's recorded, and undo takes it back out.

<div x-code-group>

```html copy
<article x-edit="profile">
    <h3>Poochie</h3>
    <p>Loves pasta and ice cream.</p>
</article>

<pre x-text="($edit.version, JSON.stringify($edit.patches(), null, 2))"></pre>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (Alpine.store('edit') ? Promise.resolve() : Manifest.loadPlugin('edit', document.querySelector('script[data-version]')?.dataset.version)).then(() => setTimeout(() => { const t = $el.querySelector('template'), c = t && t._x_currentIfEl; if (c && !c._edit) { c.remove(); delete t._x_currentIfEl; } ready = true }))">
<template x-if="ready">
<div class="col gap-3 w-full">
    <article class="col gap-1 p-4 bg-surface-2 rounded" x-edit="profile-demo">
        <h3 class="m-0">Poochie</h3>
        <p class="m-0">Loves pasta and ice cream.</p>
    </article>
    <pre class="m-0 p-3 text-xs bg-surface-2 rounded max-h-64 overflow-auto" x-text="($edit.version, ((p) => p.length ? JSON.stringify(p, null, 2) : 'No edits yet: rewrite the name or the line above.')($edit.patches().filter(p => p.region === 'profile-demo')))"></pre>
</div>
</template>
</div>
:::

</div>

Reading `$edit.version` makes the binding run again after every edit. The demo shows only its own region's patches; `$edit.patches()` returns every region's.

A text edit in markup produces one patch for its region. Rename Poochie and it looks like this:

```json copy
{
    "kind": "static-tree",
    "region": "profile",
    "tree": {
        "key": "@profile@ARTICLE:Poochie Loves pasta and ",
        "children": [
            { "key": "@profile@H3:Poochie", "at": "0", "edits": { "text": "Poochie the Great" } }
        ],
        "path": true
    }
}
```

| Field | Means |
|---|---|
| `kind` | What was edited: `static-tree` for markup, `data-val` for a record field, `component` for a component's text and classes, `theme` for a theme value |
| `region` | The `x-edit` key the edits belong to |
| `tree` | The changed elements, nested as in your markup; untouched elements are left out |
| `key` | An element's identity in your source: its region, its tag, and the first 24 characters of its text when the page loaded |
| `at` | Its position among its parent's children, as `0`, `1.2`, and so on |
| `edits` | The final values: `text`, `class`, `style`, or another attribute; `null` removes it |

Moves, nesting, and sizes show up in the same tree: a reordered container lists its children's keys in their new order, and a resize is a `style` edit. A data list produces one `data-val` patch per edited field, `{ kind, region, source, id, field, value }`, and a theme control one `theme` patch, `{ kind, scope, var, value }`.

---

## To Your Own Backend

Set `$edit.onPublish` to a function, and `publish()` hands it the patches. Send them wherever your product keeps its content: your API, a database row, or the pipeline that rebuilds a published site. Return the response, or a promise of it; unless it reports an error, the edits count as published and the history starts again from there.

```html copy
<div x-data="{
    init() {
        this.$edit.onPublish = async patches => {
            const res = await fetch('/api/pages/home', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(patches)
            });
            if (!res.ok) throw new Error('Saving failed: ' + res.status);
            return res.json();
        };
    }
}"></div>
```

If the handler throws, or its promise rejects, `publish()` rejects with that error and the history is kept, so nothing is lost and the person can try again. A response shaped `{ results: [...] }` in which any result has `status: 'error'` counts as failed in the same way. Show the outcome where people can see it:

```html copy
<div x-data="{ message: '' }">
    <button :disabled="!$edit.canUndo" @click="$edit.publish()
        .then(() => message = 'Published')
        .catch(err => message = err.message)">Publish</button>
    <span x-text="message"></span>
</div>
```

`canUndo` doubles as "there's something to publish", since a publish clears the history.

---

## To Your Source Files

Run the local development server with editing switched on, edit the page in the browser, and publish. With no `onPublish` set, the patches go to the server, which writes them straight into your source files.

```bash copy
npx mnfst-run --edit
```

Rename Poochie in the page and publish, and `index.html` changes from the first version to the second, with nothing else in the file touched:

<div x-code-group copy>

```html "Before"
<article x-edit="profile">
    <h3>Poochie</h3>
    <p>Loves pasta and ice cream.</p>
</article>
```

```html "After"
<article x-edit="profile">
    <h3>Poochie the Great</h3>
    <p>Loves pasta and ice cream.</p>
</article>
```

</div>

| Edited | Written to |
|---|---|
| Markup in a region | `index.html`, or the component's HTML file when the region is written in one |
| A data list's order and record fields | The CSV or JSON file the data source names in `manifest.json` (a JSON file must hold an array of records) |
| A component instance | The instance's attributes in `index.html`, or the component's HTML file in `main` scope |
| Global theme values | The `manifest.theme.css` that `index.html` links, wherever it lives; with none linked, `styles/core/manifest.theme.css` |
| Scoped theme values | The scope element's own `style` attribute, in the file it's written in |

`publish()` resolves with the server's report, one result per patch:

```json copy
{
    "results": [
        { "region": "profile", "status": "written", "file": "index.html" },
        { "region": "walks", "status": "error", "reason": "file not found: data/walks.csv" }
    ]
}
```

Each result's `status` is `written`, `error` with a `reason`, or `skipped` when a related region failed. Each kind of edit writes only its own kind of file (HTML, CSS, or data), inside the project, and never into a hidden folder such as `.git` or into `node_modules`. Files are written together or not at all. If one region or theme value can't be published, the others are published without it: its result names it and the reason, and its edits stay in the history; a region tied to it by a move between them stays back with it. Publishes run one at a time: a second waits for the first to finish, then builds on its result.

When the page loads, it reads from the server how each source file looks, and publishing needs that. If it couldn't be read, because the page isn't served by `mnfst-run --edit` or the server didn't answer, a publish is refused and the edits are kept.

In a single-page app, a region that isn't on screen keeps its edits: they wait in the history, show again when the region comes back, and publish then.

A region inside content another plugin generates, such as `x-markdown` or `x-html` output, edits on the page and reaches `onPublish`, but its markup isn't in a file, so `mnfst-run --edit` refuses it by name, keeps its edits, and publishes the other regions. Edit warns about it once in the console. The examples in these articles are regions of that kind, inside each article's markdown, so their patches are real but have no file to be written to.

The server only accepts edits from pages it serves on your machine, and its editing endpoints don't exist without `--edit`.

---

## Changed Source

A publish checks that the source still matches what the page loaded. The development server reloads an open page whenever an HTML file changes, so the page normally shows the source as it is now. While edits that `.persist` doesn't keep are waiting to be published, including edits in a region that's off screen in a single-page app, that reload is held back so they aren't lost: Edit warns in the console, adds the files to `$edit.stale`, and fires `edit:stale`. Publish them with `rebase`, as below, and the page reloads itself afterwards. Typing still in progress in a `.persist` region is recorded before a reload, so it isn't lost either, and a publish includes typing in progress wherever it is.

If an HTML file the publish would rewrite has changed since the page loaded, the whole publish is refused, so a stale page can't overwrite newer work. Stylesheets and data files aren't checked this way, because their edits are written value by value: a CSS or data file saved in your code editor while the page is open doesn't block a publish.

A refused publish keeps the history, lists the changed files in `$edit.stale`, and fires `edit:stale` on the document with `detail.files`. Either reload, to start again from the new source, or call `$edit.publish({ rebase: true })` to take the source as it is now and write the edits over it, each into the element it belongs to. After a rebase that wrote over changes, the page reloads itself shortly afterwards to show the result, and until it has, a plain publish is refused as stale.

```html copy
<div x-data @edit:stale.document="console.warn('Changed since this page loaded:', $event.detail.files)">
    <p x-show="$edit.stale.length">
        <span x-text="$edit.stale.join(', ')"></span> changed since this page loaded.
        <button @click="$edit.publish({ rebase: true })">Publish over it</button>
        <button @click="location.reload()">Reload</button>
    </p>
</div>
```

The page also remembers each element it shows as it was when it loaded: its tag, its attributes, and its own text. A publish that edits an element changed in the meantime is refused with *reload to continue*, rebase or not, because its edit could land on the wrong thing. The same goes for identical elements, such as two `<li>Walk</li>`, when any of them moved or changed: the page can no longer tell which one you edited. Changes elsewhere in the file, outside the elements you edited, don't get in the way of a rebase.

### Conflicts

Edits kept from before, by `.persist` or by a region coming back on screen, can find the source changed under them. A text or attribute edit whose element changed can't be applied. Moves and other layout edits are kept when the only change was text in pieces they didn't move; if a piece they moved, added, or removed changed, the region's layout edits can't be applied, and if pieces swapped places, Edit reports it rather than guess which is which. Edits that can't be applied are dropped from the history and reported: `$edit.conflicts` lists them, `edit:conflict` fires on the document with `detail.conflicts`, and Edit warns in the console.

Each entry has a `reason` in words, its `region`, the element's `key` and its tag and text as `element`, the `prop` it edited, and the `value` it held. Layout entries have `prop: 'structure'`, and their `value` holds what was dropped, `{ changed, moved, copies }`, so typed content can be recovered. For a `.persist` region, the list survives reloads until you call `$edit.clearConflicts()`.

```html copy
<div x-data x-show="$edit.conflicts.length">
    <p>Some edits no longer fit the page and were set aside:</p>
    <ul>
        <template x-for="c in $edit.conflicts">
            <li><strong x-text="c.element"></strong>: <span x-text="c.reason"></span></li>
        </template>
    </ul>
    <button @click="$edit.clearConflicts()">Dismiss</button>
</div>
```

---

## Related

- [Edit](/docs/framework/core-plugins/edit) sets up regions, history, and the `$edit` reference.
- [Move](/docs/framework/core-plugins/move) and [Resize](/docs/framework/core-plugins/resize) cover the layout edits that publish here.
