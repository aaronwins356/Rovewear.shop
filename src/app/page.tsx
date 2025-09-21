import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts, getProductCategories } from "@/lib/products";

export default function HomePage() {
  const products = getAllProducts();
  const categories = getProductCategories();

  return (
    <div className="space-y-24 pb-32">
      <Hero />

      <section className="mx-auto w-full max-w-6xl px-6" id="catalog">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Shop by Silhouette</p>
            <h2 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white">
              Precision-crafted eyewear
            </h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-slate-200"
              >
                {category}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 md:grid-cols-3">
        {[
          {
            title: "Optics engineered for night vision",
            description:
              "ROVE lenses are optimized for 430-470nm blue-light absorption while maintaining color fidelity, so your circadian rhythm stays balanced without muting the night.",
          },
          {
            title: "Metals and acetates sourced like couture",
            description:
              "Aerospace-grade alloys, tactile acetates, and hypoallergenic finishes make every frame feel like it belongs on the runway and at your desk.",
          },
          {
            title: "Born from your WordPress catalog",
            description:
              "Product specs, descriptions, and galleries flow directly from your WooCommerce export to keep merchandising effortless and accurate.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/30"
          >
            <h3 className="text-lg font-semibold uppercase tracking-[0.35em] text-white">{feature.title}</h3>
            <p className="text-sm text-slate-300">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
