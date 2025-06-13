/**
 * Indux Theme Plugin
 */

// Initialize plugin when either DOM is ready or Alpine is ready
function initializeThemePlugin() {
    console.log('[Indux Theme Plugin] Initializing...')

    // Initialize theme state
    const theme = {
        current: localStorage.getItem('theme') || 'system'
    }
    console.log('[Indux Theme Plugin] Initial theme:', theme.current)

    // Apply initial theme
    applyTheme(theme.current)

    // Setup system theme listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
        console.log('[Indux Theme Plugin] System theme changed')
        if (theme.current === 'system') {
            applyTheme('system')
        }
    })

    // Register theme directive
    Alpine.directive('theme', (el, { expression }, { evaluate, cleanup }) => {
        console.log('[Indux Theme Plugin] Processing theme directive:', { expression, element: el })

        const handleClick = () => {
            const newTheme = expression === 'toggle'
                ? (document.documentElement.classList.contains('dark') ? 'light' : 'dark')
                : evaluate(expression)
            console.log('[Indux Theme Plugin] Theme button clicked:', newTheme)
            setTheme(newTheme)
        }

        el.addEventListener('click', handleClick)
        cleanup(() => el.removeEventListener('click', handleClick))
    })

    function setTheme(newTheme) {
        console.log('[Indux Theme Plugin] Setting theme:', newTheme)
        if (newTheme === 'toggle') {
            newTheme = theme.current === 'light' ? 'dark' : 'light'
        }

        // Update theme state
        theme.current = newTheme
        localStorage.setItem('theme', newTheme)

        // Apply theme
        applyTheme(newTheme)
    }

    function applyTheme(theme) {
        const isDark = theme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
            : theme === 'dark'

        console.log('[Indux Theme Plugin] Applying theme:', { theme, isDark })

        // Update document classes
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(isDark ? 'dark' : 'light')

        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]')
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? '#000000' : '#FFFFFF')
        }
    }

    console.log('[Indux Theme Plugin] Initialization complete')
}

// Handle both DOMContentLoaded and alpine:init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Alpine) {
            initializeThemePlugin()
        }
    })
}

document.addEventListener('alpine:init', initializeThemePlugin) 