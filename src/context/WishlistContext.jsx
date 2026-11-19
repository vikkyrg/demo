import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

const INITIAL_BOQ = [
  {
    id: "ultratech-super-53-opc",
    name: "UltraTech Super 53 Grade OPC Cement 50kg (Tested Batch)",
    sku: "SKU: UT-53-OPC-BATCH",
    category: "Cement & Aggregates",
    price: 410,
    mrp: 460,
    boqQty: 500,
    unit: "Bags",
    allocatedStage: "Basement Slab Pour Phase 2",
    testedBatch: "TC-2024-UT-8941",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIn2ojZXj0A-q0y5qXIqVotoAnDck5BfrbUXWtgJrramyPL9rE4wbMK1nDVdIkoUPA9fJpNdza3maZk07HERwib3B-9Z47KjTknuY_OstM4xyw_JiJkDGxmU9GMzgV6qADRAd64w8iQiXXHtpKEJmgN3OX8vUVzYxf7RAGCQAPJ6u4jQ-Xxuwo_4Gn-4geVh5h9Nr-pCIOiJUmaH0Y5HI1VMQqEBGCcDDABWfa0JzK"
  },
  {
    id: "tata-tiscon-550d-12mm",
    name: "Tata Tiscon 550D Super Ductile TMT Rebar 16mm (12-Meter Lengths)",
    sku: "SKU: TT-550D-16MM",
    category: "Structural Steel",
    price: 68500,
    mrp: 74200,
    boqQty: 12,
    unit: "MT",
    allocatedStage: "Shear Wall Reinforcement Grid",
    testedBatch: "TC-2024-TATA-7712",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVVp1EatobSYVhZvmKgUgUjycoqKHzUJ_3cVykMEPrp9cv4ZNchh0Wzt0XqnNrs9eBOUTwxs3DYNOAA8ttzJrtkyL_nzdWzb4nPYWbKmfvf4LRP42pl6K06J3DnEdDLwniUAzwgp0-w0Egbc8ps4iAzEtUHnmn0mErWrAWgLNs9u-_vgRq_LWR9AKG5b8eGhYmPLTSVO_QnrLiXUKlfreGrye6uKKQy4_bwfIvMAW9"
  },
  {
    id: "sika-antisol-ar-20l",
    name: "Sika Antisol AR Water-Based Concrete Curing Compound (20L Drum)",
    sku: "SKU: SK-ANTI-20",
    category: "Chemicals & Admixtures",
    price: 3200,
    mrp: 3750,
    boqQty: 25,
    unit: "Drums",
    allocatedStage: "Curing Phase 1 Deck",
    testedBatch: "TC-2024-SIKA-109",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf1NXiU_QTEjwV0zYqFsbyvNyG7ro3XeYFThlIJg36ZFmwxw9Z0XA4XVa1Jso-DK9qdADkfc94sRR44zROZljKbOwJNE-82V4WOXZhZiVdXmT_oEsd4dvg0uqoHfd_5XYTBqscf47ZbZv2iS7FiLJXx-uMBx7TDbgKp0IjmAe0yG4T-OhBa-U1O1ciY3Mxh0pmcXORKLxHxpmaQ8I9es467mrxm7p4JjOX8-kJ35sY"
  }
];

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('buildmart_wishlist');
      return saved ? JSON.parse(saved) : INITIAL_BOQ;
    } catch {
      return INITIAL_BOQ;
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
          name: product.fullName || product.name,
          sku: product.sku || 'SKU: BM-GEN',
          category: product.category,
          price: product.price,
          mrp: product.mrp,
          boqQty: 10,
          unit: product.unit,
          allocatedStage: 'Site General Staging',
          testedBatch: 'TC-2024-BATCH-LIVE',
          image: product.image
        }
      ];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        count: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
export default WishlistContext;
