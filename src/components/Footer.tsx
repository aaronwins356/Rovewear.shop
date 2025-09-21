import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-neutral-200 bg-white py-10">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-lg font-semibold tracking-tight">ROVE</p>
        <p className="mt-2 max-w-sm text-sm text-neutral-500">
          Modern eyewear engineered for clarity, comfort, and understated luxury.
        </p>
      </div>
      <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.2em] text-neutral-500 md:flex-row md:items-center md:gap-8">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Collection</Link>
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">© {new Date().getFullYear()} ROVE</p>
    </div>
  </footer>
);

export default Footer;
