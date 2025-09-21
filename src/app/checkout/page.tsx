import type { Metadata } from "next";
import { CheckoutPage } from "@/components/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout | ROVE Eyewear",
  description: "Complete your ROVE eyewear order with secure Stripe payments and tailored delivery notes.",
};

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
