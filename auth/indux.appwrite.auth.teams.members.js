/* Auth teams - Membership operations */

// Add membership methods to auth store
function initializeTeamsMembers() {
    if (typeof Alpine === 'undefined') {
        console.error('[Indux Appwrite Auth] Alpine is not available');
        return;
    }

    const config = window.InduxAppwriteAuthConfig;
    if (!config) {
        console.error('[Indux Appwrite Auth] Config not available');
        return;
    }

    // Wait for store to be initialized
    const waitForStore = () => {
        const store = Alpine.store('auth');
        if (store && !store.inviteMember) {
            // Invite member to team
            store.inviteMember = async function(teamId, roles, email = null, userId = null, phone = null, url = null, name = null) {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to invite members' };
                }

                if (!email && !userId && !phone) {
                    return { success: false, error: 'You must provide email, userId, or phone' };
                }

                // Use current URL as default redirect if not provided
                if (!url) {
                    const currentUrl = new URL(window.location.href);
                    url = `${currentUrl.origin}${currentUrl.pathname}`;
                }

                this.inProgress = true;
                this.error = null;

                try {
                    // Ensure roles is an array
                    let rolesArray = Array.isArray(roles) ? roles : (roles ? [roles] : []);
                    
                    // Normalize roles for Appwrite (add "owner" if custom roles require it)
                    let normalizedRoles = rolesArray;
                    if (this.normalizeRolesForAppwrite && rolesArray.length > 0) {
                        normalizedRoles = await this.normalizeRolesForAppwrite(rolesArray, teamId);
                    }
                    
                    // If no roles provided, use default "owner" role (Appwrite requires at least one role)
                    if (!normalizedRoles || normalizedRoles.length === 0) {
                        normalizedRoles = ['owner'];
                    }

                    // Build the membership creation params (only include defined values)
                    const membershipParams = {
                        teamId: teamId,
                        roles: normalizedRoles
                    };
                    
                    // Only include email, userId, or phone if provided (not empty strings)
                    if (email && email.trim()) {
                        membershipParams.email = email.trim();
                    } else if (userId && userId.trim()) {
                        membershipParams.userId = userId.trim();
                    } else if (phone && phone.trim()) {
                        membershipParams.phone = phone.trim();
                    }
                    
                    // Include optional parameters if provided
                    if (url && url.trim()) {
                        membershipParams.url = url.trim();
                    }
                    if (name && name.trim()) {
                        membershipParams.name = name.trim();
                    }

                    const result = await this._appwrite.teams.createMembership(membershipParams);

                    return { success: true, membership: result };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to invite member:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                } finally {
                    this.inProgress = false;
                }
            };

            // List team memberships
            store.listMemberships = async function(teamId, queries = [], search = '') {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to list memberships' };
                }

                try {
                    const params = {
                        teamId: teamId,
                        queries: queries
                    };
                    if (search && search.trim().length > 0) {
                        params.search = search;
                    }
                    const result = await this._appwrite.teams.listMemberships(params);
                    let memberships = result.memberships || [];
                    
                    // Enhance memberships with user email if missing
                    // Appwrite membership objects have 'email' for pending invites, confirmed members need user lookup
                    for (const membership of memberships) {
                        // Log all membership properties to debug
                        const allProps = Object.keys(membership);
                        const allPropValues = {};
                        allProps.forEach(prop => {
                            const value = membership[prop];
                            // Only log string/number values, skip objects/arrays
                            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                                allPropValues[prop] = value;
                            } else if (value && typeof value === 'object') {
                                allPropValues[prop] = Array.isArray(value) ? `[Array(${value.length})]` : '[Object]';
                            }
                        });
                        console.log('[Indux Appwrite Auth] Processing membership:', {
                            membershipId: membership.$id,
                            userId: membership.userId,
                            email: membership.email,
                            userEmail: membership.userEmail,
                            confirm: membership.confirm,
                            userName: membership.userName,
                            allPropertyValues: allPropValues,
                            // Check for email in common properties
                            hasEmailProp: !!membership.email,
                            hasUserEmailProp: !!membership.userEmail,
                            hasUserNameProp: !!membership.userName,
                            // Check if userName contains email (sometimes Appwrite stores email as userName)
                            userNameIsEmail: membership.userName && membership.userName.includes('@')
                        });
                        
                        // For pending invites, email should already be in membership.email
                        // For confirmed members, we need to look it up
                        if (!membership.email && !membership.userEmail) {
                            console.log('[Indux Appwrite Auth] Membership missing email, attempting lookup');
                            try {
                                // For the current user, use the auth store's user object
                                if (this.user && this.user.$id === membership.userId && this.user.email) {
                                    console.log('[Indux Appwrite Auth] Using current user email:', this.user.email);
                                    membership.email = this.user.email;
                                    membership.userEmail = this.user.email;
                                } else if (membership.userId && membership.confirm === true) {
                                    // For confirmed members, try to fetch user details
                                    // Note: This requires 'users.read' permission
                                    console.log('[Indux Appwrite Auth] Fetching user details for userId:', membership.userId);
                                    try {
                                        // Check if users service is available
                                        if (!this._appwrite || !this._appwrite.users || typeof this._appwrite.users.get !== 'function') {
                                            console.warn('[Indux Appwrite Auth] Users service not available on Appwrite client');
                                        } else {
                                            const user = await this._appwrite.users.get({ userId: membership.userId });
                                            console.log('[Indux Appwrite Auth] User fetched:', { userId: user?.$id, email: user?.email });
                                            if (user && user.email) {
                                                membership.email = user.email;
                                                membership.userEmail = user.email;
                                                console.log('[Indux Appwrite Auth] Set email from user lookup:', user.email);
                                            } else {
                                                console.warn('[Indux Appwrite Auth] User fetched but no email found');
                                            }
                                        }
                                    } catch (e) {
                                        console.warn('[Indux Appwrite Auth] Failed to fetch user:', e.message);
                                        // Silently fail if we can't fetch user (permission issue or user deleted)
                                    }
                                } else if (membership.confirm === false) {
                                    // For pending invites, try to get email from membership object
                                    // Appwrite may store it in different properties
                                    console.log('[Indux Appwrite Auth] Pending invite - checking all membership properties for email');
                                    const possibleEmailProps = ['email', 'userEmail', 'inviteeEmail', 'invitedEmail', 'userName'];
                                    let foundEmail = null;
                                    for (const prop of possibleEmailProps) {
                                        const value = membership[prop];
                                        if (value && typeof value === 'string' && value.includes('@')) {
                                            foundEmail = value;
                                            console.log('[Indux Appwrite Auth] Found email in property:', prop, foundEmail);
                                            break;
                                        }
                                    }
                                    if (foundEmail) {
                                        membership.email = foundEmail;
                                        membership.userEmail = foundEmail;
                                    } else {
                                        // If still not found and we have userId, try fetching user
                                        if (membership.userId) {
                                            console.log('[Indux Appwrite Auth] Pending invite has userId, attempting user lookup:', membership.userId);
                                            try {
                                                // Check if users service is available
                                                if (!this._appwrite || !this._appwrite.users || typeof this._appwrite.users.get !== 'function') {
                                                    console.warn('[Indux Appwrite Auth] Users service not available for pending invite lookup');
                                                    console.log('[Indux Appwrite Auth] Appwrite client available:', !!this._appwrite);
                                                    console.log('[Indux Appwrite Auth] Appwrite client services:', this._appwrite ? Object.keys(this._appwrite) : 'N/A');
                                                } else {
                                                    const user = await this._appwrite.users.get({ userId: membership.userId });
                                                    if (user && user.email) {
                                                        membership.email = user.email;
                                                        membership.userEmail = user.email;
                                                        console.log('[Indux Appwrite Auth] Set email from user lookup for pending invite:', user.email);
                                                    }
                                                }
                                            } catch (e) {
                                                console.warn('[Indux Appwrite Auth] Failed to fetch user for pending invite:', e.message);
                                            }
                                        } else {
                                            console.warn('[Indux Appwrite Auth] Pending invite has no email and no userId');
                                        }
                                    }
                                }
                            } catch (e) {
                                console.error('[Indux Appwrite Auth] Error in email lookup:', e);
                                // Silently continue if user lookup fails
                            }
                        } else {
                            console.log('[Indux Appwrite Auth] Membership already has email:', membership.email || membership.userEmail);
                        }
                        // Ensure both properties are set for consistency
                        if (membership.email && !membership.userEmail) {
                            membership.userEmail = membership.email;
                        }
                        if (membership.userEmail && !membership.email) {
                            membership.email = membership.userEmail;
                        }
                        console.log('[Indux Appwrite Auth] Final membership email:', {
                            email: membership.email,
                            userEmail: membership.userEmail
                        });
                    }
                    
                    // Normalize roles for display (filter "owner" if custom role replaces it)
                    if (this.normalizeRolesForDisplay) {
                        for (const membership of memberships) {
                            if (membership.roles && Array.isArray(membership.roles)) {
                                membership.displayRoles = await this.normalizeRolesForDisplay(membership.roles, teamId);
                            }
                        }
                    }
                    
                    // Update currentTeamMemberships if this is the current team
                    // Use spread operator to create new array reference for Alpine reactivity
                    if (this.currentTeam && this.currentTeam.$id === teamId) {
                        this.currentTeamMemberships = [...memberships];
                        // Refresh permission cache after loading memberships
                        if (this.refreshPermissionCache) {
                            await this.refreshPermissionCache();
                        }
                    }

                    return { success: true, memberships: memberships, total: result.total || 0 };
                } catch (error) {
                    // Handle "team not found" errors gracefully (e.g., team was just deleted)
                    if (error.message && error.message.includes('could not be found')) {
                        // Silently return empty memberships for deleted teams
                        if (this.currentTeam && this.currentTeam.$id === teamId) {
                            this.currentTeamMemberships = [];
                        }
                        return { success: true, memberships: [], total: 0 };
                    }
                    console.error('[Indux Appwrite Auth] Failed to list memberships:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                }
            };

            // Get membership
            store.getMembership = async function(teamId, membershipId) {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to get membership details' };
                }

                try {
                    const result = await this._appwrite.teams.getMembership({
                        teamId: teamId,
                        membershipId: membershipId
                    });

                    return { success: true, membership: result };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to get membership:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                }
            };

            // Update membership roles
            store.updateMembership = async function(teamId, membershipId, roles) {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to update membership' };
                }

                // Check if user has updateMembers permission (required for updating other members' roles)
                // Users can always update their own roles
                const isUpdatingSelf = this.user && this.currentTeamMemberships?.some(
                    m => m.$id === membershipId && m.userId === this.user.$id
                );
                
                if (!isUpdatingSelf) {
                    // Updating another member - requires permission
                    if (!this.hasTeamPermission || !await this.hasTeamPermission('updateMembers')) {
                        return { success: false, error: 'You do not have permission to update member roles' };
                    }
                }

                this.inProgress = true;
                this.error = null;

                try {
                    // Normalize roles for Appwrite (add "owner" if custom roles require it)
                    let normalizedRoles = roles;
                    if (this.normalizeRolesForAppwrite) {
                        normalizedRoles = await this.normalizeRolesForAppwrite(roles, teamId);
                    }

                    const result = await this._appwrite.teams.updateMembership({
                        teamId: teamId,
                        membershipId: membershipId,
                        roles: normalizedRoles
                    });

                    // Check if this was the current user's membership (before refreshing)
                    const isCurrentUser = this.user && result.membership && result.membership.userId === this.user.$id;

                    // Refresh memberships if this was the current team
                    if (this.currentTeam && this.currentTeam.$id === teamId && this.listMemberships) {
                        await this.listMemberships(teamId);
                    }
                    
                    // Refresh permission cache if this was the current user's membership
                    // (This must happen after listMemberships so currentTeamMemberships is updated)
                    if (isCurrentUser && this.currentTeam && this.currentTeam.$id === teamId && this.refreshPermissionCache) {
                        await this.refreshPermissionCache();
                    }

                    return { success: true, membership: result };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to update membership:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                } finally {
                    this.inProgress = false;
                }
            };

            // Accept team invitation
            store.acceptInvite = async function(teamId, membershipId, userId, secret) {
                console.log('[Indux Appwrite Auth] acceptInvite called:', { teamId, membershipId, userId, secret: secret ? '***' : null });
                
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    console.warn('[Indux Appwrite Auth] acceptInvite: User not authenticated');
                    return { success: false, error: 'You must be signed in to accept an invitation' };
                }

                console.log('[Indux Appwrite Auth] acceptInvite: User authenticated, proceeding');

                this.inProgress = true;
                this.error = null;

                try {
                    console.log('[Indux Appwrite Auth] acceptInvite: Calling updateMembershipStatus');
                    const result = await this._appwrite.teams.updateMembershipStatus({
                        teamId: teamId,
                        membershipId: membershipId,
                        userId: userId,
                        secret: secret
                    });
                    console.log('[Indux Appwrite Auth] acceptInvite: updateMembershipStatus success:', result);

                    // Refresh teams list to ensure the new team appears
                    console.log('[Indux Appwrite Auth] acceptInvite: Refreshing teams list');
                    if (this.listTeams) {
                        const teamsBefore = this.teams?.length || 0;
                        console.log('[Indux Appwrite Auth] acceptInvite: Teams before refresh:', teamsBefore);
                        await this.listTeams();
                        const teamsAfter = this.teams?.length || 0;
                        console.log('[Indux Appwrite Auth] acceptInvite: Teams after refresh:', teamsAfter);
                        console.log('[Indux Appwrite Auth] acceptInvite: Teams array:', this.teams?.map(t => ({ id: t.$id, name: t.name })));
                        
                        // Check if the accepted team is in the list
                        const acceptedTeam = this.teams?.find(t => t.$id === teamId);
                        console.log('[Indux Appwrite Auth] acceptInvite: Accepted team found in list:', acceptedTeam ? { id: acceptedTeam.$id, name: acceptedTeam.name } : 'NOT FOUND');
                    } else {
                        console.warn('[Indux Appwrite Auth] acceptInvite: listTeams method not available');
                    }
                    
                    // If this is now the current team, refresh memberships
                    if (this.currentTeam && this.currentTeam.$id === teamId && this.listMemberships) {
                        console.log('[Indux Appwrite Auth] acceptInvite: Refreshing memberships for current team');
                        await this.listMemberships(teamId);
                    }

                    return { success: true, membership: result };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to accept invitation:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                } finally {
                    this.inProgress = false;
                }
            };

            // Delete membership (leave team or remove member)
            store.deleteMembership = async function(teamId, membershipId) {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to delete membership' };
                }

                // Check if user has removeMembers permission (unless removing themselves)
                // Note: Users can always leave a team themselves, but need permission to remove others
                const isRemovingSelf = this.user && this.currentTeamMemberships?.some(
                    m => m.$id === membershipId && m.userId === this.user.$id
                );
                
                if (!isRemovingSelf) {
                    // Removing another member - requires permission
                    if (!this.hasTeamPermission || !await this.hasTeamPermission('removeMembers')) {
                        return { success: false, error: 'You do not have permission to remove members' };
                    }
                }

                this.inProgress = true;
                this.error = null;

                try {
                    await this._appwrite.teams.deleteMembership({
                        teamId: teamId,
                        membershipId: membershipId
                    });

                    // Refresh memberships if this was the current team (do this first to update UI immediately)
                    if (this.currentTeam && this.currentTeam.$id === teamId && this.listMemberships) {
                        await this.listMemberships(teamId);
                    }
                    
                    // Refresh teams list (this will also trigger realtime updates for other users)
                    if (this.listTeams) {
                        await this.listTeams();
                    }

                    return { success: true };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to delete membership:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                } finally {
                    this.inProgress = false;
                }
            };
        } else if (!store) {
            setTimeout(waitForStore, 50);
        }
    };

    setTimeout(waitForStore, 100);
}

// Initialize when Alpine is ready
document.addEventListener('alpine:init', () => {
    try {
        initializeTeamsMembers();
    } catch (error) {
        console.error('[Indux Appwrite Auth] Failed to initialize teams members:', error);
    }
});

// Also try immediately if Alpine is already available
if (typeof Alpine !== 'undefined') {
    try {
        initializeTeamsMembers();
    } catch (error) {
        // Alpine might not be fully initialized yet, that's okay
    }
}

// Export members interface
window.InduxAppwriteAuthTeamsMembers = {
    initialize: initializeTeamsMembers
};

