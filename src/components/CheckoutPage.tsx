"use client";

import { useMemo, useState } from "react";
import { Button, ButtonLink } from "./Button";
import { useCart } from "./CartProvider";

const STRIPE_CHECKOUT_PATH = "/api/checkout";
type CartLineItems = ReturnType<typeof useCart>["lineItems"];

type ContactFormState = {
  email: string;
  phone: string;
  notes: string;
};

const INITIAL_CONTACT_STATE: ContactFormState = {
  email: "",
  phone: "",
  notes: "",
};

export function CheckoutPage() {
  const { lineItems, subtotal } = useCart();
  const [contact, setContact] = useState<ContactFormState>(INITIAL_CONTACT_STATE);

  const shippingEstimate = useMemo(() => (lineItems.length > 0 ? 6.95 : 0), [lineItems.length]);
  const total = useMemo(() => subtotal + shippingEstimate, [shippingEstimate, subtotal]);

  if (lineItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Your bag is empty</p>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white">
          Add frames to continue to checkout
        </h1>
        <p className="max-w-lg text-sm text-slate-400">
          Build your look from the products catalog before finalising your order.
        </p>
        <ButtonLink href="/products" size="lg">
          Explore the catalog
        </ButtonLink>
      </section>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 px-6 pb-32">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Checkout</p>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white md:text-4xl">
          Finalise your ROVE order
        </h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Confirm your contact details and continue to our Stripe-secured payment flow. Shipping and taxes are calculated once
          your delivery address is confirmed.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur" aria-label="Contact information">
          <fieldset className="space-y-4">
            <legend className="text-xs uppercase tracking-[0.35em] text-slate-500">Contact</legend>
            <div className="space-y-2">
              <label htmlFor="checkout-email" className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Email
              </label>
              <input
                id="checkout-email"
                type="email"
                required
                value={contact.email}
                onChange={(event) => setContact((prev) => ({ ...prev, email: event.target.value }))}
                className="w-full rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm uppercase tracking-[0.25em] text-white placeholder:text-slate-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="you@nightshift.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="checkout-phone" className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Phone (optional)
              </label>
              <input
                id="checkout-phone"
                type="tel"
                value={contact.phone}
                onChange={(event) => setContact((prev) => ({ ...prev, phone: event.target.value }))}
                className="w-full rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm uppercase tracking-[0.25em] text-white placeholder:text-slate-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-xs uppercase tracking-[0.35em] text-slate-500">Delivery notes</legend>
            <textarea
              id="checkout-notes"
              value={contact.notes}
              onChange={(event) => setContact((prev) => ({ ...prev, notes: event.target.value }))}
              placeholder="Share preferred delivery instructions."
              rows={4}
              className="w-full rounded-3xl border border-white/20 bg-transparent px-5 py-4 text-sm uppercase tracking-[0.2em] text-white placeholder:text-slate-500 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </fieldset>

          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
            Payment processing is handled by Stripe. Your email is used for digital receipts and order updates.
          </p>
        </form>

        <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Order summary</p>
            <ul className="space-y-2 text-sm uppercase tracking-[0.25em] text-slate-300">
              {lineItems.map((item) => {
                const variant = item.variantColor
                  ? item.product.variants.find((entry) => entry.color === item.variantColor)
                  : undefined;
                const price = variant?.price ?? item.product.price ?? 0;

                return (
                  <li key={`${item.productId}-${variant?.color ?? "base"}`} className="flex justify-between">
                    <span className="text-left">{item.product.title}</span>
                    <span className="text-right">{item.quantity} × ${price.toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border-t border-white/10 pt-4 text-sm uppercase tracking-[0.25em] text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingEstimate > 0 ? `$${shippingEstimate.toFixed(2)}` : "Calculated at checkout"}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-white">
              <span className="text-sm font-semibold uppercase tracking-[0.3em]">Estimated total</span>
              <span className="text-lg font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>

          <form method="post" action={STRIPE_CHECKOUT_PATH} className="space-y-3">
            <input type="hidden" name="payload" value={JSON.stringify(createStripePayload(lineItems))} />
            <Button type="submit" size="lg" className="w-full">
              Continue to secure payment
            </Button>
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
              Clicking continue opens the Stripe-hosted checkout with your order details pre-filled.
            </p>
          </form>
        </aside>
      </div>
    </div>
  );
}

function createStripePayload(lineItems: CartLineItems) {
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
}
