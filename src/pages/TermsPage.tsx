import React from 'react';
import { Seo } from '../components/Seo';

export const TermsPage: React.FC = () => (
  <div className="mx-auto max-w-3xl px-6 pb-24 pt-12 space-y-8">
    <Seo title="Terms &amp; Conditions | ROVE Eyewear" />
    <h1 className="text-4xl uppercase tracking-[0.3em]">Terms &amp; Conditions</h1>
    <p className="text-sm text-white/70">
      Orders are fulfilled within 2-4 business days. Custom lens orders require an additional 5-7 days for lab finishing.
      Returns are accepted within 30 days if frames are unworn and in original condition. Prescription lenses are
      non-refundable but may be remade if prescriptions are incorrect.
    </p>
    <p className="text-sm text-white/70">
      By purchasing from ROVE, you agree to our care guidelines and understand that adjustments should be performed by
      authorized opticians to maintain warranty coverage.
    </p>
    <p className="text-sm text-white/70">
      California law governs these terms. Contact legal@rovewear.shop with any questions.
    </p>
  </div>
);
