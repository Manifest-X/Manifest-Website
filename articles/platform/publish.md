# Publish

Put a project online, check changes first, and use your own domain.

---

## Put It Online

> `Put it online`{copy}

Claude publishes the project and replies with its address, like `acme-launch.manifestx.ai`. Projects built with something else, like React or Vite, are built and published as they are.

In a Chat session, a project can be up to 10 MB and 300 files, with each file up to 2 MB, because Claude sends the files from the session itself. A Code session publishes from the folder on your computer, with no size limit. See [Chat or Code sessions](/docs/platform/introduction#chat-or-code-sessions).

---

## Staging, Then Live

Every project has two addresses: **staging** for checking changes, and **live** for everyone else. Search engines skip staging, but anyone with its address can open it.

1. Ask Claude to `publish to staging`{.prompt copy}, then open the staging address.
2. When it looks right, ask Claude to `take it live`{.prompt copy}. The exact version you checked goes live.

If you don't say which, Claude publishes live.

---

## Rollbacks

> `Put the previous version back`{copy}

Manifest keeps the last 5 versions of staging and live. On Pro, Claude can put any of them back. On any plan, you can ask for a downloaded copy of one.

---

## Custom Domains

> `Connect www.example.com to my project`{copy}

Claude tells you the one record to add where you bought the domain. Manifest then sets up the security certificate and renews it for you.

- **Moving a live domain?** Tell Claude first, and nothing goes offline during the move.
- **Without www?** Projects are served at `www` by default, and Claude shows you how to send `example.com` there.
- **To change the `.manifestx.ai` address**, ask Claude to `change my address to acme-launch`{.prompt copy}. The old address stops working.

---

## Shortcuts

In a Code session, you can type these commands instead of asking.

| Command | Same as asking |
|---|---|
| `/manifest:preview` | `Preview my project`{.prompt copy} |
| `/manifest:staging` | `Publish to staging`{.prompt copy} |
| `/manifest:publish` | `Take it live`{.prompt copy} |
| `/manifest:status` | `What's the status of my project?`{.prompt copy} |

---

## Native Apps

Projects built with the Manifest framework can also become iPhone and Android apps.

> `Turn this project into an iPhone and Android app`{copy}

Claude sets up the app and can add features like Face ID and push notifications. You build and submit it yourself with your own developer accounts; Manifest doesn't submit apps. See [Native Apps](/docs/framework/publishing/native-apps).

---

## Badge and Showcase

Free projects show a small "Made with Manifest" badge and may be featured in Manifest's <a href="/#showcase" target="_blank">showcase</a>. Pro removes the badge, and you can ask Claude to `keep my project out of the showcase`{.prompt copy}.
