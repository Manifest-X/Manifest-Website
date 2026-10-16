#!/usr/bin/env node
// PreToolUse: blocks Manifest-Website production changes the promote manifest does not clear. Fails closed.
import { spawnSync } from 'node:child_process';
import { readFileSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ID = 'proj_manifest_website';
const NAME = /^manifest[-_ ]?website$/i;
export const DEADLINE_MS = Number(process.env.PROMOTE_DEADLINE_MS) || 45000;

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
  if (/manifest_rollback$/.test(tool)) return isWebsite(input) && ti.env !== 'staging' ? { kind: 'rollback', target: ti.deployment_id ?? null } : null;
  if (/manifest_publish$/.test(tool)) return isWebsite(input) && ti.env !== 'staging' ? { kind: 'publish' } : null;
  if (tool === 'Bash') {
    const cmd = String(ti.command ?? '');
    if (!/mnfst-publish/.test(cmd)) return null;
    const named = [...cmd.matchAll(/\bproj_[A-Za-z0-9_]+/g)].map((m) => m[0]);
    if (named.length && !named.includes(ID)) return null;
    if (/--promote\b/.test(cmd)) return { kind: 'promote' };
    if (/--rollback\b/.test(cmd)) return { kind: 'rollback', target: cmd.match(/\bdep_[A-Za-z0-9]+/)?.[0] ?? null };
    if (/--staging\b|--env[= ]+["']?staging\b|MNFST_PUBLISH_ENV=["']?staging\b/.test(cmd)) return null;
    return { kind: 'publish' };
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
    (r) => /^dep_/.test(target ?? '') && r?.deployment_id === target && typeof r.approver === 'string' && r.approver.trim() && /^\d{4}-\d{2}-\d{2}$/.test(r.date ?? ''),
  );
}

export function run(input) {
  const c = classify(input);
  if (!c) return;
  if (c.kind === 'rollback') {
    if (approvedRollback(c.target)) return;
    block(c.target
      ? `Rollback blocked: an older deployment can restore unapproved pages. Add {"deployment_id": "${c.target}", "approver", "date"} to "rollbacks" in promote-manifest.json, then retry.`
      : 'Rollback blocked: name the target deployment_id; only a deployment listed under "rollbacks" in promote-manifest.json can be restored.');
  }
  const args = ['tools/promote-manifest.mjs'];
  if (c.kind === 'publish') args.push('--staging', join(ROOT, 'website'));
  const r = spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8', timeout: DEADLINE_MS, killSignal: 'SIGKILL' });
  if (r.error || r.signal) block(`promote-gate: gate did not finish within ${DEADLINE_MS / 1000}s (${r.error?.code ?? r.signal}); blocking.`);
  if (r.status === 0) return;
  block(`${r.stdout}${r.stderr}\nBlocked: add an approval (path, sha256, approver, date) to promote-manifest.json for each file above; \`npm run promote:check -- --template\` prints them.`);
}

const self = () => {
  try {
    return pathToFileURL(realpathSync(process.argv[1])).href === pathToFileURL(realpathSync(fileURLToPath(import.meta.url))).href;
  } catch {
    return false;
  }
};
if (self()) {
  setTimeout(() => block('promote-gate: deadline reached; blocking.'), DEADLINE_MS + 5000).unref();
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
