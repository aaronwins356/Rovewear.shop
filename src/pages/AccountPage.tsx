import React from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { Seo } from '../components/Seo';

export const AccountPage: React.FC = () => (
  <div className="mx-auto max-w-3xl px-6 pb-24 pt-12 space-y-8">
    <Seo title="Account | ROVE Eyewear" />
    <h1 className="text-4xl uppercase tracking-[0.3em]">Account Access</h1>
    <p className="text-sm text-white/70">
      Customer accounts are coming soon. Sign in to view purchase history, book fittings, and manage warranties once the
      platform is live.
    </p>
    <ButtonLink to="/products" variant="secondary">
      Browse the collection
    </ButtonLink>
  </div>
);
