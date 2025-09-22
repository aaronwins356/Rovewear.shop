import "server-only";

import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";

import type { Category, MarketingContent, Product, SiteSettings } from "@/types/product";
import { sanityClient } from "@/lib/sanity.client";
import {
  categoriesQuery,
  marketingContentQuery,
  productBySlugQuery,
  productsQuery,
  siteSettingsQuery
} from "@/lib/sanity.queries";

interface ProductManifest {
  products?: Product[];
  categories?: Category[];
  marketing?: MarketingContent;
  siteSettings?: SiteSettings;
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    description: product.description ?? "",
    tags: product.tags ?? [],
    images: product.images ?? [],
    categorySlugs: product.categorySlugs ?? [],
    reviews: product.reviews ?? [],
    specs: product.specs ?? undefined
  };
}

async function readManifest(): Promise<ProductManifest> {
  try {
    const manifestPath = path.join(process.cwd(), "public", "products", "products.json");
    const raw = await fs.readFile(manifestPath, "utf8");
    return JSON.parse(raw) as ProductManifest;
  } catch (error) {
    console.error("Failed to read product manifest", error);
    return {};
  }
}

export const getProducts = cache(async (): Promise<Product[]> => {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch<Product[]>(productsQuery);
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeProduct);
      }
    } catch (error) {
      console.error("Failed to fetch products from Sanity", error);
    }
  }

  const manifest = await readManifest();
  return (manifest.products ?? []).map(normalizeProduct);
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  if (sanityClient) {
    try {
      const product = await sanityClient.fetch<Product | null>(productBySlugQuery, { slug });
      if (product) {
        return normalizeProduct(product);
      }
    } catch (error) {
      console.error(`Failed to fetch product ${slug} from Sanity`, error);
    }
  }

  const manifest = await readManifest();
  const fallback = manifest.products?.find((product) => product.slug === slug);
  return fallback ? normalizeProduct(fallback) : null;
});

export const getCategories = cache(async (): Promise<Category[]> => {
  if (sanityClient) {
    try {
      const categories = await sanityClient.fetch<Category[]>(categoriesQuery);
      if (Array.isArray(categories) && categories.length > 0) {
        return categories;
      }
    } catch (error) {
      console.error("Failed to fetch categories from Sanity", error);
    }
  }

  const manifest = await readManifest();
  return manifest.categories ?? [];
});

export const getMarketingContent = cache(async (): Promise<MarketingContent | null> => {
  if (sanityClient) {
    try {
      const marketing = await sanityClient.fetch<MarketingContent | null>(marketingContentQuery);
      if (marketing) {
        return marketing;
      }
    } catch (error) {
      console.error("Failed to fetch marketing content from Sanity", error);
    }
  }

  const manifest = await readManifest();
  return manifest.marketing ?? null;
});

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  if (sanityClient) {
    try {
      const settings = await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
      if (settings) {
        return settings;
      }
    } catch (error) {
      console.error("Failed to fetch site settings from Sanity", error);
    }
  }

  const manifest = await readManifest();
  return manifest.siteSettings ?? null;
});
