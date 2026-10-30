#!/usr/bin/env node
// Docs manifest (M8.1): customer-visible changes in a release range, their docs status, and a WORK.md docs item for the undocumented.
// Declare in the source commit's trailer block: `Docs: articles/<path>.md` | `Docs: none <reason>` (| `Docs: docs/<branch>`, fragile);
// or in the Website docs commit's trailer block: `Documents: <repo>@<sha>`. Undeclared customer-visible commits are undocumented.
// Reads origin refs and the live site only, so every actor gets the same answer.
// Limits: fast-forwarded docs branches resolve from their tip only; filename hints are hints, never documentation.
// Usage: node tools/docs-manifest.mjs --repo <path> [--range <from>..<to>] [--live <url|dir>] [--work <WORK.md>] [--dry-run] [--json] [--strict] [--no-fetch]
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const PROFILES = {
  mnfst: {
    visible: [/^src\/scripts\//, /^src\/styles\//, /^packages\/[^/]+\//, /^templates\//],
    hidden: [/^src\/scripts\/build\.mjs$/, /^src\/scripts\/snippets\/build/],
  },
  'manifest-mcp': {
    visible: [/^src\//, /^claude-payload\//],
    hidden: [/^src\/smoke\.ts$/],
    markdown: [/^claude-payload\//],
  },
};
const HIDDEN = [/(^|\/)(tests?|__tests__|e2e|fixtures)\//, /\.(test|spec)\.[cm]?[jt]sx?$/, /(^|\/)package(-lock)?\.json$/, /(^|\/)pnpm-lock\.yaml$/];
const INTERNAL_SUBJECT = /^(chore|test|tests|ci|build)(\([^)]*\))?!?:/i;
const GENERIC = new Set(['manifest', 'index', 'src', 'scripts', 'lib', 'js', 'mjs', 'ts', 'core', 'utils', 'util', 'types', 'd', 'mnfst', 'tool', 'tools', 'routes', 'test', 'main', 'appwrite', 'config', 'cloud', 'native', 'plugin', 'plugins']);
const BRANCH_NOTE = 'Convention: branch refs break once the branch is deleted; prefer `Docs: articles/<path>.md` or a `Documents: <repo>@<sha>` trailer on the docs commit.';

const sh = (repo, ...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 256 << 20, stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();
const tryGit = (repo, ...args) => {
  try {
    return sh(repo, ...args);
  } catch {
    return null;
  }
};
const lines = (s) => (s ?? '').split('\n').filter(Boolean);
const short = (s) => s.slice(0, 7);
const localDate = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const since = (date) => `--since=${date} 00:00:00`;

// git interpret-trailers: the last paragraph, and only when every line in it is a trailer or a continuation.
export function trailerBlock(body) {
  const last = body.replace(/\r\n/g, '\n').trim().split(/\n[ \t]*\n/).at(-1) ?? '';
  const ls = last.split('\n');
  if (!last || !ls.every((l) => /^[A-Za-z0-9-]+:\s/.test(l) || /^\s+\S/.test(l)) || /^\s/.test(ls[0])) return [];
  const out = [];
  for (const l of ls) if (/^\s/.test(l)) out[out.length - 1] += ' ' + l.trim();
  else out.push(l);
  return out;
}

export function trailers(body, key) {
  const out = [];
  for (const l of trailerBlock(body)) {
    const m = l.match(/^([A-Za-z0-9-]+):\s*(.*)$/);
    if (!m || m[1].toLowerCase() !== key.toLowerCase()) continue;
    const v = m[2].trim();
    out.push(...(/^none\b/i.test(v) ? [v] : v.split(',').map((x) => x.trim()).filter(Boolean)));
  }
  return out;
}

export function visibleFiles(files, profile) {
  return files.filter((f) => {
    if (!(profile.visible ?? [/./]).some((r) => r.test(f))) return false;
    if ([...HIDDEN, ...(profile.hidden ?? [])].some((r) => r.test(f))) return false;
    return !/\.md$/.test(f) || (profile.markdown ?? []).some((r) => r.test(f));
  });
}

export function repoKey(repo) {
  try {
    const name = JSON.parse(readFileSync(join(repo, 'package.json'), 'utf8')).name;
    if (name) return name;
  } catch {}
  return basename(resolve(repo)).toLowerCase();
}

// Previous release tag..origin's default branch; if that is tagged, the tag before it.
export function defaultRange(repo) {
  const head = [tryGit(repo, 'rev-parse', '--abbrev-ref', 'origin/HEAD'), 'origin/master', 'origin/main'].find((r) => r && r !== 'origin/HEAD' && tryGit(repo, 'rev-parse', '--verify', '-q', r));
  if (!head) throw new Error('no origin default branch; pass --range <from>..<to>');
  const at = sh(repo, 'rev-parse', head);
  const prev = lines(tryGit(repo, 'tag', '--merged', head, '--sort=-creatordate', '--list', 'v*')).find((t) => sh(repo, 'rev-parse', `${t}^{commit}`) !== at);
  if (!prev) throw new Error(`no v* tag before ${head}; pass --range <from>..<to>`);
  return `${prev}..${head}`;
}

export function commits(repo, range) {
  const raw = sh(repo, 'log', '--no-merges', '--reverse', '--name-only', '--format=%x1e%H%x1f%s%x1f%cs%x1f%b%x1d', range);
  return raw
    .split('\x1e')
    .filter((c) => c.trim())
    .map((c) => {
      const [head, names = ''] = c.split('\x1d');
      const [sha, subject, date, body] = head.split('\x1f');
      return { sha, subject, date, body: body ?? '', files: lines(names).map((s) => s.trim()) };
    });
}

// Remote view of the docs repo; `alive` (from ls-remote) drops tracking refs whose branch is gone.
export function docsIndex(docsRepo, base = 'origin/staging', alive = null) {
  if (!tryGit(docsRepo, 'rev-parse', '--verify', '-q', base)) throw new Error(`docs repo has no ${base}; fetch it or pass --docs-base`);
  const refs = lines(tryGit(docsRepo, 'for-each-ref', '--format=%(refname:short)', 'refs/remotes/origin/docs/')).filter((r) => !alive || alive.has(r.replace(/^origin\//, '')));
  const all = [base, ...refs];
  const documents = new Map();
  const log = tryGit(docsRepo, 'log', '--format=%x1e%H%x1f%B', '-i', '--grep=^Documents:', ...all) ?? '';
  for (const c of log.split('\x1e').filter((s) => s.trim())) {
    const [sha, body] = c.split('\x1f');
    for (const v of trailers(body, 'Documents')) {
      const m = v.match(/^([^@\s]+)@([0-9a-f]{7,40})$/i);
      if (!m) continue;
      const k = m[2].toLowerCase().slice(0, 7);
      if (!documents.has(k)) documents.set(k, []);
      documents.get(k).push({ repo: m[1].toLowerCase(), sha: m[2].toLowerCase(), docsSha: sha });
    }
  }
  const articles = lines(tryGit(docsRepo, 'ls-tree', '-r', '--name-only', base, '--', 'articles/')).filter((p) => p.endsWith('.md'));
  return { repo: docsRepo, base, refs, all, documents, articles };
}

// Served bytes, null when not served (404, 3xx), or { unreachable } per lookup.
export function liveSource(base) {
  const cache = new Map();
  const get = /^https?:\/\//.test(base)
    ? async (path) => {
        try {
          const res = await fetch(base.replace(/\/$/, '') + path, { redirect: 'manual', headers: { 'cache-control': 'no-cache' }, signal: AbortSignal.timeout(15000) });
          if (res.status === 200) return { body: Buffer.from(await res.arrayBuffer()) };
          if (res.status >= 500) return { unreachable: `HTTP ${res.status}` };
          return { body: null };
        } catch (e) {
          return { unreachable: e.cause?.code ?? e.name ?? e.message };
        }
      }
    : async (path) => {
        try {
          return { body: await readFile(join(base, path)) };
        } catch (e) {
          return /^(ENOENT|EISDIR|ENOTDIR)$/.test(e.code) ? { body: null } : { unreachable: e.code ?? e.message };
        }
      };
  return { get: (p) => (cache.has(p) ? cache.get(p) : (cache.set(p, get(p)), cache.get(p))) };
}

const blob = (repo, ref, path) => {
  try {
    return execFileSync('git', ['-C', repo, 'show', `${ref}:${path}`], { maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null;
  }
};
const ancestor = (repo, a, b) => tryGit(repo, 'merge-base', '--is-ancestor', a, b) !== null;
const touched = (repo, sha) => lines(tryGit(repo, 'show', '--format=', '--name-only', '--diff-filter=AMR', sha, '--', 'articles/'));
const sameBytes = (a, b) => a != null && b != null && Buffer.compare(a, b) === 0;
const RANK = { undocumented: 0, pending: 1, live: 2, exempt: 3 };
const worst = (rs) => rs.reduce((a, b) => (RANK[b.status] < RANK[a.status] ? b : a));
const best = (rs) => rs.reduce((a, b) => (RANK[b.status] > RANK[a.status] ? b : a));

// One docs commit: live if its articles are served as committed (or as the base branch now has them).
async function docsCommit(ix, live, sha, only) {
  const arts = touched(ix.repo, sha).filter((a) => !only || only.includes(a));
  if (!arts.length) return { status: 'undocumented', docs: [], where: `${short(sha)} changes no article files` };
  const onBase = ancestor(ix.repo, sha, ix.base);
  let isLive = true;
  let down = null;
  for (const a of arts) {
    const s = await live.get('/' + a);
    if (s.unreachable) (down = s.unreachable), (isLive = false);
    else if (!(sameBytes(s.body, blob(ix.repo, sha, a)) || (onBase && sameBytes(s.body, blob(ix.repo, ix.base, a))))) isLive = false;
  }
  const what = `${short(sha)} ${arts.join(', ')}`;
  const note = down ? ` (live unreachable: ${down})` : '';
  if (isLive) return { status: 'live', docs: arts, where: what };
  if (onBase) return { status: 'pending', docs: arts, where: `${what} on ${ix.base}, not yet promoted${note}` };
  const br = ix.refs.filter((r) => ancestor(ix.repo, sha, r));
  return { status: 'pending', docs: arts, where: `${what} on ${br.length ? br.join(', ') : 'no origin branch'}, unpublished${note}` };
}

// A branch's docs: commits without articles are ignored; none with articles means undocumented.
async function aggregate(ix, live, shas, label) {
  const rs = [];
  for (const s of shas) rs.push(await docsCommit(ix, live, s));
  const real = rs.filter((r) => r.docs.length);
  if (!real.length) return { status: 'undocumented', where: `${label} changes no article files` };
  const arts = [...new Set(real.flatMap((r) => r.docs))];
  const w = worst(real);
  const down = real.find((r) => r.where.includes('live unreachable'));
  const state = w.status === 'live' ? '' : w.where.includes('not yet promoted') ? `on ${ix.base}, not yet promoted ` : 'unpublished ';
  return { status: w.status, docs: arts, where: `${label} ${state}(${arts.join(', ')})${down ? ' (live unreachable)' : ''}` };
}

// Commits a docs branch contributed: unmerged → since its fork; merged → the merge's side; fast-forwarded → tip only.
function branchCommits(ix, ref) {
  if (!ancestor(ix.repo, ref, ix.base)) return lines(sh(ix.repo, 'rev-list', '--no-merges', `${sh(ix.repo, 'merge-base', ix.base, ref)}..${ref}`));
  for (const m of lines(tryGit(ix.repo, 'rev-list', '--merges', '--reverse', '--ancestry-path', `${ref}..${ix.base}`))) {
    if (!ancestor(ix.repo, ref, `${m}^1`)) return lines(sh(ix.repo, 'rev-list', '--no-merges', `${m}^1..${ref}`));
  }
  return [sh(ix.repo, 'rev-parse', ref)];
}

// A branch gone from origin: find where it landed in the base history (merge or squash subject naming it).
function landedCommits(ix, name) {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const named = new RegExp(`(^|[\\s'"/])${esc}($|[\\s'"])`);
  const out = [];
  for (const l of lines(tryGit(ix.repo, 'log', '--format=%H%x1f%P%x1f%s', '--fixed-strings', `--grep=${name}`, ix.base))) {
    const [h, p, s] = l.split('\x1f');
    if (!named.test(s)) continue;
    const ps = p.split(' ');
    out.push(...(ps.length > 1 ? lines(sh(ix.repo, 'rev-list', '--no-merges', `${ps[0]}..${ps[1]}`)) : [h]));
  }
  return [...new Set(out)];
}

async function docsRef(ix, live, value, date) {
  const v = value.replace(/^origin\//, '');
  if (/^none\b/i.test(v)) {
    const reason = v.replace(/^none\b[\s:—–-]*/i, '').replace(/^\((.*)\)$/, '$1').trim();
    return reason ? { status: 'exempt', where: `Docs: ${value}` } : { status: 'undocumented', where: '`Docs: none` needs a reason (`Docs: none <why no docs>`)' };
  }
  const art = v.replace(/^\/+/, '').replace(/#.*$/, '');
  if (/^articles\/.+\.md$/.test(art)) {
    const changes = [...new Set(lines(tryGit(ix.repo, 'log', since(date), '--format=%H', ...ix.all, '--', art)))];
    if (!changes.length) {
      const exists = blob(ix.repo, ix.base, art) || ix.refs.some((r) => blob(ix.repo, r, art));
      return { status: 'undocumented', where: exists ? `${art} unchanged on origin since ${date}` : `Docs: ${value} not found on ${ix.base} or any origin/docs/* branch` };
    }
    const rs = [];
    for (const s of changes) rs.push(await docsCommit(ix, live, s, [art]));
    const b = best(rs);
    return { ...b, where: b.status === 'live' ? `${art} (${b.where.split(' ')[0]})` : b.where };
  }
  if (!/^docs\//.test(v)) return { status: 'undocumented', where: `Docs: ${value} is not articles/<path>.md, docs/<branch> or none <reason>` };
  const ref = `origin/${v}`;
  if (ix.refs.includes(ref)) return { ...(await aggregate(ix, live, branchCommits(ix, ref), v)), branch: true };
  const landed = landedCommits(ix, v);
  if (landed.length) return { ...(await aggregate(ix, live, landed, `${v} (deleted, merged into ${ix.base})`)), branch: true };
  return { status: 'undocumented', branch: true, where: `${v} is not on origin and no merge of it is in ${ix.base} history` };
}

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

export async function analyze({ repo, range, docsRepo = ROOT, live, base = 'origin/staging', key, profile, ix, alive, warnings = [] }) {
  key ??= repoKey(repo);
  profile ??= PROFILES[key] ?? {};
  ix ??= docsIndex(docsRepo, base, alive);
  const liveSrc = typeof live === 'string' ? liveSource(live) : live;
  const rows = [];
  let branchRefs = false;
  for (const c of commits(repo, range)) {
    const vis = visibleFiles(c.files, profile);
    const row = { sha: c.sha, subject: c.subject, date: c.date, files: vis };
    if (!vis.length || INTERNAL_SUBJECT.test(c.subject)) {
      rows.push({ ...row, status: 'internal', where: vis.length ? 'internal commit type' : 'no customer-visible files' });
      continue;
    }
    const declared = trailers(c.body, 'Docs');
    const decl = (ix.documents.get(short(c.sha)) ?? []).filter((d) => c.sha.startsWith(d.sha) && d.repo === key.toLowerCase());
    if (declared.length || decl.length) {
      const rs = [];
      for (const d of declared) rs.push(await docsRef(ix, liveSrc, d, c.date));
      for (const d of decl) rs.push(await docsCommit(ix, liveSrc, d.docsSha));
      if (rs.some((r) => r.branch)) branchRefs = true;
      // A Documents: declaration can rescue a dangling Docs: reference.
      const w = decl.length && rs.some((r) => r.status !== 'undocumented') ? worst(rs.filter((r) => r.status !== 'undocumented')) : worst(rs);
      rows.push({ ...row, status: w.status, where: rs.map((r) => r.where).join('; '), docs: [...new Set(rs.flatMap((r) => r.docs ?? []))] });
      continue;
    }
    const h = hints(vis, ix.articles).map((a) => {
      const last = tryGit(ix.repo, 'log', '-1', since(c.date), '--format=%h %cs', ...ix.all, '--', a);
      return last ? `${a} (changed ${last.split(' ')[1]} in ${last.split(' ')[0]})` : `${a} (unchanged since ${c.date})`;
    });
    rows.push({ ...row, status: 'undocumented', where: 'no Docs: trailer and no Documents: declaration', hints: h });
  }
  if (branchRefs) warnings.push(BRANCH_NOTE);
  return { key, range, live: typeof live === 'string' ? live : '(custom)', base, rows, warnings };
}

const LABEL = { undocumented: 'UNDOCUMENTED', pending: 'PENDING', live: 'LIVE', exempt: 'EXEMPT', internal: 'internal' };

export function report(result, filing) {
  const n = (s) => result.rows.filter((r) => r.status === s).length;
  const out = [`Docs manifest: ${result.key} ${result.range} (${result.rows.length} commits), live docs ${result.live}, docs base ${result.base}`];
  for (const r of result.rows) {
    out.push(`  ${LABEL[r.status].padEnd(12)} ${short(r.sha)} ${r.subject}`);
    if (r.status !== 'internal') out.push(`  ${''.padEnd(12)}         -> ${r.where}`);
    for (const h of r.hints ?? []) out.push(`  ${''.padEnd(12)}         hint: ${h}`);
  }
  const ships = (s) => [...new Set(result.rows.filter((r) => r.status === s).flatMap((r) => r.docs ?? []))];
  out.push(`Documentation alongside: live ${ships('live').join(', ') || 'none'}; pending (not on manifestx.dev yet) ${ships('pending').join(', ') || 'none'}`);
  out.push(`Result: ${n('undocumented')} undocumented, ${n('pending')} docs pending, ${n('live')} live, ${n('exempt')} exempt, ${n('internal')} internal.`);
  for (const w of result.warnings ?? []) out.push(w);
  if (filing) out.push(filing.message);
  return out.join('\n');
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
    '  - **close criteria:** each change documented by a Website docs commit carrying the trailer `Documents: ' + result.key + '@<sha>` (or `Docs: none <reason>` agreed for it); a re-run of tools/docs-manifest.mjs on the range shows no UNDOCUMENTED rows.',
    `  - **docs-manifest:** ${rows.map((r) => `${result.key}@${r.sha.slice(0, 12)}`).join(' ')}`,
  ].join('\n');
}

// Already-filed source commits, from every record's docs-manifest field (open or closed).
export function filed(text) {
  const out = new Set();
  for (const m of text.matchAll(/\*\*docs-manifest:\*\*[ \t]*(.+?)\r?$/gm)) for (const t of m[1].trim().split(/\s+/)) out.add(t.toLowerCase().replace(/^(.+@[0-9a-f]{7}).*$/, '$1'));
  return out;
}

export function insert(text, rec) {
  const eol = text.includes('\r\n') ? '\r\n' : '\n';
  const ls = text.split(/\r?\n/);
  const r = rec.split('\n').join(eol);
  const open = ls.findIndex((l) => /^## Open\s*$/.test(l));
  if (open < 0) throw new Error('WORK.md has no "## Open" section');
  const next = ls.findIndex((l, i) => i > open && /^## /.test(l));
  if (next < 0) return `${text.replace(/(\r?\n)*$/, '')}${eol}${eol}${r}${eol}`;
  let end = next;
  while (end > open + 1 && ls[end - 1].trim() === '') end--;
  return [...ls.slice(0, end), '', r, '', ...ls.slice(next)].join(eol);
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

// Best effort: refresh origin refs and learn which docs/* branches still exist; never prunes the caller's refs.
export function refresh(docsRepo, repo, warnings) {
  if (tryGit(docsRepo, 'fetch', '-q', 'origin') === null) warnings.push('Warning: git fetch of the docs repo failed; using origin refs as of the last fetch.');
  if (tryGit(repo, 'fetch', '-q', '--tags', 'origin') === null) warnings.push('Warning: git fetch of the source repo failed; using origin refs as of the last fetch.');
  const heads = tryGit(docsRepo, 'ls-remote', '--heads', 'origin');
  return heads === null ? null : new Set(lines(heads).map((l) => l.split('\trefs/heads/')[1]));
}

export async function main(argv = process.argv.slice(2), log = console.log) {
  const o = args(argv);
  const warnings = [];
  let alive = null;
  if (o.fetch && !o.dryRun) alive = refresh(o.docsRepo, o.repo, warnings);
  else if (o.dryRun) warnings.push('Note: dry run, not fetched; origin refs as of the last fetch.');
  const range = o.range ?? defaultRange(o.repo);
  const result = await analyze({ repo: o.repo, range, docsRepo: o.docsRepo, live: o.live, base: o.base, key: o.key, alive, warnings });
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
