import React from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-black text-white">
    <NavBar />
    <CartDrawer />
    <main className="pt-24">{children}</main>
    <Footer />
  </div>
);
