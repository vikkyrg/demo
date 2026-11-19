import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getAvailableStock } from '../data/inventory';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`;

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const product = products.find((item) => item.id === id);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedIndex(0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <main className="min-h-screen bg-surface-canvas px-4 pb-20 pt-4 md:pt-32">
        <section className="mx-auto max-w-2xl rounded-2xl border border-border-subtle bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-on-surface">Product not found</h1>
          <p className="mt-2 text-secondary">This product may no longer be available.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-xl bg-primary-container px-5 py-3 font-semibold text-white">Browse products</Link>
        </section>
      </main>
    );
  }

  const media = product.media?.length
    ? product.media
    : [{ type: 'image', src: product.image, title: product.name }];
  const currentMedia = media[selectedIndex] || media[0];
  const stock = getAvailableStock(product);
  const wishlisted = isInWishlist(product.id);
  const discountPercent = product.mrp > product.price
    ? Math.round((product.mrp - product.price) / product.mrp * 100)
    : 0;
  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .concat(products.filter((item) => item.id !== product.id && item.category !== product.category))
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-surface-canvas pb-20 pt-4 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <nav className="mb-6 flex items-center gap-2 text-sm text-secondary">
          <Link to="/" className="hover:text-primary-container">Home</Link><span>/</span>
          <Link to="/products" className="hover:text-primary-container">Products</Link><span>/</span>
          <span className="truncate text-on-surface">{product.name}</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="min-w-0">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border-subtle bg-white p-6 shadow-sm sm:aspect-[4/3]">
              {currentMedia.type === 'video' ? (
                <video
                  key={currentMedia.src}
                  src={currentMedia.src}
                  poster={currentMedia.poster}
                  controls
                  playsInline
                  preload="none"
                  className="h-full w-full rounded-xl object-contain"
                  aria-label={currentMedia.title || `${product.name} demonstration video`}
                />
              ) : (
                <img
                  src={currentMedia.src}
                  alt={currentMedia.title || product.name}
                  fetchPriority="high"
                  className="h-full w-full object-contain"
                />
              )}
              {discountPercent > 0 && <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">{discountPercent}% OFF</span>}
            </div>
            {media.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                {media.map((item, index) => (
                  <button
                    key={`${item.type}-${item.src}`}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Show ${item.type === 'video' ? 'video' : 'image'} ${index + 1}`}
                    aria-pressed={selectedIndex === index}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 ${selectedIndex === index ? 'border-primary-container' : 'border-border-subtle'}`}
                  >
                    {item.type === 'video'
                      ? <img src={item.poster} alt="" loading="lazy" className="h-full w-full object-cover" />
                      : <img src={item.src} alt="" loading="lazy" className="h-full w-full object-contain" />}
                    {item.type === 'video' && <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-xs font-bold text-white">VIDEO</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">{product.brand} <span className="mx-1 text-slate-300">·</span> {product.category}</p>
            <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-on-surface sm:text-3xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 font-bold text-amber-800"><Star size={15} fill="currentColor" /> {product.rating}</span>
              <span className="text-secondary">{product.reviewsCount} customer reviews</span>
              <span className={`font-semibold ${stock > 0 ? 'text-emerald-700' : 'text-red-600'}`}>{stock > 0 ? `${stock.toLocaleString()} in stock` : 'Out of stock'}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3 border-y border-border-subtle py-5">
              <span className="text-3xl font-extrabold text-on-surface">{money(product.price)}</span>
              {product.mrp > product.price && <span className="text-base text-secondary line-through">{money(product.mrp)}</span>}
              <span className="text-sm text-secondary">/ {product.unit}</span>
              {discountPercent > 0 && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">Save {discountPercent}%</span>}
            </div>

            <p className="mt-5 leading-7 text-secondary">{product.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="font-semibold text-on-surface">Quantity</span>
              <div className="flex items-center rounded-lg border border-border-subtle">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="p-2.5 text-secondary hover:text-on-surface"><Minus size={16} /></button>
                <span className="min-w-10 text-center font-semibold">{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(stock, value + 1))} disabled={quantity >= stock} className="p-2.5 text-secondary hover:text-on-surface disabled:opacity-40"><Plus size={16} /></button>
              </div>
              <span className="text-sm text-secondary">Total: <strong className="text-on-surface">{money(product.price * quantity)}</strong></span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => addToCart(product, quantity)} disabled={stock < 1} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-container px-5 py-3.5 font-bold text-white transition-colors hover:bg-safety-orange-hover disabled:cursor-not-allowed disabled:opacity-50">
                <ShoppingCart size={19} /> Add to Cart
              </button>
              <button type="button" onClick={() => toggleWishlist(product)} aria-pressed={wishlisted} className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 font-semibold transition-colors ${wishlisted ? 'border-red-200 bg-red-50 text-red-600' : 'border-border-subtle text-on-surface hover:bg-slate-50'}`}>
                <Heart size={19} fill={wishlisted ? 'currentColor' : 'none'} /> {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-on-surface">Delivery information</p>
              <p className="mt-1 text-secondary">Free standard delivery on this order. Estimated delivery in 3–5 business days.</p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-border-subtle bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-on-surface">Specifications</h2>
          <dl className="mt-4 divide-y divide-border-subtle">
            {product.specifications?.map((spec) => (
              <div key={spec.key} className="flex flex-col justify-between gap-1 py-3 text-sm sm:flex-row">
                <dt className="text-secondary">{spec.key}</dt><dd className="font-semibold text-on-surface sm:text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 text-2xl font-bold text-on-surface">Related products</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
