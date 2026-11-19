import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAvailableStock } from '../data/inventory';

const CartContext = createContext();
const CART_KEY = 'buildmart_cart';

const readCart = () => {
  try {
    const savedItems = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(savedItems)
      ? savedItems.map((item) => ({
        ...item,
        mrp: item.mrp || item.price,
        stockCount: item.stockCount ?? getAvailableStock(item),
      }))
      : [];
  } catch (error) {
    console.error('Unable to read saved cart.', error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(readCart);
  const [toast, setToast] = useState({ show: false, message: '', title: '' });
  const [coupon, setCoupon] = useState({ code: '', discountPercent: 0, applied: false });
  const [selectedSlot, setSelectedSlot] = useState('standard');

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Unable to save cart.', error);
    }
  }, [cartItems]);

  const showToast = (title, message = '') => {
    setToast({ show: true, title, message });
    window.setTimeout(() => setToast({ show: false, title: '', message: '' }), 3200);
  };

  const addToCart = (product, quantity = 1) => {
    const availableStock = getAvailableStock(product);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || availableStock < quantity) {
      showToast('Unable to add product', availableStock < quantity ? 'Not enough stock is available.' : 'Please choose a valid quantity.');
      return false;
    }

    const existing = cartItems.find((item) => item.id === product.id);
    if (existing && existing.quantity + quantity > availableStock) {
      showToast('Stock limit reached', `Only ${availableStock} units are currently available.`);
      return false;
    }

    setCartItems((items) => {
      const currentItem = items.find((item) => item.id === product.id);
      if (currentItem) {
        return items.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item);
      }

      return [...items, {
        id: product.id,
        name: product.shortTitle || product.name,
        brand: product.brand,
        sku: product.sku,
        price: product.price,
        mrp: product.mrp || product.price,
        unit: product.unit || 'Unit',
        weightKg: product.weightKg || 0,
        stockCount: availableStock,
        quantity,
        image: product.image || product.media?.find((media) => media.type === 'image')?.src || '',
      }];
    });
    showToast('Added to cart', `${product.shortTitle || product.name} was added to your cart.`);
    return true;
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (!item) return;
    const availableStock = getAvailableStock(item);
    if (newQuantity > availableStock) {
      showToast('Stock limit reached', `Only ${availableStock} units are currently available.`);
      return;
    }
    setCartItems((items) => items.map((cartItem) => (
      cartItem.id === id ? { ...cartItem, quantity: newQuantity } : cartItem
    )));
  };

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon({ code: '', discountPercent: 0, applied: false });
  };

  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalWeightKg = cartItems.reduce((total, item) => total + (item.weightKg * item.quantity), 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = cartItems.reduce(
    (total, item) => total + (Math.max(0, (item.mrp || item.price) - item.price) * item.quantity),
    0
  );
  const couponDiscount = coupon.applied ? Math.round(subtotal * coupon.discountPercent / 100) : 0;
  const deliveryCharge = 0;
  const grandTotal = Math.max(0, subtotal - couponDiscount) + deliveryCharge;

  const applyCoupon = (code) => {
    if (code.trim().toUpperCase() === 'BUILDFIRST') {
      setCoupon({ code: 'BUILDFIRST', discountPercent: 5, applied: true });
      return true;
    }
    return false;
  };

  const removeCoupon = () => setCoupon({ code: '', discountPercent: 0, applied: false });

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItemsCount,
      totalWeightKg,
      totalWeightTons: (totalWeightKg / 1000).toFixed(2),
      subtotal,
      discountAmount,
      couponDiscount,
      deliveryCharge,
      gstAmount: 0,
      grandTotal,
      coupon,
      applyCoupon,
      removeCoupon,
      selectedSlot,
      setSelectedSlot,
      offloadLogistics: '',
      setOffloadLogistics: () => {},
      toast,
      showToast,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
