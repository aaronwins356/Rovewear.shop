"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon, ShoppingBagIcon, Squares2X2Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { getAllProducts, getProductCategories } from "@/lib/products";
import { useCart } from "./CartProvider";

const LOGO_SRC = "https://rovewear.shop/wp-content/uploads/2025/09/1-1.png";

export function NavBar() {
  const categories = useMemo(() => getProductCategories(), []);
  const products = useMemo(() => getAllProducts(), []);
  const { toggleCart, items } = useCart();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const categoryProducts = activeCategory
    ? products.filter((product) => product.categories.includes(activeCategory))
    : [];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 hidden bg-black/40 backdrop-blur-sm md:block">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10">
              <Image src={LOGO_SRC} alt="ROVE logo" fill sizes="40px" className="object-cover" />
            </div>
            <span className="text-lg font-semibold uppercase tracking-[0.4em] text-white">Rove</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {categories.map((category) => (
              <button
                key={category}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:text-white"
                onMouseEnter={() => setActiveCategory(category)}
                onFocus={() => setActiveCategory(category)}
                onMouseLeave={() => setActiveCategory(null)}
                onBlur={() => setActiveCategory(null)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative rounded-full border border-white/20 p-2 text-white transition hover:border-white/40"
              onClick={toggleCart}
              aria-label="Open cart"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {itemCount > 0 ? (
                <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                  {itemCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              className="hidden rounded-full border border-white/20 p-2 text-white transition hover:border-white/40 sm:inline-flex"
              aria-label="Account"
            >
              <UserIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {activeCategory ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full hidden bg-black/80 backdrop-blur md:block"
            >
              <div className="mx-auto grid max-w-5xl grid-cols-3 gap-6 px-6 py-6">
                {categoryProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group flex items-center gap-4 rounded-xl bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="64px"
                        className="object-cover transition duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                        {product.title}
                      </p>
                      <p className="text-xs text-slate-400">From ${product.price?.toFixed(2) ?? "N/A"}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around bg-black/80 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/" className="flex flex-col items-center text-xs uppercase tracking-[0.2em] text-slate-300">
          <HomeIcon className="mb-1 h-5 w-5" />
          Home
        </Link>
        <button
          type="button"
          className="flex flex-col items-center text-xs uppercase tracking-[0.2em] text-slate-300"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Squares2X2Icon className="mb-1 h-5 w-5" />
          Shop
        </button>
        <button
          type="button"
          className="relative flex flex-col items-center text-xs uppercase tracking-[0.2em] text-slate-300"
          onClick={toggleCart}
        >
          <ShoppingBagIcon className="mb-1 h-5 w-5" />
          Cart
          {itemCount > 0 ? (
            <span className="absolute -right-2 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
              {itemCount}
            </span>
          ) : null}
        </button>
        <button
          type="button"
          className="flex flex-col items-center text-xs uppercase tracking-[0.2em] text-slate-300"
          aria-label="Account"
        >
          <UserIcon className="mb-1 h-5 w-5" />
          Account
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur"
          >
            <div className="mx-auto flex h-full max-w-md flex-col gap-4 px-6 py-12">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.4em] text-slate-400">Categories</span>
                <button
                  type="button"
                  className="rounded-full border border-white/20 p-2 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="grid gap-4">
                {categories.map((category) => (
                  <div key={category} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">{category}</p>
                      <span className="text-xs uppercase text-slate-500">
                        {products.filter((product) => product.categories.includes(category)).length} styles
                      </span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {products
                        .filter((product) => product.categories.includes(category))
                        .map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="w-32 shrink-0"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="relative h-36 w-full overflow-hidden rounded-xl">
                              <Image
                                src={product.thumbnail}
                                alt={product.title}
                                fill
                                sizes="128px"
                                className="object-cover"
                              />
                            </div>
                            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-200">
                              {product.title}
                            </p>
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
