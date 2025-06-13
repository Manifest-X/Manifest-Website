// Browser runtime compiler
class TailwindCompiler {
    constructor(options = {}) {
        // Create style element immediately
        this.styleElement = document.createElement('style');
        this.styleElement.id = 'tailwind-styles';
        document.head.appendChild(this.styleElement);

        // Initialize properties
        this.tailwindLink = null;
        this.observer = null;
        this.isCompiling = false;
        this.compileTimeout = null;
        this.cache = new Map();
        this.lastThemeHash = null;
        this.processedElements = new WeakSet();
        this.activeBreakpoints = new Set();
        this.activeModifiers = new Set();
        this.cssFiles = new Set();
        this.pendingStyles = new Map();
        this.currentThemeVars = new Map();
        this.hasInitialized = false;
        this.options = {
            rootSelector: options.rootSelector || ':root',
            themeSelector: options.themeSelector || '@theme',
            debounceTime: options.debounceTime || 50,
            maxCacheAge: options.maxCacheAge || 24 * 60 * 60 * 1000,
            debug: options.debug || true,
            ...options
        };

        // Load cache and start processing
        this.loadAndApplyCache();
        this.waitForTailwind().then(() => this.startProcessing());
    }

    // Wait for Tailwind to be available
    async waitForTailwind() {
        // Check if Tailwind is already available
        if (this.isTailwindAvailable()) {
            return;
        }

        // Wait for Tailwind to be available
        return new Promise(resolve => {
            const checkInterval = setInterval(() => {
                if (this.isTailwindAvailable()) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 50);

            // Also check on DOMContentLoaded
            document.addEventListener('DOMContentLoaded', () => {
                if (this.isTailwindAvailable()) {
                    clearInterval(checkInterval);
                    resolve();
                }
            });

            // Set a timeout to prevent infinite waiting
            setTimeout(() => {
                clearInterval(checkInterval);
                console.warn('[TailwindCompiler] Tailwind not found after 5 seconds, proceeding anyway');
                resolve();
            }, 5000);
        });
    }

    // Check if Tailwind is available
    isTailwindAvailable() {
        // Check for Tailwind in various ways
        return (
            // Check for Tailwind CSS file
            Array.from(document.styleSheets).some(sheet =>
                sheet.href && (
                    sheet.href.includes('tailwind') ||
                    sheet.href.includes('tailwindcss')
                )
            ) ||
            // Check for Tailwind classes in document
            document.querySelector('[class*="tailwind"]') ||
            // Check for Tailwind in window object
            window.tailwind ||
            // Check for Tailwind in document head
            document.head.innerHTML.includes('tailwind')
        );
    }

    log(...args) {
        if (this.options.debug) {
            // Only log errors and warnings
            if (args[0]?.includes('Error') || args[0]?.includes('Warning')) {
                console.log('[TailwindCompiler]', ...args);
            }
        }
    }

    loadAndApplyCache() {
        try {
            const cached = localStorage.getItem('tailwind-cache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.cache = new Map(Object.entries(parsed));

                // Apply the most recent cached styles immediately
                const mostRecentCache = Array.from(this.cache.entries())
                    .sort((a, b) => b[1].timestamp - a[1].timestamp)[0];

                if (mostRecentCache) {
                    this.styleElement.textContent = mostRecentCache[1].css;
                    this.lastThemeHash = mostRecentCache[1].themeHash;
                }
            }
        } catch (error) {
            console.warn('Failed to load cached styles:', error);
        }
    }

    async startProcessing() {
        try {
            // Start initial compilation immediately
            const initialCompilation = this.compile();

            // Set up observer while compilation is running
            this.observer = new MutationObserver((mutations) => {
                const relevantMutations = mutations.filter(mutation => {
                    if (mutation.type === 'attributes' &&
                        mutation.attributeName === 'class') {
                        return true;
                    }
                    if (mutation.type === 'childList') {
                        return Array.from(mutation.addedNodes).some(node =>
                            node.nodeType === Node.ELEMENT_NODE);
                    }
                    return false;
                });

                if (relevantMutations.length === 0) return;

                // Check if there are any new classes that need processing
                const newClasses = this.getUsedClasses();
                if (newClasses.length === 0) return;

                if (this.compileTimeout) {
                    clearTimeout(this.compileTimeout);
                }
                this.compileTimeout = setTimeout(() => {
                    if (!this.isCompiling) {
                        this.compile();
                    }
                }, this.options.debounceTime);
            });

            // Start observing immediately
            this.observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });

            // Wait for initial compilation
            await initialCompilation;
            this.hasInitialized = true;
        } catch (error) {
            console.error('Error starting Tailwind compiler:', error);
        }
    }

    discoverCssFiles() {
        try {
            // Get all stylesheets from the document
            const stylesheets = Array.from(document.styleSheets);

            // Process each stylesheet
            for (const sheet of stylesheets) {
                try {
                    // Only process local files
                    if (sheet.href && sheet.href.startsWith(window.location.origin)) {
                        this.cssFiles.add(sheet.href);
                    }

                    // Get all @import rules
                    const rules = Array.from(sheet.cssRules || []);
                    for (const rule of rules) {
                        if (rule.type === CSSRule.IMPORT_RULE &&
                            rule.href.startsWith(window.location.origin)) {
                            this.cssFiles.add(rule.href);
                        }
                    }
                } catch (e) {
                    // Skip stylesheets that can't be accessed due to CORS
                    console.warn('Skipped stylesheet due to CORS:', sheet.href || 'inline');
                }
            }

            // Add any inline styles
            const styleElements = document.querySelectorAll('style');
            for (const style of styleElements) {
                if (style.textContent) {
                    const id = style.id || 'inline-style';
                    this.cssFiles.add('inline:' + id);
                }
            }
        } catch (error) {
            console.warn('Error discovering CSS files:', error);
        }
    }

    loadPersistentCache() {
        try {
            const cached = localStorage.getItem('tailwind-cache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.cache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load cached styles:', error);
        }
    }

    savePersistentCache() {
        try {
            const serialized = JSON.stringify(Object.fromEntries(this.cache));
            localStorage.setItem('tailwind-cache', serialized);
        } catch (error) {
            console.warn('Failed to save cached styles:', error);
        }
    }

    // Generate a hash of the theme variables to detect changes
    generateThemeHash(themeCss) {
        return btoa(themeCss).slice(0, 8); // Simple hash of theme content
    }

    // Clean up old cache entries
    cleanupCache() {
        const now = Date.now();
        const maxAge = this.options.maxCacheAge;
        const entriesToDelete = [];

        for (const [key, value] of this.cache.entries()) {
            if (value.timestamp && (now - value.timestamp > maxAge)) {
                entriesToDelete.push(key);
            }
        }

        for (const key of entriesToDelete) {
            this.cache.delete(key);
        }

        if (entriesToDelete.length > 0) {
            this.savePersistentCache();
        }
    }

    getUsedClasses() {
        try {
            // Only process new elements since last compilation
            const elements = document.querySelectorAll('*');
            const usedClasses = new Set();

            for (const element of elements) {
                // Skip if already processed
                if (this.processedElements.has(element)) continue;

                // Mark element as processed
                this.processedElements.add(element);

                // Handle different types of className
                let classes = [];
                if (typeof element.className === 'string') {
                    classes = element.className.split(' ');
                } else if (element.classList) {
                    classes = Array.from(element.classList);
                }

                for (const cls of classes) {
                    if (cls) {
                        // Handle modifiers
                        const baseClass = cls.replace(/^[!]/, ''); // Remove !important
                        const parts = baseClass.split(':');
                        const mainClass = parts[parts.length - 1]; // Get the actual class name

                        // Track active modifiers
                        parts.slice(0, -1).forEach(mod => {
                            if (mod.startsWith('sm:') || mod.startsWith('md:') ||
                                mod.startsWith('lg:') || mod.startsWith('xl:') ||
                                mod.startsWith('2xl:')) {
                                this.activeBreakpoints.add(mod.split(':')[0]);
                            }
                            this.activeModifiers.add(mod);
                        });

                        // Add both the original and base class
                        usedClasses.add(cls);
                        usedClasses.add(baseClass);
                        usedClasses.add(mainClass);
                    }
                }
            }

            return Array.from(usedClasses);
        } catch (error) {
            console.error('Error getting used classes:', error);
            return [];
        }
    }

    async fetchThemeContent() {
        const themeContents = new Set();
        const fetchPromises = [];

        // If we haven't discovered CSS files yet, do it now
        if (this.cssFiles.size === 0) {
            this.discoverCssFiles();
        }

        // Process all files concurrently
        for (const source of this.cssFiles) {
            const fetchPromise = (async () => {
                try {
                    let content = '';

                    if (source.startsWith('inline:')) {
                        const styleId = source.replace('inline:', '');
                        const styleElement = styleId ?
                            document.getElementById(styleId) :
                            document.querySelector('style');
                        if (styleElement) {
                            content = styleElement.textContent;
                        }
                    } else {
                        // Add timestamp to prevent caching
                        const timestamp = Date.now();
                        const url = `${source}?t=${timestamp}`;

                        const response = await fetch(url, {
                            cache: 'no-store',
                            headers: {
                                'Cache-Control': 'no-cache',
                                'Pragma': 'no-cache'
                            }
                        });

                        if (!response.ok) {
                            console.warn('Failed to fetch stylesheet:', url);
                            return;
                        }

                        content = await response.text();
                    }

                    if (content) {
                        themeContents.add(content);
                    }
                } catch (error) {
                    console.warn(`Error fetching CSS from ${source}:`, error);
                }
            })();
            fetchPromises.push(fetchPromise);
        }

        // Wait for all fetches to complete
        await Promise.all(fetchPromises);

        return Array.from(themeContents).join('\n');
    }

    async processThemeContent(content) {
        try {
            const variables = this.extractThemeVariables(content);
            if (variables.size === 0) {
                return;
            }

            // Only log and process actual changes
            let hasChanges = false;
            for (const [name, value] of variables.entries()) {
                const currentValue = this.currentThemeVars.get(name);
                if (currentValue !== value) {
                    hasChanges = true;
                    this.currentThemeVars.set(name, value);
                }
            }

            if (hasChanges) {
                // Generate utilities for these variables
                const utilities = this.generateUtilitiesFromVars(content, this.getUsedClasses());
                if (!utilities) {
                    return;
                }

                // Update styles immediately with new utilities
                const newStyles = `@layer utilities {\n${utilities}\n}`;
                this.updateStyles(newStyles);
            }

        } catch (error) {
            console.warn('Error processing theme content:', error);
        }
    }

    updateStyles(newStyles) {
        if (!this.styleElement) {
            console.warn('No style element found');
            return;
        }

        this.styleElement.textContent = newStyles;
    }

    extractThemeVariables(cssText) {
        const variables = new Map();
        const patterns = [
            // Match :root variables
            new RegExp(`${this.options.rootSelector}\\s*{([^}]*)}`, 'g'),
            // Match @theme variables
            new RegExp(`${this.options.themeSelector}\\s*{([^}]*)}`, 'g')
        ];

        // Process each pattern in order
        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(cssText)) !== null) {
                const varRegex = /--([\w-]+):\s*([^;]+);/g;
                let varMatch;
                while ((varMatch = varRegex.exec(match[1])) !== null) {
                    const name = varMatch[1];
                    const value = varMatch[2].trim();
                    variables.set(name, value);
                }
            }
        }

        return variables;
    }

    generateUtilitiesFromVars(cssText, usedClasses) {
        try {
            const utilities = [];
            const variables = this.extractThemeVariables(cssText);

            if (variables.size === 0) {
                return '';
            }

            // Create :root block with all CSS variables
            const rootVars = Array.from(variables.entries())
                .map(([name, value]) => `  --${name}: ${value};`);

            const rootBlock = `:root {\n${rootVars.join('\n')}\n}`;
            utilities.push(rootBlock);

            // Generate utilities for each variable
            for (const [varName, varValue] of variables.entries()) {
                // Use raw value if it's not a variable reference, otherwise use var()
                const value = varValue.startsWith('var(--') ? varValue : varValue;

                // Helper to generate utility with modifiers
                const generateUtility = (baseClass, css) => {
                    // Always generate the utility, regardless of whether it's used
                    const utility = `.${baseClass} { ${css} }`;
                    utilities.push(utility);

                    // Generate important version
                    const importantUtility = `.!${baseClass} { ${css} !important; }`;
                    utilities.push(importantUtility);

                    // Generate pseudo-class versions
                    const pseudoClasses = ['hover', 'focus', 'active', 'disabled', 'dark'];
                    for (const pseudo of pseudoClasses) {
                        const pseudoUtility = `.${pseudo}\\:${baseClass}:${pseudo} { ${css} }`;
                        utilities.push(pseudoUtility);
                        const importantPseudoUtility = `.!${pseudo}\\:${baseClass}:${pseudo} { ${css} !important; }`;
                        utilities.push(importantPseudoUtility);
                    }
                };

                // Generate utilities based on variable prefix
                if (varName.startsWith('color-')) {
                    const colorName = varName.replace('color-', '');
                    generateUtility(`text-${colorName}`, `color: ${value}`);
                    generateUtility(`bg-${colorName}`, `background-color: ${value}`);
                    generateUtility(`border-${colorName}`, `border-color: ${value}`);
                    generateUtility(`fill-${colorName}`, `fill: ${value}`);
                    generateUtility(`stroke-${colorName}`, `stroke: ${value}`);
                } else if (varName.startsWith('spacing-')) {
                    const spacingName = varName.replace('spacing-', '');
                    generateUtility(`gap-${spacingName}`, `gap: ${value}`);
                    generateUtility(`p-${spacingName}`, `padding: ${value}`);
                    generateUtility(`px-${spacingName}`, `padding-left: ${value}; padding-right: ${value}`);
                    generateUtility(`py-${spacingName}`, `padding-top: ${value}; padding-bottom: ${value}`);
                    generateUtility(`m-${spacingName}`, `margin: ${value}`);
                    generateUtility(`mx-${spacingName}`, `margin-left: ${value}; margin-right: ${value}`);
                    generateUtility(`my-${spacingName}`, `margin-top: ${value}; margin-bottom: ${value}`);
                    generateUtility(`space-x-${spacingName}`, `> * + * { margin-left: ${value}; }`);
                    generateUtility(`space-y-${spacingName}`, `> * + * { margin-top: ${value}; }`);
                } else if (varName.startsWith('radius-')) {
                    const radiusName = varName.replace('radius-', '');
                    generateUtility(`rounded-${radiusName}`, `border-radius: ${value}`);
                } else if (varName.startsWith('text-')) {
                    const textName = varName.replace('text-', '');
                    generateUtility(`text-${textName}`, `font-size: ${value}`);
                } else if (varName.startsWith('font-weight-')) {
                    const weightName = varName.replace('font-weight-', '');
                    generateUtility(`font-${weightName}`, `font-weight: ${value}`);
                } else if (varName.startsWith('leading-')) {
                    const leadingName = varName.replace('leading-', '');
                    generateUtility(`leading-${leadingName}`, `line-height: ${value}`);
                } else if (varName.startsWith('tracking-')) {
                    const trackingName = varName.replace('tracking-', '');
                    generateUtility(`tracking-${trackingName}`, `letter-spacing: ${value}`);
                } else if (varName.startsWith('shadow-')) {
                    const shadowName = varName.replace('shadow-', '');
                    generateUtility(`shadow-${shadowName}`, `box-shadow: ${value}`);
                } else if (varName.startsWith('blur-')) {
                    const blurName = varName.replace('blur-', '');
                    generateUtility(`blur-${blurName}`, `filter: blur(${value})`);
                } else if (varName.startsWith('container-')) {
                    const containerName = varName.replace('container-', '');
                    generateUtility(`container-${containerName}`, `max-width: ${value}`);
                } else if (varName.startsWith('breakpoint-')) {
                    const breakpointName = varName.replace('breakpoint-', '');
                    utilities.push(`@media (min-width: ${value}) { .breakpoint-${breakpointName} { /* styles */ } }`);
                } else if (varName.startsWith('ease-')) {
                    const easeName = varName.replace('ease-', '');
                    generateUtility(`ease-${easeName}`, `transition-timing-function: ${value}`);
                } else if (varName.startsWith('animate-')) {
                    const animateName = varName.replace('animate-', '');
                    generateUtility(`animate-${animateName}`, `animation: ${value}`);
                }
            }

            return utilities.join('\n');
        } catch (error) {
            console.error('Error generating utilities:', error);
            return '';
        }
    }

    async compile() {
        try {
            if (this.isCompiling) {
                return;
            }
            this.isCompiling = true;
            this.log('Starting compilation');

            // Get used classes
            const usedClasses = this.getUsedClasses();

            // Start fetching theme content
            const themeCss = await this.fetchThemeContent();
            if (!themeCss) {
                return;
            }

            // Process theme content and generate utilities in one pass
            const variables = this.extractThemeVariables(themeCss);
            if (variables.size === 0) {
                return;
            }

            // Update variables and check for changes
            let hasChanges = false;
            for (const [name, value] of variables.entries()) {
                const currentValue = this.currentThemeVars.get(name);
                if (currentValue !== value) {
                    this.log(`Variable changed: ${name}`, {
                        old: currentValue,
                        new: value
                    });
                    hasChanges = true;
                    this.currentThemeVars.set(name, value);
                }
            }

            // Always generate utilities when variables change
            if (hasChanges) {
                this.log('Generating utilities due to variable changes');
                const utilities = this.generateUtilitiesFromVars(themeCss, usedClasses);
                if (!utilities) {
                    this.log('No utilities generated');
                    return;
                }

                this.log('Generated utilities:', utilities.substring(0, 200) + '...');
                const finalCss = `@layer utilities {\n${utilities}\n}`;
                this.styleElement.textContent = finalCss;
                this.log('Applied new styles');

                // Cache the result
                const themeHash = this.generateThemeHash(themeCss);
                const cacheKey = `${themeHash}:${usedClasses.sort().join(',')}`;
                this.cache.set(cacheKey, {
                    css: finalCss,
                    timestamp: Date.now(),
                    themeHash: themeHash
                });
                this.savePersistentCache();
                this.cleanupCache();
            } else {
                this.log('No variable changes detected');
            }

        } catch (error) {
            console.error('Error compiling Tailwind CSS:', error);
        } finally {
            this.isCompiling = false;
        }
    }
}

// Initialize immediately without waiting for DOMContentLoaded
const compiler = new TailwindCompiler();

// Also handle DOMContentLoaded for any elements that might be added later
document.addEventListener('DOMContentLoaded', () => {
    if (!compiler.isCompiling) {
        compiler.compile();
    }
});