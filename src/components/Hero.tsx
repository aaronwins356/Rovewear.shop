export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-gradient-to-b from-white via-emerald-50 to-emerald-100 px-6 py-24 text-center">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Rovewear</p>
        <h1 className="text-balance text-5xl font-semibold text-neutral-900 sm:text-6xl">
          Modern essentials for intentional spaces.
        </h1>
        <p className="text-lg text-neutral-600 sm:text-xl">
          Build a mindful home with ethically sourced decor, curated stories, and practical tools that help you live at a slower pace.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#shop"
          className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-800"
        >
          Explore the collection
        </a>
        <a
          href="#journal"
          className="rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-900"
        >
          Read our journal
        </a>
      </div>
    </section>
  );
}
