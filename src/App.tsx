import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { CartProvider } from './context/CartContext';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import SuccessPage from './pages/SuccessPage';
import TermsPage from './pages/TermsPage';
import CancelPage from './pages/CancelPage';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-neutral-100">
        <NavBar onCartToggle={() => setIsCartOpen((prev) => !prev)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenCart={() => setIsCartOpen(true)} />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage onOpenCart={() => setIsCartOpen(true)} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default App;
