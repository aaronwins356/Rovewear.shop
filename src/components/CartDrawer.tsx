"use client";

import { Fragment, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { Button } from "./Button";

const STRIPE_CHECKOUT_PATH = "/api/checkout";

export function CartDrawer() {
  const { isOpen, closeCart, lineItems, subtotal, incrementItem, decrementItem, removeItem, clear } = useCart();

  const stripePayload = useMemo(() => {
    return lineItems.map((item) => {
      const variant = item.variantColor
        ? item.product.variants.find((entry) => entry.color === item.variantColor)
        : undefined;
      const name = variant ? `${item.product.title} – ${variant.color}` : item.product.title;
      const unitAmount = Math.round((variant?.price ?? item.product.price ?? 0) * 100);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name,
            images: [variant?.image ?? item.product.thumbnail],
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });
  }, [lineItems]);

  const hasItems = lineItems.length > 0;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md bg-slate-950 shadow-elevated">
                  <div className="flex h-full flex-col overflow-y-scroll py-8">
                    <div className="flex items-start justify-between px-6">
                      <Dialog.Title className="text-lg font-semibold uppercase tracking-widest text-slate-200">
                        Your Cart
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-full bg-white/10 p-2 text-slate-200 transition hover:bg-white/20"
                        onClick={closeCart}
                        aria-label="Close cart"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-8 flex-1 space-y-6 px-6">
                      {hasItems ? (
                        lineItems.map((item) => {
                          const variant = item.variantColor
                            ? item.product.variants.find((entry) => entry.color === item.variantColor)
                            : undefined;
                          const imageSrc = variant?.image ?? item.product.thumbnail;
                          const priceLabel = (variant?.price ?? item.product.price ?? 0).toFixed(2);

                          return (
                            <div key={`${item.productId}-${variant?.color ?? "base"}`} className="flex gap-4">
                              <div className="relative h-28 w-28 overflow-hidden rounded-lg bg-slate-900">
                                <Image
                                  src={imageSrc}
                                  alt={item.product.title}
                                  fill
                                  sizes="112px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-1 flex-col justify-between">
                                <div>
                                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                                    <Link href={`/products/${item.product.slug}`} onClick={closeCart}>
                                      {item.product.title}
                                    </Link>
                                  </h3>
                                  {variant?.color ? (
                                    <p className="text-xs uppercase text-slate-400">{variant.color}</p>
                                  ) : null}
                                </div>
                                <div className="flex items-center justify-between text-sm text-slate-300">
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      className="rounded-full border border-white/10 px-2 py-1 text-xs"
                                      onClick={() => decrementItem(item.productId, variant?.color)}
                                      aria-label="Decrease quantity"
                                    >
                                      –
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                      type="button"
                                      className="rounded-full border border-white/10 px-2 py-1 text-xs"
                                      onClick={() => incrementItem(item.productId, variant?.color)}
                                      aria-label="Increase quantity"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <div className="text-right">
                                    <p>${priceLabel}</p>
                                    <button
                                      type="button"
                                      className="mt-1 text-xs uppercase text-slate-500 hover:text-slate-300"
                                      onClick={() => removeItem(item.productId, variant?.color)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-slate-400">Your cart is waiting for something remarkable.</p>
                      )}
                    </div>

                    {hasItems ? (
                      <div className="mt-8 border-t border-white/10 px-6 pt-6">
                        <div className="flex items-center justify-between text-sm text-slate-300">
                          <p>Subtotal</p>
                          <p className="text-lg font-semibold text-white">${subtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                          Shipping, taxes, and discounts calculated at checkout.
                        </p>
                        <form method="post" action={STRIPE_CHECKOUT_PATH} className="mt-6 space-y-3">
                          <input type="hidden" name="payload" value={JSON.stringify(stripePayload)} />
                          <Button type="submit" size="md" className="w-full">
                            Checkout with Stripe
                          </Button>
                          <Button type="button" variant="secondary" size="md" className="w-full" onClick={clear}>
                            Clear cart
                          </Button>
                        </form>
                      </div>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
