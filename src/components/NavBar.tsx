import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

type NavBarProps = {
  onCartToggle: () => void;
};

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
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-xl font-semibold tracking-tight" onClick={handleNavigate}>
          ROVE
        </Link>
        <nav className="hidden gap-8 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleNavigate}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive || location.pathname.startsWith(link.to)
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
          <Link
            to="/products"
            className="hidden rounded-full border border-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition-colors hover:bg-neutral-900 hover:text-white lg:inline-flex"
            onClick={handleNavigate}
          >
            Explore
          </Link>
          <button
            type="button"
            onClick={onCartToggle}
            className="relative rounded-full border border-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition-colors hover:bg-neutral-900 hover:text-white"
            aria-label="Toggle cart"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-neutral-900 px-2 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </button>
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
        <div className="border-t border-neutral-200 bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-600">
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
        </div>
      )}
    </header>
  );
};

export default NavBar;
