import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { NavBar } from "@/components/NavBar";
import { CartDrawer } from "@/components/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROVE | Designer Blue-Light Eyewear",
  description:
    "ROVE blue-light eyewear blends high-fashion craftsmanship with science-backed protection.",
  metadataBase: new URL("https://rovewear.shop"),
  openGraph: {
    title: "ROVE | Designer Blue-Light Eyewear",
    description:
      "Shop premium aviator, browline, and square blue-light eyewear engineered for focus and style.",
    url: "https://rovewear.shop",
    siteName: "ROVE Eyewear",
    images: [
      {
        url: "https://rovewear.shop/wp-content/uploads/2025/09/1-1.png",
        width: 1200,
        height: 675,
        alt: "ROVE blue-light eyewear showcase",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROVE | Designer Blue-Light Eyewear",
    description:
      "High-impact eyewear silhouettes engineered with blue-light protection.",
    site: "@rovewear",
  },
  keywords: [
    "ROVE eyewear",
    "designer blue light glasses",
    "premium eyewear",
    "aviator blue light glasses",
    "browline blue light frames",
  ],
  alternates: {
    canonical: "https://rovewear.shop",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white">
        <CartProvider>
          <NavBar />
          <main className="pb-24 pt-20 md:pb-0 md:pt-28">{children}</main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
