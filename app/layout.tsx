import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Space_Grotesk } from 'next/font/google';
import { CustomCursor } from '@/components/layout/custom-cursor';
import { getSiteUrl } from '@/lib/site-url';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const siteUrl = getSiteUrl();
const siteName = 'NEJJARI Mohamed';
const description =
  'NEJJARI Mohamed is a software engineering student focused on backend engineering, full-stack development, cloud infrastructure and DevOps.';
const socialImage = siteUrl
  ? new URL('/cv/photo.jpg', siteUrl).toString()
  : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteName} — Software Engineer`,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: `${siteName} Portfolio`,
  ...(siteUrl ? { alternates: { canonical: '/' } } : {}),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: `${siteName} Portfolio`,
    title: `${siteName} — Software Engineer`,
    description,
    ...(siteUrl ? { url: siteUrl.toString() } : {}),
    ...(socialImage
      ? {
          images: [
            {
              url: socialImage,
              alt: `Portrait of ${siteName}`,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Software Engineer`,
    description,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
};
type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${spaceGrotesk.variable} flex min-h-full flex-col`} suppressHydrationWarning>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}