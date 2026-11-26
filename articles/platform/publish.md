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

### Check a Build Before Staging

> `Publish this to staging without changing what's on staging, and give me a preview link`{copy}

Claude stores the build and replies with a preview address that shows exactly that build, while staging stays as it was. When it looks right, ask Claude to `take that version live`{.prompt copy} and that exact build goes live. Name a release by asking for a label, like `call it v2.4`{.prompt copy}; Claude shows labels when it lists versions.

For release scripts, the same works with `npx mnfst-publish --no-live --label "v2.4"`{copy}, then `npx mnfst-publish --promote --deployment dep_…`{copy}. `npx mnfst-publish --list --json`{copy} reads which version is live, so your script can pass it to `--expect-live dep_…`{copy}, which refuses the promote unless that version is still live. With `--json`{copy}, the result is one object your script can read, and a refusal carries a code such as `live_moved`. An option the command doesn't know is refused, so nothing is published. With search-ready pages on, the version you promoted still matches after its finished pages replace it. Preview addresses show pages only: forms, payments and AI chat answer on staging and live.

### Framework Version

Pages that load the framework at `mnfst@latest`, another tag such as `next`, or a version range are fixed to the exact release it points to when you publish. Each published version keeps the framework it was published with, so a new framework release doesn't change a site until you publish again, and visitors' browsers can keep the framework files cached. The next full publish picks up the newest release; an update to a few files keeps the version of the site it updates.

Only the framework's own `<script>` and `<link>` tags loading from cdn.manifestx.dev, jsDelivr or unpkg are changed, and a loader tag without `data-version` gets one. Tags with an `integrity` check stay as written. If the release can't be looked up while publishing, no page is changed and the pages load what their tags name.

---

## Search-Ready Pages

> `Make my site ready for search engines`{copy}

Search engines and AI assistants read little more than a page's first HTML, so a site built in the browser can look nearly empty to them. With search-ready pages on, Manifest turns each live release into finished pages that they read in full, with titles, descriptions, a sitemap and link previews. Nothing is installed on your computer, and it's free on every plan.

Claude turns it on for sites meant to be found, like a business site, blog or portfolio, and sets the site's real address so links point to it. Staging is served as built; each live release takes a few minutes to finish.

---

## Rollbacks

> `Put the previous version back`{copy}

Manifest keeps the last 5 versions of staging and live. On Pro, Claude can put any of them back. On any plan, you can ask for a downloaded copy of one.

---

## Custom Domains

> `Connect example.com to my project`{copy}

Claude tells you what to add where you bought the domain, and there's no need to move your DNS anywhere. Manifest then sets up the security certificate and renews it for you.

- **A domain on its own, like `example.com`:** two records, an address record and a short code that proves the domain is yours.
- **A subdomain, like `shop.example.com`:** one record.
- **Visitors typing `www`?** Add the extra record Claude gives you and they're sent to `example.com`.
- **Moving a live domain?** Tell Claude first, and nothing goes offline during the move.
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
