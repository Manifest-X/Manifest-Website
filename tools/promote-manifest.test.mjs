import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { createServer } from 'node:http';
import { sitemapPaths, pageText, snapshot, diff, gate, validateApprovals, template, main } from './promote-manifest.mjs';

async function site(files) {
  const root = await mkdtemp(join(tmpdir(), 'pm-'));
  const locs = Object.keys(files.pages).map((p) => `<url><loc>https://manifestx.dev${p}</loc></url>`).join('');
  const all = { 'sitemap.xml': `<urlset>${locs}</urlset>`, ...files.extra };
  for (const [p, page] of Object.entries(files.pages)) {
    const md = page.md ? ` data-mnfst-md-src="/articles${p}.md"` : '';
    all[(p === '/' ? '' : p.slice(1) + '/') + 'index.html'] = `<html><body><main${md}>${page.html ?? ''}</main></body></html>`;
    if (page.md) all[`articles${p}.md`] = page.md;
  }
  for (const [rel, body] of Object.entries(all)) {
    await mkdir(dirname(join(root, rel)), { recursive: true });
    await writeFile(join(root, rel), body);
  }
  return root;
}

const prodPages = {
  '/': { html: 'Home' },
  '/docs/styles/reset': { md: '# Reset', html: 'nav A' },
  '/legal/privacy': { md: '# Privacy v1' },
};

test('sitemapPaths normalises hosts and trailing slashes', () => {
  assert.deepEqual(sitemapPaths('<loc>https://a.dev/docs/x/</loc><loc>https://b.dev/</loc><loc> https://a.dev/docs/x </loc>'), ['/', '/docs/x']);
});

test('pageText ignores scripts, styles and CDN-injected beacons', () => {
  const a = '<p>Hi</p><script src="x"></script>';
  const b = '<p>Hi</p>\n<script defer src="https://static.cloudflareinsights.com/beacon.min.js"></script><style>p{}</style>';
  assert.equal(pageText(a), pageText(b));
});

test('article pages fingerprint the markdown, so rebakes of the shell do not count as changes', async () => {
  const prod = await snapshot(await site({ pages: prodPages }));
  const stag = await snapshot(await site({ pages: { ...prodPages, '/docs/styles/reset': { md: '# Reset', html: 'nav B' } } }));
  assert.deepEqual(diff(stag, prod), []);
});

test('diff reports added, changed and removed pages', async () => {
  const prod = await snapshot(await site({ pages: prodPages }));
  const stag = await snapshot(await site({
    pages: {
      '/': { html: 'Home' },
      '/docs/styles/reset': { md: '# Reset' },
      '/legal/privacy': { md: '# Privacy v2' },
      '/docs/platform/connector': { md: '# Claude Connector' },
    },
  }));
  const rows = diff(stag, prod).map((r) => [r.kind, r.path, r.source]);
  assert.deepEqual(rows, [
    ['added', '/docs/platform/connector', '/articles/docs/platform/connector.md'],
    ['changed', '/legal/privacy', '/articles/legal/privacy.md'],
  ]);
  const removed = diff(prod, stag).find((r) => r.kind === 'removed');
  assert.equal(removed.path, '/docs/platform/connector');
});

test('gate blocks unapproved additions and passes approved ones', () => {
  const rows = [{ kind: 'added', path: '/docs/a', hash: 'h1', source: 'x' }];
  assert.equal(gate(rows, { approvals: [] }).ok, false);
  const ok = gate(rows, { approvals: [{ path: '/docs/a/', approver: 'Andrew', date: '2026-10-16' }] });
  assert.equal(ok.ok, true);
  assert.equal(ok.rows[0].status, 'approved');
});

test('an approval bound to a sha256 goes stale when the page changes', () => {
  const h = 'a'.repeat(64);
  const rows = [{ kind: 'changed', path: '/docs/a', hash: 'b'.repeat(64), source: 'x' }];
  const r = gate(rows, { approvals: [{ path: '/docs/a', approver: 'Andrew', date: '2026-10-16', sha256: h }] });
  assert.equal(r.ok, false);
  assert.equal(r.rows[0].status, 'stale');
});

test('removals never need approval', () => {
  assert.equal(gate([{ kind: 'removed', path: '/docs/a', hash: 'h' }], { approvals: [] }).ok, true);
});

test('malformed approvals block the promote', () => {
  assert.equal(gate([], null).ok, false);
  const { errors } = validateApprovals({ approvals: [{ path: '/a', approver: '', date: '2026-10-16' }, { path: '/b', approver: 'A', date: '16/10' }] });
  assert.equal(errors.length, 2);
  assert.equal(gate([], { approvals: [{ path: 'x', approver: 'A', date: '2026-10-16' }] }).ok, false);
});

test('template lists each pending page with its hash and blank approver', () => {
  const t = template([{ kind: 'added', path: '/a', hash: 'h' }, { kind: 'removed', path: '/b', hash: 'g' }]);
  assert.deepEqual(t, { approvals: [{ path: '/a', sha256: 'h', approver: '', date: '', note: 'added' }] });
});

test('main exits 1 on an unapproved staged article and 0 once approved', async () => {
  const prod = await site({ pages: prodPages });
  const stag = await site({ pages: { ...prodPages, '/docs/platform/connector': { md: '# Claude Connector' } } });
  const out = [];
  const empty = join(await mkdtemp(join(tmpdir(), 'pm-')), 'none.json');
  assert.equal(await main(['--staging', stag, '--production', prod, '--approvals', empty], (s) => out.push(s)), 1);
  assert.match(out[0], /UNAPPROVED\s+added\s+\/docs\/platform\/connector/);
  assert.match(out[0], /BLOCKED: 1 unapproved/);

  const file = join(dirname(empty), 'ok.json');
  await writeFile(file, JSON.stringify({ approvals: [{ path: '/docs/platform/connector', approver: 'Andrew', date: '2026-10-16' }] }));
  assert.equal(await main(['--staging', stag, '--production', prod, '--approvals', file], () => {}), 0);
});

test('reads deployments over HTTP', async () => {
  const root = await site({ pages: { ...prodPages, '/docs/new': { md: '# New' } } });
  const { readFile } = await import('node:fs/promises');
  const srv = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    try {
      res.end(await readFile(join(root, p)));
    } catch {
      res.statusCode = 404;
      res.end('Not found');
    }
  });
  await new Promise((r) => srv.listen(0, r));
  try {
    const url = `http://127.0.0.1:${srv.address().port}`;
    const rows = diff(await snapshot(url), await snapshot(await site({ pages: prodPages })));
    assert.deepEqual(rows.map((r) => r.path), ['/docs/new']);
  } finally {
    srv.close();
  }
});

test('docs nav is gated once as /data/docs.yaml, not on every page that bakes it', async () => {
  const nav = (g) => `<nav aria-label="Documentation"><small>${g}</small></nav>`;
  const prod = await snapshot(await site({ pages: { '/docs': { html: nav('Styles') + 'Docs' } }, extra: { 'data/docs.yaml': '- group: Styles\n' } }));
  const stag = await snapshot(await site({ pages: { '/docs': { html: nav('Platform Styles') + 'Docs' } }, extra: { 'data/docs.yaml': '- group: Platform\n- group: Styles\n' } }));
  assert.deepEqual(diff(stag, prod).map((r) => [r.kind, r.path, r.source]), [['changed', '/data/docs.yaml', 'nav']]);
});

test('other page text still counts, including the site header nav', () => {
  assert.notEqual(pageText('<nav>Home Docs</nav><p>x</p>'), pageText('<nav>Home Docs Pricing</nav><p>x</p>'));
});
