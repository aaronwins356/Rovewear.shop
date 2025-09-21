import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import { Product } from '../types/product';

type ProductDetailPageProps = {
  onOpenCart: () => void;
};

const products = productsData as Product[];

const ProductDetailPage = ({ onOpenCart }: ProductDetailPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = useMemo(() => products.find((item) => item.id === id), [id]);

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-24">
        <p className="text-lg font-semibold text-neutral-900">Frame not found.</p>
        <p className="mt-2 text-sm text-neutral-500">The model you are looking for may be archived or sold out.</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-6 rounded-full border border-neutral-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900"
        >
          Go back
        </button>
      </div>
    );
  }

  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product);
    onOpenCart();
  };

  return (
    <div className="space-y-20 pb-24">
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
            <img src={product.image} alt={product.name} className="mx-auto w-full max-w-md object-contain" />
          </div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-neutral-400">
            {product.colors?.map((color) => (
              <span key={color} className="rounded-full border border-neutral-200 px-4 py-2">
                {color}
              </span>
            ))}
            {product.sizes?.map((size) => (
              <span key={size} className="rounded-full border border-neutral-200 px-4 py-2">
                {size}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Link to="/products" className="text-xs uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900">
            Back to collection
          </Link>
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">{product.category}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">{product.name}</h1>
          <p className="text-lg font-semibold text-neutral-900">${product.price.toFixed(0)}</p>
          <p className="text-sm leading-relaxed text-neutral-500">{product.description}</p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="rounded-full border border-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              View cart
            </button>
          </div>
          <ul className="space-y-2 text-sm text-neutral-500">
            <li>• Ultra-clear, anti-reflective optics</li>
            <li>• Polarised UV400 protection</li>
            <li>• Lifetime in-studio adjustments</li>
          </ul>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">You may also like</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((related) => (
            <ProductCard key={related.id} product={related} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
