# Performance

What Manifest optimizes, what to reach for, and how to measure.

---

## Overview

Most of Manifest's performance work is automatic. Closed containers cost nothing, data updates touch only what changed, and text is never rewritten when it hasn't changed. Each element's own article says how it behaves. This guide explains the mechanics behind those defaults, the few knobs that adjust them, and the checks to run when a page is slow.

---

## What Is Automatic

**Closed containers cost nothing.** A closed menu, a closed dialog, a collapsed `<details>`, a hidden element and a tab panel that isn't selected are left alone until they are shown; nothing inside them runs. Their full markup is still in the prerendered HTML, so search engines and readers without JavaScript see everything. Once shown, they stay ready.

**Data updates touch only what changed.** Each part of the page that reads a data source follows just that source. When new data arrives, existing rows are updated in place rather than replaced, so lists don't flicker and edits in progress are not disturbed. Your own changes show immediately, and network updates arriving together are applied in one go. `$x.all`, which combines every source, is only built when something reads it. See [how data updates](/docs/framework/core-modules/local-data#how-data-updates).

**Text only updates when it changes.** A text binding whose value comes back unchanged leaves the page alone, and empty values (`null` or `undefined`) show as empty text rather than the word "null".

**Searches and filters on data are cached.** `$search` and `$route`, and `$query` on a local source, remember their result until the source they read changes, so binding the same search in fifty rows costs one pass, not fifty. Your own derivations get the same treatment with [x-computed](/docs/framework/core-modules/computed). If you change a row's field directly, for example with `x-model` on the row, without saving it through the data methods, search results for that row do not update until the source next changes.

**Repeat visits load from the browser.** Sites on Manifest hosting register a small service worker that keeps the page shell, scripts, styles and components on the visitor's device. The first visit loads from the network as usual; from the next visit on, the shell comes from the device and only the data is fetched, and a page that was already open keeps working offline. Publishing still takes effect on the next load, because the page itself is always checked against the network first. Local previews with `mnfst-run` never register it. To turn it off for a site, set `"sw": false` in `manifest.json`, or add `data-sw="off"` to the loader `<script>`.

None of this needs an attribute or a setting. The one switch is `data-defer="off"` on the loader script, which turns closed-container deferral off for the whole page; `x-defer.off` does the same for a single element.

---

## Utility Classes

When you publish to Manifest hosting, the Tailwind-style utility classes found in your pages (`flex`, `gap-4`, `hover:underline`, `bg-brand-surface`, and their variants) are baked into a stylesheet linked from the page, so they are styled before any script runs. The utilities module still loads and generates only the classes the baked sheet doesn't cover, such as ones added at runtime. With `data-tailwind`, the Tailwind engine still loads as well.

**Classes a scan can't see.** A class assigned only from a runtime value — `:class="ok ? 'bg-green-500' : 'bg-amber-500'"` — may not appear anywhere the publish-time scan looks. List it under `utilities.safelist` in `manifest.json` so it's baked in like any other class:

```json "manifest.json" copy
"utilities": {
	"safelist": ["bg-amber-500", "bg-green-500"]
}
```

For a whole family built at runtime, `utilities.patterns` takes regular expressions matched against each class token instead. These aren't baked — a pattern can't be expanded into concrete classes — but the runtime treats a match as already covered rather than flagging it:

```json "manifest.json" copy
"utilities": {
	"patterns": ["^bg-(red|green|blue)-[0-9]+$"]
}
```

A class that isn't baked is still generated in the browser when it appears, by the utilities module or by Tailwind when `data-tailwind` is set. A class neither can produce stays unstyled.

---

## What To Reach For

| Situation | Use |
|---|---|
| A list, table or total built from data | [**x-computed**](/docs/framework/core-modules/computed) — a named value recalculated only when its inputs change |
| Any list over ~100 rows, especially inside a menu | [**x-virtual**](/docs/framework/core-modules/virtual) — renders only the visible rows |
| The one or two menus people open most | `x-defer.priority="1"`{copy} — warmed first, so they open instantly (see [dropdowns](/docs/framework/elements/dropdowns#closed-menus-cost-nothing)) |

---

## Filtering & Sorting Lists

A `.filter()` or `.sort()` you write in a binding runs over the whole source each time that binding updates, and each binding runs its own copy. Manifest can't cache code you write. When the source changes, for example on every realtime event, a list derived in twenty bindings is filtered and sorted twenty times.

Work the list out once with [x-computed](/docs/framework/core-modules/computed) and read the result everywhere inside the element:

<div x-code-group copy>

```html "Before"
<!-- Each binding filters the whole source -->
<div x-data="{ q: '', key: 'name' }">
    <input type="text" placeholder="Filter tasks..." x-model="q">
    <select x-model="key">
        <option value="name">Name</option>
        <option value="due">Due date</option>
    </select>
    <p x-text="$x.tasks.filter(t => t.status === 'open' && t.name.includes(q)).length + ' open'"></p>
    <template x-for="task in $x.tasks.filter(t => t.status === 'open' && t.name.includes(q)).sort((a, b) => String(a[key]).localeCompare(String(b[key])))" :key="task.$id">
        <div x-text="task.name"></div>
    </template>
</div>
```

```html "After"
<!-- Filtered and sorted once per change -->
<div x-data="{ q: '', key: 'name' }"
    x-computed:open="$x.tasks.filter(t => t.status === 'open' && t.name.includes(q)).sort((a, b) => String(a[key]).localeCompare(String(b[key])))">
    <input type="text" placeholder="Filter tasks..." x-model="q">
    <select x-model="key">
        <option value="name">Name</option>
        <option value="due">Due date</option>
    </select>
    <p x-text="open.length + ' open'"></p>
    <template x-for="task in open" :key="task.$id">
        <div x-text="task.name"></div>
    </template>
</div>
```

</div>

`open` is recalculated when a row is created, updated or deleted, or when `q` or `key` changes. In one test, run outside a browser with 10,000 rows and 20 bindings reading the same list, this cut the time per update from about 500ms to about 100ms. Real timings depend on the device.

It matters when many bindings read the same derived list, or when a large list changes often. A list of a few hundred rows shown once doesn't need it. Readers must be inside the element that has `x-computed`; a binding elsewhere on the page still runs its own copy.

The data operators are already cached (see [what is automatic](#what-is-automatic)), so a `$search`, or a `$query` on a local source, doesn't need this. On an Appwrite source, `$query` asks Appwrite for new rows instead of filtering in the browser, so a filter or sort over the rows already loaded belongs in a computed value. See [search and query entries](/docs/framework/appwrite-modules/databases#search-query-entries).

---

## x-defer Reference

Closed containers are deferred without any attribute. `x-defer` is for the cases where you want to change that, like warming a container early, discarding its contents on close, or keeping it eager.

### Automatic Rule

These containers are deferred automatically:

- `[popover]` elements (any value)
- Closed `<dialog>`
- Closed `<details>`
- `[hidden]` elements — except `[x-route]` panes, because inactive pages are handled by the router
- Tab panels that are not initially selected

Containers with their own rendering directive are never deferred: `x-html`, `x-text`, `x-virtual`, `x-colorpicker`, `x-date`, `x-rich-text`, `x-chart`, `x-icon`, `x-svg`, `x-code`, `x-markdown` and the like. Empty containers are not deferred.

Deferred contents are initialized on the container's own open signal: `beforetoggle` for popovers and dialogs, `toggle` for details, selection for tab panels, and removal of the `hidden` attribute. Once initialized they stay that way unless the container has `x-defer.discard`. `$refs` inside a deferred container resolve after its first open.

A deferred `<details>` keeps its `<summary>` in place, so the closed label shows. Content written before the `<summary>` ends up after it.

Blocks toggled with `x-show` are not deferred automatically. Add `x-defer` to one explicitly to defer its contents until it is shown.

---

### Modifiers

| Modifier | Effect |
|---|---|
| `x-defer.lazy`{copy} | No warming — contents render on open only |
| `x-defer.discard`{copy} | Throw the contents away when the container closes; they initialize again on the next open |
| `x-defer.priority="n"`{copy} | Warm this container before containers without a priority that are equally placed (both on screen, or both off screen); lower `n` first. The modifier is part of the attribute name and the number is its value; `x-defer="priority:1"` does nothing |
| `x-defer.off`{copy} | Never defer this container |

---

### Kill Switch

Add `data-defer="off"` to the loader `<script>` to turn automatic deferral off for the whole page.

```html copy
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js" data-defer="off"></script>
```

::: icon="lucide:flask-conical"
**Experimental — route-level deferral.** Add `data-defer-routes`{copy} to the loader `<script>` to make inactive `x-route` pages inert until they are first shown. They render on activation, before the page is visible. This changes when code runs: with the flag on, an inactive page's `x-init` and data reads run when the page is first opened, not at load, and `$refs` or `id`s on another page resolve only after that page has been shown. Escape hatches: `x-defer.off` on a route, or `data-defer="off"` globally.
:::

---

## How Warming Works

After the page settles, idle time is used to warm deferred containers before their first open: on-screen ones first, then the rest, a few at a time and only while the browser is idle. `x-defer.priority` orders containers that are equally placed, and `x-defer.lazy` keeps a container out. Warming stops at the cap (48 containers by default) and skips containers on inactive routes. Warmed containers open instantly; the rest render on open. A page that is never idle is never warmed; browsers without `requestIdleCallback` warm on a short timer instead.

A click or key press that reveals new content, such as a tab switch or an opened panel, moves the containers that appear within about half a second of it to the front, prioritized ones first, then nearest the click, up to 8 at a time. These may go past the cap; the least useful warmed containers are then put back, to render on open or when warming has room again. Containers that were already on screen, or only scrolled into view, are not moved forward: at the cap, a pending menu next to the click renders when it opens. For 1.5 seconds after each click or key press, plain warming pauses, so freed slots go to what that gesture revealed.

---

## Measuring

Manifest uses shared definitions so numbers from different pages and teams compare:

- **Blocked time** — the sum of long tasks from a gesture to settle.
- **Settle** — 500ms with no DOM mutations in the target region.
- **Mutation count** — the number of DOM mutations in the target region.

For teams that want a CI gate, the framework repo's <a href="https://github.com/Manifest-X/Manifest/blob/master/scripts/perf/probe.mjs" target="_blank">`scripts/perf/probe.mjs`</a> implements these definitions.

---

## Troubleshooting

When your project is slow, work through this checklist:

- [ ] A closed menu with `x-defer.off`? Remove it unless the contents must exist while closed.
- [ ] A big `x-for` without `x-virtual`? Wrap it — see [virtual](/docs/framework/core-modules/virtual).
- [ ] A getter that filters on every render? Make it a [computed value](/docs/framework/core-modules/computed).
- [ ] `.filter()` or `.sort()` on a `$x` source inside a template expression? Move it into a [computed value](/docs/framework/core-modules/computed).
- [ ] A getter that returns a new array or object on every read? Everything that reads it re-runs. Return a stored value instead.
- [ ] A long list in a container without a bounded height? Give the [`x-virtual`](/docs/framework/core-modules/virtual) container a fixed height so only the visible rows render.
- [ ] Heavy rows in a long virtual list? Try [`recycle`](/docs/framework/core-modules/virtual#reusing-rows) so rows are reused as you scroll.
- [ ] A menu cloned inside every row? Reuse one menu for many rows.
- [ ] A class name built from data, so each row gets a new one? Use a fixed set of classes.
- [ ] Not on Manifest hosting and loading `mnfst@latest`? Pin the version in the script URL and in `data-version` (see [setup](/docs/framework/getting-started/setup#script)) so repeat visits are served from the browser cache. Sites on Manifest hosting are pinned automatically when you publish (see [publish](/docs/platform/publish#framework-version)).
- [ ] Using `data-tailwind` without a baked utilities stylesheet? Try the opt-in [Tailwind output cache](/docs/framework/styles/theme#tailwind-output-cache).
- [ ] A ticker that rewrites text every second? Tick at the granularity you display.
- [ ] Popover opens paying page-wide layout? Add the `contain: layout` CSS property to large scrollers.

---

## Diagnostics

For tooling and module authors:

- `window.ManifestDefer.stats()`{copy} returns `{ pending, warm, cap, ready, bootDrained, armed, observed, head, routes: { enabled, stashed, rendered } }`{copy}.
- `ManifestDeferConfig.prewarmCap`{copy} sets how many containers warming may prepare (default `48`). It is read once, so set it in an inline script before the loader `<script>`: `<script>window.ManifestDeferConfig = { prewarmCap: 24 }</script>`{copy}. `ManifestDeferConfig.routes = true`{copy} is the script-side form of `data-defer-routes`{copy}.
- `manifest:defer-render`{copy} fires on a container after its contents initialize, for code that touches rendered children.
