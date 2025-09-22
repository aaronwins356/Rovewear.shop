"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export function CartDrawer(): JSX.Element {
  const { items, subtotal, currency, isDrawerOpen, closeDrawer, updateQuantity, removeItem, itemCount } = useCart();

  const hasItems = items.length > 0;
  const formattedSubtotal = useMemo(() => formatCurrency(subtotal, currency), [currency, subtotal]);

  return (
    <AnimatePresence>
      {isDrawerOpen ? (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden
            onClick={closeDrawer}
          />
          <motion.aside
            key="drawer"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold">Your cart</h2>
                <p className="text-sm text-neutral-500">{hasItems ? `${itemCount} item${itemCount === 1 ? "" : "s"} selected` : "Your cart is empty."}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-neutral-200 px-3 py-1 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                onClick={closeDrawer}
              >
                Close
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {hasItems ? (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={`${item.productId}-${item.variantName ?? "default"}`} className="flex gap-4">
                      {item.image?.url ? (
                        <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-md bg-neutral-100">
                          <Image
                            src={item.image.url}
                            alt={item.image.alt ?? item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-md bg-neutral-100 text-sm text-neutral-500">
                          No image
                        </div>
                      )}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            className="text-sm font-semibold text-neutral-900 hover:text-neutral-600"
                            onClick={closeDrawer}
                          >
                            {item.name}
                          </Link>
                          {item.variantName ? (
                            <p className="text-xs text-neutral-500">{item.variantName}</p>
                          ) : null}
                          <p className="mt-1 text-sm font-medium text-neutral-900">
                            {formatCurrency(item.price, item.currency)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <label className="sr-only" htmlFor={`qty-${item.productId}`}>
                              Quantity for {item.name}
                            </label>
                            <select
                              id={`qty-${item.productId}`}
                              className="rounded-md border border-neutral-200 px-2 py-1 text-sm"
                              value={item.quantity}
                              onChange={(event) => updateQuantity(item.productId, Number(event.target.value), item.variantName)}
                            >
                              {Array.from({ length: item.maxQuantity ?? 10 }, (_, index) => index + 1).map((quantity) => (
                                <option key={quantity} value={quantity}>
                                  {quantity}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId, item.variantName)}
                            className="text-sm text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center text-sm text-neutral-500">
                  <p>Explore our designer frames and add your favorites to the cart.</p>
                  <Link
                    href="/catalog"
                    className="mt-4 rounded-full bg-neutral-900 px-6 py-2 text-sm font-semibold text-white hover:bg-neutral-700"
                    onClick={closeDrawer}
                  >
                    Browse collection
                  </Link>
                </div>
              )}
            </div>
            <footer className="border-t border-neutral-200 px-6 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span className="text-lg font-semibold text-neutral-900">{formattedSubtotal}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Taxes and shipping calculated at checkout. Secure Stripe payments.
              </p>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-700"
              >
                Proceed to checkout
              </Link>
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
