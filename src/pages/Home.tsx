import React from 'react';
import { Hero } from '../components/Hero';
import { products } from '../data';
import { ProductCard } from '../components/ProductCard';
import { Link } from '../router/RouterProvider';
import { Seo } from '../components/Seo';

export const Home: React.FC = () => (
  <>
    <Seo
      title="ROVE Eyewear | Luxury Sunglasses & Optical Frames"
      description="Explore ROVE's luxury eyewear collection blending timeless silhouettes with modern engineering."
      ogTitle="ROVE Eyewear"
      ogDescription="Luxury eyewear crafted for modern explorers."
    />
    <Hero />
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl uppercase tracking-[0.3em] text-white">Featured</h2>
        <Link to="/products" className="text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white">
          Shop All
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  </>
);
