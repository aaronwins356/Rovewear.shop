"use client";

import { useState } from "react";

import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export function CheckoutClient(): JSX.Element {
  const { items, subtotal, currency, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    try {
      setIsProcessing(true);
      setError(null);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: items.map((item) => ({
            price_data: {
              currency,
              product_data: {
                name: item.name,
                images: item.image?.url ? [item.image.url] : undefined
              },
              unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Unable to start checkout. Please try again.");
      }

      const session = (await response.json()) as { url: string };
      clearCart();
      window.location.href = session.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unexpected error");
      setIsProcessing(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">Checkout</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Secure payment powered by Stripe. Update product pricing and inventory through Sanity and the checkout flow will
            stay in sync.
          </p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void handleCheckout();
          }}
        >
          <label className="block text-sm font-medium text-neutral-700" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-full border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
          />
          <label className="block text-sm font-medium text-neutral-700" htmlFor="notes">
            Order notes
          </label>
          <textarea
            id="notes"
            rows={4}
            placeholder="Special delivery instructions"
            className="w-full rounded-3xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
            disabled={isProcessing || items.length === 0}
          >
            {isProcessing ? "Redirecting to Stripe…" : "Continue to payment"}
          </button>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
        </form>
      </section>
      <aside className="rounded-3xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm text-neutral-700">
          {items.map((item) => (
            <li key={`${item.productId}-${item.variantName ?? "default"}`} className="flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity, currency)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between text-sm font-semibold text-neutral-900">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal, currency)}</span>
        </div>
        <p className="mt-2 text-xs text-neutral-500">Taxes and shipping are calculated at Stripe checkout.</p>
      </aside>
    </div>
  );
}
