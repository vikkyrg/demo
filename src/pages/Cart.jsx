import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`;

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, discountAmount, couponDiscount, grandTotal } = useCart();

  return (
    <main className="min-h-screen bg-surface-canvas px-4 pb-20 pt-4 md:pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary-container">BuildMart / Cart</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-on-surface">Your shopping cart</h1>
          <p className="mt-1 text-secondary">{cartItems.length} {cartItems.length === 1 ? 'product' : 'products'} in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <section className="rounded-2xl border border-border-subtle bg-white px-6 py-16 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />
            <h2 className="mt-4 text-xl font-bold text-on-surface">Your cart is empty</h2>
            <p className="mt-2 text-secondary">Browse construction materials and add what you need.</p>
            <Link to="/products" className="mt-6 inline-flex rounded-xl bg-primary-container px-5 py-3 font-semibold text-white hover:bg-safety-orange-hover">
              Continue shopping
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <section className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm">
              {cartItems.map((item) => (
                <article key={item.id} className="flex flex-col gap-4 border-b border-border-subtle p-5 last:border-0 sm:flex-row sm:items-center">
                  <Link to={`/products/${item.id}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{item.brand}</p>
                    <Link to={`/products/${item.id}`} className="mt-1 block font-bold text-on-surface hover:text-primary-container">{item.name}</Link>
                    <p className="mt-1 text-sm text-secondary">{money(item.price)} / {item.unit || 'unit'}</p>
                    {item.mrp > item.price && (
                      <p className="mt-1 text-xs font-medium text-emerald-700">You save {money((item.mrp - item.price) * item.quantity)}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="flex items-center rounded-lg border border-border-subtle">
                      <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-secondary hover:text-on-surface">
                        <Minus size={16} />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-secondary hover:text-on-surface">
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <strong>{money(item.price * item.quantity)}</strong>
                      <button type="button" aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-2xl border border-border-subtle bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-lg font-bold text-on-surface">Order summary</h2>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-secondary"><span>Subtotal</span><span className="font-medium text-on-surface">{money(subtotal)}</span></div>
                {discountAmount + couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700"><span>Discount</span><span>-{money(discountAmount + couponDiscount)}</span></div>
                )}
                <div className="flex justify-between text-secondary"><span>Delivery</span><span className="font-medium text-emerald-700">Free</span></div>
                <div className="flex justify-between border-t border-border-subtle pt-4 text-base font-bold text-on-surface"><span>Total</span><span>{money(grandTotal)}</span></div>
              </div>
              <Link to="/checkout" className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary-container px-5 py-3.5 font-bold text-white transition-colors hover:bg-safety-orange-hover">
                Proceed to checkout
              </Link>
              <Link to="/products" className="mt-3 block text-center text-sm font-semibold text-secondary hover:text-primary-container">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
