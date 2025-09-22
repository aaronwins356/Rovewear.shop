import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

type LineItem = {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      images?: string[];
    };
  };
  quantity: number;
};

function buildStripePayload(lineItems: LineItem[], baseUrl: string): string {
  const params = new URLSearchParams();
  params.append("mode", "payment");
  params.append("success_url", `${baseUrl}/checkout?status=success`);
  params.append("cancel_url", `${baseUrl}/checkout?status=cancelled`);

  lineItems.forEach((item, index) => {
    const prefix = `line_items[${index}]`;
    params.append(`${prefix}[quantity]`, String(item.quantity));
    params.append(`${prefix}[price_data][currency]`, item.price_data.currency);
    params.append(`${prefix}[price_data][unit_amount]`, String(item.price_data.unit_amount));
    params.append(`${prefix}[price_data][product_data][name]`, item.price_data.product_data.name);
    item.price_data.product_data.images?.forEach((image, imageIndex) => {
      params.append(`${prefix}[price_data][product_data][images][${imageIndex}]`, image);
    });
  });

  return params.toString();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { lineItems: LineItem[] };

    if (!stripeSecretKey) {
      return NextResponse.json(
        { url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/checkout?status=mock` },
        { status: 200 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const payload = buildStripePayload(body.lineItems, baseUrl);

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload
    });

    if (!response.ok) {
      console.error("Stripe checkout error", await response.text());
      return NextResponse.json({ error: "Unable to create checkout session" }, { status: 500 });
    }

    const session = (await response.json()) as { url?: string };
    return NextResponse.json({ url: session.url ?? `${baseUrl}/checkout?status=success` });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json({ error: "Unable to create checkout session" }, { status: 500 });
  }
}
