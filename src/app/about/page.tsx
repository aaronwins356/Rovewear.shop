import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About ROVE | ROVE Eyewear",
  description: "Discover the story behind ROVE eyewear, our materials, and the process of transforming the WordPress catalog into a modern storefront.",
};

const STORY_POINTS = [
  {
    title: "From WooCommerce to kinetic storefront",
    description:
      "We transform the WordPress export into a headless product data layer so marketing updates flow straight into the React experience without double entry.",
  },
  {
    title: "Materials engineered for endurance",
    description:
      "Aerospace alloys, hypoallergenic acetates, and blue-light lenses tuned for the 430-470nm range create frames that stay comfortable during marathon sessions.",
  },
  {
    title: "Design language inspired by night racing",
    description:
      "Razor-sharp lines and luminous detailing pay homage to the neon highways that inspire the ROVE aesthetic.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-6 pb-32">
      <header className="space-y-6 pt-4">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">About</p>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white md:text-4xl">
          ROVE is built for the night shift innovators
        </h1>
        <p className="max-w-3xl text-sm text-slate-400">
          ROVE launched to deliver eyewear that matches the intensity of your work and play. We fuse lab-grade blue-light
          filtration with silhouettes shaped for confidence after dusk.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <article className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-white">Crafted for clarity</h2>
          <p className="text-sm text-slate-300">
            Our WordPress-to-Next.js pipeline ensures specs, sizing, and imagery stay unified. Every detail you see in this
            storefront mirrors the WooCommerce source of truth while benefiting from blazing-fast static rendering.
          </p>
          <p className="text-sm text-slate-300">
            The result: a shoppable experience that looks couture, loads instantly, and keeps your circadian rhythm in check with
            scientifically tuned optics.
          </p>
        </article>
        <div className="relative h-80 w-full overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1600&auto=format&fit=crop"
            alt="ROVE eyewear studio"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {STORY_POINTS.map((point) => (
          <article
            key={point.title}
            className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 backdrop-blur"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-white">{point.title}</h3>
            <p>{point.description}</p>
          </article>
        ))}
      </section>

      <section className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-transparent p-8 text-slate-200">
        <h2 className="text-lg font-semibold uppercase tracking-[0.35em] text-white">Sustainably sourced</h2>
        <p className="text-sm">
          Frames are produced in small batches with suppliers who share our commitment to low-impact manufacturing. Packaging is
          recycled, and every shipment is offset to ensure a softer footprint.
        </p>
        <p className="text-sm">
          Questions about sourcing, prescriptions, or corporate gifting? Drop us a line at
          <a href="mailto:hello@rovewear.shop" className="ml-2 underline decoration-dotted decoration-white/40">hello@rovewear.shop</a>
          .
        </p>
      </section>
    </div>
  );
}
