# Web Apps

Turn a Manifest project into an installable progressive web app (PWA).

---

## Overview

A progressive web app is a website that can be installed and run like a native desktop or mobile app. Once installed, it launches from the home screen or app dock, opens in its own window without browser chrome, and behaves like any other installed application.

Manifest projects qualify as PWAs the moment `manifest.json` declares the right web-app fields. Browsers detect the file at the root of your site and offer users an install prompt automatically, with no separate build step, bundler, or app store required.

---

## manifest.json

The browser reads `manifest.json` as a <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest" target="_blank">W3C Web App Manifest</a>. To qualify as installable, the file must include `name`, `short_name`, `start_url`, `display`, and `icons` (with at least 192×192 and 512×512 PNGs).

```json "manifest.json" copy
{
    "name": "My Project",
    "short_name": "Project",
    "description": "A short description of what the app does.",
    "start_url": "/",
    "scope": "/",
    "display": "standalone",
    "orientation": "any",
    "background_color": "#FFFFFF",
    "theme_color": "#FFFFFF",
    "icons": [
        { "src": "/assets/icons/192x192.png", "sizes": "192x192", "type": "image/png" },
        { "src": "/assets/icons/512x512.png", "sizes": "512x512", "type": "image/png" }
    ]
}
```

| Field | Purpose |
|---|---|
| `name` | Full app name shown on the install prompt and in the app launcher |
| `short_name` | Shorter name used under the home screen icon (≤ 12 characters recommended) |
| `description` | One-line summary shown in install prompts and app stores |
| `start_url` | URL the app opens to when launched (relative to scope) |
| `scope` | URL prefix the app can navigate within; out-of-scope links open in the browser |
| `display` | Window mode: `standalone` (no browser UI), `minimal-ui`, `fullscreen`, or `browser` |
| `orientation` | Preferred orientation: `any`, `portrait`, or `landscape` |
| `background_color` | Splash screen color shown while the app loads |
| `theme_color` | Browser UI tint color while the app is open |
| `icons` | Array of icon images at different sizes for home screen, splash, and app store |

The [starter project](/docs/getting-started/starter-project)'s `manifest.json` already includes the install-ready PWA fields. Replace the values with your own and you're set.

---

## Linking the Manifest

Reference `manifest.json` from `index.html` so the browser can find it:

```html copy
<link rel="manifest" href="/manifest.json">
```

iOS doesn't fully honor the standard manifest, so add a few Apple-specific meta tags for the home screen icon, status-bar style, and standalone display:

```html copy
<link rel="apple-touch-icon" href="/assets/icons/192x192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Project">
```

---

## Installation

Once `manifest.json` is in place and the site is served over HTTPS, browsers expose an install option to users automatically.

- **Desktop Chrome & Edge:** an install icon appears in the URL bar. Clicking it offers to install the app, which then opens in its own window and appears in the OS launcher.
- **Android Chrome:** an install banner appears on first visit, or users can tap the browser menu's "Install app" entry. The app gets a home-screen icon and behaves like a native app.
- **iOS Safari:** the install flow is manual. Users tap the share button, then "Add to Home Screen". iOS PWAs run in standalone mode and persist on the home screen.

Once installed, the app launches independently of the browser, tints the OS UI to match `theme_color`, and uses the largest matching icon from `manifest.json` for its home screen presence.

---

## Offline Support

A service worker is a small JavaScript file the browser runs in the background, separate from any open page. It can intercept network requests, cache responses, and serve them even when the user has no connection. Service workers are what let installed PWAs keep working offline.

Manifest doesn't ship one by default. Every Manifest site works without it, and most don't need offline support. To enable offline use, add a `service-worker.js` file at your project root and register it from a `<script>` tag in `index.html`:

```html "index.html" copy
<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
</script>
```

The registration script can sit anywhere in the document (head or body). It runs once on each page load and tells the browser where to find the worker file. The browser then keeps the worker alive in the background, independent of any open tab.

Authoring the worker itself is project-specific. Tools like <a href="https://developer.chrome.com/docs/workbox" target="_blank">Workbox</a> generate one from a small config, or you can write one by hand. See MDN's <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers" target="_blank">Service Worker guide</a> for the API.

---

## Native App Distribution

A PWA can also be wrapped as a native app for distribution through iOS, Android, Windows, macOS, and Linux app stores, or made available for direct download. See [Native Apps](/docs/publishing/native-apps) for the per-platform packaging and distribution options.
