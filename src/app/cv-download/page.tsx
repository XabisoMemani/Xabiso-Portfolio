'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CVDownloadPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the actual PDF file
        window.location.href = '/documents/XabisoMemaniCV.pdf';
        
        // Return to the previous page after a short delay
        // This keeps the user on the portfolio while the download starts
        const timer = setTimeout(() => {
            router.back();
        }, 1000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'var(--font-inter)',
            color: '#888'
        }}>
            <p>Preparing your download...</p>
        </div>
    );
}
