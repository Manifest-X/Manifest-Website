# Publish

Put your project online, check changes before anyone sees them, and undo mistakes.

---

## Before you start

Publishing uploads your project's files from your computer, so you start it in Claude Code with Manifest added, either the [plugin](/docs/ai/setup/plugin) or the [connector](/docs/ai/setup/connector). Your computer needs <a href="https://nodejs.org" target="_blank">Node.js</a>.

Once a project is online, you can take it live, undo changes, and connect domains from Claude on the web, desktop, or phone too.

---

## Put it online

Ask Claude:

> `Put my project online`{copy}
> `This is a Vite app. Build it and publish it`{copy}

When it's done, Claude gives you the live address. New projects get an address ending in `.manifestx.ai`.

For a project that isn't built with Manifest, Claude runs your usual build first, then publishes the result. Your framework and files stay as they are.

---

## Staging, then live

Every project has two versions: **staging** for checking changes, and **live** for everyone else.

1. Ask Claude to `publish to staging`{.prompt copy}. You get a separate staging address to review.
2. When it looks right, ask Claude to `take it live`{.prompt copy}. The exact version you reviewed goes live, with no rebuild.

If you ask Claude to publish without saying where, it publishes to live.

::: brand icon="lucide:badge-check"
On the Free plan, projects show a small "Made with Manifest" badge in the corner, and Manifest may feature your project in its showcase. On [Pro](/docs/ai/projects/manage#plans-and-billing), the badge is removed automatically, and you can ask Claude to `keep my project out of the showcase`{.prompt copy}. The showcase doesn't affect how search engines find you.
:::

---

## Commands

Ask in plain words in any Claude app, or type a command in Claude Code with the [plugin](/docs/ai/setup/plugin). Both do the same thing.

| To | Say | Or type |
|---|---|---|
| See changes on your own computer | `Preview my project`{.prompt copy} | `/manifest:preview` |
| Publish to staging | `Publish to staging`{.prompt copy} | `/manifest:staging` |
| Make it live | `Take it live`{.prompt copy} | `/manifest:publish` |
| See what's ready to publish | `What's the status of my project?`{.prompt copy} | `/manifest:status` |
| Get teammates' changes | `Get the latest changes`{.prompt copy} | `/manifest:sync` |

If your project is saved on GitHub, these commands keep GitHub up to date too. See [GitHub](/docs/ai/setup/github#how-commands-change).

---

## Undo a change

If an update broke something, ask Claude to put the previous version back. To pick a specific version, ask to see recent versions first, then choose one.

> `Put the previous version back`{copy}
> `Show me recent versions`{copy}

Undoing changes is part of the [Pro plan](/docs/ai/projects/manage#plans-and-billing), which keeps your last 5 versions of both staging and live. You can also download any of those versions as a backup.

---

## Change your address

Ask Claude to change your project's address to a name you like, such as `my-bakery.manifestx.ai`. The old address stops working, so update any links you've shared.

---

## Use your own domain

Claude tells you the record to add where you bought the domain. Once the record is in place, Manifest sets up the secure certificate and renews it for you. Ask Claude to check the domain's status at any time.

> `Connect www.example.com to my project`{copy}

Moving a domain that's already live on another host? Tell Claude, and it can set up the certificate before any traffic moves, so nothing goes down during the switch.

A few more things you can ask:

- **With or without www.** If you ask for `example.com`, your project is served at `www.example.com`, and Claude tells you how to send visitors from `example.com` to it at your domain provider. That works with every provider. To serve it at `example.com` itself, say so; Claude checks that your domain provider supports it.
- **A domain for staging.** Ask Claude to `connect preview.example.com to staging`{.prompt copy}.
- **Remove a domain.** Ask Claude to `remove www.example.com`{.prompt copy}. Your project stops answering at that address, and the domain is free to use elsewhere.

---

## If something goes wrong

If publishing keeps failing, your sign-in may have lapsed. Reconnect Manifest (type `/mcp` in Claude Code, or use your connector settings) and try again.

For anything else, email <a href="mailto:team@manifestx.dev">team@manifestx.dev</a>.
