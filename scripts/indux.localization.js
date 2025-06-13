/**
 * Indux Localization Plugin
 */

function initializeLocalizationPlugin() {
    // Initialize empty localization store
    Alpine.store('locale', {
        current: 'en',
        available: [],
        direction: 'ltr',
        _initialized: false
    });

    // Get available locales from manifest
    async function getAvailableLocales() {
        try {
            const response = await fetch('/manifest.json');
            const manifest = await response.json();

            // Get unique locales from collections
            const locales = new Set(['en']); // Always include 'en' as fallback
            if (manifest.collections) {
                Object.values(manifest.collections).forEach(collection => {
                    if (typeof collection === 'object') {
                        Object.keys(collection).forEach(key => {
                            if (key.length === 2) { // Assume 2-letter codes are locales
                                locales.add(key);
                            }
                        });
                    }
                });
            }

            return Array.from(locales);
        } catch (error) {
            console.error('[Indux Localization] Error loading manifest:', error);
            return ['en']; // Fallback to just 'en'
        }
    }

    // Detect initial locale
    function detectInitialLocale(availableLocales) {
        // 1. Check HTML lang attribute
        const htmlLang = document.documentElement.lang;
        if (htmlLang && availableLocales.includes(htmlLang)) {
            return htmlLang;
        }

        // 2. Check URL path
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        if (pathParts[0] && availableLocales.includes(pathParts[0])) {
            return pathParts[0];
        }

        // 3. Check localStorage
        const storedLang = localStorage.getItem('lang');
        if (storedLang && availableLocales.includes(storedLang)) {
            return storedLang;
        }

        // 4. Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (availableLocales.includes(browserLang)) {
            return browserLang;
        }

        // Default to first available locale
        return availableLocales[0];
    }

    // Update locale
    async function setLocale(newLang) {
        const store = Alpine.store('locale');
        if (!store.available.includes(newLang) || newLang === store.current) return;

        try {
            // Update store
            store.current = newLang;
            store._initialized = true;

            // Update HTML
            document.documentElement.lang = newLang;

            // Update localStorage
            localStorage.setItem('lang', newLang);

            // Update URL if needed
            const currentUrl = new URL(window.location.href);
            const pathParts = currentUrl.pathname.split('/').filter(Boolean);

            if (pathParts[0] && store.available.includes(pathParts[0])) {
                // Replace language in path
                pathParts[0] = newLang;
                currentUrl.pathname = '/' + pathParts.join('/');
                window.history.replaceState({}, '', currentUrl);
            }

            // Trigger locale change event
            window.dispatchEvent(new CustomEvent('localechange', {
                detail: { locale: newLang }
            }));

        } catch (error) {
            console.error('[Indux Localization] Error setting locale:', error);
            // Restore previous state
            store.current = localStorage.getItem('lang') || store.available[0];
            document.documentElement.lang = store.current;
        }
    }

    // Add $locale magic method
    Alpine.magic('locale', () => {
        const store = Alpine.store('locale');

        return new Proxy({}, {
            get(target, prop) {
                if (prop === 'current') return store.current;
                if (prop === 'available') return store.available;
                if (prop === 'direction') return store.direction;
                if (prop === 'set') return setLocale;
                if (prop === 'toggle') {
                    return () => {
                        const currentIndex = store.available.indexOf(store.current);
                        const nextIndex = (currentIndex + 1) % store.available.length;
                        setLocale(store.available[nextIndex]);
                    };
                }
                return undefined;
            }
        });
    });

    // Initialize with manifest data
    (async () => {
        const availableLocales = await getAvailableLocales();
        const store = Alpine.store('locale');
        store.available = availableLocales;

        const initialLocale = detectInitialLocale(availableLocales);
        setLocale(initialLocale);
    })();
}

// Handle both DOMContentLoaded and alpine:init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Alpine) initializeLocalizationPlugin();
    });
}

document.addEventListener('alpine:init', initializeLocalizationPlugin); 