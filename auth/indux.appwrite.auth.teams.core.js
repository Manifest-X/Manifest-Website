/* Auth teams - Core operations */

// Add core team methods to auth store
function initializeTeamsCore() {
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
        if (store && !store.createTeam) {
            // Team creation
            store.createTeam = async function(teamId, name, roles = []) {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                // Check if teams are enabled
                const appwriteConfig = await config.getAppwriteConfig();
                if (appwriteConfig && !appwriteConfig.teams) {
                    return { success: false, error: 'Teams are not enabled' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to create a team' };
                }

                this.inProgress = true;
                this.error = null;

                try {
                    // Generate unique teamId if not provided
                    let finalTeamId = teamId;
                    if (!finalTeamId) {
                        if (window.Appwrite && window.Appwrite.ID && window.Appwrite.ID.unique) {
                            finalTeamId = window.Appwrite.ID.unique();
                        } else {
                            finalTeamId = 'team_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                        }
                    }
                    
                    // Determine initial roles for team creator
                    let creatorRoles = roles;
                    if (creatorRoles.length === 0) {
                        // If no roles specified, use creatorRole from config
                        const memberRoles = appwriteConfig?.memberRoles;
                        const creatorRoleName = appwriteConfig?.creatorRole;
                        
                        if (memberRoles && creatorRoleName && memberRoles[creatorRoleName]) {
                            // Use specified creatorRole
                            creatorRoles = [creatorRoleName];
                        } else if (memberRoles && Object.keys(memberRoles).length > 0) {
                            // No creatorRole specified, find role with all owner permissions or use first
                            let foundRole = null;
                            for (const [roleName, permissions] of Object.entries(memberRoles)) {
                                if (this.roleHasAllOwnerPermissions && await this.roleHasAllOwnerPermissions(roleName)) {
                                    foundRole = roleName;
                                    break;
                                }
                            }
                            // If no role has all permissions, use first role
                            creatorRoles = [foundRole || Object.keys(memberRoles)[0]];
                        } else {
                            // No memberRoles defined - use Appwrite default (owner)
                            creatorRoles = ['owner'];
                        }
                    }
                    
                    // Normalize custom roles for Appwrite (add "owner" if needed)
                    if (this.normalizeRolesForAppwrite) {
                        creatorRoles = await this.normalizeRolesForAppwrite(creatorRoles);
                    }
                    
                    const result = await this._appwrite.teams.create(finalTeamId, name, creatorRoles);

                    // Apply default roles to the newly created team
                    if (window.InduxAppwriteAuthTeamsRolesDefaults && this.ensureDefaultRoles) {
                        await this.ensureDefaultRoles(finalTeamId);
                    }

                    // Refresh teams list
                    await this.listTeams();

                    return { success: true, team: result };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to create team:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                } finally {
                    this.inProgress = false;
                }
            };

            // List user's teams
            store.listTeams = async function(queries = [], search = '') {
                console.log('[Indux Appwrite Auth] listTeams called:', { queries, search });
                
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    console.warn('[Indux Appwrite Auth] listTeams: User not authenticated');
                    return { success: false, error: 'You must be signed in to list teams' };
                }

                try {
                    const params = {
                        queries: queries
                    };
                    if (search && search.trim().length > 0) {
                        params.search = search;
                    }
                    console.log('[Indux Appwrite Auth] listTeams: Calling teams.list with params:', params);
                    const result = await this._appwrite.teams.list(params);
                    console.log('[Indux Appwrite Auth] listTeams: teams.list result:', {
                        total: result.total,
                        teamsCount: result.teams?.length || 0,
                        teamIds: result.teams?.map(t => ({ id: t.$id, name: t.name })) || []
                    });

                    // Update store with teams
                    const teamsBefore = this.teams?.length || 0;
                    console.log('[Indux Appwrite Auth] listTeams: Teams before update:', teamsBefore);
                    this.teams = result.teams || [];
                    const teamsAfter = this.teams?.length || 0;
                    console.log('[Indux Appwrite Auth] listTeams: Teams after update:', teamsAfter);
                    console.log('[Indux Appwrite Auth] listTeams: Updated teams array:', this.teams?.map(t => ({ id: t.$id, name: t.name })) || []);
                    
                    // Update currentTeam if it exists and was updated
                    if (this.currentTeam && this.currentTeam.$id) {
                        const updatedCurrentTeam = this.teams?.find(t => t.$id === this.currentTeam.$id);
                        if (updatedCurrentTeam) {
                            // Only update if name changed (to avoid unnecessary reactivity triggers)
                            if (updatedCurrentTeam.name !== this.currentTeam.name) {
                                this.currentTeam = { ...updatedCurrentTeam };
                            }
                        }
                    }
                    
                    // Cache immutable status for all teams (if defaults module is loaded)
                    if (window.InduxAppwriteAuthTeamsDefaults && this.isTeamImmutable) {
                        for (const team of this.teams) {
                            if (!this._teamImmutableCache[team.$id]) {
                                this._teamImmutableCache[team.$id] = await this.isTeamImmutable(team.$id);
                            }
                        }
                    }
                    
                    // Load deleted template teams (if defaults module is loaded)
                    if (window.InduxAppwriteAuthTeamsDefaults && this.getDeletedTemplateTeams) {
                        this.deletedTemplateTeams = await this.getDeletedTemplateTeams();
                    }
                    
                    // Clean up duplicate default teams (permanent/template) if any exist
                    if (window.InduxAppwriteAuthTeamsDefaults && this.cleanupDuplicateDefaultTeams) {
                        const cleanupResult = await this.cleanupDuplicateDefaultTeams();
                        if (cleanupResult.cleaned > 0) {
                            console.log(`[Indux Appwrite Auth] Cleaned up ${cleanupResult.cleaned} duplicate default team(s)`);
                            if (cleanupResult.errors && cleanupResult.errors.length > 0) {
                                console.warn('[Indux Appwrite Auth] Some duplicate teams could not be deleted:', cleanupResult.errors);
                            }
                            // Refresh teams list after cleanup
                            if (this.listTeams) {
                                await this.listTeams();
                            }
                        }
                    }
                    
                    // Load deleted template roles for current team (if roles defaults module is loaded)
                    if (this.currentTeam && this.currentTeam.$id && window.InduxAppwriteAuthTeamsRolesDefaults && this.getDeletedTemplateRoles) {
                        this.deletedTemplateRoles = await this.getDeletedTemplateRoles(this.currentTeam.$id);
                    }
                    
                    // Set currentTeam to first default team if available and not already set
                    if (!this.currentTeam && this.teams.length > 0) {
                        const appwriteConfig = await config.getAppwriteConfig();
                        const hasDefaultTeams = (appwriteConfig?.permanentTeams && Array.isArray(appwriteConfig.permanentTeams) && appwriteConfig.permanentTeams.length > 0) ||
                                               (appwriteConfig?.templateTeams && Array.isArray(appwriteConfig.templateTeams) && appwriteConfig.templateTeams.length > 0);
                        
                        if (hasDefaultTeams && window.InduxAppwriteAuthTeamsDefaults && this.getDefaultTeams) {
                            const defaultTeams = await this.getDefaultTeams();
                            if (defaultTeams.length > 0) {
                                this.currentTeam = defaultTeams[0];
                            } else {
                                this.currentTeam = this.teams[0];
                            }
                        } else {
                            this.currentTeam = this.teams[0];
                        }
                    }
                    
                    // Auto-load memberships for current team (if members module is loaded)
                    if (this.currentTeam && this.currentTeam.$id && window.InduxAppwriteAuthTeamsMembers && this.listMemberships) {
                        try {
                            const membershipsResult = await this.listMemberships(this.currentTeam.$id);
                            if (membershipsResult.success) {
                                this.currentTeamMemberships = membershipsResult.memberships || [];
                            }
                        } catch (error) {
                            // Silently handle errors (e.g., team was deleted)
                            // listMemberships already handles "team not found" gracefully
                            this.currentTeamMemberships = [];
                        }
                    }
                    
                    // Start teams realtime subscription if available (only if not already subscribed)
                    // Also skip if we're in the middle of a realtime-triggered refresh
                    // Check for any truthy value (function, object, or true flag)
                    if (!this._teamsRealtimeUnsubscribe && !this._teamsRealtimeSubscribing) {
                        const appwriteConfig = await config.getAppwriteConfig();
                        if (this._appwrite?.realtime && this.startTeamsRealtime) {
                            this.startTeamsRealtime();
                        } else if (appwriteConfig?.teamsPollInterval && typeof appwriteConfig.teamsPollInterval === 'number' && appwriteConfig.teamsPollInterval > 0) {
                            // Fallback to polling if realtime not available
                            console.warn('[Indux Appwrite Auth] Realtime not available, falling back to polling');
                            if (this.startTeamsPolling) {
                                this.startTeamsPolling(appwriteConfig.teamsPollInterval);
                            }
                        }
                    }
                    
                    return { success: true, teams: result.teams || [], total: result.total || 0 };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to list teams:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                }
            };

            // Get team by ID
            store.getTeam = async function(teamId) {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to get team details' };
                }

                try {
                    const result = await this._appwrite.teams.get({
                        teamId: teamId
                    });

                    return { success: true, team: result };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to get team:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                }
            };

            // Update team name
            store.updateTeamName = async function(teamId, name) {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to update team name' };
                }

                if (!teamId) {
                    return { success: false, error: 'Team ID is required' };
                }

                if (!name || !name.trim()) {
                    return { success: false, error: 'Team name is required' };
                }

                this.inProgress = true;
                this.error = null;

                try {
                    console.log('[Indux Appwrite Auth] updateTeamName() called with teamId:', teamId, 'name:', name);
                    const result = await this._appwrite.teams.updateName(teamId, name.trim());
                    console.log('[Indux Appwrite Auth] Appwrite updateName result:', result);
                    
                    // Use the result directly (it has the updated name from Appwrite)
                    const updatedTeam = result;
                    console.log('[Indux Appwrite Auth] updatedTeam from result:', updatedTeam);
                    console.log('[Indux Appwrite Auth] updatedTeam.name:', updatedTeam?.name);

                    // Refresh teams list (this will update the teams array)
                    console.log('[Indux Appwrite Auth] Calling listTeams() to refresh...');
                    await this.listTeams();
                    console.log('[Indux Appwrite Auth] listTeams() completed');
                    console.log('[Indux Appwrite Auth] this.teams after listTeams:', this.teams);
                    
                    // Update currentTeam reference if it was the updated team
                    // Reassign the entire object to trigger Alpine reactivity
                    if (this.currentTeam && this.currentTeam.$id === teamId) {
                        console.log('[Indux Appwrite Auth] currentTeam matches updated teamId');
                        // Use the result from Appwrite, or find it from the refreshed teams list
                        const refreshedTeam = this.teams?.find(t => t.$id === teamId) || updatedTeam;
                        console.log('[Indux Appwrite Auth] refreshedTeam found:', refreshedTeam);
                        console.log('[Indux Appwrite Auth] refreshedTeam.name:', refreshedTeam?.name);
                        
                        if (refreshedTeam) {
                            console.log('[Indux Appwrite Auth] Before update - currentTeam:', this.currentTeam);
                            console.log('[Indux Appwrite Auth] Before update - currentTeam.name:', this.currentTeam?.name);
                            
                            // Force Alpine reactivity by creating a new object reference
                            // Alpine needs to see a new reference to trigger updates
                            this.currentTeam = { ...refreshedTeam };
                            console.log('[Indux Appwrite Auth] After spread assign - currentTeam:', this.currentTeam);
                            console.log('[Indux Appwrite Auth] After spread assign - currentTeam.name:', this.currentTeam?.name);
                            
                            // Also update the teams array reference in case it's being watched
                            const teamIndex = this.teams?.findIndex(t => t.$id === teamId);
                            console.log('[Indux Appwrite Auth] teamIndex in array:', teamIndex);
                            if (teamIndex !== undefined && teamIndex >= 0 && this.teams) {
                                // Create new array to trigger reactivity
                                this.teams = [
                                    ...this.teams.slice(0, teamIndex),
                                    { ...refreshedTeam },
                                    ...this.teams.slice(teamIndex + 1)
                                ];
                                console.log('[Indux Appwrite Auth] Updated teams array');
                            }
                            
                            // Use Alpine's nextTick if available to ensure reactivity is triggered
                            if (typeof Alpine !== 'undefined' && Alpine.nextTick) {
                                console.log('[Indux Appwrite Auth] Using Alpine.nextTick to ensure reactivity');
                                Alpine.nextTick(() => {
                                    // Ensure the update is visible
                                    this.currentTeam = refreshedTeam;
                                    console.log('[Indux Appwrite Auth] After nextTick - currentTeam:', this.currentTeam);
                                    console.log('[Indux Appwrite Auth] After nextTick - currentTeam.name:', this.currentTeam?.name);
                                });
                            }
                        } else {
                            console.log('[Indux Appwrite Auth] No refreshedTeam found!');
                        }
                    } else {
                        console.log('[Indux Appwrite Auth] currentTeam does not match or is null');
                        console.log('[Indux Appwrite Auth] currentTeam:', this.currentTeam);
                        console.log('[Indux Appwrite Auth] currentTeam.$id:', this.currentTeam?.$id);
                        console.log('[Indux Appwrite Auth] teamId:', teamId);
                    }

                    return { success: true, team: updatedTeam };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to update team name:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                } finally {
                    this.inProgress = false;
                }
            };

            // Delete team
            store.deleteTeam = async function(teamId) {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to delete a team' };
                }

                // Check if team is immutable
                if (this.isTeamImmutable) {
                    const isImmutable = await this.isTeamImmutable(teamId);
                    if (isImmutable) {
                        return { success: false, error: 'This team cannot be deleted' };
                    }
                }

                this.inProgress = true;
                this.error = null;

                try {
                    // Get team name before deletion (for tracking)
                    const team = this.teams?.find(t => t.$id === teamId);
                    const teamName = team?.name;
                    
                    await this._appwrite.teams.delete({
                        teamId: teamId
                    });

                    // Track deleted template team (don't recreate it, but allow reapplying)
                    if (teamName && window.InduxAppwriteAuthTeamsDefaults) {
                        const config = await window.InduxAppwriteAuthConfig.getAppwriteConfig();
                        if (config?.templateTeams && Array.isArray(config.templateTeams)) {
                            const resolvePersonalTeamName = window.InduxAppwriteAuthTeamsDefaults.resolvePersonalTeamName;
                            // Check if this was a template team
                            for (const nameConfig of config.templateTeams) {
                                const resolvedName = await resolvePersonalTeamName(nameConfig);
                                if (resolvedName === teamName) {
                                    // Store deletion in localStorage (keyed by user ID)
                                    try {
                                        const userId = this.user?.$id;
                                        if (userId) {
                                            const key = `indux:deleted-teams:${userId}`;
                                            const deleted = JSON.parse(localStorage.getItem(key) || '[]');
                                            if (!deleted.includes(teamName)) {
                                                deleted.push(teamName);
                                                localStorage.setItem(key, JSON.stringify(deleted));
                                            }
                                        }
                                    } catch (e) {
                                        console.warn('[Indux Appwrite Auth] Failed to track deleted team:', e);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Clear current team if it was deleted (before refreshing list to avoid loading memberships for deleted team)
                    if (this.currentTeam && this.currentTeam.$id === teamId) {
                        this.currentTeam = null;
                        this.currentTeamMemberships = [];
                    }

                    // Refresh teams list
                    await this.listTeams();

                    return { success: true };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to delete team:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                } finally {
                    this.inProgress = false;
                }
            };

            // Get team preferences
            store.getTeamPrefs = async function(teamId) {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to get team preferences' };
                }

                try {
                    const result = await this._appwrite.teams.getPrefs({
                        teamId: teamId
                    });

                    return { success: true, prefs: result };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to get team preferences:', error);
                    this.error = error.message;
                    return { success: false, error: error.message };
                }
            };

            // Start realtime subscription for all auth entities (teams, memberships, account, roles/permissions)
            store.startTeamsRealtime = function() {
                // Don't subscribe if already subscribed (check for function, object, array, or true flag)
                if (this._teamsRealtimeUnsubscribe) {
                    console.log('[Indux Appwrite Auth] Realtime subscriptions already active');
                    return;
                }
                
                // Only subscribe if authenticated and realtime is available
                if (!this.isAuthenticated || !this._appwrite?.realtime) {
                    return;
                }
                
                console.log('[Indux Appwrite Auth] Starting realtime subscriptions for teams, memberships, and account');
                
                const unsubscribes = [];
                
                try {
                    // Subscribe to teams channel (covers: team create/update/delete, team preferences/roles)
                    const teamsSubscription = this._appwrite.realtime.subscribe('teams', (response) => {
                        console.log('[Indux Appwrite Auth] Teams realtime event:', response);
                        
                        // Prevent recursive subscription (don't subscribe again when refreshing)
                        if (this._teamsRealtimeSubscribing) {
                            return;
                        }
                        
                        // Handle different event types
                        if (response.events && Array.isArray(response.events)) {
                            let shouldRefreshTeams = false;
                            
                            for (const event of response.events) {
                                // Event format can be: "teams.update", "teams.create", "teams.delete", 
                                // "teams.{teamId}", "teams *", etc.
                                const parts = event.split(/[.\s]+/);
                                const eventType = parts[0]; // 'teams', etc.
                                const action = parts[1]; // 'update', 'create', 'delete', or teamId
                                
                                console.log('[Indux Appwrite Auth] Processing teams event:', event, '-> type:', eventType, 'action:', action);
                                
                                if (eventType === 'teams') {
                                    // Check if it's an action (update, create, delete) or a team-specific event
                                    // Note: team preferences (roles/permissions) updates trigger teams.update
                                    if (action === 'update' || action === 'create' || action === 'delete' || action === '*') {
                                        shouldRefreshTeams = true;
                                    } else if (action && action.length > 10) {
                                        // Likely a teamId (Appwrite IDs are long), treat as update
                                        shouldRefreshTeams = true;
                                    }
                                }
                            }
                            
                            // Refresh teams list if needed (only once per event batch)
                            // This also refreshes roles/permissions since they're stored in team preferences
                            if (shouldRefreshTeams && !this._teamsRealtimeSubscribing) {
                                this._teamsRealtimeSubscribing = true;
                                if (this.listTeams) {
                                    this.listTeams().finally(() => {
                                        this._teamsRealtimeSubscribing = false;
                                    });
                                } else {
                                    this._teamsRealtimeSubscribing = false;
                                }
                            }
                        }
                    });
                    
                    // Subscribe to memberships channel (covers: invite, accept, update roles, delete)
                    // Also subscribe to team-specific membership channels for better reactivity
                    const membershipsSubscription = this._appwrite.realtime.subscribe('memberships', (response) => {
                        console.log('[Indux Appwrite Auth] Memberships realtime event received:', {
                            events: response.events,
                            payload: response.payload,
                            channels: response.channels,
                            timestamp: response.timestamp,
                            fullResponse: response
                        });
                        
                        // Prevent recursive subscription
                        if (this._teamsRealtimeSubscribing) {
                            console.log('[Indux Appwrite Auth] Skipping realtime refresh - already refreshing');
                            return;
                        }
                        
                        if (response.events && Array.isArray(response.events)) {
                            let shouldRefreshMemberships = false;
                            let affectedTeamId = null;
                            
                            // First, check payload for teamId (most reliable source)
                            if (response.payload) {
                                console.log('[Indux Appwrite Auth] Checking payload for teamId:', {
                                    payload: response.payload,
                                    hasTeamId: !!response.payload.teamId,
                                    hasTeam: !!response.payload.team,
                                    hasMembership: !!response.payload.membership
                                });
                                
                                // Check various possible payload structures
                                if (response.payload.teamId) {
                                    affectedTeamId = response.payload.teamId;
                                    console.log('[Indux Appwrite Auth] Found teamId in payload.teamId:', affectedTeamId);
                                } else if (response.payload.team && response.payload.team.$id) {
                                    affectedTeamId = response.payload.team.$id;
                                    console.log('[Indux Appwrite Auth] Found teamId in payload.team.$id:', affectedTeamId);
                                } else if (response.payload.membership && response.payload.membership.teamId) {
                                    affectedTeamId = response.payload.membership.teamId;
                                    console.log('[Indux Appwrite Auth] Found teamId in payload.membership.teamId:', affectedTeamId);
                                } else {
                                    console.log('[Indux Appwrite Auth] No teamId found in payload structure');
                                }
                            } else {
                                console.log('[Indux Appwrite Auth] No payload in realtime response');
                            }
                            
                            for (const event of response.events) {
                                // Handle different event formats:
                                // - "memberships.update" (legacy format)
                                // - "memberships.delete" (legacy format)
                                // - "teams.{teamId}.memberships.{membershipId}.delete" (current format)
                                // - "teams.*.memberships.*.delete" (wildcard format)
                                // - "teams.{teamId}.memberships.*" (team-specific wildcard)
                                const parts = event.split(/[.\s]+/);
                                const eventType = parts[0]; // 'teams' or 'memberships'
                                
                                console.log('[Indux Appwrite Auth] Processing memberships event:', event, '-> parts:', parts, 'payload:', response.payload);
                                
                                // Check for both legacy format (memberships.*) and current format (teams.*.memberships.*)
                                if (eventType === 'memberships') {
                                    // Legacy format: "memberships.update", "memberships.delete", etc.
                                    const action = parts[1];
                                    
                                    console.log('[Indux Appwrite Auth] Parsing legacy membership event:', {
                                        event,
                                        parts,
                                        action,
                                        isDelete: action === 'delete'
                                    });
                                    
                                    // Check if second part is a teamId (long alphanumeric string)
                                    const possibleTeamId = parts[1];
                                    if (possibleTeamId && possibleTeamId.length > 10 && /^[a-f0-9]+$/i.test(possibleTeamId)) {
                                        // This is a team-specific event
                                        console.log('[Indux Appwrite Auth] Detected team-specific event, teamId:', possibleTeamId);
                                        if (!affectedTeamId) {
                                            affectedTeamId = possibleTeamId;
                                        }
                                        const actionFromTeamId = parts[2];
                                        if (actionFromTeamId === 'create' || actionFromTeamId === 'update' || actionFromTeamId === 'delete' || actionFromTeamId === '*' || !actionFromTeamId) {
                                            shouldRefreshMemberships = true;
                                            console.log('[Indux Appwrite Auth] Team-specific event triggers refresh, action:', actionFromTeamId || 'none');
                                        }
                                    } else if (action === 'create' || action === 'update' || action === 'delete' || action === '*') {
                                        // Global membership event
                                        shouldRefreshMemberships = true;
                                        console.log('[Indux Appwrite Auth] Global membership event triggers refresh, action:', action);
                                    }
                                } else if (eventType === 'teams' && parts.length >= 3 && parts[2] === 'memberships') {
                                    // Current format: "teams.{teamId}.memberships.{membershipId}.delete"
                                    // or "teams.*.memberships.*.delete"
                                    const teamIdPart = parts[1]; // teamId or '*'
                                    const membershipIdPart = parts[3]; // membershipId or '*'
                                    const action = parts[4]; // 'create', 'update', 'delete', or undefined
                                    
                                    console.log('[Indux Appwrite Auth] Parsing teams.memberships event:', {
                                        event,
                                        parts,
                                        teamIdPart,
                                        membershipIdPart,
                                        action,
                                        isDelete: action === 'delete'
                                    });
                                    
                                    // Extract teamId if it's not a wildcard
                                    if (teamIdPart && teamIdPart !== '*' && teamIdPart.length > 10 && /^[a-f0-9]+$/i.test(teamIdPart)) {
                                        if (!affectedTeamId) {
                                            affectedTeamId = teamIdPart;
                                        }
                                    }
                                    
                                    // Check if this is a create, update, or delete action
                                    if (action === 'create' || action === 'update' || action === 'delete' || action === '*' || !action) {
                                        shouldRefreshMemberships = true;
                                        console.log('[Indux Appwrite Auth] teams.memberships event triggers refresh, action:', action || 'none');
                                    }
                                }
                            }
                            
                            // Refresh memberships for current team if viewing one
                            // This ensures the UI updates immediately when a member is updated/deleted
                            if (shouldRefreshMemberships) {
                                // If we know which team was affected, only refresh if it's the current team
                                // Otherwise, refresh for current team if viewing one
                                const shouldRefreshCurrentTeam = !affectedTeamId || 
                                    (this.currentTeam && this.currentTeam.$id === affectedTeamId);
                                
                                console.log('[Indux Appwrite Auth] Should refresh memberships:', {
                                    shouldRefreshMemberships,
                                    affectedTeamId,
                                    currentTeamId: this.currentTeam?.$id,
                                    shouldRefreshCurrentTeam
                                });
                                
                                if (shouldRefreshCurrentTeam && this.currentTeam && this.currentTeam.$id && this.listMemberships) {
                                    console.log('[Indux Appwrite Auth] Refreshing memberships for team:', this.currentTeam.$id);
                                    console.log('[Indux Appwrite Auth] Current memberships before refresh:', this.currentTeamMemberships?.length || 0);
                                    
                                    // Use async/await to ensure memberships are refreshed
                                    this.listMemberships(this.currentTeam.$id).then((result) => {
                                        console.log('[Indux Appwrite Auth] listMemberships result:', {
                                            success: result.success,
                                            membershipsCount: result.memberships?.length || 0,
                                            memberships: result.memberships
                                        });
                                        
                                        // Force reactivity by ensuring new array reference
                                        if (this.currentTeamMemberships) {
                                            const oldLength = this.currentTeamMemberships.length;
                                            this.currentTeamMemberships = [...this.currentTeamMemberships];
                                            const newLength = this.currentTeamMemberships.length;
                                            console.log('[Indux Appwrite Auth] Memberships array updated:', {
                                                oldLength,
                                                newLength,
                                                changed: oldLength !== newLength
                                            });
                                        } else {
                                            console.log('[Indux Appwrite Auth] currentTeamMemberships is null/undefined after refresh');
                                        }
                                        console.log('[Indux Appwrite Auth] Memberships refreshed after realtime event');
                                    }).catch(err => {
                                        console.error('[Indux Appwrite Auth] Failed to refresh memberships after realtime event:', err);
                                    });
                                } else {
                                    console.log('[Indux Appwrite Auth] Not refreshing memberships:', {
                                        shouldRefreshCurrentTeam,
                                        hasCurrentTeam: !!this.currentTeam,
                                        currentTeamId: this.currentTeam?.$id,
                                        hasListMemberships: !!this.listMemberships
                                    });
                                }
                                
                                // Also refresh teams list (membership changes affect team member counts)
                                if (!this._teamsRealtimeSubscribing) {
                                    this._teamsRealtimeSubscribing = true;
                                    if (this.listTeams) {
                                        this.listTeams().finally(() => {
                                            this._teamsRealtimeSubscribing = false;
                                        });
                                    } else {
                                        this._teamsRealtimeSubscribing = false;
                                    }
                                }
                            }
                        }
                    });
                    
                    // Subscribe to account channel (covers: user profile updates, account status changes)
                    const accountSubscription = this._appwrite.realtime.subscribe('account', (response) => {
                        console.log('[Indux Appwrite Auth] Account realtime event:', response);
                        
                        if (response.events && Array.isArray(response.events)) {
                            let shouldRefreshUser = false;
                            
                            for (const event of response.events) {
                                const parts = event.split(/[.\s]+/);
                                const eventType = parts[0]; // 'account'
                                const action = parts[1]; // 'update', 'delete', etc.
                                
                                console.log('[Indux Appwrite Auth] Processing account event:', event, '-> type:', eventType, 'action:', action);
                                
                                if (eventType === 'account') {
                                    if (action === 'update' || action === 'delete' || action === '*') {
                                        shouldRefreshUser = true;
                                    }
                                }
                            }
                            
                            // Refresh user data if account was updated
                            if (shouldRefreshUser && this.getAccount) {
                                this.getAccount();
                            }
                        }
                    });
                    
                    // Store unsubscribe functions/objects
                    const subscriptions = [teamsSubscription, membershipsSubscription, accountSubscription];
                    const unsubscribeFunctions = [];
                    
                    for (const sub of subscriptions) {
                        if (typeof sub === 'function') {
                            unsubscribeFunctions.push(sub);
                        } else if (sub && typeof sub.unsubscribe === 'function') {
                            unsubscribeFunctions.push(() => sub.unsubscribe());
                        } else if (sub) {
                            unsubscribeFunctions.push(sub);
                        }
                    }
                    
                    // Store as array if multiple, or single value if only one
                    if (unsubscribeFunctions.length > 1) {
                        this._teamsRealtimeUnsubscribe = unsubscribeFunctions;
                        console.log('[Indux Appwrite Auth] Realtime subscriptions active (multiple channels)');
                    } else if (unsubscribeFunctions.length === 1) {
                        this._teamsRealtimeUnsubscribe = unsubscribeFunctions[0];
                        console.log('[Indux Appwrite Auth] Realtime subscriptions active (single channel)');
                    } else {
                        this._teamsRealtimeUnsubscribe = true; // Mark as subscribed
                        console.log('[Indux Appwrite Auth] Realtime subscriptions active (no unsubscribe methods)');
                    }
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to start realtime subscriptions:', error);
                }
            };
            
            // Stop realtime subscriptions
            store.stopTeamsRealtime = function() {
                if (!this._teamsRealtimeUnsubscribe) {
                    return;
                }
                
                try {
                    // Handle array of unsubscribe functions (multiple channels)
                    if (Array.isArray(this._teamsRealtimeUnsubscribe)) {
                        for (const unsubscribe of this._teamsRealtimeUnsubscribe) {
                            if (typeof unsubscribe === 'function') {
                                unsubscribe();
                            } else if (unsubscribe && typeof unsubscribe.unsubscribe === 'function') {
                                unsubscribe.unsubscribe();
                            }
                        }
                        console.log('[Indux Appwrite Auth] Stopped all realtime subscriptions (multiple channels)');
                    } else if (typeof this._teamsRealtimeUnsubscribe === 'function') {
                        // Direct unsubscribe function
                        this._teamsRealtimeUnsubscribe();
                        console.log('[Indux Appwrite Auth] Stopped realtime subscriptions (function)');
                    } else if (this._teamsRealtimeUnsubscribe === true) {
                        // Subscription active but no unsubscribe method available
                        console.log('[Indux Appwrite Auth] Stopped realtime subscriptions (marked)');
                    } else {
                        // Subscription object - try to call unsubscribe if it exists
                        if (typeof this._teamsRealtimeUnsubscribe.unsubscribe === 'function') {
                            this._teamsRealtimeUnsubscribe.unsubscribe();
                            console.log('[Indux Appwrite Auth] Stopped realtime subscriptions (object method)');
                        } else {
                            console.log('[Indux Appwrite Auth] Stopped realtime subscriptions (object, no method)');
                        }
                    }
                } catch (error) {
                    console.warn('[Indux Appwrite Auth] Error stopping realtime subscriptions:', error);
                } finally {
                    this._teamsRealtimeUnsubscribe = null;
                }
            };
            
            // Start polling teams for updates (optional, configured via teamsPollInterval) - DEPRECATED: Use realtime instead
            store.startTeamsPolling = function(intervalMs) {
                // Clear existing interval if any
                if (this._teamsPollInterval) {
                    clearInterval(this._teamsPollInterval);
                }
                
                // Only poll if authenticated
                if (!this.isAuthenticated) {
                    return;
                }
                
                console.log('[Indux Appwrite Auth] Starting teams polling with interval:', intervalMs, 'ms (deprecated: use realtime instead)');
                this._teamsPollInterval = setInterval(async () => {
                    if (this.isAuthenticated && this.listTeams) {
                        try {
                            await this.listTeams();
                        } catch (error) {
                            console.warn('[Indux Appwrite Auth] Teams polling error:', error);
                        }
                    } else {
                        // Stop polling if user logs out
                        if (this.stopTeamsPolling) {
                            this.stopTeamsPolling();
                        }
                    }
                }, intervalMs);
            };
            
            // Stop polling teams
            store.stopTeamsPolling = function() {
                if (this._teamsPollInterval) {
                    clearInterval(this._teamsPollInterval);
                    this._teamsPollInterval = null;
                    console.log('[Indux Appwrite Auth] Stopped teams polling');
                }
            };
            
            // Update team preferences
            store.updateTeamPrefs = async function(teamId, prefs) {
                if (!this._appwrite) {
                    this._appwrite = await config.getAppwriteClient();
                }
                if (!this._appwrite) {
                    return { success: false, error: 'Appwrite not configured' };
                }

                if (!this.isAuthenticated) {
                    return { success: false, error: 'You must be signed in to update team preferences' };
                }

                this.inProgress = true;
                this.error = null;

                try {
                    const result = await this._appwrite.teams.updatePrefs({
                        teamId: teamId,
                        prefs: prefs
                    });

                    return { success: true, prefs: result };
                } catch (error) {
                    console.error('[Indux Appwrite Auth] Failed to update team preferences:', error);
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
        initializeTeamsCore();
    } catch (error) {
        console.error('[Indux Appwrite Auth] Failed to initialize teams core:', error);
    }
});

// Also try immediately if Alpine is already available
if (typeof Alpine !== 'undefined') {
    try {
        initializeTeamsCore();
    } catch (error) {
        // Alpine might not be fully initialized yet, that's okay
    }
}

// Export core teams interface
window.InduxAppwriteAuthTeamsCore = {
    initialize: initializeTeamsCore
};

