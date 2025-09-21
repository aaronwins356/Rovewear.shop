import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from './Button';
import ButtonLink from './ButtonLink';

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="h-full w-full bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Close cart"
          />
          <motion.aside
            className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex h-full flex-col">
              <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
                <p className="text-lg font-semibold tracking-tight">Your cart</p>
                <Button onClick={onClose} variant="ghost" size="sm">
                  Close
                </Button>
              </header>
              <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                {items.length === 0 ? (
                  <div className="space-y-3 text-sm text-neutral-500">
                    <p>Your cart is empty.</p>
                    <ButtonLink to="/products" onClick={onClose} variant="ghost" size="sm" className="justify-start px-0">
                      Discover the latest collection
                    </ButtonLink>
                  </div>
                ) : (
                  items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
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
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 rounded-full border border-neutral-200 text-base"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              aria-label={`Decrease quantity of ${product.name}`}
                            >
                              −
                            </Button>
                            <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 rounded-full border border-neutral-200 text-base"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              aria-label={`Increase quantity of ${product.name}`}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="mt-2 text-xs uppercase tracking-[0.3em] text-neutral-400 transition hover:text-neutral-900"
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
                  <Button onClick={handleCheckout} disabled={items.length === 0}>
                    Checkout
                  </Button>
                  <Button onClick={clearCart} variant="ghost" disabled={items.length === 0}>
                    Clear cart
                  </Button>
                </div>
              </footer>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
