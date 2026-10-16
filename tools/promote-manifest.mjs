#!/usr/bin/env node
// Promote manifest gate: every page a promote would add or change must be approved.
// Usage: node tools/promote-manifest.mjs [--staging <url|dir>] [--production <url|dir>] [--approvals <file>] [--template] [--json]
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export const DEFAULTS = {
  staging: 'https://manifest-website-staging.manifestx.ai',
  production: 'https://manifestx.dev',
  approvals: 'promote-manifest.json',
};

export const NAV = '/data/docs.yaml';
const sha = (s) => createHash('sha256').update(s).digest('hex');
const isUrl = (s) => /^https?:\/\//.test(s);

export function source(base) {
  if (isUrl(base)) {
    const root = base.replace(/\/$/, '');
    return async (path) => {
      const res = await fetch(root + path, { redirect: 'manual', headers: { 'cache-control': 'no-cache' } });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`${root + path}: HTTP ${res.status}`);
      return res.text();
    };
  }
  return async (path) => {
    const rel = path.endsWith('/') ? path + 'index.html' : path;
    try {
      return await readFile(join(base, rel), 'utf8');
    } catch (e) {
      if (e.code === 'ENOENT' || e.code === 'EISDIR') return null;
      throw e;
    }
  };
}

export function sitemapPaths(xml) {
  const out = new Set();
  for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    const p = new URL(m[1], 'https://x').pathname.replace(/\/+$/, '') || '/';
    out.add(p);
  }
  return [...out].sort();
}

// Visible text only; drops scripts (incl. CDN-injected beacons), styles, the docs nav (gated as NAV) and markup.
export function pageText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<nav\b[^>]*aria-label="Documentation"[\s\S]*?<\/nav>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function snapshot(base) {
  const get = source(base);
  const xml = await get('/sitemap.xml');
  if (xml == null) throw new Error(`${base}: no sitemap.xml`);
  const pages = new Map();
  const nav = await get(NAV);
  if (nav != null) pages.set(NAV, { path: NAV, source: 'nav', hash: sha(nav) });
  const paths = sitemapPaths(xml);
  let i = 0;
  await Promise.all(
    Array.from({ length: 8 }, async () => {
      while (i < paths.length) {
        const path = paths[i++];
        const html = await get(path === '/' ? '/' : path + '/');
        if (html == null) {
          pages.set(path, { path, missing: true });
          continue;
        }
        const md = html.match(/data-mnfst-md-src="([^"]+)"/)?.[1];
        const body = md ? await get(md) : null;
        pages.set(path, md && body != null
          ? { path, source: md, hash: sha(body) }
          : { path, source: 'html', hash: sha(pageText(html)) });
      }
    }),
  );
  return pages;
}

export function diff(staging, production) {
  const rows = [];
  for (const [path, s] of staging) {
    const p = production.get(path);
    if (s.missing) continue;
    if (!p || p.missing) rows.push({ kind: 'added', ...s });
    else if (p.hash !== s.hash) rows.push({ kind: 'changed', ...s });
  }
  for (const [path, p] of production) {
    if (!staging.has(path) && !p.missing) rows.push({ kind: 'removed', ...p });
  }
  return rows.sort((a, b) => a.path.localeCompare(b.path));
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function validateApprovals(doc) {
  const errors = [];
  const list = Array.isArray(doc?.approvals) ? doc.approvals : null;
  if (!list) return { errors: ['approvals file needs an "approvals" array'], byPath: new Map() };
  const byPath = new Map();
  list.forEach((a, n) => {
    const at = `approvals[${n}]`;
    if (typeof a?.path !== 'string' || !a.path.startsWith('/')) errors.push(`${at}: path must start with /`);
    else if (typeof a.approver !== 'string' || !a.approver.trim()) errors.push(`${at} ${a.path}: approver missing`);
    else if (typeof a.date !== 'string' || !DATE.test(a.date)) errors.push(`${at} ${a.path}: date must be YYYY-MM-DD`);
    else if (a.sha256 != null && !/^[0-9a-f]{64}$/.test(a.sha256)) errors.push(`${at} ${a.path}: sha256 must be 64 hex chars`);
    else byPath.set(a.path.replace(/\/+$/, '') || '/', a);
  });
  return { errors, byPath };
}

// Approval binds to content: a sha256 that no longer matches does not count.
export function gate(rows, approvals) {
  const { errors, byPath } = validateApprovals(approvals);
  const checked = rows.map((r) => {
    if (r.kind === 'removed') return { ...r, status: 'ok' };
    const a = byPath.get(r.path);
    if (!a) return { ...r, status: 'unapproved' };
    if (a.sha256 && a.sha256 !== r.hash) return { ...r, status: 'stale', approver: a.approver, date: a.date };
    return { ...r, status: 'approved', approver: a.approver, date: a.date };
  });
  const blocked = errors.length > 0 || checked.some((r) => r.status === 'unapproved' || r.status === 'stale');
  return { ok: !blocked, errors, rows: checked };
}

export function report(result, { staging, production }) {
  const lines = [`Promote manifest: ${staging} -> ${production}`];
  if (!result.rows.length) lines.push('  no page changes');
  for (const r of result.rows) {
    const who = r.approver ? ` (${r.approver} ${r.date})` : '';
    lines.push(`  ${r.status.toUpperCase().padEnd(10)} ${r.kind.padEnd(7)} ${r.path}  [${r.source}]${who}`);
  }
  for (const e of result.errors) lines.push(`  ERROR ${e}`);
  const n = (s) => result.rows.filter((r) => r.status === s).length;
  lines.push(
    result.ok
      ? `PASS: ${n('approved')} approved, ${n('ok')} removed.`
      : `BLOCKED: ${n('unapproved')} unapproved, ${n('stale')} changed since approval${result.errors.length ? `, ${result.errors.length} file errors` : ''}. Do not promote.`,
  );
  return lines.join('\n');
}

export function template(rows) {
  return {
    approvals: rows
      .filter((r) => r.kind !== 'removed')
      .map((r) => ({ path: r.path, sha256: r.hash, approver: '', date: '', note: r.kind })),
  };
}

function args(argv) {
  const o = { ...DEFAULTS };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--template' || k === '--json') o[k.slice(2)] = true;
    else if (['--staging', '--production', '--approvals'].includes(k)) o[k.slice(2)] = argv[++i];
    else throw new Error(`unknown argument ${k}`);
  }
  return o;
}

export async function main(argv = process.argv.slice(2), log = console.log) {
  const o = args(argv);
  const [s, p] = await Promise.all([snapshot(o.staging), snapshot(o.production)]);
  const rows = diff(s, p);
  if (o.template) {
    log(JSON.stringify(template(rows), null, 2));
    return 0;
  }
  let approvals;
  try {
    approvals = JSON.parse(await readFile(o.approvals, 'utf8'));
  } catch (e) {
    approvals = e.code === 'ENOENT' ? { approvals: [] } : null;
  }
  const result = gate(rows, approvals);
  log(o.json ? JSON.stringify(result, null, 2) : report(result, o));
  return result.ok ? 0 : 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().then(
    (code) => process.exit(code),
    (e) => {
      console.error(`promote-manifest: ${e.message}`);
      process.exit(2);
    },
  );
}
