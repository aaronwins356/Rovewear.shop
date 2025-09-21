import React from 'react';
import { Link } from '../router/RouterProvider';

const footerLinks = [
  { label: 'Shop', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' }
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' }
];

export const Footer: React.FC = () => (
  <footer className="border-t border-white/10 bg-black py-16">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:justify-between">
      <div className="max-w-md space-y-4">
        <span className="text-lg font-semibold uppercase tracking-[0.4em] text-white">ROVE</span>
        <p className="text-sm text-white/70">
          ROVE crafts precision eyewear that balances timeless silhouettes with modern engineering. Designed in Los
          Angeles, worn worldwide.
        </p>
      </div>
      <div className="flex flex-col gap-8 text-sm uppercase tracking-[0.3em] text-white/60 md:flex-row">
        <nav className="space-y-3">
          {footerLinks.map((link) => (
            <div key={link.href}>
              <Link to={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
        <nav className="space-y-3">
          {socialLinks.map((link) => (
            <div key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                {link.label}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </div>
    <div className="mt-12 text-center text-xs uppercase tracking-[0.3em] text-white/40">
      © {new Date().getFullYear()} ROVE Eyewear. All rights reserved.
    </div>
  </footer>
);
