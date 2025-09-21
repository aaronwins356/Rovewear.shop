import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grounded Living",
  description: "Thoughtfully curated goods and stories for a grounded lifestyle.",
  metadataBase: new URL("https://groundedliving.example.com"),
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-950 text-neutral-100">
      <body className="min-h-screen bg-neutral-50 font-sans text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
