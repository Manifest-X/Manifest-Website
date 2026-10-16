import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, symlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { createServer } from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { normalize, refs, source, crawl, diff, gate, validateApprovals, template, main } from './promote-manifest.mjs';
import { classify } from '../.claude/hooks/promote-gate.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HOOK = join(ROOT, '.claude/hooks/promote-gate.mjs');
const H = (c) => c.repeat(64);

const page = (body, { title = 'Doc', md } = {}) =>
  `<html><head><title>${title}</title></head><body>${md ? `<main data-mnfst-md-src="${md}">` : '<main>'}${body}</main></body></html>`;

const BASE = {
  'index.html': page('<a href="/docs/reset">Reset</a><a href="/legal/privacy">Privacy</a>'),
  'sitemap.xml': '<urlset><url><loc>https://manifestx.dev/docs/reset</loc></url><url><loc>https://manifestx.dev/legal/privacy</loc></url></urlset>',
  'manifest.json': JSON.stringify({ components: ['components/header.html'], data: { faq: '/data/faq.yaml' } }),
  'components/header.html': '<header>Manifest</header>',
  'data/faq.yaml': '- q: Price\n  a: Free\n',
  'docs/reset/index.html': page('Reset', { md: '/articles/reset.md' }),
  'articles/reset.md': '# Reset',
  'legal/privacy/index.html': page('Privacy', { md: '/articles/privacy.md' }),
  'articles/privacy.md': '# Privacy v1',
};

async function site(files) {
  const root = await mkdtemp(join(tmpdir(), 'pm-'));
  for (const [rel, body] of Object.entries(files)) {
    if (body == null) continue;
    await mkdir(dirname(join(root, rel)), { recursive: true });
    await writeFile(join(root, rel), body);
  }
  return root;
}

async function serve(root, { fail, etag, onHead } = {}) {
  const srv = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (fail && p === fail) return (res.statusCode = 500), res.end('boom');
    if (req.method === 'HEAD') onHead?.(p);
    if (p.endsWith('/')) p += 'index.html';
    for (const c of [p, p + '/index.html']) {
      try {
        const body = await readFile(join(root, c));
        if (etag) res.setHeader('etag', `"${createHash('md5').update(body).digest('hex')}"`);
        return res.end(req.method === 'HEAD' ? undefined : body);
      } catch {}
    }
    res.statusCode = 404;
    res.end('Not found');
  });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  return { url: `http://127.0.0.1:${srv.address().port}`, close: () => srv.close() };
}

const rowsOf = async (stag, prod) => diff(...(await crawl([source(stag), source(prod)])));
const kinds = (rows) => rows.map((r) => `${r.kind} ${r.path}`);

test('normalize strips only Cloudflare injections, ?v= stamps and the manifest deployment key', () => {
  const a = '<p>x</p><script src="/a.js?v=abc123ef"></script></body>';
  const b = '<p>x</p><script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon=\'{}\'></script><script src="/a.js?v=99887766"></script><script>(function(){function c(){var b=a.contentDocument||1}})();</script></body>';
  assert.equal(normalize('/i.html', Buffer.from(a)).toString(), normalize('/i.html', Buffer.from(b)).toString());
  assert.equal(normalize('/manifest.json', Buffer.from('{"a":1,"deployment":"x"}')).toString(), normalize('/manifest.json', Buffer.from('{"a":1}')).toString());
  assert.notEqual(normalize('/i.html', Buffer.from('<p>x</p><script>evil()</script>')).toString(), normalize('/i.html', Buffer.from('<p>x</p>')).toString());
});

test('refs finds routes, assets, sitemap locs, manifest entries and md sources', () => {
  const r = refs('/docs/x/index.html', '<a href="/docs/y">y</a><img src="../img/a.png"><loc>https://manifestx.dev/legal</loc><div x-markdown="\'/articles/z.md\'"></div><a href="https://other.dev/q">');
  assert.deepEqual(r.sort(), ['/articles/z.md', '/docs/img/a.png', '/docs/y/index.html', '/legal/index.html']);
  assert.deepEqual(refs('/manifest.json', '{"components":["components/h.html"]}'), ['/components/h.html']);
});

test('identical builds pass with no rows', async () => {
  assert.deepEqual(await rowsOf(await site(BASE), await site(BASE)), []);
});

test('non-page files are gated: components, data yaml, images, files no page links to', async () => {
  const stag = await site({ ...BASE, 'components/header.html': '<header>Manifest Pro $15</header>', 'data/faq.yaml': '- q: Price\n  a: $15\n', 'og/new.png': 'png', 'scripts/orphan.js': 'x()' });
  assert.deepEqual(kinds(await rowsOf(stag, await site(BASE))), [
    'changed /components/header.html',
    'changed /data/faq.yaml',
    'added /og/new.png',
    'added /scripts/orphan.js',
  ]);
});

test('title or meta change on a markdown-backed page is gated', async () => {
  const stag = await site({ ...BASE, 'docs/reset/index.html': page('Reset', { md: '/articles/reset.md', title: 'Reset - now with Pro' }) });
  assert.deepEqual(kinds(await rowsOf(stag, await site(BASE))), ['changed /docs/reset/index.html']);
});

test('a page dropped from the staging sitemap but still served and edited is changed, not removed', async () => {
  const stag = await site({ ...BASE, 'sitemap.xml': '<urlset><url><loc>https://manifestx.dev/docs/reset</loc></url></urlset>', 'index.html': page('<a href="/docs/reset">Reset</a>'), 'articles/privacy.md': '# Privacy v2' });
  const s = await serve(stag);
  const p = await serve(await site(BASE));
  try {
    const rows = await rowsOf(s.url, p.url);
    assert.ok(kinds(rows).includes('changed /articles/privacy.md'));
    assert.ok(!rows.some((r) => r.kind === 'removed'));
    assert.equal(gate(rows, { approvals: [] }).ok, false);
  } finally {
    s.close();
    p.close();
  }
});

test('removed means absent from staging, and removals pass', async () => {
  const stag = await site({ ...BASE, 'legal/privacy/index.html': null, 'articles/privacy.md': null, 'index.html': page('<a href="/docs/reset">Reset</a>') });
  const rows = await rowsOf(stag, await site(BASE));
  assert.deepEqual(kinds(rows.filter((r) => r.kind === 'removed')), ['removed /articles/privacy.md', 'removed /legal/privacy/index.html']);
  assert.equal(gate(rows.filter((r) => r.kind === 'removed'), { approvals: [] }).ok, true);
});

test('crawls live hosts over HTTP from seeds', async () => {
  const s = await serve(await site({ ...BASE, 'articles/reset.md': '# Reset v2' }));
  const p = await serve(await site(BASE));
  try {
    assert.deepEqual(kinds(await rowsOf(s.url, p.url)), ['changed /articles/reset.md']);
  } finally {
    s.close();
    p.close();
  }
});

test('network errors and 5xx abort instead of passing', async () => {
  const s = await serve(await site(BASE), { fail: '/data/faq.yaml' });
  const p = await serve(await site(BASE));
  try {
    await assert.rejects(rowsOf(s.url, p.url), /HTTP 500/);
    await assert.rejects(rowsOf('http://127.0.0.1:1', p.url), /ECONNREFUSED|fetch failed/);
  } finally {
    s.close();
    p.close();
  }
});

test('approvals need path, approver, date and sha256; a sha256 mismatch is stale', () => {
  const rows = [{ kind: 'added', path: '/a', hash: H('a') }];
  assert.equal(gate(rows, { approvals: [] }).ok, false);
  assert.equal(gate(rows, { approvals: [{ path: '/a', approver: 'Andrew', date: '2026-10-16' }] }).ok, false);
  assert.equal(gate(rows, { approvals: [{ path: '/a', approver: 'Andrew', date: '2026-10-16', sha256: H('b') }] }).rows[0].status, 'stale');
  assert.equal(gate(rows, { approvals: [{ path: '/a', approver: 'Andrew', date: '2026-10-16', sha256: H('a') }] }).ok, true);
  assert.equal(gate([], null).ok, false);
  assert.equal(validateApprovals({ approvals: [{ path: '/a', approver: '', date: '2026-10-16', sha256: H('a') }, { path: '/b', approver: 'A', date: '16/10', sha256: H('a') }] }).errors.length, 2);
});

test('template lists pending files with their hashes', () => {
  assert.deepEqual(template([{ kind: 'added', path: '/a', hash: 'h' }, { kind: 'removed', path: '/b', hash: 'g' }]), {
    approvals: [{ path: '/a', sha256: 'h', approver: '', date: '', note: 'added' }],
  });
});

test('main blocks an unapproved staged article and passes once approved by hash', async () => {
  const prod = await site(BASE);
  const stag = await site({ ...BASE, 'index.html': page('<a href="/docs/connector">C</a><a href="/docs/reset">R</a><a href="/legal/privacy">P</a>'), 'docs/connector/index.html': page('C', { md: '/articles/connector.md' }), 'articles/connector.md': '# Claude Connector' });
  const out = [];
  const none = join(await mkdtemp(join(tmpdir(), 'pm-')), 'none.json');
  assert.equal(await main(['--staging', stag, '--production', prod, '--approvals', none], (s) => out.push(s)), 1);
  assert.match(out[0], /UNAPPROVED\s+added\s+\/docs\/connector\/index\.html/);
  const t = [];
  await main(['--staging', stag, '--production', prod, '--template'], (s) => t.push(s));
  const approvals = JSON.parse(t[0]);
  for (const a of approvals.approvals) Object.assign(a, { approver: 'Andrew', date: '2026-10-16' });
  await writeFile(none, JSON.stringify(approvals));
  assert.equal(await main(['--staging', stag, '--production', prod, '--approvals', none], () => {}), 0);
});

// Hook

const hook = (input, env = {}) =>
  spawnSync(process.execPath, [HOOK], { input: typeof input === 'string' ? input : JSON.stringify(input), encoding: 'utf8', env: { ...process.env, ...env } });

test('connector calls: Website unless a project_id names another project, whatever the cwd', async () => {
  const other = await site({ '.mcp.json': JSON.stringify({ mcpServers: { m: { headers: { 'X-Manifest-Project': 'proj_other' } } } }) });
  const web = await site({ '.mcp.json': JSON.stringify({ mcpServers: { m: { headers: { 'x-manifest-project': 'proj_manifest_website' } } } }) });
  const bare = await site({ 'x.txt': '' });
  const t = 'mcp__x__manifest_promote';
  assert.equal(classify({ tool_name: t, tool_input: {}, cwd: web })?.kind, 'promote');
  assert.equal(classify({ tool_name: t, tool_input: {}, cwd: bare })?.kind, 'promote');
  assert.equal(classify({ tool_name: t, tool_input: { project_id: 'Manifest-Website' }, cwd: other })?.kind, 'promote');
  assert.equal(classify({ tool_name: t, tool_input: { project_id: ' proj_manifest_website ' }, cwd: other })?.kind, 'promote');
  assert.equal(classify({ tool_name: t, tool_input: { project_id: '  ' }, cwd: web })?.kind, 'promote');
  assert.equal(classify({ tool_name: t, tool_input: {}, cwd: other })?.kind, 'promote');
  assert.equal(classify({ tool_name: t, tool_input: { project_id: '' }, cwd: other })?.kind, 'promote');
  assert.equal(classify({ tool_name: t, tool_input: { project_id: 'proj_other' } }), null);
  assert.equal(classify({ tool_name: t, tool_input: { project_id: ' proj_other ' }, cwd: web }), null);
  assert.equal(classify({ tool_name: 'mcp__x__manifest_rollback', tool_input: { deployment_id: 'dep_1' }, cwd: other })?.kind, 'rollback');
  assert.deepEqual(classify({ tool_name: 'mcp__x__manifest_rollback', tool_input: { deployment_id: 'dep_1' }, cwd: web }), { kind: 'rollback', target: 'dep_1' });
  assert.equal(classify({ tool_name: 'Bash', tool_input: { command: 'ls' }, cwd: web }), null);
});

test('hook blocks every Website production publish outright: connector tools default to production', async () => {
  const other = await site({ '.mcp.json': JSON.stringify({ mcpServers: { m: { headers: { 'X-Manifest-Project': 'proj_other' } } } }) });
  for (const tool of ['mcp__x__manifest_publish', 'mcp__x__manifest_publish_files']) {
    const P = (ti, cwd = ROOT) => classify({ tool_name: tool, tool_input: ti, cwd })?.kind ?? null;
    assert.equal(P({}), 'publish');
    assert.equal(P({ env: 'production' }), 'publish');
    assert.equal(P({ env: 'staging' }), null);
    assert.equal(P({}, other), 'publish');
    assert.equal(P({ project_id: 'proj_other' }), null);
    assert.equal(P({ project_id: 'proj_manifest_website' }, other), 'publish');
  }
  const r = hook({ tool_name: 'mcp__x__manifest_publish_files', tool_input: { files: [] }, cwd: ROOT });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /only by promote/);
});

test('hook reads each mnfst-publish call like the CLI does', () => {
  const B = (command) => classify({ tool_name: 'Bash', tool_input: { command }, cwd: ROOT })?.kind ?? null;
  assert.equal(B('npx mnfst-publish'), 'publish');
  assert.equal(B('MNFST_PUBLISH_UPLOAD_URL="https://mcp.manifestx.dev/publish/put_x" npx mnfst-publish --source render --output-dir website'), 'publish');
  assert.equal(B('MNFST_PUBLISH_UPLOAD_URL="https://mcp.manifestx.dev/publish/put_x" npx mnfst-publish --env staging --source render'), null);
  assert.equal(B('npx mnfst-publish --production'), 'publish');
  assert.equal(B('npx mnfst-publish --prod'), 'publish');
  assert.equal(B('npx mnfst-publish --staging'), null);
  assert.equal(B('npx mnfst-publish --promote'), 'promote');
  assert.equal(B('MNFST_PUBLISH_ENV=staging npx mnfst-publish'), 'publish');
  assert.equal(B('npx mnfst-publish --env=staging'), 'publish');
  assert.equal(B('npx mnfst-publish --rollback'), 'publish');
  assert.equal(B('npx mnfst-publish --staging --production'), 'publish');
  assert.equal(B('npx mnfst-publish --production --staging'), null);
  assert.equal(B('npx mnfst-publish --root --staging'), 'publish');
  assert.equal(B('npx mnfst-publish --env "staging"'), null);
  assert.equal(B('npx mnfst-publish $FLAGS'), 'publish');
  assert.equal(B('npx mnfst-publish --staging --root "$PWD" 2>&1 | tail'), null);
  assert.equal(B('npx mnfst-publish --help'), null);
  assert.equal(B('npx mnfst-publish -h --production'), null);
  for (const sep of [' && ', ' || ', '; ', ' | ', ' & ', '\n']) assert.equal(B(`npx mnfst-publish --staging${sep}npx mnfst-publish --production`), 'publish', JSON.stringify(sep));
  assert.equal(B('npx mnfst-publish --staging && npx mnfst-publish --promote'), 'promote');
  assert.equal(B('npx mnfst-publish --promote && npx mnfst-publish'), 'publish');
});

test('hook finds mnfst-publish only in command position, wrappers and code strings', () => {
  const B = (command) => classify({ tool_name: 'Bash', tool_input: { command }, cwd: ROOT })?.kind ?? null;
  for (const c of [
    'npx -y mnfst-publish@0.1.14',
    'npm exec mnfst-publish -- --production',
    'npm x --yes mnfst-publish',
    'pnpm dlx mnfst-publish',
    'yarn dlx mnfst-publish',
    'bunx mnfst-publish',
    'node node_modules/mnfst-publish/manifest.publish.mjs',
    './node_modules/.bin/mnfst-publish',
    'env FOO=1 npx mnfst-publish',
    'FOO=1 BAR=2 npx mnfst-publish',
    'timeout 60 npx mnfst-publish',
    'xargs npx mnfst-publish',
    'bash -c "npx mnfst-publish --staging && npx mnfst-publish"',
    "bash -lc 'cd website && npx mnfst-publish'",
    'eval "npx mnfst-publish"',
    'echo "$(npx mnfst-publish)"',
    'x=`npx mnfst-publish`',
    'node -e "require(\'child_process\').execSync(\'npx mnfst-publish\')"',
    'echo proj_other; npx mnfst-publish',
    'npx mnfst-publish # --staging',
    'cat <<EOF | sh\nnpx mnfst-publish\nEOF',
    "bash <<'X'\nnpx mnfst-publish\nX",
    'cat <<EOF\n$(npx mnfst-publish)\nEOF',
    'git commit -F - <<EOF\nmsg\nEOF\nnpx mnfst-publish',
  ]) assert.equal(B(c), 'publish', c);
  for (const c of [
    'grep -rn mnfst-publish .',
    'rg "npx mnfst-publish --production" docs',
    'echo npx mnfst-publish',
    'git commit -m "fix: npx mnfst-publish --production now works"',
    'cat node_modules/mnfst-publish/README.md',
    '# npx mnfst-publish',
    "sh -c 'npx mnfst-publish --staging'",
    'npm exec mnfst-publish -- --staging',
    'npx mnfst-render && git status',
    'npx mnfst-publish --help',
    "git commit -q -F - <<'EOF'\nfix: npx mnfst-publish --production\nEOF",
    "cat <<'EOF'\n$(npx mnfst-publish)\nEOF",
  ]) assert.equal(B(c), null, c);
});

test('hook gates only the Website: target from cwd, cd, --root and .mcp.json', async () => {
  const pin = (id) => JSON.stringify({ mcpServers: { m: { headers: { 'X-Manifest-Project': id } } } });
  const other = await site({ '.mcp.json': pin('proj_other') });
  const web = await site({ '.mcp.json': pin('proj_manifest_website') });
  const bare = await site({ 'x.txt': '' });
  const B = (command, cwd) => classify({ tool_name: 'Bash', tool_input: { command }, cwd })?.kind ?? null;
  assert.equal(B('npx mnfst-publish', other), null);
  assert.equal(B('npx mnfst-publish', web), 'publish');
  assert.equal(B('npx mnfst-publish', bare), null);
  assert.equal(B('npx mnfst-publish', join(ROOT, 'website')), 'publish');
  assert.equal(B(`cd ${web} && npx mnfst-publish`, other), 'publish');
  assert.equal(B(`cd ${other} && npx mnfst-publish --promote`, ROOT), null);
  assert.equal(B(`npx mnfst-publish --root ${ROOT} --promote`, other), 'promote');
  assert.equal(B(`npx mnfst-publish --root ${other}`, ROOT), null);
  assert.equal(B('cd "$DIR" && npx mnfst-publish', ROOT), 'publish');
  assert.equal(B('cd "$DIR" && npx mnfst-publish', bare), 'publish');
  assert.equal(B('npx mnfst-publish --root "$DIR"', ROOT), 'publish');
  const T = (ti) => classify({ tool_name: 'mcp__terminal__run_in_terminal', tool_input: ti, cwd: ROOT })?.kind ?? null;
  assert.equal(T({ command: 'npx mnfst-publish' }), 'publish');
  assert.equal(T({ command: 'npx mnfst-publish', cwd: other }), null);
  assert.equal(T({ command: 'npx mnfst-publish', tab_id: '3' }), 'publish');
  assert.equal(classify({ tool_name: 'Monitor', tool_input: { command: 'npx mnfst-publish --promote' }, cwd: ROOT })?.kind, 'promote');
});

test('Bash directory is unknown after an unresolvable, conditional, late or subshell cd, and unknown blocks', async () => {
  const pin = (id) => JSON.stringify({ mcpServers: { m: { headers: { 'X-Manifest-Project': id } } } });
  const other = await site({ '.mcp.json': pin('proj_other'), 'sub/x.txt': '' });
  const B = (command, cwd = other, tool = 'Bash', ti = {}) => classify({ tool_name: tool, tool_input: { command, ...ti }, cwd })?.kind ?? null;
  assert.equal(B('npx mnfst-publish'), null);
  assert.equal(B(`cd ${other} && npx mnfst-publish`, ROOT), null);
  assert.equal(B(`cd ${other}; npx mnfst-publish`, ROOT), null);
  assert.equal(B(`cd ${other}\ncd sub && npx mnfst-publish`, ROOT), null);
  assert.equal(B('cd sub && npx mnfst-publish'), null);
  assert.equal(B(`cd ${join(other, 'missing')} && npx mnfst-publish`), 'publish');
  assert.equal(B('cd "$DIR" && npx mnfst-publish'), 'publish');
  assert.equal(B('cd - && npx mnfst-publish'), 'publish');
  assert.equal(B('popd && npx mnfst-publish'), 'publish');
  assert.equal(B(`true && cd ${other} && npx mnfst-publish`, ROOT), 'publish');
  assert.equal(B(`false || cd ${other}; npx mnfst-publish`, ROOT), 'publish');
  assert.equal(B(`ls; cd ${other}; npx mnfst-publish`, ROOT), 'publish');
  assert.equal(B(`(cd ${other} && npx mnfst-publish)`, ROOT), 'publish');
  assert.equal(B(`(cd ${other}) && npx mnfst-publish --promote`), 'promote');
  assert.equal(B(`echo $(cd ${other}; npx mnfst-publish)`, ROOT), 'publish');
  assert.equal(B(`bash -c "cd ${other} && npx mnfst-publish"`, ROOT), 'publish');
  assert.equal(B('cd "$DIR" && npx mnfst-publish --staging'), null);
  assert.equal(B(`cd "$DIR" && npx mnfst-publish --root ${other}`), null);
  assert.equal(B('npx mnfst-publish', other, 'mcp__terminal__run_in_terminal', { tab_id: '2' }), 'publish');
  assert.equal(B('npx mnfst-publish', ROOT, 'mcp__terminal__run_in_terminal', { cwd: other }), null);
  assert.equal(B('npx mnfst-publish', other, 'mcp__terminal__run_in_terminal', { cwd: join(other, 'missing') }), 'publish');
});

test('wrappers: env -C, nice, timeout -s SIG N, sudo -u x', async () => {
  const pin = (id) => JSON.stringify({ mcpServers: { m: { headers: { 'X-Manifest-Project': id } } } });
  const other = await site({ '.mcp.json': pin('proj_other') });
  const B = (command, cwd = ROOT) => classify({ tool_name: 'Bash', tool_input: { command }, cwd })?.kind ?? null;
  for (const c of ['nice npx mnfst-publish', 'nice -n 10 npx mnfst-publish', 'timeout -s KILL 60 npx mnfst-publish', 'timeout -k 5 30s npx mnfst-publish', 'sudo -u andrew npx mnfst-publish', "env -S 'npx mnfst-publish'", 'env -u FOO npx mnfst-publish', 'env -- npx mnfst-publish']) assert.equal(B(c), 'publish', c);
  assert.equal(B(`env -C ${other} npx mnfst-publish`), null);
  assert.equal(B(`env --chdir=${other} npx mnfst-publish`), null);
  assert.equal(B(`env -C ${ROOT} npx mnfst-publish`, other), 'publish');
  assert.equal(B('env -C "$X" npx mnfst-publish', other), 'publish');
  assert.equal(B(`sudo -D ${other} npx mnfst-publish`), null);
  assert.equal(B('nice -n 10 npx mnfst-publish --staging'), null);
});

test('approvals come from the remote staging sha; a local ref named origin/staging cannot shadow it', async () => {
  const sh = (cwd, ...a) => {
    const r = spawnSync('git', a, { cwd, encoding: 'utf8' });
    assert.equal(r.status, 0, `git ${a.join(' ')}: ${r.stderr}`);
    return r.stdout.trim();
  };
  const tmp = await mkdtemp(join(tmpdir(), 'pm-git-'));
  const bare = join(tmp, 'remote.git');
  const seed = join(tmp, 'seed');
  const clone = join(tmp, 'clone');
  sh(tmp, 'init', '-q', '--bare', bare);
  sh(tmp, 'init', '-q', '-b', 'staging', seed);
  const commit = async (dir, rollbacks, msg) => {
    await writeFile(join(dir, 'promote-manifest.json'), JSON.stringify({ approvals: [], rollbacks: rollbacks.map((d) => ({ deployment_id: d, approver: 'Andrew', date: '2026-10-17' })) }));
    sh(dir, 'add', 'promote-manifest.json');
    sh(dir, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', msg);
  };
  await commit(seed, ['dep_ok'], 'one');
  sh(seed, 'push', '-q', bare, 'staging');
  sh(tmp, 'clone', '-q', '-b', 'staging', bare, clone);
  await mkdir(join(clone, '.claude/hooks'), { recursive: true });
  await writeFile(join(clone, '.claude/hooks/promote-gate.mjs'), await readFile(HOOK));
  await commit(clone, ['dep_evil'], 'local only');
  sh(clone, 'tag', 'origin/staging');
  sh(clone, 'branch', 'origin/staging');
  await commit(seed, ['dep_ok', 'dep_new'], 'two');
  sh(seed, 'push', '-q', bare, 'staging');
  const env = { ...process.env };
  delete env.PROMOTE_APPROVALS;
  const rb = (id) => spawnSync(process.execPath, [join(clone, '.claude/hooks/promote-gate.mjs')], { input: JSON.stringify({ tool_name: 'mcp__x__manifest_rollback', tool_input: { deployment_id: id }, cwd: clone }), encoding: 'utf8', env });
  assert.equal(rb('dep_evil').status, 2, 'local tag/branch named origin/staging must not count');
  const fresh = rb('dep_new');
  assert.equal(fresh.status, 0, fresh.stderr);
  assert.equal(rb('dep_ok').status, 0);
  sh(clone, 'remote', 'set-url', 'origin', join(tmp, 'gone.git'));
  const offline = rb('dep_ok');
  assert.equal(offline.status, 2);
  assert.match(offline.stderr, /remote staging branch/);
});

test('hook blocks a production publish chained after a staging one without running the crawl', () => {
  const r = hook({ tool_name: 'Bash', tool_input: { command: 'npx mnfst-publish --staging && npx mnfst-publish --production' }, cwd: ROOT }, { PROMOTE_STAGING: 'http://127.0.0.1:1' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /only by promote/);
  assert.equal(hook({ tool_name: 'Bash', tool_input: { command: 'npx mnfst-publish --staging' }, cwd: ROOT }).status, 0);
  assert.equal(hook({ tool_name: 'Bash', tool_input: { command: 'grep -rn mnfst-publish .' }, cwd: ROOT }).stdout, '');
});

test('hook blocks an unapproved promote, tells the agent not to self-approve, and reports removals on pass', async () => {
  const prod = await site(BASE);
  const dirty = await site({ ...BASE, 'articles/reset.md': '# changed' });
  const none = await site({ 'a.json': JSON.stringify({ approvals: [] }) });
  const env = { PROMOTE_PRODUCTION: prod, PROMOTE_APPROVALS: join(none, 'a.json') };
  const promote = (e) => hook({ tool_name: 'mcp__x__manifest_promote', tool_input: {}, cwd: ROOT }, { ...env, ...e });
  const r = promote({ PROMOTE_STAGING: dirty });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /UNAPPROVED\s+changed \/articles\/reset\.md/);
  assert.match(r.stderr, /Do not add approvals yourself; ask Andrew/);
  assert.doesNotMatch(r.stderr, /--template/);
  const clean = promote({ PROMOTE_STAGING: await site(BASE) });
  assert.equal(clean.status, 0);
  assert.equal(clean.stdout, '');
  const removedOnly = await site({ ...BASE, 'components/header.html': null });
  const ok = promote({ PROMOTE_STAGING: removedOnly });
  assert.equal(ok.status, 0);
  const out = JSON.parse(ok.stdout);
  assert.match(out.systemMessage, /REMOVES 1 file/);
  assert.match(out.hookSpecificOutput.additionalContext, /\/components\/header\.html/);
  assert.equal(out.hookSpecificOutput.permissionDecision, undefined);
  assert.equal(out.decision, undefined);
  assert.equal(promote({ PROMOTE_STAGING: removedOnly, PROMOTE_APPROVALS: join(none, 'missing.json') }).status, 2);
});

test('hook reads approvals from origin/staging, not the working tree', () => {
  const env = { ...process.env };
  delete env.PROMOTE_APPROVALS;
  const r = spawnSync(process.execPath, [HOOK], { input: JSON.stringify({ tool_name: 'mcp__x__manifest_rollback', tool_input: { project_id: 'proj_manifest_website', deployment_id: 'dep_x' } }), encoding: 'utf8', env });
  assert.equal(r.status, 2);
  const committed = spawnSync('git', ['-C', ROOT, 'show', 'origin/staging:promote-manifest.json']).status === 0;
  assert.match(r.stderr, committed ? /dep_x is not listed under "rollbacks" in promote-manifest\.json on origin\/staging/ : /could not read promote-manifest\.json from the remote staging branch/);
});

test('hook network failure says so instead of blaming approvals', async () => {
  const none = await site({ 'a.json': JSON.stringify({ approvals: [] }) });
  const r = hook({ tool_name: 'mcp__x__manifest_promote', tool_input: {}, cwd: ROOT }, { PROMOTE_STAGING: 'http://127.0.0.1:1', PROMOTE_PRODUCTION: 'http://127.0.0.1:1', PROMOTE_APPROVALS: join(none, 'a.json') });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /network failure.*not an approvals problem/);
  assert.doesNotMatch(r.stderr, /Andrew/);
});

test('hook blocks Website rollbacks unless listed, and a gate crash blocks', async () => {
  const dir = await site({ 'ok.json': JSON.stringify({ approvals: [], rollbacks: [{ deployment_id: 'dep_ok', approver: 'Andrew', date: '2026-10-16' }] }) });
  const env = { PROMOTE_APPROVALS: join(dir, 'ok.json') };
  const rb = (id) => hook({ tool_name: 'mcp__x__manifest_rollback', tool_input: { project_id: 'proj_manifest_website', deployment_id: id } }, env).status;
  assert.equal(rb('dep_445fe657'), 2);
  assert.equal(rb('dep_ok'), 0);
  const prev = await site({ 'p.json': JSON.stringify({ approvals: [], rollbacks: [{ deployment_id: 'previous', approver: 'Andrew', date: '2026-10-16' }, { deployment_id: null, approver: 'Andrew', date: '2026-10-16' }] }) });
  assert.equal(hook({ tool_name: 'mcp__x__manifest_rollback', tool_input: { project_id: 'proj_manifest_website' } }, { PROMOTE_APPROVALS: join(prev, 'p.json') }).status, 2);
  const crash = hook({ tool_name: 'mcp__x__manifest_promote', tool_input: {}, cwd: ROOT }, { PROMOTE_STAGING: 'http://127.0.0.1:1', PROMOTE_PRODUCTION: 'http://127.0.0.1:1', PROMOTE_APPROVALS: join(ROOT, 'promote-manifest.json') });
  assert.equal(crash.status, 2);
});

test('hook blocks on malformed input and passes unrelated tools', () => {
  assert.equal(hook('not json').status, 2);
  assert.equal(hook('').status, 2);
  assert.equal(hook({ tool_name: 'Read', tool_input: {} }).status, 0);
});

test('hook blocks when the gate outlives its deadline', async () => {
  const srv = createServer(() => {});
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  try {
    const url = `http://127.0.0.1:${srv.address().port}`;
    const t = Date.now();
    const r = await new Promise((resolve) => {
      const c = spawn(process.execPath, [HOOK], { env: { ...process.env, PROMOTE_STAGING: url, PROMOTE_PRODUCTION: url, PROMOTE_DEADLINE_MS: '1500', PROMOTE_APPROVALS: join(ROOT, 'promote-manifest.json') } });
      let err = '';
      c.stderr.on('data', (d) => (err += d));
      c.on('close', (status) => resolve({ status, err }));
      c.stdin.end(JSON.stringify({ tool_name: 'mcp__x__manifest_promote', tool_input: {}, cwd: ROOT }));
    });
    assert.equal(r.status, 2);
    assert.match(r.err, /did not finish|deadline/);
    assert.ok(Date.now() - t < 5000);
  } finally {
    srv.closeAllConnections?.();
    srv.close();
  }
});

test('hook and tool run when invoked through a symlinked path with spaces', async () => {
  const dir = join(await mkdtemp(join(tmpdir(), 'pm link ')), 'with space');
  await mkdir(dir);
  await symlink(HOOK, join(dir, 'hook link.mjs'));
  await symlink(join(ROOT, 'tools/promote-manifest.mjs'), join(dir, 'tool link.mjs'));
  assert.equal(spawnSync(process.execPath, [join(dir, 'hook link.mjs')], { input: 'not json' }).status, 2);
  assert.equal(spawnSync(process.execPath, [join(dir, 'tool link.mjs'), '--bogus']).status, 2);
});

test('sw.js framework version is host noise', () => {
  const sw = (v) => Buffer.from(`importScripts('https://cdn.manifestx.dev/npm/mnfst@${v}/lib/manifest.sw.min.js');`);
  assert.equal(normalize('/sw.js', sw('0.5.222')).toString(), normalize('/sw.js', sw('0.5.229')).toString());
  assert.notEqual(normalize('/other.js', sw('0.5.222')).toString(), normalize('/other.js', sw('0.5.229')).toString());
});

test('binary files compare by content, using a HEAD etag on live hosts', async () => {
  const a = await site({ ...BASE, 'index.html': page('<img src="/og/a.png"><a href="/docs/reset">R</a><a href="/legal/privacy">P</a>'), 'og/a.png': 'one' });
  const b = await site({ ...BASE, 'index.html': page('<img src="/og/a.png"><a href="/docs/reset">R</a><a href="/legal/privacy">P</a>'), 'og/a.png': 'two' });
  const heads = [];
  const s = await serve(a, { etag: true, onHead: (p) => heads.push(p) });
  try {
    assert.deepEqual(kinds(await rowsOf(s.url, b)), ['changed /og/a.png']);
    assert.deepEqual(await rowsOf(s.url, a), []);
    assert.ok(heads.includes('/og/a.png'));
  } finally {
    s.close();
  }
});
