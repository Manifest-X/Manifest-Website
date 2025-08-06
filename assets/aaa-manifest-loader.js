// Manifest loader for Mintlify documentation
// This script creates a mock manifest.json response before Indux plugins load

(function () {
    'use strict';

    // Mock manifest data for the documentation site
    const mockManifest = {
        "name": "Indux Documentation",
        "short_name": "Indux Docs",
        "description": "Documentation for Indux framework",
        "components": [
            "components/header.html",
            "components/footer.html",
            "components/logo.html"
        ],
        "commonComponents": [
            "components/navigation/header.html",
            "components/navigation/logo.html"
        ],
        "collections": {
            "blog": {
                "path": "/collections/blog.json"
            },
            "team": {
                "path": "/collections/team.json"
            }
        },
        "locales": [
            {
                "name": "English",
                "code": "en",
                "icon": "emojione-v1:flag-for-united-kingdom"
            }
        ],
        "defaultMeta": {
            "title": "Indux Documentation",
            "description": "Documentation for Indux framework"
        }
    };

    // Mock component content
    const mockComponents = {
        'components/navigation/header.html': `
<header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
            <x-logo />
            <nav class="hidden md:flex space-x-8">
                <a href="/" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Home</a>
                <a href="/docs" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Docs</a>
                <a href="/examples" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Examples</a>
            </nav>
        </div>
    </div>
</header>`,
        'components/navigation/logo.html': `
<div class="flex items-center">
    <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
    <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white">Indux</span>
</div>`,
        'components/header.html': `
<header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
            <x-logo />
            <nav class="hidden md:flex space-x-8">
                <a href="/" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Home</a>
                <a href="/docs" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Docs</a>
                <a href="/examples" class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Examples</a>
            </nav>
        </div>
    </div>
</header>`,
        'components/footer.html': `
<footer class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 Indux. Built with simplicity in mind.</p>
        </div>
    </div>
</footer>`,
        'components/logo.html': `
<div class="flex items-center">
    <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
    <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white">Indux</span>
</div>`
    };

    // Mock collection data
    const mockCollections = {
        '/collections/blog.json': [
            {
                "title": "Getting Started with Indux",
                "excerpt": "Learn how to build fast, modern websites with Indux.",
                "date": "2024-01-15",
                "author": "Indux Team"
            },
            {
                "title": "Advanced Component Patterns",
                "excerpt": "Discover powerful patterns for building reusable components.",
                "date": "2024-01-20",
                "author": "Indux Team"
            }
        ],
        '/collections/team.json': [
            {
                "name": "John Doe",
                "role": "Lead Developer",
                "image": "https://source.unsplash.com/100x100/?portrait"
            },
            {
                "name": "Jane Smith",
                "role": "Designer",
                "image": "https://source.unsplash.com/100x100/?portrait"
            }
        ]
    };

    // Store original fetch
    const originalFetch = window.fetch;

    // Override fetch to intercept manifest.json and component requests
    window.fetch = function (url, options) {
        // Check if this is a request for manifest.json
        if (typeof url === 'string' && url.includes('/manifest.json')) {
            // Return a mock Response object
            return Promise.resolve({
                ok: true,
                status: 200,
                statusText: 'OK',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                json: () => Promise.resolve(mockManifest),
                text: () => Promise.resolve(JSON.stringify(mockManifest)),
                clone: function () {
                    return this;
                }
            });
        }

        // Check if this is a request for component files
        if (typeof url === 'string' && url.includes('.html')) {
            const componentPath = url.replace(window.location.origin, '').replace(/^\//, '');
            if (mockComponents[componentPath]) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    headers: new Headers({
                        'content-type': 'text/html'
                    }),
                    text: () => Promise.resolve(mockComponents[componentPath]),
                    clone: function () {
                        return this;
                    }
                });
            }
        }

        // Check if this is a request for collection files
        if (typeof url === 'string' && url.includes('.json')) {
            const collectionPath = url.replace(window.location.origin, '');
            if (mockCollections[collectionPath]) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                    json: () => Promise.resolve(mockCollections[collectionPath]),
                    text: () => Promise.resolve(JSON.stringify(mockCollections[collectionPath])),
                    clone: function () {
                        return this;
                    }
                });
            }
        }

        // For all other requests, use the original fetch
        return originalFetch.apply(this, arguments);
    };

    // Provide a global manifest for synchronous access
    window.manifest = mockManifest;

    // Create a proper XMLHttpRequest wrapper
    const OriginalXMLHttpRequest = window.XMLHttpRequest;

    function MockXMLHttpRequest() {
        const xhr = new OriginalXMLHttpRequest();
        const originalOpen = xhr.open;
        const originalSend = xhr.send;
        const originalSetRequestHeader = xhr.setRequestHeader;

        xhr.open = function (method, url, async, user, password) {
            this._url = url;
            this._method = method;
            this._async = async !== false;
            this._user = user;
            this._password = password;
            return originalOpen.call(this, method, url, async, user, password);
        };

        xhr.setRequestHeader = function (header, value) {
            if (!this._headers) this._headers = {};
            this._headers[header] = value;
            return originalSetRequestHeader.call(this, header, value);
        };

        xhr.send = function (data) {
            // Check if this is a request for manifest.json
            if (this._url && this._url.includes('/manifest.json')) {
                // For synchronous requests, provide immediate response
                if (!this._async) {
                    setTimeout(() => {
                        // Set response properties
                        Object.defineProperty(this, 'readyState', { value: 4, configurable: true });
                        Object.defineProperty(this, 'status', { value: 200, configurable: true });
                        Object.defineProperty(this, 'statusText', { value: 'OK', configurable: true });
                        Object.defineProperty(this, 'responseText', { value: JSON.stringify(mockManifest), configurable: true });
                        Object.defineProperty(this, 'response', { value: mockManifest, configurable: true });

                        // Trigger events
                        if (this.onreadystatechange) {
                            this.onreadystatechange();
                        }
                    }, 0);
                    return;
                }
            }

            // Check if this is a request for component files
            if (this._url && this._url.includes('.html')) {
                const componentPath = this._url.replace(window.location.origin, '').replace(/^\//, '');
                if (mockComponents[componentPath]) {
                    setTimeout(() => {
                        Object.defineProperty(this, 'readyState', { value: 4, configurable: true });
                        Object.defineProperty(this, 'status', { value: 200, configurable: true });
                        Object.defineProperty(this, 'statusText', { value: 'OK', configurable: true });
                        Object.defineProperty(this, 'responseText', { value: mockComponents[componentPath], configurable: true });
                        Object.defineProperty(this, 'response', { value: mockComponents[componentPath], configurable: true });

                        if (this.onreadystatechange) {
                            this.onreadystatechange();
                        }
                    }, 0);
                    return;
                }
            }

            // Check if this is a request for collection files
            if (this._url && this._url.includes('.json')) {
                const collectionPath = this._url.replace(window.location.origin, '');
                if (mockCollections[collectionPath]) {
                    setTimeout(() => {
                        Object.defineProperty(this, 'readyState', { value: 4, configurable: true });
                        Object.defineProperty(this, 'status', { value: 200, configurable: true });
                        Object.defineProperty(this, 'statusText', { value: 'OK', configurable: true });
                        Object.defineProperty(this, 'responseText', { value: JSON.stringify(mockCollections[collectionPath]), configurable: true });
                        Object.defineProperty(this, 'response', { value: mockCollections[collectionPath], configurable: true });

                        if (this.onreadystatechange) {
                            this.onreadystatechange();
                        }
                    }, 0);
                    return;
                }
            }

            // For other requests, use the original send
            return originalSend.call(this, data);
        };

        return xhr;
    }

    // Copy static properties
    MockXMLHttpRequest.prototype = OriginalXMLHttpRequest.prototype;
    MockXMLHttpRequest.UNSENT = OriginalXMLHttpRequest.UNSENT;
    MockXMLHttpRequest.OPENED = OriginalXMLHttpRequest.OPENED;
    MockXMLHttpRequest.HEADERS_RECEIVED = OriginalXMLHttpRequest.HEADERS_RECEIVED;
    MockXMLHttpRequest.LOADING = OriginalXMLHttpRequest.LOADING;
    MockXMLHttpRequest.DONE = OriginalXMLHttpRequest.DONE;

    // Replace the global XMLHttpRequest
    window.XMLHttpRequest = MockXMLHttpRequest;

    // Patch the components plugin to handle missing files gracefully
    const originalConsoleError = console.error;
    console.error = function (...args) {
        // Suppress specific errors related to manifest loading
        if (args[0] && typeof args[0] === 'string' &&
            (args[0].includes('Manifest not found') ||
                args[0].includes('Failed to load manifest') ||
                args[0].includes('Failed to execute') ||
                args[0].includes('setRequestHeader is not a function'))) {
            return;
        }
        originalConsoleError.apply(console, args);
    };
})(); 