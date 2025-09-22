import { useMemo, useState } from "react";
import { getProductById, products } from "../data/products";
import type { Product } from "../data/products";
import { ProductCard } from "./ProductCard";

export function ProductShowcase() {
  const [selectedId, setSelectedId] = useState<string>(products[0]?.id ?? "");

  const selectedProduct: Product | undefined = useMemo(() => {
    return getProductById(selectedId);
  }, [selectedId]);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-12">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Shop</p>
        <h2 className="text-balance text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Slow-crafted eyewear for mindful routines
        </h2>
        <p className="mx-auto max-w-2xl text-base text-neutral-600">
          Each frame is assembled in small batches with renewable materials and shipped in plastic-free packaging. Select a
          style to explore its fit and purpose.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={(item) => setSelectedId(item.id)}
              isActive={product.id === selectedId}
            />
          ))}
        </div>

        {selectedProduct ? (
          <aside className="flex flex-col gap-6 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-8 text-left">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">Product Insight</p>
              <h3 className="text-2xl font-semibold text-neutral-900">{selectedProduct.name}</h3>
            </div>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-52 w-full rounded-2xl bg-white object-contain shadow-inner"
            />
            <p className="text-base leading-relaxed text-neutral-700">{selectedProduct.description}</p>
            <dl className="space-y-2 text-sm text-neutral-600">
              <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3">
                <dt className="font-medium text-neutral-800">Price</dt>
                <dd className="text-lg font-semibold text-emerald-700">${selectedProduct.price}</dd>
              </div>
              <div className="rounded-2xl bg-white/80 px-4 py-3">
                <dt className="font-medium text-neutral-800">Care Notes</dt>
                <dd className="mt-1 leading-relaxed">
                  Store in the recycled cork case provided. Wipe lenses with the included microfiber cloth to keep the coating
                  pristine.
                </dd>
              </div>
            </dl>
            <button
              type="button"
              className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              Add to cart
            </button>
          </aside>
        ) : (
          <aside className="flex h-full items-center justify-center rounded-3xl border border-dashed border-emerald-200 p-6 text-center text-neutral-500">
            Select a product to view the details.
          </aside>
        )}
      </div>
    </section>
  );
}
