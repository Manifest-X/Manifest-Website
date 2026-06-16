# Localization

Localize your project to different languages and regions.

---

## Overview

The localization plugin provides automatic language detection, URL-based locale switching, and seamless integration with [local data](/docs/core-plugins/local-data) for multilingual content.

---

## Setup

Localization is included in `manifest.js` with all core plugins, or can be selectively loaded. `manifest.json` is required to register translation files as data sources.

<div x-code-group copy>

```html "All Plugins (default)"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="router,data,localization"></script>
```

</div>

::: brand icon="lucide:info"
Localization requires the Manifest [router](/docs/core-plugins/router) and [data](/docs/core-plugins/local-data) plugins to operate.
:::

---

## Create Locale Files

You can organize your translations using JSON, YAML, or CSV files. Choose the format that best fits your workflow:


### CSV

CSV files offer flexible organization options for translations. You can store all languages and topics in a single CSV file, or across multiple.

<div x-code-group copy>

```csv "features.csv (all)"
key,en,fr,ar,zh
features.title,Features,Caractéristiques,الميزات,功能
features.performance.name,Fast Performance,Performance Rapide,أداء سريع,快速性能
features.performance.description,Lightning fast loading times,Temps de chargement ultra rapides,أوقات تحميل سريعة كالبرق,闪电般的加载速度
features.ease.name,Easy to Use,Facile à Utiliser,سهل الاستخدام,易于使用
features.ease.description,Simple and intuitive interface,Interface simple et intuitive,واجهة بسيطة وبديهية,简单直观的界面
features.responsive.name,Responsive,Responsive,متجاوب,响应式
features.responsive.description,Works on all devices,Fonctionne sur tous les appareils,يعمل على جميع الأجهزة,适用于所有设备
```

```csv "features-euro.csv"
key,en,fr,de,es,it
features.title,Features,Caractéristiques,Funktionen,Características,Funzionalità
features.performance.name,Fast Performance,Performance Rapide,Schnelle Leistung,Rendimiento Rápido,Prestazioni Veloci
features.performance.description,Lightning fast loading times,Temps de chargement ultra rapides,Blitzschnelle Ladezeiten,Tiempos de carga ultrarrápidos,Tempi di caricamento fulminei
```

```csv "features-asian.csv"
key,zh,ja,ko
features.title,功能,機能,기능
features.performance.name,快速性能,高速パフォーマンス,빠른 성능
features.performance.description,闪电般的加载速度,稲妻のように速い読み込み時間,번개처럼 빠른 로딩 시간
```

</div>

The first column (`key`) contains dot-notation paths to nested values. Subsequent columns are locale codes (`en`, `fr`, `ar`, `zh`, etc.). The plugin automatically detects available locales from the CSV header.

Each CSV file can contain one or more language columns.

---

### JSON & YAML

Create language-specific JSON or YAML files for your content, named and located however you like:

<div x-code-group copy>

```yaml "features.en.yaml"
features:
  - name: "Fast Performance"
    description: "Lightning fast loading times"
  - name: "Easy to Use"
    description: "Simple and intuitive interface"
  - name: "Responsive"
    description: "Works on all devices"
```

```yaml "features.fr.yaml"
features:
  - name: "Performance Rapide"
    description: "Temps de chargement ultra rapides"
  - name: "Facile à Utiliser"
    description: "Interface simple et intuitive"
  - name: "Responsive"
    description: "Fonctionne sur tous les appareils"
```

```yaml "features.ar.yaml"
features:
  - name: "أداء سريع"
    description: "أوقات تحميل سريعة كالبرق"
  - name: "سهل الاستخدام"
    description: "واجهة بسيطة وبديهية"
  - name: "متجاوب"
    description: "يعمل على جميع الأجهزة"
```

```yaml "features.zh.yaml"
features:
  - name: "快速性能"
    description: "闪电般的加载速度"
  - name: "易于使用"
    description: "简单直观的界面"
  - name: "响应式"
    description: "适用于所有设备"
```

</div>

Each file should have the same object/array hierarchy and keys. Only the values are unique to the target locale. If a reference key is missing from a file, the default locale is used.

---

## Register Locale Files

1. Register your localized sources in the project's `manifest.json`.
2. Set the default locale in `index.html` using `lang` attribute in the `<html>` tag.


<div x-code-group lines copy>

```json "manifest.json (CSV)"
{
  "data": {
    "features": {
      "locales": [
        "/translations-euro.csv",
        "/translations-asian.csv"
      ]
    }
  }
}
```

```json "manifest.json (JSON & YAML)"
{
  "data": {
    "features": {
      "en": "/features.en.yaml",
      "fr": "/features.fr.yaml",
      "ar": "/features.ar.yaml",
      "zh": "/features.zh.yaml"
    }
  }
}
```

```html "index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Project</title>
</head>
<body>
  <!-- ... -->
</body>
</html>
```

</div>

#### CSV

CSV files containing multiple languages are registered using the `locales` key, which point to a CSV file (or multiple files in an array). The locales are determined by the language codes in the CSV headers.

#### JSON & YAML

JSON and YAML declare each locale in an object using their language code as a nested key, like `en` or `fr`.

::: brand icon="lucide:info"
Always set `<html lang="…">` to your project's default language. The plugin treats this attribute as the **declared default** — the locale a fresh visitor lands on when no URL prefix, stored preference, or matching browser language is in play, and the locale `$locale.reset()` returns to. If `<html lang>` is missing or doesn't match an available locale, the plugin falls through to the browser language, then to the first locale it discovers while scanning `manifest.json` (which is iteration-order dependent and not a reliable default).
:::

---

## Language Detection

The plugin automatically detects the initial language using this priority order:

1. **URL path:** If a first path segment matches a language code in `manifest.json` (e.g. `/fr/about`), it gets highest priority for direct linking.
2. **UI toggles:** The user preference saved to local storage and persisting between sessions.
3. **HTML lang attribute:** `<html lang="fr">` is the DOM's source of truth for the current locale, persisting between sessions and modifiable only by 1 or 2.
4. **Browser language:** The `navigator.language` value.
5. **Fallback:** First available locale from `manifest.json`.

---

## Translating

Manifest has no build steps and is not a translation engine. To translate your content we recommend using AI tools like Cursor to autonomously update your locale files in any language.

---

## URL Paths

If a language code is detected as a slug anywhere in the URL path, that locale is automatically displayed.

<div x-code-group>

```html lines copy
<!-- Links -->
<a href="/en/docs/core-plugins/localization">English</a>
<a href="/fr/docs/core-plugins/localization">Français</a>
<a href="/zh/docs/core-plugins/localization">中文</a>
<a href="/ar/docs/core-plugins/localization">العربية</a>
<button class="link" @click="$locale.reset()">Base URL</button>
```

::: frame col gap-4 text-base [&_a]:underline
<div class="row-wrap gap-4">
  <a href="/en/docs/core-plugins/localization#url-paths">English</a>
  <a href="/fr/docs/core-plugins/localization#url-paths">Français</a>
  <a href="/zh/docs/core-plugins/localization#url-paths">中文</a>
  <a href="/ar/docs/core-plugins/localization#url-paths">العربية</a>
  <button class="link underline" @click="$locale.reset()">Base URL</button>
</div>
<template x-for="feature in $x['feature-examples'].content">
  <div class="col">
    <span class="h4" x-text="feature.name"></span>
    <span x-text="feature.description"></span>
  </div>
</template>
:::

</div>

---

## User Interface

### Localized Content

Like regular [local data](/docs/core-plugins/local-data#display-content), localizations are accessed using the `$x` magic method with dot notation. The structure follows this pattern:

`$x.sourceName.property.subProperty`
- `$x` — magic method prefix
- `sourceName` — data source name from `manifest.json` (e.g. `features`)
- `property` — object property or array name
- `subProperty` — nested property (optional at any level)

<div x-code-group copy>

```html "HTML"
<template x-for="feature in $x.features.content">
  <div class="col">
    <h4 x-text="feature.name"></h4>
    <p x-text="feature.description"></p>
  </div>
</template>
```

```csv "features.csv"
key,en,fr,ar,zh
features.title,Features,Caractéristiques,الميزات,功能
features.performance.name,Fast Performance,Performance Rapide,أداء سريع,快速性能
features.performance.description,Lightning fast loading times,Temps de chargement ultra rapides,أوقات تحميل سريعة كالبرق,闪电般的加载速度
features.ease.name,Easy to Use,Facile à Utiliser,سهل الاستخدام,易于使用
features.ease.description,Simple and intuitive interface,Interface simple et intuitive,واجهة بسيطة وبديهية,简单直观的界面
features.responsive.name,Responsive,Responsive,متجاوب,响应式
features.responsive.description,Works on all devices,Fonctionne sur tous les appareils,يعمل على جميع الأجهزة,适用于所有设备
```

```json "manifest.json"
{
  "data": {
    "features": {
      "locales": [ "/features.csv" ]
    }
  }
}
```

::: frame col gap-4
<div class="row gap-2">
  <button @click="$locale.set('en')">English</button>
  <button @click="$locale.set('fr')">Français</button>
  <button @click="$locale.set('zh')">中文</button>
  <button @click="$locale.set('ar')">العربية</button>
</div>
<template x-for="feature in $x['feature-examples'].content">
  <div class="col" :class="{ 'opacity-50': $store.data._localeChanging }">
    <span class="h4" x-text="feature.name"></span>
    <span x-text="feature.description"></span>
  </div>
</template>
:::

</div>

See [local data](/docs/core-plugins/local-data#display-content) for specifics on how to inject content as text, HTML, or attribute values like links and images.

---

### Current Locale

Display the current locale's language code with `$locale.current`{copy}, or its native name (endonym) with `$locale.name`{copy}:

<div x-code-group>

```html copy
<p>Code: <span x-text="$locale.current"></span></p>
<p>Name: <span x-text="$locale.name"></span></p>
```

::: frame text-base
<p>Code: <span x-text="$locale.current"></span></p>
<p>Name: <span x-text="$locale.name"></span></p>
:::

</div>

---

### Locale Toggles

Allow users to toggle locales with Alpine's `@click` directive, using the `$locale` magic method:
- `$locale.set('...')` sets the specified locale by its language code, e.g. `fr` for French
- `$locale.toggle()` toggles through all locales in the order set in `manifest.json`
- `$locale.reset()` restores the project's default locale — clears the stored UI preference, re-applies the original `<html lang>` (or browser language, or first available), updates `$locale.current` reactively, and strips any leading locale segment from the URL

<div x-code-group>

```html lines copy
<button @click="$locale.set('en')">English</button>
<button @click="$locale.set('fr')">Français</button>
<button @click="$locale.set('ar')">العربية</button>
<button @click="$locale.set('zh')">中文</button>
<button @click="$locale.toggle()">Toggle</button>
<button @click="$locale.reset()">Reset</button>
```

::: frame text-base
<button @click="$locale.set('en')">English</button>
<button @click="$locale.set('fr')">Français</button>
<button @click="$locale.set('ar')">العربية</button>
<button @click="$locale.set('zh')">中文</button>
<button @click="$locale.toggle()">Toggle</button>
<button @click="$locale.reset()">Reset</button>
<p class="mt-4">Current: <span x-text="$locale.current"></span></p>
:::

</div>

---

### Locale Lists

Sometimes it's useful to list the project's locales, such as for a locale switcher menu. This can be done with `$locale.list`{copy}, which returns one object per available locale, each carrying its **native name** (endonym), text direction, and active flag:

| Property | Description |
|---|---|
| `code`{copy} | Language code, e.g. `fr` |
| `name`{copy} | Native language name, e.g. `français` |
| `direction`{copy} | `ltr` or `rtl` |
| `current`{copy} | `true` for the active locale |

Native names come from the browser's baked-in `Intl.DisplayNames`. The list contains only the locales registered in `manifest.json`, in three orderings: `$locale.list` follows `manifest.json` order, with `.alphabetical` (by native name) and `.currentFirst` (active locale hoisted) as alternates.

<div x-code-group>

```html copy
<button x-dropdown="locale-menu" class="capitalize" x-text="$locale.name"></button>

<menu popover id="locale-menu">
  <template x-for="l in $locale.list.alphabetical" :key="l.code">
    <li @click="$locale.set(l.code)">
      <span class="capitalize" x-text="l.name"></span>
      <span class="trailing" x-text="l.code"></span>
    </li>
  </template>
</menu>
```

::: frame text-base
<button x-dropdown="locale-example-menu" class="capitalize" x-text="$locale.name"></button>
<menu popover id="locale-example-menu">
  <template x-for="l in $locale.list.alphabetical" :key="l.code">
    <li @click="$locale.set(l.code)">
      <span class="capitalize" x-text="l.name"></span>
      <span class="trailing" x-text="l.code"></span>
    </li>
  </template>
</menu>
:::

</div>

Custom or unsupported codes fall back to the code itself. Native names follow native casing (e.g. French `français`), and CSS text transforms can be applied for different casing.

---

### Reset Locale

Resetting the locale undoes the user's selection and returns the project to whatever a fresh first-visit would resolve to. It performs three steps:

1. **Clears the stored preference.** Any `localStorage` value written by a previous `$locale.set()` or `$locale.toggle()` is removed, so the next page load starts from a clean slate.
2. **Reverts to default locale.** Switches to the default, determined in order of precedence by: the `<html lang>` value (the developer's declared default), the browser language, or the first available locale in `manifest.json`.
3. **Strips the URL locale slug.** If the current URL (or a passed-in href) starts with `/fr/`, `/ar/`, etc., that segment is removed before navigating, since leaving it in place would cause the next page load to redetect into the just-cleared locale.


```html copy
<!-- Reset on same page -->
<button @click="$locale.reset()">Reset Locale</button>

<!-- Reset while navigating -->
<a href="/destination" @click.prevent="$locale.reset('/destination')">Destination</a>
```

---

### RTL Support

The plugin automatically detects and handles right-to-left languages like Arabic, Hebrew, and Persian:

<div x-code-group>

```html lines copy
<!-- Toggles -->
<button @click="$locale.set('en')">English (LTR)</button>
<button @click="$locale.set('ar')">العربية (RTL)</button>

<!-- Current direction magic method -->
<p>Direction: <strong x-text="$locale.direction"></strong></p>

<!-- Content -->
<template x-for="feature in $x.features.content">
  <div class="col">
    <h4 x-text="feature.name"></h4>
    <p x-text="feature.description"></p>
  </div>
</template>
```

::: frame col gap-4 text-base
<div class="row gap-2">
  <button @click="$locale.set('en')">English (LTR)</button>
  <button @click="$locale.set('ar')">العربية (RTL)</button>
</div>
<p>Direction: <strong x-text="$locale.direction"></strong></p>
<template x-for="feature in $x['feature-examples'].content">
  <div class="col">
    <h4 x-text="feature.name"></h4>
    <p x-text="feature.description"></p>
  </div>
</template>
:::

</div>

If an RTL language is detected as the current locale, the plugin automatically adds `dir=rtl` to the `<html>` tag, reversing the inline flow of page content. Detectable RTL languages are:

**Arabic Script**
- Arabic (`ar`)
- Azerbaijani (`az-Arab`) 
- Balochi (`bal`)
- Central Kurdish/Sorani (`ckb`)
- Persian/Farsi (`fa`)
- Gilaki (`glk`)
- Kashmiri (`ks`)
- Kurdish (`ku-Arab`)
- Northern Luri (`lrc`)
- Mazanderani (`mzn`)
- Western Punjabi (`pnb`)
- Pashto (`ps`)
- Sindhi (`sd`)
- Urdu (`ur`)

**Hebrew Script**
- Hebrew (`he`)
- Yiddish (`yi`)
- Judeo-Arabic (`jrb`)
- Judeo-Persian (`jpr`) 
- Ladino (`lad-Hebr`)

**Other Scripts**
- Dhivehi/Maldivian (`dv`) - Thaana script
- N'Ko (`nqo`) - N'Ko script
- Syriac (`syr`) - Syriac script
- Assyrian Neo-Aramaic (`aii`) - Syriac script
- Aramaic (`arc`) - Syriac script
- Samaritan Aramaic (`sam`) - Syriac script
- Mandaic (`mid`) - Mandaic script

**Historical Scripts**
- Ugaritic (`uga`)
- Phoenician (`phn`)
- Parthian (`xpr`)
- Old Persian (`peo`)
- Middle Persian/Pahlavi (`pal`)
- Avestan (`avst`)