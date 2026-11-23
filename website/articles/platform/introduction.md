# Introduction

Connect Manifest to Claude, then build and publish by chatting.

---

## What Manifest Does

Manifest lets Claude put what it builds online, and keep it running: hosting, staging, domains, analytics, and teams. You describe what you want; Claude does the work. It's free to start.

---

## Connect Claude

Do this once.

1. In Claude, go to **Customize > Connectors**, select **+**, then **Add custom connector**.
2. Name it `Manifest`{copy} and paste this server URL: `https://mcp.manifestx.dev/mcp`{copy}
3. Select **Add**, then **Connect**, and sign in with Google, GitHub, or your email. This creates your free Manifest account.

Manifest is now available in every new Claude session. You never share a password or key with Claude.

---

## Chat or Code Sessions

You can use Manifest in two kinds of Claude session:

- **Chat sessions** (and Cowork) are everyday Claude conversations, with nothing to set up. Claude keeps the project's files in the session and sends them to Manifest when it publishes.
- **Code sessions** are in the **Code** tab of the Claude desktop app. Claude works in a folder on your computer, so projects can be any size, and it can show a live preview.

| | Code session | Chat session |
|---|---|---|
| Build and publish | ✓ | Projects up to 10 MB and 300 files |
| Preview in the Claude app | ✓ | |
| Pick up where you left off | Open the same folder | Continue in the same session |
| Publish live, connect domains | ✓ | ✓ |
| Invite a team, roll back (Pro) | ✓ | ✓ |
| See visitors | ✓ | ✓ |

### Your Project Folder

A Code session works in a folder you choose:

1. Make an empty folder wherever you keep your documents, named after the project, like `bakery-site`.
2. In the Claude desktop app, open the **Code** tab, start a new session, and choose that folder.
3. Ask Claude to build with Manifest. It saves everything in the folder as it works.

The folder is your working copy. Manifest stores what you publish online, including the last 5 versions, which you can [download](/docs/platform/publish#rollbacks) anytime. For a backup of the folder itself, use [GitHub Sync](/docs/platform/github-sync).

For anything you'll keep growing, start in a Code session.

---

## Start a Session

Name Manifest in your first message, so Claude knows to use it.

> `Build a landing page for our bakery with Manifest`{copy}
> `Publish this project with Manifest`{copy}

To come back to a project in a Code session, open its folder: it includes a `CLAUDE.md` file that tells Claude it's a Manifest project. In any session, you can also name the project, like `let's work on the bakery site`{.prompt copy}.

---

## What You Can Ask

As with anything in Claude, you can ask for whatever you have in mind, in your own words. These are a few ideas to get started.

| To | Prompt ideas |
|---|---|
| [Build](/docs/platform/edit) | `Build a client portal where customers sign in`{.prompt copy} `Make a quiz game for our trade show`{.prompt copy} |
| Draw inspiration | `Capture the vibe of this other site`{.prompt copy} `Grab our theme from our old website`{.prompt copy} |
| [Change](/docs/platform/edit) | `Use our brand colors: navy and orange`{.prompt copy} `Add a French version`{.prompt copy} |
| [Publish](/docs/platform/publish) | `Put it online`{.prompt copy} `Take staging live`{.prompt copy} |
| [Use a domain](/docs/platform/publish#custom-domains) | `Connect www.example.com`{.prompt copy} |
| [Undo](/docs/platform/publish#rollbacks) | `Put the previous version back`{.prompt copy} |
| [Invite people](/docs/platform/manage#teams) | `Invite sam@example.com`{.prompt copy} |
| [See visitors](/docs/platform/manage#analytics) | `How many people visited this week?`{.prompt copy} |
| [Upgrade](/docs/platform/manage#plans) | `Upgrade this project to Pro`{.prompt copy} |
| [Get help](/docs/platform/manage#expert-help) | `Ask the Manifest team for expert help`{.prompt copy} |

---

## Good to Know

- **Any framework.** Claude builds new projects with the open-source [Manifest framework](/docs/framework) unless you ask for another, like React or Svelte. Projects you already have work too. Manifest publishes anything that builds to plain web files.
- **No server code.** Manifest runs what works in the browser. Claude can add sign-ins and saved data with an Appwrite account.
- **Your work stays yours.** On any plan, you can download a copy of any of the last 5 published versions.

---

## If Something Goes Wrong

| If | Try this |
|---|---|
| Claude doesn't use Manifest | Name Manifest in your message, and check it's turned on in the session's connectors menu. |
| Manifest stops responding or asks you to sign in | Reconnect it in **Customize > Connectors**. |
| A project is too big for a Chat session | Continue it in a Code session. |
| The preview won't start | Claude may need to install Node.js, a free tool. Ask it to. |
| A new domain doesn't load yet | Domain changes take a while to spread. Ask `is my domain ready?`{.prompt copy} |
| Anything else | Tell Claude what you expected and what happened. If it can't fix it, <a href="/support#contact" target="_blank">contact the team</a>. |
