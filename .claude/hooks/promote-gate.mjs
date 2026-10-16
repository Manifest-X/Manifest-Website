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

// Exit 2 once stderr drains; pipes are async on macOS, so process.exit would truncate.
class Halt extends Error {}
const block = (msg) => {
  process.stderr.write(msg.endsWith('\n') ? msg : msg + '\n', () => process.exit(2));
  throw new Halt(msg);
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

// Shell words grouped into commands; quotes respected, $ and ` mark a word dynamic.
export function commands(cmd) {
  const out = [[]];
  let w = null;
  const end = () => {
    if (w) out.at(-1).push(w);
    w = null;
  };
  const cut = () => {
    end();
    if (out.at(-1).length) out.push([]);
  };
  const ch = (c, dyn = false) => {
    w ??= { text: '', dynamic: false };
    w.text += c;
    if (dyn) w.dynamic = true;
  };
  for (let i = 0; i < cmd.length; i++) {
    const c = cmd[i];
    if (c === "'") {
      const j = cmd.indexOf("'", i + 1);
      const k = j < 0 ? cmd.length : j;
      w ??= { text: '', dynamic: false };
      w.text += cmd.slice(i + 1, k);
      if (j < 0) w.dynamic = true;
      i = k;
    } else if (c === '"') {
      w ??= { text: '', dynamic: false };
      let j = i + 1;
      for (; j < cmd.length && cmd[j] !== '"'; j++) {
        if (cmd[j] === '\\' && j + 1 < cmd.length) w.text += cmd[++j];
        else ch(cmd[j], cmd[j] === '$' || cmd[j] === '`');
      }
      if (j >= cmd.length) w.dynamic = true;
      i = j;
    } else if (c === '\\') {
      if (cmd[i + 1] === '\n') i++;
      else ch(cmd[++i] ?? '');
    } else if (c === '#' && !w) {
      while (i < cmd.length && cmd[i] !== '\n') i++;
      cut();
    } else if (/[\s]/.test(c)) c === '\n' ? cut() : end();
    else if (/[;&|()`<>]/.test(c)) cut();
    else ch(c, c === '$');
  }
  cut();
  return out.filter((c) => c.length);
}

const VALUE = /^--(?:source|output-dir|key|mcp|root)$/;
const PROGRAM = /(?:^|\/)(?:mnfst-publish(?:@[^/\s]*)?(?:\.m?js)?|manifest\.publish\.mjs)$/;

// Mirrors mnfst-publish's parseArgs: production unless the last env flag says staging.
function publishKinds(cmd, depth = 0) {
  if (depth > 4) return ['publish'];
  const kinds = new Set();
  for (const words of commands(cmd)) {
    words.forEach((w, i) => {
      if (!PROGRAM.test(w.text)) {
        if (/mnfst-publish|manifest\.publish/.test(w.text) && /\s/.test(w.text)) for (const k of publishKinds(w.text, depth + 1)) kinds.add(k);
        return;
      }
      let env = 'production';
      let promote = false;
      const rest = words.slice(i + 1);
      for (let j = 0; j < rest.length; j++) {
        const a = rest[j];
        if (a.dynamic) env = null;
        else if (a.text === '--staging') env = 'staging';
        else if (a.text === '--production' || a.text === '--prod') env = 'production';
        else if (a.text === '--env') env = rest[++j] && !rest[j].dynamic ? rest[j].text : null;
        else if (a.text === '--promote') promote = true;
        else if (VALUE.test(a.text)) j++;
      }
      if (promote) kinds.add('promote');
      else if (env !== 'staging') kinds.add('publish');
    });
  }
  return [...kinds];
}

export function classify(input) {
  const tool = input.tool_name ?? '';
  const ti = input.tool_input ?? {};
  if (/manifest_promote$/.test(tool)) return isWebsite(input) ? { kind: 'promote' } : null;
  if (/manifest_rollback$/.test(tool)) return isWebsite(input) && ti.env !== 'staging' ? { kind: 'rollback', target: ti.deployment_id ?? null } : null;
  if (/manifest_publish$/.test(tool)) return isWebsite(input) && ti.env !== 'staging' ? { kind: 'publish' } : null;
  if (tool === 'Bash') {
    const kinds = publishKinds(String(ti.command ?? ''));
    return kinds.length ? { kind: kinds[0], kinds } : null;
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
  for (const kind of c.kinds ?? [c.kind]) {
    const args = ['tools/promote-manifest.mjs'];
    if (kind === 'publish') args.push('--staging', join(ROOT, 'website'));
    const r = spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8', timeout: DEADLINE_MS, killSignal: 'SIGKILL' });
    if (r.error || r.signal) block(`promote-gate: gate did not finish within ${DEADLINE_MS / 1000}s (${r.error?.code ?? r.signal}); blocking.`);
    if (r.status !== 0) block(`${r.stdout}${r.stderr}\nBlocked: add an approval (path, sha256, approver, date) to promote-manifest.json for each file above; \`npm run promote:check -- --template\` prints them.`);
  }
}

const self = () => {
  try {
    return pathToFileURL(realpathSync(process.argv[1])).href === pathToFileURL(realpathSync(fileURLToPath(import.meta.url))).href;
  } catch {
    return false;
  }
};
if (self()) {
  setTimeout(() => process.stderr.write('promote-gate: deadline reached; blocking.\n', () => process.exit(2)), DEADLINE_MS + 5000).unref();
  try {
    let raw = '';
    for await (const c of process.stdin) raw += c;
    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      block('promote-gate: unreadable hook input; blocking.');
    }
    run(input ?? {});
  } catch (e) {
    if (!(e instanceof Halt)) process.stderr.write(`promote-gate: ${e.message}; blocking.\n`, () => process.exit(2));
  }
}
