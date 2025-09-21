import React from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { Seo } from '../components/Seo';

export const CancelPage: React.FC = () => (
  <div className="mx-auto max-w-3xl px-6 pb-24 pt-12 text-center">
    <Seo title="Checkout Cancelled | ROVE Eyewear" />
    <div className="rounded-3xl border border-white/10 bg-white/5 p-12">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber-300">Payment Incomplete</p>
      <h1 className="mb-6 text-4xl uppercase tracking-[0.3em]">Order paused</h1>
      <p className="mb-8 text-sm text-white/70">
        Your Stripe checkout was cancelled. Your cart is saved so you can finish checking out when you’re ready.
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <ButtonLink to="/checkout">Return to checkout</ButtonLink>
        <ButtonLink to="/products" variant="secondary">
          Continue shopping
        </ButtonLink>
      </div>
    </div>
  </div>
);
