# Users & Teams

Implement a complete authentication solution for your app with a connected <x-appwrite></x-appwrite> project.

---

## Setup

### Appwrite

Establish a project in <a href="https://appwrite.io/" target="_blank" rel="noopener">Appwrite</a>, which provides 75K monthly active users in its Free plan.

The project's Auth dashboard provides various options to customize the user experience. Go to <b>Auth</b> > <b>Settings</b> to enable your preferred sign-in methods. This Indux plugin currently supports:
- OAuth2 Providers (Google, Apple, GitHub, Discord, and dozens more)
- Anonymous (guest sessions)
- Magic URL

See Appwrite's <a href="https://appwrite.io/docs/products/auth" target="_blank" rel="noopener">Auth docs</a> for all configuration details.

---

### Indux

Authentication for users (and optionally teams) is supported by a standalone Indux plugin for Alpine JS. It works in conjunction with the Appwrite SDK script.

<x-code-group copy>

```html "Alpine"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Appwrite SDK -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>

<!-- Indux Appwrite Auth plugin -->
<script src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.appwrite.auth.min.js"></script>
```

```html "Quickstart"
<!-- Indux JS, Alpine, and Tailwind combined -->
<script src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.quickstart.min.js"></script>

<!-- Appwrite SDK -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>

<!-- Indux Appwrite Auth plugin -->
<script src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.appwrite.auth.min.js"></script>
```

</x-code-group>


Configure your Appwrite project in `manifest.json` under an `appwrite` property.

```json "manifest.json" copy
{
    "appwrite": {
        "projectId": "your-project-id",
        "endpoint": "your-API-endpoint",
        "devKey": "your-dev-key"
    }
}
```

Get the <b>Project ID</b> and <b>API Endpoint</b> from your Appwrite project's general <b>Settings</b>, under API credentials. These are public credentials and safe to expose client-side.

The <b>Dev Key</b> object is optional and used during development to eliminate Appwrite rate limits. It should not be included in production. Get one from <b>Overview</b> > <b>Dev keys</b>.

---

## Users

With Indux and Appwrite, a frontend user registration flow is not required. Unecognized users will have a new account automatically generated, while known users will login to their existing account.

::: brand icon="lucide:info"
Interactive examples on this page demonstrate real authentication with you as the user. Each example reflects the most recent auth state you've set (e.g. signed-in or out). Example styles and layouts may differ from code snippets.
:::


### Sign-in Methods

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
| `guest-auto` | Automatically creates anonymous guest sessions for all visitors |
| `guest-manual` | Allows users to manually create guest sessions via `$auth.createGuest()` |
| `magic` | Enables passwordless login via magic URLs sent to email |
| `oauth` | Enables OAuth sign-in with providers like Google, GitHub, etc. |

---

#### OAuth

OAuth enables sign-in with third-party providers like Google, GitHub, and 35+ other services supported by and configured in Appwrite's <b>Auth</b> > <b>Settings</b> page.

::: frame col
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

<x-code-group>

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

</x-code-group>

The `$auth.loginOAuth('...')` method accepts provider names like `google`, `github`, and `discord`. When applicable, the user is redirected to the provider's sign-in page and gets returned when authenticated.

---

#### Magic URLs

Magic URLs provide passwordless authentication via email. Users enter their email address and get emailed a sign-in link that's valid for one hour, which can be used once.

::: frame col
<!-- Form -->
<div class="row-wrap gap-2">
    <input class="flex-1 max-w-full" type="email" pattern=".*@.*\..*" required autocomplete="on" placeholder="Input email" class="peer" @keyup.enter="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress" />
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

<x-code-group>

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
<input type="email" pattern=".*@.*\..*" required autocomplete="on" placeholder="Input email" class="peer" @keyup.enter="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress" />
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

</x-code-group>

The button's `$auth.sendMagicLink()` method automatically finds the email input in the same parent element, form element, or otherwise finds the first email input on the page. To target a specific input, add its element ID like `$auth.sendMagicLink(#email-input)`. When activated, a magic URL is sent and the email input field is cleared.

When users click the magic URL in their email, they're redirected back to your app. The plugin automatically handles the callback and creates the session.

Email content can be customized in Appwrite under <b>Auth</b> > <b>Templates</b> > <b>Magic URL</b>.

---

#### Guest Sessions

Guest sessions allow visitors to browse your app without creating an account, with each session registered in the Appwrite userbase (including from a common user). With Indux, guest sessions can begin automatically or by a user action. If a guest subsequently signs in using OAuth or a Magic URL, Appwrite converts the guest session into a real profile and preserves any user data.

<br>

##### Auto Guest Sessions

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

##### Manual Guest Sessions

When `guest-manual` is enabled, users must explicitly choose to continue as a guest.

::: frame col
<div class="row-wrap gap-2">
    <button @click="$auth.requestGuest()" :disabled="$auth.isAuthenticated || $auth.inProgress">Continue as Guest</button>
    <button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress" class="!w-fit">Logout</button>
</div>
<p x-show="$auth.isAnonymous">You're a guest</p>
<p x-show="!$auth.isAnonymous && $auth.isAuthenticated">You're already signed in</p>
<p x-show="!$auth.isAuthenticated">You're not signed in</p>
:::

<x-code-group>

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
<button @click="$auth.logout()" :disabled="!$auth.isAuthenticated || $auth.inProgress" class="!w-fit">Logout</button>

<!-- Status -->
<p x-show="$auth.isAnonymous">You're a guest</p>
<p x-show="!$auth.isAnonymous && $auth.isAuthenticated">You're signed in - logout to test guest mode</p>
<p x-show="!$auth.isAuthenticated">You're not signed in</p>
```

</x-code-group>

---

### Combined Methods

Sign-in methods can be stacked to provide optionality to users.

::: frame
<div class="col center gap-2 w-sm max-w-100% mx-auto py-10 text-center [&_button]:w-full">
    <!-- OAuth Buttons -->
    <button  @click="$auth.loginOAuth('google')" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress"><i x-icon="simple-icons:google"></i> <span>Sign in with Google</span></button>
    <button @click="$auth.loginOAuth('github')" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress"><i x-icon="simple-icons:github"></i> <span>Sign in with GitHub</span></button>
    <div class="divider my-8">OR</div>
    <!-- Magic URL Form -->
    <input type="email" pattern=".*@.*\..*" required autocomplete="on" placeholder="Input email" class="peer" @keyup.enter="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress"/>
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

<x-code-group>

```json "manifest.json" copy
{
    "appwrite": {
        "projectId": "68cfcc610014415b6f9a",
        "endpoint": "https://fra.cloud.appwrite.io/v1",
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
<input class="peer" type="email" pattern=".*@.*\..*" required autocomplete="on" placeholder="Input email" @keyup.enter="$auth.sendMagicLink()" :disabled="($auth.isAuthenticated && !$auth.isAnonymous) || $auth.inProgress" />
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

</x-code-group>

---

### User Properties

The authentication plugin provides an `$auth` magic property that exposes authentication state and methods.

Authentication State:
- `$auth.user`: Current user object (null if not authenticated). Standard properties:
  - `$auth.user?.$id`: User's unique ID
  - `$auth.user?.email`: User's email address
  - `$auth.user?.name`: User's display name
  - `$auth.user?.$createdAt`: Account creation timestamp
  - `$auth.user?.$updatedAt`: Last update timestamp
  - `$auth.user?.prefs`: User preferences object
  - All other Appwrite User object properties are available (the user object comes directly from Appwrite's `account.get()`)
- `$auth.session`: Current session object (null if not authenticated). Standard properties:
  - `$auth.session?.$id`: Session ID
  - `$auth.session?.userId`: User ID associated with session
  - `$auth.session?.expire`: Session expiration timestamp
  - `$auth.session?.provider`: Authentication provider used (`'anonymous'`, `'magic-url'`, or OAuth provider name)
  - `$auth.session?.ip`: IP address of session
  - `$auth.session?.osCode`: Operating system code
  - `$auth.session?.osName`: Operating system name
  - `$auth.session?.osVersion`: Operating system version
  - `$auth.session?.deviceName`: Device name
  - `$auth.session?.deviceBrand`: Device brand
  - `$auth.session?.deviceModel`: Device model
  - All other Appwrite Session object properties are available (the session object comes directly from Appwrite's session data)
- `$auth.isAuthenticated`: Boolean indicating if user is authenticated
- `$auth.isAnonymous`: Boolean indicating if user is a guest
- `$auth.inProgress`: Boolean indicating if an auth operation is in progress
- `$auth.error`: Error message string (null if no error)
- `$auth.magicLinkSent`: Boolean indicating if magic link was sent
- `$auth.magicLinkExpired`: Boolean indicating if magic link expired
- `$auth.guestManualEnabled`: Boolean indicating if manual guest creation is enabled

Computed Properties:
- `$auth.method`: Authentication method: `'oauth'`, `'magic'`, `'anonymous'`, or `null`
- `$auth.provider`: OAuth provider name (e.g., `'google'`, `'github'`) or `null` for non-OAuth methods

Authentication Methods:
- `$auth.loginOAuth(...)`: Sign in with OAuth provider. Parameters: `provider` (string), `successUrl` (optional), `failureUrl` (optional). Redirects to provider.
- `$auth.sendMagicLink(...)`: Send magic link to email. Parameters: `emailInputOrRef` (element ID or element, optional), `redirectUrl` (optional).
- `$auth.requestGuest()`: Create a manual guest session. No parameters.
- `$auth.logout()`: Delete current session and sign out. No parameters. If automatic guest sessions are enabled, a new guest session will begin after logout.
- `$auth.refresh()`: Refresh user data from Appwrite. No parameters.
- `$auth.canAuthenticate()`: Check if user can authenticate (not already signed in or in progress). No parameters.

---

## Teams

Teams enable collaborative workspaces where members share roles and permissions. Teams are automatically loaded when a user authenticates, and changes sync in realtime across all active sessions.

::: brand icon="lucide:info"
Teams are optional. If your project only needs user authentication without collaborative workspaces, omit the `teams` configuration from `manifest.json`.
:::

### Team Management

Enable teams in `manifest.json` under the `auth` property:

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            ...
            "teams": {}
        }
    }
}
```

If your app requires default teams be created automatically for all users, configure them in `manifest.json`.

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            ...
            "teams": {
                "permanent": ["Permanent Workspace"],
                "template": ["Template Workspace", "Dream Team"]
            }
        }
    }
}
```

Default teams are defining by their name within array objects:
- `permanent`: Permanent teams cannot be deleted by the user, such as a default personal workspace.
- `template`: Template teams can be deleted and reapplied by the user, such as demo workspaces.

The user is the owner and only member of each default team. Depending on their role and permissions, the team can be modified and other members invited.

Every user can generate custom teams, view all teams, and manage them with the respective permissions.

::: frame col
<!-- Not signed in -->
<small x-show="!$auth.isAuthenticated">You're not signed-in. Use one of the interactive examples above to sign in.</small>

<!-- Create team -->
<div class="row-wrap gap-2">
    <input type="text" class="flex-1" placeholder="Team name" x-model="$auth.newTeamName" :disabled="$auth.inProgress" />
    <button @click="$auth.createTeamFromName()" :disabled="!$auth.newTeamName || $auth.inProgress">Create Team</button>
</div>

<!-- Add back deleted template teams -->
<template x-for="teamName in $auth.deletedTemplateTeams" :key="teamName">
    <button @click="$auth.reapplyTemplateTeam(teamName)" :disabled="$auth.inProgress" class="w-full">Add <b x-text="teamName"></b></button>
</template>

<hr>

<!-- No teams -->
<small x-show="!$auth.teams || $auth.teams.length === 0">No teams yet</small>

<!-- List teams -->
<template x-for="team in $auth.teams" :key="team.$id">
    <!-- Team accordion -->
    <details class="pb-4 border-b border-line" x-data="{ loaded: false, editingTeamName: team.name }" x-effect="editingTeamName = team.name" @toggle="if ($event.target.open && !loaded) { $auth.currentTeam = team; $auth.viewTeam(team); loaded = true; }">
        <!-- Team name input / expand button -->
        <summary>
            <input type="text" placeholder="Insert name" class="transparent hug w-fit rounded-none no-focus" onclick="this.select()" x-model="editingTeamName" :disabled="!$auth.isTeamRenamable(team) || $auth.inProgress" @blur="if (editingTeamName !== team.name && editingTeamName.trim()) { $auth.updateTeamName(team.$id, editingTeamName.trim()); }" @keydown.enter="$event.target.blur()" />
        </summary>
        <!-- Team content -->
        <div class="relative col gap-4">
            <!-- Static Info -->
            <div class="col gap-1">
                <small>ID: <b x-text="team.$id"></b></small>
                <small>Created: <b x-text="$auth.teamCreatedAt(team)"></b></small>
                <small>Modified: <b x-text="$auth.teamUpdatedAt(team)"></b></small>
            </div>
            <!-- Delete team -->
            <button class="sm" @click="$auth.deleteTeam(team.$id)" :disabled="$auth.isActionDisabled('deleteTeam') || !$auth.isTeamDeletable(team)" aria-label="Delete team">Delete</button>
    </details>
</template>
:::

<x-code-group numbers copy>

```html "Create Team"
<!-- Team name input -->
<input type="text" placeholder="Team name" x-model="$auth.newTeamName" :disabled="$auth.inProgress" />

<!-- Create button -->
<button @click="$auth.createTeamFromName()" :disabled="!$auth.newTeamName || $auth.inProgress">Create Team</button>

<!-- Add back deleted template teams -->
<template x-for="teamName in $auth.deletedTemplateTeams" :key="teamName">
    <button @click="$auth.reapplyTemplateTeam(teamName)" :disabled="$auth.inProgress">Create <b x-text="teamName"></b> Team</button>
</template>
```

```html "List & Manage Teams"
<!-- List teams -->
<template x-for="team in $auth.teams" :key="team.$id">
    <div>

        <!-- Team details -->
        <p x-text="$auth.team.name">Team name</p>
        <small>ID: <b x-text="team.$id"></b></small>
        <small>Created: <b x-text="$auth.teamCreatedAt(team)"></b></small>
        <small>Modified: <b x-text="$auth.teamUpdatedAt(team)"></b></small>

        <!-- Rename team -->
        <input type="text" placeholder="Insert name" class="transparent hug w-fit rounded-none no-focus" onclick="this.select()" x-model="editingTeamName" :disabled="!$auth.isTeamRenamable(team) || $auth.inProgress" @blur="if (editingTeamName !== team.name && editingTeamName.trim()) { $auth.updateTeamName(team.$id, editingTeamName.trim()); }" @keydown.enter="$event.target.blur()" />

        <!-- Delete team (enabled if user has the deleteTeam permission) -->
        <button class="sm" @click="$auth.deleteTeam(team.$id)" :disabled="$auth.isActionDisabled('deleteTeam') || !$auth.isTeamDeletable(team)" aria-label="Delete team">Delete</button>

    </div>
</template>
```

</x-code-group>

---

### Roles & Permissions

By default, Appwrite assigns all members of a team an "owner" role, with top-level permissions to manage the team and its members. To override this behaviour, define default roles and their permissions in `manifest.json`, which get applied to every team.

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            ...
            "roles": {
                "permanent": {
                    "Admin": ["inviteMembers", "updateMembers", "removeMembers", "manageRoles", "renameTeam", "deleteTeam"]
                },
                "template": {
                    "Editor": ["inviteMembers"],
                    "Viewer": []
                }
            },
            "creatorRole": "Admin"
        }
    }
}
```

Like default teams, default roles are established by their name in one of two objects:
- `permanent`: Permanent roles cannot be modified or deleted by anyone.
- `template`: Template roles can be modified and deleted by users with the `manageRoles` permission.

Each role has an array of permissions, which can include default options:
- `inviteMembers`: Invite new members to the team
- `updateMembers`: Edit other members' roles
- `removeMembers`: Remove members from the team
- `manageRoles`: Create, rename, set permissions, and delete custom roles
- `renameTeam`: Change the team name
- `deleteTeam`: Delete the team

Custom permissions can be added to the array with unique names, such as `manageBilling`. These can be used in your frontend Alpine directives like `x-show="$auth.hasTeamPermission('manageBilling')`. Users can also generate custom permissions if you expose the inputs to do so.

The `creatorRole` is the role assigned to the team creator. It must reference a role defined in the `permanent` or `template` roles. if the `creatorRole` property is absent or does not reference a defined role, the creator is assigned all default permissions.

::: frame col
<!-- Team list -->
<template x-for="team in $auth.teams" :key="team.$id">
    <!-- Team accordion-->
    <details class="pb-4 border-b border-line" x-data="{ loaded: false, editingTeamName: team.name }" x-effect="editingTeamName = team.name" @toggle="if ($event.target.open && !loaded) { $auth.currentTeam = team; $auth.viewTeam(team); loaded = true; }">
        <!-- Team name / expand button -->
        <summary x-text="team.name">Team name</summary>
        <!-- Roles & Permissions -->
        <div class="col gap-4">
            <!-- List -->
            <template x-for="(permissions, roleName) in $auth.allTeamRoles(team)" :key="roleName">
            <div class="relative row gap-2 items-center max-w-full" x-data="{ editingRoleName: roleName, customPermInput: '' }" x-effect="editingRoleName = roleName">
                <!-- Role name input -->
                <input type="text" class="transparent hug flex-1" x-model="editingRoleName" @blur="if (editingRoleName !== roleName && editingRoleName.trim()) { $auth.startEditingRole(team.$id, roleName); $auth.editingRole.newRoleName = editingRoleName.trim(); $auth.saveEditingRole(); }" @keydown.enter="$event.target.blur()" :disabled="$auth.isActionDisabled('manageRoles') || ($auth.isRolePermanentSync && $auth.isRolePermanentSync(team.$id, roleName))" />
                <!-- Permissions dropdown button -->
                <button class="sm flex-1" x-dropdown="`permissions-menu-${team.$id}-${roleName}`" :disabled="$auth.isActionDisabled('manageRoles') || ($auth.isRolePermanentSync && $auth.isRolePermanentSync(team.$id, roleName))" > <span x-text="(permissions && permissions.length > 0) ? permissions.join(', ') : 'No permissions'"></span> <i class="trailing" x-icon="lucide:chevron-down"></i> </button>
                <!-- Permissions dropdown -->
                <menu popover :id="`permissions-menu-${team.$id}-${roleName}`">
                    <template x-for="permission in $auth.allAvailablePermissions || []" :key="permission">
                    <label>
                        <input type="checkbox" :checked="permissions && permissions.includes(permission)" @change="const updated = permissions ? [...permissions] : []; if ($event.target.checked) { if (!updated.includes(permission)) updated.push(permission); } else { const idx = updated.indexOf(permission); if (idx > -1) updated.splice(idx, 1); } $auth.startEditingRole(team.$id, roleName); $auth.newRolePermissions = updated; $auth.saveEditingRole();" :disabled="!$auth.canManageRoles() || ($auth.isRolePermanentSync && $auth.isRolePermanentSync(team.$id, roleName))" />
                        <span x-text="permission"></span>
                    </label>
                    </template>
                    <input type="text" placeholder="Custom permission" aria-label="Custom permission" x-model="customPermInput" @keydown.enter.prevent="if (customPermInput.trim()) { const updated = permissions ? [...permissions] : []; if (!updated.includes(customPermInput.trim())) { updated.push(customPermInput.trim()); $auth.startEditingRole(team.$id, roleName); $auth.newRolePermissions = updated; $auth.saveEditingRole(); customPermInput = ''; } }" :disabled="$auth.isActionDisabled('manageRoles') || ($auth.isRolePermanentSync && $auth.isRolePermanentSync(team.$id, roleName))" />
                </menu>
                <!-- Delete button -->
                <button class="sm" @click="$auth.deleteUserRole(team.$id, roleName)" :disabled="$auth.isActionDisabled('manageRoles') || !$auth.isRoleDeletable(team.$id, roleName)" aria-label="Delete role" x-icon="lucide:trash" ></button>
            </div>
            </template>
            <!-- Create Role -->
            <div class="row-wrap gap-2 mb-2" x-data="{ customPermInput: '' }">
            <input type="text" placeholder="New role name" class="w-full" x-model="$auth.newRoleName" :disabled="$auth.isActionDisabled('manageRoles')" />
            <button class="flex-1" x-dropdown="`permissions-menu-${team.$id}`" :disabled="$auth.isActionDisabled('manageRoles')">
                <span x-text="($auth.newRolePermissions && $auth.newRolePermissions.length > 0) ? $auth.newRolePermissions.join(', ') : 'Permissions'"></span>
                <i class="trailing" x-icon="lucide:chevron-down"></i>
            </button>
            <!-- Permissions dropdown-->
            <menu popover :id="`permissions-menu-${team.$id}`">
                <template x-for="permission in $auth.allAvailablePermissions || []" :key="permission">
                <label>
                    <input type="checkbox" :checked="$auth.isPermissionSelected(permission)" @change="$auth.togglePermission(permission)" :disabled="!$auth.canManageRoles()" />
                    <span x-text="permission"></span>
                </label>
                </template>
                <input type="text" placeholder="Custom permission" aria-label="Custom permission" x-model="customPermInput" @keydown.enter.prevent="$auth.addCustomPermissions(customPermInput); customPermInput = ''" :disabled="$auth.isActionDisabled('manageRoles')" />
            </menu>
            <!-- Create button -->
            <button @click="$auth.createRoleFromInputs(team.$id)" :disabled="!$auth.newRoleName || $auth.isActionDisabled('manageRoles')" class="w-fit">Create</button>
            </div>
        </div>
    </details>
</template>
:::

<x-code-group numbers copy>

```html "Create Custom Role"
<!-- Role name input -->
<input type="text" placeholder="Role name" x-model="$auth.newRoleName" :disabled="!$auth.canManageRoles() || $auth.inProgress" />
<!-- Permissions dropdown button -->
<button x-dropdown="`permissions-menu-${$auth.currentTeam?.$id || 'default'}`" :disabled="!$auth.canManageRoles() || $auth.inProgress" x-text="($auth.newRolePermissions && $auth.newRolePermissions.length > 0) ? $auth.newRolePermissions.join(', ') : 'Permissions'"></button>
<!-- Permissions dropdown -->
<menu popover :id="`permissions-menu-${$auth.currentTeam?.$id || 'default'}`">
    <template x-for="permission in $auth.allAvailablePermissions || []" :key="permission">
        <label>
            <input type="checkbox" :checked="$auth.isPermissionSelected(permission)" @change="$auth.togglePermission(permission)" />
            <span x-text="permission"></span>
        </label>
    </template>
    <input type="text" placeholder="Custom permission" @keydown.enter.prevent="$auth.addCustomPermissions($event.target.value); $event.target.value = ''" />
</menu>
<!-- Create button -->
<button @click="$auth.createRoleFromInputs($auth.currentTeam?.$id)" :disabled="!$auth.newRoleName || !$auth.canManageRoles() || $auth.inProgress">Create</button>
```

```html "Manage Roles"
<!-- List roles -->
<template x-for="(permissions, roleName) in $auth.allTeamRoles(team)" :key="roleName">
    <!-- Wrapper enabling inputs -->
    <div x-data="{ editingRoleName: roleName, customPermInput: '' }" x-effect="editingRoleName = roleName">

        <!-- Role name & permissions -->
        <p x-text="roleName">Role name</p>
        <small x-text="(permissions && permissions.length > 0) ? permissions.join(', ') : 'No permissions'">Permissions</small>

        <!-- Role name input (enabled if user has canManageRoles permission) -->
        <input type="text" x-model="editingRoleName" @blur="if (editingRoleName !== roleName && editingRoleName.trim()) { $auth.startEditingRole(team.$id, roleName); $auth.editingRole.newRoleName = editingRoleName.trim(); $auth.saveEditingRole(); }" @keydown.enter="$event.target.blur()" :disabled="!$auth.canManageRoles() || $auth.isRolePermanentSync(team.$id, roleName) || $auth.inProgress" />

        <!-- Permissions dropdown (enabled if user has canManageRoles permission) -->
        <button x-dropdown="`permissions-menu-${team.$id}-${roleName}`" :disabled="!$auth.canManageRoles() || $auth.isRolePermanentSync(team.$id, roleName) || $auth.inProgress" x-text="(permissions && permissions.length > 0) ? permissions.join(', ') : 'No permissions'"></button>
        <menu popover :id="`permissions-menu-${team.$id}-${roleName}`">
            <!-- List permissions as checkboxes -->
            <template x-for="permission in $auth.allAvailablePermissions || []" :key="permission">
                <label>
                    <input type="checkbox" :checked="permissions && permissions.includes(permission)" @change="const updated = permissions ? [...permissions] : []; if ($event.target.checked) { if (!updated.includes(permission)) updated.push(permission); } else { const idx = updated.indexOf(permission); if (idx > -1) updated.splice(idx, 1); } $auth.startEditingRole(team.$id, roleName); $auth.newRolePermissions = updated; $auth.saveEditingRole();" :disabled="!$auth.canManageRoles() || $auth.isRolePermanentSync(team.$id, roleName)" />
                    <span x-text="permission"></span>
                </label>
            </template>
            <!-- Custom permissions input -->
            <input type="text" placeholder="Custom permission" x-model="customPermInput" @keydown.enter.prevent="if (customPermInput.trim()) { const updated = permissions ? [...permissions] : []; if (!updated.includes(customPermInput.trim())) { updated.push(customPermInput.trim()); $auth.startEditingRole(team.$id, roleName); $auth.newRolePermissions = updated; $auth.saveEditingRole(); customPermInput = ''; } }" :disabled="!$auth.canManageRoles() || $auth.isRolePermanentSync(team.$id, roleName)" />
        </menu>

        <!-- Delete role button (enabled if user has canManageRoles permission) -->
        <button @click="$auth.deleteUserRole(team.$id, roleName)" :disabled="!$auth.isRoleDeletable(team.$id, roleName) || !$auth.canManageRoles() || $auth.inProgress">Delete</button>

    </div>
</template>
```

</x-code-group>

---

### Members

Team members can be invited, updated, and removed, subject to the respective user permissions.

In your Appwrite project under <b>Auth</b> > <b>Settings</b>, ensure <b>Team invites</b> is toggled on. Invitation emails can be customized under <b>Auth</b> > <b>Settings</b> > <b>Invite user</b>.

::: frame col
<!-- Team list -->
<template x-for="team in $auth.teams" :key="team.$id"> 
    <!-- Team accordion-->
    <details class="pb-4 border-b border-line" x-data="{ loaded: false }" @toggle="if ($event.target.open && !loaded) { $auth.currentTeam = team; $auth.viewTeam(team); loaded = true; }">
        <!-- Team name / expand button -->
        <summary x-text="team.name">Team Name</summary>
        <!-- Members-->
        <div class="col gap-4">
            <!-- List -->
            <template x-for="membership in $auth.currentTeamMemberships" :key="membership.$id">
                <div class="relative col" x-data="{ customRoleInput: '' }">
                    <!-- View Mode -->
                    <template x-if="!$auth.editingMember || $auth.editingMember.membershipId !== membership.$id">
                        <div class="row gap-3">
                            <div class="flex-1 col">
                                <small>
                                <b x-text="$auth.getMemberDisplayName(membership)"></b>
                                <span x-show="membership.userId === $auth.user?.$id"> (You)</span>
                                </small>
                                <small x-text="$auth.getMemberEmail(membership)"></small>
                                <small x-text="(membership.displayRoles && membership.displayRoles.length > 0) ? membership.displayRoles.join(', ') : 'No roles'"></small>
                            </div>
                            <!-- Other members' actions -->
                            <div class="row gap-1" x-show="membership.userId !== $auth.user?.$id && ($auth.canUpdateMembers() || $auth.canRemoveMembers())">
                                <button class="sm" @click="$auth.startEditingMember(team.$id, membership.$id, membership.displayRoles || [])" :disabled="$auth.isActionDisabled('updateMembers')" aria-label="Edit member" x-icon="lucide:pencil"></button>
                                <button class="sm" @click="$auth.deleteMember(team.$id, membership.$id)" :disabled="$auth.isActionDisabled('removeMembers')" aria-label="Remove member" x-icon="lucide:trash"></button>
                            </div>
                            <!-- Your own actions -->
                            <div class="row gap-1" x-show="membership.userId === $auth.user?.$id">
                                <button class="sm" @click="$auth.startEditingMember(team.$id, membership.$id, membership.displayRoles || [])" :disabled="$auth.inProgress" aria-label="Edit my role" x-icon="lucide:pencil"></button>
                                <button class="sm" @click="$auth.leaveTeam(team.$id, membership.$id)" :disabled="$auth.inProgress" aria-label="Leave team" x-icon="lucide:log-out"></button>
                            </div>
                        </div>
                    </template>
                    <!-- Edit Mode -->
                    <template x-if="$auth.editingMember && $auth.editingMember.membershipId === membership.$id">
                        <div class="col gap-2">
                            <!-- Member info (read-only) -->
                            <div class="col">
                                <small>
                                <b x-text="$auth.getMemberDisplayName(membership)"></b>
                                </small>
                                <small x-text="$auth.getMemberEmail(membership)"></small>
                            </div>
                            <!-- Roles button -->
                            <button class="w-full" x-dropdown="`edit-member-roles-menu-${team.$id}-${membership.$id}`" :disabled="$auth.inProgress">
                                <span x-text="($auth.inviteRoles && $auth.inviteRoles.length > 0) ? $auth.inviteRoles.join(', ') : 'Roles'"></span>
                                <i class="trailing" x-icon="lucide:chevron-down"></i>
                            </button>
                            <!-- Roles dropdown -->
                            <menu popover :id="`edit-member-roles-menu-${team.$id}-${membership.$id}`">
                                <template x-for="(permissions, roleName) in $auth.allTeamRoles(team)" :key="roleName">
                                <label> <input type="checkbox" :checked="$auth.isInviteRoleSelected(roleName)" @change="$auth.toggleInviteRole(roleName)" :disabled="$auth.inProgress" /> <span x-text="roleName"></span> </label>
                                </template>
                                <input type="text" placeholder="Custom role" aria-label="Custom role" x-model="customRoleInput" @keydown.enter.prevent="$auth.addCustomInviteRoles(customRoleInput); customRoleInput = ''" :disabled="$auth.inProgress" />
                            </menu>
                            <!-- Save & Cancel buttons -->
                            <div class="row gap-2">
                                <button @click="$auth.saveEditingMember()" :disabled="$auth.inProgress" class="flex-1">Save</button>
                                <button @click="$auth.cancelEditingMember()" :disabled="$auth.inProgress" class="flex-1">Cancel</button>
                            </div>
                        </div>
                    </template>
                </div>
            </template>
            <!-- Invite Member -->
            <div class="row-wrap gap-2 mb-2">
                <input type="email" placeholder="Email to invite" class="w-full" x-model="$auth.inviteEmail" :disabled="$auth.isActionDisabled('inviteMembers')" required />
                <button class="flex-1" x-dropdown="`invite-roles-menu-${team.$id}`" :disabled="$auth.isActionDisabled('inviteMembers')">
                    <span x-text="($auth.inviteRoles && $auth.inviteRoles.length > 0) ? $auth.inviteRoles.join(', ') : 'Roles'"></span>
                    <i class="trailing" x-icon="lucide:chevron-down"></i>
                </button>
                <!-- Roles dropdown-->
                <menu popover :id="`invite-roles-menu-${team.$id}`">
                    <template x-for="(permissions, roleName) in $auth.allTeamRoles(team)" :key="roleName">
                        <label>
                            <input type="checkbox" :checked="$auth.isInviteRoleSelected(roleName)" @change="$auth.toggleInviteRole(roleName)" :disabled="!$auth.canInviteMembers()" />
                            <span x-text="roleName"></span>
                        </label>
                    </template>
                </menu>    
                <button @click="$auth.inviteToCurrentTeam()" :disabled="!$auth.inviteEmail || $auth.isActionDisabled('inviteMembers') || !team" class="w-fit">Invite</button>
            </div>
        </div>
    </details>
</template>
:::

<x-code-group numbers copy>

```html "Invite Members"
<!-- Email input -->
<input type="email" placeholder="Email" x-model="$auth.inviteEmail" :disabled="$auth.isActionDisabled('inviteMembers')" required />

<!-- Assign role(s) dropdown -->
<button x-dropdown="`invite-role-menu-${team.$id}`" :disabled="$auth.isActionDisabled('inviteMembers')" x-text="($auth.inviteRoles && $auth.inviteRoles.length > 0) ? $auth.inviteRoles[0] : 'Select role'"></button>
<menu popover :id="`invite-role-menu-${team.$id}`">
    <!-- List roles -->
    <template x-for="(permissions, roleName) in $auth.allTeamRoles(team)" :key="roleName">
        <label>
            <input type="radio" :name="`invite-role-${team.$id}`" :value="roleName" :checked="($auth.inviteRoles && $auth.inviteRoles.length > 0 && $auth.inviteRoles[0] === roleName)" @change="$auth.inviteRoles = [roleName]" :disabled="!$auth.canInviteMembers()" />
            <span x-text="roleName">Role name</span>
        </label>
    </template>
</menu>

<!-- Send invite email button -->
<button @click="$auth.inviteToCurrentTeam()" :disabled="!$auth.inviteEmail || $auth.isActionDisabled('inviteMembers')">Invite</button>
```

```html "List & Manage Members"
<!-- List members -->
<template x-for="membership in $auth.currentTeamMemberships" :key="membership.$id">
    <div>

        <!-- Member name -->
        <p x-text="$auth.getMemberDisplayName(membership)">Name</p>

        <!-- Member email -->
        <p x-text="$auth.getMemberEmail(membership)">Email</p>

        <!-- Member role -->
        <p x-text="(membership.displayRoles && membership.displayRoles.length > 0) ? membership.displayRoles.join(', ') : 'No roles'">Role</p>
        
        <!-- Role dropdown (enabled for users with updateMembers permission) -->
        <button x-dropdown="`member-role-menu-${team.$id}-${membership.$id}`" :disabled="(membership.userId !== $auth.user?.$id && ($auth.isActionDisabled('updateMembers') || !$auth.canUpdateMembers())) || $auth.inProgress" x-show="membership.userId === $auth.user?.$id || $auth.canUpdateMembers()" x-text="(membership.displayRoles && membership.displayRoles.length > 0) ? membership.displayRoles[0] : 'No role'"</button>
        <menu popover :id="`member-role-menu-${team.$id}-${membership.$id}`">
            <!-- List roles -->
            <template x-for="(permissions, roleName) in $auth.allTeamRoles(team)" :key="roleName">
                <label>
                    <input type="radio" :name="`member-role-${team.$id}-${membership.$id}`" :value="roleName" :checked="(membership.displayRoles && membership.displayRoles.length > 0 && membership.displayRoles[0] === roleName)" @change="$auth.updateMembership(team.$id, membership.$id, [roleName])" :disabled="$auth.inProgress || (membership.userId !== $auth.user?.$id && $auth.isActionDisabled('updateMembers'))" />
                    <span x-text="roleName">Role name</span>
                </label>
            </template>
        </menu>
        
        <!-- Delete button (enabled for users with removeMembers permission) -->
        <button @click="$auth.deleteMember(team.$id, membership.$id)" :disabled="$auth.isActionDisabled('removeMembers') || $auth.inProgress" x-show="membership.userId !== $auth.user?.$id && $auth.canRemoveMembers()">Remove</button>
        
        <!-- Leave button (for current user) -->
        <button @click="$auth.leaveTeam(team.$id, membership.$id)" :disabled="$auth.inProgress" x-show="membership.userId === $auth.user?.$id">Leave</button>

    </div>
</template>
```

</x-code-group>

---

### Team Properties

Teams use the same `$auth` magic property as users to expose authentication state and methods.

Team State:
- `$auth.teams`: Array of all user's teams
- `$auth.currentTeam`: Currently selected team
- `$auth.currentTeamMemberships`: Members of the current team
- `$auth.deletedTemplateTeams`: Array of deleted template team names (can be reapplied)

Team Inputs:
- `$auth.newTeamName`: Input for creating teams
- `$auth.updateTeamNameInput`: Input for renaming teams

Member Inputs:
- `$auth.inviteEmail`: Input for member invitations
- `$auth.inviteRoles`: Array of selected roles for invitations

Role Inputs:
- `$auth.newRoleName`: Input for creating roles
- `$auth.newRolePermissions`: Array of selected permissions for roles
- `$auth.allAvailablePermissions`: Cached list of all available permissions
- `$auth.editingRole`: Current role being edited
- `$auth.editingMember`: Current member being edited

Team Methods:
- `$auth.createTeamFromName()`: Create a team using `newTeamName` property. No parameters.
- `$auth.viewTeam(...)`: Load team details and memberships. Parameter: `team` (object).
- `$auth.updateCurrentTeamName()`: Update current team name using `updateTeamNameInput` property. No parameters.
- `$auth.deleteTeam(...)`: Delete a team. Parameter: `teamId` (string).
- `$auth.reapplyTemplateTeam(...)`: Reapply a deleted template team. Parameter: `teamName` (string).
- `$auth.inviteToCurrentTeam()`: Invite member using `inviteEmail` and `inviteRoles` properties. No parameters.
- `$auth.createRoleFromInputs(...)`: Create a role using `newRoleName` and `newRolePermissions` properties. Parameter: `teamId` (string).
- `$auth.startEditingRole(...)`: Start editing a role. Parameters: `teamId` (string), `roleName` (string).
- `$auth.saveEditingRole()`: Save role edits. No parameters.
- `$auth.cancelEditingRole()`: Cancel role editing. No parameters.
- `$auth.deleteUserRole(...)`: Delete a role. Parameters: `teamId` (string), `roleName` (string).
- `$auth.startEditingMember(...)`: Start editing a member. Parameters: `teamId` (string), `membershipId` (string), `currentRoles` (array).
- `$auth.saveEditingMember()`: Save member edits. No parameters.
- `$auth.cancelEditingMember()`: Cancel member editing. No parameters.
- `$auth.deleteMember(...)`: Remove a member from team. Parameters: `teamId` (string), `membershipId` (string).
- `$auth.leaveTeam(...)`: Leave a team (user removes themselves). Parameters: `teamId` (string), `membershipId` (string).

Permission & Role Checks:
- `$auth.hasTeamPermission(...)`: Check if user has a team permission (async). Parameter: `permission` (string).
- `$auth.hasTeamPermissionSync(...)`: Check if user has a team permission (synchronous). Parameter: `permission` (string).
- `$auth.hasRole(...)`: Check if user has a specific role. Parameter: `roleName` (string).
- `$auth.getUserRole()`: Get user's primary role (async). No parameters.
- `$auth.getUserRoles()`: Get all user's roles (async). No parameters.
- `$auth.getCurrentTeamRoles()`: Get current user's roles in current team. No parameters.
- `$auth.isCurrentTeamOwner()`: Check if user is owner of current team. No parameters.
- `$auth.canManageRoles()`: Check if user can manage roles. No parameters.
- `$auth.canInviteMembers()`: Check if user can invite members. No parameters.
- `$auth.canUpdateMembers()`: Check if user can update members. No parameters.
- `$auth.canRemoveMembers()`: Check if user can remove members. No parameters.
- `$auth.isActionDisabled(...)`: Check if an action is disabled (combines `inProgress` and permission check). Parameter: `permission` (string).

Convenience Methods:
- `$auth.isTeamDeletable(...)`: Check if a team can be deleted. Parameter: `team` (object).
- `$auth.isTeamRenamable(...)`: Check if a team can be renamed. Parameter: `team` (object).
- `$auth.teamCreatedAt(...)`: Formatted creation date. Parameter: `team` (object).
- `$auth.teamUpdatedAt(...)`: Formatted update date. Parameter: `team` (object).
- `$auth.allTeamRoles(...)`: Get all roles for a team. Parameter: `team` (object, optional).
- `$auth.getMemberDisplayName(...)`: Get member display name. Parameter: `membership` (object).
- `$auth.getMemberEmail(...)`: Get member email. Parameter: `membership` (object).
- `$auth.isRoleBeingEdited(...)`: Check if a role is being edited. Parameters: `teamId` (string), `roleName` (string).
- `$auth.isRoleDeletable(...)`: Check if a role can be deleted. Parameters: `teamId` (string), `roleName` (string).
- `$auth.isRolePermanentSync(...)`: Check if a role is permanent (synchronous). Parameters: `teamId` (string), `roleName` (string).

Permission Management (for role creation/editing):
- `$auth.togglePermission(...)`: Toggle a permission in `newRolePermissions`. Parameter: `permission` (string).
- `$auth.isPermissionSelected(...)`: Check if a permission is selected. Parameter: `permission` (string).
- `$auth.addCustomPermissions(...)`: Add comma-separated custom permissions. Parameter: `inputValue` (string).
- `$auth.removePermission(...)`: Remove a permission from `newRolePermissions`. Parameter: `permission` (string).
- `$auth.clearPermissions()`: Clear all selected permissions. No parameters.

Role Selection (for invitations/member editing):
- `$auth.toggleInviteRole(...)`: Toggle a role in `inviteRoles`. Parameter: `roleName` (string).
- `$auth.isInviteRoleSelected(...)`: Check if a role is selected. Parameter: `roleName` (string).
- `$auth.addCustomInviteRoles(...)`: Add comma-separated custom roles. Parameter: `inputValue` (string).
- `$auth.clearInviteRoles()`: Clear all selected roles. No parameters.