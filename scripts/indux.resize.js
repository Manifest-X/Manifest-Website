/**
 * Indux Resizable Plugin
 */

function initializeResizablePlugin() {

    Alpine.directive('resizable', (el, { modifiers, expression }, { evaluate }) => {
        // Helper to parse value and unit from CSS dimension
        const parseDimension = (value) => {
            if (typeof value === 'number') return { value, unit: 'px' };
            const match = String(value).match(/^([\d.]+)(.*)$/);
            return match ? { value: parseFloat(match[1]), unit: match[2] || 'px' } : { value: 0, unit: 'px' };
        };

        // Helper to convert any unit to pixels
        const convertToPixels = (value, unit) => {
            if (unit === 'px') return value;

            // Create temporary element for conversion
            const temp = document.createElement('div');
            temp.style.visibility = 'hidden';
            temp.style.position = 'absolute';
            temp.style.width = `${value}${unit}`;
            document.body.appendChild(temp);

            const pixels = temp.getBoundingClientRect().width;
            document.body.removeChild(temp);

            return pixels;
        };

        // Helper to convert pixels back to original unit
        const convertFromPixels = (pixels, unit) => {
            if (unit === 'px') return pixels;

            // Create temporary element for conversion
            const temp = document.createElement('div');
            temp.style.visibility = 'hidden';
            temp.style.position = 'absolute';
            temp.style.width = '100px';  // Use 100px as reference
            document.body.appendChild(temp);

            const reference = temp.getBoundingClientRect().width;
            document.body.removeChild(temp);

            // Convert based on unit type
            switch (unit) {
                case '%':
                    return (pixels / el.parentElement.getBoundingClientRect().width) * 100;
                case 'rem':
                    const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                    return pixels / remSize;
                case 'em':
                    const emSize = parseFloat(getComputedStyle(el).fontSize);
                    return pixels / emSize;
                default:
                    return (pixels * 100) / reference;
            }
        };

        // Parse options from expression or use defaults
        const options = expression ? evaluate(expression) : {};
        const {
            minWidth = 200,
            maxWidth = Infinity,
            snapDistance = 50,
            snapPoints = [],
            snapCloseWidth = 200,
            toggle = null,
            handles = ['e'],
            saveWidth = null,
            affectedSelector = null
        } = options;

        // Parse constraints with units
        const constraints = {
            min: parseDimension(minWidth),
            max: parseDimension(maxWidth),
            close: parseDimension(snapCloseWidth)
        };

        // Parse snap points with units
        const parsedSnapPoints = snapPoints.map(point => parseDimension(point));

        // Load saved width if storage key provided
        if (saveWidth) {
            const savedWidth = localStorage.getItem(`resizable-${saveWidth}`);
            if (savedWidth) {
                // Preserve the original unit if saved
                const [value, unit] = savedWidth.split('|');
                el.style.width = `${value}${unit || 'px'}`;
            }
        }

        // Handle mapping for cursor styles
        const handleMap = {
            n: { cursor: 'ns-resize', edge: 'top' },
            s: { cursor: 'ns-resize', edge: 'bottom' },
            e: { cursor: 'ew-resize', edge: 'right' },
            w: { cursor: 'ew-resize', edge: 'left' },
            nw: { cursor: 'nw-resize', edges: ['top', 'left'] },
            ne: { cursor: 'ne-resize', edges: ['top', 'right'] },
            sw: { cursor: 'sw-resize', edges: ['bottom', 'left'] },
            se: { cursor: 'se-resize', edges: ['bottom', 'right'] }
        };

        // Create resize handles
        handles.forEach(handlePos => {
            const handle = document.createElement('div');
            const handleInner = document.createElement('div');
            const handleInfo = handleMap[handlePos];

            handle.className = `resize-handle resize-handle-${handlePos}`;
            handleInner.className = 'resize-handle-inner';

            handle.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                cursor: ${handleInfo.cursor};
                z-index: 100;
            `;

            // Position the handle
            if (handlePos.includes('n')) handle.style.top = '-5px';
            if (handlePos.includes('s')) handle.style.bottom = '-5px';
            if (handlePos.includes('e')) handle.style.right = '-5px';
            if (handlePos.includes('w')) handle.style.left = '-5px';

            // Extend handle size for edges
            if (handlePos.length === 1) {
                if (handlePos === 'n' || handlePos === 's') {
                    handle.style.width = 'calc(100% + 10px)';
                    handle.style.left = '-5px';
                } else {
                    handle.style.height = 'calc(100% + 10px)';
                    handle.style.top = '-5px';
                }
            }

            handle.appendChild(handleInner);

            let startX, startY, startWidth, startHeight;
            let currentSnap = null;

            // Convert constraints to pixels for calculations
            const pixelConstraints = {
                min: convertToPixels(constraints.min.value, constraints.min.unit),
                max: constraints.max.value === Infinity ? Infinity :
                    convertToPixels(constraints.max.value, constraints.max.unit),
                close: convertToPixels(constraints.close.value, constraints.close.unit)
            };

            // Convert snap points to pixels
            const pixelSnapPoints = parsedSnapPoints.map(point => ({
                value: convertToPixels(point.value, point.unit),
                unit: point.unit
            }));

            const resize = (e) => {
                e.preventDefault();

                if (e.buttons === 0) {
                    stopResize();
                    return;
                }

                const deltaX = e.pageX - startX;
                const deltaY = e.pageY - startY;

                // Get affected element if specified
                const affectedEl = affectedSelector ?
                    el.parentElement.querySelector(affectedSelector) : null;

                // Calculate new dimensions
                let newWidth = startWidth;
                let newHeight = startHeight;

                // Handle horizontal resizing
                if (handlePos.includes('e')) {
                    newWidth = startWidth + deltaX;
                    if (affectedEl) {
                        const affectedWidth = affectedEl.getBoundingClientRect().width;
                        const affectedMinWidth = parseInt(getComputedStyle(affectedEl).minWidth) || 0;
                        if (affectedWidth - deltaX < affectedMinWidth) {
                            return;
                        }
                    }
                } else if (handlePos.includes('w')) {
                    newWidth = startWidth - deltaX;
                    if (affectedEl) {
                        const affectedWidth = affectedEl.getBoundingClientRect().width;
                        const affectedMinWidth = parseInt(getComputedStyle(affectedEl).minWidth) || 0;
                        if (affectedWidth + deltaX < affectedMinWidth) {
                            return;
                        }
                    }
                }

                // Handle vertical resizing
                if (handlePos.includes('s')) {
                    newHeight = startHeight + deltaY;
                } else if (handlePos.includes('n')) {
                    newHeight = startHeight - deltaY;
                }

                const snapDistancePixels = convertToPixels(parseDimension(snapDistance).value,
                    parseDimension(snapDistance).unit);
                const pullDistance = 50;
                const closeThreshold = pixelConstraints.close - pullDistance;

                // Handle snap-close before applying other constraints
                if (newWidth < closeThreshold) {
                    el.classList.add('resizable-closing', 'resizable-closed');
                    currentSnap = 'closing';
                    if (toggle) {
                        evaluate(`${toggle} = false`);
                    }
                    return; // Exit early to prevent further width calculations
                }

                // Apply constraints only if we're not closing
                newWidth = Math.min(Math.max(newWidth, pixelConstraints.min),
                    pixelConstraints.max === Infinity ? newWidth : pixelConstraints.max);

                // Handle normal snap points
                if (Math.abs(newWidth - pixelConstraints.min) < snapDistancePixels) {
                    newWidth = pixelConstraints.min;
                    currentSnap = 'min';
                } else {
                    for (const point of pixelSnapPoints) {
                        if (Math.abs(newWidth - point.value) < snapDistancePixels) {
                            newWidth = point.value;
                            currentSnap = `${convertFromPixels(newWidth, point.unit)}${point.unit}`;
                            break;
                        }
                    }
                }

                // Convert back to original unit for display
                const displayWidth = convertFromPixels(newWidth, constraints.min.unit);
                el.style.width = `${displayWidth}${constraints.min.unit}`;
                el.style.height = `${newHeight}px`;
                el.classList.remove('resizable-closing', 'resizable-closed');
                if (toggle) {
                    evaluate(`${toggle} = true`);
                }

                if (currentSnap !== 'closing' && saveWidth) {
                    localStorage.setItem(`resizable-${saveWidth}`,
                        `${displayWidth}|${constraints.min.unit}`);
                }

                // Dispatch resize event
                el.dispatchEvent(new CustomEvent('resize', {
                    detail: {
                        width: convertFromPixels(newWidth, constraints.min.unit),
                        height: newHeight,
                        unit: constraints.min.unit,
                        snap: currentSnap,
                        closing: currentSnap === 'closing'
                    }
                }));
            };

            // Create an overlay element (do this once when directive initializes)
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 9999;
                display: none;
                cursor: ew-resize;
            `;
            document.body.appendChild(overlay);

            const startResize = (e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                e.stopPropagation();

                document.body.style.userSelect = 'none';
                document.body.style.webkitUserSelect = 'none';

                // Show the overlay
                overlay.style.display = 'block';

                startX = e.pageX;
                startY = e.pageY;
                startWidth = el.getBoundingClientRect().width;
                startHeight = el.getBoundingClientRect().height;

                document.addEventListener('mousemove', resize, { passive: false });
                document.addEventListener('mouseup', stopResize);
            };

            const stopResize = (e) => {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                document.body.style.userSelect = '';
                document.body.style.webkitUserSelect = '';

                // Hide the overlay
                overlay.style.display = 'none';

                document.removeEventListener('mousemove', resize);
                document.removeEventListener('mouseup', stopResize);

                if (toggle) {
                    evaluate(`${toggle} = ${!el.classList.contains('resizable-closed')}`);
                }

                currentSnap = null;
            };

            handle.addEventListener('mousedown', startResize);
            el.appendChild(handle);
        });

        // Ensure proper positioning context
        if (getComputedStyle(el).position === 'static') {
            el.style.position = 'relative';
        }
    });
}

// Handle both DOMContentLoaded and alpine:init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Alpine) initializeResizablePlugin()
    })
}

document.addEventListener('alpine:init', initializeResizablePlugin) 