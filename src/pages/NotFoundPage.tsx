import React from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { Seo } from '../components/Seo';

export const NotFoundPage: React.FC = () => (
  <div className="mx-auto max-w-3xl px-6 pb-24 pt-12 text-center">
    <Seo title="Not Found | ROVE Eyewear" />
    <div className="rounded-3xl border border-white/10 bg-white/5 p-12">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">404</p>
      <h1 className="mb-6 text-4xl uppercase tracking-[0.3em]">Page not found</h1>
      <p className="mb-8 text-sm text-white/70">
        The page you were looking for doesn’t exist. Explore our latest releases instead.
      </p>
      <ButtonLink to="/products">Browse eyewear</ButtonLink>
    </div>
  </div>
);
