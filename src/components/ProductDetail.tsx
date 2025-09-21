"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { ProductGallery } from "./ProductGallery";
import { SizeGuideModal } from "./SizeGuideModal";
import { useCart } from "./CartProvider";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem } = useCart();

  const variantOptions = useMemo(() => (product.variants.length > 0 ? product.variants : [null]), [product.variants]);
  const activeVariant = variantOptions[activeVariantIndex];
  const price = activeVariant?.price ?? product.price;

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
      <ProductGallery images={product.gallery} title={product.title} />

      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{product.categories.join(" • ")}</p>
          <h1 className="text-3xl font-semibold uppercase tracking-[0.35em] text-white md:text-4xl">
            {product.title}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="prose prose-invert max-w-none text-sm text-slate-300"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml || "<p>A statement frame crafted for clarity.</p>" }}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Colorways</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant, index) => {
              const isActive = index === activeVariantIndex;
              return (
                <button
                  key={variant.color}
                  type="button"
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-white/20 bg-transparent text-white hover:border-white/60"
                  }`}
                  onClick={() => setActiveVariantIndex(index)}
                >
                  {variant.color}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Specs</p>
          <dl className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.2em] text-slate-300">
            <div>
              <dt>Lens Width</dt>
              <dd className="text-lg font-semibold text-white">{product.specs.lensWidth ?? "—"} mm</dd>
            </div>
            <div>
              <dt>Bridge</dt>
              <dd className="text-lg font-semibold text-white">{product.specs.bridgeWidth ?? "—"} mm</dd>
            </div>
            <div>
              <dt>Temple</dt>
              <dd className="text-lg font-semibold text-white">{product.specs.templeLength ?? "—"} mm</dd>
            </div>
            <div>
              <dt>Frame Width</dt>
              <dd className="text-lg font-semibold text-white">{product.specs.frameWidth ?? "—"} mm</dd>
            </div>
          </dl>
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-white underline decoration-dotted decoration-white/50"
            onClick={() => setSizeGuideOpen(true)}
          >
            View full size guide
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Investment</span>
            <span className="text-2xl font-semibold text-white">${price?.toFixed(2) ?? "N/A"}</span>
          </div>
          <button
            type="button"
            className="rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-black transition hover:bg-slate-200"
            onClick={() => addItem(product.id, activeVariant?.color)}
          >
            Add to Cart
          </button>
          <p className="text-xs text-slate-400">
            Secure Stripe checkout. Anti-glare hard-coat, blue-light filter, and protective case included.
          </p>
        </div>
      </div>

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} specs={product.specs} />
    </div>
  );
}
