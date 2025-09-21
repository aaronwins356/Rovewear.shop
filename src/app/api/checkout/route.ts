import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

if (!stripeSecret) {
  console.warn("STRIPE_SECRET_KEY is not configured. Checkout requests will fail.");
}

const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: "2024-06-20" })
  : null;

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const rawPayload = formData.get("payload");

    if (typeof rawPayload !== "string") {
      return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
    }

    const lineItems = JSON.parse(rawPayload);

    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: process.env.STRIPE_SUCCESS_URL ?? "https://rovewear.shop/checkout/success",
      cancel_url: process.env.STRIPE_CANCEL_URL ?? "https://rovewear.shop/checkout/cancel",
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
    });

    return NextResponse.redirect(session.url ?? "https://rovewear.shop", { status: 303 });
  } catch (error) {
    console.error("Stripe checkout failed", error);
    return NextResponse.json({ error: "Unable to create checkout session" }, { status: 500 });
  }
}
