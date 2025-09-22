import type { Metadata } from "next";

import { CatalogFilters } from "@/components/sections/CatalogFilters";
import { ProductCard } from "@/components/ui/ProductCard";
import { getCategories, getProducts } from "@/lib/products";
import { formatCurrency, parseNumber } from "@/lib/utils";

interface CatalogPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export const metadata: Metadata = {
  title: "ROVE Catalog",
  description: "Shop ROVE designer eyewear by category, material, and lens technology."
};

function parsePriceRange(value: string | null): { min: number | null; max: number | null } {
  if (!value) {
    return { min: null, max: null };
  }

  const [min, max] = value.split("-");
  return { min: parseNumber(min), max: parseNumber(max) };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps): Promise<JSX.Element> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const query = typeof searchParams.q === "string" ? searchParams.q.toLowerCase() : "";
  const categoryFilter = typeof searchParams.category === "string" ? searchParams.category : "";
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "popular";
  const priceValue = typeof searchParams.price === "string" ? searchParams.price : "";
  const { min, max } = parsePriceRange(priceValue);

  const filteredProducts = products
    .filter((product) => {
      const matchesQuery = query
        ? product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
        : true;
      const matchesCategory = categoryFilter ? product.categorySlugs.includes(categoryFilter) : true;
      const matchesPrice = (() => {
        if (min !== null && product.price < min) {
          return false;
        }
        if (max !== null && product.price > max) {
          return false;
        }
        return true;
      })();
      return matchesQuery && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return (b.popularity ?? 0) - (a.popularity ?? 0);
        default:
          return (b.popularity ?? 0) - (a.popularity ?? 0);
      }
    });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">Catalog</h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-500">
            Discover sculpted silhouettes engineered for clarity. Filters are powered by Sanity categories and price tiers so
            merchandising updates flow instantly.
          </p>
        </div>
        <p className="text-sm text-neutral-500">{products.length} total products</p>
      </header>
      <div className="mt-8">
        <CatalogFilters categories={categories} />
      </div>
      <section aria-live="polite" className="mt-10">
        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-neutral-200 bg-white p-12 text-center">
            <p className="text-lg font-semibold text-neutral-900">No products match your filters.</p>
            <p className="mt-2 text-sm text-neutral-500">
              Try adjusting categories or expanding the price range between {formatCurrency(min ?? 0)} and {formatCurrency(max ?? 1000)}.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
