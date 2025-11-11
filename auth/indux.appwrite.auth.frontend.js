/* Auth frontend */

// Initialize $auth magic method
function initializeAuthMagic() {
    if (typeof Alpine === 'undefined') {
        return false;
    }

    // Add $auth magic method (like $locale, $theme)
    Alpine.magic('auth', () => {
        const store = Alpine.store('auth');
        if (!store) {
            console.warn('[Indux Appwrite Auth] Auth store not available');
            return {};
        }
        
        return new Proxy({}, {
            get(target, prop) {
                // Handle special keys
                if (prop === Symbol.iterator || prop === 'then' || prop === 'catch' || prop === 'finally') {
                    return undefined;
                }

                // Direct store property access
                if (prop in store) {
                    const value = store[prop];
                    // If it's a function, bind it to store context
                    if (typeof value === 'function') {
                        return value.bind(store);
                    }
                    return value;
                }
                
                // Special handling for computed properties
                if (prop === 'method') {
                    return store.getMethod();
                }
                
                if (prop === 'provider') {
                    // getProvider() is synchronous but may trigger async fetch in background
                    return store.getProvider();
                }
                
                return undefined;
            },
            set(target, prop, value) {
                // Forward assignments to the store for two-way binding (x-model)
                if (prop in store) {
                    store[prop] = value;
                    return true;
                }
                // Allow setting new properties (though they won't persist)
                target[prop] = value;
                return true;
            }
        });
    });
    
    return true;
}

// Handle both DOMContentLoaded and alpine:init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Alpine) {
            initializeAuthMagic();
        }
    });
}

document.addEventListener('alpine:init', () => {
    try {
        initializeAuthMagic();
    } catch (error) {
        console.error('[Indux Appwrite Auth] Failed to initialize magic method:', error);
    }
});

// Also try immediately if Alpine is already available
if (typeof Alpine !== 'undefined') {
    try {
        initializeAuthMagic();
    } catch (error) {
        // Alpine might not be fully initialized yet, that's okay
    }
}

// Export magic interface
window.InduxAppwriteAuthMagic = {
    initialize: initializeAuthMagic
};