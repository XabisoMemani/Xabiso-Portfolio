'use client';

import { useEffect, useState } from 'react';

export default function Cursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleClick = (e: MouseEvent) => {
            const clickEffect = document.createElement('div');
            clickEffect.className = 'cursor-click';
            clickEffect.style.left = e.clientX + 'px';
            clickEffect.style.top = e.clientY + 'px';
            document.body.appendChild(clickEffect);

            setTimeout(() => {
                clickEffect.remove();
            }, 600);
        };

        // Handle hover states using event delegation
        // Check if element or any ancestor is an interactive element
        const isInteractiveElement = (element: HTMLElement | null): boolean => {
            if (!element) return false;
            
            // List of selectors for interactive elements
            const interactiveSelectors = [
                'a',
                'button',
                '.info-btn',
                '.close-btn',
                '.social-link',
                '.theme-btn',
                '.certification-link',
                '.download-cv-link',
                '.project-link-btn',
                '.contact-link'
            ].join(', ');
            
            // Check if element itself matches or has an ancestor that matches
            return element.matches(interactiveSelectors) || 
                   !!element.closest(interactiveSelectors);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isInteractiveElement(target)) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const relatedTarget = e.relatedTarget as HTMLElement;
            
            // Only hide if we're leaving an interactive element and not entering another one
            if (isInteractiveElement(target) && !isInteractiveElement(relatedTarget)) {
                setIsHovering(false);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleClick);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <>
            {/* Main cursor with mix-blend-mode */}
            <div
                className="cursor"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`
                }}
            >
                <div className="cursor-default"></div>
            </div>

            {/* Separate red dot without mix-blend-mode */}
            {isHovering && (
                <div
                    className="cursor-dot"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`
                    }}
                ></div>
            )}
        </>
    );
}