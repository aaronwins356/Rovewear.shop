import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Checkout Cancelled | ROVE Eyewear",
  description: "The checkout session was cancelled. Return to the cart to review your selections or try again.",
};

export default function CheckoutCancelPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Checkout cancelled</p>
      <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white md:text-4xl">
        Need to tweak your order?
      </h1>
      <p className="max-w-xl text-sm text-slate-400">
        No charge was made. Revisit your cart to adjust frames or head back to the catalog for more inspiration.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/cart" size="lg">
          Return to cart
        </ButtonLink>
        <ButtonLink href="/products" variant="secondary" size="lg">
          Browse more frames
        </ButtonLink>
      </div>
    </section>
  );
}
