export type ProductCategory = 'Aviators' | 'Browline' | 'Square';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  description: string;
  lensWidth: number;
  bridgeWidth: number;
  templeLength: number;
}

export interface CartLineItem {
  product: Product;
  quantity: number;
}
