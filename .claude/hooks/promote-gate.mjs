#!/usr/bin/env node
// PreToolUse on manifest_promote: blocks a Manifest-Website promote the promote manifest does not clear.
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
let raw = '';
for await (const c of process.stdin) raw += c;
const input = JSON.parse(raw || '{}');
if (!/manifest_promote$/.test(input.tool_name ?? '') || input.tool_input?.project_id !== 'proj_manifest_website') process.exit(0);

const r = spawnSync(process.execPath, ['tools/promote-manifest.mjs'], { cwd: root, encoding: 'utf8' });
if (r.status === 0) process.exit(0);
process.stderr.write(`${r.stdout}${r.stderr}\nPromote blocked: add an approval to promote-manifest.json for each page above (approver + date), then retry.\n`);
process.exit(2);
