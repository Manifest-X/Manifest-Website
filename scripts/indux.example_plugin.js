/**
 * Indux Example Plugin
 * 
 * This is a template plugin demonstrating how to create plugins for Indux.
 * Copy this file and modify it to create your own plugin.
 * 
 * Features demonstrated:
 * - Plugin registration
 * - Alpine.js integration
 * - DOM manipulation
 * - Event handling
 * - State management
 * - Cleanup
 */

// Plugin definition
window.InduxExamplePlugin = {
    // Required: Plugin name (used for registration)
    name: 'example',

    // Optional: Plugin version
    version: '1.0.0',

    // Optional: Plugin dependencies
    dependencies: {
        // List other plugins this plugin depends on
        // Example: 'icon': '1.0.0'
    },

    // Required: Plugin initialization
    async init(Alpine) {
        console.log('[Indux Example Plugin] Initializing...', {
            isInHead: this._isInHead,
            documentReady: document.readyState,
            hasAlpine: !!window.Alpine
        });

        // Wait for DOM if needed
        if (!this._isInHead && document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve, { once: true });
            });
        }

        // Initialize plugin features
        this._initFeatures();
        this._registerAlpineDirectives(Alpine);
        this._setupEventListeners();

        // If Alpine is already initialized, reinitialize directives
        if (Alpine.isInitialized) {
            this.onAlpineInit(Alpine);
        }
    },

    // Optional: Handle Alpine initialization
    onAlpineInit(Alpine) {
        // Re-register directives for any new elements
        this._registerAlpineDirectives(Alpine);
    },

    // Private methods
    _isInHead: document.currentScript?.parentNode === document.head,

    // Initialize plugin features
    _initFeatures() {
        // Example: Process existing elements
        document.querySelectorAll('[data-example]').forEach(el => {
            this._handleElement(el);
        });

        // Example: Watch for new elements
        this._observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.matches('[data-example]')) {
                            this._handleElement(node);
                        }
                        node.querySelectorAll('[data-example]').forEach(el => {
                            this._handleElement(el);
                        });
                    }
                });
            });
        });

        this._observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    // Register Alpine directives
    _registerAlpineDirectives(Alpine) {
        // Example directive
        Alpine.directive('example', (el, { expression, modifiers }, { effect, evaluateLater }) => {
            console.log('[Indux Example Plugin] Processing example directive:', {
                expression,
                modifiers,
                element: el
            });

            // Handle different expression types
            const isBound = modifiers.includes('bind');
            const isContentRef = expression.startsWith('$');
            const isRawValue = !isBound && !isContentRef &&
                !expression.includes("'") &&
                !expression.includes('"') &&
                !expression.includes('?') &&
                !expression.includes('.');

            // For raw values, wrap in quotes
            const safeExpression = isRawValue ? `'${expression}'` : expression;
            const evaluate = evaluateLater(safeExpression);

            effect(() => {
                evaluate(value => {
                    console.log('[Indux Example Plugin] Evaluating value:', value);
                    if (!value) return;

                    // Handle the value
                    this._handleElement(el, value);
                });
            });
        });

        // Example magic property
        Alpine.magic('example', () => ({
            // Add your magic methods here
            doSomething: () => {
                console.log('[Indux Example Plugin] Magic method called');
            }
        }));
    },

    // Setup event listeners
    _setupEventListeners() {
        // Example: Global event listener
        this._globalListener = (event) => {
            if (event.target.matches('[data-example]')) {
                console.log('[Indux Example Plugin] Event caught:', event);
            }
        };

        document.addEventListener('click', this._globalListener);
    },

    // Handle individual element
    _handleElement(el, value = null) {
        if (el.hasAttribute('data-example-processed')) return;

        // Process the element
        const staticValue = el.getAttribute('data-example');
        const dynamicValue = el.getAttribute('x-bind:data-example') || el.getAttribute(':data-example');

        if (staticValue || dynamicValue || value) {
            // Handle the element
            console.log('[Indux Example Plugin] Processing element:', {
                staticValue,
                dynamicValue,
                value
            });

            // Mark as processed
            el.setAttribute('data-example-processed', 'true');
        }
    },

    // Required: Cleanup function
    cleanup() {
        // Remove all processed elements
        document.querySelectorAll('[data-example-processed]').forEach(el => {
            el.removeAttribute('data-example-processed');
        });

        // Remove event listeners
        if (this._globalListener) {
            document.removeEventListener('click', this._globalListener);
        }

        // Disconnect observer
        if (this._observer) {
            this._observer.disconnect();
        }
    }
};

// Self-register the plugin
if (window.Indux?.plugins) {
    window.Indux.plugins.register('example', window.InduxExamplePlugin);
} else {
    // Watch for Indux core to be added to window
    const observer = new MutationObserver((mutations, obs) => {
        if (window.Indux?.plugins) {
            window.Indux.plugins.register('example', window.InduxExamplePlugin);
            obs.disconnect();
        }
    });

    observer.observe(window, {
        attributes: true,
        attributeFilter: ['Indux']
    });
} 