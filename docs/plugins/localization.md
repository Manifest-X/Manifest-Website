# Localization

Localize your project for different languages and regions.

---

## Setup

Localization is supported by an Alpine plugin, available on its own or as part of Indux bundles.

<x-code-group copy>

```html "Standalone"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux localization plugin only -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.localization.js"></script>
```

```html "Indux JS"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux JS -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.js"></script>
```

```html "Quickstart"
<!-- Indux JS, Alpine, and Tailwind combined -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.quickstart.js"></script>
```

</x-code-group>

The localization plugin provides automatic language detection, URL-based locale switching, and seamless integration with [data sources](/plugins/data-sources) for multilingual content.

::: brand icon="lucide:info"
Localization requires the Indux [router](/plugins/router) and [data sources](/plugins/data-sources) plugins to operate.
:::

---

## Localized Data Sources

Localization works with [data sources](/plugins/data-sources) to provide locale-specific content. Create separate files for each language you want to support.

### Create Localized Files

Create language-specific JSON or YAML files for your content. Use 2-letter language codes followed by a period to prefix the filenames:

<x-code-group copy>

```yaml "en.features.yaml"
features:
  - name: "Fast Performance"
    description: "Lightning fast loading times"
  - name: "Easy to Use"
    description: "Simple and intuitive interface"
  - name: "Responsive"
    description: "Works on all devices"
```

```yaml "fr.features.yaml"
features:
  - name: "Performance Rapide"
    description: "Temps de chargement ultra rapides"
  - name: "Facile à Utiliser"
    description: "Interface simple et intuitive"
  - name: "Responsive"
    description: "Fonctionne sur tous les appareils"
```

```yaml "ar.features.yaml"
features:
  - name: "أداء سريع"
    description: "أوقات تحميل سريعة كالبرق"
  - name: "سهل الاستخدام"
    description: "واجهة بسيطة وبديهية"
  - name: "متجاوب"
    description: "يعمل على جميع الأجهزة"
```

```yaml "zh.features.yaml"
features:
  - name: "快速性能"
    description: "闪电般的加载速度"
  - name: "易于使用"
    description: "简单直观的界面"
  - name: "响应式"
    description: "适用于所有设备"
```

</x-code-group>

Each file should have the same object/array heirarchy and keys. Only the values are unique to the target locale. If a reference key is missing from a file, the plugin will default to using the default locale.

---

### Register Localized Sources

1. Register your localized sources in the project's `manifest.json` config file.
2. Set the default locale in `index.html` using `lang` attribute in the `<html>` tag.

<x-code-group numbers copy>

```json "manifest.json"
{
  "data": {
    "pricing": "/data/pricing.json",
    "features": {
      "en": "/data/en.features.yaml",
      "fr": "/data/fr.features.yaml",
      "ar": "/data/ar.features.yaml",
      "zh": "/data/zh.features.yaml"
    }
  }
}
```

```html "index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My App</title>
</head>
<body>
  <!-- ... -->
</body>
</html>
```

</x-code-group>

Unlike non-localized data sources (like `pricing` above), localized sources (like `features`) declare each locale by their language code.

**Language Detection & SEO:**
The plugin automatically detects the initial language using this priority order:

1. **URL path** - `/fr/about` (first path segment) - **Highest priority for direct links**
2. **HTML lang attribute** - `<html lang="fr">` - **Fallback for non-localized URLs**
3. **localStorage** - Previously saved preference from UI toggles
4. **Browser language** - `navigator.language`
5. **Default fallback** - First available locale

**SEO Behavior:**
- **Direct links:** URL path takes priority (e.g., `/fr/about` → French content)
- **Page refresh:** URL path still takes priority over HTML `lang` attribute
- **Non-localized URLs:** Falls back to HTML `lang` attribute or `en` (English)
- **User switches language:** Updates DOM `lang`, saves preference, and updates URL

---

### Translating

Indux has no build steps and is not a translation engine. To translate your content we recommend using AI programming tools like Cursor or Copilot to quickly and autonomously generate new locale data sources or update existing ones.

---

## Display Content

Like regular [data sources](/plugins/data-sources#display-content), localized data sources are accessed using the $x magic method with dot notation. The structure follows this pattern:

`$x.sourceName.property[index].subProperty[index]`

**Structure breakdown:**
- `$x` - Magic method prefix
- `sourceName` - Data source name from `manifest.json` (e.g. `features`)
- `property` - Object property or array name
- `subProperty` - Nested property (optional at any level)
- `[index]` - Array index (optional)

::: frame col
<div class="row gap-2">
  <button @click="$locale.set('en')">English</button>
  <button @click="$locale.set('fr')">Français</button>
  <button @click="$locale.set('zh')">中文</button>
  <button @click="$locale.set('ar')">العربية</button>
</div>
<template x-for="feature in $x.features.content">
  <div class="col" :class="{ 'opacity-50': $store.data._localeChanging }">
    <span class="h4" x-text="feature.name"></span>
    <span x-text="feature.description"></span>
  </div>
</template>
:::

```html numbers copy
<!-- Toggles -->
<button @click="$locale.set('en')">English</button>
<button @click="$locale.set('fr')">Français</button>
<button @click="$locale.set('zh')">中文</button>
<button @click="$locale.set('ar')">العربية</button>

<!-- Content -->
<template x-for="feature in $x.features.content">
  <div class="col">
    <h4 x-text="feature.name"></h4>
    <p x-text="feature.description"></p>
  </div>
</template>
```

See [data sources](/plugins/data-sources#display-content) for specifics on how to inject content as text, HTML, or attribute values like links and images.

---

### URL Paths

If a language code is detected as a slug anywhere in the URL path, that locale is automatically displayed.

::: frame col
<div class="row-wrap gap-4">
  <a href="/en/plugins/localization">English</a>
  <a href="/fr/plugins/localization">Français</a>
  <a href="/zh/plugins/localization">中文</a>
  <a href="/ar/plugins/localization">العربية</a>
</div>
<template x-for="feature in $x.features.content">
  <div class="col">
    <span class="h4" x-text="feature.name"></span>
    <span x-text="feature.description"></span>
  </div>
</template>
:::

```html numbers copy
<!-- Links -->
<a href="/en/plugins/localization">English</a>
<a href="/fr/plugins/localization">Français</a>
<a href="/zh/plugins/localization">中文</a>
<a href="/ar/plugins/localization">العربية</a>

<!-- Content -->
<template x-for="feature in $x.features.content">
  <div class="col">
    <h4 x-text="feature.name"></h4>
    <p x-text="feature.description"></p>
  </div>
</template>
```

---

### UI Toggles

Allow users to toggle locales with Alpine's `@click` directive, using the `$locale` magic method:
- `$locale.set('...')` sets the specified locale by its language code, e.g. `fr` for French
- `$locale.toggle()` toggles through all locales in the order set in `manifest.json`

::: frame
<button @click="$locale.set('en')">English</button>
<button @click="$locale.set('fr')">Français</button>
<button @click="$locale.set('ar')">العربية</button>
<button @click="$locale.set('zh')">中文</button>
<button @click="$locale.toggle()">Toggle</button>
:::

```html numbers copy
<button @click="$locale.set('en')">English</button>
<button @click="$locale.set('fr')">Français</button>
<button @click="$locale.set('ar')">العربية</button>
<button @click="$locale.set('zh')">中文</button>
<button @click="$locale.toggle()">Toggle</button>
```

---

### Current Locale

Display the current locale's language code with `x-text="$locale.current"`:

::: frame
<p>Current: <span x-text="$locale.current"></span></p>
:::

```html copy
<p>Current: <span x-text="$locale.current"></span></p>
```

---

### RTL Support

The plugin automatically detects and handles right-to-left languages like Arabic, Hebrew, and Persian:

::: frame col
<div class="row gap-2">
  <button @click="$locale.set('en')">English (LTR)</button>
  <button @click="$locale.set('ar')">العربية (RTL)</button>
</div>
<p>Direction: <strong x-text="$locale.direction"></strong></p>
<template x-for="feature in $x.features.content">
  <div class="col">
    <h4 x-text="feature.name"></h4>
    <p x-text="feature.description"></p>
  </div>
</template>
:::

```html numbers copy
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

If a RTL language is detected as the current locale, the plugin automatically adds `dir="rtl"` to the `<html>` tag, reversing the inline flow of page content. Dectable RTL languages are:

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
- Manding (`man`)