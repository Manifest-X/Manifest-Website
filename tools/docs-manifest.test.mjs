import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { main, insert, filed, visibleFiles, PROFILES, trailers, defaultRange } from './docs-manifest.mjs';

const OLD = '2026-01-01T12:00:00Z';
const git = (cwd, ...a) => execFileSync('git', ['-C', cwd, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const ID = ['-c', 'user.name=T', '-c', 'user.email=t@t', '-c', 'commit.gpgsign=false'];

async function put(root, files) {
  for (const [rel, body] of Object.entries(files)) {
    await mkdir(dirname(join(root, rel)), { recursive: true });
    await writeFile(join(root, rel), body);
  }
}
async function commit(repo, files, msg, date) {
  await put(repo, files);
  git(repo, 'add', '-A');
  const env = date ? { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date } : process.env;
  execFileSync('git', ['-C', repo, ...ID, 'commit', '-q', '--allow-empty', '-m', msg], { env, stdio: 'ignore' });
  return git(repo, 'rev-parse', 'HEAD');
}

const WORK = '# WORK\n\n## Open\n\n- **title:** existing\n  - **status:** new\n\n## Done\n\n- **title:** old\n';

// Docs repo with origin/staging (+ origin/docs/*), a framework repo, a live dir and a WORK.md. Baselines are dated OLD.
async function world() {
  const root = await mkdtemp(join(tmpdir(), 'dm-'));
  const bare = join(root, 'docs.git');
  const author = join(root, 'author');
  const docs = join(root, 'docs');
  const fw = join(root, 'fw');
  const live = join(root, 'live');
  git(root, 'init', '-q', '--bare', bare);
  git(root, 'init', '-q', '-b', 'staging', author);
  git(author, 'remote', 'add', 'origin', bare);
  await commit(author, { 'articles/plugins/toasts.md': '# Toasts v1', 'articles/plugins/device.md': '# Device v1' }, 'docs: base', OLD);
  git(author, 'push', '-q', 'origin', 'staging');
  git(root, 'clone', '-q', '-b', 'staging', bare, docs);
  await put(live, { 'articles/plugins/toasts.md': '# Toasts v1', 'articles/plugins/device.md': '# Device v1' });
  git(root, 'init', '-q', '-b', 'master', fw);
  await commit(fw, { 'package.json': '{"name":"mnfst"}', 'src/scripts/manifest.toasts.js': 'v1' }, 'init', OLD);
  git(fw, 'tag', 'v1');
  const work = join(root, 'WORK.md');
  await writeFile(work, WORK);
  const run = async (extra = [], { range = 'v1..HEAD', prefetch = true } = {}) => {
    if (prefetch) git(docs, 'fetch', '-q', 'origin');
    const out = [];
    const code = await main(['--repo', fw, '--range', range, '--docs-repo', docs, '--live', live, '--work', work, '--today', '2026-10-30', ...extra], (s) => out.push(s));
    return { code, out: out.join('\n') };
  };
  const docsBranch = async (name, files, msg) => {
    git(author, 'checkout', '-q', '-b', name, 'staging');
    const sha = await commit(author, files, msg);
    git(author, 'push', '-q', 'origin', name);
    git(author, 'checkout', '-q', 'staging');
    return sha;
  };
  const docsStaging = async (files, msg) => {
    const sha = await commit(author, files, msg);
    git(author, 'push', '-q', 'origin', 'staging');
    return sha;
  };
  const mergeBranch = (name, del) => {
    git(author, ...ID, 'merge', '-q', '--no-ff', '-m', `Merge branch '${name}' into staging`, name);
    git(author, 'push', '-q', 'origin', 'staging');
    if (del) git(author, 'push', '-q', 'origin', '--delete', name);
  };
  return { root, fw, docs, author, live, work, run, docsBranch, docsStaging, mergeBranch };
}

test('an undocumented customer-visible change is flagged and files one docs item under Open, once', async () => {
  const w = await world();
  const sha = await commit(w.fw, { 'src/scripts/manifest.device.js': 'v2' }, 'device: new $secure option');
  const r = await w.run();
  assert.equal(r.code, 0);
  assert.match(r.out, new RegExp(`UNDOCUMENTED ${sha.slice(0, 7)} device: new \\$secure option`));
  assert.match(r.out, /hint: articles\/plugins\/device\.md/);
  assert.match(r.out, /Docs: filed a docs item for 1 change/);
  const text = await readFile(w.work, 'utf8');
  const rec = text.slice(text.indexOf('- **title:** Docs missing'), text.indexOf('## Done'));
  for (const f of ['title', 'type', 'priority', 'status', 'claim', 'filed-by', 'rationale', 'close criteria', 'docs-manifest']) assert.match(rec, new RegExp(`\\*\\*${f}:\\*\\*`), f);
  assert.match(rec, /^- \*\*title:\*\* Docs missing for 1 customer-visible change in mnfst v1\.\.HEAD$/m);
  assert.match(rec, /\*\*filed-by:\*\* docs-manifest 2026-10-30/);
  assert.ok(text.indexOf('existing') < text.indexOf('Docs missing') && text.indexOf('Docs missing') < text.indexOf('## Done'), 'inside ## Open');
  const again = await w.run();
  assert.match(again.out, /already have a docs item/);
  assert.equal(await readFile(w.work, 'utf8'), text);
  assert.equal((await w.run(['--strict'])).code, 1);
});

test('dry run prints the record, leaves WORK.md untouched and does not fetch', async () => {
  const w = await world();
  const sha = await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: stack limit');
  const r = await w.run(['--dry-run']);
  assert.match(r.out, /would file in .*WORK\.md \(dry run\):\n- \*\*title:\*\* Docs missing/);
  assert.match(r.out, /dry run, not fetched/);
  assert.equal(await readFile(w.work, 'utf8'), WORK);
  await w.docsStaging({ 'articles/plugins/toasts.md': '# Toasts v2' }, `docs: limit\n\nDocuments: mnfst@${sha.slice(0, 7)}`);
  assert.match((await w.run(['--dry-run'], { prefetch: false })).out, /UNDOCUMENTED/);
  assert.match((await w.run([], { prefetch: false })).out, /PENDING/);
});

test('a change documented live passes clean and files nothing', async () => {
  const w = await world();
  const sha = await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: stack limit\n\nDocs: articles/plugins/toasts.md');
  await w.docsStaging({ 'articles/plugins/toasts.md': '# Toasts v2' }, 'docs: toast limit');
  await put(w.live, { 'articles/plugins/toasts.md': '# Toasts v2' });
  const r = await w.run(['--strict']);
  assert.equal(r.code, 0);
  assert.match(r.out, new RegExp(`LIVE\\s+${sha.slice(0, 7)}`));
  assert.match(r.out, /Documentation alongside: live articles\/plugins\/toasts\.md/);
  assert.match(r.out, /Result: 0 undocumented/);
  assert.match(r.out, /Docs: clean, nothing to file\./);
  assert.equal(await readFile(w.work, 'utf8'), WORK);
});

test('Docs: articles/<path> needs a change on or after the source commit date', async () => {
  const w = await world();
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: stack limit\n\nDocs: articles/plugins/toasts.md');
  const r = await w.run(['--dry-run']);
  assert.match(r.out, /UNDOCUMENTED \w{7} toasts: stack limit\n\s+-> articles\/plugins\/toasts\.md unchanged on origin since \d{4}-\d{2}-\d{2}/);
  await w.docsStaging({ 'articles/plugins/toasts.md': '# Toasts v2' }, 'docs: toast limit');
  assert.match((await w.run(['--dry-run'])).out, /PENDING\s+\w{7} toasts: stack limit\n\s+-> \w{7} articles\/plugins\/toasts\.md on origin\/staging, not yet promoted/);
});

test('Docs: <branch> is pending until the live site serves the branch, then live', async () => {
  const w = await world();
  await w.docsBranch('docs/toast-limit', { 'articles/plugins/toasts.md': '# Toasts v2' }, 'docs: toast limit');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: stack limit\n\nDocs: docs/toast-limit');
  const r = await w.run(['--strict']);
  assert.equal(r.code, 0);
  assert.match(r.out, /PENDING\s+\w{7} toasts: stack limit\n\s+-> docs\/toast-limit unpublished \(articles\/plugins\/toasts\.md\)/);
  assert.match(r.out, /pending \(not on manifestx\.dev yet\) articles\/plugins\/toasts\.md/);
  assert.match(r.out, /Convention: branch refs break/);
  await put(w.live, { 'articles/plugins/toasts.md': '# Toasts v2' });
  assert.match((await w.run()).out, /LIVE\s+\w{7} toasts: stack limit/);
});

test('a merged-then-deleted docs branch resolves from staging history and files nothing', async () => {
  const w = await world();
  await w.docsBranch('docs/toast-limit', { 'articles/plugins/toasts.md': '# Toasts v2' }, 'docs: toast limit');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: stack limit\n\nDocs: docs/toast-limit');
  git(w.docs, 'fetch', '-q', 'origin');
  w.mergeBranch('docs/toast-limit', true);
  assert.match(git(w.docs, 'branch', '-r'), /origin\/docs\/toast-limit/, 'stale tracking ref kept (no prune)');
  const r = await w.run(['--strict']);
  assert.equal(r.code, 0);
  assert.match(r.out, /PENDING\s+\w{7} toasts: stack limit\n\s+-> docs\/toast-limit \(deleted, merged into origin\/staging\) on origin\/staging, not yet promoted \(articles\/plugins\/toasts\.md\)/);
  await put(w.live, { 'articles/plugins/toasts.md': '# Toasts v2' });
  const l = await w.run(['--strict']);
  assert.match(l.out, /LIVE\s+\w{7} toasts: stack limit/);
  assert.match(l.out, /Docs: clean, nothing to file\./);
  assert.equal(await readFile(w.work, 'utf8'), WORK);
});

test('a deleted docs branch that never landed is undocumented', async () => {
  const w = await world();
  await w.docsBranch('docs/abandoned', { 'articles/plugins/toasts.md': '# Toasts v2' }, 'docs: x');
  git(w.author, 'push', '-q', 'origin', '--delete', 'docs/abandoned');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: z\n\nDocs: docs/abandoned');
  assert.match((await w.run(['--dry-run'])).out, /UNDOCUMENTED \w{7} toasts: z\n\s+-> docs\/abandoned is not on origin and no merge of it is in origin\/staging history/);
});

test('a merged branch counts all its commits; a branch with no article files is undocumented', async () => {
  const w = await world();
  git(w.author, 'checkout', '-q', '-b', 'docs/two', 'staging');
  await commit(w.author, { 'articles/plugins/toasts.md': '# Toasts v2' }, 'docs: article');
  await commit(w.author, { 'data/nav.yaml': 'x' }, 'docs: nav');
  git(w.author, 'push', '-q', 'origin', 'docs/two');
  git(w.author, 'checkout', '-q', 'staging');
  w.mergeBranch('docs/two');
  await w.docsBranch('docs/empty', { 'data/other.yaml': 'y' }, 'docs: no articles');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: a\n\nDocs: docs/two');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v3' }, 'toasts: b\n\nDocs: docs/empty');
  const r = await w.run(['--dry-run']);
  assert.match(r.out, /PENDING\s+\w{7} toasts: a\n\s+-> docs\/two on origin\/staging, not yet promoted \(articles\/plugins\/toasts\.md\)/);
  assert.match(r.out, /UNDOCUMENTED \w{7} toasts: b\n\s+-> docs\/empty changes no article files/);
});

test('a Documents: trailer on the docs commit counts: staging-only is pending, served is live', async () => {
  const w = await world();
  const sha = await commit(w.fw, { 'src/scripts/manifest.device.js': 'v2' }, 'device: haptics');
  await w.docsStaging({ 'articles/plugins/device.md': '# Device v2' }, `docs: haptics\n\nDocuments: mnfst@${sha.slice(0, 7)}`);
  assert.match((await w.run()).out, /PENDING\s+\w{7} device: haptics\n\s+-> \w{7} articles\/plugins\/device\.md on origin\/staging, not yet promoted/);
  await put(w.live, { 'articles/plugins/device.md': '# Device v2' });
  const r = await w.run(['--strict']);
  assert.equal(r.code, 0);
  assert.match(r.out, /LIVE\s+\w{7} device: haptics/);
});

test('Documents: needs this repo as qualifier', async () => {
  const w = await world();
  const sha = await commit(w.fw, { 'src/scripts/manifest.device.js': 'v2' }, 'device: haptics');
  await w.docsStaging({ 'articles/plugins/device.md': '# Device v2' }, `docs: x\n\nDocuments: manifest-mcp@${sha.slice(0, 7)}, ${sha.slice(0, 7)}`);
  assert.match((await w.run(['--dry-run'])).out, /UNDOCUMENTED \w{7} device: haptics/);
});

test('a redirect is not served; an unreachable live site is pending per lookup, not fatal', async () => {
  const w = await world();
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: stack limit\n\nDocs: articles/plugins/toasts.md');
  await w.docsStaging({ 'articles/plugins/toasts.md': '# Toasts v2' }, 'docs: toast limit');
  let mode = 301;
  const srv = createServer((req, res) => {
    if (mode === 301) return res.writeHead(301, { location: '/docs/plugins/toasts' }).end('# Toasts v2');
    res.end('# Toasts v2');
  });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const url = `http://127.0.0.1:${srv.address().port}`;
  try {
    assert.match((await w.run(['--dry-run', '--live', url])).out, /PENDING\s+\w{7} toasts: stack limit/);
    mode = 200;
    assert.match((await w.run(['--dry-run', '--live', url])).out, /LIVE\s+\w{7} toasts: stack limit/);
  } finally {
    srv.close();
  }
  const down = await w.run(['--dry-run', '--live', 'http://127.0.0.1:9']);
  assert.match(down.out, /PENDING\s+\w{7} toasts: stack limit\n\s+-> .*live unreachable/);
});

test('Docs: none needs a reason; internal stays internal whatever the trailer; dangling article is undocumented', async () => {
  const w = await world();
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: rename local\n\nDocs: none (refactor, no behaviour change)');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2b' }, 'toasts: bare none\n\nDocs: none');
  await commit(w.fw, { 'tests/toasts.test.js': 't' }, 'toasts: more tests\n\nDocs: docs/nowhere');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v3' }, 'chore: lint');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v4' }, 'toasts: x\n\nDocs: articles/plugins/missing.md');
  const r = await w.run(['--dry-run']);
  assert.match(r.out, /EXEMPT\s+\w{7} toasts: rename local\n\s+-> Docs: none \(refactor, no behaviour change\)/);
  assert.match(r.out, /UNDOCUMENTED \w{7} toasts: bare none\n\s+-> `Docs: none` needs a reason/);
  assert.match(r.out, /internal\s+\w{7} toasts: more tests/);
  assert.match(r.out, /internal\s+\w{7} chore: lint/);
  assert.match(r.out, /UNDOCUMENTED \w{7} toasts: x\n\s+-> Docs: articles\/plugins\/missing\.md not found/);
  assert.match(r.out, /Result: 2 undocumented, 0 docs pending, 0 live, 1 exempt, 2 internal\./);
});

test('only the final trailer block declares', async () => {
  const w = await world();
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: q\n\nDocs: none (quoted in prose)\n\nMore prose after it.');
  assert.match((await w.run(['--dry-run'])).out, /UNDOCUMENTED \w{7} toasts: q\n\s+-> no Docs: trailer/);
});

test('without a WORK.md the record is printed as NOT FILED', async () => {
  const w = await world();
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: y');
  const r = await w.run(['--work', join(dirname(w.work), 'nope', 'WORK.md')]);
  assert.match(r.out, /Docs: NOT FILED, no WORK\.md found.*\n- \*\*title:\*\* Docs missing/);
});

test('default range runs from the previous tag to origin, not the local HEAD', async () => {
  const w = await world();
  const bare = join(w.root, 'fw.git');
  git(w.root, 'init', '-q', '--bare', bare);
  git(w.fw, 'remote', 'add', 'origin', bare);
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: pushed');
  git(w.fw, 'push', '-q', 'origin', 'master');
  git(w.fw, 'fetch', '-q', 'origin');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v3' }, 'toasts: local only');
  assert.equal(defaultRange(w.fw), 'v1..origin/master');
});

test('helpers: trailers, visibility, insert placement and EOLs, filed keys', () => {
  assert.deepEqual(trailers('x\n\nDocs: a.md, docs/b\ndocs: none (a, b)', 'Docs'), ['a.md', 'docs/b', 'none (a, b)']);
  assert.deepEqual(trailers('Docs: a.md\n\nprose', 'Docs'), []);
  assert.deepEqual(trailers('x\r\n\r\nDocs: a.md\r\nCo-Authored-By: X <x@x>', 'Docs'), ['a.md']);
  assert.deepEqual(visibleFiles(['src/scripts/a.js', 'src/scripts/a.test.js', 'tests/x.js', 'lib/a.js', 'packages/render/package.json', 'packages/render/r.mjs', 'templates/blog/index.html', 'packages/render/README.md'], PROFILES.mnfst), ['src/scripts/a.js', 'packages/render/r.mjs', 'templates/blog/index.html']);
  assert.deepEqual(visibleFiles(['claude-payload/skills/x/SKILL.md', 'src/notes.md', 'src/tools/a.ts'], PROFILES['manifest-mcp']), ['claude-payload/skills/x/SKILL.md', 'src/tools/a.ts']);
  assert.equal(insert('## Open\n\n- a\n', '- b'), '## Open\n\n- a\n\n- b\n');
  assert.equal(insert('## Open\n\n- a\n\n\n## Done\n- c', '- b'), '## Open\n\n- a\n\n- b\n\n## Done\n- c');
  assert.equal(insert('## Open\r\n\r\n- a\r\n\r\n## Done\r\n', '- b\n  - c'), '## Open\r\n\r\n- a\r\n\r\n- b\r\n  - c\r\n\r\n## Done\r\n');
  assert.equal(insert('## Open\r\n\r\n- a\r\n', '- b'), '## Open\r\n\r\n- a\r\n\r\n- b\r\n');
  assert.throws(() => insert('# none', '- b'), /no "## Open"/);
  assert.deepEqual([...filed('  - **docs-manifest:** mnfst@abcdef123456 Manifest-MCP@1234567\r\n')], ['mnfst@abcdef1', 'manifest-mcp@1234567']);
});
