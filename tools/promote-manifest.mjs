#!/usr/bin/env node
// Promote manifest gate: every served file a promote would add or change must be approved, bound by sha256.
// Usage: node tools/promote-manifest.mjs [--staging <url|dir>] [--production <url|dir>] [--approvals <file>] [--template] [--json]
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

export const DEFAULTS = {
  staging: process.env.PROMOTE_STAGING ?? 'https://manifest-website-staging.manifestx.ai',
  production: process.env.PROMOTE_PRODUCTION ?? 'https://manifestx.dev',
  approvals: process.env.PROMOTE_APPROVALS ?? 'promote-manifest.json',
};

const SEEDS = ['/index.html', '/404.html', '/sitemap.xml', '/manifest.json', '/robots.txt', '/llms.txt', '/llms-full.txt', '/favicon.ico', '/data/docs.yaml'];
const TEXT = /\.(html?|css|m?js|json|ya?ml|md|txt|xml|csv|svg|webmanifest)$/i;
const MAX_FILES = 5000;

const sha = (b) => createHash('sha256').update(b).digest('hex');
const isUrl = (s) => /^https?:\/\//.test(s);

// Strips only known host/CDN noise; everything else is compared byte for byte.
export function normalize(path, buf) {
  if (!TEXT.test(path)) return buf;
  let s = buf.toString('utf8');
  s = s
    .replace(/<script defer src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js"[^>]*><\/script>/g, '')
    .replace(/<script>\(function\(\)\{function c\(\)\{var b=a\.contentDocument[\s\S]*?<\/script>/g, '')
    .replace(/\?v=[0-9a-f]{6,64}\b/g, '?v=*');
  if (path === '/manifest.json') {
    try {
      const j = JSON.parse(s);
      delete j.deployment;
      s = JSON.stringify(j);
    } catch {}
  }
  return Buffer.from(s);
}

export function source(base) {
  if (isUrl(base)) {
    const root = base.replace(/\/$/, '');
    return {
      async get(path) {
        let res;
        try {
          res = await fetch(root + path, { redirect: 'manual', headers: { 'cache-control': 'no-cache' } });
        } catch (e) {
          throw new Error(`${root + path}: ${e.cause?.code ?? e.message}`);
        }
        if (res.status === 404) return null;
        if (res.status >= 300 && res.status < 400) return Buffer.from(`redirect ${res.status} ${res.headers.get('location')}`);
        if (!res.ok) throw new Error(`${root + path}: HTTP ${res.status}`);
        return Buffer.from(await res.arrayBuffer());
      },
      list: async () => [],
    };
  }
  return {
    async get(path) {
      try {
        return await readFile(join(base, path));
      } catch (e) {
        if (e.code === 'ENOENT' || e.code === 'EISDIR' || e.code === 'ENOTDIR') return null;
        throw e;
      }
    },
    async list() {
      const out = [];
      for (const ent of await readdir(base, { recursive: true, withFileTypes: true })) {
        if (!ent.isFile() || ent.name.startsWith('.')) continue;
        const dir = ent.parentPath ?? ent.path;
        out.push('/' + relative(base, join(dir, ent.name)).split(sep).join('/'));
      }
      return out;
    },
  };
}

// Same-origin file paths referenced by a file; routes map to their index.html.
export function refs(path, text) {
  const out = new Set();
  const dir = path.slice(0, path.lastIndexOf('/') + 1);
  const add = (raw) => {
    let p = raw.trim().replace(/[?#].*$/, '').replace(/^https?:\/\/(?:www\.)?manifestx\.dev(?=\/|$)/, '') || '/';
    if (/^(?:[a-z]+:|\/\/|#|\$|\{)/i.test(p) || p.includes('${') || p.length > 300) return;
    try {
      p = new URL(p, 'https://x' + (p.startsWith('/') || /\.(json|ya?ml)$/.test(path) ? '/' : dir)).pathname;
    } catch {
      return;
    }
    p = decodeURIComponent(p);
    if (p.endsWith('/')) p += 'index.html';
    else if (!/\.[a-z0-9]{1,6}$/i.test(p.split('/').pop())) p += '/index.html';
    out.add(p);
  };
  for (const m of text.matchAll(/(?:href|src|data-mnfst-md-src|content|poster|data-src)\s*=\s*"([^"]+)"/g)) add(m[1]);
  for (const m of text.matchAll(/srcset\s*=\s*"([^"]+)"/g)) for (const part of m[1].split(',')) add(part.trim().split(/\s+/)[0]);
  for (const m of text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) add(m[1]);
  for (const m of text.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) add(m[1]);
  for (const m of text.matchAll(/https:\/\/manifestx\.dev(\/[^\s"'<>)\]]*)/g)) add(m[1]);
  for (const m of text.matchAll(/["'`](\.{0,2}\/?[A-Za-z0-9_@~\-][A-Za-z0-9_@~\-./]*\.(?:html|md|json|ya?ml|csv|js|mjs|css|svg|png|jpe?g|webp|gif|ico|txt|xml|woff2?))["'`]/g)) add(m[1]);
  return [...out];
}

// Every file either side serves that a walk (dirs) or crawl from SEEDS (urls) can reach.
export async function crawl(srcs) {
  const seen = new Set();
  const queue = [...SEEDS];
  for (const s of srcs) queue.push(...(await s.list()));
  const files = srcs.map(() => new Map());
  while (queue.length) {
    const batch = queue.splice(0, 16).filter((p) => !seen.has(p) && seen.add(p));
    await Promise.all(
      batch.map(async (p) => {
        const bodies = await Promise.all(srcs.map((s) => s.get(p)));
        bodies.forEach((b, i) => b != null && files[i].set(p, b));
        for (const b of bodies) if (b != null && TEXT.test(p)) for (const r of refs(p, b.toString('utf8'))) if (!seen.has(r)) queue.push(r);
      }),
    );
    if (seen.size > MAX_FILES) throw new Error(`more than ${MAX_FILES} files; refusing to guess`);
  }
  return files;
}

export function diff(staging, production) {
  const rows = [];
  const paths = new Set([...staging.keys(), ...production.keys()]);
  for (const path of [...paths].sort()) {
    const s = staging.get(path);
    const p = production.get(path);
    if (s == null) rows.push({ kind: 'removed', path, hash: sha(normalize(path, p)) });
    else {
      const hash = sha(normalize(path, s));
      if (p == null) rows.push({ kind: 'added', path, hash });
      else if (hash !== sha(normalize(path, p))) rows.push({ kind: 'changed', path, hash });
    }
  }
  return rows;
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
    else if (typeof a.sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(a.sha256)) errors.push(`${at} ${a.path}: sha256 required (64 hex chars)`);
    else byPath.set(a.path, a);
  });
  return { errors, byPath };
}

// Removals pass: diff only reports one after staging actually lacks the file.
export function gate(rows, approvals) {
  const { errors, byPath } = validateApprovals(approvals);
  const checked = rows.map((r) => {
    if (r.kind === 'removed') return { ...r, status: 'ok' };
    const a = byPath.get(r.path);
    if (!a) return { ...r, status: 'unapproved' };
    if (a.sha256 !== r.hash) return { ...r, status: 'stale', approver: a.approver, date: a.date };
    return { ...r, status: 'approved', approver: a.approver, date: a.date };
  });
  const blocked = errors.length > 0 || checked.some((r) => r.status === 'unapproved' || r.status === 'stale');
  return { ok: !blocked, errors, rows: checked };
}

export function report(result, { staging, production }) {
  const lines = [`Promote manifest: ${staging} -> ${production}`];
  if (!result.rows.length) lines.push('  no file changes');
  for (const r of result.rows) {
    const who = r.approver ? ` (${r.approver} ${r.date})` : '';
    lines.push(`  ${r.status.toUpperCase().padEnd(10)} ${r.kind.padEnd(7)} ${r.path}${who}`);
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
  const [s, p] = await crawl([source(o.staging), source(o.production)]);
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
