import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  showDescription?: boolean;
  onAdd?: () => void;
}

const ProductCard = ({ product, showDescription = false, onAdd }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    onAdd?.();
  };

  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_24px_48px_rgba(15,23,42,0.05)]"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Link to={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-neutral-100">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-10"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[0.55rem] uppercase tracking-[0.35em] text-neutral-500">
          {product.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <Link to={`/products/${product.id}`} className="text-lg font-semibold tracking-tight text-neutral-900">
            {product.name}
          </Link>
          <p className="text-base font-semibold text-neutral-900">${product.price.toFixed(0)}</p>
        </div>
        {showDescription && <p className="text-sm leading-relaxed text-neutral-500">{product.description}</p>}
        <Button onClick={handleAddToCart} className="mt-auto" size="md">
          Add to cart
        </Button>
      </div>
    </motion.article>
  );
};

export default ProductCard;
