import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const INITIAL_CART = [
  {
    id: "ultratech-ppc-50kg",
    name: "UltraTech PPC Cement 50kg Bag",
    sku: "SKU: UT-PPC-50",
    price: 385,
    unit: "Bag",
    weightKg: 50,
    quantity: 40,
    stagingYard: "Staging Yard B - Basement 2 Ramp",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIn2ojZXj0A-q0y5qXIqVotoAnDck5BfrbUXWtgJrramyPL9rE4wbMK1nDVdIkoUPA9fJpNdza3maZk07HERwib3B-9Z47KjTknuY_OstM4xyw_JiJkDGxmU9GMzgV6qADRAd64w8iQiXXHtpKEJmgN3OX8vUVzYxf7RAGCQAPJ6u4jQ-Xxuwo_4Gn-4geVh5h9Nr-pCIOiJUmaH0Y5HI1VMQqEBGCcDDABWfa0JzK"
  },
  {
    id: "tata-tiscon-550d-12mm",
    name: "Tata Tiscon 550D TMT Bar 12mm",
    sku: "SKU: TT-550D-12",
    price: 68500,
    unit: "MT",
    weightKg: 1000,
    quantity: 1,
    stagingYard: "Tower 4 Core Staging",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVVp1EatobSYVhZvmKgUgUjycoqKHzUJ_3cVykMEPrp9cv4ZNchh0Wzt0XqnNrs9eBOUTwxs3DYNOAA8ttzJrtkyL_nzdWzb4nPYWbKmfvf4LRP42pl6K06J3DnEdDLwniUAzwgp0-w0Egbc8ps4iAzEtUHnmn0mErWrAWgLNs9u-_vgRq_LWR9AKG5b8eGhYmPLTSVO_QnrLiXUKlfreGrye6uKKQy4_bwfIvMAW9"
  },
  {
    id: "asian-paints-apex-ultima-20l",
    name: "Asian Paints Apex Ultima Exterior 20L",
    sku: "SKU: AP-ULTIMA-20",
    price: 5450,
    unit: "Drum",
    weightKg: 26,
    quantity: 2,
    stagingYard: "Finishing Store 1",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9I0Yk1MmITmjVakCPmpdirm9PcTaLF80yAi2BNSUy2HTI88Qu-Mey0C32UzXDRrhhRE0YC6eb5GSmUy-uYxIQeWvOhD3XHQZkqXoMUIJW3_-2nEDxL8vWBPSlWdm4nEesnfJVTf41hSsudlKyfPJSb4Pgyjdm-vMG32MB88XT9ASNq6qTLUUuYkRLCMAl8CT3zW_jWXTcMaA98zrAwoXbqP2iDFFF3hmmq0wpdGE7"
  },
  {
    id: "dr-fixit-pdifin-2k-12kg",
    name: "Dr. Fixit Pdifin 2K Waterproofing 12kg",
    sku: "SKU: DF-PDF2K-12",
    price: 1890,
    unit: "Kit",
    weightKg: 12,
    quantity: 4,
    stagingYard: "Basement Waterproofing Yard",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjr4yoJMXb7z4-F7rlxBbKDY_U7tt3t_S-I_9L_aWJJX-ywaWAH9Tl_wAThVzGnno-0iUZF66XVWxduasPx90mw_NQgvEHWWlE9jTzXyX3kv03PQsgBE9u-_lyoGDbTuLZfMjZm--eg5TUtBXVeqkKmri9dWB1bcgp-3UXWjV7JyH5ULJnT1K0dDLGnbvlrlIP0IhehRfu9DUYPd8aWXbVURMzortpAkDTkL7cSI93"
  }
];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('buildmart_cart');
      return saved ? JSON.parse(saved) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });

  const [toast, setToast] = useState({ show: false, message: '', title: '' });
  const [coupon, setCoupon] = useState({ code: 'BUILDFIRST', discountPercent: 5, applied: false });
  const [selectedSlot, setSelectedSlot] = useState('express-60m');
  const [offloadLogistics, setOffloadLogistics] = useState('hydraulic-crane');

  useEffect(() => {
    try {
      localStorage.setItem('buildmart_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (title, message = 'Item added to active site cart!') => {
    setToast({ show: true, title, message });
    setTimeout(() => {
      setToast({ show: false, message: '', title: '' });
    }, 3200);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.shortTitle || product.name,
          sku: product.sku,
          price: product.price,
          unit: product.unit || 'Unit',
          weightKg: product.weightKg || 50,
          quantity: quantity,
          stagingYard: 'General Staging Area',
          image: product.image
        }
      ];
    });
    showToast('Added to Site Manifest', `${product.shortTitle || product.name} added to cart!`);
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalWeightKg = cartItems.reduce((acc, item) => acc + (item.weightKg * item.quantity), 0);
  const totalWeightTons = (totalWeightKg / 1000).toFixed(2);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = coupon.applied ? Math.round(subtotal * (coupon.discountPercent / 100)) : 0;
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = Math.round(taxableAmount * 0.18);
  const grandTotal = taxableAmount + gstAmount;

  const applyCoupon = (code) => {
    if (code.toUpperCase() === 'BUILDFIRST' || code.toUpperCase() === 'PRO500') {
      setCoupon({ code: code.toUpperCase(), discountPercent: 5, applied: true });
      showToast('Coupon Applied', '5% Contractor Wholesale Discount Applied!');
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCoupon({ code: '', discountPercent: 0, applied: false });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        totalWeightKg,
        totalWeightTons,
        subtotal,
        discountAmount,
        gstAmount,
        grandTotal,
        coupon,
        applyCoupon,
        removeCoupon,
        selectedSlot,
        setSelectedSlot,
        offloadLogistics,
        setOffloadLogistics,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
