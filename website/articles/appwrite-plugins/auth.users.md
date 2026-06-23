# Users

Enable guests and user accounts in your project.

---

## Appwrite Configuration

::: frame
<img src="/assets/examples/appwrite.auth.settings.webp" alt="Appwrite auth settings"/>
:::

Your Appwrite project's Auth dashboard provides various options to customize the user experience. Go to <b>Auth</b> > <b>Settings</b> to enable your preferred sign-in methods. The auth plugin currently supports:
- OAuth2 Providers (Google, Apple, GitHub, Discord, and 35+ more)
- Anonymous (guest sessions)
- Magic URL
- Email OTP (one-time passcode)

See Appwrite's <a href="https://appwrite.io/docs/products/auth" target="_blank" rel="noopener">Auth docs</a> for all configuration details.

---

## Sign-in Methods

With Manifest and Appwrite, a frontend user registration flow (vs. a login flow) is not required. Unrecognized users will have a new account automatically generated, while known users will login to their existing account (from any sign-in method).

::: brand icon="lucide:info"
Interactive examples on this page demonstrate real authentication with **you** as the user. Each example reflects the most recent auth state you've set (e.g. signed-in or out). Example styles and layouts may differ from code snippets.
:::

In `manifest.json`, use the auth `methods` array to define your project's sign-in methods. At least one must be specified here, and enabled in the connected Appwrite project.

```json "manifest.json" copy
{
    "appwrite": {
        "projectId": "your-project-id",
        "endpoint": "your-API-endpoint",
        "devKey": "your-dev-key",
        "auth": {
            "methods": [ "oauth", "magic", "guest-manual" ]
        }
    }
}
```

| Method | Description |
|--------|-------------|
| `guest-auto`{copy} | Automatically creates anonymous guest sessions for all visitors (`guest`{copy} is an accepted synonym) |
| `guest-manual`{copy} | Allows users to manually create guest sessions via `$auth.requestGuest()`{copy} |
| `magic`{copy} | Enables passwordless login via magic URLs sent to email |
| `otp`{copy} | Enables passwordless login via a one-time passcode sent to email |
| `oauth`{copy} | Enables OAuth sign-in with providers like Google, GitHub, etc. |

---

### OAuth

OAuth enables sign-in with third-party providers like Google, GitHub, and 35+ other services supported by and configured in Appwrite's <b>Auth</b> > <b>Settings</b> page.

<div x-code-group>

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            "methods": ["oauth"]
        }
    }
}
```

```html "HTML" copy
<button @click="$auth.loginOAuth('google')" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress">Sign in with Google</button>
<button @click="$auth.loginOAuth('github')" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress">Sign in with GitHub</button>
<button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress">Logout</button>

<!-- Status -->
<p x-show="$auth.inProgress">Authorizing...</p>
<p x-show="$auth.isAuthenticated">You're signed-in using <b x-text="$auth.method || 'guest'"></b><span x-show="$auth.provider"> via <b x-text="$auth.provider"></b></span> as <b x-text="$auth.user?.email || 'a guest'"></b></p>
<p x-show="!$auth.isAuthenticated">You're not signed-in.</p>
<p x-show="$auth.error" x-text="$auth.error"></p>
```

::: frame col gap-4 text-base
<div class="row-wrap gap-2">
    <button @click="$auth.loginOAuth('google')" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress">Sign in with Google</button>
    <button @click="$auth.loginOAuth('github')" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress">Sign in with GitHub</button>
    <button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress">Logout</button>
</div>

<!-- Status -->
<p x-show="$auth.inProgress">Authorizing...</p>
<p x-show="$auth.isAuthenticated">You're signed-in using <b x-text="$auth.method || 'guest'"></b><span x-show="$auth.provider"> via <b x-text="$auth.provider"></b></span> as <b x-text="$auth.user?.email || 'a guest'"></b></p>
<p x-show="!$auth.isAuthenticated">You're not signed-in.</p>
<p x-show="$auth.error" x-text="$auth.error"></p>
:::

</div>

The `$auth.loginOAuth('...')` method accepts provider names like `google`, `github`, and `discord`. When applicable, the user is redirected to the provider's sign-in page and gets returned when authenticated.

---

### Magic URLs

Magic URLs provide passwordless authentication via email. Users enter their email address and get emailed a sign-in link that's valid for one hour, which can be used once.

<div x-code-group>

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            "methods": ["magic"]
        }
    }
}
```

```html "HTML" copy
<!-- Form -->
<input type="email" pattern=".*@.*\..*" required autocomplete="on" placeholder="Input email" aria-label="Email" class="peer" @keyup.enter="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress" />
<button class="peer-invalid:disabled" @click="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress">Send Magic URL</button>
<button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress" class="!w-fit">Logout</button>

<!-- Status -->
<p x-show="$auth.inProgress">Authorizing...</p>
<p x-show="$auth.magicLinkSent">Magic URL sent. Check your inbox or spam to sign-in.</p>
<p x-show="$auth.magicLinkExpired">Magic URL expired. Please try again.</p>
<p x-show="$auth.isAuthenticated">You're signed-in using <b x-text="$auth.method || 'guest'"></b><span x-show="$auth.provider"> via <b x-text="$auth.provider"></b></span> as <b x-text="$auth.user?.email || 'a guest'"></b></p>
<p x-show="!$auth.isAuthenticated">You're not signed-in.</p>
<p x-show="$auth.error" x-text="$auth.error"></p>
```

::: frame col gap-4 text-base
<!-- Form -->
<div class="row-wrap gap-2">
    <input class="flex-1 max-w-full" type="email" pattern=".*@.*\..*" required autocomplete="on" placeholder="Input email" aria-label="Email" class="peer" @keyup.enter="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress" />
    <button class="peer-invalid:disabled" @click="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress">Send Magic URL</button>
    <button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress" class="!w-fit">Logout</button>
</div>

<!-- Status -->
<p x-show="$auth.inProgress">Authorizing...</p>
<p x-show="$auth.magicLinkSent">Magic URL sent. Check your inbox or spam to sign-in.</p>
<p x-show="$auth.magicLinkExpired">Magic URL expired. Please try again.</p>
<p x-show="$auth.isAuthenticated">You're signed-in using <b x-text="$auth.method || 'guest'"></b><span x-show="$auth.provider"> via <b x-text="$auth.provider"></b></span> as <b x-text="$auth.user?.email || 'a guest'"></b></p>
<p x-show="!$auth.isAuthenticated">You're not signed-in.</p>
<p x-show="$auth.error" x-text="$auth.error"></p>
:::

</div>

The button's `$auth.sendMagicLink()` method automatically finds the email input in the same parent element, form element, or otherwise finds the first email input on the page. To target a specific input, add its element ID like `$auth.sendMagicLink('#email-input')`. When activated, a magic URL is sent and the email input field is cleared.

When users click the magic URL in their email, they're redirected back to your app. The plugin automatically handles the callback and creates the session.

Email content can be customized in Appwrite under <b>Auth</b> > <b>Templates</b> > <b>Magic URL</b>.

---

### Email OTP

Email OTP provides passwordless authentication via a one-time passcode. Users enter their email address, receive a short code by email, then enter that code to sign in — all on the same page, with no redirect.

<div x-code-group>

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            "methods": ["otp"]
        }
    }
}
```

```html "HTML" copy
<!-- Step 1: request a code -->
<input type="email" placeholder="Email" x-show="!$auth.otpSent" @keyup.enter="$auth.sendEmailOTP()" />
<button x-show="!$auth.otpSent" @click="$auth.sendEmailOTP()">Email code</button>

<!-- Step 2: enter the code -->
<input name="otp" placeholder="Code" x-show="$auth.otpSent" @keyup.enter="$auth.submitOTP()" />
<button x-show="$auth.otpSent" @click="$auth.submitOTP()">Verify</button>

<p x-show="$auth.otpSent">Code sent — check your inbox.</p>
```

::: frame col gap-4 text-base
<!-- Request a code -->
<div class="row-wrap gap-2" x-show="!$auth.otpSent">
    <input class="flex-1 max-w-full peer" type="email" pattern=".*@.*\..*" required autocomplete="on" placeholder="Input email" aria-label="Email" @keyup.enter="$auth.sendEmailOTP()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress" />
    <button class="peer-invalid:disabled" @click="$auth.sendEmailOTP()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress">Email Code</button>
</div>
<!-- Enter the code -->
<div class="row-wrap gap-2" x-show="$auth.otpSent">
    <input class="flex-1 max-w-full" name="otp" inputmode="numeric" autocomplete="one-time-code" placeholder="Enter code" aria-label="One-time code" @keyup.enter="$auth.submitOTP()" :disabled="$auth.inProgress" />
    <button @click="$auth.submitOTP()" :disabled="$auth.inProgress">Verify</button>
</div>
<button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress" class="!w-fit">Logout</button>

<!-- Status -->
<p x-show="$auth.inProgress">Authorizing...</p>
<p x-show="$auth.otpSent">Code sent. Check your inbox or spam.</p>
<p x-show="$auth.otpExpired">Code was invalid or expired. Please try again.</p>
<p x-show="$auth.isAuthenticated">You're signed-in using <b x-text="$auth.method || 'guest'"></b> as <b x-text="$auth.user?.email || 'a guest'"></b></p>
<p x-show="!$auth.isAuthenticated">You're not signed-in.</p>
<p x-show="$auth.error" x-text="$auth.error"></p>
:::

</div>

`$auth.sendEmailOTP()` finds the email input the same way `sendMagicLink()` does (nearest input, form, or first on the page), or accepts a selector like `$auth.sendEmailOTP('#email-input')`.

After a code is sent, `$auth.otpSent` becomes `true`; `$auth.submitOTP()` reads the code input (any `input[name="otp"]`, `autocomplete="one-time-code"`, or numeric input) and completes sign-in. Pass `{ phrase: true }` to `sendEmailOTP` to enable Appwrite's anti-phishing security phrase, then display `$auth.otpPhrase` alongside the code field.

Email content and code length can be customized in Appwrite under <b>Auth</b> > <b>Templates</b> > <b>OTP</b>.

::: brand icon="lucide:info"
Unlike OAuth and magic links, email OTP cannot convert a guest's account in place. This is an Appwrite limitation, so an OTP sign-in always creates a fresh account. You can still carry a guest's teams over to that new account with [Guest Team Carryover](#guest-team-carryover-otp).
:::

---

### Guest Sessions

Guest sessions allow visitors to browse your app without creating an account, with each session registered in the Appwrite userbase (including repeat visits from the same user). With Manifest, guest sessions can begin automatically or by a user action.

By default, when a guest signs in, a fresh account is created and the guest session is discarded. To instead **preserve** the guest's account and data when they sign in, enable [Guest Upgrade](#guest-upgrade).

<br>

#### Auto Guest Sessions

When `guest-auto` is enabled in your manifest, all visitors automatically enter a guest session on page load.

```json "manifest.json"
{
    "appwrite": {
        ...
        "auth": {
            "methods": ["guest-auto"]
        }
    }
}
```

<br>

#### Manual Guest Sessions

When `guest-manual` is enabled, visitors must explicitly choose to continue as a guest.

<div x-code-group>

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            "methods": ["guest-manual"]
        }
    }
}
```

```html "HTML" numbers copy
<button @click="$auth.requestGuest()" :disabled="$auth.isAuthenticated || $auth.inProgress">Continue as Guest</button>
<button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress">Logout</button>

<!-- Status -->
<p x-show="$auth.isAnonymous">You're a guest</p>
<p x-show="!$auth.isAnonymous && $auth.isAuthenticated">You're signed in - logout to test guest mode</p>
<p x-show="!$auth.isAuthenticated">You're not signed in</p>
```

::: frame col text-base
<div class="row-wrap gap-2">
    <button @click="$auth.requestGuest()" :disabled="$auth.isAuthenticated || $auth.inProgress">Continue as Guest</button>
    <button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress" class="!w-fit">Logout</button>
</div>
<p x-show="$auth.isAnonymous">You're a guest</p>
<p x-show="!$auth.isAnonymous && $auth.isAuthenticated">You're already signed in</p>
<p x-show="!$auth.isAuthenticated">You're not signed in</p>
:::

</div>

<br>

#### Guest Upgrade

By default a guest who signs in gets a brand-new account, and anything tied to the guest session (such as guest-created [teams](/docs/appwrite-plugins/teams)) is left behind. Set `guestUpgrade` to `true` to instead convert the guest's existing account in place, preserving its data and team memberships.

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            "methods": ["guest-manual", "magic", "oauth"],
            "guestUpgrade": true
        }
    }
}
```

No markup changes are needed — `$auth.sendMagicLink()` and `$auth.loginOAuth()` handle the upgrade automatically when a guest signs in. `guestUpgrade` defaults to the value of `teams.guests`, so enabling guest teams turns it on for you.

::: brand icon="lucide:info"
Guest upgrade only works with OAuth and magic links, while email OTP sign-in always creates a fresh account.
:::

<br>

#### Guest Team Carryover (OTP)

Because email OTP can't convert a guest in place, `guestUpgrade` can't preserve a guest's teams for OTP sign-ins. `guestMigration` covers this case: it carries the guest's teams over to the new account by reassigning team membership. It's the OTP-friendly counterpart to `guestUpgrade`.

Reassigning team ownership between accounts is privileged — it needs a server API key, so it has to run on a server, not in the browser. To make that turnkey, Manifest provides a ready-to-deploy <a href="https://github.com/Manifest-X/Manifest/tree/master/templates/guest-migration-function" target="_blank" rel="noopener">guest-migration function template</a>. Deploy it to your Appwrite project and point the plugin at it:

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            "methods": ["guest-manual", "otp"],
            "teams": { "permanent": ["Workspace"], "guests": true },
            "guestMigration": { "functionId": "<your function id>" }
        }
    }
}
```

No markup changes — after a guest verifies an OTP code, the plugin transparently moves their teams to the new account. The same function also garbage-collects abandoned guests and their orphaned teams on a schedule.

The template is one ready-made implementation; the plugin just calls a function that speaks a small `prepare`/`commit` contract, so you can swap the function's internals for your own backend logic if you ever need to. Its <a href="https://github.com/Manifest-X/Manifest/tree/master/templates/guest-migration-function#readme" target="_blank" rel="noopener">README</a> walks through deploying it.

---

## Combined Methods

Sign-in methods can be stacked to provide optionality to users.

<div x-code-group>

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            "methods":  ["guest-manual", "magic", "oauth"]
        }
    }
}
```

```html "HTML" numbers copy
<!-- OAuth Buttons -->
<button @click="$auth.loginOAuth('google')" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress"><i x-icon="simple-icons:google"></i> <span>Sign in with Google</span></button>
<button @click="$auth.loginOAuth('github')" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress"><i x-icon="simple-icons:github"></i> <span>Sign in with GitHub</span></button>

<div class="divider my-8">OR</div>

<!-- Magic URL Form -->
<input class="peer" type="email" pattern=".*@.*\..*" required autocomplete="on" placeholder="Input email" aria-label="Email" @keyup.enter="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress" />
<button class="peer-invalid:disabled" @click="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress">Send Magic URL</button>

<div class="divider my-8">OR</div>

<!-- Guest Button -->
<button @click="$auth.requestGuest()" :disabled="$auth.isAuthenticated || $auth.inProgress">Continue as Guest</button>

<!-- Status -->
<div class="my-8">
<p x-show="$auth.inProgress">Authorizing...</p>
<p x-show="$auth.magicLinkSent">Magic URL sent. Check your inbox or spam to sign-in.</p>
<p x-show="$auth.magicLinkExpired">Magic URL expired. Please try again.</p>
<p x-show="$auth.isAuthenticated">You're signed-in using <b x-text="$auth.method || 'guest'"></b><span x-show="$auth.provider"> via <b x-text="$auth.provider"></b></span> as <b x-text="$auth.user?.email || 'a guest'"></b></p>
<p x-show="!$auth.isAuthenticated">You're not signed-in.</p>
<p x-show="$auth.error" x-text="$auth.error"></p>
</div>

<!-- Logout -->
<button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress">Logout</button>
```

::: frame text-base
<div class="col center gap-2 w-sm max-w-100% mx-auto py-10 text-center [&_button]:w-full">
    <!-- OAuth Buttons -->
    <button  @click="$auth.loginOAuth('google')" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress"><i x-icon="simple-icons:google"></i> <span>Sign in with Google</span></button>
    <button @click="$auth.loginOAuth('github')" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress"><i x-icon="simple-icons:github"></i> <span>Sign in with GitHub</span></button>
    <div class="divider my-8">OR</div>
    <!-- Magic URL Form -->
    <input type="email" pattern=".*@.*\..*" required autocomplete="on" placeholder="Input email" aria-label="Email" class="peer" @keyup.enter="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress"/>
        <button class="peer-invalid:disabled" @click="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress">Send Magic URL</button>
    <div class="divider my-8">OR</div>
    <!-- Guest Button -->
    <button @click="$auth.requestGuest()" :disabled="$auth.isAuthenticated || $auth.inProgress">Continue as Guest</button>
    <!-- Status -->
    <div class="my-8">
        <p x-show="$auth.inProgress">Authorizing...</p>
        <p x-show="$auth.magicLinkSent">Magic URL sent. Check your inbox or spam to sign-in.</p>
        <p x-show="$auth.magicLinkExpired">Magic URL expired. Please try again.</p>
        <p x-show="$auth.isAuthenticated">You're signed-in using <b x-text="$auth.method || 'guest'"></b><span x-show="$auth.provider"> via <b x-text="$auth.provider"></b></span> as <b x-text="$auth.user?.email || 'a guest'"></b></p>
        <p x-show="!$auth.isAuthenticated">You're not signed-in.</p>
        <p x-show="$auth.error" x-text="$auth.error"></p>
    </div>
    <button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress" class="!w-fit">Logout</button>
</div>
:::

</div>

---

## Properties

The auth plugin provides an `$auth` magic property that exposes authentication state and methods.

### Authentication State

#### User Profile ($auth.user)

Current user profile (null if not authenticated). The user object comes directly from Appwrite's `account.get()`.

| Property | Type | Description |
|----------|------|-------------|
| `$auth.user?.$id`{copy} | string | User's unique ID |
| `$auth.user?.email`{copy} | string | User's email address |
| `$auth.user?.name`{copy} | string | User's display name |
| `$auth.user?.$createdAt`{copy} | string | Account creation timestamp |
| `$auth.user?.$updatedAt`{copy} | string | Last update timestamp |
| `$auth.user?.prefs`{copy} | object | User preferences object |
| Other properties | - | All other Appwrite User object properties are available |

#### Session Information ($auth.session)

Current session details (null if not authenticated). The session object comes directly from Appwrite's session data.

| Property | Type | Description |
|----------|------|-------------|
| `$auth.session?.$id`{copy} | string | Session ID |
| `$auth.session?.userId`{copy} | string | User ID associated with session |
| `$auth.session?.expire`{copy} | string | Session expiration timestamp |
| `$auth.session?.provider`{copy} | string | Authentication provider used (`'anonymous'`, `'magic-url'`, or OAuth provider name) |
| `$auth.session?.ip`{copy} | string | IP address of session |
| `$auth.session?.osCode`{copy} | string | Operating system code |
| `$auth.session?.osName`{copy} | string | Operating system name |
| `$auth.session?.osVersion`{copy} | string | Operating system version |
| `$auth.session?.deviceName`{copy} | string | Device name |
| `$auth.session?.deviceBrand`{copy} | string | Device brand |
| `$auth.session?.deviceModel`{copy} | string | Device model |
| Other properties | - | All other Appwrite Session object properties are available |

#### Status Flags

| Property | Type | Description |
|----------|------|-------------|
| `$auth.isAuthenticated`{copy} | boolean | Indicates if user is authenticated |
| `$auth.isAnonymous`{copy} | boolean | Indicates if user is a guest |
| `$auth.inProgress`{copy} | boolean | Indicates if an auth operation is in progress |
| `$auth.error`{copy} | string \| null | Error message string (null if no error) |
| `$auth.magicLinkSent`{copy} | boolean | Indicates if magic link was sent |
| `$auth.magicLinkExpired`{copy} | boolean | Indicates if magic link expired |
| `$auth.guestManualEnabled`{copy} | boolean | Indicates if manual guest creation is enabled |

---

### Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `$auth.method`{copy} | string \| null | Authentication method: `'oauth'`, `'magic'`, `'anonymous'`, or `null` |
| `$auth.provider`{copy} | string \| null | OAuth provider name (e.g., `'google'`, `'github'`) or `null` for non-OAuth methods |

---

### Available Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.loginOAuth(...)`{copy} | `provider` (string), `successUrl` (optional), `failureUrl` (optional) | Sign in with OAuth provider. Redirects to provider. |
| `$auth.sendMagicLink(...)`{copy} | `emailInputOrRef` (element ID or element, optional), `redirectUrl` (optional) | Send magic link to email. |
| `$auth.requestGuest()`{copy} | None | Create a manual guest session. |
| `$auth.logout()`{copy} | None | Delete current session and sign out. If automatic guest sessions are enabled, a new guest session will begin after logout. |
| `$auth.refresh()`{copy} | None | Refresh user data from Appwrite. |
| `$auth.canAuthenticate()`{copy} | None | Check if user can authenticate (not already signed in or in progress). |

---

## Next Steps

See [teams](/docs/appwrite-plugins/teams) to enable shared workspaces between users, including roles and permissions.