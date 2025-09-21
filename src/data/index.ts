import productsData from './products.json';
import type { Product, ProductCategory } from '../types/product';

const normaliseCategory = (category: string): ProductCategory => {
  if (category === 'Aviators' || category === 'Browline' || category === 'Square') {
    return category;
  }
  return 'Square';
};

export const products: Product[] = productsData.map((product) => ({
  ...product,
  category: normaliseCategory(product.category)
}));

export const getProductById = (id: string): Product | undefined => products.find((product) => product.id === id);

export const getCategories = (): string[] => Array.from(new Set(products.map((product) => product.category)));
