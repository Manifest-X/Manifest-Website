/**
 * Indux Theme Plugin
 */

// Initialize plugin when either DOM is ready or Alpine is ready
function initializeThemePlugin() {

    // Initialize theme state with Alpine reactivity
    const theme = Alpine.reactive({
        current: localStorage.getItem('theme') || 'system'
    })

    // Apply initial theme
    applyTheme(theme.current)

    // Setup system theme listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
        if (theme.current === 'system') {
            applyTheme('system')
        }
    })

    // Register theme directive
    Alpine.directive('theme', (el, { expression }, { evaluate, cleanup }) => {

        const handleClick = () => {
            const newTheme = expression === 'toggle'
                ? (document.documentElement.classList.contains('dark') ? 'light' : 'dark')
                : evaluate(expression)
            setTheme(newTheme)
        }

        el.addEventListener('click', handleClick)
        cleanup(() => el.removeEventListener('click', handleClick))
    })

    // Add $theme magic method
    Alpine.magic('theme', () => ({
        get current() {
            return theme.current
        },
        set current(value) {
            setTheme(value)
        }
    }))

    function setTheme(newTheme) {
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

        // Update document classes
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(isDark ? 'dark' : 'light')

        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]')
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? '#000000' : '#FFFFFF')
        }
    }
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