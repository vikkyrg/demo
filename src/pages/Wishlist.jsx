import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, showToast } = useCart();
  const [activeTab, setActiveTab] = useState('falcon-city');

  const handleTransferAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        unit: item.unit,
        image: item.image,
        sku: item.sku
      }, item.boqQty || 1);
    });
    showToast('BOQ Transferred', 'All schedule items transferred to active site cart!');
  };

  const handleAddSingleToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      unit: item.unit,
      image: item.image,
      sku: item.sku
    }, item.boqQty || 1);
  };

  return (
    <main className="w-full pt-32 bg-surface-canvas min-h-screen pb-20">
      <div className="flex flex-col w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 w-full flex flex-col gap-6">
          {/* Breadcrumbs & Status */}
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 text-[13px] text-secondary">
              <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
                <span className="material-symbols-outlined text-[16px]">home</span> Home
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-semibold">Wishlist &amp; Saved BOQ Schedules</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-bold text-on-surface tracking-tight font-headline-lg">
                  Wishlist &amp; Saved BOQ Schedules
                </h1>
                <p className="text-[14px] text-secondary">
                  Bill of Quantities Planner • Site Casting Schedule Management
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTransferAllToCart}
                  disabled={wishlistItems.length === 0}
                  className="bg-primary-container hover:bg-safety-orange-hover text-white text-[13px] font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
                  Transfer Entire BOQ to Active Cart
                </button>
              </div>
            </div>
          </div>

          {/* Project Header Banner Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[32px]">architecture</span>
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-[20px] font-bold text-on-surface">
                    Prestige Falcon City — Tower 4 Casting BOQ
                  </h2>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    Phase 1 Approved
                  </span>
                </div>
                <p className="text-[13px] text-secondary mt-1">
                  Contractor: <strong>L&amp;T Urban Projects Infra Ltd</strong> • Staging Yard B Ramp • 30-Day Rate Lock Active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-border-subtle pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-[11px] text-secondary font-bold uppercase tracking-wider block">
                  Total Schedule Estimate
                </span>
                <span className="text-[22px] font-bold text-on-surface font-price-hero">
                  ₹{wishlistItems.reduce((acc, i) => acc + (i.price * (i.boqQty || 1)), 0).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => alert('Exporting BOQ Schedule to Excel / PDF...')}
                className="px-3.5 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-[12px] rounded-lg border border-border-subtle transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                Export Excel
              </button>
            </div>
          </div>

          {/* BOQ Schedule Line Items */}
          <div className="bg-white rounded-xl shadow-sm border border-border-subtle overflow-hidden">
            <div className="p-4 bg-surface-container-low/50 border-b border-border-subtle flex items-center justify-between">
              <span className="text-[13px] font-bold text-on-surface uppercase tracking-wider">
                Scheduled Structural Materials ({wishlistItems.length} Items)
              </span>
              <span className="text-[11px] text-secondary font-medium">
                Locked Rates Guaranteed for 30 Days
              </span>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-[48px] text-secondary">bookmark_border</span>
                <h3 className="text-[16px] font-bold text-on-surface">No saved items in this BOQ schedule</h3>
                <p className="text-[13px] text-secondary">Browse the catalog to add materials to this contractor schedule.</p>
                <Link
                  to="/products"
                  className="bg-primary-container hover:bg-safety-orange-hover text-white text-[13px] font-bold px-4 py-2 rounded-lg mt-2"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border-subtle">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-surface-container-low/20 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-xl bg-surface-container flex items-center justify-center shrink-0 border border-border-subtle/80 overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-secondary text-[32px]">inventory_2</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-[15px] font-bold text-on-surface">{item.name}</h4>
                          <span className="bg-surface-container text-secondary text-[10px] px-2 py-0.5 rounded font-bold">
                            {item.sku}
                          </span>
                        </div>
                        <p className="text-[12px] text-secondary mt-1">
                          Stage: <strong>{item.allocatedStage || 'General Slab Casting'}</strong> • Test: {item.testedBatch || 'TC-2026-LIVE'}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[12px]">
                          <span className="text-secondary">Scheduled Qty: <strong>{item.boqQty || 1} {item.unit || 'Units'}</strong></span>
                          <span className="text-outline-variant">•</span>
                          <span className="text-tertiary font-bold">₹{item.price.toLocaleString()} / {item.unit?.split(' ')[0] || 'Unit'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto shrink-0 pt-2 sm:pt-0 gap-2">
                      <div className="text-right">
                        <span className="text-[18px] font-bold text-on-surface font-price-card block">
                          ₹{(item.price * (item.boqQty || 1)).toLocaleString()}
                        </span>
                        <span className="text-[11px] text-secondary">Locked Rate</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddSingleToCart(item)}
                          className="px-3.5 py-1.5 bg-primary-container hover:bg-safety-orange-hover text-white text-[12px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-1.5 text-secondary hover:text-error transition-colors cursor-pointer"
                          title="Remove from BOQ"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
