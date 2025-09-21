import { Link } from 'react-router-dom';
import mark from '../assets/rove-mark.svg';

const Footer = () => (
  <footer className="border-t border-neutral-200 bg-white py-14">
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-3">
          <img src={mark} alt="ROVE" className="h-10 w-10" />
          <span className="text-lg font-semibold tracking-[0.5em] text-neutral-900">ROVE</span>
        </div>
        <p className="max-w-sm text-sm text-neutral-500">
          Modern eyewear engineered for clarity, comfort, and understated luxury. Hand-assembled in Los Angeles with ocean-ready coatings.
        </p>
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">© {new Date().getFullYear()} ROVE Atelier</p>
      </div>
      <div className="grid grid-cols-2 gap-8 text-xs uppercase tracking-[0.3em] text-neutral-500 md:justify-items-end">
        <div className="space-y-3">
          <p className="text-neutral-900">Navigate</p>
          <div className="flex flex-col gap-2">
            <Link to="/products">Collection</Link>
            <Link to="/about">About</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-neutral-900">Policies</p>
          <div className="flex flex-col gap-2">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
