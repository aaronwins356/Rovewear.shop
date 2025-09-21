import React, { useEffect, useMemo, useState } from 'react';
import { products, getCategories } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useRouter, useSearchParams } from '../router/RouterProvider';
import { Seo } from '../components/Seo';

const categories = getCategories();

export const ProductsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const { navigate, location } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('q') ?? '');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryValue = params.get('q') ?? '';
    if (queryValue !== searchTerm) {
      setSearchTerm(queryValue);
    }
  }, [location.search, searchTerm]);

  const activeCategory = searchParams.get('category') ?? 'All';

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesQuery = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchTerm]);

  const buildSearchString = (category: string, query: string) => {
    const params = new URLSearchParams();
    if (category !== 'All') {
      params.set('category', category);
    }
    if (query) {
      params.set('q', query);
    }
    const searchString = params.toString();
    return searchString ? `/products?${searchString}` : '/products';
  };

  const handleCategoryChange = (category: string) => {
    navigate(buildSearchString(category, searchTerm), { replace: true });
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(buildSearchString(activeCategory, searchTerm), { replace: true });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <Seo
        title="Shop ROVE Eyewear | Sunglasses & Optical Frames"
        description="Shop aviator, browline, and square frames from ROVE's signature eyewear collection."
      />
      <header className="mb-12 space-y-6 pt-12 text-center">
        <h1 className="text-4xl uppercase tracking-[0.3em]">All Products</h1>
        <p className="mx-auto max-w-2xl text-sm text-white/60">
          Filter by silhouette or search the collection to find the perfect frame. Each pair ships with premium case,
          cleaning kit, and lifetime adjustments.
        </p>
        <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-xl items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search ROVE eyewear"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <button type="submit" className="text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white">
            Search
          </button>
        </form>
        <div className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.3em]">
          {['All', ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full border px-4 py-2 transition ${
                activeCategory === category
                  ? 'border-white bg-white text-black'
                  : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="mt-12 text-center text-sm text-white/60">
          No frames matched your search. Try a different term or reset filters.
        </p>
      )}
    </div>
  );
};
