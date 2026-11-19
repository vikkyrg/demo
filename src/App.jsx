import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import ToastNotification from './components/ToastNotification';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import Wishlist from './pages/Wishlist';
import Policy from './pages/Policy';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <div className="min-h-screen flex flex-col bg-surface-canvas text-on-surface">
              <Header />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductCatalog />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                  <Route path="/order-success" element={<Navigate to="/my-orders" replace />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/my-orders/:id" element={<MyOrders />} />
                  <Route path="/orders" element={<Navigate to="/my-orders" replace />} />
                  <Route path="/orders/:id" element={<MyOrders />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/policy" element={<Policy />} />
                  <Route path="/policy/:type" element={<Policy />} />
                </Routes>
              </div>
              <Footer />
              <MobileBottomNav />
              <ToastNotification />
            </div>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
