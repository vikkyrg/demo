import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // Find product by id or fallback to UltraTech PPC
  const product = products.find((p) => p.id === id) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [orderQty, setOrderQty] = useState(40);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'mix', 'documents'

  const currentTierPrice = orderQty >= 200 ? 345 : orderQty >= 50 ? 365 : product.price;

  const handleAddToCart = () => {
    addToCart(product, orderQty);
  };

  const handleInstantBuy = () => {
    addToCart(product, orderQty);
    navigate('/cart');
  };

  const wishlisted = isInWishlist(product.id);

  return (
    <main className="w-full pt-32 bg-surface-canvas min-h-screen pb-20">
      <div className="flex flex-col w-full">
        {/* Breadcrumb Navigation Bar */}
        <div className="w-full bg-white shadow-xs py-3 border-b border-border-subtle">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <nav className="flex items-center gap-2 text-[13px] text-secondary overflow-x-auto whitespace-nowrap">
              <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
                <span className="material-symbols-outlined text-[16px]">home</span> Home
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link className="hover:text-primary transition-colors" to="/products">
                {product.category}
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface font-semibold truncate max-w-sm">{product.shortTitle || product.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Product Stage Container */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 w-full flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4 sticky top-28">
              {/* Main Image Stage */}
              <div className="relative aspect-square w-full rounded-2xl bg-white border border-border-subtle shadow-sm flex items-center justify-center p-6 overflow-hidden">
                <img
                  src={product.gallery ? product.gallery[selectedImage] || product.image : product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="bg-tertiary text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    60m Express Live
                  </span>
                  <span className="bg-deal-amber text-slate-900 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    IS 1489 Part 1 Certified
                  </span>
                </div>

                <button
                  onClick={() => addToWishlist(product)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer ${
                    wishlisted
                      ? 'bg-deal-amber text-slate-900'
                      : 'bg-white text-secondary hover:text-primary'
                  }`}
                  title={wishlisted ? 'Saved in BOQ' : 'Add to BOQ'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {wishlisted ? 'favorite' : 'bookmark_add'}
                  </span>
                </button>
              </div>

              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-xl bg-white border-2 p-2 flex items-center justify-center cursor-pointer transition-all ${
                        selectedImage === idx ? 'border-primary-container shadow-xs' : 'border-border-subtle hover:border-slate-300'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx}`} className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Engineer Utilities Card */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-on-surface block leading-tight">
                      NABL Lab Test Certificate
                    </span>
                    <span className="text-[11px] text-secondary">Batch #TC-2026-NABL-09 • 1.2 MB</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Downloading NABL Lab Test Report (PDF)...')}
                  className="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-[12px] rounded-lg border border-border-subtle transition-colors cursor-pointer shrink-0"
                >
                  Download Report
                </button>
              </div>
            </div>

            {/* Product Configuration & Commerce Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Header Title & Pricing Cluster */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border-subtle flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="bg-surface-container text-secondary font-bold px-2.5 py-0.5 rounded">
                    {product.brand}
                  </span>
                  <span className="text-secondary font-mono">{product.sku}</span>
                  <span className="text-outline-variant">•</span>
                  <div className="flex items-center gap-1 text-deal-amber font-bold">
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    <span>{product.rating}</span>
                    <span className="text-secondary font-normal">({product.reviewsCount} Contractor Reviews)</span>
                  </div>
                </div>

                <h1 className="text-[22px] sm:text-[26px] font-bold text-on-surface tracking-tight font-headline-lg leading-snug">
                  {product.fullName || product.name}
                </h1>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-surface-container-low/60 border border-border-subtle flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[30px] font-bold text-on-surface font-price-hero">
                      ₹{currentTierPrice.toLocaleString()}
                    </span>
                    <span className="text-[15px] text-secondary line-through">
                      ₹{product.mrp.toLocaleString()}
                    </span>
                    <span className="text-[13px] text-secondary font-medium">/ {product.unit}</span>
                  </div>
                  <span className="text-[12px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Save ₹{(product.mrp - currentTierPrice).toLocaleString()} (12.5% Off MRP)
                  </span>
                </div>

                <p className="text-[14px] text-secondary leading-relaxed">
                  {product.description}
                </p>

                {/* Wholesale Volume Tiering Table */}
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-secondary uppercase tracking-wider">
                      Wholesale Volume Tiering (Tier Rates Auto-Applied)
                    </span>
                    <span className="text-[11px] text-tertiary font-bold">Free Tipper Freight</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {product.volumeTiers?.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border-2 flex flex-col gap-1 transition-all ${
                          (idx === 0 && orderQty < 50) || (idx === 1 && orderQty >= 50 && orderQty < 200) || (idx === 2 && orderQty >= 200)
                            ? 'border-primary-container bg-primary-container/5 shadow-xs'
                            : 'border-border-subtle bg-white'
                        }`}
                      >
                        <span className="text-[11px] font-bold text-secondary uppercase">{tier.label}</span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-[16px] font-bold text-on-surface font-price-card">₹{tier.price}</span>
                          <span className="text-[11px] text-secondary">/ {product.unit.split(' ')[0]}</span>
                        </div>
                        <span className="text-[11px] text-primary-container font-semibold">{tier.range}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector & Action CTAs */}
                <div className="flex flex-col gap-4 pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-bold text-on-surface">Quantity Required:</span>
                    <div className="flex items-center bg-white border border-border-subtle rounded-lg shadow-xs overflow-hidden">
                      <button
                        onClick={() => setOrderQty(Math.max(1, orderQty - 5))}
                        className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <input
                        type="number"
                        value={orderQty}
                        onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 h-10 text-center text-[15px] font-bold text-on-surface bg-transparent focus:outline-none appearance-none"
                      />
                      <button
                        onClick={() => setOrderQty(orderQty + 5)}
                        className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>

                    <div className="flex items-baseline gap-1 text-[13px] text-secondary">
                      <span>Total:</span>
                      <strong className="text-on-surface text-[16px]">
                        ₹{(currentTierPrice * orderQty).toLocaleString()}
                      </strong>
                      <span>({(orderQty * (product.weightKg || 50) / 1000).toFixed(2)} MT)</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="w-full sm:flex-1 h-12 rounded-xl bg-primary-container hover:bg-safety-orange-hover text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                      Add to Site Cart
                    </button>

                    <button
                      onClick={handleInstantBuy}
                      className="w-full sm:flex-1 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">bolt</span>
                      Buy Now (Instant Dispatch)
                    </button>

                    <button
                      onClick={() => addToWishlist(product)}
                      className="w-full sm:w-auto h-12 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">format_list_bulleted_add</span>
                      Add to BOQ
                    </button>
                  </div>
                </div>

                {/* Delivery Confidence Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border-subtle text-[12px] text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                    <span>60-Min Express Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">precision_manufacturing</span>
                    <span>Crane Offloading Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                    <span>Direct Mill Invoice</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications & TDS Table */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border-subtle flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-border-subtle pb-3">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`font-bold text-[14px] pb-1 cursor-pointer transition-colors ${
                      activeTab === 'specs'
                        ? 'text-primary-container border-b-2 border-primary-container'
                        : 'text-secondary hover:text-on-surface'
                    }`}
                  >
                    Engineering Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('mix')}
                    className={`font-bold text-[14px] pb-1 cursor-pointer transition-colors ${
                      activeTab === 'mix'
                        ? 'text-primary-container border-b-2 border-primary-container'
                        : 'text-secondary hover:text-on-surface'
                    }`}
                  >
                    Jobsite Mix Compatibility
                  </button>
                </div>

                {activeTab === 'specs' && (
                  <div className="divide-y divide-border-subtle text-[13px]">
                    {product.specifications?.map((spec, idx) => (
                      <div key={idx} className="py-2.5 flex justify-between gap-4">
                        <span className="text-secondary font-medium">{spec.key}</span>
                        <span className="text-on-surface font-semibold text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'mix' && (
                  <div className="flex flex-col gap-3 text-[13px]">
                    <p className="text-secondary">
                      Recommended casting ratios for structural columns, footings, and slabs:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-surface-container-low border border-border-subtle">
                        <strong className="text-on-surface block font-bold">M20 Grade Mix (1 : 1.5 : 3)</strong>
                        <span className="text-[12px] text-secondary">General RCC Slabs, Beams, Staircases</span>
                      </div>
                      <div className="p-3 rounded-lg bg-surface-container-low border border-border-subtle">
                        <strong className="text-on-surface block font-bold">M25 Grade Mix (1 : 1 : 2)</strong>
                        <span className="text-[12px] text-secondary">Heavy Load Columns &amp; Raft Foundations</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
