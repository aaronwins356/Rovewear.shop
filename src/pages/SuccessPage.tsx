import React from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { Seo } from '../components/Seo';

export const SuccessPage: React.FC = () => (
  <div className="mx-auto max-w-3xl px-6 pb-24 pt-12 text-center">
    <Seo title="Order Confirmed | ROVE Eyewear" />
    <div className="rounded-3xl border border-white/10 bg-white/5 p-12">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-green-300">Success</p>
      <h1 className="mb-6 text-4xl uppercase tracking-[0.3em]">Thank you</h1>
      <p className="mb-8 text-sm text-white/70">
        Your order is confirmed. Look out for a confirmation email with shipping details. Our atelier is preparing your
        frames with care.
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <ButtonLink to="/products">Shop More Frames</ButtonLink>
        <ButtonLink to="/" variant="secondary">
          Back to home
        </ButtonLink>
      </div>
    </div>
  </div>
);
