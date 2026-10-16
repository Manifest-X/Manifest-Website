#!/usr/bin/env node
// PreToolUse: Website production is reached only by promote, and a promote needs committed approvals. Fails closed.
// Known limits (durable fix: server-side check in Manifest-MCP promote-core.ts):
// - argv-form spawns in code strings (spawnSync('npx', ['mnfst-publish']), subprocess.run([...])) are not seen;
// - scripts, aliases and shell functions that call the CLI indirectly are not seen;
// - the dashboard promote button and other clients bypass this hook;
// - live-vs-live crawls trust host ETags for binaries and see only linked files.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ID = 'proj_manifest_website';
const NAME = /^manifest[-_ ]?website$/i;
export const DEADLINE_MS = Number(process.env.PROMOTE_DEADLINE_MS) || 45000;
const START = Date.now();

const SHELL_TOOLS = /^(?:Bash|Monitor|mcp__terminal__run_in_terminal)$/;
const PUBLISH_MSG =
  "Blocked: Manifest-Website production is reached only by promote. Publish to staging (manifest_publish env='staging', or `npx mnfst-publish --staging`), then promote; the promote gate compares the served staging bytes with production.";
const APPROVAL_MSG = "Blocked: these files need Andrew's approval in promote-manifest.json on origin/staging. Do not add approvals yourself; ask Andrew or file a queue row.";

// Exit 2 once stderr drains; pipes are async on macOS, so process.exit would truncate.
class Halt extends Error {}
const block = (msg) => {
  process.stderr.write(msg.endsWith('\n') ? msg : msg + '\n', () => process.exit(2));
  throw new Halt(msg);
};

const isWebsiteId = (id) => id === ID || NAME.test(id);

export function pinned(dir) {
  for (let d = dir; d && d !== dirname(d); d = dirname(d)) {
    try {
      const m = JSON.parse(readFileSync(join(d, '.mcp.json'), 'utf8'));
      for (const s of Object.values(m.mcpServers ?? {})) {
        const h = Object.entries(s.headers ?? {}).find(([k]) => k.toLowerCase() === 'x-manifest-project');
        if (h) return String(h[1]).trim();
      }
    } catch {}
  }
  return null;
}

// Any checkout or worktree of the repo carrying this gate.
function inWebsite(dir) {
  for (let d = dir; d && d !== dirname(d); d = dirname(d)) {
    if (existsSync(join(d, 'promote-manifest.json')) && existsSync(join(d, '.claude/hooks/promote-gate.mjs'))) return true;
  }
  return false;
}

// Connector tools: only a named other project passes; the repo's .mcp.json pin wins server-side.
export function isWebsite(input) {
  const id = String(input.tool_input?.project_id ?? '').trim();
  return !id || isWebsiteId(id);
}

const SHELL_RUN = /(?:^|[|;&(]|&&|\|\|)\s*(?:\S*\/)?(?:sh|bash|zsh|dash|ksh|fish)\b/;

// Here-doc body: run as commands when fed to a shell, else only its unquoted $() and `` run.
function heredoc(cmd, from, h, subs) {
  let i = from;
  const body = [];
  while (i < cmd.length) {
    const eol = cmd.indexOf('\n', i);
    const ln = cmd.slice(i, eol < 0 ? cmd.length : eol);
    i = eol < 0 ? cmd.length : eol + 1;
    if ((h.strip ? ln.replace(/^\t+/, '') : ln) === h.delim) break;
    body.push(ln);
  }
  const text = body.join('\n');
  if (h.shell) subs.push(text);
  else if (!h.quoted) for (const m of text.matchAll(/\$\(([^)]*)\)|`([^`]*)`/g)) subs.push(m[1] ?? m[2]);
  return i;
}

// Shell words grouped into commands; quotes respected, $ and ` mark a word dynamic; quoted $() and `` land in subs.
export function commands(cmd) {
  let depth = 0;
  let tick = false;
  const seg = (sep) => Object.assign([], { sep, sub: depth > 0 || tick });
  const out = [seg(null)];
  const subs = [];
  const docs = [];
  let line = 0;
  let w = null;
  const end = () => {
    if (w) out.at(-1).push(w);
    w = null;
  };
  const cut = (sep = ';') => {
    end();
    const last = out.at(-1);
    if (last.length) out.push(seg(sep));
    else {
      if (!/^(?:&&|\|\|)$/.test(last.sep ?? '')) last.sep = sep;
      last.sub ||= depth > 0 || tick;
    }
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
        else if (cmd.startsWith('$(', j) || cmd[j] === '`') {
          const open = cmd[j] === '`' ? 1 : 2;
          let k = j + open;
          for (let depth = 1; k < cmd.length; k++) {
            if (open === 1 ? cmd[k] === '`' : cmd[k] === ')' && !--depth) break;
            if (open === 2 && cmd[k] === '(') depth++;
          }
          subs.push(cmd.slice(j + open, k));
          ch('$', true);
          j = k;
        } else ch(cmd[j], cmd[j] === '$');
      }
      if (j >= cmd.length) w.dynamic = true;
      i = j;
    } else if (c === '\\') {
      if (cmd[i + 1] === '\n') i++;
      else ch(cmd[++i] ?? '');
    } else if (c === '#' && !w) {
      while (i < cmd.length && cmd[i] !== '\n') i++;
      cut('\n');
    } else if (c === '\n') {
      cut('\n');
      for (const h of docs.splice(0)) i = heredoc(cmd, i + 1, h, subs) - 1;
      line = i + 1;
    } else if (/\s/.test(c)) end();
    else if (cmd.startsWith('<<', i) && cmd[i + 2] !== '<') {
      cut('>');
      const m = cmd.slice(i + 2).match(/^(-?)\s*(['"]?)([A-Za-z0-9_.-]+)\2/);
      if (m) {
        const eol = cmd.indexOf('\n', i);
        const head = cmd.slice(line, eol < 0 ? cmd.length : eol);
        docs.push({ delim: m[3], strip: !!m[1], quoted: !!m[2], shell: SHELL_RUN.test(head) });
        i += 1 + m[0].length;
      } else i++;
    } else if (c === '&' || c === '|') {
      const two = cmd[i + 1] === c;
      if (two) i++;
      cut(two ? c + c : c);
    } else if (c === '(') {
      depth++;
      cut('(');
    } else if (c === ')') {
      depth = Math.max(0, depth - 1);
      cut(')');
    } else if (c === '`') {
      tick = !tick;
      cut('`');
    } else if (/[;<>]/.test(c)) cut(c === ';' ? ';' : '>');
    else ch(c, c === '$');
  }
  end();
  return Object.assign(out.filter((c) => c.length), { subs });
}

const PROGRAM = /(?:^|\/)(?:mnfst-publish(?:@[^/\s]*)?(?:\.m?js)?|manifest\.publish\.mjs)$/;
const VALUE = /^--(?:source|output-dir|key|mcp)$/;
const ASSIGN = /^[A-Za-z_][A-Za-z0-9_]*=/;
// Wrappers before a program: flags that take a value, and flags that change directory.
const WRAP = {
  env: { value: /^(?:-u|-C|-S|--unset|--chdir|--split-string)$/, chdir: /^(?:-C|--chdir)$/, split: /^(?:-S|--split-string)$/ },
  sudo: { value: /^(?:-[ugCDhpRrTtU]|--(?:user|group|chdir|host|prompt|role|type|other-user|close-from|command-timeout))$/, chdir: /^(?:-D|--chdir)$/ },
  nice: { value: /^(?:-n|--adjustment)$/ },
  timeout: { value: /^(?:-s|-k|--signal|--kill-after)$/, duration: true },
  xargs: { value: /^-[nILPsdEa]$/ },
  exec: { value: /^-a$/ },
  time: {},
  nohup: {},
  command: {},
  builtin: {},
};
const SHELL = new Set(['sh', 'bash', 'zsh', 'dash', 'ksh', 'fish']);
const CODE = { node: /^(?:-e|--eval|-p|--print)$/, deno: /^eval$/, bun: /^(?:-e|--eval)$/, python: /^-c$/, python3: /^-c$/, perl: /^-[a-zA-Z]*e$/, ruby: /^-e$/ };
const base = (w) => w.text.split('/').pop();
const expand = (p) => (p === '~' ? homedir() : p.startsWith('~/') ? join(homedir(), p.slice(2)) : p);
const at = (cwd, p) => (isAbsolute(expand(p)) ? expand(p) : cwd ? resolve(cwd, p) : null);
const dirAt = (cwd, w) => {
  const p = w && !w.dynamic ? at(cwd, w.text) : null;
  try {
    return p && statSync(p).isDirectory() ? p : null;
  } catch {
    return null;
  }
};

// Mirrors mnfst-publish's parseArgs: production unless the last env flag says staging.
function call(rest, cwd) {
  let env = 'production';
  let promote = false;
  let dir = cwd;
  for (let j = 0; j < rest.length; j++) {
    const a = rest[j];
    if (a.dynamic) env = null;
    else if (a.text === '-h' || a.text === '--help') return null;
    else if (a.text === '--staging') env = 'staging';
    else if (a.text === '--production' || a.text === '--prod') env = 'production';
    else if (a.text === '--env') env = rest[++j] && !rest[j].dynamic ? rest[j].text : null;
    else if (a.text === '--promote') promote = true;
    else if (a.text === '--root') dir = rest[++j] && !rest[j].dynamic ? at(cwd, rest[j].text) : null;
    else if (VALUE.test(a.text)) j++;
  }
  if (promote) return { kind: 'promote', dir };
  return env === 'staging' ? null : { kind: 'publish', dir };
}

// mnfst-publish calls in command position; `cwd` null means unknown.
export function calls(cmd, cwd, depth = 0, code = false) {
  if (depth > 4) return [{ kind: 'publish', dir: null }];
  const out = [];
  const parsed = commands(cmd);
  for (const sub of parsed.subs) out.push(...calls(sub, cwd, depth + 1, code));
  let clean = depth === 0 && !code;
  for (const [n, words] of parsed.entries()) {
    if (code) {
      words.forEach((w, i) => {
        if (PROGRAM.test(w.text)) {
          const c = call(words.slice(i + 1), cwd);
          if (c) out.push(c);
        } else if (/mnfst-publish|manifest\.publish/.test(w.text) && /\s/.test(w.text)) out.push(...calls(w.text, cwd, depth + 1, true));
      });
      continue;
    }
    let i = 0;
    let dir = cwd;
    const first = /^(?:cd|pushd|popd)$/.test(words[0].text);
    if (!first) clean = false;
    while (i < words.length) {
      const w = words[i];
      const b = base(w);
      if (ASSIGN.test(w.text)) i++;
      else if (PROGRAM.test(w.text)) {
        const c = call(words.slice(i + 1), dir);
        if (c) out.push(c);
        break;
      } else if (/^(?:cd|pushd|popd)$/.test(b)) {
        // Known only for a leading, unconditional cd to an existing dir outside any subshell.
        const t = words[i + 1];
        const next = parsed[n + 1]?.sep;
        const plain = first && clean && !words.sub && (words.sep == null || words.sep === ';' || words.sep === '\n') && next !== '|' && next !== '&';
        cwd = !plain || b === 'popd' || t?.text === '-' ? null : !t ? homedir() : dirAt(cwd, t);
        if (cwd == null) clean = false;
        break;
      } else if (WRAP[b]) {
        const spec = WRAP[b];
        i++;
        while (words[i]?.text.startsWith('-') && words[i].text !== '--') {
          const f = words[i].text;
          if (/^--chdir=/.test(f)) dir = dirAt(dir, { text: f.slice(8), dynamic: words[i].dynamic });
          if (spec.value?.test(f)) {
            if (spec.chdir?.test(f)) dir = dirAt(dir, words[i + 1]);
            if (spec.split?.test(f) && words[i + 1]) out.push(...calls(words[i + 1].text, dir, depth + 1));
            i += 2;
          } else i++;
        }
        if (words[i]?.text === '--') i++;
        if (spec.duration && /^\d/.test(words[i]?.text ?? '')) i++;
      } else if (b === 'npx' || b === 'bunx') {
        i++;
        while (words[i]?.text.startsWith('-')) i += /^(?:-p|--package)$/.test(words[i].text) ? 2 : 1;
      } else if ((b === 'npm' && /^(?:exec|x)$/.test(words[i + 1]?.text)) || (/^(?:pnpm|yarn)$/.test(b) && /^(?:dlx|exec)$/.test(words[i + 1]?.text))) {
        i += 2;
        while (words[i]?.text.startsWith('-')) i += /^(?:-p|--package)$/.test(words[i].text) ? 2 : 1;
      } else if (b === 'eval') {
        out.push(...calls(words.slice(i + 1).map((x) => x.text).join(' '), cwd, depth + 1));
        break;
      } else if (SHELL.has(b)) {
        const k = words.findIndex((x, n) => n > i && /^-[a-zA-Z]*c[a-zA-Z]*$/.test(x.text));
        if (k > 0 && words[k + 1]) out.push(...calls(words[k + 1].text, cwd, depth + 1));
        break;
      } else if (CODE[b]) {
        const k = words.findIndex((x, n) => n > i && CODE[b].test(x.text));
        if (k > 0 && words[k + 1]) {
          out.push(...calls(words[k + 1].text, cwd, depth + 1, true));
          break;
        }
        i++;
        while (words[i]?.text.startsWith('-')) i++;
      } else break;
    }
  }
  return out;
}

function shellCwd(input) {
  const ti = input.tool_input ?? {};
  if (input.tool_name === 'mcp__terminal__run_in_terminal') {
    if (ti.cwd) return dirAt(input.cwd ?? process.cwd(), { text: String(ti.cwd), dynamic: false });
    if (ti.tab_id) return null;
  }
  return input.cwd ?? process.cwd();
}

export function classify(input) {
  const tool = input.tool_name ?? '';
  const ti = input.tool_input ?? {};
  if (/__manifest_promote$/.test(tool)) return isWebsite(input) ? { kind: 'promote' } : null;
  if (/__manifest_rollback$/.test(tool)) return isWebsite(input) && ti.env !== 'staging' ? { kind: 'rollback', target: ti.deployment_id ?? null } : null;
  if (/__manifest_publish(?:_files)?$/.test(tool)) return isWebsite(input) && ti.env !== 'staging' ? { kind: 'publish' } : null;
  if (SHELL_TOOLS.test(tool)) {
    const cwd = shellCwd(input);
    // Unknown directory: block rather than guess.
    const hits = calls(String(ti.command ?? ''), cwd).filter((c) => {
      if (!c.dir) return true;
      const id = pinned(c.dir);
      return id ? isWebsiteId(id) : inWebsite(c.dir);
    });
    if (hits.some((c) => c.kind === 'publish')) return { kind: 'publish' };
    if (hits.length) return { kind: 'promote' };
  }
  return null;
}

const git = (...args) => spawnSync('git', ['-C', ROOT, ...args], { encoding: 'utf8', timeout: 15000 });

// Approvals count only once on the remote staging branch; resolved by sha so no local ref can shadow it.
function approvals() {
  if (process.env.PROMOTE_APPROVALS) {
    try {
      return readFileSync(process.env.PROMOTE_APPROVALS, 'utf8');
    } catch {
      return null;
    }
  }
  const ls = git('ls-remote', 'origin', 'refs/heads/staging');
  const sha = ls.status === 0 ? ls.stdout.match(/^([0-9a-f]{40})\trefs\/heads\/staging$/m)?.[1] : null;
  if (!sha) return null;
  const has = () => git('cat-file', '-e', `${sha}^{commit}`).status === 0;
  if (!has()) git('fetch', '-q', 'origin', sha);
  if (!has()) git('fetch', '-q', 'origin', 'refs/heads/staging');
  if (!has()) return null;
  const r = git('show', `${sha}:promote-manifest.json`);
  if (r.status !== 0) return null;
  try {
    JSON.parse(r.stdout);
    return r.stdout;
  } catch {
    return null;
  }
}

function approvedRollback(text, target) {
  let doc;
  try {
    doc = JSON.parse(text);
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
  if (c.kind === 'publish') block(PUBLISH_MSG);
  const text = approvals();
  if (text == null) block('promote-gate: could not read promote-manifest.json from the remote staging branch (git ls-remote origin refs/heads/staging); blocking.');
  if (c.kind === 'rollback') {
    if (approvedRollback(text, c.target)) return;
    block(c.target
      ? `Rollback blocked: an older deployment can restore unapproved pages. ${c.target} is not listed under "rollbacks" in promote-manifest.json on origin/staging. Do not add it yourself; ask Andrew or file a queue row.`
      : 'Rollback blocked: name the target deployment_id; only a deployment Andrew listed under "rollbacks" in promote-manifest.json can be restored.');
  }
  const left = DEADLINE_MS - (Date.now() - START);
  if (left <= 0) block('promote-gate: out of time before the check ran (not an approvals problem); blocking.');
  const tmp = mkdtempSync(join(tmpdir(), 'promote-gate-'));
  let r;
  try {
    writeFileSync(join(tmp, 'approvals.json'), text);
    r = spawnSync(process.execPath, ['tools/promote-manifest.mjs', '--approvals', join(tmp, 'approvals.json')], { cwd: ROOT, encoding: 'utf8', timeout: left, killSignal: 'SIGKILL' });
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  if (r.error || r.signal) block(`promote-gate: the check did not finish within ${DEADLINE_MS / 1000}s (${r.error?.code ?? r.signal}); network slowness, not an approvals problem. Blocking; retry later.`);
  if (r.status === 2) block(`promote-gate: network failure reading the staging or production site, not an approvals problem:\n${r.stderr.trim()}\nBlocking; retry once both hosts respond.`);
  if (r.status !== 0) block(`${r.stdout}${r.stderr}\n${APPROVAL_MSG}`);
  const removed = r.stdout.split('\n').filter((l) => /^\s+OK\s+removed /.test(l));
  if (removed.length) {
    const msg = `Promote gate passed. This promote REMOVES ${removed.length} file(s) from production:\n${removed.map((l) => l.trim().replace(/^OK\s+removed\s+/, '  ')).join('\n')}`;
    process.stdout.write(JSON.stringify({ systemMessage: msg, hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: msg } }));
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
