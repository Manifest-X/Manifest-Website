/* Auth config */

// Load manifest if not already loaded
async function ensureManifest() {
    if (window.InduxComponentsRegistry?.manifest) {
        return window.InduxComponentsRegistry.manifest;
    }

    try {
        const response = await fetch('/manifest.json');
        return await response.json();
    } catch (error) {
        console.error('[Indux Appwrite Auth] Failed to load manifest:', error);
        return null;
    }
}

// Get Appwrite config from manifest
async function getAppwriteConfig() {
    const manifest = await ensureManifest();
    if (!manifest?.appwrite) {
        console.warn('[Indux Appwrite Auth] No Appwrite config found in manifest.json');
        return null;
    }

    const appwriteConfig = manifest.appwrite;
    const endpoint = appwriteConfig.endpoint;
    const projectId = appwriteConfig.projectId;
    const devKey = appwriteConfig.devKey; // Optional dev key to bypass rate limits in development

    if (!endpoint || !projectId) {
        console.error('[Indux Appwrite Auth] Missing endpoint or projectId in config');
        return null;
    }

    // Get auth methods from config (defaults to ["magic", "oauth"] if not specified)
    const authMethods = appwriteConfig.auth?.methods || ["magic", "oauth"];
    
    // Guest session support: "guest-auto" = automatic, "guest-manual" = manual only
    const guestAuto = authMethods.includes("guest-auto");
    const guestManual = authMethods.includes("guest-manual");
    const hasGuest = guestAuto || guestManual;
    
    const magicEnabled = authMethods.includes("magic");
    const oauthEnabled = authMethods.includes("oauth");
    
    // Teams support: presence of teams object enables it
    const teamsEnabled = !!appwriteConfig.auth?.teams;
    const permanentTeams = appwriteConfig.auth?.teams?.permanent || null; // Array of team names (immutable)
    const templateTeams = appwriteConfig.auth?.teams?.template || null; // Array of team names (can be deleted and reapplied)
    const teamsPollInterval = appwriteConfig.auth?.teams?.pollInterval || null; // Polling interval in milliseconds (null = disabled)
    
    // Default roles: permanent (cannot be deleted) and template (can be deleted)
    // These are objects mapping role names to permissions: { "Admin": ["inviteMembers", ...] }
    const permanentRoles = appwriteConfig.auth?.roles?.permanent || null; // Object: { "RoleName": ["permission1", ...] }
    const templateRoles = appwriteConfig.auth?.roles?.template || null; // Object: { "RoleName": ["permission1", ...] }
    
    // Member roles: derived from permanent and template roles (merged)
    // This is used for role normalization, permission checking, and creatorRole logic
    const memberRoles = permanentRoles || templateRoles 
        ? { ...(permanentRoles || {}), ...(templateRoles || {}) }
        : (appwriteConfig.auth?.memberRoles || null); // Fallback to legacy memberRoles if roles not defined
    
    // Creator role: string reference to a role in memberRoles (role creator gets by default)
    const creatorRole = appwriteConfig.auth?.creatorRole || null;
    
    return {
        endpoint,
        projectId,
        devKey, // Optional dev key for development
        authMethods,
        guest: hasGuest,
        guestAuto: guestAuto,
        guestManual: guestManual,
        anonymous: guestAuto, // For backwards compatibility with existing code
        magic: magicEnabled,
        oauth: oauthEnabled,
        teams: teamsEnabled,
        permanentTeams: permanentTeams, // Array of team names (cannot be deleted)
        templateTeams: templateTeams, // Array of team names (can be deleted and reapplied)
        teamsPollInterval: teamsPollInterval, // Polling interval in milliseconds (null = disabled)
        memberRoles: memberRoles, // Role definitions: { "RoleName": ["permission1", "permission2"] }
        permanentRoles: permanentRoles, // Object: { "RoleName": ["permission1", ...] } (cannot be deleted)
        templateRoles: templateRoles, // Object: { "RoleName": ["permission1", ...] } (can be deleted)
        creatorRole: creatorRole // String reference to memberRoles key
    };
}

// Initialize Appwrite client (assumes SDK loaded separately)
let appwriteClient = null;
let appwriteAccount = null;
let appwriteTeams = null;
let appwriteUsers = null;

async function getAppwriteClient() {
    // Check if Appwrite SDK is loaded
    if (!window.Appwrite || !window.Appwrite.Client || !window.Appwrite.Account) {
        console.error('[Indux Appwrite Auth] Appwrite SDK not loaded. Include: <script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>');
        return null;
    }

    if (!appwriteClient) {
        const config = await getAppwriteConfig();
        if (!config) {
            return null;
        }

        appwriteClient = new window.Appwrite.Client()
            .setEndpoint(config.endpoint)
            .setProject(config.projectId);
        
        // Add dev key header if provided (bypasses rate limits in development)
        // See: https://appwrite.io/docs/advanced/platform/rate-limits#dev-keys
        if (config.devKey) {
            appwriteClient.headers['X-Appwrite-Dev-Key'] = config.devKey;
            console.log('[Indux Appwrite Auth] Dev key configured - rate limits bypassed');
        }

        appwriteAccount = new window.Appwrite.Account(appwriteClient);
        appwriteTeams = new window.Appwrite.Teams(appwriteClient);
        
        // Initialize Users service if available (for fetching user details)
        if (window.Appwrite.Users) {
            appwriteUsers = new window.Appwrite.Users(appwriteClient);
        }
    }

    return {
        client: appwriteClient,
        account: appwriteAccount,
        teams: appwriteTeams,
        users: appwriteUsers, // Add users service for fetching user details
        realtime: window.Appwrite?.Realtime ? new window.Appwrite.Realtime(appwriteClient) : null // Realtime service for subscriptions
    };
}

// Export configuration interface
window.InduxAppwriteAuthConfig = {
    getAppwriteConfig,
    getAppwriteClient,
    ensureManifest
};