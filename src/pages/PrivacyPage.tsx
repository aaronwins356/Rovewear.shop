const PrivacyPage = () => (
  <div className="mx-auto w-full max-w-3xl px-6 py-24 space-y-6">
    <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Privacy</p>
    <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Your data, protected.</h1>
    <p className="text-sm text-neutral-500">
      We use cookies to personalise your experience and analyse engagement. You can opt out at any time. Customer profiles
      and order history are encrypted and stored securely. For integrations such as Stripe, manage API keys via Vercel
      environment variables.
    </p>
    <p className="text-sm text-neutral-500">
      Update this copy with your legal policy. Add consent banners or analytics scripts directly in <code>index.html</code>
      or through Vercel integrations.
    </p>
  </div>
);

export default PrivacyPage;
