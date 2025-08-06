import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], preload: false });
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], preload: false });

export const metadata: Metadata = {
  title: 'Hariny - ハリネズミ健康管理アプリ',
  description: 'ハリネズミの健康状態や日々の記録を簡単に管理できるPWAアプリです',
  manifest: '/manifest.json',
  themeColor: '#D2691E',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#D2691E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hariny" />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}