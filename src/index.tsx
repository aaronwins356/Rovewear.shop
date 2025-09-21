import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';
import { RouterProvider } from './router/RouterProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </RouterProvider>
  </React.StrictMode>
);
