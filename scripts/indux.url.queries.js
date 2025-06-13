/**
 * Indux URL Queries Plugin
 * Handles URL query parameter management with Alpine.js integration
 */

function initializeUrlQueriesPlugin() {
    // Initialize empty queries store
    Alpine.store('queries', {
        current: {},
        _initialized: false
    });

    // Cache for debounced updates
    const updateTimeouts = new Map();
    const DEBOUNCE_DELAY = 300;

    // Helper to parse query string
    function parseQueryString(queryString) {
        const params = new URLSearchParams(queryString);
        const result = {};

        for (const [key, value] of params.entries()) {
            // Handle array values (comma-separated)
            if (value.includes(',')) {
                result[key] = value.split(',').filter(Boolean);
            } else {
                result[key] = value;
            }
        }

        return result;
    }

    // Helper to stringify query object
    function stringifyQueryObject(query) {
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(query)) {
            if (Array.isArray(value)) {
                params.set(key, value.filter(Boolean).join(','));
            } else if (value != null && value !== '') {
                params.set(key, value);
            }
        }

        return params.toString();
    }

    // Helper to ensure value is in array format
    function ensureArray(value) {
        if (Array.isArray(value)) return value;
        if (value == null || value === '') return [];
        return [value];
    }

    // Update URL with new query parameters
    async function updateURL(updates, action = 'set') {

        const url = new URL(window.location.href);
        const currentParams = parseQueryString(url.search);

        // Apply updates based on action
        for (const [key, value] of Object.entries(updates)) {
            switch (action) {
                case 'add':
                    const currentAdd = ensureArray(currentParams[key]);
                    const newValues = ensureArray(value);
                    currentParams[key] = [...new Set([...currentAdd, ...newValues])];
                    break;

                case 'remove':
                    const currentRemove = ensureArray(currentParams[key]);
                    const removeValue = ensureArray(value)[0]; // Take first value to remove
                    currentParams[key] = currentRemove.filter(v => v !== removeValue);
                    if (currentParams[key].length === 0) {
                        delete currentParams[key];
                    }
                    break;

                case 'set':
                default:
                    if (value == null || value === '') {
                        delete currentParams[key];
                    } else {
                        currentParams[key] = value;
                    }
                    break;
            }
        }

        // Update URL
        const newQueryString = stringifyQueryObject(currentParams);
        url.search = newQueryString ? `?${newQueryString}` : '';
        console.debug('[Indux URL Queries] New URL:', url.toString());

        // Update URL using pushState to ensure changes are visible
        window.history.pushState({}, '', url.toString());

        // Update store
        Alpine.store('queries', {
            current: currentParams,
            _initialized: true
        });

        // Dispatch event
        document.dispatchEvent(new CustomEvent('query-updated', {
            detail: { updates, action }
        }));

        return currentParams;
    }

    // Add $query magic method
    Alpine.magic('query', () => {
        const store = Alpine.store('queries');

        return new Proxy({}, {
            get(target, prop) {
                // Handle special keys
                if (prop === Symbol.iterator || prop === 'then' || prop === 'catch' || prop === 'finally') {
                    return undefined;
                }

                // Get current value
                const value = store.current[prop];

                // Return a proxy for the value
                return new Proxy({}, {
                    get(target, key) {
                        if (key === 'value') return value;
                        if (key === 'set') return (newValue) => {
                            console.debug(`[Indux URL Queries] Setting ${prop} to:`, newValue);
                            clearTimeout(updateTimeouts.get(prop));
                            const timeout = setTimeout(() => {
                                updateURL({ [prop]: newValue }, 'set');
                            }, DEBOUNCE_DELAY);
                            updateTimeouts.set(prop, timeout);
                        };
                        if (key === 'add') return (newValue) => {
                            console.debug(`[Indux URL Queries] Adding to ${prop}:`, newValue);
                            clearTimeout(updateTimeouts.get(prop));
                            const timeout = setTimeout(() => {
                                updateURL({ [prop]: newValue }, 'add');
                            }, DEBOUNCE_DELAY);
                            updateTimeouts.set(prop, timeout);
                        };
                        if (key === 'remove') return (value) => {
                            console.debug(`[Indux URL Queries] Removing from ${prop}:`, value);
                            clearTimeout(updateTimeouts.get(prop));
                            const timeout = setTimeout(() => {
                                updateURL({ [prop]: value }, 'remove');
                            }, DEBOUNCE_DELAY);
                            updateTimeouts.set(prop, timeout);
                        };
                        if (key === 'clear') return () => {
                            console.debug(`[Indux URL Queries] Clearing ${prop}`);
                            clearTimeout(updateTimeouts.get(prop));
                            const timeout = setTimeout(() => {
                                updateURL({ [prop]: null }, 'set');
                            }, DEBOUNCE_DELAY);
                            updateTimeouts.set(prop, timeout);
                        };
                        return undefined;
                    }
                });
            }
        });
    });

    // Initialize with current URL parameters
    const initialParams = parseQueryString(window.location.search);
    Alpine.store('queries', {
        current: initialParams,
        _initialized: true
    });

    // Listen for popstate events
    window.addEventListener('popstate', () => {
        const params = parseQueryString(window.location.search);
        console.debug('[Indux URL Queries] Popstate params:', params);
        Alpine.store('queries', {
            current: params,
            _initialized: true
        });
    });
}

// Handle both DOMContentLoaded and alpine:init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Alpine) initializeUrlQueriesPlugin();
    });
}

document.addEventListener('alpine:init', initializeUrlQueriesPlugin); 