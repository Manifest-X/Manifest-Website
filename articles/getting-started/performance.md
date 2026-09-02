# Performance

What Manifest does for you, what to reach for, and how to measure.

---

## Overview

Most of Manifest's performance work is automatic: closed containers cost nothing, data updates touch only what changed, and text is never rewritten when it hasn't changed. Each element's own article says how it behaves. This guide is the one place for the mechanics behind those defaults, the few knobs that adjust them, and the checks to run when a page is slow.

---

## What Is Automatic

**Closed containers are inert.** Popover menus, closed dialogs, closed `<details>`, elements with the `hidden` attribute, and tab panels that are not initially selected are not initialised until they are shown. Nothing inside them runs while they are closed. Their full markup is still present in prerendered HTML, so SEO and no-JS readers are unaffected. Opened once, they stay ready.

**Data updates are precise.** Reading `$x.<source>` subscribes only to that source. Network updates are applied together, once per frame; your own writes show immediately; and rows merge by `$id`, so existing rows keep their identity and lists don't flicker. `$x.all` combines every source and is only built when something reads it. See [how data updates](/docs/core-plugins/local-data#how-data-updates).

**Text bindings never rewrite unchanged text.** `x-text` skips the DOM write when the string is the same as before, and renders `null` or `undefined` as empty text. It is otherwise identical to Alpine's. This ships as the `bindings` plugin, loads by default, and has nothing to configure.

The container and text behaviour are the `defer` and `bindings` plugins; computed values are the `computed` plugin. All three load by default with `manifest.js`, or can be named in `data-plugins` when loading selectively.

---

## What To Reach For

| Situation | Use |
|---|---|
| A list, table or total built from data | [`$computed`](/docs/core-plugins/computed) — recalculated only when its inputs change |
| Any list over ~100 rows, especially inside a menu | [`x-virtual`](/docs/core-plugins/virtual) — renders only the visible rows |
| The one or two menus people open most | `x-defer.priority="1"` — warmed first, so they open instantly (see [dropdowns](/docs/elements/dropdowns#closed-menus-cost-nothing)) |

---

## x-defer Reference

### Automatic Rule

These containers are deferred without any attribute:

- `[popover]` elements (any value)
- Closed `<dialog>`
- Closed `<details>`
- `[hidden]` elements — except `[x-route]` panes, because inactive pages are handled by the router
- Tab panels that are not initially selected

Containers with their own rendering directive are never deferred: `x-html`, `x-text`, `x-virtual`, `x-colorpicker`, `x-date`, `x-text-edit`, `x-chart`, `x-icon`, `x-svg`, `x-code`, `x-markdown` and the like. Empty containers are not deferred.

Deferred contents are initialised on the container's own open signal: `beforetoggle` for popovers and dialogs, `toggle` for details, selection for tab panels, and removal of the `hidden` attribute. Once initialised they stay that way unless the container has `.discard`.

Blocks toggled with `x-show` are not deferred automatically. Add `x-defer` to one explicitly to defer its contents until it is shown.

### Modifiers

| Modifier | Effect |
|---|---|
| `x-defer.lazy`{copy} | No warming — contents render on open only |
| `x-defer.discard`{copy} | Throw the contents away when the container closes; they initialise again on the next open |
| `x-defer.priority="n"`{copy} | Warm this container earlier (lower `n` first). The modifier is part of the attribute name and the number is its value; `x-defer="priority:1"` does nothing |
| `x-defer.off`{copy} | Never defer this container |

### Kill Switch

Add `data-defer="off"` to the loader `<script>` to turn automatic deferral off for the whole page.

```html copy
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js" data-defer="off"></script>
```

### Events and Refs

- `manifest:defer-render` fires on the container after its contents initialise. Listen for it in plugins or code that touch rendered children.
- `$refs` inside a deferred container resolve after its first open.

### Diagnostics

`window.ManifestDefer.stats()` returns `{ pending, warm, cap, ready, armed, head, routes: { enabled, stashed, rendered } }`. `ManifestDeferConfig.prewarmCap` sets how many containers warming may prepare (default `48`).

::: accent icon="lucide:flask-conical"
**Experimental — route-level deferral.** Add `data-defer-routes` to the loader `<script>` (or set `ManifestDeferConfig.routes = true`) to make inactive `x-route` pages inert until they are first shown. They render on activation, before the page is visible. This changes when code runs: with the flag on, an inactive page's `x-init` and data reads run when the page is first opened, not at load, and `$refs` or `id`s on another page resolve only after that page has been shown. Escape hatches: `x-defer.off` on a route, or `data-defer="off"` globally.
:::

---

## How Warming Works

After the page settles, idle time is used to warm the on-screen menus nearest the visitor's last click — a few at a time, and never more than the cap. Warmed menus open instantly; the rest render on open. `x-defer.priority` moves a container to the front of that queue, and `.lazy` keeps it out.

---

## Measuring

Manifest uses shared definitions so numbers from different pages and teams compare:

- **Blocked time** — the sum of long tasks from a gesture to settle.
- **Settle** — 500ms with no DOM mutations in the target region.
- **Mutation count** — the number of DOM mutations in the target region.

For teams that want a CI gate, the framework repo's <a href="https://github.com/Manifest-X/Manifest/blob/master/scripts/perf/probe.mjs" target="_blank">`scripts/perf/probe.mjs`</a> implements these definitions.

---

## When It's Slow

Work through this checklist:

- [ ] A closed menu with `x-defer.off`? Remove it unless the contents must exist while closed.
- [ ] A big `x-for` without `x-virtual`? Wrap it — see [virtual](/docs/core-plugins/virtual).
- [ ] A getter that filters on every render? Make it a [`$computed`](/docs/core-plugins/computed).
- [ ] A ticker that rewrites text every second? Tick at the granularity you display.
- [ ] Popover opens paying page-wide layout? Add `contain: layout` to large scrollers.
