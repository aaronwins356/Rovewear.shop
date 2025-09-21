import { motion } from 'framer-motion';
import heroPattern from '../assets/pattern-grid.svg';
import mark from '../assets/rove-mark.svg';
import Button from './Button';
import ButtonLink from './ButtonLink';

interface HeroProps {
  onOpenCart: () => void;
}

const Hero = ({ onOpenCart }: HeroProps) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-900 text-white">
    <div className="absolute inset-0 opacity-30" aria-hidden="true">
      <img src={heroPattern} alt="" className="h-full w-full object-cover" />
    </div>
    <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
        <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[0.6rem] uppercase tracking-[0.4em] text-white/80 backdrop-blur">
          <img src={mark} alt="ROVE mark" className="h-6 w-6" />
          Modern eyewear atelier
        </div>
        <motion.h1
          className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
        >
          Crafted optics engineered for clarity from sunrise sets to midnight drive.
        </motion.h1>
        <p className="mt-6 max-w-xl text-base text-white/70">
          ROVE frames blend aerospace-grade alloys with artisan acetates. Experience featherweight balance, ocean-ready
          coatings, and silhouettes inspired by West Coast architecture.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to="/products" size="lg">
            Shop the collection
          </ButtonLink>
          <Button onClick={onOpenCart} variant="outline" size="lg">
            View cart
          </Button>
        </div>
      </motion.div>
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
      >
        <div className="relative mx-auto flex h-[26rem] w-full max-w-md items-center justify-center overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur">
          <div className="absolute -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-blue-900/60 via-slate-900/40 to-transparent blur-3xl" />
          <img src="/products/aviator.svg" alt="Aurora aviator eyewear" className="relative z-10 w-72 drop-shadow-[0_40px_60px_rgba(15,23,42,0.45)]" />
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.4em] text-white/60">
            Polarised UV400
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
