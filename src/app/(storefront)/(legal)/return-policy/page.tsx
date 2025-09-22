import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "Understand how to initiate returns, exchanges, and repairs for ROVE eyewear."
};

export default function ReturnPolicyPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHero title="Easy returns" subtitle="If something isn’t perfect, we’ll make it right." />
      <section className="space-y-6 text-sm leading-relaxed text-neutral-600">
        <p>
          You have 30 days from delivery to initiate a return or exchange. Frames must be in like-new condition. Contact our
          support team to receive a prepaid shipping label and processing instructions.
        </p>
        <p>
          Repairs are complimentary for the lifetime of the product. For adjustments, visit a partner optical studio or ship
          your frames back to us for tuning.
        </p>
      </section>
    </div>
  );
}
