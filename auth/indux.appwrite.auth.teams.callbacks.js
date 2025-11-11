/* Auth teams - Callback handlers */

// Handle team invitation callbacks via events
function handleTeamCallbacks() {
    // Handle team invitation callback
    window.addEventListener('indux:auth:callback:team', async (event) => {
        console.log('[Indux Appwrite Auth] Team invitation callback event received:', event.detail);
        const store = Alpine.store('auth');
        if (!store) {
            console.warn('[Indux Appwrite Auth] Team callback: Auth store not available');
            return;
        }
        
        const callbackInfo = event.detail;
        console.log('[Indux Appwrite Auth] Team invitation callback detected:', {
            teamId: callbackInfo.teamId,
            membershipId: callbackInfo.membershipId,
            userId: callbackInfo.userId,
            hasSecret: !!callbackInfo.secret
        });
        
        store.inProgress = true;
        store.error = null;

        try {
            // Accept the invitation
            if (store.acceptInvite) {
                console.log('[Indux Appwrite Auth] Team callback: Calling acceptInvite');
                const result = await store.acceptInvite(
                    callbackInfo.teamId,
                    callbackInfo.membershipId,
                    callbackInfo.userId,
                    callbackInfo.secret
                );

                if (result.success) {
                    console.log('[Indux Appwrite Auth] Team invitation accepted successfully');
                    window.dispatchEvent(new CustomEvent('indux:auth:team:invite-accepted', {
                        detail: { membership: result.membership }
                    }));
                } else {
                    console.error('[Indux Appwrite Auth] Team invitation acceptance failed:', result.error);
                    store.error = result.error;
                }
            } else {
                console.warn('[Indux Appwrite Auth] Team callback: acceptInvite method not available');
            }
        } catch (error) {
            console.error('[Indux Appwrite Auth] Failed to process team invitation:', error);
            store.error = error.message;
        } finally {
            store.inProgress = false;
        }
    });
}

// Initialize when Alpine is ready
document.addEventListener('alpine:init', () => {
    try {
        handleTeamCallbacks();
    } catch (error) {
        console.error('[Indux Appwrite Auth] Failed to initialize team callbacks:', error);
    }
});

// Also try immediately if Alpine is already available
if (typeof Alpine !== 'undefined') {
    try {
        handleTeamCallbacks();
    } catch (error) {
        // Alpine might not be fully initialized yet, that's okay
    }
}

// Export callbacks interface
window.InduxAppwriteAuthTeamsCallbacks = {
    handleCallbacks: handleTeamCallbacks
};

