import { Link } from 'react-router-dom';

const SuccessPage = () => (
  <div className="mx-auto w-full max-w-3xl px-6 py-24 space-y-6 text-center">
    <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Success</p>
    <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Payment confirmed.</h1>
    <p className="text-sm text-neutral-500">
      Thank you for choosing ROVE. Your order is being prepared and you will receive shipping updates shortly.
    </p>
    <Link
      to="/products"
      className="inline-flex rounded-full border border-neutral-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
    >
      Continue exploring
    </Link>
  </div>
);

export default SuccessPage;
