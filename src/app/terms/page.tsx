import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | ROVE Eyewear",
  description: "Review the purchase terms, shipping policies, and usage guidelines for ROVE Eyewear products.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-6 pb-32 pt-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Terms</p>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white">Conditions of purchase</h1>
        <p className="text-sm text-slate-400">
          These terms outline the expectations for purchasing ROVE eyewear, delivery timelines, and returns.
        </p>
      </header>

      <section className="space-y-4 text-sm text-slate-300">
        <p>
          Orders are processed within 2-3 business days. Delivery times vary by region and are displayed during checkout. Custom
          or prescription lenses may require additional production time.
        </p>
        <p>
          Returns are accepted within 30 days of delivery in original condition. Contact support to initiate an exchange or
          refund.
        </p>
        <p>
          Using this site constitutes agreement with these terms. For questions email <a href="mailto:support@rovewear.shop" className="underline decoration-dotted decoration-white/40">support@rovewear.shop</a>.
        </p>
      </section>
    </div>
  );
}
