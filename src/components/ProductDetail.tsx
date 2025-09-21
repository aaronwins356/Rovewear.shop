import React from 'react';
import { ProductGallery } from './ProductGallery';
import { Button } from './Button';
import type { Product } from '../types/product';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addItem } = useCart();

  const galleryImages = [product.image, product.image, product.image];

  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <ProductGallery images={galleryImages} />
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">{product.category}</p>
          <h1 className="text-4xl font-semibold uppercase tracking-[0.2em] text-white">{product.name}</h1>
          <p className="text-lg text-white/70">{formatCurrency(product.price)}</p>
          <p className="text-sm text-white/60">{product.description}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/60">Fit Specs</p>
          <dl className="grid grid-cols-3 gap-4 text-center text-sm uppercase tracking-[0.2em] text-white">
            <div>
              <dt className="text-xs text-white/50">Lens</dt>
              <dd className="text-lg">{product.lensWidth}mm</dd>
            </div>
            <div>
              <dt className="text-xs text-white/50">Bridge</dt>
              <dd className="text-lg">{product.bridgeWidth}mm</dd>
            </div>
            <div>
              <dt className="text-xs text-white/50">Temple</dt>
              <dd className="text-lg">{product.templeLength}mm</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" onClick={() => addItem(product)}>
            Add to cart
          </Button>
          <Button variant="secondary" size="lg">
            Book a virtual fitting
          </Button>
        </div>
      </div>
    </div>
  );
};
