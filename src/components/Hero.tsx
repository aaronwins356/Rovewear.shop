import React from 'react';
import { motion } from 'framer-motion';
import { ButtonLink } from './ButtonLink';

export const Hero: React.FC = () => (
  <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-br from-black via-brand.accent to-black">
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        backgroundImage:
          'radial-gradient(circle at top, rgba(255,255,255,0.1), transparent 55%), url(/products/aviator.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
    <motion.div
      className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3 }}
    >
      <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/60">Rove Eyewear</p>
      <h1 className="mb-6 text-4xl font-light uppercase tracking-[0.2em] text-white md:text-6xl">
        Sculpted optics for every horizon
      </h1>
      <p className="mb-8 max-w-xl text-base text-white/80 md:text-lg">
        Discover cinematic silhouettes engineered with titanium, acetate, and optical-grade lenses. Built to travel
        the world with you.
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <ButtonLink to="/products" size="lg">
          Shop Now
        </ButtonLink>
        <ButtonLink to="/about" variant="secondary" size="lg">
          Our Story
        </ButtonLink>
      </div>
    </motion.div>
  </section>
);
