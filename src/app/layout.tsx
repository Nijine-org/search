import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './css/globals.css';
import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from '@/utils/theme/custom-theme';
import { CustomizerContextProvider } from '@/app/context/customizerContext';
import '../utils/i18n';
const inter = Inter({ subsets: ['latin'] });
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: {
    template: '%s | Manage Your Recruit',
    default: 'My Recruit',
  },
  description:
    'Explore our cutting-edge finance platform that simplifies financial management. Track expenses, generate reports, and achieve financial success.',
  keywords: [
    'Finance management',
    'Financial solutions',
    'Expense tracking',
    'Financial reports',
    'Budgeting tools',
    'Personal finance',
    'Finance software',
    'Investment tools',
    'Financial planning',
    'Finance platform',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <ThemeModeScript />
      </head>
      <body className={`${inter.className}`}>
        <AntdRegistry>
          <Flowbite theme={{ theme: customTheme }}>
            <CustomizerContextProvider>{children}</CustomizerContextProvider>
          </Flowbite>
        </AntdRegistry>
      </body>
    </html>
  );
}
