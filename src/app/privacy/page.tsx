import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ROVE Eyewear",
  description: "Learn how ROVE Eyewear handles customer data, analytics, and checkout information across the storefront.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-6 pb-32 pt-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Privacy policy</p>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white">Your data, your control</h1>
        <p className="text-sm text-slate-400">
          ROVE uses analytics and checkout tooling to improve the experience while respecting your privacy.
        </p>
      </header>

      <section className="space-y-4 text-sm text-slate-300">
        <p>
          We collect basic analytics (page views, referral source, device info) to optimise merchandising decisions. Payment
          details are never stored on our servers and are processed exclusively by Stripe.
        </p>
        <p>
          Newsletter subscriptions are opt-in only. You may unsubscribe at any time, and we will remove your information upon
          request.
        </p>
        <p>
          For privacy requests contact <a href="mailto:privacy@rovewear.shop" className="underline decoration-dotted decoration-white/40">privacy@rovewear.shop</a>.
        </p>
      </section>
    </div>
  );
}
