import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Product } from '../types/product';

const CART_STORAGE_KEY = 'rove-shop-cart';

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'RESET' };

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

export interface CartContextValue {
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }

      return { items: [...state.items, { product, quantity }] };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter((item) => item.product.id !== action.payload.productId),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }

      return {
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      };
    }
    case 'RESET':
      return { items: [] };
    default:
      return state;
  }
};

const deserializeCart = (): CartState => {
  if (typeof window === 'undefined') {
    return { items: [] };
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return { items: [] };
    }
    const parsed = JSON.parse(stored) as CartState;
    if (!Array.isArray(parsed.items)) {
      return { items: [] };
    }
    return {
      items: parsed.items
        .filter((item): item is CartItem => Boolean(item?.product?.id))
        .map((item) => ({
          product: item.product,
          quantity: Number.isFinite(item.quantity) ? item.quantity : 1,
        })),
    };
  } catch (error) {
    console.error('Failed to read cart from storage', error);
    return { items: [] };
  }
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, deserializeCart);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const contextValue = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, quantity = 1) => {
      dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    };

    const removeItem = (productId: string) => {
      dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    };

    const updateQuantity = (productId: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
      dispatch({ type: 'RESET' });
    };

    const total = state.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    return {
      items: state.items,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [state.items]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
