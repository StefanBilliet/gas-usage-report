import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vwala',
  description: 'Next.js app with Vitest and Storybook',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
