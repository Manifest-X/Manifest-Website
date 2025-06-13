/**
 * Indux Components Plugin
 */

// At the very top of the file, before any DOM mutation or plugin logic
if (!window.__induxBodyOrder) {
    try {
        const req = new XMLHttpRequest();
        req.open('GET', '/index.html', false);
        req.send(null);
        if (req.status === 200) {
            let html = req.responseText;
            // Replace all self-closing custom tags with open/close tags, handling spaces before />
            html = html.replace(/<x-([a-z0-9-]+)([^>]*)\s*\/?>/gi, (match, tag, attrs) => `<x-${tag}${attrs}></x-${tag}>`);
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyChildren = Array.from(doc.body.children);
            window.__induxBodyOrder = bodyChildren.map(el => ({
                tag: el.tagName.toLowerCase().trim(),
                isComponent: el.tagName.toLowerCase().startsWith('x-'),
                attrs: Array.from(el.attributes).map(attr => [attr.name, attr.value]),
                key: el.getAttribute('data-component-id') || (el.tagName.toLowerCase().startsWith('x-') ? el.tagName.toLowerCase().replace('x-', '').trim() : null)
            }));
        }
    } catch (e) {
        // Only log actual errors
        console.error('[Indux Debug] Failed to load index.html for body order snapshot', e);
    }
}

// Add style to make placeholders invisible and take up no space
const style = document.createElement('style');
style.textContent = `
    [is-void] { 
        display: none !important;
        margin: 0 !important;
        padding: 0 !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
    }
    [data-pre-rendered] { 
        opacity: 0;
        transition: opacity 0.3s ease-in;
    }
    [data-pre-rendered][data-ready] { 
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Synchronously preload common components
(function preloadCommonComponents() {
    // Force complete reload
    const timestamp = Date.now();

    // Load manifest synchronously with cache busting
    const manifestRequest = new XMLHttpRequest();
    manifestRequest.open('GET', '/manifest.json?t=' + timestamp, false); // false makes it synchronous
    manifestRequest.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    manifestRequest.setRequestHeader('Pragma', 'no-cache');
    manifestRequest.setRequestHeader('Expires', '0');
    manifestRequest.send(null);

    if (manifestRequest.status === 200) {
        window.manifest = JSON.parse(manifestRequest.responseText);

        if (window.manifest?.commonComponents) {
            // Load all common components synchronously
            window.manifest.commonComponents.forEach(path => {
                const name = path.split('/').pop().replace('.html', '');
                const componentRequest = new XMLHttpRequest();
                componentRequest.open('GET', '/' + path + '?t=' + timestamp, false); // false makes it synchronous
                componentRequest.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                componentRequest.setRequestHeader('Pragma', 'no-cache');
                componentRequest.setRequestHeader('Expires', '0');
                componentRequest.send(null);

                if (componentRequest.status === 200) {
                    // Store in window for later use
                    window.__induxCommonComponents = window.__induxCommonComponents || {};
                    window.__induxCommonComponents[name] = componentRequest.responseText;

                    // Find and replace placeholder elements with actual content
                    const placeholders = document.getElementsByTagName(`x-${name}`);
                    Array.from(placeholders).forEach(placeholder => {
                        const container = document.createElement('div');
                        container.innerHTML = componentRequest.responseText.trim();
                        const content = container.firstElementChild;

                        // Copy attributes from placeholder
                        Array.from(placeholder.attributes).forEach(attr => {
                            if (attr.name === 'class') {
                                const existingClass = content.getAttribute('class') || '';
                                content.setAttribute('class', `${existingClass} ${attr.value}`.trim());
                            } else {
                                content.setAttribute(attr.name, attr.value);
                            }
                        });

                        // Mark as pre-rendered
                        content.setAttribute('data-pre-rendered', '');
                        // Add data-component-id for efficient navigation cleanup
                        content.setAttribute('data-component-id', name);

                        // Replace placeholder with content
                        placeholder.parentNode.replaceChild(content, placeholder);

                        // Mark as ready to fade in after a small delay
                        requestAnimationFrame(() => {
                            content.setAttribute('data-ready', '');
                        });
                    });
                }
            });
        }
    }
})();

// Initialize plugin when Alpine is ready
function initializePlugin() {
    // Initialize Alpine store for components
    Alpine.store('components', {
        cache: window.__induxCommonComponents || {},
        registered: new Set(),
        initialized: false
    });

    // Register components from manifest
    async function registerComponents() {
        // Use preloaded manifest
        if (!window.manifest) {
            console.error('[Indux Components] Manifest not found');
            return;
        }

        const store = Alpine.store('components');

        // Register all components in a single pass
        const allComponents = [
            ...(window.manifest?.commonComponents || []),
            ...(window.manifest?.components || [])
        ];

        // Register all components first
        const registrations = allComponents.map(path => {
            const name = path.split('/').pop().replace('.html', '');
            store.registered.add(name);
            const tag = `x-${name}`;
            if (!window.customElements.get(tag)) {
                return new Promise(resolve => {
                    class CustomElement extends HTMLElement {
                        constructor() {
                            super();
                        }
                        connectedCallback() {
                            this.setAttribute('is-void', '');
                        }
                    }
                    window.customElements.define(tag, CustomElement);
                    // Wait for the next microtask to ensure definition is complete
                    queueMicrotask(() => resolve());
                });
            }
            return Promise.resolve();
        });

        // Wait for all registrations to complete
        await Promise.all(registrations);
    }

    // Find components used in the DOM
    function findUsedComponents(node) {
        const usedComponents = new Set();

        function scan(node) {
            if (node.nodeType !== 1) return;

            if (node.tagName?.toLowerCase().startsWith('x-')) {
                const componentName = node.tagName.toLowerCase().replace('x-', '');
                usedComponents.add(componentName);
            }

            Array.from(node.children || []).forEach(scan);
        }

        scan(node);
        return usedComponents;
    }

    // Load component from manifest
    async function loadComponent(name) {
        const store = Alpine.store('components');

        // Check cache first
        if (store.cache[name]) {
            return store.cache[name];
        }

        // Find component path in manifest
        const path = window.manifest?.commonComponents?.find(p =>
            p.split('/').pop().replace('.html', '') === name
        ) || window.manifest?.components?.find(p =>
            p.split('/').pop().replace('.html', '') === name
        );

        if (!path) {
            console.error(`[Indux Components] No path found for component: ${name}`);
            return null;
        }

        try {
            const response = await fetch('/' + path);
            if (!response.ok) throw new Error(`Failed to load component: ${name}`);
            const content = await response.text();
            store.cache[name] = content;
            return content;
        } catch (error) {
            console.error(`[Indux Components] Error loading component ${name}:`, error);
            return null;
        }
    }

    // Process components in order (parents before children)
    const processComponentsInOrder = async () => {
        const components = Array.from(document.querySelectorAll('[is-void]'))
            .filter(el => el.tagName.toLowerCase().startsWith('x-') && document.contains(el));

        // Helper to get element depth
        const getElementDepth = (element) => {
            let depth = 0;
            let current = element;
            while (current.parentElement) {
                depth++;
                current = current.parentElement;
            }
            return depth;
        };

        // Sort components by depth (shallowest first)
        components.sort((a, b) => {
            const depthA = getElementDepth(a);
            const depthB = getElementDepth(b);
            return depthA - depthB;
        });

        // Process components in order
        for (const element of components) {
            if (!document.contains(element)) continue;
            await processComponent(element);
        }

        // After processing all components, check for any nested components that might have been missed
        const remainingComponents = Array.from(document.querySelectorAll('[is-void]'))
            .filter(el => el.tagName.toLowerCase().startsWith('x-') && document.contains(el));

        if (remainingComponents.length > 0) {
            await processComponentsInOrder();
        }
    };

    // Process a single component
    async function processComponent(element) {
        const name = element.tagName.toLowerCase().replace('x-', '');
        const store = Alpine.store('components');

        // Skip if component was pre-rendered or already processed
        if (element.hasAttribute('data-pre-rendered') || element.hasAttribute('data-processed')) {
            return;
        }

        // Check if component is registered
        if (!store.registered.has(name)) {
            console.warn(`[Indux Components] Component not registered: ${name}`);
            return;
        }

        // Check x-route condition if present
        const routeCondition = element.getAttribute('x-route');
        if (routeCondition) {
            const currentPath = window.location.pathname;
            const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/|\/$/g, '');

            // Split into positive and negative conditions
            const conditions = routeCondition.split(',').map(cond => cond.trim());
            const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
            const negativeConditions = conditions
                .filter(cond => cond.startsWith('!'))
                .map(cond => cond.slice(1));

            // Helper to check if a path matches a condition
            const matchesCondition = (path, condition) => {
                // Normalize condition (remove leading/trailing slashes)
                const normalizedCondition = condition.replace(/^\/|\/$/g, '');

                // Special case for root
                if (condition === '/' && path === '/') return true;

                // Check if path starts with condition or matches exactly
                return path === normalizedCondition ||
                    path.startsWith(`${normalizedCondition}/`) ||
                    path === `/${normalizedCondition}`;
            };

            // Check if any negative condition matches
            const hasNegativeMatch = negativeConditions.some(cond =>
                matchesCondition(normalizedPath, cond)
            );

            // Check if any positive condition matches
            const hasPositiveMatch = positiveConditions.length === 0 || positiveConditions.some(cond =>
                matchesCondition(normalizedPath, cond)
            );

            // Show if there's a positive match and no negative match
            const shouldShow = hasPositiveMatch && !hasNegativeMatch;

            if (!shouldShow) {
                // For components, handle head content and children
                if (element.tagName.toLowerCase().startsWith('x-')) {
                    // Remove head content if component is being removed
                    const existingHead = document.head.querySelector(`[data-component-head="${name}"]`);
                    if (existingHead) {
                        existingHead.remove();
                    }

                    // Find and remove all rendered content for this component
                    const renderedContent = document.querySelectorAll(`[data-component="${name}"]`);
                    renderedContent.forEach(content => {
                        content.remove();
                    });

                    // Preserve children before removing component
                    const parent = element.parentElement;
                    if (parent) {
                        const children = Array.from(element.children);
                        children.forEach(child => parent.insertBefore(child, element));
                        element.remove();
                    }
                } else {
                    // For static elements, just hide them
                    element.style.display = 'none';
                }
                return;
            } else if (!element.tagName.toLowerCase().startsWith('x-')) {
                // For static elements that should be shown, ensure they're visible
                element.style.display = '';
            }
        }

        const content = await loadComponent(name);
        if (!content) {
            console.error(`[Indux Components] Failed to load content for: ${name}`);
            element.replaceWith(document.createComment(` Failed to load component: ${name} `));
            return;
        }

        // Create container and parse content
        const container = document.createElement('div');
        container.innerHTML = content.trim();

        // Handle head content if present (for any component)
        const headTemplate = container.querySelector('template[data-head]');
        if (headTemplate) {
            // Remove any existing head content for this component
            const existingHead = document.head.querySelector(`[data-component-head="${name}"]`);
            if (existingHead) {
                existingHead.remove();
            }

            // Move each child from template to document head
            while (headTemplate.content.firstChild) {
                const child = headTemplate.content.firstChild;
                // Skip empty text nodes
                if (child.nodeType === Node.TEXT_NODE && !child.textContent.trim()) {
                    headTemplate.content.removeChild(child);
                    continue;
                }
                // Only set attribute on element nodes
                if (child.nodeType === Node.ELEMENT_NODE) {
                    child.setAttribute('data-component-head', name);
                }
                document.head.appendChild(child);
            }

            // Remove the template from the container
            headTemplate.parentNode.removeChild(headTemplate);
        }

        // Get all top-level elements, excluding any head templates
        const topLevelElements = Array.from(container.children).filter(el =>
            !(el.tagName.toLowerCase() === 'template' && el.hasAttribute('data-head'))
        );

        if (topLevelElements.length === 0) {
            console.error(`[Indux Components] No content in component: ${name}`);
            element.replaceWith(document.createComment(` Empty component: ${name} `));
            return;
        }

        // Get the parent element
        const parent = element.parentElement;
        if (!parent || !document.contains(element)) {
            return;
        }

        // Create a document fragment to hold all top-level elements
        const fragment = document.createDocumentFragment();
        topLevelElements.forEach(el => {
            // Mark rendered content with data-component attribute
            el.setAttribute('data-component', name);
            // Add data-component-id for efficient navigation cleanup
            el.setAttribute('data-component-id', name);
            fragment.appendChild(el);
        });

        // Insert the fragment before the original element
        parent.insertBefore(fragment, element);

        // Collect all children in an array to preserve order
        const children = Array.from(element.children);

        // Reverse the array to fix the order
        children.reverse();

        // Insert children in the correct order
        children.forEach(child => {
            parent.insertBefore(child, element.nextSibling);
        });

        // Mark as processed before removing
        element.setAttribute('data-processed', '');

        // Remove the original element
        element.remove();

        // Process any nested components in the inserted content
        const nestedComponents = Array.from(parent.getElementsByTagName('*'))
            .filter(el => el.tagName.toLowerCase().startsWith('x-'))
            .filter(el => !el.hasAttribute('data-pre-rendered'))
            .filter(el => !el.hasAttribute('data-processed'))
            .filter(el => el.parentElement === parent); // Only process direct children

        // Process nested components
        for (const nestedComponent of nestedComponents) {
            await processComponent(nestedComponent);
        }
    }

    // Initialize plugin
    async function initializeComponentsPlugin() {
        if (Alpine.store('components').initialized) return;

        try {
            // Register components first
            await registerComponents();

            // Helper to check if a path matches a condition
            const matchesCondition = (path, condition) => {
                // Normalize condition (remove leading/trailing slashes)
                const normalizedCondition = condition.replace(/^\/|\/$/g, '');

                // Special case for root
                if (condition === '/' && path === '/') return true;

                // Check if path starts with condition or matches exactly
                return path === normalizedCondition ||
                    path.startsWith(`${normalizedCondition}/`) ||
                    path === `/${normalizedCondition}`;
            };

            // Process all elements with x-route first
            const processRouteElements = () => {
                // Create a document fragment for batch DOM operations
                const fragment = document.createDocumentFragment();
                const routeElements = document.querySelectorAll('[x-route]');
                const currentPath = window.location.pathname;
                const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/|\/$/g, '');

                // First, clean up any existing components that shouldn't be visible
                document.querySelectorAll('[data-component-head]').forEach(head => {
                    const componentName = head.getAttribute('data-component-head');
                    const component = document.querySelector(`x-${componentName}`);
                    if (component) {
                        const routeCondition = component.getAttribute('x-route');
                        if (routeCondition) {
                            const conditions = routeCondition.split(',').map(cond => cond.trim());
                            const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
                            const negativeConditions = conditions
                                .filter(cond => cond.startsWith('!'))
                                .map(cond => cond.slice(1));

                            const hasNegativeMatch = negativeConditions.some(cond =>
                                matchesCondition(normalizedPath, cond)
                            );
                            const hasPositiveMatch = positiveConditions.length === 0 || positiveConditions.some(cond =>
                                matchesCondition(normalizedPath, cond)
                            );

                            if (!hasPositiveMatch || hasNegativeMatch) {
                                head.remove();
                            }
                        }
                    }
                });

                // Process all route elements in one pass
                routeElements.forEach(element => {
                    const routeCondition = element.getAttribute('x-route');
                    if (!routeCondition) return;

                    const conditions = routeCondition.split(',').map(cond => cond.trim());
                    const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
                    const negativeConditions = conditions
                        .filter(cond => cond.startsWith('!'))
                        .map(cond => cond.slice(1));

                    const hasNegativeMatch = negativeConditions.some(cond =>
                        matchesCondition(normalizedPath, cond)
                    );
                    const hasPositiveMatch = positiveConditions.length === 0 || positiveConditions.some(cond =>
                        matchesCondition(normalizedPath, cond)
                    );

                    // Use classList for better performance
                    if (hasPositiveMatch && !hasNegativeMatch) {
                        element.classList.remove('hidden');
                    } else {
                        element.classList.add('hidden');
                    }
                });
            };

            // Find components actually used in the DOM
            const usedComponents = findUsedComponents(document.body);

            // Load only non-cached components
            if (usedComponents.size > 0) {
                const store = Alpine.store('components');
                const componentsToLoad = Array.from(usedComponents)
                    .filter(name => !store.cache[name]);

                if (componentsToLoad.length > 0) {
                    await Promise.all(componentsToLoad.map(name => loadComponent(name)));
                }
            }

            // Add style for route visibility
            const style = document.createElement('style');
            style.textContent = '.hidden { display: none !important; }';
            document.head.appendChild(style);

            // Initial processing - routes first, then components
            processRouteElements();
            await processComponentsInOrder();

            // Set up mutation observer for dynamic elements
            let mutationPending = false;
            const observer = new MutationObserver(mutations => {
                if (mutationPending) return;
                mutationPending = true;
                requestAnimationFrame(async () => {
                    mutationPending = false;
                    const newComponents = new Set();
                    let hasRouteElements = false;
                    mutations.forEach(mutation => {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1) {
                                if (node.hasAttribute('x-route') || node.querySelector('[x-route]')) {
                                    hasRouteElements = true;
                                }
                                Array.from(node.querySelectorAll('[is-void]'))
                                    .filter(el => el.tagName.toLowerCase().startsWith('x-') && document.contains(el))
                                    .forEach(el => newComponents.add(el));
                            }
                        });
                    });
                    if (hasRouteElements) {
                        processRouteElements();
                    }
                    if (newComponents.size > 0) {
                        await processComponentsInOrder();
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // Helper to clean up components
            const cleanupComponents = (currentPath, normalizedPath) => {
                // First, remove all rendered content
                document.querySelectorAll('[data-component]').forEach(content => {
                    const componentName = content.getAttribute('data-component');
                    content.remove();
                });

                // Then remove all head content
                document.querySelectorAll('[data-component-head]').forEach(head => {
                    head.remove();
                });

                // Remove all popover elements
                document.querySelectorAll('[popover]').forEach(popover => {
                    popover.remove();
                });

                // Finally, remove all components
                document.querySelectorAll('[is-void]').forEach(component => {
                    component.remove();
                });

                // Clean up any static elements with x-route that shouldn't be visible
                const routeElements = document.querySelectorAll('[x-route]');
                routeElements.forEach(element => {
                    const routeCondition = element.getAttribute('x-route');
                    if (!routeCondition) return;

                    if (!matchesCondition(normalizedPath, routeCondition)) {
                        element.classList.add('hidden');
                    } else {
                        element.classList.remove('hidden');
                    }
                });
            };

            // Helper: get desired body order for current route
            function getDesiredBodyOrder(normalizedPath) {
                // Use the initial body order as the template
                const initialOrder = window.__induxBodyOrder;
                // Determine which components should be present for this route
                const store = Alpine.store('components');
                const registeredComponents = Array.from(store.registered);
                const commonComponents = registeredComponents.filter(name =>
                    window.manifest?.commonComponents?.some(path =>
                        path.split('/').pop().replace('.html', '') === name
                    )
                );
                const routeComponents = registeredComponents.filter(name =>
                    window.manifest?.pages?.some(page =>
                        page.path.split('/').pop().replace('.html', '') === name &&
                        (page.url === window.location.pathname || page.url === normalizedPath)
                    )
                );
                // Build a set for quick lookup
                const shouldHave = new Set([...commonComponents, ...routeComponents]);
                // Build the desired order: static elements as in initialOrder, components only if shouldHave AND x-route matches
                const desired = initialOrder.map(item => {
                    if (item.isComponent) {
                        const name = item.key;
                        if (!shouldHave.has(name)) { return null; }
                        // Check x-route condition if present
                        let xRoute = null;
                        for (const [k, v] of item.attrs) {
                            if (k === 'x-route') xRoute = v;
                        }
                        if (xRoute) {
                            const conditions = xRoute.split(',').map(cond => cond.trim());
                            const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
                            const negativeConditions = conditions.filter(cond => cond.startsWith('!')).map(cond => cond.slice(1));
                            const hasNegativeMatch = negativeConditions.some(cond => matchesCondition(normalizedPath, cond));
                            const hasPositiveMatch = positiveConditions.length === 0 || positiveConditions.some(cond => matchesCondition(normalizedPath, cond));
                            if (!hasPositiveMatch || hasNegativeMatch) { return null; }
                        }
                        // For route components, update x-route attr
                        const attrs = item.attrs.filter(([k]) => k !== 'x-route');
                        if (routeComponents.includes(name)) {
                            attrs.push(['x-route', normalizedPath]);
                        }
                        return { ...item, attrs };
                    } else {
                        return item; // static element
                    }
                }).filter(Boolean);
                return desired;
            }

            // Utility: Attribute comparison using Map for O(1) lookups
            function attrsEqual(a, b) {
                if (a.length !== b.length) return false;
                const mapA = new Map(a);
                for (const [k, v] of b) {
                    if (mapA.get(k) !== v) return false;
                }
                return true;
            }

            // Consolidated processComponentsInOrder (top-level, async)
            async function processComponentsInOrder() {
                const components = Array.from(document.querySelectorAll('[is-void]'))
                    .filter(el => el.tagName.toLowerCase().startsWith('x-') && document.contains(el));
                // Helper to get element depth
                const getElementDepth = (element) => {
                    let depth = 0;
                    let current = element;
                    while (current.parentElement) {
                        depth++;
                        current = current.parentElement;
                    }
                    return depth;
                };
                // Sort components by depth (shallowest first)
                components.sort((a, b) => getElementDepth(a) - getElementDepth(b));
                for (const element of components) {
                    if (!document.contains(element)) continue;
                    await processComponent(element);
                }
                // After processing all components, check for any nested components that might have been missed
                const remainingComponents = Array.from(document.querySelectorAll('[is-void]'))
                    .filter(el => el.tagName.toLowerCase().startsWith('x-') && document.contains(el));
                if (remainingComponents.length > 0) {
                    await processComponentsInOrder();
                }
            }

            // In reconcileBody, build a map of component IDs to elements and avoid redundant DOM moves
            async function reconcileBody(normalizedPath) {
                const desired = getDesiredBodyOrder(normalizedPath);
                // Build a map of component keys to elements for quick lookup
                const elementMap = new Map();
                Array.from(document.body.children).forEach(el => {
                    const key = el.getAttribute && el.getAttribute('data-component-id');
                    if (key) elementMap.set(key, el);
                });
                let domIdx = 0;
                for (let i = 0; i < desired.length; i++) {
                    const item = desired[i];
                    let node = document.body.children[domIdx];
                    // If node matches desired item and is in correct position, move on
                    if (node && node.tagName.toLowerCase() === item.tag && attrsEqual(Array.from(node.attributes).map(a => [a.name, a.value]), item.attrs)) {
                        domIdx++;
                        continue;
                    }
                    if (item.isComponent) {
                        // Use the map for quick lookup
                        const el = elementMap.get(item.key);
                        if (el && el !== node) {
                            document.body.insertBefore(el, node || null);
                            domIdx++;
                        } else if (!el) {
                            const newEl = document.createElement(item.tag);
                            item.attrs.forEach(([k, v]) => newEl.setAttribute(k, v));
                            document.body.insertBefore(newEl, node || null);
                            domIdx++;
                        } else {
                            domIdx++;
                        }
                    } else {
                        while (node && node.tagName.toLowerCase().startsWith('x-')) {
                            node.remove();
                            node = document.body.children[domIdx];
                        }
                        domIdx++;
                    }
                }
                // Remove any extra trailing components
                while (document.body.children.length > desired.length) {
                    const node = document.body.children[desired.length];
                    if (node.tagName.toLowerCase().startsWith('x-')) {
                        node.remove();
                    } else break;
                }
            }

            // Handle SPA navigation
            document.addEventListener('click', async (e) => {
                const anchor = e.target.closest('a');
                if (!anchor) return;
                const href = anchor.getAttribute('href');
                if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
                e.preventDefault();
                history.pushState(null, '', href);
                await new Promise(resolve => setTimeout(resolve, 0));
                const currentPath = window.location.pathname;
                const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/|\/$/g, '');
                document.querySelectorAll('[x-route]').forEach(element => {
                    const routeCondition = element.getAttribute('x-route');
                    if (!routeCondition) return;
                    const conditions = routeCondition.split(',').map(cond => cond.trim());
                    const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
                    const negativeConditions = conditions.filter(cond => cond.startsWith('!')).map(cond => cond.slice(1));
                    const hasNegativeMatch = negativeConditions.some(cond => matchesCondition(normalizedPath, cond));
                    const hasPositiveMatch = positiveConditions.length === 0 || positiveConditions.some(cond => matchesCondition(normalizedPath, cond));
                    if (hasPositiveMatch && !hasNegativeMatch) {
                        element.classList.remove('hidden');
                    } else {
                        element.classList.add('hidden');
                    }
                });
                await updateComponentsForRoute(normalizedPath);
                if (typeof processComponentsInOrder === 'function') {
                    await processComponentsInOrder();
                } else {
                    const components = Array.from(document.querySelectorAll('[is-void]')).filter(el => el.tagName.toLowerCase().startsWith('x-') && document.contains(el));
                    for (const element of components) {
                        if (!document.contains(element)) continue;
                        await processComponent(element);
                    }
                }
            });

            window.addEventListener('popstate', async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
                const currentPath = window.location.pathname;
                const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/|\/$/g, '');
                document.querySelectorAll('[x-route]').forEach(element => {
                    const routeCondition = element.getAttribute('x-route');
                    if (!routeCondition) return;
                    const conditions = routeCondition.split(',').map(cond => cond.trim());
                    const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
                    const negativeConditions = conditions.filter(cond => cond.startsWith('!')).map(cond => cond.slice(1));
                    const hasNegativeMatch = negativeConditions.some(cond => matchesCondition(normalizedPath, cond));
                    const hasPositiveMatch = positiveConditions.length === 0 || positiveConditions.some(cond => matchesCondition(normalizedPath, cond));
                    if (hasPositiveMatch && !hasNegativeMatch) {
                        element.classList.remove('hidden');
                    } else {
                        element.classList.add('hidden');
                    }
                });
                await updateComponentsForRoute(normalizedPath);
                if (typeof processComponentsInOrder === 'function') {
                    await processComponentsInOrder();
                } else {
                    const components = Array.from(document.querySelectorAll('[is-void]')).filter(el => el.tagName.toLowerCase().startsWith('x-') && document.contains(el));
                    for (const element of components) {
                        if (!document.contains(element)) continue;
                        await processComponent(element);
                    }
                }
            });

            // After cleanupComponents and before processing components:
            // Remove all <x-*> elements from <body>
            Array.from(document.body.children).forEach(el => {
                if (el.tagName.toLowerCase().startsWith('x-')) el.remove();
            });
            // Re-insert components in the correct order
            let lastInserted = null;
            window.__induxBodyOrder.forEach((item, idx) => {
                if (item.isComponent) {
                    if (typeof item.tag === 'string' && item.tag.trim().startsWith('x-')) {
                        let node = document.body.children[idx];
                        if (node && node.tagName.toLowerCase() === item.tag.trim() && node.getAttribute('data-component-id') === item.key) {
                            lastInserted = node;
                            return;
                        }
                        for (let j = idx + 1; j < document.body.children.length; j++) {
                            const test = document.body.children[j];
                            if (test.tagName.toLowerCase() === item.tag.trim() && test.getAttribute('data-component-id') === item.key) {
                                test.remove();
                            }
                        }
                        // Guard: only create element if tag is valid
                        const tag = (item.tag || '').trim();
                        if (!tag || !/^x-[a-z0-9-]+$/i.test(tag)) return;
                        try {
                            const el = document.createElement(tag);
                            el.setAttribute('is-void', '');
                            el.setAttribute('data-component-id', item.key);
                            item.attrs.forEach(([name, value]) => {
                                if (name && name !== 'data-component-id' && name !== 'is-void') {
                                    el.setAttribute(name, value);
                                }
                            });
                            if (lastInserted && lastInserted.nextSibling) {
                                document.body.insertBefore(el, lastInserted.nextSibling);
                            } else if (lastInserted) {
                                document.body.appendChild(el);
                            } else {
                                document.body.insertBefore(el, document.body.firstChild);
                            }
                            lastInserted = el;
                        } catch (err) {
                            console.error('[Indux] Failed to create element:', {
                                tag,
                                item,
                                error: err.message
                            });
                        }
                    }
                } else {
                    const staticEl = Array.from(document.body.children).find(child =>
                        child.tagName.toLowerCase() === item.tag.trim() &&
                        item.attrs.every(([name, value]) => child.getAttribute(name) === value)
                    );
                    if (staticEl) {
                        lastInserted = staticEl;
                    }
                }
            });

            Alpine.store('components').initialized = true;
        } catch (error) {
            console.error('[Indux Components] Failed to initialize:', error);
        }
    }

    // Start initialization
    initializeComponentsPlugin();
}

// Check for Alpine and initialize
function checkAlpine() {
    // Check for Alpine object or Alpine.init
    if (window.Alpine || (window.Alpine && window.Alpine.init)) {
        initializePlugin();
    } else {
        // Also check for alpine:init event
        document.addEventListener('alpine:init', () => {
            initializePlugin();
        }, { once: true });

        setTimeout(checkAlpine, 100);
    }
}

// Wait for DOM to be ready, then check for Alpine
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        checkAlpine();
    });
} else {
    checkAlpine();
}

// Global error handler
window.addEventListener('error', function (e) {
    console.error('[Indux Debug] Global error:', e.message, e);
});

// Utility: Route condition matcher (shared)
function matchesCondition(path, condition) {
    const normalizedCondition = condition.replace(/^\/|\/$/g, '');
    if (condition === '/' && path === '/') return true;
    return path === normalizedCondition ||
        path.startsWith(`${normalizedCondition}/`) ||
        path === `/${normalizedCondition}`;
}

function getActiveComponentNamesForRoute(normalizedPath) {
    const store = Alpine.store('components');
    const registeredComponents = Array.from(store.registered);
    const commonComponents = registeredComponents.filter(name =>
        window.manifest?.commonComponents?.some(path =>
            path.split('/').pop().replace('.html', '') === name
        )
    );
    const routeComponents = registeredComponents.filter(name =>
        window.manifest?.pages?.some(page =>
            page.path.split('/').pop().replace('.html', '') === name &&
            (page.url === window.location.pathname || page.url === normalizedPath)
        )
    );
    return [...commonComponents, ...routeComponents].filter(name => {
        // Check x-route condition if present in manifest
        const el = document.querySelector(`[data-component-id="${name}"]`);
        if (el && el.hasAttribute('x-route')) {
            const xRoute = el.getAttribute('x-route');
            if (xRoute) {
                const conditions = xRoute.split(',').map(cond => cond.trim());
                const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
                const negativeConditions = conditions.filter(cond => cond.startsWith('!')).map(cond => cond.slice(1));
                const hasNegativeMatch = negativeConditions.some(cond => routeMatches(cond, normalizedPath));
                const hasPositiveMatch = positiveConditions.length === 0 || positiveConditions.some(cond => routeMatches(cond, normalizedPath));
                if (!hasPositiveMatch || hasNegativeMatch) return false;
            }
        }
        return true;
    });
}

// Unified route normalization and matching
function normalizeRoute(route) {
    if (!route) return '/';
    // Remove leading/trailing slashes, but keep root as '/'
    const trimmed = route.trim();
    if (trimmed === '' || trimmed === '/') return '/';
    return trimmed.replace(/^\/+|\/+$/g, '');
}
function routeMatches(a, b) {
    // Normalize both sides
    const normA = normalizeRoute(a);
    const normB = normalizeRoute(b);
    // Root matches root
    if (normA === '/' && normB === '/') return true;
    // Exact match
    if (normA === normB) return true;
    // Allow /foo to match foo, /foo/, etc
    return normA === normB.replace(/^\/+|\/+$/g, '') || normB === normA.replace(/^\/+|\/+$/g, '');
}

async function updateComponentsForRoute(normalizedPath) {
    const store = Alpine.store('components');
    const registeredComponents = Array.from(store.registered);
    const commonComponents = registeredComponents.filter(name =>
        window.manifest?.commonComponents?.some(path =>
            path.split('/').pop().replace('.html', '') === name
        )
    );
    const routeComponents = registeredComponents.filter(name =>
        window.manifest?.pages?.some(page =>
            page.path.split('/').pop().replace('.html', '') === name &&
            routeMatches(page.url, normalizedPath)
        )
    );

    function shouldBeActive(name) {
        const originalComponent = window.__induxBodyOrder.find(item =>
            item.isComponent && item.key === name
        );
        if (!originalComponent) return false;
        const xRoute = originalComponent.attrs.find(([k]) => k === 'x-route')?.[1];
        if (!xRoute) return true;
        const conditions = xRoute.split(',').map(cond => cond.trim());
        const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
        const negativeConditions = conditions.filter(cond => cond.startsWith('!')).map(cond => cond.slice(1));
        const hasNegativeMatch = negativeConditions.some(cond => routeMatches(cond, normalizedPath));
        const hasPositiveMatch = positiveConditions.length === 0 || positiveConditions.some(cond => routeMatches(cond, normalizedPath));
        return hasPositiveMatch && !hasNegativeMatch;
    }

    const activeNames = [...commonComponents, ...routeComponents].filter(name => shouldBeActive(name));

    // Create a map of existing pre-rendered components
    const preRenderedMap = new Map();
    document.querySelectorAll('[data-pre-rendered]').forEach(el => {
        const componentId = el.getAttribute('data-component-id');
        if (componentId) {
            preRenderedMap.set(componentId, el);
        }
    });

    // Remove all non-pre-rendered components and their content
    Array.from(document.body.children).forEach(el => {
        if (el.tagName.toLowerCase().startsWith('x-') ||
            (el.hasAttribute('data-component') && !el.hasAttribute('data-pre-rendered'))) {
            el.remove();
        }
    });

    // Insert placeholders for all components in canonical order if they should be active
    let lastInserted = null;
    window.__induxBodyOrder.forEach((item, idx) => {
        if (item.isComponent) {
            const name = item.key;
            if (activeNames.includes(name)) {
                // Check if we have a pre-rendered version
                const preRendered = preRenderedMap.get(name);
                if (preRendered) {
                    // Move pre-rendered component to correct position
                    if (lastInserted && lastInserted.nextSibling) {
                        document.body.insertBefore(preRendered, lastInserted.nextSibling);
                    } else if (lastInserted) {
                        document.body.appendChild(preRendered);
                    } else {
                        document.body.insertBefore(preRendered, document.body.firstChild);
                    }
                    lastInserted = preRendered;
                } else {
                    // Create new placeholder if no pre-rendered version exists
                    const tag = (item.tag || '').trim();
                    if (!tag || !/^x-[a-z0-9-]+$/i.test(tag)) return;
                    try {
                        const el = document.createElement(tag);
                        el.setAttribute('is-void', '');
                        el.setAttribute('data-component-id', name);
                        item.attrs.forEach(([name, value]) => {
                            if (name && name !== 'data-component-id' && name !== 'is-void') {
                                el.setAttribute(name, value);
                            }
                        });
                        if (lastInserted && lastInserted.nextSibling) {
                            document.body.insertBefore(el, lastInserted.nextSibling);
                        } else if (lastInserted) {
                            document.body.appendChild(el);
                        } else {
                            document.body.insertBefore(el, document.body.firstChild);
                        }
                        lastInserted = el;
                    } catch (err) {
                        console.error('[Indux] Failed to create element:', {
                            tag,
                            item,
                            error: err.message
                        });
                    }
                }
            }
        } else {
            // Static element: ensure it is present and in correct order
            const staticEl = Array.from(document.body.children).find(child =>
                child.tagName.toLowerCase() === item.tag &&
                item.attrs.every(([k, v]) => child.getAttribute(k) === v)
            );
            if (staticEl) {
                lastInserted = staticEl;
            }
        }
    });

    // Remove all rendered content and placeholders for components not in activeNames
    document.querySelectorAll('[data-component]').forEach(content => {
        const componentName = content.getAttribute('data-component');
        if (!activeNames.includes(componentName)) {
            content.remove();
        }
    });
    document.querySelectorAll('[is-void]').forEach(placeholder => {
        const componentName = placeholder.getAttribute('data-component-id');
        if (!activeNames.includes(componentName)) {
            placeholder.remove();
        }
    });
}
