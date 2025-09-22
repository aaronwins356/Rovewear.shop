"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { CloseIcon, MenuIcon } from "@/components/ui/icons";

type NavItem = { label: string; href: string };

export function MobileMenu({ items }: { items: NavItem[] }): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full border border-neutral-200 p-2 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
      >
        <MenuIcon className="h-5 w-5" aria-hidden />
      </button>
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="fixed inset-y-0 left-0 z-50 w-80 bg-white px-6 py-8 shadow-2xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-neutral-200 p-2 hover:bg-neutral-100"
                  aria-label="Close navigation menu"
                >
                  <CloseIcon className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <ul className="mt-6 space-y-4 text-base font-medium text-neutral-700">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-full px-4 py-2 hover:bg-neutral-100"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
