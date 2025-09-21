import React, { createContext, useCallback, useMemo, useState } from 'react';
import type { CartLineItem, Product } from '../types/product';

interface CartContextValue {
  items: CartLineItem[];
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

const clampQuantity = (value: number): number => {
  if (Number.isNaN(value) || value < 1) {
    return 1;
  }
  if (value > 9) {
    return 9;
  }
  return Math.floor(value);
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const nextQuantity = clampQuantity(quantity);
      const existing = prev.find((line) => line.product.id === product.id);
      if (existing) {
        return prev.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: clampQuantity(line.quantity + nextQuantity) }
            : line
        );
      }
      return [...prev, { product, quantity: nextQuantity }];
    });
    setIsDrawerOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((line) => line.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((line) => line.product.id !== productId);
      }
      return prev.map((line) =>
        line.product.id === productId ? { ...line, quantity: clampQuantity(quantity) } : line
      );
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);

  const subtotal = useMemo(
    () => items.reduce((acc, line) => acc + line.product.price * line.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer
    }),
    [items, subtotal, addItem, removeItem, updateQuantity, clear, isDrawerOpen, openDrawer, closeDrawer, toggleDrawer]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = (): CartContextValue => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
