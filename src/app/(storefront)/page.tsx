import type { Metadata } from "next";

import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { FeaturedProductsCarousel } from "@/components/sections/FeaturedProductsCarousel";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { getCategories, getMarketingContent, getProducts } from "@/lib/products";
import { siteConfig } from "@/config/site";
import type { MarketingContent } from "@/types/product";

const FALLBACK_MARKETING: MarketingContent = {
  heroHeadline: "Sculpted optics for the modern explorer",
  heroSubheadline: "ROVE eyewear blends advanced materials with poetic silhouettes to elevate every journey.",
  heroCtaLabel: "Shop the collection",
  heroCtaHref: "/catalog",
  heroImage: {
    url: "/images/products/aurora-carbon-hero.svg",
    alt: "Rove eyewear hero"
  },
  featuredProductSlugs: [],
  featuredCategorySlugs: [],
  newsletterHeadline: "Join the expedition",
  newsletterSubheadline: "Receive capsule launches, studio journals, and exclusive trunk show invitations before they go live."
};

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
};

export default async function HomePage(): Promise<JSX.Element> {
  const [marketing, products, categories] = await Promise.all([
    getMarketingContent(),
    getProducts(),
    getCategories()
  ]);

  const marketingContent = marketing ?? FALLBACK_MARKETING;
  const featuredProducts =
    marketingContent.featuredProductSlugs.length > 0
      ? products.filter((product) => marketingContent.featuredProductSlugs.includes(product.slug))
      : products.slice(0, 6);
  const highlightedCategories =
    marketingContent.featuredCategorySlugs.length > 0
      ? categories.filter((category) => marketingContent.featuredCategorySlugs.includes(category.slug))
      : categories.slice(0, 3);

  return (
    <>
      <HeroSection marketing={marketingContent} />
      <FeaturedProductsCarousel products={featuredProducts} title="Featured capsules" />
      <CategoryShowcase categories={highlightedCategories} />
      <NewsletterSection marketing={marketingContent} />
    </>
  );
}
