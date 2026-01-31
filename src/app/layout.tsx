import type { Metadata } from 'next';
import { VT323, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';
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

        <link rel="icon" href="/images/xabi.png" type="image/png" />
        <link rel="alternate icon" href="/images/xabi.png" />

        {/* Inline script to set theme before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = sessionStorage.getItem('theme');
                  if (savedTheme === 'dark' || savedTheme === 'wood' || savedTheme === 'orange' || savedTheme === 'christmas') {
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
        <ThemeProviderWrapper>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}