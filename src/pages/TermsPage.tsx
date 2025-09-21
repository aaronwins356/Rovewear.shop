const TermsPage = () => (
  <div className="mx-auto w-full max-w-4xl space-y-10 px-6 py-24">
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Terms</p>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Transparent policies.</h1>
      <p className="text-sm text-neutral-500">
        Outline your purchase terms, warranty information, and return policy here. Pair with an FAQ page or automated email flows to answer customer questions quickly.
      </p>
    </div>
    <section className="space-y-4 rounded-[3rem] border border-neutral-200 bg-white p-10">
      <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">Orders & shipping</h2>
      <p className="text-sm text-neutral-500">
        Standard fulfilment within 2 business days. Express upgrades available at checkout. International duties handled by the receiving customer unless otherwise noted.
      </p>
    </section>
    <section className="space-y-4 rounded-[3rem] border border-neutral-200 bg-white p-10">
      <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">Returns & exchanges</h2>
      <p className="text-sm text-neutral-500">
        Returns accepted within 30 days in original condition. Complimentary adjustments and lens replacements available under our craftsmanship warranty.
      </p>
    </section>
    <section className="space-y-4 rounded-[3rem] border border-neutral-200 bg-white p-10">
      <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">Contact</h2>
      <p className="text-sm text-neutral-500">
        Need localisation? Duplicate this route per region and adjust your Vercel rewrites or middleware to serve the right version. Questions? concierge@rove.com.
      </p>
    </section>
  </div>
);

export default TermsPage;
