import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`;

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <main className="min-h-screen bg-surface-canvas px-4 pb-20 pt-4 md:pt-32">
        <section className="mx-auto max-w-2xl rounded-2xl border border-border-subtle bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-on-surface">Order not found</h1>
          <p className="mt-2 text-secondary">This order may have been cleared from this browser.</p>
          <Link to="/my-orders" className="mt-6 inline-flex rounded-xl bg-primary-container px-5 py-3 font-semibold text-white">View my orders</Link>
        </section>
      </main>
    );
  }

  const address = order.deliveryAddress;

  return (
    <main className="min-h-screen bg-surface-canvas px-4 pb-20 pt-4 md:pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-2xl border border-border-subtle bg-white p-6 text-center shadow-sm sm:p-10">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
          <h1 className="mt-4 text-3xl font-bold text-on-surface">Order placed successfully!</h1>
          <p className="mt-2 text-secondary">Thanks for shopping with BuildMart. We’ll prepare your order for delivery.</p>
          <p className="mt-5 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-on-surface">Order ID: {order.orderId}</p>

          <div className="mt-8 grid gap-6 border-t border-border-subtle pt-6 text-left sm:grid-cols-2">
            <div>
              <h2 className="font-bold text-on-surface">Order summary</h2>
              <ul className="mt-3 space-y-3">
                {order.products.map((product) => (
                  <li key={product.id} className="flex justify-between gap-3 text-sm">
                    <span className="text-secondary">{product.name} × {product.quantity}</span>
                    <strong className="shrink-0 text-on-surface">{money(product.price * product.quantity)}</strong>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex justify-between border-t border-border-subtle pt-3 font-bold text-on-surface"><span>Total</span><span>{money(order.totalAmount)}</span></p>
              <p className="mt-2 text-sm text-secondary">{order.paymentMethod} · {order.orderStatus}</p>
            </div>
            <div>
              <h2 className="font-bold text-on-surface">Delivery address</h2>
              <p className="mt-3 text-sm leading-6 text-secondary">
                {address.fullName}<br />
                {address.mobileNumber}<br />
                {address.address}<br />
                {address.city}, {address.state} {address.pincode}
              </p>
              <p className="mt-4 text-sm font-medium text-secondary">Estimated delivery: 3–5 business days</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/products" className="rounded-xl bg-primary-container px-5 py-3 font-bold text-white hover:bg-safety-orange-hover">Continue shopping</Link>
            <Link to="/my-orders" className="rounded-xl border border-border-subtle px-5 py-3 font-bold text-on-surface hover:bg-slate-50">View my orders</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
