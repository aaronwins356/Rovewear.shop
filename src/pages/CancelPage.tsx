import ButtonLink from '../components/ButtonLink';

const CancelPage = () => (
  <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
    <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Checkout cancelled</p>
    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900">Payment not completed.</h1>
    <p className="mt-4 text-sm text-neutral-500">
      Your card was not charged. You can revisit your cart, update selections, and try again whenever you are ready.
    </p>
    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <ButtonLink to="/cart" variant="outline">
        Return to cart
      </ButtonLink>
      <ButtonLink to="/products" variant="ghost">
        Browse collection
      </ButtonLink>
    </div>
  </div>
);

export default CancelPage;
