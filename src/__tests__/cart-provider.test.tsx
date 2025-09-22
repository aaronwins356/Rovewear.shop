import React from "react";
import { renderHook, act } from "@testing-library/react";

import { CartContext, CartProvider } from "@/providers/cart-provider";
import type { CartItem } from "@/types/cart";

const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;

describe("CartProvider", () => {
  it("adds and updates cart items", () => {
    const { result } = renderHook(() => React.useContext(CartContext), { wrapper });

    expect(result.current?.items).toHaveLength(0);

    const item: CartItem = {
      productId: "1",
      slug: "test",
      name: "Test",
      price: 100,
      currency: "USD",
      quantity: 1
    };

    act(() => {
      result.current?.addItem(item);
    });

    expect(result.current?.items).toHaveLength(1);

    act(() => {
      result.current?.updateQuantity("1", 3);
    });

    expect(result.current?.items?.[0]?.quantity).toBe(3);
  });
});
