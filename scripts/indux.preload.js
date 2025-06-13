// Synchronously preload common components
(function preloadCommonComponents() {
    // Add style to make placeholders invisible until ready
    const style = document.createElement('style');
    style.textContent = `
        x-header, x-logo { 
            opacity: 0;
            transition: opacity 0.3s ease-in;
        }
        x-header[data-ready], x-logo[data-ready] { 
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    console.time('[Indux Components] Preloading common components');

    // Force complete reload
    const timestamp = Date.now();
    console.log('[Indux Components] Loading with timestamp:', timestamp);

    // Load manifest synchronously with cache busting
    const manifestRequest = new XMLHttpRequest();
    manifestRequest.open('GET', '/manifest.json?t=' + timestamp, false); // false makes it synchronous
    manifestRequest.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    manifestRequest.setRequestHeader('Pragma', 'no-cache');
    manifestRequest.setRequestHeader('Expires', '0');
    manifestRequest.send(null);

    if (manifestRequest.status === 200) {
        window.manifest = JSON.parse(manifestRequest.responseText);
        console.log('[Indux Components] Manifest loaded:', window.manifest);

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
                    console.log('[Indux Components] Loading component:', name);
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

                        // Replace placeholder with content
                        placeholder.parentNode.replaceChild(content, placeholder);

                        // Mark as ready to fade in after a small delay
                        setTimeout(() => {
                            requestAnimationFrame(() => {
                                content.setAttribute('data-ready', '');
                            });
                        }, 100);
                    });
                }
            });
        }
    }

    console.timeEnd('[Indux Components] Preloading common components');
})(); 