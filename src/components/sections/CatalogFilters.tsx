"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Category } from "@/types/product";

interface CatalogFiltersProps {
  categories: Category[];
}

export function CatalogFilters({ categories }: CatalogFiltersProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "";
  const selectedSort = searchParams.get("sort") ?? "popular";
  const selectedPrice = searchParams.get("price") ?? "";
  const query = searchParams.get("q") ?? "";

  const buildQuery = useMemo(() => {
    return (overrides: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(overrides).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const queryString = params.toString();
      return queryString.length > 0 ? `${pathname}?${queryString}` : pathname;
    };
  }, [pathname, searchParams]);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
      <div className="w-full lg:w-1/3">
        <label htmlFor="search" className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Search
        </label>
        <input
          id="search"
          type="search"
          defaultValue={query}
          placeholder="Search eyewear"
          className="mt-2 w-full rounded-full border border-neutral-200 px-4 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              router.push(buildQuery({ q: (event.target as HTMLInputElement).value }));
            }
          }}
        />
      </div>
      <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="category" className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Category
          </label>
          <select
            id="category"
            className="mt-2 w-full rounded-full border border-neutral-200 px-4 py-2 text-sm"
            value={selectedCategory}
            onChange={(event) => router.push(buildQuery({ category: event.target.value || null }))}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category._id} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price" className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Price
          </label>
          <select
            id="price"
            className="mt-2 w-full rounded-full border border-neutral-200 px-4 py-2 text-sm"
            value={selectedPrice}
            onChange={(event) => router.push(buildQuery({ price: event.target.value || null }))}
          >
            <option value="">Any</option>
            <option value="0-200">Under $200</option>
            <option value="200-400">$200 - $400</option>
            <option value="400-999">$400+</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Sort
          </label>
          <select
            id="sort"
            className="mt-2 w-full rounded-full border border-neutral-200 px-4 py-2 text-sm"
            value={selectedSort}
            onChange={(event) => router.push(buildQuery({ sort: event.target.value }))}
          >
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
