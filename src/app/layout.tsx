import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

import { siteConfig } from "@/config/site";
import { SchemaScript } from "@/components/seo/SchemaScript";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Designer Eyewear for Modern Explorers`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "designer eyewear",
    "premium sunglasses",
    "blue light glasses",
    "ROVE eyewear",
    "luxury glasses"
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} | Premium Designer Glasses`,
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Premium Designer Glasses`,
    description: siteConfig.description
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#0f172a" }]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading ROVE…</div>}>
          {children}
        </Suspense>
        <SchemaScript />
      </body>
    </html>
  );
}
