import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products';

export default function ProductCatalog() {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Categories list matching Stitch prototype
  const categories = [
    'All',
    'Cement & Aggregates',
    'Steel & TMT Rebar',
    'Paints & Waterproofing',
    'Chemicals & Admixtures',
    'Electrical',
    'Plumbing, Sanitary & Bath'
  ];

  const brands = ['All', 'UltraTech', 'Tata Tiscon', 'Asian Paints', 'Dr. Fixit', 'Sika', 'Finolex', 'Ashirvad'];

  // Filtered products logic
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;
    if (inStockOnly && !p.inStock) return false;
    if (searchFilter && !p.name.toLowerCase().includes(searchFilter.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // popularity / default
  });

  return (
    <main className="w-full pt-32 bg-surface-canvas min-h-screen pb-20">
      <div className="flex flex-col w-full">
        {/* Breadcrumbs & Tactical Sub-header */}
        <div className="bg-surface-container-low py-3 px-4 sm:px-6 lg:px-10 border-b border-border-subtle">
          <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[13px] text-secondary">
              <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
                <span className="material-symbols-outlined text-[16px]">home</span>
                Home
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface font-bold">All Construction Materials</span>
              <span className="text-secondary font-normal">(Showing {filteredProducts.length} Products)</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-tertiary text-[12px] font-semibold bg-white px-3 py-1 rounded-full shadow-xs border border-border-subtle">
                <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                <span>Bengaluru Stockyards Active • 60m Delivery Window Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Catalog Shell: 280px Desktop Sidebar + Dynamic 4-col Grid */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 w-full">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Desktop Filters Sidebar (280px) */}
            <aside className="w-full lg:w-72 shrink-0 bg-white rounded-xl shadow-sm border border-border-subtle p-5 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <h3 className="text-[15px] font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  Jobsite Filters
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedBrand('All');
                    setInStockOnly(false);
                    setSearchFilter('');
                  }}
                  className="text-[12px] text-primary hover:underline font-semibold cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* Keyword Filter */}
              <div>
                <label className="text-[12px] font-bold text-secondary uppercase tracking-wider block mb-1.5">
                  Search Materials
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-2.5 text-secondary text-[18px]">search</span>
                  <input
                    type="text"
                    placeholder="Filter by keyword..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low border border-border-subtle text-[12px] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-secondary uppercase tracking-wider">
                  Material Categories
                </label>
                <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left text-[13px] py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-primary-container text-white font-bold'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      {selectedCategory === cat && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-secondary uppercase tracking-wider">
                  Manufacturer / Brand
                </label>
                <div className="flex flex-col gap-1">
                  {brands.map((b) => (
                    <label key={b} className="flex items-center gap-2 text-[13px] text-on-surface cursor-pointer py-0.5">
                      <input
                        type="radio"
                        name="brandFilter"
                        checked={selectedBrand === b}
                        onChange={() => setSelectedBrand(b)}
                        className="rounded border-border-subtle text-primary-container focus:ring-primary-container"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="pt-2 border-t border-border-subtle">
                <label className="flex items-center gap-2 text-[13px] font-semibold text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-primary-container focus:ring-primary-container"
                  />
                  <span>Ready Stock in Yard Only</span>
                </label>
              </div>

              {/* Testing Certification Badge */}
              <div className="bg-surface-container-low p-3.5 rounded-xl border border-border-subtle flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified</span>
                <div className="text-[11px] text-secondary leading-tight">
                  <strong className="text-on-surface block mb-0.5">NABL Certified Supplies</strong>
                  All consignments delivered with mill test certificates and IS standard lab reports.
                </div>
              </div>
            </aside>

            {/* Right Product Grid Area */}
            <div className="flex-1 flex flex-col gap-6 w-full">
              {/* Top Control Strip (Sorting, Mobile Filter Pills) */}
              <div className="bg-white rounded-xl shadow-sm border border-border-subtle p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[13px] font-bold text-secondary">Active View:</span>
                  <span className="bg-surface-container text-on-surface text-[12px] font-bold px-2.5 py-1 rounded-full">
                    {selectedCategory}
                  </span>
                  {selectedBrand !== 'All' && (
                    <span className="bg-surface-container text-on-surface text-[12px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      {selectedBrand}
                      <button onClick={() => setSelectedBrand('All')} className="text-secondary hover:text-error">×</button>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-[12px] font-bold text-secondary uppercase shrink-0">Sort By:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-9 px-3 rounded-lg bg-surface-container-low border border-border-subtle text-[13px] font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary-container"
                  >
                    <option value="popularity">B2B Best Sellers</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Engineer Rating</option>
                  </select>
                </div>
              </div>

              {/* Product Grid (4 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-border-subtle flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-[48px] text-secondary">inventory_2</span>
                  <h3 className="text-[16px] font-bold text-on-surface">No matching materials found</h3>
                  <p className="text-[13px] text-secondary">Try adjusting your filters or search keywords.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((p) => {
                    const wishlisted = isInWishlist(p.id);
                    return (
                      <div
                        key={p.id}
                        className="bg-white rounded-xl border border-border-subtle shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                      >
                        <div>
                          {/* Image Container with Badges */}
                          <div className="relative aspect-[4/3] bg-surface-container-low flex items-center justify-center p-4 overflow-hidden">
                            <Link to={`/products/${p.id}`} className="w-full h-full flex items-center justify-center">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                            </Link>

                            {/* Badges */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              <span className="bg-tertiary text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                                60m Express
                              </span>
                              {p.badge && (
                                <span className="bg-deal-amber text-slate-900 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                                  {p.badge}
                                </span>
                              )}
                            </div>

                            {/* Wishlist Button */}
                            <button
                              onClick={() => addToWishlist(p)}
                              className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors cursor-pointer ${
                                wishlisted
                                  ? 'bg-deal-amber text-slate-900'
                                  : 'bg-white/90 text-secondary hover:text-primary hover:bg-white'
                              }`}
                              title={wishlisted ? 'Saved in BOQ' : 'Add to BOQ'}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {wishlisted ? 'favorite' : 'bookmark_add'}
                              </span>
                            </button>
                          </div>

                          {/* Card Content */}
                          <div className="p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between text-[11px] text-secondary">
                              <span className="font-semibold">{p.brand}</span>
                              <div className="flex items-center gap-1 text-deal-amber font-bold">
                                <span className="material-symbols-outlined text-[14px]">star</span>
                                <span>{p.rating}</span>
                                <span className="text-secondary font-normal">({p.reviewsCount})</span>
                              </div>
                            </div>

                            <Link to={`/products/${p.id}`} className="hover:text-primary transition-colors">
                              <h4 className="text-[14px] font-bold text-on-surface line-clamp-2 leading-tight">
                                {p.name}
                              </h4>
                            </Link>

                            <span className="text-[11px] text-secondary font-mono">{p.sku}</span>

                            {/* Price */}
                            <div className="pt-2 flex items-baseline gap-2">
                              <span className="text-[18px] font-bold text-on-surface font-price-card">
                                ₹{p.price.toLocaleString()}
                              </span>
                              <span className="text-[12px] text-secondary line-through">
                                ₹{p.mrp.toLocaleString()}
                              </span>
                              <span className="text-[11px] text-secondary">/ {p.unit}</span>
                            </div>

                            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              <span>In Stock • Ready for Site Dispatch</span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Add CTA */}
                        <div className="p-4 pt-0">
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="w-full h-10 rounded-lg bg-primary-container hover:bg-safety-orange-hover text-white font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                            Quick Add to Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
