import type { Metadata } from "next";

import { CheckoutClient } from "@/components/sections/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | ROVE",
  description: "Complete your ROVE eyewear order with secure Stripe Checkout integration."
};

export default function CheckoutPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <CheckoutClient />
    </div>
  );
}
