import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Review the purchase terms, warranty policies, and usage guidelines for ROVE eyewear."
};

export default function TermsPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHero title="Terms & Conditions" subtitle="Transparency is part of the ROVE experience." />
      <section className="space-y-6 text-sm leading-relaxed text-neutral-600">
        <p>
          Orders are processed within two business days. Once a Stripe payment succeeds you will receive confirmation and
          shipping details. Pre-order items display estimated ship dates inside the product details managed through Sanity.
        </p>
        <p>
          ROVE eyewear includes a two-year manufacturing warranty and lifetime fit adjustments. Use of the site constitutes
          acceptance of these terms and the privacy policy.
        </p>
      </section>
    </div>
  );
}
