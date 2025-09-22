import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ROVE support for styling advice, wholesale inquiries, or warranty assistance."
};

export default function ContactPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <PageHero title="We’re here to help" subtitle="Reach our concierge team for custom fittings, status updates, or collaborations." />
      <div className="grid gap-8 rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">Support</h2>
          <p className="mt-2">Email: {siteConfig.contact.email}</p>
          <p>Phone: {siteConfig.contact.phone}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">Studio</h2>
          <p className="mt-2">Portland Flagship</p>
          <p>1600 NE Designers Ave, Portland OR</p>
        </div>
      </div>
    </div>
  );
}
