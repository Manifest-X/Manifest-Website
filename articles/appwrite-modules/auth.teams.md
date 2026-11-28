# Teams

Allow users to work together within your application.

---

## Team Management

Teams are collaborative workspaces where members share roles and permissions. Teams are automatically loaded when a user authenticates, and changes sync in realtime across all active sessions.

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

Default teams are defined by their name within array objects:
- `permanent`: Permanent teams cannot be deleted by the user, such as a default personal workspace.
- `template`: Template teams can be deleted and reapplied by the user, such as demo workspaces.
- `guests`: Set to `true` to also seed these default teams for guest (anonymous) sessions. Off by default, so guests start with no teams.
- `authenticated`: Whether to seed these default teams for authenticated (signed-in) sessions. `true` by default. Set to `false` (with `"guests": true`) to make seeding **guest-only** — a per-guest sandbox that is never minted for a signed-in user who already belongs to their real workspace.

The user is the owner and only initial member of each default team. Depending on their role and permissions, the team can be modified and other members invited.

::: brand icon="lucide:info"
Guests are full Appwrite sessions, so they can own teams. When `"guests": true`, a guest's default teams are created the moment their session starts. Pair this with [`guestUpgrade`](/docs/framework/appwrite-modules/users#guest-upgrade) so those teams carry over when the guest later signs in (via magic link or OAuth) — otherwise they're left behind on the discarded guest account.

For a guest-only sandbox (a demo workspace for anonymous visitors that signed-in users should never receive), combine `"template"` with `"guests": true, "authenticated": false`.
:::

Every user can generate custom teams, view all teams, and manage them with the respective permissions. Existing teams can also be duplicated, optionally cloning their members and roles to spin up a new workspace from a known configuration.

<div x-code-group numbers copy collapse="10">

```html "Create Team"
<!-- Team name input -->
<input type="text" placeholder="Team name" aria-label="Team name" x-model="$auth.newTeamName" :disabled="$auth.isCreatingTeam()" />

<!-- Create button -->
<button @click="$auth.createTeamFromName()" :disabled="!$auth.newTeamName || $auth.isCreatingTeam()">Create Team</button>

<!-- Add back deleted template teams -->
<template x-for="teamName in $auth.deletedTemplateTeams" :key="teamName">
    <button @click="$auth.reapplyTemplateTeam(teamName)" :disabled="$auth.isCreatingTeam()">Create <b x-text="teamName"></b> Team</button>
</template>
```

```html "List & Manage Teams"
<!-- List teams -->
<template x-for="team in $auth.teams" :key="team.$id">
    <div x-data="{ editingTeamName: team.name }">

        <!-- Team details -->
        <p x-text="team.name">Team name</p>
        <small>ID: <b x-text="team.$id"></b></small>
        <small>Created: <b x-text="$auth.teamCreatedAt(team)"></b></small>
        <small>Modified: <b x-text="$auth.teamUpdatedAt(team)"></b></small>

        <!-- Rename team -->
        <input type="text" placeholder="Insert name" aria-label="Team name" class="transparent hug w-fit rounded-none no-focus" onclick="this.select()" x-model="editingTeamName" :disabled="!$auth.isTeamRenamable(team) || $auth.isUpdatingTeam(team.$id)" @blur="if (editingTeamName !== team.name && editingTeamName.trim()) { $auth.updateTeamName(team.$id, editingTeamName.trim()); }" @keydown.enter="$event.target.blur()" />

        <!-- Delete team (enabled if user has the deleteTeam permission) -->
        <button class="sm" @click="$auth.deleteTeam(team.$id)" :disabled="$auth.isActionDisabled('deleteTeam') || !$auth.isTeamDeletable(team) || $auth.isDeletingTeam(team.$id)" aria-label="Delete team">Delete</button>

        <!-- Duplicate team -->
        <button @click="$auth.duplicateTeam(team.$id, { newName: team.name + ' copy' })">Duplicate</button>
        
        <!-- Duplicate with members and roles -->
        <button @click="$auth.duplicateTeam(team.$id, { copyMembers: true, copyRoles: true })">Duplicate with Members</button>

    </div>
</template>
```

::: frame col gap-4 text-base
<!-- Not signed in -->
<small x-show="!$auth.isAuthenticated">You're not signed-in. Use one of the interactive examples above to sign in.</small>

<!-- Create team -->
<div class="row-wrap gap-2">
    <input type="text" class="flex-1" placeholder="Team name" aria-label="Team name" x-model="$auth.newTeamName" :disabled="$auth.isCreatingTeam()" />
    <button @click="$auth.createTeamFromName()" :disabled="!$auth.newTeamName || $auth.isCreatingTeam()">Create Team</button>
</div>

<!-- Add back deleted template teams -->
<template x-for="teamName in $auth.deletedTemplateTeams" :key="teamName">
    <button @click="$auth.reapplyTemplateTeam(teamName)" :disabled="$auth.isCreatingTeam()" class="w-full">Add <b x-text="teamName"></b></button>
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
            <input type="text" placeholder="Insert name" aria-label="Team name" class="ghost hug w-fit hover:px-2 hover:py-1" onclick="this.select()" x-model="editingTeamName" :disabled="!$auth.isTeamRenamable(team) || $auth.isUpdatingTeam(team.$id)" @blur="if (editingTeamName !== team.name && editingTeamName.trim()) { $auth.updateTeamName(team.$id, editingTeamName.trim()); }" @keydown.enter="$event.target.blur()" />
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
            <button class="sm" @click="$auth.deleteTeam(team.$id)" :disabled="$auth.isActionDisabled('deleteTeam') || !$auth.isTeamDeletable(team) || $auth.isDeletingTeam(team.$id)" aria-label="Delete team">Delete</button>
        </div>
    </details>
</template>
:::

</div>

#### Starting Team

When the teams load, the module makes one of them current: the first default team when default teams are configured, otherwise the first team. Set `remember` to start each signed-in user on the team they last had current on this device instead.

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            ...
            "teams": {
                "remember": true
            }
        }
    }
}
```

The team is saved in the browser's local storage per project and user, for the 10 most recent users. It is saved when the team changes through `viewTeam` or when the module picks a team itself, such as after the current team is deleted or left. Assigning `$auth.currentTeam` directly does not save it. Guests are not remembered. If the user no longer belongs to the saved team, the usual pick applies.

To choose the starting team yourself, set `$auth.startTeamId` to a team ID as the page starts. It takes precedence over a remembered team and applies only if the user belongs to that team. An `x-init` in the page's own markup runs early enough; one inside a component that loads later may not.

```html copy
<!-- Start on the team in ?team= -->
<div x-data x-init="$auth.startTeamId = new URLSearchParams(location.search).get('team')"></div>
```

The module picks a starting team only while no team is current, so setting `$auth.startTeamId` after the teams have loaded does not change the current team. Until a pick uses it, it is not tied to any user. Once used, it belongs to that user: it is cleared on sign-out and when a different user signs in.

With either set as the page starts, a returning visitor's starting team members and roles are requested together with the session check, rather than after the team list.

---

## Roles & Permissions

Without roles configured, every team member holds Appwrite's `owner` role, with full permission to manage the team and its members. To override this behaviour, define default roles and their permissions in `manifest.json`, which are made available to every new team.

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

| Role Type | Description |
|-----------|-------------|
| `permanent`{copy} | Permanent roles cannot be modified or deleted by anyone |
| `template`{copy} | Template roles can be modified and deleted by users with the `manageRoles`{copy} permission |

Each role can have permissions. Manifest provides these built-in permissions:

| Permission | Description |
|-----------|-------------|
| `inviteMembers`{copy} | Invite new members to the team |
| `updateMembers`{copy} | Edit other members' roles |
| `removeMembers`{copy} | Remove members from the team |
| `manageRoles`{copy} | Create, rename, set permissions, and delete custom roles |
| `renameTeam`{copy} | Change the team name |
| `deleteTeam`{copy} | Delete the team |

Custom permissions can be added to the array with unique names, such as `manageBilling`. Check them in Alpine directives such as `x-show` with `$auth.hasTeamPermissionSync('manageBilling')`. Users can also generate custom permissions if you expose the inputs to do so.

Role names can contain spaces or any characters, such as `Live Agent`.

The `creatorRole` is the role assigned to the team creator. It must reference a role defined in the `permanent` or `template` roles. If the `creatorRole` property is absent or does not reference a defined role, the creator is assigned the first defined role.

#### Owner-only creators

Use `creatorRoles` (plural) for finer control over what the creator receives, assigned atomically as the team is created:

| Value | Result |
|-------|--------|
| `[]`{copy} or `null`{copy} | **Owner-only** — the creator holds just Appwrite's intrinsic `owner` role, with no template role. Your `template`/`permanent` roles stay defined but unassigned, ready for invited members. |
| `"Admin"`{copy} | Assigns that single role. |
| `["Admin", "Editor"]`{copy} | Assigns multiple roles. |

```json "manifest.json" copy
{
    "appwrite": {
        "auth": {
            "roles": {
                "template": { "Admin": ["manageRoles", "inviteMembers"], "Editor": ["inviteMembers"] }
            },
            "creatorRoles": []
        }
    }
}
```

`creatorRoles` takes precedence over `creatorRole`. When neither is set, the creator is assigned the first defined role.

Owner-only is the safest choice for a creator who should have full, future-proof access: a member holding only Appwrite's `owner` role and no custom role resolves to **all** permissions (including any you add later), so they can never be locked out. A member with no roles at all gets none (see [how permissions resolve](#how-permissions-resolve)). By contrast, assigning the creator a custom role scopes them to exactly that role's permissions — if you later edit that role down, the creator loses access too. Prefer `creatorRoles: []` for owners; reserve named roles for invited members.

<div x-code-group numbers copy  collapse="10">

```html "Create Custom Role"
<!-- Role name input -->
<input type="text" placeholder="Role name" aria-label="Role name" x-model="$auth.newRoleName" :disabled="!$auth.canManageRoles() || $auth.isActionDisabled('manageRoles') || $auth.isCreatingRole()" />
<!-- Permissions dropdown button -->
<button x-dropdown="`permissions-menu-${$auth.currentTeam?.$id || 'default'}`" :disabled="!$auth.canManageRoles() || $auth.isActionDisabled('manageRoles') || $auth.isCreatingRole()" x-text="($auth.newRolePermissions && $auth.newRolePermissions.length > 0) ? $auth.newRolePermissions.join(', ') : 'Permissions'"></button>
<!-- Permissions dropdown -->
<menu popover :id="`permissions-menu-${$auth.currentTeam?.$id || 'default'}`">
    <template x-for="permission in $auth.allAvailablePermissions || []" :key="permission">
        <label>
            <input type="checkbox" :checked="$auth.isPermissionSelected(permission)" @change="$auth.togglePermission(permission)" :disabled="$auth.isCreatingRole()" />
            <span x-text="permission"></span>
        </label>
    </template>
    <input type="text" placeholder="Custom permission" aria-label="Custom permission" @keydown.enter.prevent="$auth.addCustomPermissions($event.target.value); $event.target.value = ''" :disabled="$auth.isCreatingRole()" />
</menu>
<!-- Create button -->
<button @click="$auth.createRoleFromInputs($auth.currentTeam?.$id)" :disabled="!$auth.newRoleName || !$auth.canManageRoles() || $auth.isActionDisabled('manageRoles') || $auth.isCreatingRole()">Create</button>
```

```html "Manage Roles"
<!-- Inside <template x-for="team in $auth.teams"> -->
<!-- List roles -->
<template x-for="(permissions, roleName) in $auth.allTeamRoles(team)" :key="roleName">
    <!-- Wrapper enabling inputs -->
    <div x-data="{ editingRoleName: roleName, customPermInput: '' }" x-effect="editingRoleName = roleName">

        <!-- Role name & permissions -->
        <p x-text="roleName">Role name</p>
        <small x-text="(permissions && permissions.length > 0) ? permissions.join(', ') : 'No permissions'">Permissions</small>

        <!-- Role name input (enabled if user has canManageRoles permission) -->
        <input type="text" aria-label="Role name" x-model="editingRoleName" @blur="if ($auth.isUpdatingRole(team.$id, roleName)) return; if (editingRoleName !== roleName && editingRoleName.trim()) { $auth.startEditingRole(team.$id, roleName); if ($auth.editingRole) { $auth.editingRole.newRoleName = editingRoleName.trim(); } $auth.saveEditingRole(); }" @keydown.enter="$event.target.blur()" :disabled="!$auth.canManageRoles() || $auth.isRolePermanentSync(team.$id, roleName) || $auth.isActionDisabled('manageRoles') || $auth.isUpdatingRole(team.$id, roleName)" />

        <!-- Permissions dropdown (enabled if user has canManageRoles permission) -->
        <button x-dropdown="`permissions-menu-${team.$id}-${roleName}`" :disabled="!$auth.canManageRoles() || $auth.isRolePermanentSync(team.$id, roleName) || $auth.isActionDisabled('manageRoles') || $auth.isUpdatingRole(team.$id, roleName)" x-text="(permissions && permissions.length > 0) ? permissions.join(', ') : 'No permissions'"></button>
        <menu popover :id="`permissions-menu-${team.$id}-${roleName}`">
            <!-- List permissions as checkboxes -->
            <template x-for="permission in $auth.allAvailablePermissions || []" :key="permission">
                <label>
                    <input type="checkbox" :checked="permissions && permissions.includes(permission)" @change="if ($auth.isUpdatingRole(team.$id, roleName)) return; const updated = permissions ? [...permissions] : []; if ($event.target.checked) { if (!updated.includes(permission)) updated.push(permission); } else { const idx = updated.indexOf(permission); if (idx > -1) updated.splice(idx, 1); } $auth.updateRolePermissions(team.$id, roleName, updated);" :disabled="!$auth.canManageRoles() || $auth.isRolePermanentSync(team.$id, roleName) || $auth.isUpdatingRole(team.$id, roleName)" />
                    <span x-text="permission"></span>
                </label>
            </template>
            <!-- Custom permissions input -->
            <input type="text" placeholder="Custom permission" aria-label="Custom permission" x-model="customPermInput" @keydown.enter.prevent="if ($auth.isUpdatingRole(team.$id, roleName)) return; if (customPermInput.trim()) { const updated = permissions ? [...permissions] : []; if (!updated.includes(customPermInput.trim())) { updated.push(customPermInput.trim()); $auth.updateRolePermissions(team.$id, roleName, updated); customPermInput = ''; } }" :disabled="!$auth.canManageRoles() || $auth.isRolePermanentSync(team.$id, roleName) || $auth.isUpdatingRole(team.$id, roleName)" />
        </menu>

        <!-- Delete role button (enabled if user has canManageRoles permission) -->
        <button @click="$auth.deleteUserRole(team.$id, roleName)" :disabled="!$auth.isRoleDeletable(team.$id, roleName) || !$auth.canManageRoles() || $auth.isActionDisabled('manageRoles') || $auth.isDeletingRole(team.$id, roleName)">Delete</button>

    </div>
</template>
```

::: frame col gap-4 text-base
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
                <input type="text" class="transparent hug flex-1" aria-label="Role name" x-model="editingRoleName" @blur="if ($auth.isUpdatingRole(team.$id, roleName)) return; if (editingRoleName !== roleName && editingRoleName.trim()) { $auth.startEditingRole(team.$id, roleName); if ($auth.editingRole) { $auth.editingRole.newRoleName = editingRoleName.trim(); } $auth.saveEditingRole(); }" @keydown.enter="$event.target.blur()" :disabled="$auth.isActionDisabled('manageRoles') || ($auth.isRolePermanentSync && $auth.isRolePermanentSync(team.$id, roleName)) || $auth.isUpdatingRole(team.$id, roleName)" />
                <!-- Permissions dropdown button -->
                <button class="sm flex-1" x-dropdown="`permissions-menu-${team.$id}-${roleName}`" :disabled="$auth.isActionDisabled('manageRoles') || ($auth.isRolePermanentSync && $auth.isRolePermanentSync(team.$id, roleName)) || $auth.isUpdatingRole(team.$id, roleName)" > <span x-text="(permissions && permissions.length > 0) ? permissions.join(', ') : 'No permissions'"></span> <i class="trailing" x-icon="lucide:chevron-down"></i> </button>
                <!-- Permissions dropdown -->
                <menu popover :id="`permissions-menu-${team.$id}-${roleName}`">
                    <template x-for="permission in $auth.allAvailablePermissions || []" :key="permission">
                    <label>
                        <input type="checkbox" :checked="permissions && permissions.includes(permission)" @change="if ($auth.isUpdatingRole(team.$id, roleName)) return; const updated = permissions ? [...permissions] : []; if ($event.target.checked) { if (!updated.includes(permission)) updated.push(permission); } else { const idx = updated.indexOf(permission); if (idx > -1) updated.splice(idx, 1); } $auth.updateRolePermissions(team.$id, roleName, updated);" :disabled="!$auth.canManageRoles() || ($auth.isRolePermanentSync && $auth.isRolePermanentSync(team.$id, roleName)) || $auth.isUpdatingRole(team.$id, roleName)" />
                        <span x-text="permission"></span>
                    </label>
                    </template>
                    <input type="text" placeholder="Custom permission" aria-label="Custom permission" x-model="customPermInput" @keydown.enter.prevent="if ($auth.isUpdatingRole(team.$id, roleName)) return; if (customPermInput.trim()) { const updated = permissions ? [...permissions] : []; if (!updated.includes(customPermInput.trim())) { updated.push(customPermInput.trim()); $auth.updateRolePermissions(team.$id, roleName, updated); customPermInput = ''; } }" :disabled="$auth.isActionDisabled('manageRoles') || ($auth.isRolePermanentSync && $auth.isRolePermanentSync(team.$id, roleName)) || $auth.isUpdatingRole(team.$id, roleName)" />
                </menu>
                <!-- Delete button -->
                <button class="sm" @click="$auth.deleteUserRole(team.$id, roleName)" :disabled="$auth.isActionDisabled('manageRoles') || !$auth.isRoleDeletable(team.$id, roleName) || $auth.isDeletingRole(team.$id, roleName)" aria-label="Delete role" x-icon="lucide:trash" ></button>
            </div>
            </template>
            <!-- Create Role -->
            <div class="row-wrap gap-2 mb-2" x-data="{ customPermInput: '' }">
            <input type="text" placeholder="New role name" aria-label="Role name" class="w-full" x-model="$auth.newRoleName" :disabled="$auth.isActionDisabled('manageRoles') || $auth.isCreatingRole()" />
            <button class="flex-1" x-dropdown="`permissions-menu-${team.$id}`" :disabled="$auth.isActionDisabled('manageRoles') || $auth.isCreatingRole()">
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
                <input type="text" placeholder="Custom permission" aria-label="Custom permission" x-model="customPermInput" @keydown.enter.prevent="$auth.addCustomPermissions(customPermInput); customPermInput = ''" :disabled="$auth.isActionDisabled('manageRoles') || $auth.isCreatingRole()" />
            </menu>
            <!-- Create button -->
            <button @click="$auth.createRoleFromInputs(team.$id)" :disabled="!$auth.newRoleName || $auth.isActionDisabled('manageRoles') || $auth.isCreatingRole()" class="w-fit">Create</button>
            </div>
        </div>
    </details>
</template>
:::

</div>

::: brand icon="lucide:info"
**Editing role permissions from JavaScript?** Use `await $auth.updateRolePermissions(teamId, roleName, ['manageBilling', ...])` — it persists straight to team prefs with a plain array and refreshes `$auth.allTeamRoles()`. Don't assign to `$auth.editingRole.permissions` programmatically: that object is reactive and is meant for `x-model`-bound inputs (as above). For a mid-edit flow, call `$auth.setEditingPermissions([...])` then `$auth.saveEditingRole()`.
:::

Custom roles and changes to their permissions are stored in the team's preferences, which the module reads at most once every 15 seconds per team. Changes made through `$auth` methods show straight away, as do realtime team updates and signing in or out. Roles written another way, such as directly through the Appwrite SDK or from a server function, can take up to 15 seconds to show unless a realtime update arrives first.

#### How Permissions Resolve

Permission checks such as `hasTeamPermissionSync` read the signed-in user's own membership in the current team:

| Membership | Permissions |
|------------|-------------|
| None found in the current team | None |
| Only Appwrite's `owner` role | All |
| One or more custom roles | Those roles' permissions |
| No roles at all | None |

Since 0.5.340, a user missing from the listed members or holding no roles gets no permissions. Earlier versions granted all permissions in both cases.

`$auth.currentTeamMembership` holds that membership, including its `roles` and `displayRoles`. It is read-only, and `null` until the membership is known, when the user has none in the current team, and when signed out.

Appwrite lists 25 members of a team at a time unless told otherwise. When a listing of the current team doesn't include the user and the team has more members, or the listing used its own queries or a search, the module fetches the user's own membership in a separate request. Until it answers, permission checks return `false`, unless the membership is already known from an earlier listing. If the request fails or takes longer than about 3 seconds, checks are denied, even for a membership known before, and a late answer still applies when it arrives. When the request fails, including after those 3 seconds, the module tries again 5, 15 and 45 seconds later. After that, or if the request never answers, it tries again only at the next member listing. A newer member listing, a team switch or sign-out cancels pending retries. When the user is among the listed members, no extra request is made.

`$auth.currentTeamMembershipStatus` says where that lookup stands, so the interface can tell "still checking" apart from "no access":

| Value | Meaning |
|-------|---------|
| `'loading'`{copy} | The membership is not known yet: the first member listing or the separate request is still running |
| `'ready'`{copy} | The membership is known, including while it is fetched again |
| `'none'`{copy} | The user has no membership in the current team |
| `'error'`{copy} | The last request failed or took longer than about 3 seconds, so no membership is known, even one known before. A retry may be pending |
| `null`{copy} | No current team, or signed out |

```html copy
<!-- Access state -->
<p x-show="$auth.currentTeamMembershipStatus === 'loading'">Checking your access</p>
<p x-show="$auth.currentTeamMembershipStatus === 'error'">Couldn't check your access.</p>
<p x-show="$auth.currentTeamMembershipStatus === 'none'">You're not a member of this team.</p>

<!-- Gated action -->
<button x-show="$auth.currentTeamMembershipStatus === 'ready'" :disabled="!$auth.hasTeamPermissionSync('manageBilling')">Billing</button>
```

Permissions are worked out in the browser from the team's roles. They decide what your interface shows and offers, and do not stop requests sent to Appwrite another way. Enforce anything that matters on the server, for example with Appwrite row and file permissions or in a function.

---

## Members

Team members can be invited, updated, and removed, subject to the respective user permissions.

When your app or the team defines roles, an invite needs at least one. An invite with no role is refused with a message in `$auth.error`, and nothing is sent. With no roles defined anywhere, every member is an owner, and so is an invitee.

An invite link is accepted only for the account it was sent to. If it is opened while signed in to a different account, it is refused with "This invite is for a different account."

In your Appwrite project under <b>Auth</b> > <b>Settings</b>, ensure <b>Team invites</b> is toggled on. Invitation emails can be customized under <b>Auth</b> > <b>Settings</b> > <b>Invite user</b>.

<div x-code-group numbers copy  collapse="10">

```html "Invite Members"
<!-- Inside the team <details> from "List & Manage Members" -->
<!-- Email input -->
<input type="email" placeholder="Email" aria-label="Email to invite" x-model="$auth.inviteEmail" :disabled="$auth.isActionDisabled('inviteMembers')" required />

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

<!-- Shows why an invite was refused, e.g. no role chosen -->
<p x-show="$auth.error" x-text="$auth.error"></p>
```

```html "List & Manage Members"
<template x-for="team in $auth.teams" :key="team.$id">
    <!-- Load members when a team opens -->
    <details @toggle="if ($event.target.open) $auth.viewTeam(team)">
        <summary x-text="team.name"></summary>
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
                <button x-dropdown="`member-role-menu-${team.$id}-${membership.$id}`" :disabled="(membership.userId !== $auth.user?.$id && ($auth.isActionDisabled('updateMembers') || !$auth.canUpdateMembers())) || $auth.isUpdatingMember(membership.$id)" x-show="membership.userId === $auth.user?.$id || $auth.canUpdateMembers()" x-text="(membership.displayRoles && membership.displayRoles.length > 0) ? membership.displayRoles[0] : 'No role'"></button>
                <menu popover :id="`member-role-menu-${team.$id}-${membership.$id}`">
                    <!-- List roles -->
                    <template x-for="(permissions, roleName) in $auth.allTeamRoles(team)" :key="roleName">
                        <label>
                            <input type="radio" :name="`member-role-${team.$id}-${membership.$id}`" :value="roleName" :checked="(membership.displayRoles && membership.displayRoles.length > 0 && membership.displayRoles[0] === roleName)" @change="$auth.updateMembership(team.$id, membership.$id, [roleName])" :disabled="$auth.isUpdatingMember(membership.$id) || $auth.isActionDisabled('updateMembers')" />
                            <span x-text="roleName">Role name</span>
                        </label>
                    </template>
                </menu>
        
                <!-- Delete button (enabled for users with removeMembers permission) -->
                <button @click="$auth.deleteMember(team.$id, membership.$id)" :disabled="$auth.isActionDisabled('removeMembers') || $auth.isDeletingMember(membership.$id)" x-show="membership.userId !== $auth.user?.$id && $auth.canRemoveMembers()">Remove</button>
        
                <!-- Leave button (for current user) -->
                <button @click="$auth.leaveTeam(team.$id, membership.$id)" :disabled="$auth.isDeletingMember(membership.$id)" x-show="membership.userId === $auth.user?.$id">Leave</button>

            </div>
        </template>
    </details>
</template>
```

::: frame col gap-4 text-base
<!-- Team list -->
<template x-for="team in $auth.teams" :key="team.$id"> 
    <!-- Team accordion-->
    <details class="pb-4 border-b border-line" @toggle="if ($event.target.open) $auth.viewTeam(team)">
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
                                <button class="sm" @click="$auth.startEditingMember(team.$id, membership.$id, membership.displayRoles || [])" :disabled="$auth.isActionDisabled('updateMembers')" aria-label="Edit member" x-icon="lucide:pencil" x-tooltip="Edit role"></button>
                                <button class="sm" @click="$auth.deleteMember(team.$id, membership.$id)" :disabled="$auth.isActionDisabled('removeMembers')" aria-label="Remove member" x-icon="lucide:trash" x-tooltip="Remove member"></button>
                            </div>
                            <!-- Your own actions -->
                            <div class="row gap-1" x-show="membership.userId === $auth.user?.$id">
                                <button class="sm" @click="$auth.startEditingMember(team.$id, membership.$id, membership.displayRoles || [])" :disabled="$auth.isActionDisabled('updateMembers')" aria-label="Edit my role" x-icon="lucide:pencil" x-tooltip="Edit role"></button>
                                <button class="sm" @click="$auth.leaveTeam(team.$id, membership.$id)" :disabled="$auth.isActionDisabled('removeMembers')" aria-label="Leave team" x-icon="lucide:log-out" x-tooltip="Leave team"></button>
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
                            <button class="w-full" x-dropdown="`edit-member-roles-menu-${team.$id}-${membership.$id}`" :disabled="$auth.isActionDisabled('updateMembers')">
                                <span x-text="($auth.inviteRoles && $auth.inviteRoles.length > 0) ? $auth.inviteRoles.join(', ') : 'Roles'"></span>
                                <i class="trailing" x-icon="lucide:chevron-down"></i>
                            </button>
                            <!-- Roles dropdown -->
                            <menu popover :id="`edit-member-roles-menu-${team.$id}-${membership.$id}`">
                                <template x-for="(permissions, roleName) in $auth.allTeamRoles(team)" :key="roleName">
                                <label> <input type="checkbox" :checked="$auth.isInviteRoleSelected(roleName)" @change="$auth.toggleInviteRole(roleName)" :disabled="$auth.isActionDisabled('updateMembers')" /> <span x-text="roleName"></span> </label>
                                </template>
                                <input type="text" placeholder="Custom role" aria-label="Custom role" x-model="customRoleInput" @keydown.enter.prevent="$auth.addCustomInviteRoles(customRoleInput); customRoleInput = ''" :disabled="$auth.isActionDisabled('updateMembers')" />
                            </menu>
                            <!-- Save & Cancel buttons -->
                            <div class="row gap-2">
                                <button @click="$auth.saveEditingMember()" :disabled="$auth.isActionDisabled('updateMembers')" class="flex-1">Save</button>
                                <button @click="$auth.cancelEditingMember()" :disabled="$auth.isActionDisabled('updateMembers')" class="flex-1">Cancel</button>
                            </div>
                        </div>
                    </template>
                </div>
            </template>
            <!-- Invite Member -->
            <div class="row-wrap gap-2 mb-2">
                <input type="email" placeholder="Email to invite" aria-label="Email to invite" class="w-full" x-model="$auth.inviteEmail" :disabled="$auth.isActionDisabled('inviteMembers') || $auth.isInvitingMember()" required />
                <button class="flex-1" x-dropdown="`invite-roles-menu-${team.$id}`" :disabled="$auth.isActionDisabled('inviteMembers') || $auth.isInvitingMember()">
                    <span x-text="($auth.inviteRoles && $auth.inviteRoles.length > 0) ? $auth.inviteRoles.join(', ') : 'Roles'"></span>
                    <i class="trailing" x-icon="lucide:chevron-down"></i>
                </button>
                <!-- Roles dropdown-->
                <menu popover :id="`invite-roles-menu-${team.$id}`">
                    <template x-for="(permissions, roleName) in $auth.allTeamRoles(team)" :key="roleName">
                        <label>
                            <input type="checkbox" :checked="$auth.isInviteRoleSelected(roleName)" @change="$auth.toggleInviteRole(roleName)" :disabled="!$auth.canInviteMembers() || $auth.isInvitingMember()" />
                            <span x-text="roleName"></span>
                        </label>
                    </template>
                </menu>    
                <button @click="$auth.inviteToCurrentTeam()" :disabled="!$auth.inviteEmail || $auth.isActionDisabled('inviteMembers') || !team || $auth.isInvitingMember()" class="w-fit">Invite</button>
            </div>
        </div>
    </details>
</template>
:::

</div>

#### Large Teams

By default, `$auth.currentTeamMemberships` holds the first 25 members, Appwrite's default page size. Set `memberLimit` to a whole number from 1 to 100 to change it. A numeric string such as `"50"` also works, for example from an environment variable. Any other value is ignored with a console warning.

```json "manifest.json" copy
{
    "appwrite": {
        ...
        "auth": {
            ...
            "teams": {
                "memberLimit": 100
            }
        }
    }
}
```

`memberLimit` applies to the member listings the module makes itself, such as on sign-in, in `viewTeam` and after realtime member updates. `$auth.currentTeamMembershipsTotal` is the team's member count from the last listing, and `$auth.currentTeamMembershipsCursor` is the ID of the last listed member while the list holds fewer members than that total (otherwise `null`). The cursor compares only the listed page with the total, so it stays set on every page after the first, including the last.

To show the next page, pass the cursor to `$auth.listMemberships()` with Appwrite's `Query.cursorAfter`. The page replaces `$auth.currentTeamMemberships`. Any listing the module makes itself lists the first page again, such as `viewTeam`, a realtime member update, or updating or removing a member.

This example uses Appwrite's default page of 25, with `memberLimit` unset. A page shorter than that is the last one. When the member count is a multiple of 25, Next on the last full page shows an empty page.

```html copy
<div x-data>
    <!-- Members -->
    <template x-for="membership in $auth.currentTeamMemberships" :key="membership.$id">
        <p x-text="$auth.getMemberDisplayName(membership)"></p>
    </template>

    <!-- Count -->
    <small x-text="`${$auth.currentTeamMemberships.length} shown of ${$auth.currentTeamMembershipsTotal}`"></small>

    <!-- Next page -->
    <button x-show="$auth.currentTeamMembershipsCursor && $auth.currentTeamMemberships.length === 25" @click="$auth.listMemberships($auth.currentTeam.$id, [Appwrite.Query.limit(25), Appwrite.Query.cursorAfter($auth.currentTeamMembershipsCursor)])">Next</button>

    <!-- First page -->
    <button x-show="$auth.currentTeamMemberships.length < $auth.currentTeamMembershipsTotal" @click="$auth.viewTeam($auth.currentTeam)">First</button>
</div>
```

When a page doesn't include the signed-in user, the module looks up their membership separately, so permissions keep following it. The new page shows once that lookup answers, or after about 3 seconds. See [how permissions resolve](#how-permissions-resolve).

---

## Properties

Teams use the same `$auth` magic property as users to expose authentication state and methods.

### Team State

| Property | Type | Description |
|----------|------|-------------|
| `$auth.teams`{copy} | array | Array of all user's teams |
| `$auth.currentTeam`{copy} | object \| null | Currently selected team |
| `$auth.currentTeamMemberships`{copy} | array | Members of the current team |
| `$auth.currentTeamMembership`{copy} | object \| null | The signed-in user's own membership in the current team (read-only). See [how permissions resolve](#how-permissions-resolve) |
| `$auth.currentTeamMembershipStatus`{copy} | string \| null | `'loading'`, `'ready'`, `'none'` or `'error'` for the user's own membership; `null` with no current team or signed out (read-only) |
| `$auth.currentTeamMembershipsTotal`{copy} | number | Member count of the current team from its last listing |
| `$auth.currentTeamMembershipsCursor`{copy} | string \| null | ID of the last listed member while the list holds fewer than the total, for `Query.cursorAfter`. See [large teams](#large-teams) |
| `$auth.startTeamId`{copy} | string \| null | Team to start on when the teams load, if the user belongs to it. See [starting team](#starting-team) |
| `$auth.deletedTemplateTeams`{copy} | array | Array of deleted template team names (can be reapplied) |

---

### Input Properties

#### Team Inputs

| Property | Type | Description |
|----------|------|-------------|
| `$auth.newTeamName`{copy} | string | Input for creating teams |
| `$auth.updateTeamNameInput`{copy} | string | Input for renaming teams |

#### Member Inputs

| Property | Type | Description |
|----------|------|-------------|
| `$auth.inviteEmail`{copy} | string | Input for member invitations |
| `$auth.inviteRoles`{copy} | array | Array of selected roles for invitations |

#### Role Inputs

| Property | Type | Description |
|----------|------|-------------|
| `$auth.newRoleName`{copy} | string | Input for creating roles |
| `$auth.newRolePermissions`{copy} | array | Array of selected permissions for roles |
| `$auth.allAvailablePermissions`{copy} | array | Cached list of all available permissions |
| `$auth.editingRole`{copy} | object \| null | Current role being edited |
| `$auth.editingMember`{copy} | object \| null | Current member being edited |

---

### Team Management Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.createTeamFromName()`{copy} | None | Create a team using `newTeamName` property |
| `$auth.viewTeam(...)`{copy} | `team` (object) | Load team details and memberships. When switching teams quickly, or viewing a team while the teams are still loading, the members and permissions shown always belong to the current team |
| `$auth.updateCurrentTeamName()`{copy} | None | Update current team name using `updateTeamNameInput` property |
| `$auth.updateTeamName(...)`{copy} | `teamId` (string), `name` (string) | Rename a team |
| `$auth.deleteTeam(...)`{copy} | `teamId` (string) | Delete a team |
| `$auth.duplicateTeam(...)`{copy} | `teamId` (string), `options` (object, optional) | Duplicate a team. Options: `newName`, `copyMembers`, `copyRoles`. Returns `{ success: boolean, team?: object, error?: string }`. Defaults: `copyMembers: false`, `copyRoles: false`, `newName: '{originalName} copy'` |
| `$auth.reapplyTemplateTeam(...)`{copy} | `teamName` (string) | Reapply a deleted template team |

---

### Member Management Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.inviteToCurrentTeam()`{copy} | None | Invite member using `inviteEmail` and `inviteRoles` properties |
| `$auth.inviteMember(...)`{copy} | `teamId` (string), `roles` (array), `email` (string) | Invite a member by email. Returns `{ success, membership, normalized }`; `normalized` is `true` when the stored roles differ from those requested (for example, a role with owner-level permissions also gets Appwrite's `owner` role) |
| `$auth.listMemberships(...)`{copy} | `teamId` (string), `queries` (array, optional), `search` (string, optional) | List a team's members. Returns `{ success, memberships, total }`. For the current team, the result replaces `currentTeamMemberships`. Without queries, uses `memberLimit` when set |
| `$auth.updateMembership(...)`{copy} | `teamId` (string), `membershipId` (string), `roles` (array) | Set a member's roles. Returns the same `normalized` flag as `inviteMember`. Members without `updateMembers` can only remove roles from their own membership, never add one, and Appwrite accepts the change only if they hold an owner-level permission |
| `$auth.startEditingMember(...)`{copy} | `teamId` (string), `membershipId` (string), `currentRoles` (array) | Start editing a member |
| `$auth.saveEditingMember()`{copy} | None | Save member edits |
| `$auth.cancelEditingMember()`{copy} | None | Cancel member editing |
| `$auth.deleteMember(...)`{copy} | `teamId` (string), `membershipId` (string) | Remove a member from team |
| `$auth.leaveTeam(...)`{copy} | `teamId` (string), `membershipId` (string) | Leave a team (user removes themselves) |

---

### Role Management Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.createRoleFromInputs(...)`{copy} | `teamId` (string) | Create a role using `newRoleName` and `newRolePermissions` properties |
| `$auth.updateRolePermissions(...)`{copy} | `teamId` (string), `roleName` (string), `permissions` (array) | **Set a role's permissions directly** (reactive-safe). Persists to team prefs and refreshes `allTeamRoles()`. Preferred for programmatic edits. |
| `$auth.startEditingRole(...)`{copy} | `teamId` (string), `roleName` (string) | Start editing a role (for `x-model`-bound UI) |
| `$auth.setEditingPermissions(...)`{copy} | `permissions` (array) | Set the in-progress edit's permissions safely (use with `saveEditingRole()`) |
| `$auth.saveEditingRole()`{copy} | None | Save role edits |
| `$auth.cancelEditingRole()`{copy} | None | Cancel role editing |
| `$auth.deleteUserRole(...)`{copy} | `teamId` (string), `roleName` (string) | Delete a role |

---

### Permission & Role Checks

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.hasTeamPermission(...)`{copy} | `permission` (string) | Check if user has a team permission (async, for JavaScript; use `hasTeamPermissionSync` in bindings) |
| `$auth.hasTeamPermissionSync(...)`{copy} | `permission` (string) | Check if user has a team permission (synchronous) |
| `$auth.hasRole(...)`{copy} | `roleName` (string) | Check if user has a specific role |
| `$auth.getUserRole()`{copy} | None | Get user's primary role (async) |
| `$auth.getUserRoles()`{copy} | None | Get all user's roles (async) |
| `$auth.getCurrentTeamRoles()`{copy} | None | Get current user's roles in current team |
| `$auth.isCurrentTeamOwner()`{copy} | None | Check if user is owner of current team |
| `$auth.canManageRoles()`{copy} | None | Check if user can manage roles |
| `$auth.canInviteMembers()`{copy} | None | Check if user can invite members |
| `$auth.canUpdateMembers()`{copy} | None | Check if user can update members |
| `$auth.canRemoveMembers()`{copy} | None | Check if user can remove members |
| `$auth.isActionDisabled(...)`{copy} | `permission` (string) | Check if an action is disabled (combines `inProgress` and permission check) |

---

### Convenience Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.isTeamDeletable(...)`{copy} | `team` (object) | Check if a team can be deleted |
| `$auth.isTeamRenamable(...)`{copy} | `team` (object) | Check if a team can be renamed |
| `$auth.isTeamImmutable(...)`{copy} | `teamId` (string), async | Resolves `true` if the team is configured as `permanent` (cannot be deleted or renamed) |
| `$auth.teamCreatedAt(...)`{copy} | `team` (object) | Formatted creation date |
| `$auth.teamUpdatedAt(...)`{copy} | `team` (object) | Formatted update date |
| `$auth.allTeamRoles(...)`{copy} | `team` (object, optional) | Get all roles for a team |
| `$auth.getMemberDisplayName(...)`{copy} | `membership` (object) | Get member display name |
| `$auth.getMemberEmail(...)`{copy} | `membership` (object) | Get member email |
| `$auth.isRoleBeingEdited(...)`{copy} | `teamId` (string), `roleName` (string) | Check if a role is being edited |
| `$auth.isRoleDeletable(...)`{copy} | `teamId` (string), `roleName` (string) | Check if a role can be deleted |
| `$auth.isRolePermanentSync(...)`{copy} | `teamId` (string), `roleName` (string) | Check if a role is permanent (synchronous). Returns `false` until the team's roles have loaded, such as after `viewTeam` |

---

### Loading States

#### Team Operations

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.isUpdatingTeam(...)`{copy} | `teamId` (string) | Check if a specific team is being updated. Returns `true` only for the team being updated, allowing other teams to remain interactive |
| `$auth.isDeletingTeam(...)`{copy} | `teamId` (string) | Check if a specific team is being deleted. Returns `true` only for the team being deleted |
| `$auth.isCreatingTeam()`{copy} | None | Check if a team is being created. Returns `true` when creating a new team |
| `$auth.isAnyTeamOperationInProgress()`{copy} | None | Check if any team operation is in progress. Useful for disabling general UI elements during any team operation |

#### Member Operations

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.isUpdatingMember(...)`{copy} | `membershipId` (string) | Check if a specific member is being updated. Returns `true` only for the member being updated |
| `$auth.isDeletingMember(...)`{copy} | `membershipId` (string) | Check if a specific member is being deleted. Returns `true` only for the member being deleted |
| `$auth.isInvitingMember()`{copy} | None | Check if a member invitation is in progress. Returns `true` when inviting a member |
| `$auth.isAnyMemberOperationInProgress()`{copy} | None | Check if any member operation is in progress |

#### Role Operations

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.isUpdatingRole(...)`{copy} | `teamId` (string), `roleName` (string) | Check if a specific role is being updated. Returns `true` only for the role being updated |
| `$auth.isDeletingRole(...)`{copy} | `teamId` (string), `roleName` (string) | Check if a specific role is being deleted. Returns `true` only for the role being deleted |
| `$auth.isCreatingRole()`{copy} | None | Check if a role is being created. Returns `true` when creating a new role |
| `$auth.isAnyRoleOperationInProgress()`{copy} | None | Check if any role operation is in progress |

---

### Permission Management

For role creation/editing.

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.togglePermission(...)` | `permission` (string) | Toggle a permission in `newRolePermissions` |
| `$auth.isPermissionSelected(...)` | `permission` (string) | Check if a permission is selected |
| `$auth.addCustomPermissions(...)` | `inputValue` (string) | Add comma-separated custom permissions |
| `$auth.removePermission(...)` | `permission` (string) | Remove a permission from `newRolePermissions` |
| `$auth.clearPermissions()` | None | Clear all selected permissions |

---

### Role Selection

For invitations/member editing.

| Method | Parameters | Description |
|--------|------------|-------------|
| `$auth.toggleInviteRole(...)` | `roleName` (string) | Toggle a role in `inviteRoles` |
| `$auth.isInviteRoleSelected(...)` | `roleName` (string) | Check if a role is selected |
| `$auth.addCustomInviteRoles(...)` | `inputValue` (string) | Add comma-separated custom roles |
| `$auth.clearInviteRoles()` | None | Clear all selected roles |

---

## Next Steps

See [cloud data](/docs/framework/appwrite-modules/cloud-data) for giving users access to databases and stored files.