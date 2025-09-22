"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  PRODUCTS_DATA_URL,
  fetchProductsFromJson,
  getProductById
} from "@/data/products";
import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadProducts = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setIsLoading(true);
      // The storefront reads placeholder inventory from the static JSON manifest shipped in /public/products.
      const manifest = await fetchProductsFromJson(controller.signal);

      if (manifest.length === 0) {
        throw new Error("The product manifest is empty.");
      }

      setProducts(manifest);
      setSelectedId((current) => current || manifest[0]?.id || "");
      setError(null);
    } catch (caught) {
      if (controller.signal.aborted) {
        return;
      }

      const message = caught instanceof Error ? caught.message : "Unknown error while loading products.";
      setError(`Unable to load products from ${PRODUCTS_DATA_URL}. ${message}`);
      setProducts([]);
      setSelectedId("");
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadProducts();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadProducts]);

  const selectedProduct: Product | undefined = useMemo(() => {
    return getProductById(products, selectedId);
  }, [products, selectedId]);

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
            <div className="h-52 w-full overflow-hidden rounded-2xl bg-white">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                width={320}
                height={208}
                className="h-full w-full object-contain"
                priority
              />
            </div>
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
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">
                {isLoading ? "Loading products…" : error ?? `Select a product to view the details from ${PRODUCTS_DATA_URL}.`}
              </p>
              {!isLoading && error ? (
                <button
                  type="button"
                  onClick={loadProducts}
                  className="rounded-full bg-emerald-700 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
                >
                  Retry loading
                </button>
              ) : null}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
