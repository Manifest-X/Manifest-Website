# GitHub Sync

An optional backup and full history of your project on GitHub.

---

## Do You Need It?

No. Manifest publishes, hosts, and keeps versions without it. GitHub helps if you want a backup of your working files, a history of every change, smoother teamwork when several people edit often, or hosting somewhere else.

It needs a Code session and a free <a href="https://github.com" target="_blank">GitHub account</a>. Claude sets up the rest, including GitHub's `gh` tool the first time.

---

## Save to GitHub

> `Save my project to GitHub`{copy}

A GitHub sign-in opens in your browser, then Claude creates a **private** copy only you and people you add can see. From then on, publishing also saves to GitHub, and `/manifest:sync` brings in other people's changes.

---

## Add a Teammate

> `Add sam to the project on GitHub`{copy}

Claude asks for their GitHub username and email, and invites them to both GitHub and the Manifest project (a [Pro](/docs/platform/manage#plans) feature). They accept both, start a new Code session, and ask Claude to `join the Manifest project`{.prompt copy}.

---

## Host Somewhere Else

> `Host this project on Netlify instead`{copy}

Claude connects <a href="https://www.netlify.com" target="_blank">Netlify</a>, <a href="https://pages.cloudflare.com" target="_blank">Cloudflare Pages</a>, or <a href="https://appwrite.io/products/sites" target="_blank">Appwrite Sites</a> to your GitHub copy, and the current version stays online until the new host is ready. To come back, ask Claude to `move this back to Manifest hosting`{.prompt copy}.
