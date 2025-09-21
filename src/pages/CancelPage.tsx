import { Link } from 'react-router-dom';

const CancelPage = () => (
  <div className="mx-auto w-full max-w-3xl px-6 py-24 space-y-6 text-center">
    <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Checkout cancelled</p>
    <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Payment not completed.</h1>
    <p className="text-sm text-neutral-500">
      Your card was not charged. You can revisit your cart, update selections, and try again whenever you are ready.
    </p>
    <Link
      to="/cart"
      className="inline-flex rounded-full border border-neutral-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
    >
      Return to cart
    </Link>
  </div>
);

export default CancelPage;
