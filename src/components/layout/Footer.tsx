import Link from "next/link";

import { siteConfig } from "@/config/site";
import type { SiteSettings } from "@/types/product";

const DEFAULT_FOOTER_LINKS = [
  { label: "Style Guide", href: "/about" },
  { label: "Virtual Fitting", href: "/contact" }
];

interface FooterProps {
  settings?: SiteSettings | null;
}

export function Footer({ settings }: FooterProps = {}): JSX.Element {
  const footerLinks = settings?.footerLinks ?? DEFAULT_FOOTER_LINKS;

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:flex-row md:gap-24">
        <div className="flex-1">
          <span className="text-lg font-semibold tracking-[0.3em] text-neutral-900">{siteConfig.name}</span>
          <p className="mt-4 max-w-md text-sm text-neutral-500">
            Crafted in limited runs with bio-acetate materials and Zeiss optics. Experience clarity designed for modern
            explorers.
          </p>
          <div className="mt-6 space-y-2 text-sm text-neutral-500">
            <p>Contact: {settings?.supportEmail ?? siteConfig.contact.email}</p>
            <p>Phone: {settings?.supportPhone ?? siteConfig.contact.phone}</p>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li>
                <Link className="hover:text-neutral-900" href="/catalog">
                  All eyewear
                </Link>
              </li>
              <li>
                <Link className="hover:text-neutral-900" href="/catalog?category=blue-light">
                  Blue light
                </Link>
              </li>
              <li>
                <Link className="hover:text-neutral-900" href="/catalog?category=accessories">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li>
                <Link className="hover:text-neutral-900" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-neutral-900" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-neutral-900" href="/return-policy">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li>
                <Link className="hover:text-neutral-900" href="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="hover:text-neutral-900" href="/terms">
                  Terms
                </Link>
              </li>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-neutral-900" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 bg-neutral-50 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
