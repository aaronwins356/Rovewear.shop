import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how ROVE collects, stores, and protects customer data across our digital storefront."
};

export default function PrivacyPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHero title="Privacy matters" subtitle="We use data responsibly to deliver personalized experiences without compromising trust." />
      <section className="space-y-6 text-sm leading-relaxed text-neutral-600">
        <p>
          ROVE stores only the information required to fulfill orders, manage warranties, and provide newsletter content you
          opt into. Payment details are processed exclusively through Stripe and never touch our servers.
        </p>
        <p>
          Sanity hosts our content and product catalog. Access is limited to authorized team members using secure SSO and
          multi-factor authentication.
        </p>
        <p>
          To request access, updates, or deletion of your data, contact us at {siteConfig.contact.email}. We respond within 48
          hours and comply with GDPR, CCPA, and regional privacy frameworks.
        </p>
      </section>
    </div>
  );
}
