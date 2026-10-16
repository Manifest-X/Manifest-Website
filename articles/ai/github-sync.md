# GitHub Sync

Keep a backup and a full history of your project on GitHub. Optional.

---

## Do you need it?

No. You can build, publish, and work as a team with Manifest alone. GitHub is a free service that keeps a copy of your project's files online, which helps if you want:

- **A backup** of your working files, not just what you've published.
- **A full history** of every change, by everyone.
- **Smoother teamwork**, when several people edit often.
- **Hosting somewhere else**, such as Netlify or Cloudflare Pages.

You'll need a free <a href="https://github.com" target="_blank">GitHub account</a>. Claude does the rest.

---

## Save your project to GitHub

> `Save my project to GitHub`{copy}

The first time, a GitHub sign-in opens in your browser. Claude then creates a **private** copy that only you and people you add can see. Claude never saves passwords or keys to it.

From then on, `/manifest:staging` and `/manifest:publish` also save to GitHub, and `/manifest:sync` brings in other people's changes.

---

## Add a teammate

> `Add sam to the project on GitHub`{copy}

Claude asks for their GitHub username and email address, then sends them both a GitHub invite and a Manifest invite. Your teammate accepts both, opens a new folder in the **Code** tab, and asks Claude to `join the Manifest project`{.prompt copy}.

---

## Host somewhere else

> `Host this project on Netlify instead`{copy}

Claude walks you through connecting <a href="https://www.netlify.com" target="_blank">Netlify</a>, <a href="https://pages.cloudflare.com" target="_blank">Cloudflare Pages</a>, or <a href="https://appwrite.io/products/sites" target="_blank">Appwrite Sites</a> to your GitHub copy. The current version stays online until the new host is ready. To come back, ask Claude to `move this back to Manifest hosting`{.prompt copy}.
