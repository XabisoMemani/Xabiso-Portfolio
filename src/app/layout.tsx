import type { Metadata } from 'next';
import { VT323, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Xabiso Memani - Portfolio',
  description: 'Portfolio of Xabiso Memani - Software Engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/xabi.png" type="image/png" />
        <link rel="alternate icon" href="/images/xabi.png" />

        {/* Inline script to set theme before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark' || savedTheme === 'wood' || savedTheme === 'orange') {
                    document.documentElement.classList.add('theme-' + savedTheme);
                  } else {
                    document.documentElement.classList.add('theme-orange');
                  }
                } catch (e) {
                  document.documentElement.classList.add('theme-orange');
                }
              })();
            `,
          }}
        />

      </head>
      <body className={`${vt323.variable} ${inter.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}