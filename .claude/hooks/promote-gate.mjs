#!/usr/bin/env node
// PreToolUse: blocks Manifest-Website production changes the promote manifest does not clear. Fails closed.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ID = 'proj_manifest_website';
const NAME = /^manifest[-_ ]?website$/i;

const block = (msg) => {
  process.stderr.write(msg.endsWith('\n') ? msg : msg + '\n');
  process.exit(2);
};

function pinned(cwd) {
  for (let d = cwd; d && d !== dirname(d); d = dirname(d)) {
    try {
      const m = JSON.parse(readFileSync(join(d, '.mcp.json'), 'utf8'));
      for (const s of Object.values(m.mcpServers ?? {})) {
        const h = Object.entries(s.headers ?? {}).find(([k]) => k.toLowerCase() === 'x-manifest-project');
        if (h) return h[1];
      }
    } catch {}
  }
  return null;
}

// Unknown project counts as Manifest-Website.
export function isWebsite(input) {
  const id = input.tool_input?.project_id ?? pinned(input.cwd ?? process.cwd());
  return id == null || id === ID || NAME.test(String(id).trim());
}

export function classify(input) {
  const tool = input.tool_name ?? '';
  const ti = input.tool_input ?? {};
  if (/manifest_promote$/.test(tool)) return isWebsite(input) ? { kind: 'promote' } : null;
  if (/manifest_rollback$/.test(tool)) return isWebsite(input) && ti.env !== 'staging' ? { kind: 'rollback', target: ti.deployment_id ?? 'previous' } : null;
  if (/manifest_publish$/.test(tool)) return isWebsite(input) && ti.env === 'production' ? { kind: 'publish' } : null;
  if (tool === 'Bash') {
    const cmd = String(ti.command ?? '');
    if (!/mnfst-publish/.test(cmd)) return null;
    const cd = cmd.match(/(?:^|[;&|]\s*)cd\s+["']?([^"';&|]+?)["']?\s*(?:&&|;|$)/)?.[1]?.replace(/^~(?=\/)/, process.env.HOME ?? '~');
    const cwd = cd ? (cd.startsWith('/') ? cd : join(input.cwd ?? process.cwd(), cd)) : input.cwd;
    if (!isWebsite({ cwd })) return null;
    if (/--promote\b/.test(cmd)) return { kind: 'promote' };
    if (/--rollback\b/.test(cmd)) return { kind: 'rollback', target: 'previous' };
    if (/--env[= ]+["']?production/.test(cmd) || /MNFST_PUBLISH_ENV=["']?production/.test(cmd)) return { kind: 'publish' };
  }
  return null;
}

function approvedRollback(target) {
  let doc;
  try {
    doc = JSON.parse(readFileSync(process.env.PROMOTE_APPROVALS ?? join(ROOT, 'promote-manifest.json'), 'utf8'));
  } catch {
    return false;
  }
  return (doc.rollbacks ?? []).some(
    (r) => r?.deployment_id === target && typeof r.approver === 'string' && r.approver.trim() && /^\d{4}-\d{2}-\d{2}$/.test(r.date ?? ''),
  );
}

export function run(input) {
  const c = classify(input);
  if (!c) return;
  if (c.kind === 'rollback') {
    if (approvedRollback(c.target)) return;
    block(`Rollback blocked: an older deployment can restore unapproved pages. Add {"deployment_id": "${c.target}", "approver", "date"} to "rollbacks" in promote-manifest.json, then retry.`);
  }
  const args = ['tools/promote-manifest.mjs'];
  if (c.kind === 'publish') args.push('--staging', join(ROOT, 'website'));
  const r = spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8' });
  if (r.status === 0) return;
  block(`${r.stdout}${r.stderr}\nBlocked: add an approval (path, sha256, approver, date) to promote-manifest.json for each file above; \`npm run promote:check -- --template\` prints them.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let raw = '';
  for await (const c of process.stdin) raw += c;
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    block('promote-gate: unreadable hook input; blocking.');
  }
  try {
    run(input ?? {});
  } catch (e) {
    block(`promote-gate: ${e.message}; blocking.`);
  }
  process.exit(0);
}
