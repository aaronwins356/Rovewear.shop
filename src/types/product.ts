export interface ProductImage {
  src: string;
  alt?: string;
  background?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  colors?: string[];
  sizes?: string[];
  gallery?: ProductImage[];
}
