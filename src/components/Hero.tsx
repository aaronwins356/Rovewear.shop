import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1588768921672-12779d0e1c61?q=80&w=1400&auto=format&fit=crop"
          className="h-full w-full object-cover opacity-60"
        >
          <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
      </div>

      <div className="relative mx-auto flex min-h-[80vh] max-w-5xl flex-col items-start justify-center gap-8 px-6 py-24 text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5"
        >
          <p className="text-xs uppercase tracking-[0.6em] text-slate-300">Rove Optical Vanguard</p>
          <h1 className="max-w-2xl text-4xl font-semibold uppercase leading-tight tracking-[0.35em] text-white md:text-5xl">
            Blue-Light Defense Crafted For Night Owls
          </h1>
          <p className="max-w-lg text-sm text-slate-300 md:text-base">
            Inspired by the kinetic energy of night racing and the clarity of alpine air, ROVE eyewear pairs
            aviation-grade metals with lens science to keep your focus razor-sharp after dark.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="#catalog"
            className="rounded-full bg-white px-10 py-4 text-xs font-semibold uppercase tracking-[0.4em] text-black transition hover:bg-slate-200"
          >
            Shop Now
          </Link>
          <Link
            href="/products/aviatior-style-1"
            className="rounded-full border border-white/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:border-white/60"
          >
            View Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
