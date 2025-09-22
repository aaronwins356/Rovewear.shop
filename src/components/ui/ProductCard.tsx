import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { StarIcon } from "@/components/ui/icons";

interface ProductCardProps {
  product: Product;
}

function statusLabel(status: Product["status"]): string {
  switch (status) {
    case "inStock":
      return "In stock";
    case "lowStock":
      return "Limited";
    case "preorder":
      return "Pre-order";
    case "soldOut":
    default:
      return "Sold out";
  }
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.heroImage?.url ? (
          <Image
            src={product.heroImage.url}
            alt={product.heroImage.alt ?? product.title}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-neutral-100 text-sm text-neutral-500">
            Image coming soon
          </div>
        )}
        <div className="absolute left-4 top-4 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-700 backdrop-blur">
          {statusLabel(product.status)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-6 py-6">
        <div className="flex items-center gap-2 text-xs text-amber-500">
          <StarIcon className="h-4 w-4" aria-hidden />
          <span>{product.rating?.toFixed(1) ?? "5.0"}</span>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900">
          <Link href={`/product/${product.slug}`} className="hover:text-neutral-600">
            {product.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-neutral-500">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-semibold text-neutral-900">{formatCurrency(product.price, product.currency)}</span>
          <Link
            href={`/product/${product.slug}`}
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:border-neutral-300 hover:bg-neutral-100"
          >
            View details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
