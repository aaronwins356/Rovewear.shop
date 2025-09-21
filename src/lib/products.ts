import productsData from "@/data/products.json" assert { type: "json" };
import type { Product } from "./types";

const products: Product[] = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductCategories(): string[] {
  const categories = new Set<string>();
  for (const product of products) {
    for (const category of product.categories) {
      categories.add(category);
    }
  }
  return Array.from(categories).sort();
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.slice(0, limit);
}
