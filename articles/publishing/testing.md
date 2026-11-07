# Testing

Verify project readiness with automated testing.

---

## Overview

Manifest's testing tool catches problems before your users do. A single command scans every page, component, and data source in your project, then reports anything that looks wrong: typos, broken links, missing translations, accessibility issues, dead references, and other regressions that are easy to introduce and easy to miss.

Run it from your project root:

```bash copy
npx mnfst-test
```

Or target a subdirectory with a path like `npx mnfst-test website`{copy} for `/website`.

The test suite checks:

- **Configuration** — every component file and data file declared in `manifest.json` actually exists on disk.
- **Web app completeness** — the required and recommended fields for an [installable web app](/docs/framework/publishing/web-apps).
- **Component usage** — every `<x-component>` tag in your project matches a registered component, and every registered component is actually used somewhere.
- **Data references** — every `$x.<name>` in your HTML matches a registered data source, and any unused sources are flagged.
- **Alpine syntax** — every Alpine attribute (`x-data`, `x-show`, `x-text`, `x-if`, `x-for`, `x-bind`, `@click`, etc.) parses as valid JavaScript.
- **Internal links** — every `<a href>` in your project resolves to a registered route or a real file.
- **Localization parity** — translated data sources have matching keys across every locale, so nothing is missing in any language.
- **Runtime checks** *(optional)* — boots the project in a headless browser, captures any console errors, runs <a href="https://github.com/dequelabs/axe-core" target="_blank">axe-core</a> for accessibility violations, and validates links against the rendered page.

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

### Runtime Checks

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

A pre-commit hook is a small script that runs automatically every time you try to commit code. It blocks the commit if anything fails, so problems get caught at the moment they're introduced instead of in review or in production. Wire one up with a tool like <a href="https://typicode.github.io/husky" target="_blank">Husky</a> and call the static checks below. They're fast and don't need Chromium installed:

```bash copy
npx mnfst-test --only static --quiet
```

---

### CI

Continuous integration (CI) runs commands automatically every time code is pushed to a hosting platform like <a href="https://github.com" target="_blank">GitHub</a> or <a href="https://gitlab.com" target="_blank">GitLab</a>, catching problems before they reach your live site. <a href="https://docs.github.com/en/actions" target="_blank">GitHub Actions</a> is GitHub's built-in CI: workflow files in `.github/workflows/` describe what to run and when.

The workflow below runs on every push and pull request, installs dependencies, then runs `mnfst-test` and writes the results to a JSON file the workflow prints back out:

```yaml ".github/workflows/test.yml" copy
name: Test
on: [push, pull_request]
jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with: { node-version: 20 }
            - run: npm ci
            - run: npx mnfst-test --json > check.json
            - run: cat check.json
              if: always()
```

A non-zero exit code fails the workflow, which most teams configure to block merges until it passes.

---

## Component Tests

For developers writing automated unit tests, `mountManifest()` lets you boot a snippet of HTML in isolation and assert how it behaves when clicked, typed into, or otherwise interacted with — useful for verifying individual components work correctly without spinning up the whole project.

The function boots the snippet in <a href="https://github.com/capricorn86/happy-dom" target="_blank">happy-dom</a> with Alpine and Manifest plugins active, and returns query and interaction helpers. Pair with <a href="https://vitest.dev" target="_blank">Vitest</a>:

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
        const { $, click, tick } = await mountManifest({
            html: `
                <div x-data="{ items: [], total: 0, add(p) { this.items.push(p); this.total += p.price; } }">
                    <button @click="add({ id: 'sku-1', price: 10 })">Add</button>
                    <span data-testid="total" x-text="total"></span>
                </div>
            `
        });

        click('button');
        await tick();
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
| `appwrite` | `object` | A fake data backend or its options (see [test data](#test-data)). Returned as `fake`. |
| `settle` | `number` | Milliseconds to wait after mount for Alpine to render. Default `50`. |

Returns: `{ window, document, body, $, $$, getByText, getByRole, getById, click, type, tick, unmount }`

happy-dom approximates layout but isn't a real browser. For what users actually see, use [golden journeys](#golden-journeys).

---

## Test Data

Tests for a data-driven app need data that behaves like the real backend. Instead of writing a fake database for each test file, import Manifest's: an in-memory Appwrite backend that Manifest's own data plugins run on, so `$x`, `$query`, pagination, `$create`/`$update`/`$delete`, `$search` and realtime updates behave as they do in production.

```js "tasks.test.js" copy
import { it, expect } from 'vitest';
import { mountManifest } from 'mnfst-test';

it('lists open tasks', async () => {
    const { $$, fake } = await mountManifest({
        appwrite: { databases: { main: { tasks: [{ title: 'Write docs', done: false }] } } },
        manifest: {
            appwrite: { projectId: 'demo', endpoint: 'https://example.test/v1' },
            data: { tasks: { appwriteDatabaseId: 'main', appwriteTableId: 'tasks' } }
        },
        plugins: ['node_modules/mnfst/lib/manifest.data.js', 'node_modules/mnfst/lib/manifest.appwrite.data.js'],
        html: `<ul x-data><template x-for="t in $x.tasks" :key="t.$id"><li x-text="t.title"></li></template></ul>`,
        settle: 200
    });

    expect($$('li')).toHaveLength(1);
});
```

The fake behaves like Appwrite rather than an ideal database, so tests catch what production would do:

- Queries use Appwrite's own format and operators, including `or`, `search`, sorting, `limit`, `offset` and cursors. An unknown operator fails.
- A list without a `limit` returns 25 rows, a `limit` over 5,000 fails, and totals stop counting at 5,000.
- Text matching and sorting ignore case.
- Every write sends a realtime event with Appwrite's event names, filtered the way Appwrite filters subscriptions.

To test a store or helper that talks to Appwrite directly, use the fake on its own:

```js copy
import { createFakeAppwrite } from 'mnfst-test/fake';

const fake = createFakeAppwrite({ databases: { main: { tasks: [] } } });
await fake.tablesDB.createRow({ databaseId: 'main', tableId: 'tasks', rowId: 'a', data: { title: 'One' } });
fake.lastQueries('tasks');               // queries of the latest list
fake.failNext('listRows', { code: 503 }); // the next list fails
```

| Member | Description |
|---|---|
| `sdk` | Stands in for `window.Appwrite` (`Client`, `TablesDB`, `Storage`, `Realtime`, `Query`, `ID`, and more) |
| `tablesDB` | A ready table client |
| `table(id)` | Read and change rows as another user: `rows()`, `get()`, `count()`, `insert()`, `update()`, `remove()`, `seed()`, `clear()` |
| `calls`, `lastQueries(table)` | Every call the app made, and the queries of the latest list |
| `failNext(method, error)` | Make the next call fail |

### Fixtures

Two tenants cover most bugs: one with thousands of rows and one with none. The fixture helpers build both from one description, with the same rows every run so screenshots stay stable:

```js copy
import { heavyTenant, emptyTenant } from 'mnfst-test/fixtures';

const schema = { main: { tasks: (i, { words, int }) => ({ title: words(2), priority: int(1, 5) }) } };
const heavy = heavyTenant(schema, { rows: 5000 });
const empty = emptyTenant(schema);
```

Pass either one wherever the fake takes options.

---

## Golden Journeys

A golden journey is a path a user must always be able to walk, such as signing in, finding a record or adding one. `mnfst-test journeys` walks each one in a real browser on fixture data and compares screenshots with saved baselines, catching layout, data and realtime bugs that component tests miss.

Journeys need <a href="https://pptr.dev" target="_blank">puppeteer</a>:

```bash copy
npm install -D mnfst-test puppeteer
```

```js "journeys.mjs" copy
import { heavyTenant, emptyTenant } from 'mnfst-test/fixtures';

const schema = { main: { tasks: (i, { words }) => ({ title: words(2) }) } };

export default {
    root: '.',
    viewport: { width: 1280, height: 800 },
    journeys: [
        {
            name: 'empty workspace',
            fake: emptyTenant(schema),
            async steps(j) {
                await j.waitForData('tasks');
                await j.snap('empty');
            }
        },
        {
            name: 'busy workspace',
            fake: heavyTenant(schema),
            async steps(j) {
                await j.waitForData('tasks');
                await j.snap('list');
                await j.fake.table('tasks').insert({ title: 'Live row' });
                await j.page.waitForFunction(() => document.body.textContent.includes('Live row'));
            }
        }
    ]
};
```

Save baselines once, then compare on every run:

```bash copy
npx mnfst-test journeys journeys.mjs --update
```

```bash copy
npx mnfst-test journeys journeys.mjs
```

A journey fails when a step throws, a screenshot differs from its baseline, or the page logs a console error. Failed screenshots save the actual image and a diff highlighting the changed pixels in `__screenshots__/__diff__/`. Commit the baselines. They are saved per operating system, because fonts render slightly differently on each.

Each journey's `steps` receives:

| Member | Description |
|---|---|
| `page` | The <a href="https://pptr.dev/api/puppeteer.page" target="_blank">puppeteer page</a>, for clicking and typing |
| `fake` | The page's fake backend: `table()`, `calls()`, `lastQueries()`, `failNext()` |
| `waitForData(source)` | Wait until `$x.<source>` has loaded |
| `x(expression)` | Evaluate an Alpine expression in the page, e.g. `x('$x.tasks.length')` |
| `snap(name, options)` | Compare a screenshot. Options: `selector`, `fullPage`, `mask` (selectors to hide) |

Options for `npx mnfst-test journeys [file]`:

| Option | Description |
|---|---|
| `--update` | Rewrite the baselines |
| `--base-url <url>` | Run against a deployed site instead of serving `root` |
| `--ci` | Fail when a baseline is missing (on automatically in CI) |
| `--filter <text>` | Run only journeys whose name contains the text |
| `--root <dir>` | Serve this directory instead of the config's `root` |
| `--json` | Machine-readable results |

### After Each Landing

Run the journeys against staging every time a change lands there, before promoting it to production:

```bash copy
npx mnfst-test journeys journeys.mjs --base-url https://staging.example.com --ci
```

Journeys with fixture data still use it on staging, so the screenshots check the deployed code against the baselines. Journeys without `fake` use the real staging backend: keep those to behaviour checks without screenshots, since real data changes. In CI, add the command as a step after the staging deploy.

---

## End-to-end

For flows beyond golden journeys, such as cross-browser runs or third-party checkouts, <a href="https://playwright.dev" target="_blank">Playwright</a> is the standard tool, with nothing Manifest-specific to install:

```bash copy
npm init playwright@latest
```

Boot the project with `mnfst-run` and point Playwright at it:

```ts "playwright.config.ts" copy
import { defineConfig } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'npx mnfst-run --port 3000 --no-idle-shutdown --no-open',
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

Manifest's data layer (`$x`), router, and components all behave normally. Playwright sees the page after Alpine has finished initialization.
