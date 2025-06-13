/**
 * Indux Persistence Plugin
 */

function initializePersistPlugin() {

    // Create persistence manager
    const persistenceManager = {
        storage: null,
        initialValues: new Map(), // Store initial values

        init() {
            try {
                this.storage = localStorage;
            } catch (error) {
                const tempStorage = new Map();
                this.storage = {
                    getItem: tempStorage.get.bind(tempStorage),
                    setItem: tempStorage.set.bind(tempStorage),
                    removeItem: tempStorage.delete.bind(tempStorage)
                };
            }
        },

        hasValue(key) {
            return this.storage.getItem(key) !== null;
        },

        getValue(key) {
            return JSON.parse(this.storage.getItem(key));
        },

        setValue(key, value) {
            this.storage.setItem(key, JSON.stringify(value));
        },

        clearAll() {
            // Get all keys from localStorage
            const keys = Object.keys(localStorage);
            // Remove all keys that start with 'x-persist-'
            keys.forEach(key => {
                if (key.startsWith('x-persist-')) {
                    localStorage.removeItem(key);
                }
            });
            // Trigger a custom event to notify components
            window.dispatchEvent(new CustomEvent('persistence-cleared'));
        }
    };

    // Initialize storage
    persistenceManager.init();

    // Add x-persist directive
    Alpine.directive('persist', (el, { value, modifiers, expression }, { evaluate, effect }) => {
        // Handle clear modifier
        if (modifiers.includes('clear')) {
            el.addEventListener('click', () => {
                persistenceManager.clearAll();
            });
            return;
        }

        const key = value || expression;
        if (!key) {
            return;
        }

        // Create a unique key for this persistence
        const persistKey = `x-persist-${key}`;

        // Store initial value
        const initialValue = evaluate(expression);
        persistenceManager.initialValues.set(persistKey, initialValue);

        // Get initial value from storage
        if (persistenceManager.hasValue(persistKey)) {
            const storedValue = persistenceManager.getValue(persistKey);
            evaluate(`${expression} = ${JSON.stringify(storedValue)}`);
        }

        // Set up reactivity
        effect(() => {
            const currentValue = evaluate(expression);
            persistenceManager.setValue(persistKey, currentValue);
        });

        // Listen for clear events
        window.addEventListener('persistence-cleared', () => {
            const initialValue = persistenceManager.initialValues.get(persistKey);
            if (initialValue !== undefined) {
                evaluate(`${expression} = ${JSON.stringify(initialValue)}`);
            }
        });
    });

    // Add $persist magic method
    Alpine.magic('persist', (el) => ({
        get(key) {
            return persistenceManager.getValue(`x-persist-${key}`);
        },
        set(key, value) {
            persistenceManager.setValue(`x-persist-${key}`, value);
        },
        has(key) {
            return persistenceManager.hasValue(`x-persist-${key}`);
        },
        clear() {
            persistenceManager.clearAll();
        }
    }));
}

// Handle both DOMContentLoaded and alpine:init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Alpine) initializePersistPlugin()
    })
}

document.addEventListener('alpine:init', initializePersistPlugin) 