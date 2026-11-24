# Presence

Show who's here and what they're up to, live, with `$presence`.

---

## Overview

Presence is a live picture of who's currently using your app. Anyone with a session — a full account or a guest — publishes a simple status like `online`, `away`, or any label you choose, and everyone on the team sees it update the moment it changes. When someone leaves or closes the tab, their status quietly disappears on its own.

It's the mechanism behind the little green dots in a chat app, the "3 people viewing" line on a shared document, and the "typing…" hint in a conversation.

Presence is built on <a href="https://appwrite.io/" target="_blank" rel="noopener">Appwrite</a>'s native realtime service. Statuses are held in memory and expire automatically, so there's nothing to clean up and no database table to manage.

::: brand icon="lucide:info"
Presence identifies people by their [auth](/docs/framework/appwrite-modules/auth) session — a signed-in account **or** a guest both work equally well. A visitor with no session at all sees no roster and can't publish a status; use guest sessions to include them. When your project uses [teams](/docs/framework/appwrite-modules/teams), statuses are shared within the current team, so each workspace sees only its own members.
:::

---

## Setup

Complete the [Appwrite setup](/docs/framework/appwrite-modules/appwrite-setup) and [auth](/docs/framework/appwrite-modules/auth) steps to connect your project and give people a way in — a full sign-in, guest access, or both. Presence needs auth, since it identifies each person by their session.

Add the Appwrite SDK and `manifest.js` scripts to the HTML head, then turn presence on by adding a `presence` block to your `appwrite` config in `manifest.json`. It loads automatically whenever that block is present or `$presence` appears in your page's markup (bringing auth along with it), or you can load it explicitly with `data-modules` (`"+appwrite-presences"` adds it alongside the defaults).

<div x-code-group copy>

```html "Auto-detect"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Declared"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-modules="+appwrite-presences"></script>
```

</div>

Enable it in `manifest.json`:

```json "manifest.json" copy
{
    "appwrite": {
        "projectId": "your-project-id",
        "endpoint": "your-API-endpoint",
        "auth": {},
        "presence": {}
    }
}
```

::: brand icon="lucide:info"
The interactive examples below are real — they publish **your** status to this page's team. Each one includes a quick sign-in, so you can try them right here.
:::

---

## Start Tracking

Call `$presence.start()` once the person has a session — whether they signed in or joined as a guest. It begins publishing their status and loads everyone else's, keeping the roster in sync from then on.

<div x-code-group copy>

```html "HTML"
<!-- Begin tracking presence -->
<button @click="$presence.start()">Go online</button>

<!-- Reflect the live state -->
<p x-show="$presence.ready">You're online as <b x-text="$presence.me"></b></p>
```

::: frame col gap-3 text-base
<!-- Quick sign-in -->
<div x-show="!$auth.isAuthenticated" class="row-wrap items-center gap-2">
    <button @click="$auth.loginOAuth('google')">Sign in with Google</button>
    <button class="outlined" @click="$auth.requestGuest()">Continue as guest</button>
</div>

<!-- Signed in: track presence -->
<div x-show="$auth.isAuthenticated" class="row-wrap items-center gap-3">
    <button @click="$presence.start()" x-show="!$presence.ready">Go online</button>
    <button class="outlined" @click="$presence.stop()" x-show="$presence.ready">Stop</button>
    <small x-show="$presence.ready">You're online as <b x-text="$presence.me"></b></small>
    <button class="ghost sm ms-auto" @click="$auth.logout()">Sign out</button>
</div>
<small x-show="$presence.error" class="text-negative-content" x-text="$presence.error"></small>
:::

</div>

By default, tracking is automatic: a person is marked `away` when none of their tabs is visible (they switched to another site, minimized the browser, or locked the screen) and goes back to their status as soon as one is visible again. Since 0.5.307 this follows tab visibility across all of the person's tabs; earlier releases flipped on window focus, one tab at a time. Adjust this with options passed to `start()`:

| Option | Default | Description |
|---|---|---|
| `auto`{copy} | `true` | Show `away` while none of the person's tabs is visible, and their own status again when one is. |
| `status`{copy} | `"online"` | The status to publish when tracking begins. |
| `keepAliveMs`{copy} | `300000` | How often, in milliseconds, to refresh an unchanged status so it doesn't expire. Capped at 10 minutes. See [Expiry](#expiry). |
| `heartbeatMs`{copy} | | Older name for `keepAliveMs`, still accepted. Before 0.5.307 it set a fixed 25-second refresh from every tab. |
| `scope`{copy} | `'team'` with teams, otherwise `'global'` | Who sees the status: the current team, everyone (`'global'`), or a specific team ID. See [Scoping the Roster](#scoping-the-roster). |

```html "Manual control" copy
<!-- Start with a custom status and no automatic away-detection -->
<button @click="$presence.start({ auto: false, status: 'available' })">Start</button>
```

A status you set yourself stays put: with `auto` on, someone who is `busy` shows `away` while all their tabs are hidden and `busy` again when they come back.

---

## Set a Status

`$presence.set(status)` publishes any label you like — there's no fixed list. Pass an optional second argument to attach extra details, such as which page the person is viewing.

<div x-code-group copy>

```html "HTML"
<button @click="$presence.set('online')">Online</button>
<button @click="$presence.set('away')">Away</button>
<button @click="$presence.set('busy')">Busy</button>

<!-- Any label works, with optional details — a name (handy for guests), a page, anything -->
<button @click="$presence.set('editing', { name: 'Ada', page: 'Invoice #42' })">Editing</button>

<p>Your status: <b x-text="$presence.me"></b></p>
```

::: frame col gap-3 text-base
<small x-show="!$auth.isAuthenticated" class="text-content-subtle">Sign in using the first example above to try this.</small>

<div x-show="$auth.isAuthenticated && $presence.ready" x-data="{ custom: '' }" class="col gap-3">
    <div class="row-wrap gap-2">
        <button class="sm" @click="$presence.set('online')">Online</button>
        <button class="sm" @click="$presence.set('away')">Away</button>
        <button class="sm" @click="$presence.set('busy')">Busy</button>
    </div>
    <div class="row-wrap gap-2 items-center">
        <input type="text" class="flex-1" placeholder="Custom status" aria-label="Custom status" x-model="custom" />
        <button class="sm" @click="if (custom.trim()) { $presence.set(custom.trim()); custom = ''; }" :disabled="!custom.trim()">Set</button>
    </div>
    <small>Your status: <b x-text="$presence.me"></b></small>
</div>
<small x-show="$auth.isAuthenticated && !$presence.ready" class="text-content-subtle">Press <b>Go online</b> in the example above first.</small>
:::

</div>

---

## See Who's Here

`$presence.list` is the live roster — an array of everyone currently present, yourself included. It updates on its own as people arrive, change status, and leave. Loop over it to build whatever display you like.

It's the one roster for your whole app, shared by every component and every open tab, so read it wherever you need it. There's no need to subscribe to Appwrite's presence channel yourself; a second subscription only repeats work the module already does.

Each person carries a `color` for easy visual distinction and a `metadata.name`. The name is the person's real account name when they have one, or `null` when they don't — a guest, say. Because that fallback is `null`, **you** decide the label to show in its place, so it's yours to name and to [localize](/docs/framework/core-modules/localization).

<div x-code-group copy>

```html "HTML"
<template x-for="person in $presence.list" :key="person.userId">
    <div class="row items-center gap-2">
        <!-- Coloured status dot -->
        <figure class="size-2 rounded-full" :style="`background:${person.color}`"></figure>
        <!-- Your label for the nameless — rename or localize freely -->
        <span x-text="person.metadata?.name || 'Guest'"></span>
        <small class="capitalize" x-text="person.status"></small>
    </div>
</template>
```

::: frame col gap-3 text-base
<small x-show="!$auth.isAuthenticated" class="text-content-subtle">Sign in using the first example above to try this.</small>

<div x-show="$auth.isAuthenticated" class="col gap-2">
    <template x-for="person in $presence.list" :key="person.userId">
        <div class="row items-center gap-2 py-1 border-t border-line">
            <figure class="size-2 rounded-full" :style="`background:${person.color}`"></figure>
            <span class="flex-1" x-text="person.metadata?.name || 'Guest'"></span>
            <small class="capitalize text-content-subtle" x-text="person.status"></small>
        </div>
    </template>
    <small x-show="!$presence.list.length" class="text-content-subtle">No one here yet — press <b>Go online</b> above.</small>
</div>
:::

</div>

To look up one specific person instead of the whole roster, use `$presence.of(userId)`:

```html copy
<!-- Is this teammate around? -->
<span x-show="$presence.of(user.$id)">
    <b x-text="user.name"></b> is <span x-text="$presence.of(user.$id).status"></span>
</span>
```

---

## Stop & Clear

Presence tidies up after itself. A person's status is removed when they close their last tab, and when their session is ended through `$auth` — signing out, or a guest signing in to an account — the status is removed first, while the session still allows it (since 0.5.307). A session that ends some other way, such as expiring or being revoked from another device, leaves the status in place until it expires, at most 15 minutes later. Removal on closing the last tab is best effort, since the browser may not finish the request as the tab closes; if it doesn't, the status expires the same way.

To end tracking yourself, use `clear` to remove your status (in every tab) or `stop` to stop tracking in this tab. `clear` finishes only once the status is gone, so it's safe to await it right before signing someone out another way.

```html copy
<!-- Remove your status but keep watching others -->
<button @click="$presence.clear()">Appear offline</button>

<!-- Stop tracking in this tab -->
<button @click="$presence.stop()">Stop</button>
```

---

## Many Tabs

People often keep an app open in several tabs. Since 0.5.307, presence treats a browser as one person, however many tabs they have open:

- **One tab speaks for the browser.** The tabs pick one of themselves to publish the status and receive everyone else's, and share the roster with the others. Ten open tabs cost the same as one.
- **Closing that tab hands over.** Another tab takes over immediately, without the person blinking offline. The same happens when the browser puts a background tab to sleep, and if that tab stops responding, another takes over within a few minutes or as soon as the person changes their status.
- **The most active tab wins.** A person is only `away` when none of their tabs is visible, so a hidden tab never marks them away while they're working in another.
- **Any tab can set the status.** `set()` and `clear()` in one tab apply to all of them, and setting a status that hasn't changed sends nothing.

Statuses are only sent when they change, plus a slow refresh to keep them from expiring, so a busy app doesn't send a stream of updates while nothing is happening. Bursts of updates from other people are grouped into a single roster update, so a team arriving at once doesn't redraw the page once per person.

::: brand icon="lucide:info"
Tabs coordinate with standard browser features available in every current browser. In an older browser without them, each tab publishes on its own, as earlier releases did. Only tabs that called `start()` take part, so call it in every tab that shows presence rather than calling `set()` alone. One person's tabs share a single status, so if two of their tabs are on different teams, the tab that most recently switched or set a status decides where it's shown.
:::

---

## Expiry

Appwrite removes a status 15 minutes after its last update. While nothing changes, presence refreshes it every 5 minutes (`keepAliveMs`), which stays well inside that window even when the browser slows down background tabs, so nobody flickers offline. If a browser crashes or loses its connection, the person drops off everyone's roster when their status expires, at most 15 minutes after its last refresh; each roster removes expired statuses on its own, without waiting for Appwrite.

Rosters stay current through Appwrite's realtime connection. If that connection drops for a while, updates sent in the meantime are missed: someone who arrived or changed status can be missing or out of date until their next refresh, at most 5 minutes later.

---

## Scoping the Roster

When your project uses [teams](/docs/framework/appwrite-modules/teams), the roster automatically follows the person's current team: their status is shared with teammates only, and the roster only shows people from the same team. Without teams, everyone signed in to the project shares one global roster.

You can override the default in `manifest.json` or when starting:

```json "manifest.json" copy
{
    "appwrite": {
        "presence": { "scope": "global" }
    }
}
```

```html copy
<!-- 'team' (default when teams are in use), 'global', or a specific team ID -->
<div x-init="$presence.start({ scope: 'global' })"></div>
```

Switching teams moves your status with you: it disappears from the old team's rosters and appears in the new one. The scope is enforced twice — Appwrite only delivers presence updates to people allowed to read them, and the module also drops anything outside the current scope before it reaches the roster.

Until a person's team is known — however long that takes — their status stays private to them; it is never shared project-wide while a team is loading. This also means people who never resolve a team (such as guests outside any team) stay invisible to each other on team-scoped projects; if you want everyone visible regardless of teams, set the scope to `global`.

::: brand icon="lucide:info"
If some visitors are on an older release of Manifest, their statuses are shared globally rather than per team, so scoped rosters won't show them (and theirs show everyone). This resolves itself once they update, as their next status refresh adopts the current rules.
:::

---

## Properties

Read these anywhere in your markup — each updates reactively as presence changes.

| Property | Type | Description |
|---|---|---|
| `$presence.list`{copy} | array | Everyone currently present, yourself included. |
| `$presence.records`{copy} | object | The same people keyed by their user ID, for direct lookups. |
| `$presence.me`{copy} | string \| null | Your own current status, or `null` if you aren't publishing one. |
| `$presence.ready`{copy} | boolean | `true` once tracking has started and the roster has loaded. |
| `$presence.error`{copy} | string \| null | The most recent error message, or `null`. |
| `$presence.leader`{copy} | boolean | `true` in the one tab that publishes for this browser. See [Many Tabs](#many-tabs). |

---

## Methods

| Method | Parameters | Description |
|---|---|---|
| `$presence.start(options?)`{copy} | `options` (object, optional) | Begin tracking and publish your status. Options: `auto`, `status`, `keepAliveMs`, `scope`. |
| `$presence.set(status, metadata?)`{copy} | `status` (string), `metadata` (object, optional) | Publish a status label with optional details. |
| `$presence.of(userId)`{copy} | `userId` (string) | Get one person's presence record, or `null` if they aren't present. |
| `$presence.all()`{copy} | None | Return the full roster as an array (same as `list`). |
| `$presence.clear()`{copy} | None | Remove your own status, in every tab. Resolves once it's gone. |
| `$presence.stop()`{copy} | None | Stop tracking in this tab and empty its roster. |

---

## A Presence Record

Every entry in the roster has this shape.

| Property | Type | Description |
|---|---|---|
| `userId`{copy} | string | The person's account ID. |
| `status`{copy} | string | Their current status label. |
| `metadata`{copy} | object | Details attached with `set`, including `color` and `name` (the account name, or `null` — pass your own with `set(status, { name })`). |
| `color`{copy} | string | A consistent colour for this person, handy for dots and avatars. |
| `lastSeen`{copy} | number | Timestamp of their most recent update. |
| `expiresAt`{copy} | string \| null | When the status will expire if not refreshed (15 minutes after its last update). |

---

## Next Steps

See [teams](/docs/framework/appwrite-modules/teams) to scope presence to a workspace, or [cloud data](/docs/framework/appwrite-modules/cloud-data) to pair it with shared databases and files.
