'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const cycleTheme = () => {
        const themes: Array<'dark' | 'wood' | 'orange'> = ['dark', 'wood', 'orange'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'dark': return '🦖';
            case 'wood': return '🪵';
            case 'orange': return '🟠';
            default: return '🟠';
        }
    };

    return (
        <button
            className="theme-btn"
            onClick={cycleTheme}
            aria-label="Change theme"
        >
            {getThemeIcon()}
        </button>
    );
}