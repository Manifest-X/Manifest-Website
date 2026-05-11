# Testing

Verify project readiness with automated testing.

---

## Overview

Run `npx mnfst-test` to initiate a project-wide test that will identify errors and omissions. Sub-directories can be targeted with a path like `npx mnfst-test website` for `/website`.

```bash copy
npx mnfst-test
```

The test suite includes:

- **Manifest integrity** — every component path and data-source path resolves on disk.
- **Web app completeness** — required and recommended fields for installable PWAs.
- **Component references** — every `<x-foo>` tag maps to a registered component; every registered component is used.
- **Data source references** — every `$x.<name>` maps to a registered source; unused sources flagged.
- **Directive expression syntax** — `x-data`, `x-show`, `x-text`, `x-if`, `x-for`, `x-bind:*`, `@*`, `:*`, `x-effect` all parse as JavaScript.
- **Route consistency** — internal `<a href>` values resolve to a registered route or a static file.
- **Locale parity** — localized data sources have the same keys across all locales.
- **Runtime** *(optional)* — boots the project headlessly, captures console errors, runs axe-core for a11y, validates internal links from the rendered DOM.

### Options

`npx mnfst-test [path] [options]`

| Option                  | Description                                                                                     |
|-------------------------|-------------------------------------------------------------------------------------------------|
| `path`                  | Project root (relative or absolute). Default: current dir.                                      |
| `--manifest <path>`     | `manifest.json` relative to root.                                                               |
| `--only <kind>`         | Run only `"static"` or `"runtime"`.                                                            |
| `--ignore <dir>`        | Skip a directory (repeatable).                                                                 |
| `--external`            | Also fetch external `<a href>` links.                                                          |
| `--strict-a11y`         | Surface axe "needs review" results.                                                            |
| `--json`                | Machine-readable JSON output.                                                                  |
| `--quiet`, `-q`         | Suppress passing checks.                                                                       |

Exit codes: `0` clean, `1` errors, `2` setup failure.

#### AI agents

AI agents should run with `--json` after generating or editing project files. Non-zero exit means there are issues to address. The JSON shape is stable and includes file paths and line numbers for every finding.

---

### Runtime checks

Console errors, axe-core a11y, and link validation require <a href="https://pptr.dev" target="_blank">puppeteer</a>. Without it, the runtime pass is skipped and the CLI prints install instructions:

```bash copy
npm install -D puppeteer
```

If Chromium isn't found:

```bash copy
npx puppeteer browsers install chrome
```

---

### Pre-commit

Static checks are fast and Chromium-free — ideal for hooks:

```bash copy
npx mnfst-test --only static --quiet
```

---

### CI

```yaml "GitHub Actions"
- run: npx mnfst-test --json > check.json
- run: cat check.json
```

---

## Component Tests

`mountManifest()` boots a snippet of HTML in <a href="https://github.com/capricorn86/happy-dom" target="_blank">happy-dom</a> with Alpine and Manifest plugins active, returning query and interaction helpers. Pair with <a href="https://vitest.dev" target="_blank">Vitest</a>:

```bash copy
npm install -D mnfst-test happy-dom vitest
```

Optionally install Alpine locally so the harness doesn't fetch it from the jsDelivr CDN at test time:

```bash copy
npm install -D alpinejs
```

```js "cart.test.js" copy
import { describe, it, expect } from 'vitest';
import { mountManifest } from 'mnfst-test';

describe('cart', () => {
    it('adds a product and updates the total', async () => {
        const { $, click } = await mountManifest({
            html: `
                <div x-data="{ items: [], total: 0, add(p) { this.items.push(p); this.total += p.price; } }">
                    <button @click="add({ id: 'sku-1', price: 10 })">Add</button>
                    <span data-testid="total" x-text="total"></span>
                </div>
            `
        });

        click('button');
        expect($('[data-testid=total]').textContent).toBe('10');
    });
});
```

Options for `mountManifest(opts)`:

| Option | Type | Description |
|---|---|---|
| `html` | `string` | HTML body to mount. Required unless `page` is set. |
| `page` | `string` | Path to a full HTML file to load as the document. |
| `manifest` | `object` | In-memory `manifest.json`. Defaults to `{}`. |
| `data` | `object` | In-memory data sources, keyed by name. Each becomes `$x.<key>`. |
| `plugins` | `string[]` | Paths to Manifest plugin files to evaluate after Alpine. |
| `settle` | `number` | Milliseconds to wait after mount for Alpine to render. Default `50`. |

Returns `{ window, document, body, $, $$, getByText, getByRole, getById, click, type, tick, unmount }`.

happy-dom approximates layout but isn't a real browser — for visual regressions or true cross-browser checks, use Playwright.

---

## End-to-end

For full user journeys, use <a href="https://playwright.dev" target="_blank">Playwright</a>. Nothing Manifest-specific to install:

```bash copy
npm init playwright@latest
```

Boot the project with `mnfst-run` and point Playwright at it:

```ts "playwright.config.ts" copy
import { defineConfig } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'npx mnfst-run',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI
    },
    use: { baseURL: 'http://localhost:3000' }
});
```

```ts "tests/cart.spec.ts" copy
import { test, expect } from '@playwright/test';

test('adds a product to cart', async ({ page }) => {
    await page.goto('/products');
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.goto('/cart');
    await expect(page.getByTestId('total')).toHaveText('$10.00');
});
```

Manifest's data layer (`$x`), router, and components all behave normally — Playwright sees the page after Alpine has finished initialization.
