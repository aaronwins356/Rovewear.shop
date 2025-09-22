import { Hero } from "./components/Hero";
import { ProductShowcase } from "./components/ProductShowcase";

export function App() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 antialiased">
      <Hero />
      <main id="shop" className="px-6 pb-24">
        <ProductShowcase />
      </main>
      <footer id="journal" className="border-t border-emerald-100 bg-white/80 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Journal</p>
            <h2 className="text-2xl font-semibold text-neutral-900">Stories for living with intention</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Subscribe to receive essays on rituals, seasonal refreshes, and sustainable sourcing.
            </p>
          </div>
          <form
            className="flex w-full max-w-md flex-col gap-3 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-4 sm:flex-row sm:items-center"
            onSubmit={(event) => {
              event.preventDefault();
              // Newsletter integration placeholder; connect to your platform of choice.
              alert("Thanks for subscribing!");
            }}
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-full border border-emerald-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
            <button
              type="submit"
              className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              Join
            </button>
          </form>
        </div>
        <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] text-neutral-400">
          © {new Date().getFullYear()} Rovewear. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
