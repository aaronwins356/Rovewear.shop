"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Button, ButtonLink } from "./Button";
import { useCart } from "./CartProvider";

const STRIPE_CHECKOUT_PATH = "/api/checkout";
type CartLineItems = ReturnType<typeof useCart>["lineItems"];

export function CartPage() {
  const { lineItems, subtotal, incrementItem, decrementItem, removeItem } = useCart();

  const shippingEstimate = useMemo(() => (lineItems.length > 0 ? 6.95 : 0), [lineItems.length]);
  const total = useMemo(() => subtotal + shippingEstimate, [shippingEstimate, subtotal]);

  if (lineItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Your cart is quiet</p>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white">
          Add a frame to amplify your focus
        </h1>
        <p className="max-w-lg text-sm text-slate-400">
          Keep exploring the ROVE catalog to discover silhouettes engineered for blue-light performance and couture-level fit.
        </p>
        <ButtonLink href="/products" size="lg">
          Shop the Catalog
        </ButtonLink>
      </section>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-6 pb-32">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Cart</p>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white md:text-4xl">
          Ready for liftoff
        </h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Review your frames, adjust quantities, and head to checkout. Each selection includes anti-glare hard coat, storage case,
          and microfiber cloth.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <section className="space-y-6">
          {lineItems.map((item) => {
            const variant = item.variantColor
              ? item.product.variants.find((entry) => entry.color === item.variantColor)
              : undefined;
            const price = variant?.price ?? item.product.price ?? 0;
            const imageSrc = variant?.image ?? item.product.thumbnail;

            return (
              <article
                key={`${item.productId}-${variant?.color ?? "base"}`}
                className="flex gap-6 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="relative h-40 w-40 overflow-hidden rounded-2xl">
                  <Image src={imageSrc} alt={item.product.title} fill sizes="160px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                      {item.product.categories.join(" • ")}
                    </p>
                    <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-white">
                      <Link href={`/products/${item.product.slug}`} className="hover:text-slate-200">
                        {item.product.title}
                      </Link>
                    </h2>
                    {variant?.color ? (
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{variant.color}</p>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-white">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => decrementItem(item.productId, variant?.color)}
                        aria-label="Decrease quantity"
                      >
                        –
                      </Button>
                      <span className="w-8 text-center text-xs uppercase tracking-[0.3em] text-slate-200">{item.quantity}</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => incrementItem(item.productId, variant?.color)}
                        aria-label="Increase quantity"
                      >
                        +
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">${price.toFixed(2)}</p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, variant?.color)}
                        className="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-500 hover:text-slate-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Summary</p>
            <div className="flex items-center justify-between text-sm uppercase tracking-[0.25em] text-slate-300">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm uppercase tracking-[0.25em] text-slate-300">
              <span>Shipping</span>
              <span>{shippingEstimate > 0 ? `$${shippingEstimate.toFixed(2)}` : "Calculated at checkout"}</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.3em] text-white">
              <span>Estimated total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <ButtonLink href="/checkout" size="lg" className="w-full">
              Proceed to Checkout
            </ButtonLink>
            <form method="post" action={STRIPE_CHECKOUT_PATH} className="w-full">
              <input type="hidden" name="payload" value={JSON.stringify(createStripePayload(lineItems))} />
              <Button type="submit" variant="secondary" size="lg" className="w-full">
                Checkout with Stripe
              </Button>
            </form>
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
              Stripe handles payments securely. Duties and taxes calculated after address confirmation.
            </p>
          </div>
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
