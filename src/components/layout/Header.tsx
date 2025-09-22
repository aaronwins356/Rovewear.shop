import Link from "next/link";

import { siteConfig } from "@/config/site";
import { CartToggle } from "@/components/layout/CartToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchIcon } from "@/components/ui/icons";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Blue light", href: "/catalog?category=blue-light" },
  { label: "Accessories", href: "/catalog?category=accessories" },
  { label: "About", href: "/about" }
];

export function Header(): JSX.Element {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <MobileMenu items={NAV_ITEMS} />
          <Link href="/" className="text-2xl font-semibold tracking-[0.2em]">
            {siteConfig.name}
          </Link>
        </div>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-neutral-600 transition hover:text-neutral-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/catalog?sort=popular"
            className="hidden items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 hover:border-neutral-300 hover:bg-neutral-100 md:inline-flex"
          >
            <SearchIcon className="h-4 w-4" aria-hidden />
            Search
          </Link>
          <CartToggle />
        </div>
      </div>
    </header>
  );
}
