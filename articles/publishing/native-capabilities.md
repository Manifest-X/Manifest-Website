# Native Capabilities

Device APIs — biometrics, push, haptics, camera, and more — as Alpine magics that degrade to the web.

---

## Overview

The native umbrella plugin exposes device capabilities through `$`-magics that feel like the rest of Manifest. Each is **capability-first**: it uses [Capacitor](/docs/publishing/native-apps) inside a wrapped app, and falls back to a web equivalent (or a clean no-op) in the browser — so the same markup runs as a website, an installed PWA, and a native app.

Capabilities: `$device` (state), `$share`, `$secure`, `$links`, `$push`, `$app`, `$haptics`, `$biometric`, `$camera`.

::: brand icon="lucide:info"
The web fallbacks let you build and test on the web; the native paths (APNs tokens, Keychain, Face ID, real capture) light up once you [wrap the app with Capacitor](/docs/publishing/native-apps). Nothing here is required to ship a plain website.
:::

---

## Opting in

Add a `native` block to `manifest.json` — an empty object is enough:

```json "manifest.json"
{
  "native": {}
}
```

Inside a Capacitor container the plugin **auto-loads** even without the block. You can also load it explicitly with `data-plugins="native"` on the Manifest script tag. `$device` (below) is part of core and always available.

---

## $device

Reactive device state — available on every build, not just native.

| Property | Value |
|---|---|
| `$device.os` | `ios` · `android` · `macos` · `windows` · `linux` |
| `$device.platform` | `web` · `ios` · `android` (the container, distinct from `os`) |
| `$device.online` | `true` / `false`, reactive to connectivity changes |
| `$device.standalone` | installed / standalone display mode |
| `$device.native` | running inside a native (Capacitor) container |
| `$device.touch` | coarse-pointer / touch device |

```html
<div x-show="!$device.online" class="offline-only">You're offline</div>
<template x-if="$device.native"><button @click="$haptics.impact()">Buy</button></template>
```

The same state is mirrored on `<html>` as `data-os`, `data-online`, `data-standalone`, `data-native`, so you also get CSS/Tailwind variants (`ios:`, `offline:`, `native:`, `standalone:`) and visibility classes (`.native-only`, `.web-only`, `.offline-only`, `.online-only`, `.standalone-only`, plus the OS `.ios-only` / `.no-ios` family).

---

## $share

Native share sheet → Web Share API → clipboard. Resolves `{ shared, method, cancelled? }`.

```html
<button @click="$share({ title: 'Manifest', text: 'Look at this', url: 'https://manifestx.dev' })">Share</button>
```

---

## $secure

Key/value storage backed by the Keychain / Keystore in-app, and a namespaced `localStorage` fallback on the web (not encrypted there — for real secrets, ship native). Good for session tokens.

```js
await $secure.set('token', value)
const token = await $secure.get('token')   // string | null
await $secure.remove('token')
await $secure.keys()                        // string[]
await $secure.clear()
```

Install a Capacitor secure-storage plugin registered as `SecureStorage`. If its API differs, adapt it once with `$secure.use(adapter)`.

---

## $links

Deep and universal links. A tapped link (native `appUrlOpen`, or a cold-start launch URL) hands off to the [router](/docs/core-plugins/router) automatically.

```js
$links.open('https://app.example.com/order/123')   // navigate programmatically
$links.on(link => { /* take over: link.url, link.path */ })
$links.last                                          // last inbound URL (reactive)
```

Universal (`https://`) links map to their path directly. For custom schemes (`myapp://order/123`) the host+path becomes the route (`/order/123`); use `$links.on()` for bespoke mapping.

---

## $push

Push notifications, designed as three author-controlled contracts — not display-only.

```js
// 1. Permission, on your schedule (never auto-prompted)
const state = await $push.request()        // 'granted' | 'denied' | 'prompt' | 'unsupported'

// 2. Device token -> your backend
$push.onToken(token => sendToServer(token))
await $push.register()                       // registers with APNs (native)

// 3. Tap -> route (default routes the payload's url/route; override to customise)
$push.onTap(n => { /* n.data */ })
$push.onReceive(n => { /* foreground */ })

$push.permission   // reactive
$push.token        // reactive
```

On the web, permission maps to the Notification API; full web push (service worker + VAPID) is out of scope, so `register()` is a no-op there. The tap → route handoff reuses `$links`, so it pairs with deep links and `$app`.

---

## $app

App lifecycle — foreground/background.

```html
<span x-text="$app.active ? 'active' : 'background'"></span>
```
```js
$app.onChange(active => { if (active) refresh() })
```

Native uses Capacitor's `appStateChange`; the web falls back to `visibilitychange` / `pageshow` / `pagehide`.

---

## $haptics

Tactile feedback. Native uses Capacitor Haptics; the web falls back to `navigator.vibrate` (which desktop and iOS Safari often ignore — it's an enhancement).

```js
$haptics.impact()        // 'LIGHT' | 'MEDIUM' | 'HEAVY'
$haptics.notification()  // 'SUCCESS' | 'WARNING' | 'ERROR'
$haptics.selection()
$haptics.vibrate(200)
```

---

## $biometric

Face ID / Touch ID — a genuine native capability (and an easy Guideline 4.2 win). The web has no equivalent one-shot verify, so it reports unsupported.

```js
if (await $biometric.available()) {
  const r = await $biometric.verify({ reason: 'Confirm payment' })
  if (r.verified) { /* proceed */ }
}
```

Install a Capacitor biometric plugin (e.g. `capacitor-native-biometric` or `@aparajita/capacitor-biometric-auth`).

---

## $camera

Capture or pick a photo. Native uses Capacitor Camera; the web falls back to a file picker. Resolves `{ dataUrl?, format?, cancelled? }`.

```js
const photo = await $camera.photo()   // capture
const pick  = await $camera.pick()    // from library
if (photo.dataUrl) img.src = photo.dataUrl
```

---

## Native feel & packaging

Pair these with the native-feel primitives — safe-area utilities (`p-safe`, `pb-safe`, `--safe-*`), the `<nav dock>` bottom navigation, and `viewport-fit=cover` (shipped in the starter). Then wrap and submit:

- [Native Apps](/docs/publishing/native-apps) — packaging with Capacitor.
- [Passing review](/docs/publishing/native-apps#passing-review) — iOS review, privacy manifests, and the payments boundary.
