'use client';

/**
 * Centrally manages CV download tracking and file delivery.
 * Hits the /cv-download route stealthily in a hidden iframe to register the page view
 * for Vercel analytics while delivering the actual PDF download simultaneously.
 */
export const triggerCVDownload = () => {
    // 1. Deliver the actual PDF file directly
    const link = document.createElement('a');
    link.href = '/documents/XabisoMemaniCV.pdf';
    link.download = 'XabisoMemaniCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Register the Page View in Vercel by loading the route in a hidden iframe
    // This allows the user to see the analytics count without leaving the current page.
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = '/cv-download?stealth=true';
    document.body.appendChild(iframe);

    // Cleanup the hidden iframe after tracking is registered
    setTimeout(() => {
        if (iframe.parentNode) {
            document.body.removeChild(iframe);
        }
    }, 2000);
};
