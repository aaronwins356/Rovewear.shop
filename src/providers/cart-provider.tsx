"use client";

import { createContext, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

import { siteConfig } from "@/config/site";
import type { CartAction, CartContextValue, CartItem, CartState } from "@/types/cart";

const CART_STORAGE_KEY = "rove.cart.v1";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          (action.payload.variantName ? item.variantName === action.payload.variantName : true)
      );

      if (existingIndex >= 0) {
        const updated = [...state.items];
        const current = updated[existingIndex];
        const nextQuantity = Math.min(
          action.payload.maxQuantity ?? Number.POSITIVE_INFINITY,
          current.quantity + action.payload.quantity
        );
        updated[existingIndex] = { ...current, quantity: nextQuantity };
        return { items: updated };
      }

      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM": {
      return {
        items: state.items.filter(
          (item) =>
            !(item.productId === action.payload.productId && item.variantName === action.payload.variantName)
        )
      };
    }
    case "UPDATE_QUANTITY": {
      return {
        items: state.items.map((item) => {
          if (item.productId !== action.payload.productId || item.variantName !== action.payload.variantName) {
            return item;
          }

          const maxQuantity = item.maxQuantity ?? Number.POSITIVE_INFINITY;
          const quantity = Math.max(1, Math.min(maxQuantity, action.payload.quantity));
          return { ...item, quantity };
        })
      };
    }
    case "CLEAR_CART": {
      return { items: [] };
    }
    default:
      return state;
  }
}

function readCartFromStorage(): CartState {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return { items: [] };
    }

    const parsed = JSON.parse(raw) as CartState;
    if (!Array.isArray(parsed.items)) {
      return { items: [] };
    }

    return parsed;
  } catch (error) {
    console.error("Failed to read cart from storage", error);
    return { items: [] };
  }
}

function writeCartToStorage(state: CartState): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to persist cart", error);
  }
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
  currency?: string | null;
}

export function CartProvider({ children, currency }: CartProviderProps): JSX.Element {
  const isHydrated = useRef(false);
  const [state, dispatch] = useReducer(cartReducer, undefined, readCartFromStorage);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (isHydrated.current) {
      writeCartToStorage(state);
    } else {
      isHydrated.current = true;
    }
  }, [state]);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    setIsDrawerOpen(true);
  }, []);

  const removeItem = useCallback(
    (productId: string, variantName?: string) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productId, variantName } }),
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantName?: string) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity, variantName } }),
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((value) => !value), []);

  const derived = useMemo(() => {
    const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

    const value: CartContextValue = {
      ...state,
      subtotal,
      itemCount,
      currency: currency ?? siteConfig.defaultCurrency,
      isDrawerOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openDrawer,
      closeDrawer,
      toggleDrawer
    };

    return value;
  }, [addItem, clearCart, closeDrawer, currency, isDrawerOpen, openDrawer, removeItem, state, toggleDrawer, updateQuantity]);

  return <CartContext.Provider value={derived}>{children}</CartContext.Provider>;
}
