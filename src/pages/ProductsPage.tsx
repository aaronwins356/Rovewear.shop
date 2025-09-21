import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { Product } from '../types/product';

interface ProductsPageProps {
  onOpenCart?: () => void;
}

const products = productsData as Product[];

const ProductsPage = ({ onOpenCart }: ProductsPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? 'All';

  const categories = useMemo(() => ['All', ...new Set(products.map((product) => product.category))], []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const handleFilterChange = (nextCategory: string) => {
    const next = new URLSearchParams(searchParams);
    if (nextCategory === 'All') {
      next.delete('category');
    } else {
      next.set('category', nextCategory);
    }
    setSearchParams(next, { replace: true });
  };

  const handleQueryChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value.trim()) {
      next.set('q', value);
    } else {
      next.delete('q');
    }
    setSearchParams(next, { replace: true }); // Persist the search term to the URL so refreshes and sharing keep context.
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24">
      <header className="space-y-6 py-16">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Collection</p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Elevated eyewear for every horizon.</h1>
        <p className="max-w-2xl text-sm text-neutral-500">
          Filter by silhouette or search by name to find frames engineered for clarity, balance, and lasting comfort.
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleFilterChange(item)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                  category === item
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="ml-auto w-full max-w-sm">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Search the collection"
              className="w-full rounded-full border border-neutral-200 px-5 py-3 text-sm outline-none transition focus:border-neutral-900"
              type="search"
            />
          </div>
        </div>
      </header>
      <section>
        {filteredProducts.length === 0 ? (
          <p className="py-12 text-sm text-neutral-500">No frames found — try a different silhouette or search term.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showDescription onAdd={onOpenCart} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;
