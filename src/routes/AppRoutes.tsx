import React from 'react';
import { useRouter } from '../router/RouterProvider';
import { Home } from '../pages/Home';
import { ProductsPage } from '../pages/Products';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { AboutPage } from '../pages/AboutPage';
import { SuccessPage } from '../pages/SuccessPage';
import { CancelPage } from '../pages/CancelPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { TermsPage } from '../pages/TermsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AccountPage } from '../pages/AccountPage';

const normalizePath = (path: string): string => path.replace(/\/+$/, '') || '/';

export const AppRoutes: React.FC = () => {
  const {
    location: { pathname }
  } = useRouter();
  const normalized = normalizePath(pathname);

  if (normalized === '/') {
    return <Home />;
  }
  if (normalized === '/products') {
    return <ProductsPage />;
  }
  if (normalized.startsWith('/products/')) {
    const productId = normalized.replace('/products/', '');
    return <ProductDetailPage productId={productId} />;
  }
  if (normalized === '/cart') {
    return <CartPage />;
  }
  if (normalized === '/checkout') {
    return <CheckoutPage />;
  }
  if (normalized === '/about') {
    return <AboutPage />;
  }
  if (normalized === '/success') {
    return <SuccessPage />;
  }
  if (normalized === '/cancel') {
    return <CancelPage />;
  }
  if (normalized === '/privacy') {
    return <PrivacyPage />;
  }
  if (normalized === '/terms') {
    return <TermsPage />;
  }
  if (normalized === '/account') {
    return <AccountPage />;
  }
  return <NotFoundPage />;
};
