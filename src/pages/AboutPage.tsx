import ButtonLink from '../components/ButtonLink';

const AboutPage = () => (
  <div className="mx-auto w-full max-w-4xl space-y-10 px-6 py-24">
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">About</p>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Designed in California. Worn everywhere.</h1>
      <p className="text-sm text-neutral-500">
        ROVE crafts modern eyewear for urban explorers and coastal dreamers. Each frame is engineered from lightweight materials,
        finished by hand, and inspected in our Los Angeles atelier. The result is clarity, comfort, and silhouettes that elevate every look.
      </p>
    </div>
    <section className="grid gap-8 rounded-[3rem] border border-neutral-200 bg-white p-10 md:grid-cols-2">
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">Our lens philosophy</h2>
        <p className="text-sm text-neutral-500">
          Every ROVE lens is cut with precision tooling, treated with multi-layer anti-reflective coatings, and polished for crystal clear
          optics. Blue-light, polarised, and photochromic options ensure your frames adapt from studio to shoreline.
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">Sustainable sourcing</h2>
        <p className="text-sm text-neutral-500">
          We source bio-acetates and recycled titanium from certified partners. Packaging is fully recyclable, and every order includes a
          lifetime tune-up to extend the life of your frames.
        </p>
      </div>
    </section>
    <section className="rounded-[3rem] border border-neutral-200 bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-900 p-10 text-white">
      <h2 className="text-2xl font-semibold tracking-tight">Ready to explore the next chapter?</h2>
      <p className="mt-3 max-w-xl text-sm text-white/70">
        Swap in your CMS, product data, and checkout provider to launch a fully-powered commerce experience without unnecessary overhead.
      </p>
      <ButtonLink to="/products" variant="outline" className="mt-6 inline-flex">
        Explore the collection
      </ButtonLink>
    </section>
  </div>
);

export default AboutPage;
