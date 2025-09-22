import type { PropsWithChildren } from "react";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSiteSettings } from "@/lib/products";
import { CartProvider } from "@/providers/cart-provider";

export default async function StorefrontLayout({ children }: PropsWithChildren): Promise<JSX.Element> {
  const settings = await getSiteSettings();

  return (
    <CartProvider currency={settings?.currency}>
      <div className="flex min-h-screen flex-col">
        <AnnouncementBar message={settings?.announcement} />
        <Header />
        <main id="main-content" className="flex-1 bg-neutral-50">
          {children}
        </main>
        <Footer settings={settings} />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
