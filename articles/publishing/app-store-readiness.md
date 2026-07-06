# App Store Readiness

Pass iOS App Review and ship an app that feels native, not web-in-a-box.

---

## Overview

Wrapping your Manifest app with [Capacitor](/docs/publishing/native-apps) produces a valid iOS build — but a valid build is not an approved one. Apple reviews every iOS app by hand, and the bar that trips up wrapped web apps is <a href="https://developer.apple.com/app-store/review/guidelines/#minimum-functionality" target="_blank">Guideline 4.2 (Minimum Functionality)</a>: an app must offer lasting value and native capability, not just "a repackaged website."

Reviewers reject on two independent grounds, and you have to clear both:

- **It looks like a website.** Browser chrome, a web-style hamburger menu, text that zooms on double-tap, a white flash on launch, a Safari-style loading bar — the tells reviewers scan for.
- **It does nothing a website couldn't.** No use of the device: no biometrics, no push, no camera, no share sheet, no offline state.

The rest of this guide is how to clear each, and a checklist to self-audit before you submit.

---

## Feel native

Remove the giveaways that mark an app as a wrapped web page:

- **Fill the screen correctly.** Handle the notch, Dynamic Island, and home indicator with safe-area insets, and set the viewport to cover the full display. Content should sit inside the safe area; backgrounds should extend under it.
- **Drop the browser chrome.** No address-bar affordances, no web hamburger nav. Use a native-style bottom tab bar for primary navigation.
- **Suppress web behaviors.** Turn off double-tap-to-zoom, the long-press callout menu, and accidental text selection on tappable UI. Keep momentum scrolling, but stop the rubber-band overscroll that reveals a web view.
- **Configure the status bar and splash screen.** A branded splash and a status-bar style that matches your theme replace the white launch flash.

Manifest provides these as an agnostic style-and-meta layer — safe-area insets, full-screen viewport, and opt-in web-tell suppression — that also improves the mobile web build, so you're not maintaining a separate native layout.

---

## Add genuine native capability

Guideline 4.2 wants the app to do something a browser tab can't. You don't need all of these — one or two done well is enough — but include at least one real device integration:

- **Biometric auth (Face ID / Touch ID)** — the single easiest "this is native" win; gate sign-in or a sensitive action behind it.
- **Push notifications (APNs)** — genuine re-engagement a website can't match.
- **Haptics** — tactile feedback on key actions.
- **Native share sheet** — share content through the OS, not a web fallback.
- **Camera / photos** — capture or pick media.
- **Deep links / universal links** — open the app to a specific screen from a URL.

Manifest exposes these as opt-in capability plugins with Alpine-friendly attributes, so you add them without writing Swift, and each one no-ops gracefully on the web build.

---

## Payments: physical vs digital

Getting this boundary wrong is a common, avoidable rejection. Apple treats two kinds of purchase very differently:

- **Physical goods and services** (real-world products, shipped items, in-person services) — allowed through your own processor. You can take payment with Apple Pay or a card via Stripe and similar, right inside the app, with no In-App Purchase and no link-out gymnastics. This is <a href="https://developer.apple.com/app-store/review/guidelines/#payments" target="_blank">Guideline 3.1.3(e)</a>.
- **Digital goods and subscriptions** (unlockable content, in-app credits, digital memberships consumed in the app) — generally **must** use Apple's In-App Purchase under <a href="https://developer.apple.com/app-store/review/guidelines/#in-app-purchase" target="_blank">Guideline 3.1.1</a>, which takes Apple's commission. Routing these through a third-party processor to avoid IAP is a direct rejection.

::: brand icon="lucide:info"
**Don't cross the streams.** A Manifest app can sell physical goods in-app through the [Payments plugin](/docs/core-plugins/payments) with a normal processor, but must not push a digital subscription through that same processor on iOS. If you sell both, take physical payment natively and keep digital billing on the web, outside the app.
:::

Following the 2021–2024 *Epic v. Apple* rulings, US apps have some latitude to link out to an external website for digital purchases. It's narrow and evolving — if your app depends on it, read the current guidelines closely and treat physical-in-app / digital-on-web as the safe default.

---

## Never show a white screen

An app that launches to a blank page or a browser error when offline reads as a broken web wrapper. A Capacitor app serves its shell from the local bundle, so the interface loads without a network — make sure an offline launch renders a branded state and a clear "you're offline" message rather than a spinner that never resolves or empty templates waiting on data that isn't coming.

---

## The 4.2 checklist

Self-audit before you submit. Every box should be checked.

**Native feel**

- [ ] Safe-area insets handled — no content under the notch, Dynamic Island, or home indicator
- [ ] Viewport covers the full screen; backgrounds extend edge to edge
- [ ] No browser chrome, address bar, or web-style hamburger navigation
- [ ] Primary navigation uses a native-style tab bar or equivalent
- [ ] Double-tap zoom, long-press callout, and stray text selection are suppressed on UI
- [ ] No rubber-band overscroll revealing the web view
- [ ] Branded splash screen and themed status bar — no white launch flash

**Genuine native capability**

- [ ] At least one real device integration (Face ID, push, camera, haptics, or share) is present and works
- [ ] The app delivers value beyond what your website already does in a browser

**Offline & resilience**

- [ ] Launching offline shows a branded state, never a white screen or browser error
- [ ] The app doesn't hang on network data that may not arrive

**Payments**

- [ ] Physical goods use a normal processor (Apple Pay / card) — not forced through IAP
- [ ] Digital goods and subscriptions use In-App Purchase, or are billed on the web outside the app
- [ ] No third-party processor handles digital purchases inside the app

**Submission**

- [ ] Store listing, screenshots, and description reflect a native app, not a website
- [ ] A working demo account (if sign-in is required) is provided in review notes
- [ ] Review notes point out the native features so the reviewer finds them

---

## Submit

Build with [Capacitor](/docs/publishing/native-apps), sign and upload through <a href="https://appstoreconnect.apple.com" target="_blank">App Store Connect</a>, and distribute the beta through TestFlight first. In the review notes, name the native capabilities you added and how to reach them — reviewers look for genuine native integration, and pointing them straight at it is the fastest way through 4.2.
