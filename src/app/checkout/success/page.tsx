import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Checkout Success | ROVE Eyewear",
  description: "Confirmation page for successful ROVE eyewear orders processed through Stripe.",
};

export default function CheckoutSuccessPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Payment received</p>
      <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white md:text-4xl">
        Your ROVE eyewear is being prepped
      </h1>
      <p className="max-w-xl text-sm text-slate-400">
        We emailed a receipt and will share tracking once your frames depart the studio. In the meantime, explore more silhouettes
        or refine your workspace setup.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/products" size="lg">
          Continue shopping
        </ButtonLink>
        <Link href="/about" className="text-xs uppercase tracking-[0.3em] text-slate-300 hover:text-white">
          Learn about ROVE craftsmanship
        </Link>
      </div>
    </section>
  );
}
