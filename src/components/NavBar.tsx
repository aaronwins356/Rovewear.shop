import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import wordmark from '../assets/rove-wordmark.svg';
import { useCart } from '../context/CartContext';
import Button from './Button';
import ButtonLink from './ButtonLink';

interface NavBarProps {
  onCartToggle: () => void;
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/products' },
  { label: 'About', to: '/about' },
];

const NavBar = ({ onCartToggle }: NavBarProps) => {
  const { items } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const handleNavigate = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-neutral-200/60 bg-white/80 backdrop-blur"
      initial={{ opacity: 0, y: -32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3" onClick={handleNavigate}>
          <img src={wordmark} alt="ROVE" className="h-5 w-auto" />
        </Link>
        <nav className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleNavigate}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive || (link.to !== '/' && location.pathname.startsWith(link.to))
                    ? 'text-neutral-900'
                    : 'hover:text-neutral-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ButtonLink to="/products" onClick={handleNavigate} variant="ghost" size="md" className="hidden lg:inline-flex">
            Explore
          </ButtonLink>
          <Button onClick={onCartToggle} variant="outline" size="md" className="relative">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-neutral-900 px-2 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <span className="block h-0.5 w-5 bg-neutral-900" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          className="border-t border-neutral-200 bg-white px-6 py-4 lg:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <nav className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-600">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={handleNavigate}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/privacy" onClick={handleNavigate}>
              Privacy
            </Link>
            <Link to="/terms" onClick={handleNavigate}>
              Terms
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default NavBar;
