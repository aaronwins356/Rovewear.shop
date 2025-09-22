"use client";

import { useState } from "react";

import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
}

export function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps): JSX.Element {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
      disabled={isAdding || product.status === "soldOut"}
      onClick={() => {
        setIsAdding(true);
        addItem({
          productId: product._id,
          slug: product.slug,
          name: product.title,
          price: product.price,
          currency: product.currency,
          quantity,
          image: product.heroImage,
          maxQuantity: 5
        });
        setTimeout(() => setIsAdding(false), 500);
      }}
    >
      {product.status === "soldOut"
        ? "Sold out"
        : isAdding
        ? "Adding…"
        : `Add to cart — ${formatCurrency(product.price, product.currency)}`}
    </button>
  );
}
