import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { getAvailableStock } from '../data/inventory';

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const categories = ['All', ...new Set(products.map((product) => product.category))];
  const brands = ['All', ...new Set(products.map((product) => product.brand))];

  const filteredProducts = useMemo(() => products
    .filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) return false;
      if (inStockOnly && getAvailableStock(product) < 1) return false;
      const searchTerm = searchFilter.trim().toLowerCase();
      if (searchTerm && !`${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(searchTerm)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    }), [selectedCategory, selectedBrand, inStockOnly, searchFilter, sortBy]);

  return (
    <main className="min-h-screen bg-surface-canvas pb-20 pt-4 md:pt-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <nav className="mb-5 flex items-center gap-2 text-sm text-secondary"><Link to="/" className="hover:text-primary-container">Home</Link><span>/</span><span className="font-semibold text-on-surface">Products</span></nav>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-container">BuildMart catalog</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-on-surface">Construction materials</h1>
            <p className="mt-2 text-secondary">Browse products from trusted construction brands.</p>
          </div>
          <span className="text-sm text-secondary">{filteredProducts.length} products</span>
        </div>

        <section className="mt-7 rounded-2xl border border-border-subtle bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_200px_200px_auto]">
            <label>
              <span className="sr-only">Search products</span>
              <input value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} placeholder="Search products, brands, categories" className="h-11 w-full rounded-xl border border-border-subtle px-3.5 text-sm outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/15" />
            </label>
            <label>
              <span className="sr-only">Filter by category</span>
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-sm text-on-surface">
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">Filter by brand</span>
              <select value={selectedBrand} onChange={(event) => setSelectedBrand(event.target.value)} className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-sm text-on-surface">
                {brands.map((brand) => <option key={brand}>{brand}</option>)}
              </select>
            </label>
            <label className="flex h-11 items-center gap-2 whitespace-nowrap px-1 text-sm font-medium text-secondary">
              <input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} className="accent-orange-700" />
              In stock
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
            <p className="text-sm text-secondary">Showing {filteredProducts.length} products</p>
            <label className="flex items-center gap-2 text-sm text-secondary">
              Sort by
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-lg border border-border-subtle bg-white px-3 py-2 text-on-surface">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          </div>
        </section>

        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <section className="mt-6 rounded-2xl border border-border-subtle bg-white p-12 text-center">
            <h2 className="text-lg font-bold text-on-surface">No products found</h2>
            <p className="mt-2 text-sm text-secondary">Try another search or adjust your filters.</p>
            <button type="button" onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setInStockOnly(false); setSearchFilter(''); }} className="mt-4 font-semibold text-primary-container hover:underline">Clear filters</button>
          </section>
        )}
      </div>
    </main>
  );
}
