import Stripe from 'stripe';

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripeClient = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16'
    })
  : null;

interface CheckoutItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
}

export default async function handler(request: VercelRequest, response: VercelResponse): Promise<void> {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!stripeClient || !stripeSecretKey) {
    response.status(500).json({ error: 'Stripe secret key is not configured.' });
    return;
  }

  const items: CheckoutItem[] = (request.body as { items?: CheckoutItem[] })?.items ?? [];

  if (!Array.isArray(items) || items.length === 0) {
    response.status(400).json({ error: 'Cart is empty.' });
    return;
  }

  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL ?? 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.CLIENT_URL ?? 'http://localhost:3000'}/cancel`,
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: item.amount * 100,
          product_data: {
            name: item.name,
            metadata: {
              productId: item.id
            }
          }
        }
      }))
    });

    response.status(200).json({ sessionId: session.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error creating checkout session';
    response.status(500).json({ error: message });
  }
}
