import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { useCart } from '../hooks/useCart';
import { Link, useRouter } from '../router/RouterProvider';

const categories = [
  { label: 'Aviators', href: '/products?category=Aviators' },
  { label: 'Browline', href: '/products?category=Browline' },
  { label: 'Square', href: '/products?category=Square' }
];

export const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { items, toggleDrawer } = useCart();
  const { location } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const searchParams = new URLSearchParams(location.search);

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full transition-colors ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm uppercase tracking-[0.3em]">
        <Link to="/" className="text-lg font-bold tracking-[0.4em]">
          ROVE
        </Link>
        <div className="hidden gap-6 md:flex">
          {categories.map((category) => {
            const isActive =
              location.pathname.startsWith('/products') &&
              searchParams.get('category') === category.label;
            return (
              <Link
                key={category.href}
                to={category.href}
                className={`transition hover:text-brand.light ${
                  isActive ? 'text-brand.light' : 'text-white/70'
                }`}
              >
                {category.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/account" className="hidden text-white/70 transition hover:text-white md:inline-flex">
            Account
          </Link>
          <Button variant="secondary" size="sm" onClick={toggleDrawer} aria-label="Open cart">
            Cart {totalItems > 0 && <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-black">{totalItems}</span>}
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};
