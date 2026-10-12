# Plugin

Add Manifest to Claude Code, with skills and commands for building and publishing.

---

## Overview

The Manifest plugin sets up everything Claude Code needs in one install:

- **The Manifest connector**, so Claude can publish and run your projects. You don't need to add it separately.
- **Skills**: know-how Claude uses on its own when you ask for something, like laying out a page, styling it, adding a form, or translating it.
- **Commands**: shortcuts you type to preview, publish, and check on your project.

New to Claude Code? See [what Claude Code is](/docs/ai/setup/claude#what-is-claude-code).

---

## Install

### From Claude's plugin directory

1. In Claude Code, type `/plugin`.
2. Open the **Discover** tab and search for **Manifest**.
3. Select **Manifest**, then install it.

### From GitHub

You can also install it straight from Manifest's plugin repository:

```bash copy
/plugin marketplace add Manifest-X/claude-plugin
```

```bash copy
/plugin install manifest@manifest
```

---

## Sign in

The first time Claude uses Manifest, type `/mcp` and choose Manifest. A sign-in page opens in your browser. Sign in with Google, GitHub, or your email address, then select **Approve**. See [Sign in](/docs/ai/setup/connector#sign-in) for what you'll see along the way.

::: brand icon="lucide:info"
If you added the Manifest connector to Claude Code before installing the plugin, remove it so Claude doesn't load Manifest twice: run `claude mcp remove manifest` in your terminal.
:::

---

## Commands

Type a command in Claude Code, or ask in plain words. Both do the same thing.

| Command | Or say | What it does |
|---|---|---|
| `/manifest:preview` | `Preview my project`{.prompt copy} | Opens your project on your own computer, so you can see changes before publishing. Nothing goes online. |
| `/manifest:staging` | `Publish to staging`{.prompt copy} | Puts your latest changes at your staging address for checking. |
| `/manifest:publish` | `Take it live`{.prompt copy} | Makes your project live for everyone. |
| `/manifest:status` | `What's the status of my project?`{.prompt copy} | Sums up what's changed and what's ready to publish. |
| `/manifest:sync` | `Get the latest changes`{.prompt copy} | Brings in teammates' changes, for projects saved on GitHub. |

---

## Skills

You don't run skills yourself. Claude picks the right one when you ask for something. With the plugin, Claude knows how to:

| Area | Ask things like |
|---|---|
| Pages and layout | `Add an About page`{.prompt copy} `Put these three cards in a row`{.prompt copy} |
| Look and feel | `Use a warmer color palette`{.prompt copy} `Make the buttons rounder`{.prompt copy} |
| Reusable sections | `Turn this banner into something I can reuse on every page`{.prompt copy} |
| Forms | `Add a contact form`{.prompt copy} |
| Content and data | `Show my product list from this spreadsheet`{.prompt copy} |
| Images, icons, and fonts | `Replace the logo`{.prompt copy} `Use the Inter font`{.prompt copy} |
| Translations | `Add a French version`{.prompt copy} |
| Search and sharing | `Improve how my pages look when shared on social media`{.prompt copy} |
| Accounts and saved data | `Let visitors sign in`{.prompt copy} `Save form entries to a database`{.prompt copy} |
| Speed | `This menu feels slow`{.prompt copy} |
| Testing | `Check that everything works before I publish`{.prompt copy} |
| Matching a design | `Make it look like this screenshot`{.prompt copy} |
| Starting from an example | `Rebuild this layout for my business`{.prompt copy} |
| Saving to GitHub | `Save my project to GitHub`{.prompt copy} `Add sam to my project`{.prompt copy} |
| Hosting elsewhere | `Host this on Netlify instead`{.prompt copy} |
| Several projects | `Let's work on the bakery website`{.prompt copy} |
| Getting expert help | `I'd like someone to finish this for me`{.prompt copy} |

---

## Manage the plugin

To update or remove the plugin, type `/plugin` and open the **Installed** tab.
