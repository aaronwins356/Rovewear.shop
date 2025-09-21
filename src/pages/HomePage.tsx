import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { Product } from '../types/product';

type HomePageProps = {
  onOpenCart: () => void;
};

const products = productsData as Product[];

const HomePage = ({ onOpenCart }: HomePageProps) => {
  const featured = products.slice(0, 3);

  return (
    <div className="space-y-20 pb-24">
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Rove eyewear</p>
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
              Luxury eyewear engineered for luminous moments.
            </h1>
            <p className="text-base text-neutral-500">
              Discover ultra-light titanium frames, handcrafted acetates, and future-forward lenses. Designed in
              California. Worn everywhere.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-full bg-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700"
              >
                Shop collection
              </Link>
              <button
                type="button"
                onClick={onOpenCart}
                className="rounded-full border border-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                View cart
              </button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="h-72 w-72 rounded-full bg-neutral-100 blur-3xl" aria-hidden="true" />
            <img
              src="/products/aviator.svg"
              alt="ROVE Aurora Aviator"
              className="absolute inset-0 m-auto w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Featured</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">Curated picks for now</h2>
          </div>
          <Link to="/products" className="text-sm uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900">
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} showDescription onAdd={onOpenCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
