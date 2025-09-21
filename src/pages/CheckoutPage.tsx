import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from '../components/Button';
import { loadStripeClient } from '../utils/stripe';
import { Seo } from '../components/Seo';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!items.length) {
      setError('Your cart is empty. Add a frame before checking out.');
      return;
    }
    const stripe = await loadStripeClient();
    if (!stripe) {
      setError('Stripe is not configured. Add your publishable key to proceed.');
      return;
    }
    try {
      setIsProcessing(true);
      setError(null);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((line) => ({
            id: line.product.id,
            name: line.product.name,
            amount: line.product.price,
            quantity: line.quantity
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Unable to create checkout session.');
      }

      const { sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId });
      if (result && 'error' in result && result.error) {
        setError(result.error.message ?? 'Checkout failed. Try again.');
      }
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unexpected error.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-12">
      <Seo title="Checkout | ROVE Eyewear" />
      <h1 className="mb-10 text-4xl uppercase tracking-[0.3em]">Checkout</h1>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg uppercase tracking-[0.3em]">Order Summary</h2>
          <ul className="space-y-4 text-sm text-white/70">
            {items.map((line) => (
              <li key={line.product.id} className="flex items-center justify-between">
                <span>
                  {line.product.name} <span className="text-white/40">× {line.quantity}</span>
                </span>
                <span>{formatCurrency(line.product.price * line.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-white/60">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <p className="text-xs text-white/40">Shipping and taxes calculated at checkout.</p>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <Button size="lg" onClick={handleCheckout} loading={isProcessing}>
            Proceed to Stripe
          </Button>
        </div>
        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
          <h2 className="text-lg uppercase tracking-[0.3em] text-white">Secure Checkout</h2>
          <p>
            Stripe test mode is enabled. Use test cards such as <strong>4242 4242 4242 4242</strong> with any future
            expiry and CVC to simulate a successful payment.
          </p>
          <p>
            Once live, update your publishable and secret keys in the environment variables. The same React components
            will power production checkout.
          </p>
          <p>
            Need help? Email <a href="mailto:support@rovewear.shop" className="underline">support@rovewear.shop</a> and
            our concierge team will respond within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};
