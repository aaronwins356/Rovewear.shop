import type { ImageAsset } from "./product";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image?: ImageAsset;
  variantName?: string;
  maxQuantity?: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantName?: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number; variantName?: string } }
  | { type: "CLEAR_CART" };

export interface CartContextValue extends CartState {
  subtotal: number;
  itemCount: number;
  currency: string;
  isDrawerOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantName?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantName?: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}
