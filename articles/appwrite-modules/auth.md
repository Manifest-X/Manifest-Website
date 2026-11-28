# Auth

Implement a complete authentication solution for your app with a connected <a href="https://appwrite.io/" target="_blank" rel="noopener">Appwrite</a> project.

---

## Setup

Complete the [Appwrite setup](/docs/framework/appwrite-modules/appwrite-setup) steps to connect your Appwrite and Manifest projects.

Add the Appwrite SDK and `manifest.js` scripts to the HTML head. `manifest.json` is also required for Appwrite credentials and configuring auth details. The auth module auto-loads when the `appwrite` object includes `auth`, even an empty `"auth": {}`.

<div x-code-group copy>

```html "Auto-detect"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Declared"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-modules="+appwrite-auth"></script>
```

</div>

---

## Security Model

The auth module runs in the browser and talks to Appwrite with your project ID, which is public. Anything the module can ask Appwrite to do, anyone can ask with their own script. Your data is protected by what Appwrite itself allows, which comes down to the sign-in methods you enable and the permissions on your rows, files, and teams.

Appwrite lets any visitor do the following once the matching method is on, so plan for each of them.

| What a visitor can do | When | What to do about it |
|---|---|---|
| Attach an email and password to a guest session, even with Email/Password turned off in the Appwrite console | Anonymous sign-in is enabled in the Appwrite console, which the `guest` methods need | Don't treat "has an email" as "signed in with a method you offer". Leave `guest` and `guest-auto` off unless the project needs them. |
| Create an account for any email address by requesting a magic URL or email code for it | Magic URL or Email OTP is enabled in the Appwrite console | An account existing for an address doesn't prove that its owner created it. Only a completed sign-in does. |
| Create teams, as many as Appwrite's rate limits allow, and choose a team's ID | Always, for any signed-in user, guests included | Don't key anything on a predictable team ID. If team creation should be limited, create teams from an Appwrite function instead. |
| Call any Appwrite endpoint directly, skipping your interface | Always | Put the rule on the row, file, or function. [Permissions](/docs/framework/appwrite-modules/teams#how-permissions-resolve) worked out in the browser only decide what your interface shows. |

Two behaviors of the module itself are also worth knowing about.

- **Sign-in links ask first outside the browser that requested them.** A magic URL opened within an hour in the browser that requested it signs in at once. Opened anywhere else, such as on another device or from a link someone else sent, it does nothing until the visitor [confirms](/docs/framework/appwrite-modules/users#magic-urls). This stops a stranger's link from quietly signing a visitor in to the stranger's account. A team invite link is still accepted on page load, but only for the signed-in account it was sent to.
- **Any role with an owner-level permission is an Appwrite owner.** Appwrite has one privileged team role, `owner`. A role you define that includes `inviteMembers`, `updateMembers`, `removeMembers`, `renameTeam`, `deleteTeam`, or `manageRoles` is given that role so that Appwrite accepts those requests. A member who holds it can make every owner request directly, whatever your interface offers. For roles that must be limited on the server, run the action in an Appwrite function that checks the caller's role.

---

## Next Steps

Complete authentication support using the guides for:

- [Users](/docs/framework/appwrite-modules/users)
- [Teams](/docs/framework/appwrite-modules/teams) (optional)