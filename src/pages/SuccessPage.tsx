import ButtonLink from '../components/ButtonLink';

const SuccessPage = () => (
  <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
    <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Success</p>
    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900">Payment confirmed.</h1>
    <p className="mt-4 text-sm text-neutral-500">
      Thank you for choosing ROVE. Your order is being prepared and you will receive shipping updates shortly.
    </p>
    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <ButtonLink to="/products" variant="outline">
        Continue exploring
      </ButtonLink>
      <ButtonLink to="/privacy" variant="ghost">
        Read our policies
      </ButtonLink>
    </div>
  </div>
);

export default SuccessPage;
