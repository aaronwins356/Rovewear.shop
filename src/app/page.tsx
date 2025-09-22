import { Hero } from "@/components/Hero";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductShowcase } from "@/components/ProductShowcase";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 font-sans text-neutral-900">
      <Hero />
      <main id="shop" className="px-6 pb-24">
        <ProductShowcase />
      </main>
      <NewsletterSignup />
    </div>
  );
}
