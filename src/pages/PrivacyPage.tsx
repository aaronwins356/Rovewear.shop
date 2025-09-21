const PrivacyPage = () => (
  <div className="mx-auto w-full max-w-4xl space-y-10 px-6 py-24">
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Privacy</p>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">We protect your clarity.</h1>
      <p className="text-sm text-neutral-500">
        ROVE respects your privacy. This template outlines how we collect, use, and safeguard information when you interact with the storefront.
      </p>
    </div>
    <section className="space-y-4 rounded-[3rem] border border-neutral-200 bg-white p-10">
      <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">Data we collect</h2>
      <p className="text-sm text-neutral-500">
        Order details, contact information, and opt-in marketing preferences collected during checkout or newsletter sign-up. Payment data stays with your processor.
      </p>
    </section>
    <section className="space-y-4 rounded-[3rem] border border-neutral-200 bg-white p-10">
      <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">How we use it</h2>
      <p className="text-sm text-neutral-500">
        To fulfil orders, provide support, and tailor future releases. We never sell personal data and only share with logistics partners when essential for delivery.
      </p>
    </section>
    <section className="space-y-4 rounded-[3rem] border border-neutral-200 bg-white p-10">
      <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">Your controls</h2>
      <p className="text-sm text-neutral-500">
        Customers can request data exports or deletion at any time. Update your preferences via your account portal or by contacting our concierge team.
      </p>
    </section>
  </div>
);

export default PrivacyPage;
