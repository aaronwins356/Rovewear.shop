import { Link } from 'react-router-dom';

const CheckoutPage = () => (
  <div className="mx-auto w-full max-w-3xl px-6 py-24">
    <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Checkout</p>
    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900">Secure checkout coming soon.</h1>
    <p className="mt-4 text-sm text-neutral-500">
      This template is wired for Stripe or your preferred payment provider. Connect credentials in Vercel when you are ready
      to launch.
    </p>
    <div className="mt-8 space-y-3 text-sm text-neutral-500">
      <p>• Cart contents persist locally so customers can return without losing their selections.</p>
      <p>• Configure webhook endpoints on Vercel to enable order confirmations.</p>
      <p>• Update environment variables (e.g. STRIPE_SECRET_KEY) without hardcoding secrets.</p>
    </div>
    <Link
      to="/products"
      className="mt-10 inline-flex rounded-full border border-neutral-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
    >
      Return to collection
    </Link>
  </div>
);

export default CheckoutPage;
