'use client';

import { useEffect } from 'react';

interface InfoPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InfoPanel({ isOpen, onClose }: InfoPanelProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div className="overlay show" onClick={onClose}></div>
            <div className="info-panel show">
                <div className="close-btn" onClick={onClose}>×</div>
                <div className="info-line">NAME: XABISO MEMANI</div>
                <div className="info-line">ROLE: SOFTWARE ENGINEER</div>
                <div className="info-line">LOCATION: JOHANNESBURG, SOUTH AFRICA</div>
                <div className="info-line">
                    EMAIL:
                    <a href="mailto:xabisomemanii@gmail.com"> XABISOMEMANII@GMAIL.COM</a>
                </div>
                <div className="info-line">
                    PHONE: <a href="tel:+27736744337">+27 73 674 4337</a>
                </div>
                <div className="info-line">STATUS: BUILDING SOMETHING COOL</div>
                <div className="info-line">AVAILABLE: AVAILABLE FOR HIRE</div>
                <p className="tag">Designed from scratch by <u>Xabiso Memani</u> :)</p>
            </div>
        </>
    );
}