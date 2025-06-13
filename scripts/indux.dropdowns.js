/**
 * Indux Dropdown Plugin
 */

// Initialize plugin when either DOM is ready or Alpine is ready
function initializeDropdownPlugin() {

    // Check if a menu element is nested within another menu
    const isNestedMenu = (menu) => {
        let parent = menu.parentElement;
        while (parent) {
            if (parent.tagName === 'MENU' && parent.hasAttribute('popover')) {
                return true;
            }
            parent = parent.parentElement;
        }
        return false;
    };

    // Register dropdown directive
    Alpine.directive('dropdown', (el, { modifiers, expression }, { effect }) => {

        let menu;

        if (modifiers.includes('hover')) {
            let hoverTimeout;
            let autoCloseTimeout;

            const handleShowPopover = () => {
                if (menu) {
                    clearTimeout(hoverTimeout);
                    clearTimeout(autoCloseTimeout);
                    menu.showPopover();
                }
            };

            const handleHidePopover = () => {
                hoverTimeout = setTimeout(() => {
                    if (menu && !menu.matches(':hover')) {
                        menu.hidePopover();
                    }
                }, 150);
            };

            // Global mouse tracking for auto-close
            const handleGlobalMouseMove = (e) => {
                if (!menu?.matches(':popover-open')) return;

                const isOverButton = el.contains(e.target) || el === e.target;
                const isOverMenu = menu.contains(e.target) || menu === e.target;

                if (!isOverButton && !isOverMenu) {
                    clearTimeout(autoCloseTimeout);
                    autoCloseTimeout = setTimeout(() => {
                        menu?.hidePopover();
                    }, 1000);
                } else {
                    clearTimeout(autoCloseTimeout);
                }
            };

            document.addEventListener('mousemove', handleGlobalMouseMove);
            el.addEventListener('mouseenter', handleShowPopover);
            el.addEventListener('mouseleave', handleHidePopover);
        }

        effect(() => {
            // Generate a unique anchor code for positioning
            const anchorCode = Math.random().toString(36).substr(2, 9);

            // Check if expression refers to a template ID
            if (expression && document.getElementById(expression)?.tagName === 'TEMPLATE') {
                // Clone template content and generate unique ID
                const template = document.getElementById(expression);
                menu = template.content.cloneNode(true).firstElementChild;
                const dropdownId = `dropdown-${anchorCode}`;
                menu.setAttribute('id', dropdownId);
                document.body.appendChild(menu);
                el.setAttribute('popovertarget', dropdownId);

                // Initialize Alpine on the cloned menu
                Alpine.initTree(menu);
            } else {
                // Original behavior for static dropdowns
                const dropdownId = expression || `dropdown-${anchorCode}`;
                menu = document.getElementById(dropdownId);
                if (!menu) {
                    console.warn(`[Indux Dropdowns] Dropdown menu with id "${dropdownId}" not found`);
                    return;
                }
                el.setAttribute('popovertarget', dropdownId);
            }

            // Set up popover
            menu.setAttribute('popover', '');

            // Set up anchor positioning
            const anchorName = `--dropdown-${anchorCode}`;
            el.style.setProperty('anchor-name', anchorName);
            menu.style.setProperty('position-anchor', anchorName);

            // Define positioning maps
            const cornerPositions = {
                'bottom.left': { area: 'bottom left', margin: 'var(--spacing-popover-offset)' },
                'bottom.right': { area: 'bottom right', margin: 'var(--spacing-popover-offset)' },
                'top.left': { area: 'top left', margin: 'var(--spacing-popover-offset)' },
                'top.right': { area: 'top right', margin: 'var(--spacing-popover-offset)' }
            };

            const alignmentPositions = {
                'bottom.start': { area: 'block-end span-inline-end', margin: 'var(--spacing-popover-offset) 0' },
                'bottom.end': { area: 'block-end span-inline-start', margin: 'var(--spacing-popover-offset) 0' },
                'top.start': { area: 'block-start span-inline-end', margin: 'var(--spacing-popover-offset) 0' },
                'top.end': { area: 'block-start span-inline-start', margin: 'var(--spacing-popover-offset) 0' },
                'left.start': { area: 'inline-start span-block-end', margin: '0 var(--spacing-popover-offset)' },
                'left.end': { area: 'inline-start span-block-start', margin: '0 var(--spacing-popover-offset)' },
                'right.start': { area: 'inline-end span-block-end', margin: '0 var(--spacing-popover-offset)' },
                'right.end': { area: 'inline-end span-block-start', margin: '0 var(--spacing-popover-offset)' }
            };

            const singleDirections = {
                'bottom': { area: 'block-end', margin: 'var(--spacing-popover-offset) 0' },
                'top': { area: 'block-start', margin: 'var(--spacing-popover-offset) 0' },
                'left': { area: 'inline-start', margin: '0 var(--spacing-popover-offset)' },
                'right': { area: 'inline-end', margin: '0 var(--spacing-popover-offset)' }
            };

            // Find primary direction
            const direction = ['bottom', 'top', 'left', 'right'].find(dir => modifiers.includes(dir));
            if (!direction) {
                // Default positioning - right start for nested menus, bottom middle for top-level
                if (isNestedMenu(menu)) {
                    const position = alignmentPositions['right.start'];
                    menu.style.setProperty('position-area', position.area);
                    menu.style.setProperty('margin', position.margin);
                } else {
                    menu.style.setProperty('position-area', 'block-end span-inline-end');
                    menu.style.setProperty('margin', 'var(--spacing-popover-offset) 0');
                }
                return;
            }

            // Check for corner positioning
            const corner = ['left', 'right'].find(side =>
                side !== direction && modifiers.includes(side)
            );
            if (corner) {
                const position = cornerPositions[`${direction}.${corner}`];
                menu.style.setProperty('position-area', position.area);
                menu.style.setProperty('margin', position.margin);
                return;
            }

            // Check for alignment
            const alignment = ['start', 'end'].find(align => modifiers.includes(align));
            if (alignment) {
                const position = alignmentPositions[`${direction}.${alignment}`];
                menu.style.setProperty('position-area', position.area);
                menu.style.setProperty('margin', position.margin);
                return;
            }

            // Single direction
            const position = singleDirections[direction];
            menu.style.setProperty('position-area', position.area);
            menu.style.setProperty('margin', position.margin);

            // Add keyboard navigation handling
            menu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    // Get all focusable elements
                    const focusable = menu.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );

                    // If we're on the last focusable element and tabbing forward
                    if (!e.shiftKey && e.target === focusable[focusable.length - 1]) {
                        e.preventDefault();
                        menu.hidePopover();
                        // Focus the next focusable element after the dropdown trigger
                        const allFocusable = document.querySelectorAll(
                            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                        );
                        const triggerIndex = Array.from(allFocusable).indexOf(el);
                        const nextElement = allFocusable[triggerIndex + 1];
                        if (nextElement) nextElement.focus();
                    }

                    // If we're on the first element and tabbing backward
                    if (e.shiftKey && e.target === focusable[0]) {
                        menu.hidePopover();
                    }
                }

                // Close on Escape
                if (e.key === 'Escape') {
                    menu.hidePopover();
                    el.focus();
                }
            });

            // Add hover functionality
            if (modifiers.includes('hover')) {
                let hoverTimeout;

                menu.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                });

                menu.addEventListener('mouseleave', () => {
                    hoverTimeout = setTimeout(() => {
                        menu.hidePopover();
                    }, 150);
                });
            }

            // Update hover menu handling
            if (modifiers.includes('hover')) {
                menu.addEventListener('mouseenter', () => {
                    clearTimeout(autoCloseTimeout);
                });

                menu.addEventListener('mouseleave', () => {
                    // Start tracking for auto-close immediately when leaving menu
                    const event = new MouseEvent('mousemove', {
                        clientX: window.event?.clientX ?? 0,
                        clientY: window.event?.clientY ?? 0
                    });
                    document.dispatchEvent(event);
                });
            }
        });
    });
}

// Handle both DOMContentLoaded and alpine:init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Alpine) initializeDropdownPlugin()
    })
}

document.addEventListener('alpine:init', initializeDropdownPlugin) 