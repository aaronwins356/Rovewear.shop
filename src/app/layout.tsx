import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rovewear.shop"),
  title: {
    default: "Rovewear",
    template: "%s | Rovewear"
  },
  description: "Rovewear curates mindful essentials for intentional living.",
  openGraph: {
    title: "Rovewear",
    description: "Rovewear curates mindful essentials for intentional living.",
    url: "https://www.rovewear.shop",
    siteName: "Rovewear",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rovewear",
    description: "Rovewear curates mindful essentials for intentional living."
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-50 text-neutral-900 antialiased`}>{children}</body>
    </html>
  );
}
