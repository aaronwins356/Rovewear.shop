"use client";

import Link from "next/link";
import { ButtonLink } from "./Button";

const footerLinks = [
  { label: "Catalog", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Cart", href: "/cart" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/60">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Stay in the flow</p>
          <h2 className="text-2xl font-semibold uppercase tracking-[0.35em] text-white">Night-shift clarity, delivered.</h2>
          <p className="text-sm text-slate-400">
            Subscribe for product drops, lab notes on blue-light science, and exclusive fittings from the ROVE team.
          </p>
          <form className="flex flex-col gap-3 sm:flex-row" aria-label="Newsletter signup">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@nightshift.com"
              className="w-full rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm uppercase tracking-[0.25em] text-white placeholder:text-slate-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <ButtonLink href="/checkout" size="md" className="shrink-0">
              Join
            </ButtonLink>
          </form>
        </div>

        <div className="grid gap-8 text-sm uppercase tracking-[0.3em] text-slate-400 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs text-slate-500">Explore</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs text-slate-500">Connect</p>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.instagram.com/rovewear" className="transition hover:text-white">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/rovewear" className="transition hover:text-white">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="mailto:hello@rovewear.shop" className="transition hover:text-white">
                  Email
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-black/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.3em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ROVE Eyewear. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
