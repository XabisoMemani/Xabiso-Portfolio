'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    // Use refs for all hot-path state to avoid re-renders and effect re-runs
    const mousePosition = useRef({ x: 0, y: 0 });
    const isVisibleRef = useRef(false);
    const isHoveringRef = useRef(false);
    const mountedRef = useRef(true);

    // Sync visibility to DOM without React re-render
    const syncVisibility = useCallback(() => {
        if (cursorRef.current) {
            cursorRef.current.style.opacity = isVisibleRef.current ? '1' : '0';
        }
        if (dotRef.current) {
            const showDot = isHoveringRef.current && isVisibleRef.current;
            dotRef.current.style.opacity = showDot ? '1' : '0';
            dotRef.current.style.display = showDot ? 'block' : 'none';
        }
    }, []);

    useEffect(() => {
        mountedRef.current = true;

        // Force hide the default system cursor on devices with a fine pointer
        const hideSystemCursor = () => {
            if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                document.documentElement.style.cursor = 'none';
                document.body.style.cursor = 'none';
            }
        };

        hideSystemCursor();

        // --- Mouse movement ---
        const onMouseMove = (e: MouseEvent) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };

            if (!isVisibleRef.current) {
                isVisibleRef.current = true;
                syncVisibility();
            }

            // Re-hide system cursor if a browser extension reset it
            if (
                document.body.style.cursor !== 'none' &&
                window.matchMedia('(hover: hover) and (pointer: fine)').matches
            ) {
                hideSystemCursor();
            }
        };

        // --- Viewport enter / leave ---
        const onMouseLeave = () => {
            isVisibleRef.current = false;
            syncVisibility();
        };

        const onMouseEnter = () => {
            isVisibleRef.current = true;
            syncVisibility();
            hideSystemCursor();
        };

        // --- Animation loop (runs once, never torn down until unmount) ---
        const updateCursorPosition = () => {
            if (!mountedRef.current) return;

            const { x, y } = mousePosition.current;
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            }

            requestAnimationFrame(updateCursorPosition);
        };

        const animationId = requestAnimationFrame(updateCursorPosition);

        // --- Click ripple ---
        const handleClick = (e: MouseEvent) => {
            if (!e.isTrusted) return; // Ignore programmatic clicks to avoid ghost pulses at (0,0)
            const clickEffect = document.createElement('div');
            clickEffect.className = 'cursor-click';

            clickEffect.style.left = e.clientX + 'px';
            clickEffect.style.top = e.clientY + 'px';
            document.body.appendChild(clickEffect);

            setTimeout(() => {
                clickEffect.remove();
            }, 600);

            setTimeout(() => {
                const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
                if (!isInteractiveElement(el)) {
                    isHoveringRef.current = false;
                    syncVisibility();
                }
            }, 0);
        };

        // --- Interactive element detection ---
        const isInteractiveElement = (element: HTMLElement | null): boolean => {
            if (!element) return false;

            const interactiveSelectors = [
                'a',
                'button',
                '[role="button"]',
                '.info-btn',
                '.close-btn',
                '.resume-interactive',
                '.social-link',
                '.theme-btn',
                '.certification-link',
                '.download-cv-link',
                '.project-link-btn',
                '.project-filter-btn',
                '.contact-link',
                '.alert-close',
                '.university-orange'
            ].join(', ');

            return element.matches(interactiveSelectors) ||
                !!element.closest(interactiveSelectors);
        };

        // --- Hover state ---
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isInteractiveElement(target)) {
                isHoveringRef.current = true;
                syncVisibility();
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const relatedTarget = e.relatedTarget as HTMLElement;

            if (isInteractiveElement(target) && !isInteractiveElement(relatedTarget)) {
                isHoveringRef.current = false;
                syncVisibility();
            }
        };

        // --- Tab / window focus recovery ---
        const handleFocus = () => {
            hideSystemCursor();
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // Tab is back in view — re-hide system cursor and mark custom cursor visible
                hideSystemCursor();
                isVisibleRef.current = true;
                syncVisibility();
            }
        };

        // --- Info panel close ---
        const handleInfoClose = () => {
            isHoveringRef.current = false;
            syncVisibility();
        };

        // --- Register all listeners ---
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('click', handleClick);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('app:info-close', handleInfoClose as EventListener);

        return () => {
            mountedRef.current = false;
            cancelAnimationFrame(animationId);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('app:info-close', handleInfoClose as EventListener);
        };
    }, [syncVisibility]);

    return (
        <>
            {/* Main cursor with mix-blend-mode */}
            <div
                ref={cursorRef}
                className="cursor"
                style={{
                    left: 0,
                    top: 0,
                    opacity: 0,
                }}
            >
                <div className="cursor-default"></div>
            </div>

            {/* Separate red dot without mix-blend-mode */}
            <div
                ref={dotRef}
                className="cursor-dot-wrapper"
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 10001,
                    left: 0,
                    top: 0,
                    opacity: 0,
                    display: 'none'
                }}
            >
                <div className="cursor-dot"></div>
            </div>
        </>
    );
}