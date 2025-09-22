export interface ImageAsset {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  name: string;
  price: number;
  currency?: string;
  sku?: string;
}

export interface ProductReview {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ProductSpecs {
  lensWidth?: string;
  bridgeWidth?: string;
  templeLength?: string;
  frameMaterial?: string;
  lensMaterial?: string;
  weight?: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  currency: string;
  status: "inStock" | "lowStock" | "preorder" | "soldOut";
  tags: string[];
  categorySlugs: string[];
  heroImage?: ImageAsset;
  images: ImageAsset[];
  variants?: ProductVariant[];
  specs?: ProductSpecs;
  reviews?: ProductReview[];
  popularity?: number;
  rating?: number;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  heroImage?: ImageAsset;
}

export interface MarketingContent {
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  heroImage?: ImageAsset;
  featuredProductSlugs: string[];
  featuredCategorySlugs: string[];
  newsletterHeadline: string;
  newsletterSubheadline: string;
}

export interface SiteSettings {
  currency: string;
  supportEmail: string;
  supportPhone?: string;
  footerLinks: Array<{ label: string; href: string }>;
  announcement?: string;
}
