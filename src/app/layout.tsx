import type { Metadata } from 'next';
import { VT323, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${vt323.variable} ${inter.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}