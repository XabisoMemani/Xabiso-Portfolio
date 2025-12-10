'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function Notification() {
    const { theme, mounted, setTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!mounted || theme !== 'christmas') {
            setIsVisible(false);
            return;
        }

        // Show notification after 1 second delay
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        return () => {
            clearTimeout(showTimer);
        };
    }, [theme, mounted]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleSwitchTheme = () => {
        setTheme('orange');
        setIsVisible(false);
    };

    if (theme !== 'christmas') {
        return null;
    }

    // Christmas tree emoji for icon
    const treeEmoji = '🎄';

    const checkSvg = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const closeSvg = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );

    return (
        <div className={`custom-alert ${isVisible ? 'show' : ''}`}>
            <div className="alert-icon">
                {treeEmoji}
            </div>
            <div className="alert-content">
                <div className="alert-title">Happy Holidays!</div>
                <div className="alert-message">Enjoying this christmas theme I added?</div>
            </div>
            <div className="alert-actions">
                <button
                    className="alert-check"
                    onClick={handleClose}
                    aria-label="Keep theme and close notification"
                    title="Keep theme"
                >
                    {checkSvg}
                </button>
                <button
                    className="alert-close"
                    onClick={handleSwitchTheme}
                    aria-label="Switch to orange theme"
                    title="Switch theme"
                >
                    {closeSvg}
                </button>
            </div>
        </div>
    );
}

