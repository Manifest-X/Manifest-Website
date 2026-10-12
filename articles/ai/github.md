# GitHub

Back up your project, work on it with other people, or host it somewhere else.

---

## Why use GitHub?

Your site's files live on your computer. Manifest hosts the published site, but it doesn't keep your working files. <a href="https://github.com" target="_blank">GitHub</a> is a free service that stores a copy of those files online, so you can:

- **Keep a backup** in case something happens to your computer.
- **Work with other people.** Teammates need the project's files to edit the site, and GitHub is how they get them.
- **Host the site somewhere else** if you'd rather not use Manifest hosting.

You don't need GitHub to publish. Many people never use it. Claude handles all of the steps below. You only need a free GitHub account.

---

## Back up your project

In Claude Code, ask:

- `Save my project to GitHub`{.prompt copy}

Claude creates a **private** copy of your project on GitHub, so only you and people you add can see it. The first time, a GitHub sign-in page opens in your browser. Sign in, then come back to Claude.

Your project now has two versions on GitHub, matching your site: **staging** for work in progress, and **production** for what's live.

::: brand icon="lucide:lock"
Claude never saves passwords or secret keys to GitHub, and keeps the copy private unless you ask for it to be public.
:::

---

## How commands change

Once a project is on GitHub, the commands also keep GitHub up to date:

| Command | Or say | With GitHub, it also… |
|---|---|---|
| `/manifest:staging` | `Publish to staging`{.prompt copy} | Saves your changes to GitHub's staging version. |
| `/manifest:publish` | `Take it live`{.prompt copy} | Moves the staging version to production on GitHub. |
| `/manifest:sync` | `Get the latest changes`{.prompt copy} | Brings in your teammates' saved changes. Run it when you start working. |
| `/manifest:status` | `What's the status of my site?`{.prompt copy} | Shows what's saved, what isn't, and what's ready to go live. |

---

## Work with a teammate

A teammate needs two things: access to the files on GitHub, and an invite to the project on Manifest. Ask Claude to do both:

- `Add sam to my project`{.prompt copy}. Claude asks for their GitHub username and their email address.

Your teammate needs a free GitHub account. Claude adds them on GitHub, which sends them a GitHub invite, and sends them a Manifest invite by email. Inviting teammates on Manifest is part of the [paid plan](/docs/ai/site/manage#plans-and-billing).

### Joining a project

If someone added you to their project, accept both invites, then open Claude Code in a new, empty folder and ask:

- `Join my Manifest project`{.prompt copy}

Claude copies the project from GitHub, connects it to Manifest, and installs the commands. From then on, use `/manifest:sync` to get your teammates' changes and `/manifest:staging` to share yours.

---

## Host somewhere else

Manifest hosting is the default, but you can host your site with another service that publishes straight from GitHub instead, such as <a href="https://www.netlify.com" target="_blank">Netlify</a>, <a href="https://pages.cloudflare.com" target="_blank">Cloudflare Pages</a>, or <a href="https://appwrite.io/products/sites" target="_blank">Appwrite Sites</a>. Ask:

- `I'd like to host this site on Netlify instead`{.prompt copy}

Claude walks you through connecting the service to your GitHub project. After that, `/manifest:staging` and `/manifest:publish` save to GitHub, and your host publishes the changes. Your old site keeps running until the new one is ready, so nothing goes offline while you switch.

You can move back to Manifest hosting the same way: `Move this site back to Manifest hosting`{.prompt copy}
