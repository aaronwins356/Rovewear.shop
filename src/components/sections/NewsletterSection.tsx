"use client";

import { useState } from "react";

import type { MarketingContent } from "@/types/product";

export function NewsletterSection({ marketing }: { marketing: MarketingContent }): JSX.Element {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  return (
    <section className="bg-neutral-900 py-16 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-semibold">{marketing.newsletterHeadline}</h2>
        <p className="mt-3 text-sm text-white/70">{marketing.newsletterSubheadline}</p>
        <form
          className="mt-8 flex flex-col gap-4 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            // Newsletter integration (e.g. Resend/Mailchimp) can be wired here via API route.
            setStatus("success");
          }}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            className="w-full rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm placeholder:text-white/50 focus:border-white focus:outline-none"
            placeholder="you@example.com"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200"
          >
            Join the list
          </button>
        </form>
        {status === "success" ? (
          <p className="mt-4 text-sm text-emerald-300">Thanks! Check your inbox to confirm your subscription.</p>
        ) : null}
      </div>
    </section>
  );
}
