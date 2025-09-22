import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "About ROVE",
  description: "ROVE is a designer eyewear house crafting premium optics and future-forward accessories."
};

export default function AboutPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHero title="We design for the modern explorer" subtitle="ROVE eyewear is born from a love of travel, astrophotography, and industrial design." />
      <section className="space-y-6 text-sm leading-relaxed text-neutral-600">
        <p>
          From concept sketch to final polish, each frame is engineered in our Portland studio using bio-acetate and
          aerospace-grade alloys. We collaborate with Zeiss laboratories to integrate adaptive optics that transition from
          sun-drenched expeditions to late-night edits seamlessly.
        </p>
        <p>
          Sanity Studio empowers our team to curate capsule releases, artist collaborations, and storytelling modules without
          touching code. As we expand into dropshipping partnerships, the storefront is ready to integrate supplier APIs for
          real-time stock and fulfillment.
        </p>
        <p>
          Sustainability anchors our craft—frames are repairable, packaging is recycled, and every order funds ocean cleanup
          initiatives.
        </p>
      </section>
    </div>
  );
}
