import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
            <p className="text-lg font-semibold tracking-tight">Your Cart</p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-neutral-200 px-3 py-1 text-xs uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900"
            >
              Close
            </button>
          </header>
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="space-y-3 text-sm text-neutral-500">
                <p>Your cart is empty.</p>
                <Link to="/products" onClick={onClose} className="underline">
                  Discover the latest collection
                </Link>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
                    <img src={product.image} alt={product.name} className="h-full w-full object-contain p-3" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold text-neutral-900">{product.name}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">{product.category}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-sm font-semibold text-neutral-900">
                        ${(product.price * quantity).toFixed(0)}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="h-8 w-8 rounded-full border border-neutral-200 text-sm"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label={`Decrease quantity of ${product.name}`}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                        <button
                          type="button"
                          className="h-8 w-8 rounded-full border border-neutral-200 text-sm"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label={`Increase quantity of ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="mt-2 text-xs uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <footer className="border-t border-neutral-200 px-6 py-6">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-[0.3em] text-neutral-400">Subtotal</span>
              <span className="text-lg font-semibold text-neutral-900">${total.toFixed(0)}</span>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                className="rounded-full bg-neutral-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700"
                onClick={handleCheckout}
                disabled={items.length === 0}
              >
                Checkout
              </button>
              <button
                type="button"
                className="rounded-full border border-neutral-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 transition hover:text-neutral-900"
                onClick={clearCart}
                disabled={items.length === 0}
              >
                Clear cart
              </button>
            </div>
          </footer>
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;
