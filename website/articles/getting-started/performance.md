# Performance

What Manifest optimizes, what to reach for, and how to measure.

---

## Overview

Most of Manifest's performance work is automatic. Closed containers cost nothing, data updates touch only what changed, and text is never rewritten when it hasn't changed. Each element's own article says how it behaves. This guide explains the mechanics behind those defaults, the few knobs that adjust them, and the checks to run when a page is slow.

---

## What Is Automatic

**Closed containers cost nothing.** A closed menu, a closed dialog, a collapsed `<details>`, a hidden element and a tab panel that isn't selected are left alone until they are shown; nothing inside them runs. Their full markup is still in the prerendered HTML, so search engines and readers without JavaScript see everything. Once shown, they stay ready.

**Data updates touch only what changed.** Each part of the page that reads a data source follows just that source. When new data arrives, existing rows are updated in place rather than replaced, so lists don't flicker and edits in progress are not disturbed. Your own changes show immediately, and network updates arriving together are applied in one go. `$x.all`, which combines every source, is only built when something reads it. See [how data updates](/docs/core-plugins/local-data#how-data-updates).

**Text only updates when it changes.** A text binding whose value comes back unchanged leaves the page alone, and empty values (`null` or `undefined`) show as empty text rather than the word "null".

**Searches and filters on data are cached.** `$search`, `$query` and `$route` remember their result until the source they read changes, so binding the same search in fifty rows costs one pass, not fifty. Your own derivations get the same treatment with [x-computed](/docs/core-plugins/computed).

**Repeat visits load from the browser.** Sites on Manifest hosting register a small service worker that keeps the page shell, scripts, styles and components on the visitor's device. The first visit loads from the network as usual; from the next visit on, the shell comes from the device and only the data is fetched, and a page that was already open keeps working offline. Publishing still takes effect on the next load, because the page itself is always checked against the network first. Local previews with `mnfst-run` never register it. To turn it off for a site, set `"sw": false` in `manifest.json`, or add `data-sw="off"` to the loader `<script>`.

None of this needs an attribute or a setting. The one switch is `data-defer="off"` on the loader script, which turns closed-container deferral off for the whole page; `x-defer.off` does the same for a single element.

---

## Utility Classes

Publishing bakes a stylesheet of every Tailwind-style utility class your pages use (`flex`, `gap-4`, `hover:underline`, `bg-brand-surface`, and their variants) instead of shipping an engine that scans the page and generates them live. When that baked sheet covers every class on a page, the live engine never loads at all — one less script, sooner interactivity.

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

If a class still turns up uncovered on a live page, Manifest loads the full engine automatically and logs a warning — a page never renders unstyled without saying so.

---

## What To Reach For

| Situation | Use |
|---|---|
| A list, table or total built from data | [**x-computed**](/docs/core-plugins/computed) — a named value recalculated only when its inputs change |
| Any list over ~100 rows, especially inside a menu | [**x-virtual**](/docs/core-plugins/virtual) — renders only the visible rows |
| The one or two menus people open most | `x-defer.priority="1"`{copy} — warmed first, so they open instantly (see [dropdowns](/docs/elements/dropdowns#closed-menus-cost-nothing)) |

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

Containers with their own rendering directive are never deferred: `x-html`, `x-text`, `x-virtual`, `x-colorpicker`, `x-date`, `x-text-edit`, `x-chart`, `x-icon`, `x-svg`, `x-code`, `x-markdown` and the like. Empty containers are not deferred.

Deferred contents are initialized on the container's own open signal: `beforetoggle` for popovers and dialogs, `toggle` for details, selection for tab panels, and removal of the `hidden` attribute. Once initialized they stay that way unless the container has `x-defer.discard`. `$refs` inside a deferred container resolve after its first open.

Blocks toggled with `x-show` are not deferred automatically. Add `x-defer` to one explicitly to defer its contents until it is shown.

---

### Modifiers

| Modifier | Effect |
|---|---|
| `x-defer.lazy`{copy} | No warming — contents render on open only |
| `x-defer.discard`{copy} | Throw the contents away when the container closes; they initialize again on the next open |
| `x-defer.priority="n"`{copy} | Warm this container earlier (lower `n` first). The modifier is part of the attribute name and the number is its value; `x-defer="priority:1"` does nothing |
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

After the page settles, idle time is used to warm the on-screen menus nearest the visitor's last click — a few at a time, and never more than the cap. Warmed menus open instantly; the rest render on open. `x-defer.priority` moves a container to the front of that queue, and `x-defer.lazy` keeps it out.

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
- [ ] A big `x-for` without `x-virtual`? Wrap it — see [virtual](/docs/core-plugins/virtual).
- [ ] A getter that filters on every render? Make it a [computed value](/docs/core-plugins/computed).
- [ ] A ticker that rewrites text every second? Tick at the granularity you display.
- [ ] Popover opens paying page-wide layout? Add the `contain: layout` CSS property to large scrollers.

---

## Diagnostics

For tooling and plugin authors:

- `window.ManifestDefer.stats()`{copy} returns `{ pending, warm, cap, ready, armed, head, routes: { enabled, stashed, rendered } }`{copy}.
- `ManifestDeferConfig.prewarmCap`{copy} sets how many containers warming may prepare (default `48`). `ManifestDeferConfig.routes = true`{copy} is the script-side form of `data-defer-routes`{copy}.
- `manifest:defer-render`{copy} fires on a container after its contents initialize, for code that touches rendered children.
