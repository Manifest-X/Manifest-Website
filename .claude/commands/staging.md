---
description: Commit local changes and push them to the staging branch, deploying to the staging site. Website projects pre-render first. End-to-end — no mid-command prompts.
---

You are the "Publish to Staging" button. The contributor pressed it because they want their work on the staging site. Run end-to-end and report when done. **Do not ask for confirmation between steps.** Stop only on errors or guardrail violations (listed at bottom). Generate a commit message and use it directly — never ask the user to approve it mid-run.

Optional user-supplied commit message: $ARGUMENTS (if present, use verbatim instead of generating one)

## Run

0. **Detect the pipeline first** (see CLAUDE.md → "Detecting the pipeline"). Decide in priority order:
   - **Manifest managed** (Hosting says so, a `*.manifestx.ai` URL, or `manifest_deployments` returns rows): this is a managed publish, **not** a git push. Determine `source` — 'render' for a website project (a `prerender` block in `manifest.json` or a `/website` dir), else 'spa'. Call `manifest_publish` with `env='staging'` and that `source`, then run the returned one-step `command` from the project root (it builds, zips, and uploads). Report the staging URL from the response. **Skip every git step below.** Done.
   - **External (self-managed)** (Hosting says so): don't drive a deploy — say "This project publishes through your own host, so `/staging` doesn't apply here. I can commit your changes (and `/sync` if you have a repo), or set up Manifest-managed or GitHub hosting if you'd like me to handle publishing." Stop after the user chooses.
   - **On GitHub** (a git `origin` remote exists, not managed): continue with the git flow in steps 1–8.
   - **Local-only, nothing published**: don't error — offer the choice. "To get this on a reviewable web preview I can either (a) publish it to the web on Manifest hosting — instant, no setup, or (b) save it to GitHub first for a team workflow. For most people (a) is the quick path." If (a): `manifest_publish env='staging'` as above. If (b): follow **manifest-github**, then continue from step 1. If they decline both: stop politely — they can keep working locally and run `/staging` later.

1. **Read project info.** From CLAUDE.md's `## Project` block, get:
   - Default branch (fall back: `staging`)
   - Staging URL (may be `(none)` — that's fine, just omit it from the report)
   - Project type (SPA or Website — see "Project type" section)

2. **Branch check.** `git branch --show-current`. If not on the default branch, stop with: "You're on `<branch>`, not `<default>`. Switch to `<default>` first." Do not offer to switch — that's for `/sync`.

3. **Sync silently if behind.** `git fetch origin <default>`, then `git rev-list --count <default>..origin/<default>`.
   - If 0: continue.
   - If > 0: auto-handle it — stash any uncommitted work, `git pull --rebase origin <default>`, pop stash. Report briefly ("Synced N new commits from GitHub first."). Only stop if there's a real conflict (stash pop or rebase conflict) — in which case, trigger `/sync` logic for conflict resolution.

4. **Pre-render (website projects only).**
   - If **SPA** (or no declaration): skip this step.
   - If **Website**: first check whether the render is actually needed.
     - Collect changed files: `git diff --name-only HEAD` plus `git ls-files --others --exclude-standard` (covers modified, deleted, staged, untracked).
     - Render is needed **only if** at least one changed file is a source-type file **outside `/website/`**. Source-type extensions: `.html`, `.css`, `.json`, `.yaml`, `.yml`, `.csv`, `.md`.
     - If none of the changed files qualify: skip render and briefly report why (e.g. "Skipped render — no source files changed; only root-level files were touched.").
     - If render is needed: run `npx mnfst-render`. Large renders take minutes — use a background-capable approach so you can stream progress updates (e.g. "Render at 207/249. No errors. Continuing."). On non-zero exit or error output, stop and surface the error in plain terms. Do not commit.

4a. **Pre-publish checks (before committing).** Don't ship broken or un-crawlable:
   - **Works? (all projects)** — if you changed functionality, run the **manifest-qa** verify pass: routes load, console/network clean, key interactions work, responsive holds. Fix anything broken and re-test first.
   - **SEO? (website projects, after render)** — run the **manifest-seo** "Pre-publish SEO check" on the rendered `/website` (title/description, one `<h1>`, image `alt`, Open Graph, canonical, accidental `noindex`, sitemap/robots).
   Report issues as a short prioritized list and **offer to fix before the push**. Both are fast and non-blocking — if it's clean (or the user says ship anyway), continue. Skip the SEO part for SPAs.

5. **Check if anything to publish.** `git status --porcelain`.
   - If empty: "Nothing to publish — your local matches `<default>`." Stop.

6. **Generate commit message** (skip if $ARGUMENTS provided):
   - One concise imperative line reflecting the source change, not the render side-effect.
   - If multiple unrelated changes, pick the most user-visible one or describe them briefly (e.g. "Update pricing copy and remove old robots.txt").
   - Do **not** ask the user to approve. Just use it.

7. **Commit and push.**
   - `git add -A`
   - `git commit -m "<message>"`
   - `git push origin <default>`

8. **Report final state.** One block:
   - "Published to staging." If staging URL is set: "Deploying to <staging URL> in ~30–60s." Otherwise: "Your deploy host should pick this up shortly."
   - Commit message used.
   - Brief summary: N source files edited, (if website) M `/website/` files regenerated.

## Guardrails — these DO stop the command

- Not on the default branch → stop.
- `mnfst-render` errors → stop, do not commit.
- Staged files that look like secrets (`.env`, `*.key`, `*.pem`, `credentials*`) → stop, warn the user.
- Merge conflict during auto-sync → stop, hand off to `/sync` flow for resolution.
- Unexpected git state (detached HEAD, ongoing merge/rebase, wrong remote) → stop, explain.

Everything else is fire-and-forget. The contributor pressed a button — respect that.
