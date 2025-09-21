export interface ProductVariant {
  id?: string | null;
  color: string;
  price: number | null;
  image: string;
}

export interface ProductSpecs {
  lensWidth: number | null;
  bridgeWidth: number | null;
  templeLength: number | null;
  frameWidth: number | null;
  lensHeight: number | null;
  weight: number | null;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  categories: string[];
  descriptionHtml: string;
  summary: string;
  price: number | null;
  currency: string;
  thumbnail: string;
  specs: ProductSpecs;
  variants: ProductVariant[];
  gallery: string[];
}

export interface CartItem {
  productId: string;
  variantColor?: string;
  quantity: number;
}
