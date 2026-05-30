/**
 * Hero interactive editor — Alpine data factory for the home page hero.
 *
 * Architecture:
 *   - Editor pane: a single contenteditable element managed by CodeJar (~3KB).
 *     CodeJar saves/restores the caret through every re-highlight pass so the
 *     cursor stays exactly on the rendered character. highlight.js tokenizes
 *     via window.hljs.
 *   - Preview pane: a scoped <div> on this page (not an iframe) — no Manifest
 *     reload on every keystroke. User CSS variables from the theme tab apply
 *     only to descendants of the preview container via inline style, so they
 *     don't leak to the page.
 *
 * Loading:
 *   This factory is loaded on every page (defer'd in index.html) so it's
 *   registered before Alpine processes the home component's x-data="heroEditor".
 *   The big runtime deps (highlight.js + CodeJar) live in the hero component's
 *   <template data-head> so they only load when the home page actually renders.
 *   init() polls window.CodeJar until ready before mounting.
 */
// Shared highlight helper used by BOTH the $hl magic (page-wide feature cards
// etc.) and the heroEditor instance's hl() method (the CodeJar re-highlight
// pass). Returns highlighted HTML when hljs is loaded AND the language is
// registered; otherwise a plain HTML-escaped fallback.
//
// Lean-mode contract: the framework code plugin loads only the languages it
// has seen `<pre x-code="…">` for. Asking hljs for an unregistered language
// would throw "Unknown language: …". We catch that case, kick off
// ManifestCode.loadHighlightJS(lang) to fetch the module, and bump the
// Alpine store version so any reactive caller re-evaluates once the module
// is registered. CodeJar's own re-highlight loop calls this on every
// keystroke; once the language lands it picks up automatically on the next
// keystroke (or via the explicit force-rehighlight in mountEditor).

// ─── Defensive bounds against hljs misbehaviour ────────────────────────────
// hljs.highlight runs synchronously and can be coaxed into pathological
// regex backtracking by (a) very large inputs, (b) certain grammars in
// lean mode (xml/html embed css+javascript via subLanguages; if those
// aren't registered the tokenizer can spin). We can't actually cancel a
// sync hljs call from outside, but we can refuse to start one we suspect
// will misbehave and log anything that takes too long so a regression
// shows up in the console instead of as a frozen tab.

// Reject inputs above this length outright. Pathological backtracking
// scales super-linearly with input size; ~10k characters is several times
// larger than any single line a Manifest doc realistically renders, so
// anything bigger is either a code dump (still readable as plaintext) or
// an attempt to wedge the page.
const MAX_HIGHLIGHT_INPUT_CHARS = 10000;

// Log a warning when a single hljs call exceeds this many milliseconds.
// Normal calls run in well under 5ms; over 100ms means a grammar is
// chewing through backtracking and we want a breadcrumb in the console.
const SLOW_HIGHLIGHT_MS = 100;

// Track what we've already asked the framework to load so we don't fire the
// request over and over from inside a reactive read. The first call kicks
// off the load; subsequent calls just return plaintext until the framework
// loader's promise resolves AND the hljs instance actually has the
// requested capability. Without these guards Defense 3 would loop:
// loadHighlightJS()'s cached resolved promise queues bumpHljsStoreVersion
// on every microtask, which re-runs $hl, which re-fires Defense 3, etc.
let _hljsFullRequested = false;
const _hljsLangRequested = new Set();

// Only bump the reactive store when state actually transitioned to "more
// capable than before". Otherwise the bump produces a re-eval that lands
// us back in the same plaintext branch and loops.
let _lastBumpedLangCount = 0;
function bumpHljsStoreVersionIfChanged(reason) {
  if (typeof window.Alpine === 'undefined' || !window.hljs) return;
  const currentLangCount = window.hljs.listLanguages?.().length || 0;
  if (currentLangCount <= _lastBumpedLangCount) return;
  _lastBumpedLangCount = currentLangCount;
  const s = window.Alpine.store('hljs');
  window.Alpine.store('hljs', {
    ...s,
    ready: true,
    version: (s.version || 0) + 1,
  });
}

// Public bump for the init Promise.all path — always fires (single-shot
// per init, not from inside a reactive read).
function bumpHljsStoreVersion() {
  if (typeof window.Alpine === 'undefined') return;
  _lastBumpedLangCount = window.hljs?.listLanguages?.().length || 0;
  const s = window.Alpine.store('hljs');
  window.Alpine.store('hljs', {
    ...s,
    ready: !!window.hljs,
    version: (s.version || 0) + 1,
  });
}

function highlightWith(code, lang) {
  if (!window.hljs || !code) return escapeHtml(code);

  // Defence 1: hard input-length cap. Anything bigger than this is
  // returned as plaintext immediately, no tokenizer involvement.
  // Catastrophic regex backtracking scales super-linearly with input
  // size; 10 KB is several times larger than anything a feature card
  // line or editor tab realistically holds, so anything over it is
  // either a code dump (still readable as plaintext) or an attempt to
  // wedge the page.
  if (code.length > MAX_HIGHLIGHT_INPUT_CHARS) {
    return escapeHtml(code);
  }

  // Defence 2: language not registered → request it once per language,
  // bump the store when it lands so reactive callers re-render with the
  // newly-available grammar.
  const langList = window.hljs.listLanguages?.() || [];
  if (window.hljs.listLanguages && !langList.includes(lang)) {
    if (!_hljsLangRequested.has(lang) && window.ManifestCode?.loadHighlightJS) {
      _hljsLangRequested.add(lang);
      window.ManifestCode.loadHighlightJS(lang)
        .then(() => bumpHljsStoreVersionIfChanged('lang:' + lang))
        .catch(() => { /* swallow */ });
    }
    return escapeHtml(code);
  }

  // Defence 4: time the actual highlight and warn on slow calls. The
  // warn won't abort an in-progress freeze (sync calls are
  // uncancellable), but it surfaces grammar regressions early instead
  // of leaving the user staring at a frozen tab.
  const t0 = performance.now();
  try {
    const result = window.hljs.highlight(code, {
      language: lang,
      ignoreIllegals: true,
    }).value;
    const elapsed = performance.now() - t0;
    if (elapsed > SLOW_HIGHLIGHT_MS) {
      console.warn(
        '[hero-editor] slow highlight(' + lang + ', ' + code.length + ' chars): '
        + elapsed.toFixed(0) + 'ms'
      );
    }
    return result;
  } catch {
    return escapeHtml(code);
  }
}

function escapeHtml(code) {
  return (code || '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
}

document.addEventListener('alpine:init', () => {

  // ─── Site-wide syntax-highlight magic ──────────────────────────────────
  // $hl(code, lang) returns highlighted HTML when window.hljs is loaded AND
  // the language module for `lang` is registered. Otherwise a plain
  // HTML-escaped string. Used by the features cards on the home page (and any
  // other site-wide code snippets).
  Alpine.store('hljs', { ready: !!window.hljs, version: 0 });
  Alpine.magic('hl', () => (code, lang) => {
    Alpine.store('hljs').version; // reactive dep — re-runs when a language loads
    return highlightWith(code, lang || 'xml');
  });

  Alpine.data('heroEditor', () => ({
    // CodeJar instance, populated by mountEditor in init() below. Pre-declared
    // so Alpine's reactive Proxy treats it as a known property.
    editor: null,

    // Alpine lifecycle hook: runs once when the x-data element mounts.
    // Resolves the editor's runtime deps (CodeJar + the per-language hljs
    // modules) through window.ManifestCode's loaders, then mounts CodeJar.
    // The framework code plugin's lean loader handles caching — calling
    // loadHighlightJS('xml') twice (once here, once when a docs-site code
    // block requests it) only fetches the module once.
    //
    // We also re-attempt on each SPA route change in case the user landed
    // on /docs first (where ManifestCode is already loaded but $refs.editor
    // didn't exist yet) and later navigated home.
    init() {
      const self = this;
      const tryMount = function () {
        if (self.editor) return; // already mounted
        if (!self.$refs.editor || !window.CodeJar) return false;
        try { self.mountEditor(self.$refs.editor); return true; }
        catch (e) { console.error('[heroEditor] mountEditor threw:', e); return false; }
      };
      // Resolve runtime deps through ManifestCode (the framework's lazy
      // loader). ManifestCode is registered synchronously when the code
      // plugin script executes, so on the home page it's always present
      // by the time alpine:init fires. If for some reason it isn't (e.g.
      // the code plugin failed to load), fall back to a short polling
      // loop so we still mount when CodeJar appears.
      if (window.ManifestCode?.loadCodeJar) {
        // Load the FULL hljs bundle (~43 KB gz) rather than the lean
        // per-language modules. The lean path doesn't transitively register
        // sublanguage dependencies (xml's grammar references css/javascript
        // for inline <style>/<script> detection; if those aren't loaded the
        // tokenizer can enter pathological backtracking on certain content,
        // pegging the main thread). Calling loadHighlightJS() with no
        // language argument forces the framework's loader into full-bundle
        // mode, which registers everything up front and is the right
        // trade-off for an editor that highlights arbitrary user input.
        // Mark that we've already requested the full bundle from init, so
        // Defense 2 inside highlightWith doesn't fire it a second time
        // from inside a reactive read (which is the loop that bit us).
        _hljsFullRequested = true;
        Promise.all([
          window.ManifestCode.loadCodeJar().catch(() => null),
          window.ManifestCode.loadHighlightJS().catch(() => null),
        ]).then(() => {
          // Defensive lock against lean-bundle overwrite. Up through
          // mnfst@0.5.92 the framework's loadHighlightCore (lean ESM, ~10
          // languages, no css/yaml/etc.) could be invoked AFTER our
          // full-bundle load completes — by any later x-code element on the
          // page — and unconditionally overwrites window.hljs with the
          // leaner instance. That regresses css/yaml/etc. on the home page
          // to plaintext. The framework patch (commit 2ae1b5a, due in
          // 0.5.93) guards against this, but until that's published we
          // freeze window.hljs to the most-capable instance via a setter
          // that only allows upgrades (more languages registered), never
          // downgrades. Safe to leave in place after the framework fix
          // ships; it's a no-op when no overwrite is attempted.
          const current = window.hljs;
          const currentCount = current?.listLanguages?.().length || 0;
          if (current && currentCount > 50) {
            let pinned = current;
            try {
              Object.defineProperty(window, 'hljs', {
                configurable: true,
                get() { return pinned; },
                set(v) {
                  const incomingCount = v?.listLanguages?.().length || 0;
                  // Only accept upgrades — refuse anything with fewer
                  // languages than what we already have.
                  if (incomingCount > (pinned?.listLanguages?.().length || 0)) {
                    pinned = v;
                  }
                  // else: silently drop the overwrite
                },
              });
            } catch { /* property already non-configurable — nothing we can do */ }
          }
          tryMount();
          // Single-shot bump: every $hl in the page re-evaluates exactly
          // once now that hljs is loaded. bumpHljsStoreVersion (not the
          // -IfChanged variant) is safe here because it runs once per
          // init, outside any reactive context.
          bumpHljsStoreVersion();
        });
      } else {
        // Fallback: short poll loop covering the unlikely "code plugin
        // not loaded" case (e.g. dev pages, embed scenarios).
        let tries = 0;
        const poll = function () {
          if (self.editor || ++tries > 200) return;
          if (!tryMount()) setTimeout(poll, 50);
        };
        poll();
      }
      // Re-attempt on route changes (e.g. /docs → /) in case deps weren't
      // ready during the initial mount window.
      window.addEventListener('manifest:route-change', tryMount);

      // Sync the preview's innerHTML + re-init Alpine on the rendered subtree.
      // We trigger on:
      //   `rendered`             — template source (user edited an HTML tab)
      //   `locale`               — Alpine doesn't reliably track scope
      //                            reactivity for dynamically-injected
      //                            innerHTML descendants; re-render to
      //                            refresh translated strings
      //   `files.products.body`  — user edited products.yaml; re-parse into
      //                            x.products, then re-render
      this.$watch('rendered', () => this.syncPreview());
      this.$watch('locale', () => {
        // Swap x.products to the current locale's variant (mimics how
        // Manifest's localization plugin auto-loads products.<locale>.yaml).
        this.x.products = this._productsByLocale[this.locale] || this._productsByLocale.en;
        this.syncPreview();
      });
      this.$watch('search', () => this.syncPreview());
      this.$watch('files.products.body', () => { this.parseProducts(); this.syncPreview(); });
      this.parseProducts();
      this.$nextTick(() => this.syncPreview());
    },

    tab: 'index',

    files: {
      index: {
        label: 'index.html', lang: 'xml',
        // `lead` is a non-editable but non-disabled descriptive comment shown
        // above the prefix. Lives in its own field so the editor renders it
        // without the muted `disabled` styling reserved for the bracketing
        // `<body>` and `</body>` tags.
        lead: '<!-- Minimal code, maximum function -->\n\n',
        // `class="page"` is Manifest's layout utility — it formats the
        // direct-child <header>, <main>, and <footer> with sensible
        // structural defaults, so we don't need framing classes on those
        // tags ourselves.
        prefix: '<body class="page">',
        // The page composition — header component placeholder + main content.
        // Real Manifest patterns: $x reactive data, $locale-keyed strings,
        // x-for iteration, x-model filter, theme-aware brand button.
        body:
          '\n' +
          '  <!-- header.html component -->\n' +
          '  <x-header></x-header>\n' +
          '\n' +
          '  <main class="col gap-4 p-4">\n' +
          '\n' +
          '    <!-- Greeting + search toggle -->\n' +
          '    <div class="row gap-2 items-center">\n' +
          '      <strong x-show="!searchOpen" class="grow" x-text="$x.t.greeting[$locale]"></strong>\n' +
          '      <input x-show="searchOpen" type="search" class="sm no-focus" x-model="search" :placeholder="$x.t.search[$locale]">\n' +
          '      <button class="sm ghost" @click="searchOpen = !searchOpen; searchOpen ? $nextTick(() => $el.parentElement.querySelector(\'input\').focus()) : (search = \'\')" :aria-label="searchOpen ? \'Close search\' : \'Open search\'" x-icon="searchOpen ? \'lucide:x\' : \'lucide:search\'"></button>\n' +
          '    </div>\n' +
          '\n' +
          '    <!-- Products -->\n' +
          '    <div class="col gap-4">\n' +
          '      <template x-for="p in $x.products.filter(p => !search || [p.name, p.price, String(p.stock)].some(f => f.toLowerCase().includes(search.toLowerCase())))" :key="p.name">\n' +
          '        <div class="card">\n' +
          '          <figure><span x-icon="p.icon"></span></figure>\n' +
          '          <div>\n' +
          '            <strong x-text="p.name"></strong>\n' +
          '            <small x-text="p.price"></small>\n' +
          '          </div>\n' +
          '          <span class="badge ms-auto" x-text="p.stock"></span>\n' +
          '        </div>\n' +
          '      </template>\n' +
          '    </div>\n' +
          '\n' +
          '  </main>',
        // Split the closing body tag string to avoid mnfst-run's live-reload
        // script injection (it does a textual replace on the first occurrence
        // in the HTTP response).
        suffix: '<' + '/body>',
      },
      header: {
        label: 'header.html', lang: 'xml',
        prefix: '',
        // Demonstration component — referenced from index.html as <x-header>.
        // <header> is bare; the .page utility on <body> handles its layout.
        // Visual styling (row, gap, padding, border) lives on the inner <nav>,
        // which is the semantic container for the navigation content.
        body:
          '<!-- Compose interfaces from reusable HTML components -->\n' +
          '\n' +
          '<header>\n' +
          '\n' +
          '  <!-- Nav -->\n' +
          '  <nav class="row items-center justify-between py-4 border-b border-line">\n' +
          '\n' +
          '    <!-- Logo -->\n' +
          '    <strong>Universal Exports</strong>\n' +
          '\n' +
          '      <!-- Locales -->\n' +
          '      <button class="sm ghost ms-auto" x-dropdown="locale-menu" x-icon="lucide:globe" aria-label="Language"></button>\n' +
          '      <menu popover id="locale-menu" class="min-w-0">\n' +
          '        <li @click="locale = \'en\'" :disabled="locale === \'en\'">English</li>\n' +
          '        <li @click="locale = \'es\'" :disabled="locale === \'es\'">Español</li>\n' +
          '        <li @click="locale = \'zh\'" :disabled="locale === \'zh\'">中文</li>\n' +
          '        <li @click="locale = \'ar\'" :disabled="locale === \'ar\'">العربية</li>\n' +
          '      </menu>\n' +
          '\n' +
          '      <!-- Color modes -->\n' +
          '      <button class="sm ghost" @click="darkMode = !darkMode" x-icon="darkMode ? \'lucide:sun\' : \'lucide:moon\'" aria-label="Color mode"></button>\n' +
          '\n' +
          '      <!-- Profile -->\n' +
          '      <button class="sm ghost disabled" x-icon="lucide:user-circle" aria-label="Profile"></button>\n' +
          '\n' +
          '  </nav>\n' +
          '\n' +
          '</header>',
        suffix: '',
      },
      theme: {
        label: 'manifest.theme.css', lang: 'css',
        prefix: '',
        // Theme variables AND any plain class rules. The utilities plugin
        // compiles --color-*, --spacing-*, --font-*, --radius-* etc. into
        // Tailwind-style utility classes. The .dark block overrides values
        // when color mode is dark. Custom class rules (like .card below) are
        // injected into a scoped <style> tag so they only apply inside the
        // preview pane — not site-wide.
        body:
          '/* Achieve visual identity with global styles */\n' +
          '\n' +
          ':root {\n' +
          '  --color-page: white;\n' +
          '  --color-surface-1: oklch(95% 0 0);\n' +
          '  --color-content-stark: black;\n' +
          '  --color-content-subtle: grey;\n' +
          '  --color-line: silver;\n' +
          '  --color-field-surface: oklch(92% 0 0);\n' +
          '  --color-field-inverse: black;\n' +
          '  --color-popover-surface: white;\n' +
          '  --spacing: 0.25rem;\n' +
          '  --radius: 0.5rem;\n' +
          '}\n' +
          '\n' +
          '.dark {\n' +
          '  --color-page: black;\n' +
          '  --color-surface-1: oklch(22% 0 0);\n' +
          '  --color-content-stark: white;\n' +
          '  --color-content-subtle: oklch(70% 0.01 60);\n' +
          '  --color-line: oklch(30% 0.005 60);\n' +
          '  --color-field-surface: oklch(28% 0 0);\n' +
          '  --color-field-inverse: white;\n' +
          '  --color-popover-surface: oklch(25% 0 0);\n' +
          '}\n' +
          '\n' +
          '.card {\n' +
          '  display: flex;\n' +
          '  align-items: center;\n' +
          '  gap: calc(var(--spacing) * 4);\n' +
          '  width: 100%;\n' +
          '\n' +
          '  & figure {\n' +
          '    display: flex;\n' +
          '    justify-content: center;\n' +
          '    align-items: center;\n' +
          '    width: 2.5rem;\n' +
          '    height: 2.5rem;\n' +
          '    background: var(--color-surface-1);\n' +
          '    border-radius: var(--radius);\n' +
          '  }\n' +
          '\n' +
          '  & div {\n' +
          '    display: flex;\n' +
          '    flex-direction: column;\n' +
          '  }\n' +
          '}',
        suffix: '',
      },
      products: {
        // Per Manifest's localization plugin: locale-specific JSON/YAML files
        // are named like `products.en.yaml`, `products.es.yaml`, etc., and
        // registered in manifest.json under one source name (`products`)
        // keyed by locale. The plugin auto-loads the current-locale file when
        // $locale changes. We show only the English file in this demo — the
        // other locale files are implied to exist in a real project.
        //
        // Field order is the natural reading order in a catalog: what it is,
        // what it costs, what it looks like, how many are left.
        label: 'products.en.yaml', lang: 'yaml',
        prefix: '',
        body:
          '# Easily drop in local and cloud data\n' +
          '\n' +
          '- name: Steel rebar coil\n' +
          '  price: $4,200\n' +
          '  icon: lucide:cylinder\n' +
          '  stock: 87\n' +
          '\n' +
          '- name: Coffee beans\n' +
          '  price: $3,150\n' +
          '  icon: lucide:coffee\n' +
          '  stock: 215\n' +
          '\n' +
          '- name: Cotton textile\n' +
          '  price: $890\n' +
          '  icon: lucide:scroll\n' +
          '  stock: 64\n' +
          '\n' +
          '- name: Solar panel\n' +
          '  price: $310\n' +
          '  icon: lucide:sun\n' +
          '  stock: 412\n' +
          '\n' +
          '- name: Hydraulic pump\n' +
          '  price: $1,840\n' +
          '  icon: lucide:cog\n' +
          '  stock: 36\n' +
          '\n' +
          '- name: Copper wire\n' +
          '  price: $670\n' +
          '  icon: lucide:cable\n' +
          '  stock: 156',
        suffix: '',
      },
    },

    // ─── Preview sandbox state ─────────────────────────────────────────────
    // The user's home.html template references $x and $locale (authentic
    // Manifest syntax). Those are real Alpine magics registered by Manifest's
    // data + localization plugins, so they shadow any local properties of the
    // same name. As a workaround the `rendered` getter rewrites $x → x and
    // $locale → locale before the preview's innerHTML is set — the user still
    // sees the real syntax in the editor; the preview just resolves against
    // local sandboxed names.
    locale: 'en',
    darkMode: false,
    search: '',
    // searchOpen lives in the heroEditor scope (not in a nested `x-data` inside
    // the template) so it persists across the innerHTML re-renders that fire
    // whenever `search` changes — otherwise opening the search field then
    // typing into it would immediately collapse it back closed.
    searchOpen: false,
    x: {
      // The `t` source mirrors how Manifest's localization plugin handles
      // small UI strings — typically a CSV with key/locale columns, or a
      // per-locale YAML. Here we keep it as a single locale-keyed object for
      // demo compactness.
      t: {
        greeting: { en: 'Welcome back, James', es: 'Bienvenido de nuevo, James', zh: '欢迎回来，James', ar: 'مرحبًا بعودتك، James' },
        search: { en: 'Search…', es: 'Buscar…', zh: '搜索…', ar: 'ابحث…' },
      },
      // The active products array. Swapped to the current locale's variant
      // by the $watch('locale') in init() — same effect Manifest's locale
      // plugin produces when it auto-loads the matching products.<locale>.yaml.
      products: [],
    },

    // Internal multilingual cache. The editor tab shows only the English file
    // (products.en.yaml), but the demo also lets users switch locales — so we
    // pre-stage equivalent locale variants here. In a real Manifest project
    // these would be four separate YAML files registered in manifest.json.
    _productsByLocale: {
      en: [
        { name: 'Steel rebar coil', price: '$4,200', icon: 'lucide:cylinder', stock: 87 },
        { name: 'Coffee beans', price: '$3,150', icon: 'lucide:coffee', stock: 215 },
        { name: 'Cotton textile', price: '$890', icon: 'lucide:scroll', stock: 64 },
        { name: 'Solar panel', price: '$310', icon: 'lucide:sun', stock: 412 },
        { name: 'Hydraulic pump', price: '$1,840', icon: 'lucide:cog', stock: 36 },
        { name: 'Copper wire', price: '$670', icon: 'lucide:cable', stock: 156 },
      ],
      es: [
        { name: 'Bobina de acero corrugado', price: '$4,200', icon: 'lucide:cylinder', stock: 87 },
        { name: 'Granos de café', price: '$3,150', icon: 'lucide:coffee', stock: 215 },
        { name: 'Tela de algodón', price: '$890', icon: 'lucide:scroll', stock: 64 },
        { name: 'Panel solar', price: '$310', icon: 'lucide:sun', stock: 412 },
        { name: 'Bomba hidráulica', price: '$1,840', icon: 'lucide:cog', stock: 36 },
        { name: 'Alambre de cobre', price: '$670', icon: 'lucide:cable', stock: 156 },
      ],
      zh: [
        { name: '钢筋盘卷', price: '$4,200', icon: 'lucide:cylinder', stock: 87 },
        { name: '咖啡豆', price: '$3,150', icon: 'lucide:coffee', stock: 215 },
        { name: '棉布', price: '$890', icon: 'lucide:scroll', stock: 64 },
        { name: '太阳能板', price: '$310', icon: 'lucide:sun', stock: 412 },
        { name: '液压泵', price: '$1,840', icon: 'lucide:cog', stock: 36 },
        { name: '铜线', price: '$670', icon: 'lucide:cable', stock: 156 },
      ],
      ar: [
        { name: 'لفة حديد التسليح', price: '$4,200', icon: 'lucide:cylinder', stock: 87 },
        { name: 'حبوب القهوة', price: '$3,150', icon: 'lucide:coffee', stock: 215 },
        { name: 'نسيج قطني', price: '$890', icon: 'lucide:scroll', stock: 64 },
        { name: 'لوحة شمسية', price: '$310', icon: 'lucide:sun', stock: 412 },
        { name: 'مضخة هيدروليكية', price: '$1,840', icon: 'lucide:cog', stock: 36 },
        { name: 'سلك نحاسي', price: '$670', icon: 'lucide:cable', stock: 156 },
      ],
    },

    // Re-render the preview innerHTML AND re-initialize Alpine on the new
    // subtree so directives inside the template (x-text, x-for, @click, etc.)
    // evaluate against this scope. Called on rendered/locale/search/products
    // change via $watch in init().
    //
    // We do NOT call Alpine.destroyTree on the preview element itself —
    // doing so would destroy the wrapper's own :dir / :class bindings.
    // Setting innerHTML drops the old descendants; Alpine's MutationObserver
    // cleans up their effects. initTree then wires the new descendants.
    //
    // Focus restoration: typing in the search input triggers a re-render on
    // every keystroke (because Alpine doesn't track scope reactivity inside
    // dynamically-injected innerHTML). We snapshot the focused field's
    // tagName + type + caret position before the wipe and restore them after,
    // so the user can keep typing without focus loss.
    syncPreview() {
      const el = this.$refs.preview;
      if (!el || !window.Alpine) return;
      const focused = el.contains(document.activeElement) ? document.activeElement : null;
      const snap = focused ? {
        tag: focused.tagName.toLowerCase(),
        type: focused.getAttribute('type'),
        selStart: focused.selectionStart,
        selEnd: focused.selectionEnd,
      } : null;
      el.innerHTML = this.rendered;
      window.Alpine.initTree(el);
      if (snap) {
        const selector = snap.type
          ? `${snap.tag}[type="${snap.type}"]`
          : snap.tag;
        const next = el.querySelector(selector);
        if (next) {
          next.focus();
          if (snap.selStart != null) {
            try { next.setSelectionRange(snap.selStart, snap.selEnd); } catch (e) { /* not all inputs support selection range */ }
          }
        }
      }
    },

    // CodeJar's per-keystroke re-highlight pass + the editor pane's
    // x-html bindings (prefix/body/suffix). Reads the hljs store version
    // so Alpine re-runs this expression when the framework finishes
    // loading the bundle or registering a new language — without that
    // read, the editor pane stays plaintext after first render even
    // though hljs is fully ready.
    hl(code, lang) {
      if (typeof Alpine !== 'undefined') Alpine.store('hljs').version;
      return highlightWith(code, lang);
    },

    // Mount CodeJar on the editable element. Wires up CodeJar's re-highlight
    // callback, our auto-close tag handler, our 3-line Enter split for
    // <tag>|</tag>, Tab passthrough for accessibility, and per-tab content
    // swapping.
    mountEditor(el) {
      // Per-tab indentOn regex covers braces (css/json) AND HTML opening tags.
      // The `(?<!\/)>` lookbehind avoids triggering on `/>` (self-close). The
      // `<[a-zA-Z]` requirement avoids triggering on `</…>` (closing tag).
      const indentOn = /[{[(]\s*$|<[a-zA-Z][^<>]*(?<!\/)>$/;
      this.editor = window.CodeJar(el, (e) => {
        e.innerHTML = this.hl(e.textContent, this.files[this.tab].lang);
      }, { tab: '  ', indentOn });
      // CodeJar sets style.whiteSpace = 'pre-wrap' internally. We want true
      // no-wrap (lines extend rightward, parent scrolls). Override after mount.
      el.style.whiteSpace = 'pre';
      this.editor.updateCode(this.files[this.tab].body);
      this.editor.onUpdate((code) => { this.files[this.tab].body = code; });

      // Capture-phase keydown handler. Fires BEFORE CodeJar's own listener so
      // we can intercept specific keys.
      //   Tab    — accessibility: escape the editor (default focus move)
      //   Enter  — when cursor sits between <tag>|</tag>, expand into three
      //            lines (VSCode-style):
      //               <tag>
      //                 |        ← cursor here, indented one level
      //               </tag>
      el.addEventListener('keydown', (ev) => {
        if (ev.key === 'Tab') {
          ev.stopImmediatePropagation();
          return;
        }
        if (ev.key === 'Enter' && this.files[this.tab].lang === 'xml') {
          const cursor = this.editor.save();
          const code = el.textContent;
          const before = code.slice(0, cursor.start);
          const after = code.slice(cursor.start);
          const endsOpen = />\s*$/.test(before) && !/\/>\s*$/.test(before);
          const startsClose = /^<\/[a-zA-Z][\w-]*>/.test(after);
          if (!endsOpen || !startsClose) return;
          const lineStart = before.lastIndexOf('\n') + 1;
          const baseIndent = (before.slice(lineStart).match(/^[ \t]*/) || [''])[0];
          const extra = '  ';
          ev.preventDefault();
          ev.stopImmediatePropagation();
          this.editor.updateCode(before + '\n' + baseIndent + extra + '\n' + baseIndent + after);
          const newPos = before.length + 1 + baseIndent.length + extra.length;
          this.editor.restore({ start: newPos, end: newPos, dir: cursor.dir });
        }
      }, true);

      // Auto-close HTML tags on `>`: append `</tagname>` after cursor when an
      // opening tag was just completed (not void, not self-closing).
      el.addEventListener('keyup', (ev) => {
        if (ev.key !== '>' || this.files[this.tab].lang !== 'xml') return;
        const code = el.textContent;
        const cursor = this.editor.save();
        const before = code.slice(0, cursor.start);
        const after = code.slice(cursor.start);
        const match = before.match(/<([a-zA-Z][\w-]*)([^<>]*?)>$/);
        if (!match) return;
        const tagName = match[1];
        const attrs = match[2];
        if (attrs.trim().endsWith('/')) return;
        const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
        if (VOID.has(tagName.toLowerCase())) return;
        if (after.startsWith('</' + tagName + '>')) return;
        this.editor.updateCode(before + '</' + tagName + '>' + after);
        this.editor.restore({ start: cursor.start, end: cursor.start, dir: cursor.dir });
      });

      // Swap editor content when the user switches tabs.
      this.$watch('tab', () => {
        if (this.files[this.tab].readOnly) return;
        this.editor.updateCode(this.files[this.tab].body);
      });
    },

    // Build the preview HTML:
    //   1. Substitute `<x-header>` (paired or self-closing) with the
    //      header.html body — if we left the literal tag, Manifest's
    //      component system would resolve it against the actual page's
    //      <x-header> component (the site nav), polluting the preview.
    //   2. Rewrite `$x` → `x` and `$locale` → `locale` so expressions in the
    //      template resolve against this sandbox's local data instead of the
    //      real (page-wide) Manifest magics with the same names.
    get rendered() {
      let html = this.files.index.body.replace(/<x-header\s*\/>|<x-header>\s*<\/x-header>/g, this.files.header.body);
      html = html.replace(/\$x\b/g, 'x').replace(/\$locale\b/g, 'locale');
      return html;
    },

    // Refresh x.products. Always sets the active list from the locale cache
    // first (so the preview has products even before js-yaml has loaded),
    // then tries to parse products.en.yaml — if successful, the parsed array
    // overrides the English cache (and the active list if locale === 'en').
    // Silently ignores parse errors so mid-edit invalid YAML doesn't crash.
    parseProducts() {
      this.x.products = this._productsByLocale[this.locale] || this._productsByLocale.en;
      if (!window.jsyaml) return;
      try {
        const parsed = window.jsyaml.load(this.files.products.body);
        if (Array.isArray(parsed)) {
          this._productsByLocale.en = parsed;
          if (this.locale === 'en') this.x.products = parsed;
        }
      } catch (e) { /* invalid yaml mid-edit, ignore */ }
    },

    // Build a scoped stylesheet from the user's theme.css body and inject it
    // into a <style> tag inside the figure. Each top-level selector is
    // rewritten so the rule only applies under the preview wrapper:
    //   :root   { … } → [data-preview]        { … }   (CSS variables)
    //   .dark   { … } → [data-preview].dark   { … }   (dark-mode overrides)
    //   .card   { … } → [data-preview] .card  { … }   (user class rules)
    // We also append `color` and `background-color` declarations that resolve
    // against the wrapper's redefined vars. Manifest's runtime utility
    // generator inlines the *resolved* theme value into utilities like
    // `bg-page` / `text-content-stark` instead of emitting `var(--color-page)`,
    // so without these the user's scoped values would never reach the preview.
    get themeStyleSheet() {
      // Strip CSS comments first. The selector-rewrite regex below uses a lazy
      // `[^{}]+?` to capture each selector — if a comment sits before `:root`
      // (or any other rule), the lazy match swallows the comment AND the
      // selector together, producing invalid scoped CSS and silently breaking
      // the rule. Removing comments up front keeps the rewriter focused on
      // real selectors.
      const body = this.files.theme.body.replace(/\/\*[\s\S]*?\*\//g, '');
      const scoped = body.replace(/(^|\})\s*([^{}]+?)\s*\{/g, (_m, prev, selector) => {
        const out = selector.split(',').map(s => {
          s = s.trim();
          if (s === ':root') return '[data-preview]';
          if (s === '.dark') return '[data-preview].dark';
          return '[data-preview] ' + s;
        }).join(', ');
        return prev + '\n' + out + ' {';
      });
      return scoped + '\n[data-preview] { color: var(--color-content-stark); background-color: var(--color-page); }';
    },
  }));
});
