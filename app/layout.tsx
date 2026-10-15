import type { Metadata } from "next";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();
const siteName = "Mohamed Nejjari";
const description =
  "Mohamed Nejjari is a software engineering student focused on backend engineering, full-stack development, cloud infrastructure and DevOps.";
const socialImage = siteUrl
  ? new URL("/cv/photo.jpg", siteUrl).toString()
  : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteName} — Software Engineer`,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: `${siteName} Portfolio`,
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    locale: "en_US",
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
    card: "summary_large_image",
    title: `${siteName} — Software Engineer`,
    description,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
