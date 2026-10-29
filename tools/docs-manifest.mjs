#!/usr/bin/env node
// Docs manifest (M8.1): customer-visible changes in a release range, their docs status, and a WORK.md docs item for the undocumented.
// Declare on the source commit: `Docs: none [reason]` | `Docs: articles/<path>.md` | `Docs: docs/<branch>`;
// or on the Website docs commit: `Documents: <repo>@<sha>`. Undeclared customer-visible commits are undocumented.
// Reads only origin refs (fetched) and the live site, so every actor gets the same answer.
// Usage: node tools/docs-manifest.mjs --repo <path> [--range <from>..<to>] [--live <url|dir>] [--work <WORK.md>] [--dry-run] [--json] [--strict] [--no-fetch]
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { source } from './promote-manifest.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const PROFILES = {
  mnfst: {
    visible: [/^src\/scripts\//, /^src\/styles\//, /^packages\/[^/]+\//, /^templates\/starter\//],
    hidden: [/^src\/scripts\/build\.mjs$/, /^src\/scripts\/snippets\/build/],
  },
  'manifest-mcp': {
    visible: [/^src\//, /^claude-payload\//],
    hidden: [/^src\/smoke\.ts$/],
  },
};
const HIDDEN = [/(^|\/)(tests?|__tests__|e2e|fixtures)\//, /\.(test|spec)\.[cm]?[jt]sx?$/, /(^|\/)package(-lock)?\.json$/, /(^|\/)pnpm-lock\.yaml$/, /\.md$/];
const INTERNAL_SUBJECT = /^(chore|test|tests|ci|build)(\([^)]*\))?!?:/i;
const GENERIC = new Set(['manifest', 'index', 'src', 'scripts', 'lib', 'js', 'mjs', 'ts', 'core', 'utils', 'util', 'types', 'd', 'mnfst', 'tool', 'tools', 'routes', 'test', 'main', 'appwrite', 'config', 'cloud', 'native', 'plugin', 'plugins']);

const sh = (repo, ...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 256 << 20, stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();
const tryGit = (repo, ...args) => {
  try {
    return sh(repo, ...args);
  } catch {
    return null;
  }
};
const short = (s) => s.slice(0, 7);
const localDate = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function trailers(body, key) {
  const out = [];
  for (const m of body.matchAll(new RegExp(`^${key}:[ \\t]*(.+)$`, 'gim'))) {
    const v = m[1].trim();
    out.push(...(/^none\b/i.test(v) ? [v] : v.split(',').map((x) => x.trim()).filter(Boolean)));
  }
  return out;
}

export function visibleFiles(files, profile) {
  return files.filter((f) => (profile.visible ?? [/./]).some((r) => r.test(f)) && ![...HIDDEN, ...(profile.hidden ?? [])].some((r) => r.test(f)));
}

export function repoKey(repo) {
  try {
    const name = JSON.parse(readFileSync(join(repo, 'package.json'), 'utf8')).name;
    if (name) return name;
  } catch {}
  return basename(resolve(repo)).toLowerCase();
}

// Previous release tag..HEAD; if HEAD is a tag, the tag before it.
export function defaultRange(repo) {
  const head = sh(repo, 'rev-parse', 'HEAD');
  const tags = (tryGit(repo, 'tag', '--merged', 'HEAD', '--sort=-creatordate', '--list', 'v*') ?? '').split('\n').filter(Boolean);
  const prev = tags.find((t) => sh(repo, 'rev-parse', `${t}^{commit}`) !== head);
  if (!prev) throw new Error('no earlier v* tag; pass --range <from>..<to>');
  return `${prev}..HEAD`;
}

export function commits(repo, range) {
  const raw = sh(repo, 'log', '--no-merges', '--reverse', '--name-only', '--format=%x1e%H%x1f%s%x1f%cs%x1f%b%x1d', range);
  return raw
    .split('\x1e')
    .filter((c) => c.trim())
    .map((c) => {
      const [head, names = ''] = c.split('\x1d');
      const [sha, subject, date, body] = head.split('\x1f');
      return { sha, subject, date, body: body ?? '', files: names.split('\n').map((s) => s.trim()).filter(Boolean) };
    });
}

// Remote-only view of the docs repo: base branch, docs/* branches, and their `Documents:` declarations.
export function docsIndex(docsRepo, base = 'origin/staging') {
  const refs = (tryGit(docsRepo, 'for-each-ref', '--format=%(refname:short)', 'refs/remotes/origin/docs/') ?? '').split('\n').filter(Boolean);
  if (!tryGit(docsRepo, 'rev-parse', '--verify', '-q', base)) throw new Error(`docs repo has no ${base}; fetch it or pass --docs-base`);
  const all = [base, ...refs];
  const documents = new Map();
  const log = tryGit(docsRepo, 'log', '--format=%x1e%H%x1f%b', '-i', '--grep=^Documents:', ...all) ?? '';
  for (const c of log.split('\x1e').filter((s) => s.trim())) {
    const [sha, body] = c.split('\x1f');
    for (const v of trailers(body, 'Documents')) {
      const m = v.match(/^(?:([^@\s]+)@)?([0-9a-f]{7,40})$/i);
      if (!m) continue;
      const k = m[2].toLowerCase().slice(0, 7);
      if (!documents.has(k)) documents.set(k, []);
      documents.get(k).push({ repo: m[1]?.toLowerCase() ?? null, sha: m[2].toLowerCase(), docsSha: sha });
    }
  }
  const articles = (tryGit(docsRepo, 'ls-tree', '-r', '--name-only', base, '--', 'articles/') ?? '').split('\n').filter((p) => p.endsWith('.md'));
  return { repo: docsRepo, base, refs, all, documents, articles };
}

const blob = (repo, ref, path) => {
  try {
    return execFileSync('git', ['-C', repo, 'show', `${ref}:${path}`], { maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null;
  }
};
const sha1 = (ix, ref) => sh(ix.repo, 'rev-parse', ref);
const ancestor = (repo, a, b) => tryGit(repo, 'merge-base', '--is-ancestor', a, b) !== null;
const touched = (repo, sha) => (tryGit(repo, 'show', '--format=', '--name-only', '--diff-filter=AMR', sha, '--', 'articles/') ?? '').split('\n').filter(Boolean);
const sameBytes = (a, b) => a != null && b != null && Buffer.compare(a, b) === 0;

function branchesWith(ix, sha) {
  return ix.refs.filter((r) => ancestor(ix.repo, sha, r));
}

// One docs commit: live if its articles are served as committed (or as the base branch now has them).
async function docsCommit(ix, live, sha) {
  const arts = touched(ix.repo, sha);
  const onBase = ancestor(ix.repo, sha, ix.base);
  let isLive = arts.length > 0;
  for (const a of arts) {
    const served = await live.get('/' + a);
    if (!(sameBytes(served, blob(ix.repo, sha, a)) || (onBase && sameBytes(served, blob(ix.repo, ix.base, a))))) isLive = false;
  }
  const what = arts.length ? arts.join(', ') : 'no article files';
  if (isLive) return { status: 'live', docs: arts, where: `${short(sha)} ${what}` };
  if (onBase) return { status: 'pending', docs: arts, where: `${short(sha)} ${what} on ${ix.base}, not yet promoted` };
  const br = branchesWith(ix, sha);
  return { status: 'pending', docs: arts, where: `${short(sha)} ${what} on ${br.length ? br.join(', ') : 'no origin branch'}, unpublished` };
}

async function docsRef(ix, live, value) {
  const v = value.replace(/^origin\//, '');
  if (/^none\b/i.test(v)) return { status: 'exempt', where: `Docs: ${value}` };
  const art = v.replace(/^\/+/, '').replace(/#.*$/, '');
  if (/^articles\/.+\.md$/.test(art)) {
    if ((await live.get('/' + art)) != null) return { status: 'live', docs: [art], where: art };
    if (blob(ix.repo, ix.base, art)) return { status: 'pending', docs: [art], where: `${art} on ${ix.base}, not yet promoted` };
    const br = ix.refs.filter((r) => blob(ix.repo, r, art));
    if (br.length) return { status: 'pending', docs: [art], where: `${art} on ${br.join(', ')}, unpublished` };
    return { status: 'undocumented', where: `Docs: ${value} not found live, on ${ix.base} or any origin/docs/* branch` };
  }
  const ref = `origin/${v}`;
  if (!ix.refs.includes(ref)) return { status: 'undocumented', where: `Docs: ${value} is not an origin docs/* branch or articles/*.md path` };
  if (ancestor(ix.repo, ref, ix.base)) {
    const r = await docsCommit(ix, live, sha1(ix, ref));
    return { ...r, where: `${v} (${r.where})` };
  }
  const fork = sh(ix.repo, 'merge-base', ix.base, ref);
  const shas = sh(ix.repo, 'rev-list', '--no-merges', `${fork}..${ref}`).split('\n').filter(Boolean);
  const rs = [];
  for (const s of shas) rs.push(await docsCommit(ix, live, s));
  const arts = [...new Set(rs.flatMap((r) => r.docs ?? []))];
  const isLive = rs.length > 0 && rs.every((r) => r.status === 'live');
  return { status: isLive ? 'live' : 'pending', docs: arts, where: `${v} ${isLive ? '' : 'unpublished '}(${arts.join(', ') || 'no article files'})`.replace('  ', ' ') };
}
const RANK = { undocumented: 0, pending: 1, live: 2, exempt: 3 };
const worst = (rs) => rs.reduce((a, b) => (RANK[b.status] < RANK[a.status] ? b : a));

const tokens = (p) =>
  basename(p)
    .replace(/\.[^.]+$/, '')
    .split(/[._\-\s]+/)
    .map((t) => t.toLowerCase().replace(/ies$/, 'y').replace(/s$/, ''))
    .filter((t) => t.length > 2 && !GENERIC.has(t));

// Articles whose file names share a word with the changed files; a hint only, never counts as documented.
export function hints(files, articles) {
  const want = new Set(files.flatMap(tokens));
  return articles.filter((a) => tokens(a).some((t) => want.has(t))).slice(0, 3);
}

export async function analyze({ repo, range, docsRepo = ROOT, live, base = 'origin/staging', key, profile, ix }) {
  key ??= repoKey(repo);
  profile ??= PROFILES[key] ?? {};
  ix ??= docsIndex(docsRepo, base);
  const liveSrc = typeof live === 'string' ? source(live) : live;
  const rows = [];
  for (const c of commits(repo, range)) {
    const vis = visibleFiles(c.files, profile);
    const declared = trailers(c.body, 'Docs');
    const row = { sha: c.sha, subject: c.subject, date: c.date, files: vis };
    if (declared.length) {
      const rs = [];
      for (const d of declared) rs.push(await docsRef(ix, liveSrc, d));
      const w = worst(rs);
      rows.push({ ...row, status: w.status, where: rs.map((r) => r.where).join('; '), docs: [...new Set(rs.flatMap((r) => r.docs ?? []))] });
      continue;
    }
    if (!vis.length || INTERNAL_SUBJECT.test(c.subject)) {
      rows.push({ ...row, status: 'internal', where: vis.length ? 'internal commit type' : 'no customer-visible files' });
      continue;
    }
    const decl = (ix.documents.get(short(c.sha)) ?? []).filter((d) => c.sha.startsWith(d.sha) && (!d.repo || d.repo === key.toLowerCase()));
    if (decl.length) {
      const rs = [];
      for (const d of decl) rs.push(await docsCommit(ix, liveSrc, d.docsSha));
      const w = worst(rs);
      rows.push({ ...row, status: w.status, where: rs.map((r) => r.where).join('; '), docs: [...new Set(rs.flatMap((r) => r.docs ?? []))] });
      continue;
    }
    const h = hints(vis, ix.articles).map((a) => {
      const last = tryGit(ix.repo, 'log', '-1', `--since=${c.date}`, '--format=%h %cs', ...ix.all, '--', a);
      return last ? `${a} (changed ${last.split(' ')[1]} in ${last.split(' ')[0]})` : `${a} (unchanged since ${c.date})`;
    });
    rows.push({ ...row, status: 'undocumented', where: 'no Docs: trailer and no Documents: declaration', hints: h });
  }
  return { key, range, live: typeof live === 'string' ? live : '(custom)', base, rows };
}

const LABEL = { undocumented: 'UNDOCUMENTED', pending: 'PENDING', live: 'LIVE', exempt: 'EXEMPT', internal: 'internal' };

export function report(result, filing) {
  const n = (s) => result.rows.filter((r) => r.status === s).length;
  const lines = [`Docs manifest: ${result.key} ${result.range} (${result.rows.length} commits), live docs ${result.live}, docs base ${result.base}`];
  for (const r of result.rows) {
    lines.push(`  ${LABEL[r.status].padEnd(12)} ${short(r.sha)} ${r.subject}`);
    if (r.status !== 'internal') lines.push(`  ${''.padEnd(12)}         -> ${r.where}`);
    for (const h of r.hints ?? []) lines.push(`  ${''.padEnd(12)}         hint: ${h}`);
  }
  const ships = (s) => [...new Set(result.rows.filter((r) => r.status === s).flatMap((r) => r.docs ?? []))];
  lines.push(`Documentation alongside: live ${ships('live').join(', ') || 'none'}; pending (not on manifestx.dev yet) ${ships('pending').join(', ') || 'none'}`);
  lines.push(`Result: ${n('undocumented')} undocumented, ${n('pending')} docs pending, ${n('live')} live, ${n('exempt')} exempt, ${n('internal')} internal.`);
  if (filing) lines.push(filing.message);
  return lines.join('\n');
}

export function record(result, rows, today) {
  const list = rows.map((r) => `\`${short(r.sha)}\` ${r.subject} (${r.files.slice(0, 3).join(', ')}${r.files.length > 3 ? ', …' : ''})${r.hints?.length ? `, hint: ${r.hints.map((h) => h.split(' ')[0]).join(' / ')}` : ''}`);
  return [
    `- **title:** Docs missing for ${rows.length} customer-visible change${rows.length === 1 ? '' : 's'} in ${result.key} ${result.range}`,
    '  - **type:** docs (M8.1)',
    '  - **priority:** medium — customer-visible behaviour without docs on manifestx.dev (the live source of truth)',
    '  - **status:** new',
    '  - **claim:** —',
    `  - **filed-by:** docs-manifest ${today} (${result.key} ${result.range})`,
    `  - **rationale:** undeclared: ${list.join('; ')}.`,
    '  - **close criteria:** each change documented on a Website docs branch whose commit carries `Documents: ' + result.key + '@<sha>` (or `Docs: none <reason>` agreed for it); a re-run of tools/docs-manifest.mjs on the range shows no UNDOCUMENTED rows.',
    `  - **docs-manifest:** ${rows.map((r) => `${result.key}@${r.sha.slice(0, 12)}`).join(' ')}`,
  ].join('\n');
}

// Already-filed source commits, from every record's docs-manifest field (open or closed).
export function filed(text) {
  const out = new Set();
  for (const m of text.matchAll(/\*\*docs-manifest:\*\*\s*(.+)$/gm)) for (const t of m[1].trim().split(/\s+/)) out.add(t.toLowerCase().replace(/^(.+@[0-9a-f]{7}).*$/, '$1'));
  return out;
}

export function insert(text, rec) {
  const lines = text.split('\n');
  const open = lines.findIndex((l) => /^## Open\s*$/.test(l));
  if (open < 0) throw new Error('WORK.md has no "## Open" section');
  let next = lines.findIndex((l, i) => i > open && /^## /.test(l));
  if (next < 0) {
    const body = text.replace(/\n*$/, '');
    return `${body}\n\n${rec}\n`;
  }
  let end = next;
  while (end > open + 1 && lines[end - 1].trim() === '') end--;
  return [...lines.slice(0, end), '', rec, '', ...lines.slice(next)].join('\n');
}

export function findWork(from = ROOT) {
  if (process.env.DOCS_MANIFEST_WORK) return process.env.DOCS_MANIFEST_WORK;
  for (let d = resolve(from); d !== dirname(d); d = dirname(d)) {
    const p = join(d, 'WORK.md');
    if (existsSync(p) && /^## Open\s*$/m.test(readFileSync(p, 'utf8'))) return p;
  }
  return null;
}

export function file(result, { work, dryRun = false, today = localDate() }) {
  const undoc = result.rows.filter((r) => r.status === 'undocumented');
  if (!undoc.length) return { filed: 0, message: 'Docs: clean, nothing to file.' };
  const text = work && existsSync(work) ? readFileSync(work, 'utf8') : null;
  const seen = text ? filed(text) : new Set();
  const fresh = undoc.filter((r) => !seen.has(`${result.key.toLowerCase()}@${short(r.sha)}`));
  if (!fresh.length) return { filed: 0, message: `Docs: all ${undoc.length} undocumented change(s) already have a docs item in ${work}.` };
  const rec = record(result, fresh, today);
  const skipped = undoc.length - fresh.length ? ` (${undoc.length - fresh.length} already filed)` : '';
  if (dryRun) return { filed: 0, record: rec, message: `Docs: would file in ${work ?? '(no WORK.md found)'}${skipped} (dry run):\n${rec}` };
  if (!text) return { filed: 0, record: rec, unfiled: true, message: `Docs: NOT FILED, no WORK.md found (set DOCS_MANIFEST_WORK or --work). File this by hand:\n${rec}` };
  writeFileSync(work, insert(text, rec));
  return { filed: fresh.length, record: rec, message: `Docs: filed a docs item for ${fresh.length} change(s) in ${work}${skipped}; commit it.\n${rec}` };
}

function args(argv) {
  const o = { live: process.env.DOCS_MANIFEST_LIVE ?? 'https://manifestx.dev', docsRepo: ROOT, base: 'origin/staging', fetch: true };
  const map = { '--repo': 'repo', '--range': 'range', '--live': 'live', '--work': 'work', '--docs-repo': 'docsRepo', '--docs-base': 'base', '--key': 'key', '--today': 'today' };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--dry-run') o.dryRun = true;
    else if (k === '--json') o.json = true;
    else if (k === '--strict') o.strict = true;
    else if (k === '--no-fetch') o.fetch = false;
    else if (map[k]) o[map[k]] = argv[++i];
    else throw new Error(`unknown argument ${k}`);
  }
  if (!o.repo) throw new Error('--repo <path> is required');
  return o;
}

export async function main(argv = process.argv.slice(2), log = console.log) {
  const o = args(argv);
  if (o.fetch) {
    sh(o.docsRepo, 'fetch', '-q', '--prune', 'origin');
    tryGit(o.repo, 'fetch', '-q', '--tags', 'origin');
  }
  const range = o.range ?? defaultRange(o.repo);
  const result = await analyze({ repo: o.repo, range, docsRepo: o.docsRepo, live: o.live, base: o.base, key: o.key });
  const filing = file(result, { work: o.work ?? findWork(o.docsRepo), dryRun: o.dryRun, today: o.today });
  log(o.json ? JSON.stringify({ ...result, filing }, null, 2) : report(result, filing));
  return o.strict && result.rows.some((r) => r.status === 'undocumented') ? 1 : 0;
}

const entry = (() => {
  try {
    return pathToFileURL(realpathSync(process.argv[1])).href;
  } catch {
    return null;
  }
})();
if (entry && pathToFileURL(realpathSync(fileURLToPath(import.meta.url))).href === entry) {
  const done = (code) => process.stdout.write('', () => process.stderr.write('', () => process.exit(code)));
  main().then(done, (e) => {
    console.error(`docs-manifest: ${e.message}`);
    done(2);
  });
}
