import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { main, insert, filed, visibleFiles, PROFILES, trailers } from './docs-manifest.mjs';

const git = (cwd, ...a) => execFileSync('git', ['-C', cwd, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const ID = ['-c', 'user.name=T', '-c', 'user.email=t@t', '-c', 'commit.gpgsign=false'];

async function put(root, files) {
  for (const [rel, body] of Object.entries(files)) {
    await mkdir(dirname(join(root, rel)), { recursive: true });
    await writeFile(join(root, rel), body);
  }
}
async function commit(repo, files, msg) {
  await put(repo, files);
  git(repo, 'add', '-A');
  git(repo, ...ID, 'commit', '-q', '--allow-empty', '-m', msg);
  return git(repo, 'rev-parse', 'HEAD');
}

const WORK = '# WORK\n\n## Open\n\n- **title:** existing\n  - **status:** new\n\n## Done\n\n- **title:** old\n';

// Docs repo with origin/staging (+ origin/docs/*), a framework repo, a live dir and a WORK.md.
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
  await commit(author, { 'articles/plugins/toasts.md': '# Toasts v1', 'articles/plugins/device.md': '# Device v1' }, 'docs: base');
  git(author, 'push', '-q', 'origin', 'staging');
  git(root, 'clone', '-q', '-b', 'staging', bare, docs);
  await put(live, { 'articles/plugins/toasts.md': '# Toasts v1', 'articles/plugins/device.md': '# Device v1' });
  git(root, 'init', '-q', '-b', 'master', fw);
  await commit(fw, { 'package.json': '{"name":"mnfst"}', 'src/scripts/manifest.toasts.js': 'v1' }, 'init');
  git(fw, 'tag', 'v1');
  const work = join(root, 'WORK.md');
  await writeFile(work, WORK);
  const run = async (extra = [], { range = 'v1..HEAD' } = {}) => {
    git(docs, 'fetch', '-q', '--prune', 'origin');
    const out = [];
    const code = await main(['--repo', fw, '--range', range, '--docs-repo', docs, '--live', live, '--work', work, '--no-fetch', '--today', '2026-10-30', ...extra], (s) => out.push(s));
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
  return { fw, live, work, run, docsBranch, docsStaging };
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

test('dry run prints the record and leaves WORK.md untouched', async () => {
  const w = await world();
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: stack limit');
  const r = await w.run(['--dry-run']);
  assert.match(r.out, /would file in .*WORK\.md \(dry run\):\n- \*\*title:\*\* Docs missing/);
  assert.equal(await readFile(w.work, 'utf8'), WORK);
});

test('a change documented live passes clean and files nothing', async () => {
  const w = await world();
  const sha = await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: stack limit\n\nDocs: articles/plugins/toasts.md');
  const r = await w.run(['--strict']);
  assert.equal(r.code, 0);
  assert.match(r.out, new RegExp(`LIVE\\s+${sha.slice(0, 7)}`));
  assert.match(r.out, /Documentation alongside: live articles\/plugins\/toasts\.md/);
  assert.match(r.out, /Result: 0 undocumented/);
  assert.match(r.out, /Docs: clean, nothing to file\./);
  assert.equal(await readFile(w.work, 'utf8'), WORK);
});

test('Docs: <branch> is pending until the live site serves the branch, then live', async () => {
  const w = await world();
  await w.docsBranch('docs/toast-limit', { 'articles/plugins/toasts.md': '# Toasts v2' }, 'docs: toast limit');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: stack limit\n\nDocs: docs/toast-limit');
  const r = await w.run(['--strict']);
  assert.equal(r.code, 0);
  assert.match(r.out, /PENDING\s+\w{7} toasts: stack limit\n\s+-> docs\/toast-limit unpublished \(articles\/plugins\/toasts\.md\)/);
  assert.match(r.out, /pending \(not on manifestx\.dev yet\) articles\/plugins\/toasts\.md/);
  await put(w.live, { 'articles/plugins/toasts.md': '# Toasts v2' });
  assert.match((await w.run()).out, /LIVE\s+\w{7} toasts: stack limit/);
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

test('a Documents: trailer for another repo does not count', async () => {
  const w = await world();
  const sha = await commit(w.fw, { 'src/scripts/manifest.device.js': 'v2' }, 'device: haptics');
  await w.docsStaging({ 'articles/plugins/device.md': '# Device v2' }, `docs: x\n\nDocuments: manifest-mcp@${sha.slice(0, 7)}`);
  assert.match((await w.run(['--dry-run'])).out, /UNDOCUMENTED \w{7} device: haptics/);
});

test('Docs: none is exempt, tests and chores are internal, a dangling reference is undocumented', async () => {
  const w = await world();
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: rename local\n\nDocs: none (refactor, no behaviour change)');
  await commit(w.fw, { 'tests/toasts.test.js': 't' }, 'toasts: more tests');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v3' }, 'chore: lint');
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v4' }, 'toasts: x\n\nDocs: articles/plugins/missing.md');
  const r = await w.run(['--dry-run']);
  assert.match(r.out, /EXEMPT\s+\w{7} toasts: rename local\n\s+-> Docs: none \(refactor, no behaviour change\)/);
  assert.match(r.out, /internal\s+\w{7} toasts: more tests/);
  assert.match(r.out, /internal\s+\w{7} chore: lint/);
  assert.match(r.out, /UNDOCUMENTED \w{7} toasts: x\n\s+-> Docs: articles\/plugins\/missing\.md not found/);
  assert.match(r.out, /Result: 1 undocumented, 0 docs pending, 0 live, 1 exempt, 2 internal\./);
});

test('without a WORK.md the record is printed as NOT FILED', async () => {
  const w = await world();
  await commit(w.fw, { 'src/scripts/manifest.toasts.js': 'v2' }, 'toasts: y');
  const r = await w.run(['--work', join(dirname(w.work), 'nope', 'WORK.md')]);
  assert.match(r.out, /Docs: NOT FILED, no WORK\.md found.*\n- \*\*title:\*\* Docs missing/);
});

test('helpers: trailers, visibility, insert placement, filed keys', () => {
  assert.deepEqual(trailers('x\n\nDocs: a.md, docs/b\ndocs: none (a, b)', 'Docs'), ['a.md', 'docs/b', 'none (a, b)']);
  assert.deepEqual(visibleFiles(['src/scripts/a.js', 'src/scripts/a.test.js', 'tests/x.js', 'lib/a.js', 'packages/render/package.json', 'packages/render/r.mjs'], PROFILES.mnfst), ['src/scripts/a.js', 'packages/render/r.mjs']);
  assert.equal(insert('## Open\n\n- a\n', '- b'), '## Open\n\n- a\n\n- b\n');
  assert.equal(insert('## Open\n\n- a\n\n\n## Done\n- c', '- b'), '## Open\n\n- a\n\n- b\n\n## Done\n- c');
  assert.throws(() => insert('# none', '- b'), /no "## Open"/);
  assert.deepEqual([...filed('  - **docs-manifest:** mnfst@abcdef123456 Manifest-MCP@1234567')], ['mnfst@abcdef1', 'manifest-mcp@1234567']);
});
