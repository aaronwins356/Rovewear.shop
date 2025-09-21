import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ButtonLink } from "@/components/Button";
import { getAllProducts, getProductCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catalog | ROVE Eyewear",
  description: "Browse the complete ROVE eyewear catalog sourced from the WordPress export, filtered by silhouette and mood.",
};

interface ProductsPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = getAllProducts();
  const categories = getProductCategories();

  const normalizedCategory = normalizeParam(searchParams?.category);
  const normalizedQuery = normalizeParam(searchParams?.q);

  const filtered = products.filter((product) => {
    const matchesCategory = normalizedCategory
      ? product.categories.some((category) => category.toLowerCase() === normalizedCategory.toLowerCase())
      : true;

    const matchesQuery = normalizedQuery
      ? [product.title, product.summary, product.categories.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery.toLowerCase())
      : true;

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-6 pb-32">
      <header className="space-y-6 pt-4">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Catalog</p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white md:text-4xl">
              Blueprint your eyewear wardrobe
            </h1>
            <p className="max-w-2xl text-sm text-slate-400">
              Every product originates from your WordPress export so merchandising stays in sync. Filter by silhouette or search
              by vibe to find frames engineered for late-night clarity.
            </p>
          </div>
          <form className="flex w-full max-w-md items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-3" action="/products" method="get">
            <label htmlFor="search" className="sr-only">
              Search products
            </label>
            <input
              id="search"
              name="q"
              defaultValue={normalizedQuery ?? ""}
              placeholder="Search silhouettes"
              className="w-full bg-transparent text-sm uppercase tracking-[0.25em] text-white placeholder:text-slate-500 focus:outline-none"
            />
            {normalizedCategory ? <input type="hidden" name="category" value={normalizedCategory} /> : null}
            <button type="submit" className="text-xs uppercase tracking-[0.3em] text-white">
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={buildHref({ category: undefined, query: normalizedQuery })}
            className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.3em] transition ${
              normalizedCategory ? "border-white/20 text-slate-300 hover:border-white/40" : "border-white bg-white text-black"
            }`}
          >
            All
          </Link>
          {categories.map((category) => {
            const isActive = normalizedCategory?.toLowerCase() === category.toLowerCase();
            return (
              <Link
                key={category}
                href={buildHref({ category, query: normalizedQuery })}
                className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.3em] transition ${
                  isActive ? "border-white bg-white text-black" : "border-white/20 text-slate-300 hover:border-white/40"
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </header>

      {filtered.length === 0 ? (
        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">No frames match your filters</p>
          <p className="text-sm text-slate-400">
            Try clearing the search or browse the full assortment. Each collection is synced with WooCommerce to stay current.
          </p>
          <div className="flex justify-center">
            <ButtonLink href="/products" variant="secondary">
              Reset filters
            </ButtonLink>
          </div>
        </section>
      ) : (
        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
}

function normalizeParam(value: string | string[] | undefined): string | undefined {
  if (!value) {
    return undefined;
  }
  return Array.isArray(value) ? value[0] : value;
}

function buildHref({ category, query }: { category: string | undefined; query: string | undefined }) {
  const params = new URLSearchParams();
  if (category) {
    params.set("category", category);
  }
  if (query) {
    params.set("q", query);
  }
  const queryString = params.toString();
  return queryString ? `/products?${queryString}` : "/products";
}
