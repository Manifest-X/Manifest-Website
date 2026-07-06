# Native Apps

Package a Manifest project as a native app for app stores or direct download.

---

## Overview

A Manifest [progressive web app](/docs/publishing/web-apps) (PWA) can run as a native-feeling app on every modern operating system. On most platforms, users can [install the PWA directly](/docs/publishing/web-apps#installation) from their browser with no packaging required. For app store presence and other distribution channels, the PWA needs to be wrapped in a native bundle and submitted through each platform's store. This article covers those native packaging paths.

There are two ways to wrap a Manifest app, and the right one depends on the store:

- **<a href="https://www.pwabuilder.com" target="_blank">PWABuilder</a>** — a free tool from Microsoft that takes your live URL and produces store-ready packages for iOS, Android, and Windows from one workflow. It's the fastest route, and it's the right call for Android, Windows, and direct distribution.
- **<a href="https://capacitorjs.com" target="_blank">Capacitor</a>** — generates a real native project you own, with a bridge to native device APIs (biometrics, push, camera, haptics, and more). It's more setup, but it's the **store-grade** path — and on iOS it's effectively required to pass App Store review.

::: brand icon="lucide:info"
**iOS is stricter than the other stores.** Apple's <a href="https://developer.apple.com/app-store/review/guidelines/#minimum-functionality" target="_blank">Guideline 4.2 (Minimum Functionality)</a> rejects apps that are just a repackaged website in a web view — the exact shape a thin PWABuilder wrapper produces. Use **Capacitor** for the App Store, add genuine native capability, and self-audit against the [App Store Readiness guide](/docs/publishing/app-store-readiness) before you submit.
:::

---

## Packaging paths

<div class="overflow-x-auto">

| **Path**        | **Output**                          | **Native APIs** | **Best for**                                  |
|-----------------|-------------------------------------|-----------------|-----------------------------------------------|
| **PWABuilder**  | Xcode / Android / MSIX wrapper      | Minimal         | Android, Windows, fastest route, direct download |
| **Capacitor**   | Real native project you own         | Full bridge     | **iOS App Store**, apps that need device features |

</div>

Both render your Manifest UI, so your app code doesn't change between them. The difference is what surrounds it: PWABuilder drops your PWA into a stock web view, while Capacitor gives you a native project with a plugin bridge — which is what makes real native features (and iOS review) achievable. Capacitor's plugins are surfaced through Manifest's [native capability plugins](/docs/publishing/app-store-readiness), so you reach them with Alpine-friendly attributes instead of writing Swift.

---

## Apps by OS

<div class="[&_tbody_>_tr:first-child]:opacity-50 overflow-x-auto">

| **Format**     | **Packaging**         | **App Store**                       | **Open Distribution**            |
|----------------|----------------------|--------------------------------------|----------------------------------|
| [**Web App**](/docs/publishing/web-apps) | — | —                                 | Yes                              |        
| **iOS & iPadOS**   | Capacitor (or PWABuilder) | App Store ($99/yr)              | —                                |
| **macOS**          | Capacitor or Mac Catalyst | Mac App Store ($99/yr)          | Yes                              |
| **Android**        | AAB / APK            | Google Play ($25)                    | Yes                              |
| **Windows**        | MSIX                 | Microsoft Store ($19+)               | Yes                              |
| **ChromeOS**       | Android TWA        | Google Play (via Android)            | —                                |
| **Linux**          | Snap, Flatpak, AppImage | Snap Store, Flathub               | Yes                              |

</div>

---

## iOS & iPadOS

- **Packaging:** Use <a href="https://capacitorjs.com" target="_blank">Capacitor</a> to generate a native Xcode project. A thin <a href="https://www.pwabuilder.com" target="_blank">PWABuilder</a> WebKit wrapper also builds, but risks rejection under Guideline 4.2 (see below).
- **App Store:** Sign and upload through <a href="https://appstoreconnect.apple.com" target="_blank">App Store Connect</a> on a Mac. Requires an Apple Developer account ($99/yr). Beta distribution goes through TestFlight.
- **Review:** Apple reviews iOS apps by hand and rejects "repackaged website" wrappers under <a href="https://developer.apple.com/app-store/review/guidelines/#minimum-functionality" target="_blank">Guideline 4.2</a>. Ship genuine native capability (Face ID, push, haptics, share) and native feel (safe-area layout, no browser chrome), then work the [App Store Readiness guide](/docs/publishing/app-store-readiness) and its 4.2 checklist before submitting.
- **Open Distribution:** Limited. As of iOS 17.4, EU users can install from alternative app marketplaces. Elsewhere, the App Store is the only path.

---

## macOS

- **Packaging:** PWABuilder generates the same Xcode wrapper as iOS, compiled for macOS via Mac Catalyst.
- **App Store:** Mac App Store submissions go through App Store Connect alongside iOS, on the same $99/yr Apple Developer account.
- **Open Distribution:** Bundle as a notarized `.dmg` or `.pkg` and distribute from your own site, or publish through <a href="https://brew.sh" target="_blank">Homebrew Cask</a>.

---

## Android

- **Packaging:** PWABuilder or Google's <a href="https://github.com/GoogleChromeLabs/bubblewrap" target="_blank">Bubblewrap CLI</a> wraps the PWA as a <a href="https://developer.chrome.com/docs/android/trusted-web-activity" target="_blank">Trusted Web Activity (TWA)</a>, producing an AAB or APK.
- **App Store:** Submit the AAB through the <a href="https://play.google.com/console" target="_blank">Google Play Console</a>. Requires a one-time $25 developer registration.
- **Open Distribution:** Amazon Appstore, Samsung Galaxy Store, and Huawei AppGallery all accept APKs. Users can also sideload an APK directly from any web download once they enable "Install unknown apps" for that source.

---

## Windows

- **Packaging:** PWABuilder produces an MSIX package.
- **App Store:** Submit the MSIX through <a href="https://partner.microsoft.com/dashboard" target="_blank">Microsoft Partner Center</a>. Requires a developer account (one-time $19 individual, $99 company).
- **Open Distribution:** Distribute the MSIX directly from your site, or wrap as a traditional `.exe` installer.

---

## ChromeOS

- **Packaging:** ChromeOS doesn't require its own native wrapper. To reach the Play Store, reuse the Android TWA package.
- **App Store:** Google Play runs on ChromeOS, so the same Android submission reaches Chromebooks.
- **Open Distribution:** None. Direct browser install (covered under [Web Apps](/docs/publishing/web-apps#installation)) is the only path outside the Play Store.

---

## Linux

- **Packaging:** Use the distribution-specific tool: <a href="https://snapcraft.io" target="_blank">Snapcraft</a> for Snaps, <a href="https://flatpak.org" target="_blank">Flatpak</a> for Flatpaks, or <a href="https://appimage.org" target="_blank">AppImage</a> for portable bundles.
- **App Store:** Publish to the <a href="https://snapcraft.io" target="_blank">Snap Store</a>, <a href="https://flathub.org" target="_blank">Flathub</a>, or the Arch User Repository depending on your reach.
- **Open Distribution:** An AppImage runs on most distributions without installation, suitable for direct download from your own site.
