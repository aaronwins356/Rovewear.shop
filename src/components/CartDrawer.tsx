import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './Button';
import { ButtonLink } from './ButtonLink';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import { Link } from '../router/RouterProvider';

export const CartDrawer: React.FC = () => {
  const { items, subtotal, isDrawerOpen, closeDrawer, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
          onClick={closeDrawer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.aside
            className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-brand.DEFAULT/95 px-6 pb-8 pt-12 text-white shadow-2xl"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg uppercase tracking-[0.3em]">Your Cart</h2>
              <button type="button" onClick={closeDrawer} className="text-sm text-white/60 transition hover:text-white">
                Close
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {items.length === 0 ? (
                <p className="text-sm text-white/60">Your cart is empty.</p>
              ) : (
                items.map((line) => (
                  <div key={line.product.id} className="flex gap-4 rounded-2xl border border-white/10 p-4">
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">{line.product.category}</p>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">{line.product.name}</h3>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>{formatCurrency(line.product.price)}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.product.id, line.quantity - 1)}
                            className="h-7 w-7 rounded-full border border-white/30 text-center"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-6 text-center">{line.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.product.id, line.quantity + 1)}
                            className="h-7 w-7 rounded-full border border-white/30 text-center"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.product.id)}
                        className="self-start text-xs uppercase tracking-[0.3em] text-white/40 transition hover:text-white/70"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-white/70">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <ButtonLink to="/checkout" onClick={closeDrawer} className="w-full">
                Checkout
              </ButtonLink>
              <Button variant="ghost" onClick={closeDrawer} className="w-full">
                Continue Shopping
              </Button>
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="block text-center text-xs uppercase tracking-[0.3em] text-white/60 underline-offset-4 hover:text-white"
              >
                View Cart Details
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
