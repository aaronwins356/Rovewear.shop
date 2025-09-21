import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

type ProductCardProps = {
  product: Product;
  showDescription?: boolean;
  onAdd?: () => void;
};

const ProductCard = ({ product, showDescription = false, onAdd }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    onAdd?.();
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="relative block aspect-square bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-10 transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">{product.category}</p>
          <p className="text-sm font-semibold text-neutral-900">${product.price.toFixed(0)}</p>
        </div>
        <Link to={`/products/${product.id}`} className="text-lg font-semibold tracking-tight text-neutral-900">
          {product.name}
        </Link>
        {showDescription && (
          <p className="text-sm leading-relaxed text-neutral-500">{product.description}</p>
        )}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
