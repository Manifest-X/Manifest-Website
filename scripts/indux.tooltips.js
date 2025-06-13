/**
 * Indux Tooltip Plugin
 */

const TOOLTIP_HOVER_DELAY = 500; // 500ms delay for hover tooltips

function initializeTooltipPlugin() {

    Alpine.directive('tooltip', (el, { modifiers, expression }, { effect, evaluateLater }) => {

        let getTooltipContent;

        // If it starts with $x, handle content loading
        if (expression.startsWith('$x.')) {
            const path = expression.substring(3); // Remove '$x.'
            const [contentType, ...pathParts] = path.split('.');

            // Create evaluator that uses the content manager's path parsing
            getTooltipContent = evaluateLater(`
                (() => {
                    const store = $store.app;
                    if (!store.x['${contentType}']) return '';
                    
                    let current = store.x['${contentType}'];
                    ${pathParts.map(part => `
                        if (!current['${part}']) return '';
                        current = current['${part}'];
                    `).join('')}
                    return current || '';
                })()
            `);

            // Ensure content is loaded before showing tooltip
            effect(() => {
                const store = Alpine.store('app');
                if (!store.x[contentType]) {
                    store.contentManager.loadContentFile(store, contentType)
                        .then(content => {
                            if (content) {
                                store.x[contentType] = content;
                                Alpine.store('x', { ...store.x });
                            }
                        });
                }
            });
        } else {
            // Check if expression contains any dynamic parts (+, `, or ${)
            if (expression.includes('+') || expression.includes('`') || expression.includes('${')) {
                // Try to evaluate as a dynamic expression
                getTooltipContent = evaluateLater(expression);
            } else {
                // Use as static string
                getTooltipContent = evaluateLater(`'${expression}'`);
            }
        }

        effect(() => {
            // Generate a unique ID for the tooltip
            const tooltipCode = Math.random().toString(36).substr(2, 9);
            const tooltipId = `tooltip-${tooltipCode}`;

            // Store the original popovertarget if it exists
            const originalTarget = el.getAttribute('popovertarget');

            // Create the tooltip element
            const tooltip = document.createElement('div');
            tooltip.setAttribute('popover', '');
            tooltip.setAttribute('id', tooltipId);
            tooltip.setAttribute('class', 'tooltip');

            // Store the original anchor name if it exists
            const originalAnchorName = el.style.getPropertyValue('anchor-name');
            const tooltipAnchor = `--tooltip-${tooltipCode}`;

            // Set tooltip content
            getTooltipContent(content => {
                tooltip.innerHTML = content || '';
            });

            // Handle positioning modifiers
            const positions = modifiers.filter(mod => ['top', 'bottom', 'left', 'right'].includes(mod));
            if (positions.length > 0) {
                tooltip.style.setProperty('position-area', positions.join(' '));
            }

            // Add the tooltip to the document
            document.body.appendChild(tooltip);

            // State variables for managing tooltip behavior
            let showTimeout;
            let isMouseDown = false;

            el.addEventListener('mouseenter', () => {
                if (!isMouseDown) {
                    showTimeout = setTimeout(() => {
                        if (!isMouseDown && !tooltip.matches(':popover-open')) {
                            // Store original anchor name and set tooltip anchor
                            if (originalAnchorName) {
                                el._originalAnchorName = originalAnchorName;
                            }
                            el.style.setProperty('anchor-name', tooltipAnchor);
                            tooltip.style.setProperty('position-anchor', tooltipAnchor);

                            el.setAttribute('popovertarget', tooltipId);
                            tooltip.showPopover();
                        }
                    }, TOOLTIP_HOVER_DELAY);
                }
            });

            el.addEventListener('mouseleave', () => {
                clearTimeout(showTimeout);
                if (tooltip.matches(':popover-open')) {
                    tooltip.hidePopover();
                    // Restore original anchor name and target
                    if (el._originalAnchorName) {
                        el.style.setProperty('anchor-name', el._originalAnchorName);
                    }
                    if (originalTarget) {
                        el.setAttribute('popovertarget', originalTarget);
                    }
                }
            });

            el.addEventListener('mousedown', () => {
                isMouseDown = true;
                clearTimeout(showTimeout);
                if (tooltip.matches(':popover-open')) {
                    tooltip.hidePopover();
                }
                // Restore original anchor name and target
                if (el._originalAnchorName) {
                    el.style.setProperty('anchor-name', el._originalAnchorName);
                }
                if (originalTarget) {
                    el.setAttribute('popovertarget', originalTarget);
                }
            });

            el.addEventListener('mouseup', () => {
                isMouseDown = false;
            });

            // Cleanup click handling
            el.addEventListener('click', (e) => {
                clearTimeout(showTimeout);
                if (tooltip.matches(':popover-open')) {
                    tooltip.hidePopover();
                }
                // Ensure original anchor name and target are restored
                if (el._originalAnchorName) {
                    el.style.setProperty('anchor-name', el._originalAnchorName);
                }
                if (originalTarget) {
                    el.setAttribute('popovertarget', originalTarget);
                }
            });
        });
    });
}

// Handle both DOMContentLoaded and alpine:init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Alpine) initializeTooltipPlugin()
    })
}

document.addEventListener('alpine:init', initializeTooltipPlugin) 