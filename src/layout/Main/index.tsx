'use client';

import StoreProvider from '@/app/StoreProvider';
import { Header } from '@/components/Header';
import { LoadingModal } from '@/components/Loading';
import { SideBars } from '@/components/SideBar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gia sư số 1 Việt Nam',
  description: 'Gia sư',
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/favicon.png',
      href: '/favicon.png',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/favicon.png',
      href: '/favicon.png',
    },
  ],
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="flex"
      style={{
        height: '100%',
        overflow: 'hidden',
      }}>
      <StoreProvider>
        <SideBars />
        <div className="flex-1">
          <Header />
          <Suspense>
            <div className="relative w-full h-full">
              <LoadingModal />
              {children}
            </div>
          </Suspense>
        </div>
      </StoreProvider>
    </main>
  );
}
