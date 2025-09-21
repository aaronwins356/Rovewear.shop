import React from 'react';
import { useCart } from '../hooks/useCart';
import { ButtonLink } from '../components/ButtonLink';
import { formatCurrency } from '../utils/formatCurrency';
import { Link } from '../router/RouterProvider';
import { Seo } from '../components/Seo';

export const CartPage: React.FC = () => {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-12">
      <Seo title="Your Cart | ROVE Eyewear" />
      <h1 className="mb-10 text-4xl uppercase tracking-[0.3em]">Your Cart</h1>
      {items.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="mb-6 text-sm text-white/60">Your cart is empty. Discover your next signature frame.</p>
          <ButtonLink to="/products">Shop the collection</ButtonLink>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          <div className="space-y-6">
            {items.map((line) => (
              <div key={line.product.id} className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row">
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  className="h-32 w-32 rounded-2xl object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{line.product.category}</p>
                    <h2 className="text-xl uppercase tracking-[0.2em]">{line.product.name}</h2>
                    <p className="text-sm text-white/60">{line.product.description}</p>
                  </div>
                  <div className="mt-4 flex flex-col gap-4 text-sm uppercase tracking-[0.2em] md:flex-row md:items-center md:justify-between">
                    <span>{formatCurrency(line.product.price)}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/50">Qty</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.product.id, line.quantity - 1)}
                          className="h-7 w-7 rounded-full border border-white/30"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.product.id, line.quantity + 1)}
                          className="h-7 w-7 rounded-full border border-white/30"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.product.id)}
                      className="text-xs text-white/40 transition hover:text-white/70"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg uppercase tracking-[0.3em]">Summary</h2>
            <div className="space-y-3 text-sm uppercase tracking-[0.2em] text-white/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-white/40">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <ButtonLink to="/checkout" className="w-full">
              Proceed to checkout
            </ButtonLink>
            <Link to="/products" className="block text-center text-xs uppercase tracking-[0.3em] text-white/60 underline-offset-4 hover:text-white">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
};
