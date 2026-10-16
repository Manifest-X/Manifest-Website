# Publish

Put a project online, check changes first, undo mistakes, and publish native apps.

---

## Put it online

In the **Code** tab, with your project's folder open, ask:

> `Put it online`{copy}

Claude publishes it and gives you the address, ending in `.manifestx.ai`. To publish a project built with something else, like React or Vite, just ask the same way. Claude runs its usual build first and leaves your setup as it is.

Without the Code tab, such as in a chat on Claude's Free plan, Claude can still build and publish sites up to 10 MB: it creates the files in the chat and sends them to Manifest directly. Larger projects, especially ones with many images, need the Code tab.

---

## Staging, then live

Every project has two versions, each at its own address: **staging** for checking changes, and **live** for everyone else.

1. Ask Claude to `publish to staging`{.prompt copy}, then check the staging address.
2. When it looks right, ask Claude to `take it live`{.prompt copy}. The exact version you checked goes live.

If you don't say which, Claude publishes to live. You can take staging live from any Claude chat, including on your phone.

---

## Commands

Commands are shortcuts for the most common requests. Type them in the Code tab, or just ask in your own words.

| Command | Or ask | What it does |
|---|---|---|
| `/manifest:preview` | `Preview my project`{.prompt copy} | Runs the project on your computer only. |
| `/manifest:staging` | `Publish to staging`{.prompt copy} | Publishes to your staging address. |
| `/manifest:publish` | `Take it live`{.prompt copy} | Makes it live. |
| `/manifest:status` | `What's the status of my project?`{.prompt copy} | Sums up what's changed and what's ready. |
| `/manifest:sync` | `Get the latest changes`{.prompt copy} | Brings in teammates' changes, for projects synced with [GitHub](/docs/ai/projects/github-sync). |

In chats, there's nothing to type: just ask, and Claude does the same thing.

---

## Rollbacks

> `Put the previous version back`{copy}
> `Show me recent versions`{copy}

Pro projects keep their last 5 versions of both staging and live, so you can go back to any of them or download a copy. See [plans](/docs/ai/setup/plans).

---

## Your address

To change the `.manifestx.ai` address, ask Claude to `change my address to acme-launch`{.prompt copy}. The old address stops working, so update any links you've shared.

---

## Custom domains

> `Connect www.example.com to my project`{copy}

Claude tells you which record to add where you bought the domain. Once it's in place, Manifest sets up the security certificate and renews it for you.

- **Moving a domain that's live elsewhere?** Tell Claude, and it sets up the certificate before anything moves, so nothing goes offline.
- **`example.com` or `www.example.com`?** By default your project is served at `www`, and Claude tells you how to send `example.com` visitors there. Ask for `example.com` itself if your domain provider supports it.
- **Staging can have a domain too**, like `preview.example.com`.
- **To stop using a domain**, ask Claude to `remove www.example.com`{.prompt copy}.

---

## Native apps

Your project can also become a native app, installed from the App Store, Google Play, the Microsoft Store, or directly.

> `Turn this project into an iPhone and Android app`{copy}

Claude packages the same project for each platform and can add native features like Face ID, push notifications, and haptics. Submitting to a store uses your own developer account (Apple's costs $99 a year, Google's a one-time $25), and Apple reviews each app by hand. See [Native Apps](/docs/framework/publishing/native-apps) for each store's requirements.

Projects built with the Manifest framework can also be installed straight from the browser, like an app, with no store involved. See [Web Apps](/docs/framework/publishing/web-apps).

---

## Badge and showcase

Free projects show a small "Made with Manifest" badge, and may be featured in Manifest's showcase. On Pro, the badge is removed automatically, and you can ask Claude to `keep my project out of the showcase`{.prompt copy}. Neither affects how search engines find you.
