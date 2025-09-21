import type { Metadata } from "next";
import { CartPage } from "@/components/CartPage";

export const metadata: Metadata = {
  title: "Cart | ROVE Eyewear",
  description: "Review your selected ROVE eyewear before heading to checkout. Adjust quantities and launch Stripe checkout.",
};

export default function CartRoute() {
  return <CartPage />;
}
