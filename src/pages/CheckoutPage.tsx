import ButtonLink from '../components/ButtonLink';

const CheckoutPage = () => (
  <div className="mx-auto w-full max-w-4xl space-y-10 px-6 py-24">
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Checkout</p>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Secure checkout coming soon.</h1>
      <p className="text-sm text-neutral-500">
        This template is wired for Stripe or your preferred payment provider. Connect credentials in Vercel when you are ready to launch.
      </p>
    </div>
    <section className="grid gap-8 rounded-[3rem] border border-neutral-200 bg-white p-10 md:grid-cols-2">
      <div className="space-y-3 text-sm text-neutral-500">
        <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">Implementation checklist</h2>
        <ul className="space-y-2">
          <li>• Configure Stripe secret/public keys via Vercel environment variables.</li>
          <li>• Add webhook endpoint for order confirmations and fulfilment.</li>
          <li>• Swap in your CMS or ERP to sync live inventory.</li>
        </ul>
      </div>
      <div className="space-y-3 text-sm text-neutral-500">
        <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">Customer assurance</h2>
        <ul className="space-y-2">
          <li>• Cart contents persist locally so shoppers can return without losing selections.</li>
          <li>• Taxes and shipping rules plug into your payment provider.</li>
          <li>• PCI compliance handled via hosted checkout.</li>
        </ul>
      </div>
    </section>
    <div className="rounded-[3rem] border border-neutral-200 bg-neutral-50 p-10 text-sm text-neutral-500">
      <p>
        Ready to integrate? Replace the placeholder checkout handler with your payment intent call and surface the success/cancel routes as return URLs.
      </p>
      <ButtonLink to="/success" className="mt-6 inline-flex">
        Preview success flow
      </ButtonLink>
    </div>
  </div>
);

export default CheckoutPage;
