import React from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { Seo } from '../components/Seo';

export const AboutPage: React.FC = () => (
  <div className="mx-auto max-w-4xl px-6 pb-24 pt-12">
    <Seo
      title="About ROVE | Luxury Eyewear Studio"
      description="ROVE is a luxury eyewear brand crafting cinematic frames inspired by adventure, architecture, and light."
    />
    <section className="space-y-8">
      <h1 className="text-4xl uppercase tracking-[0.3em]">The ROVE manifesto</h1>
      <p className="text-sm text-white/70">
        ROVE was founded to create eyewear that performs like technical gear while looking like an art piece. Every
        frame is engineered with titanium cores, Italian acetates, and custom gradient lenses to stand up to life on the
        move. We champion fewer, better objects that become part of your signature.
      </p>
      <p className="text-sm text-white/70">
        Each pair is handcrafted in micro-batches, inspected by artisans, and finished with scratch-resistant coatings.
        Our optical lab uses ZEISS precision to cut and polish every lens, ensuring clarity that holds up on camera and
        in harsh sunlight.
      </p>
      <p className="text-sm text-white/70">
        With showrooms in Los Angeles and Tokyo, we offer one-on-one fittings, virtual styling, and lifetime tune-ups.
        ROVE eyewear is for explorers, creators, and icons who see the world differently.
      </p>
      <div className="pt-4">
        <ButtonLink to="/products">View the collection</ButtonLink>
      </div>
    </section>
  </div>
);
