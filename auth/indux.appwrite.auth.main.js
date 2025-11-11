/*  Indux Appwrite Auth
/*  By Andrew Matlock under MIT license
/*  https://github.com/andrewmatlock/Indux
/*
/*  Supports authentication with an Appwrite project
/*  Requires Alpine JS (alpinejs.dev) to operate
*/

// Initialize auth plugin - orchestrates all modules
let _pluginInitializing = false;
async function initializeAppwriteAuthPlugin() {
    if (_pluginInitializing) {
        return;
    }

    // Wait for dependencies
    if (!window.InduxAppwriteAuthConfig) {
        console.error('[Indux Appwrite Auth] Config not available');
        return;
    }

    if (typeof Alpine === 'undefined') {
        console.error('[Indux Appwrite Auth] Alpine is not available');
        return;
    }

    _pluginInitializing = true;

    // Wait for store to be ready
    const waitForStore = () => {
        const store = Alpine.store('auth');
        if (store) {
            // Initialize store first
            if (!store._initialized && !store._initializing) {
                store.init();
            }
            
            // After store init, process callbacks and validate config
            window.addEventListener('indux:auth:initialized', async () => {
                // Validate role configuration if roles module is loaded
                if (store.validateRoleConfig) {
                    const validation = await store.validateRoleConfig();
                    if (!validation.valid) {
                        console.error('[Indux Appwrite Auth] Invalid role configuration:');
                        if (validation.errors && validation.errors.length > 0) {
                            validation.errors.forEach(err => console.error(`  - ${err}`));
                        } else if (validation.error) {
                            console.error(`  - ${validation.error}`);
                        }
                    } else if (validation.warnings && validation.warnings.length > 0) {
                        validation.warnings.forEach(warn => console.warn(`  - ${warn}`));
                    }
                }
                
                // Process callbacks after store is initialized
                if (window.InduxAppwriteAuthCallbacks) {
                    console.log('[Indux Appwrite Auth] Main: Processing callbacks after store initialization');
                    const callbackInfo = window.InduxAppwriteAuthCallbacks.detect();
                    console.log('[Indux Appwrite Auth] Main: Callback detection result:', {
                        hasCallback: callbackInfo.hasCallback,
                        hasExpired: callbackInfo.hasExpired,
                        isTeamInvite: callbackInfo.isTeamInvite
                    });
                    if (callbackInfo.hasCallback || callbackInfo.hasExpired) {
                        console.log('[Indux Appwrite Auth] Main: Processing callback');
                        window.InduxAppwriteAuthCallbacks.process(callbackInfo);
                    } else {
                        console.log('[Indux Appwrite Auth] Main: No callback detected, skipping');
                    }
                } else {
                    console.warn('[Indux Appwrite Auth] Main: InduxAppwriteAuthCallbacks not available');
                }
                
                // If no session and guest-auto is enabled, create guest session
                if (!store.isAuthenticated && store._guestAuto && store._createAnonymousSession) {
                    store._createAnonymousSession();
                }
            }, { once: true });
            
            _pluginInitializing = false;
        } else {
            setTimeout(waitForStore, 50);
        }
    };

    // Start waiting after a short delay
    setTimeout(waitForStore, 150);
}

// Handle initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Alpine) initializeAppwriteAuthPlugin();
    });
}

document.addEventListener('alpine:init', initializeAppwriteAuthPlugin);

// Export main interface
window.InduxAppwriteAuth = {
    initialize: initializeAppwriteAuthPlugin
};