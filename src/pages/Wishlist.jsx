import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`;

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-surface-canvas px-4 pb-20 pt-4 md:pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-primary-container">BuildMart / Wishlist</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-on-surface">Your wishlist</h1>
        <p className="mt-1 text-secondary">{wishlistItems.length} saved {wishlistItems.length === 1 ? 'product' : 'products'}</p>

        {wishlistItems.length === 0 ? (
          <section className="mt-7 rounded-2xl border border-border-subtle bg-white px-6 py-16 text-center shadow-sm">
            <Heart className="mx-auto h-12 w-12 text-slate-400" />
            <h2 className="mt-4 text-xl font-bold text-on-surface">Your wishlist is empty</h2>
            <p className="mt-2 text-secondary">Save products you like and find them here later.</p>
            <Link to="/products" className="mt-6 inline-flex rounded-xl bg-primary-container px-5 py-3 font-semibold text-white hover:bg-safety-orange-hover">Browse products</Link>
          </section>
        ) : (
          <section className="mt-7 overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm">
            {wishlistItems.map((item) => (
              <article key={item.id} className="flex flex-col gap-4 border-b border-border-subtle p-5 last:border-0 sm:flex-row sm:items-center">
                <Link to={`/products/${item.id}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{item.brand || item.category}</p>
                  <Link to={`/products/${item.id}`} className="mt-1 block font-bold text-on-surface hover:text-primary-container">{item.name}</Link>
                  <p className="mt-1 text-sm font-semibold text-on-surface">{money(item.price)} <span className="font-normal text-secondary">/ {item.unit || 'unit'}</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => addToCart(item)} disabled={item.inStock === false || item.stockCount === 0} className="inline-flex items-center gap-2 rounded-xl bg-primary-container px-4 py-2.5 text-sm font-bold text-white hover:bg-safety-orange-hover disabled:cursor-not-allowed disabled:opacity-50">
                    <ShoppingCart size={17} /> Add to Cart
                  </button>
                  <button type="button" aria-label={`Remove ${item.name} from wishlist`} onClick={() => removeFromWishlist(item.id)} className="rounded-xl border border-border-subtle p-2.5 text-secondary hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
