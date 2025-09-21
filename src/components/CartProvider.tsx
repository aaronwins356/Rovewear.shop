"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/types";
import { getAllProducts } from "@/lib/products";

interface CartContextValue {
  isOpen: boolean;
  items: CartItem[];
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: string, variantColor?: string) => void;
  removeItem: (productId: string, variantColor?: string) => void;
  incrementItem: (productId: string, variantColor?: string) => void;
  decrementItem: (productId: string, variantColor?: string) => void;
  clear: () => void;
  lineItems: Array<CartItem & { product: Product; price: number }>;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "rove-cart";

function loadInitialState(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item) => typeof item.productId === "string" && item.quantity > 0);
  } catch (error) {
    console.warn("Failed to parse stored cart", error);
    return [];
  }
}

function sanitizeVariantColor(color?: string): string | undefined {
  if (!color) {
    return undefined;
  }
  return color.trim();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(() => loadInitialState());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const upsertItem = useCallback(
    (productId: string, variantColor: string | undefined, delta: number) => {
      setItems((prev) => {
        const normalizedColor = sanitizeVariantColor(variantColor);
        const existingIndex = prev.findIndex(
          (item) => item.productId === productId && item.variantColor === normalizedColor,
        );

        if (existingIndex === -1 && delta <= 0) {
          return prev;
        }

        if (existingIndex === -1) {
          return [...prev, { productId, variantColor: normalizedColor, quantity: Math.max(delta, 1) }];
        }

        const updated = [...prev];
        const nextQuantity = updated[existingIndex].quantity + delta;
        if (nextQuantity <= 0) {
          updated.splice(existingIndex, 1);
          return updated;
        }
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: nextQuantity,
        };
        return updated;
      });
    },
    [],
  );

  const addItem = useCallback(
    (productId: string, variantColor?: string) => {
      upsertItem(productId, variantColor, 1);
      openCart();
    },
    [openCart, upsertItem],
  );

  const removeItem = useCallback(
    (productId: string, variantColor?: string) => {
      setItems((prev) =>
        prev.filter(
          (item) => item.productId !== productId || item.variantColor !== sanitizeVariantColor(variantColor),
        ),
      );
    },
    [],
  );

  const incrementItem = useCallback((productId: string, variantColor?: string) => {
    upsertItem(productId, variantColor, 1);
  }, [upsertItem]);

  const decrementItem = useCallback((productId: string, variantColor?: string) => {
    upsertItem(productId, variantColor, -1);
  }, [upsertItem]);

  const clear = useCallback(() => setItems([]), []);

  const catalog = useMemo(() => getAllProducts(), []);

  const lineItems = useMemo(() => {
    const lines: Array<CartItem & { product: Product; price: number }> = [];
    for (const item of items) {
      const product = catalog.find((entry) => entry.id === item.productId);
      if (!product) {
        continue;
      }
      const variant = item.variantColor
        ? product.variants.find((entry) => entry.color === item.variantColor)
        : undefined;
      const price = variant?.price ?? product.price ?? 0;
      lines.push({ ...item, product, price });
    }
    return lines;
  }, [catalog, items]);

  const subtotal = useMemo(() => {
    return lineItems.reduce((total, line) => total + line.price * line.quantity, 0);
  }, [lineItems]);

  const value = useMemo<CartContextValue>(() => ({
    isOpen,
    items,
    toggleCart,
    openCart,
    closeCart,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    clear,
    lineItems,
    subtotal,
  }), [
    addItem,
    clear,
    closeCart,
    decrementItem,
    incrementItem,
    isOpen,
    items,
    lineItems,
    openCart,
    removeItem,
    subtotal,
    toggleCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
