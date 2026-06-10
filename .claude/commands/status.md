---
description: Show a plain-English summary of where the repo stands — branch, unsaved edits, and what's ready to publish or promote.
---

Give the contributor a quick "where am I?" view. Keep it short — no raw git output, just a clean summary.

## Steps

1. **Read project info** from CLAUDE.md's `## Project` block:
   - Default branch (fall back: `staging`)
   - Live branch (fall back: `production`)
   - Staging URL, Production URL (may be `(none)` — omit those lines if so)
   - **Hosting** (Manifest managed / Own host via GitHub / none yet)

2. **Two independent axes** (see CLAUDE.md → "How publishing works"):
   - **Source control:** `git remote get-url origin 2>/dev/null` → GitHub or local-only. Governs the branch/divergence checks below.
   - **Hosting backend:** Manifest managed (Hosting field, a `*.manifestx.ai` URL, or `manifest_deployments` returns rows), Own host via GitHub, or none yet.

3. If on GitHub, run, in parallel where possible:
   - `git branch --show-current`
   - `git status --porcelain` (count lines for modified-files count)
   - `git fetch origin <default> <live>` (silent fetch)
   - `git rev-list --left-right --count <default>...origin/<default>` (local vs remote default)
   - `git rev-list --left-right --count origin/<live>...origin/<default>` (live vs default)

4. **Report** in this shape — substitute real values, omit lines that don't apply, keep it under ~12 lines:

```
Storage:           <GitHub (<owner>/<repo>)  |  On your computer only>
Hosting:           <Manifest hosting  |  Own host via GitHub  |  External (self-managed)  |  Not published yet>
Branch:            <current-branch>                ← only if on GitHub
Local edits:       <N files unsaved>               ← omit if zero
Your <default>:    <N commits not yet published>   ← only if on GitHub, omit if zero
<default> → live:  <N changes ready to promote>    ← only if on GitHub, omit if zero

Staging preview:   <staging URL>                   ← omit if (none)
Live site:         <production URL>                ← omit if (none)
```

5. Then, one plain-English sentence recommending a next action:
   - **Managed hosting**, has unsaved local edits → "Run `/staging` (or say 'put it on the web to review') to update your preview, or `/publish` to take it live."
   - **GitHub**, has unsaved edits → "Run `/staging` when you're ready to see these changes on the staging site."
   - **GitHub**, default ahead of live → "Run `/publish` when you're ready to take the staging changes live."
   - Behind origin/default → "Run `/sync` to pull in the latest from teammates."
   - **Not published yet** → "Run `/publish` (or just say 'put it online') whenever you want it live — I can host it instantly, no setup. Or back it up to GitHub for a team workflow."
   - Everything in sync → "All caught up."

## Guardrails

- If not on the default or live branch, call that out prominently — it usually means something has gone wrong.
- Keep output under ~12 lines total.
