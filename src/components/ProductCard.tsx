"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";
import { Button } from "./Button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const { addItem } = useCart();

  const variants = useMemo(() => (product.variants.length > 0 ? product.variants : [null]), [product.variants]);
  const activeVariant = variants[activeVariantIndex];
  const imageSrc = activeVariant?.image ?? product.thumbnail;
  const price = activeVariant?.price ?? product.price;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.title}
          fill
          sizes="(min-width: 768px) 320px, 90vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          {product.variants.map((variant, index) => (
            <button
              key={variant.color}
              type="button"
              className={`h-2 w-6 rounded-full transition ${
                index === activeVariantIndex ? "bg-white" : "bg-white/40"
              }`}
              onMouseEnter={() => setActiveVariantIndex(index)}
              onFocus={() => setActiveVariantIndex(index)}
              aria-label={`Preview ${variant.color}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            {product.categories.join(" • ")}
          </p>
          <h3 className="text-lg font-semibold uppercase tracking-[0.3em] text-white">
            <Link href={`/products/${product.slug}`}>{product.title}</Link>
          </h3>
          <p className="text-sm text-slate-400 line-clamp-3" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
            ${price?.toFixed(2) ?? "N/A"}
          </span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => addItem(product.id, activeVariant?.color)}
          >
            Quick Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
