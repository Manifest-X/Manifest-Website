/* Auth callbacks */

// Handle authentication callbacks from URL parameters
// This module coordinates callback detection and delegates to method-specific handlers

function initializeCallbacks() {
    const config = window.InduxAppwriteAuthConfig;
    if (!config) {
        return;
    }

    // Check for callback in URL or sessionStorage
    function detectCallback() {
        const fullUrl = window.location.href;
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        const secret = urlParams.get('secret');
        const expire = urlParams.get('expire');
        
        console.log('[Indux Appwrite Auth] detectCallback: Full URL:', fullUrl.split('?')[0] + (fullUrl.includes('?') ? '?[params]' : ''));
        console.log('[Indux Appwrite Auth] detectCallback: URL params:', {
            userId: userId ? '***' : null,
            secret: secret ? '***' : null,
            expire: expire,
            teamId: urlParams.get('teamId'),
            membershipId: urlParams.get('membershipId'),
            allParams: Array.from(urlParams.keys()),
            allParamValues: Object.fromEntries(urlParams.entries())
        });
        
        // Check for stored callback (from rate limit retry)
        let storedCallback = null;
        try {
            const stored = sessionStorage.getItem('indux:magic-link:callback');
            if (stored) {
                storedCallback = JSON.parse(stored);
            }
        } catch (e) {
            // Ignore parse errors
        }
        
        // Check OAuth redirect flag
        const isOAuthCallback = sessionStorage.getItem('indux:oauth:redirect') === 'true';
        
        // Check for team invitation (teamId and membershipId in URL)
        const teamId = urlParams.get('teamId');
        const membershipId = urlParams.get('membershipId');
        const isTeamInvite = !!(teamId && membershipId && userId && secret);
        
        const callbackInfo = {
            userId: userId || storedCallback?.userId,
            secret: secret || storedCallback?.secret,
            expire: expire,
            teamId: teamId,
            membershipId: membershipId,
            isOAuth: isOAuthCallback,
            isTeamInvite: isTeamInvite,
            hasCallback: !!(userId || storedCallback?.userId) && !!(secret || storedCallback?.secret),
            hasExpired: !!expire && !userId && !secret
        };
        
        console.log('[Indux Appwrite Auth] detectCallback result:', {
            ...callbackInfo,
            userId: callbackInfo.userId ? '***' : null,
            secret: callbackInfo.secret ? '***' : null
        });
        
        return callbackInfo;
    }

    // Clean up URL parameters
    function cleanupUrl() {
        const url = new URL(window.location.href);
        const paramsToRemove = ['userId', 'secret', 'expire', 'project', 'teamId', 'membershipId'];
        paramsToRemove.forEach(param => {
            while (url.searchParams.has(param)) {
                url.searchParams.delete(param);
            }
        });
        url.hash = '';
        window.history.replaceState({}, '', url.toString());
    }

    // Process callback - delegates to method-specific handlers
    async function processCallback(callbackInfo) {
        console.log('[Indux Appwrite Auth] processCallback called:', {
            ...callbackInfo,
            userId: callbackInfo.userId ? '***' : null,
            secret: callbackInfo.secret ? '***' : null
        });
        
        const store = Alpine.store('auth');
        if (!store || !store._appwrite) {
            console.warn('[Indux Appwrite Auth] processCallback: Store or appwrite not available');
            return { handled: false };
        }

        const appwrite = store._appwrite;

        // Clean up URL immediately
        cleanupUrl();

        // Handle expired magic link
        if (callbackInfo.hasExpired) {
            console.log('[Indux Appwrite Auth] processCallback: Handling expired callback');
            // Dispatch event for magic link handler
            window.dispatchEvent(new CustomEvent('indux:auth:callback:expired', {
                detail: callbackInfo
            }));
            return { handled: true, type: 'expired' };
        }

        // Handle valid callback (userId + secret)
        if (callbackInfo.hasCallback) {
            if (callbackInfo.isTeamInvite) {
                console.log('[Indux Appwrite Auth] processCallback: Dispatching team invite callback event');
                // Team invitation callback - dispatch event
                window.dispatchEvent(new CustomEvent('indux:auth:callback:team', {
                    detail: callbackInfo
                }));
                return { handled: true, type: 'team' };
            } else if (callbackInfo.isOAuth) {
                console.log('[Indux Appwrite Auth] processCallback: Dispatching OAuth callback event');
                // OAuth callback - dispatch event
                window.dispatchEvent(new CustomEvent('indux:auth:callback:oauth', {
                    detail: callbackInfo
                }));
                return { handled: true, type: 'oauth' };
            } else {
                console.log('[Indux Appwrite Auth] processCallback: Dispatching magic link callback event');
                // Magic link callback - dispatch event
                window.dispatchEvent(new CustomEvent('indux:auth:callback:magic', {
                    detail: callbackInfo
                }));
                return { handled: true, type: 'magic' };
            }
        }

        console.log('[Indux Appwrite Auth] processCallback: No callback detected');
        return { handled: false };
    }

    // Export callback detection and processing
    window.InduxAppwriteAuthCallbacks = {
        detect: detectCallback,
        process: processCallback,
        cleanupUrl
    };
}

// Initialize when config is available
if (window.InduxAppwriteAuthConfig) {
    initializeCallbacks();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.InduxAppwriteAuthConfig) {
            initializeCallbacks();
        }
    });
}