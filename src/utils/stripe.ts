interface StripeLike {
  redirectToCheckout: (options: { sessionId: string }) => Promise<{ error?: { message?: string } } | void>;
}

let stripePromise: Promise<StripeLike | null> | null = null;

const injectScript = (): Promise<typeof window.Stripe | null> =>
  new Promise((resolve) => {
    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.onload = () => {
      resolve(window.Stripe);
    };
    script.onerror = () => resolve(null);
    document.body.appendChild(script);
  });

export const loadStripeClient = (): Promise<StripeLike | null> => {
  if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
    return Promise.resolve(null);
  }
  if (!stripePromise) {
    stripePromise = injectScript().then((StripeConstructor) => {
      if (!StripeConstructor) {
        return null;
      }
      return StripeConstructor(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ?? '') as StripeLike;
    });
  }
  return stripePromise;
};
