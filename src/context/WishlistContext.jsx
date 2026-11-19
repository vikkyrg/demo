import React, { createContext, useContext, useState, useEffect } from 'react';
import products from '../data/products';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('buildmart_wishlist');
      const savedItems = saved ? JSON.parse(saved) : [];
      return Array.isArray(savedItems)
        ? savedItems.filter((item) => products.some((product) => product.id === item.id))
        : [];
    } catch (error) {
      console.error('Unable to read saved wishlist.', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('buildmart_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          shortTitle: product.shortTitle || product.name,
          fullName: product.fullName || product.name,
          sku: product.sku || 'SKU: BM-GEN',
          category: product.category,
          price: product.price,
          mrp: product.mrp || product.price,
          brand: product.brand,
          rating: product.rating,
          reviewsCount: product.reviewsCount,
          inStock: product.inStock,
          stockCount: product.stockCount,
          unit: product.unit || 'Unit',
          image: product.image || (product.media && product.media.find((media) => media.type === 'image')?.src) || '',
          media: product.media || []
        }
      ];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        count: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
export default WishlistContext;
