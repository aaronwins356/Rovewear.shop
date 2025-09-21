import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types/product';
import { Button } from './Button';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import { Link } from '../router/RouterProvider';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-brand.accent/40 to-black shadow-elevated"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
            initial={{ scale: 1.05 }}
            whileHover={{ scale: 1.1 }}
          />
        </div>
        <div className="space-y-2 px-6 pb-6 pt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">{product.category}</p>
          <h3 className="text-xl font-semibold uppercase tracking-[0.2em] text-white">{product.name}</h3>
          <p className="text-sm text-white/70">{formatCurrency(product.price)}</p>
        </div>
      </Link>
      <div className="px-6 pb-6">
        <Button className="w-full" onClick={() => addItem(product)}>
          Add to cart
        </Button>
      </div>
    </motion.div>
  );
};
