import React from 'react';
import { Seo } from '../components/Seo';

export const PrivacyPage: React.FC = () => (
  <div className="mx-auto max-w-3xl px-6 pb-24 pt-12 space-y-8">
    <Seo title="Privacy Policy | ROVE Eyewear" />
    <h1 className="text-4xl uppercase tracking-[0.3em]">Privacy Policy</h1>
    <p className="text-sm text-white/70">
      ROVE collects only the data required to deliver your eyewear and provide concierge support. We do not sell or rent
      personal information. Data is processed through secure, PCI-compliant partners including Stripe and Shopify for
      payment processing.
    </p>
    <p className="text-sm text-white/70">
      When you create an account or join our newsletter, we store your preferences to personalize future releases. You
      may request deletion of your account at any time by contacting privacy@rovewear.shop.
    </p>
    <p className="text-sm text-white/70">
      Cookies are used for analytics and personalization. You can adjust preferences through your browser or by emailing
      support@rovewear.shop.
    </p>
  </div>
);
