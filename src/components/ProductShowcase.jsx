import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import ProductCard from './ProductCard';

export default function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="w-full py-12 md:py-16 bg-[#F8FAFC] border-t border-border-subtle" id="featured-products">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
              <span className="text-[12px] font-bold text-primary-container uppercase tracking-wider">
                BuildMart selection
              </span>
            </div>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-on-surface tracking-tight font-headline-lg">
              Featured Products
            </h2>
            <p className="text-[14px] text-secondary mt-1">
              Discover quality construction materials at competitive prices.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-border-subtle'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner Strip */}
        <div className="bg-white rounded-2xl p-6 border border-border-subtle shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]">local_shipping</span>
            </div>
            <div>
            <h4 className="text-[15px] font-bold text-on-surface">Quality materials, delivered to your project.</h4>
            <p className="text-[12px] text-secondary">Browse the catalog and find the right materials for your next build.</p>
            </div>
          </div>
          <Link
            to="/products"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-bold flex items-center gap-2 transition-colors shrink-0"
          >
            <span>View All {products.length} Products</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
