import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { MarketingContent } from "@/types/product";

interface HeroSectionProps {
  marketing: MarketingContent;
}

export function HeroSection({ marketing }: HeroSectionProps): JSX.Element {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        {marketing.heroImage?.url ? (
          <Image
            src={marketing.heroImage.url}
            alt={marketing.heroImage.alt ?? marketing.heroHeadline}
            fill
            className="object-cover opacity-70"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/40 to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center gap-8 px-6 py-24 sm:py-32">
        <motion.span
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Limited release
        </motion.span>
        <motion.h1
          className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {marketing.heroHeadline}
        </motion.h1>
        <motion.p
          className="max-w-xl text-lg text-white/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {marketing.heroSubheadline}
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href={marketing.heroCtaHref}
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            {marketing.heroCtaLabel}
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            Our craft
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
