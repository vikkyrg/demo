import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`;

export default function Checkout() {
  const { cartItems, subtotal, discountAmount, couponDiscount, deliveryCharge, grandTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateAddress = (event) => {
    setDeliveryAddress((address) => ({ ...address, [event.target.name]: event.target.value }));
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const order = placeOrder({
        items: cartItems,
        deliveryAddress,
        paymentMethod: 'Cash on Delivery',
        subtotal,
        discount: discountAmount + couponDiscount,
        deliveryCharge,
        totalAmount: grandTotal,
      });
      clearCart();
      navigate(`/order-success/${order.orderId}`);
    } catch (orderError) {
      setError(orderError.message || 'We could not place your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-surface-canvas px-4 pb-20 pt-4 md:pt-32">
        <section className="mx-auto max-w-2xl rounded-2xl border border-border-subtle bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-on-surface">Your cart is empty</h1>
          <p className="mt-2 text-secondary">Add products before continuing to checkout.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-xl bg-primary-container px-5 py-3 font-semibold text-white">Browse products</Link>
        </section>
      </main>
    );
  }

  const fields = [
    { name: 'fullName', label: 'Full name', autoComplete: 'name' },
    { name: 'mobileNumber', label: 'Mobile number', autoComplete: 'tel', inputMode: 'numeric', pattern: '[6-9][0-9]{9}', maxLength: 10, placeholder: '10-digit mobile number' },
    { name: 'address', label: 'Address', autoComplete: 'street-address', wide: true },
    { name: 'city', label: 'City', autoComplete: 'address-level2' },
    { name: 'state', label: 'State', autoComplete: 'address-level1' },
    { name: 'pincode', label: 'Pincode', autoComplete: 'postal-code', inputMode: 'numeric', pattern: '[0-9]{6}', maxLength: 6 },
  ];

  return (
    <main className="min-h-screen bg-surface-canvas px-4 pb-20 pt-4 md:pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-primary-container">BuildMart / Checkout</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-on-surface">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-border-subtle bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-on-surface">Delivery address</h2>
              <p className="mt-1 text-sm text-secondary">Where should we deliver your order?</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.name} className={`block ${field.wide ? 'sm:col-span-2' : ''}`}>
                    <span className="mb-1.5 block text-sm font-semibold text-on-surface">{field.label}</span>
                    {field.name === 'address' ? (
                      <textarea
                        name={field.name}
                        autoComplete={field.autoComplete}
                        value={deliveryAddress[field.name]}
                        onChange={updateAddress}
                        required
                        rows={3}
                        className="w-full rounded-xl border border-border-subtle bg-white px-3.5 py-3 text-sm outline-none transition focus:border-primary-container focus:ring-2 focus:ring-primary-container/15"
                      />
                    ) : (
                      <input
                        type="text"
                        name={field.name}
                        autoComplete={field.autoComplete}
                        inputMode={field.inputMode}
                        pattern={field.pattern}
                        maxLength={field.maxLength}
                        placeholder={field.placeholder}
                        value={deliveryAddress[field.name]}
                        onChange={updateAddress}
                        required
                        className="w-full rounded-xl border border-border-subtle bg-white px-3.5 py-3 text-sm outline-none transition focus:border-primary-container focus:ring-2 focus:ring-primary-container/15"
                      />
                    )}
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border-subtle bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-on-surface">Payment method</h2>
              <div className="mt-4 flex items-center gap-3 rounded-xl border-2 border-primary-container bg-orange-50/40 p-4">
                <input type="radio" name="payment" checked readOnly className="accent-orange-700" />
                <div>
                  <p className="font-semibold text-on-surface">Cash on Delivery</p>
                  <p className="text-sm text-secondary">Pay when your construction materials arrive.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-border-subtle bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="text-lg font-bold text-on-surface">Order summary</h2>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-on-surface">{item.name}</p>
                    <p className="text-secondary">Qty {item.quantity}</p>
                  </div>
                  <span className="shrink-0 font-semibold">{money(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3 border-t border-border-subtle pt-4 text-sm">
              <div className="flex justify-between text-secondary"><span>Subtotal</span><span className="text-on-surface">{money(subtotal)}</span></div>
              {(discountAmount + couponDiscount) > 0 && <div className="flex justify-between text-emerald-700"><span>You save</span><span>-{money(discountAmount + couponDiscount)}</span></div>}
              <div className="flex justify-between text-secondary"><span>Delivery</span><span className="text-emerald-700">Free</span></div>
              <div className="flex justify-between border-t border-border-subtle pt-4 text-base font-bold text-on-surface"><span>Total</span><span>{money(grandTotal)}</span></div>
            </div>
            {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded-xl bg-primary-container px-5 py-3.5 font-bold text-white transition-colors hover:bg-safety-orange-hover disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? 'Placing order…' : 'Place Order'}
            </button>
            <Link to="/cart" className="mt-3 block text-center text-sm font-semibold text-secondary hover:text-primary-container">Return to cart</Link>
          </aside>
        </form>
      </div>
    </main>
  );
}
