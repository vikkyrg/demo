import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`;

export default function MyOrders() {
  const { id } = useParams();
  const { orders, getOrderById } = useOrders();
  const order = id ? getOrderById(id) : null;

  if (id && !order) {
    return (
      <main className="min-h-screen bg-surface-canvas px-4 pb-20 pt-4 md:pt-32">
        <section className="mx-auto max-w-2xl rounded-2xl border border-border-subtle bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-on-surface">Order not found</h1>
          <Link to="/my-orders" className="mt-5 inline-flex font-semibold text-primary-container">Back to my orders</Link>
        </section>
      </main>
    );
  }

  if (order) {
    const address = order.deliveryAddress;
    return (
      <main className="min-h-screen bg-surface-canvas px-4 pb-20 pt-4 md:pt-32 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <Link to="/my-orders" className="text-sm font-semibold text-primary-container hover:underline">← Back to my orders</Link>
          <div className="mt-4 rounded-2xl border border-border-subtle bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-3 border-b border-border-subtle pb-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-secondary">Order placed {new Date(order.createdAt).toLocaleString()}</p>
                <h1 className="mt-1 text-2xl font-bold text-on-surface">Order {order.orderId}</h1>
              </div>
              <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{order.orderStatus}</span>
            </div>
            <div className="divide-y divide-border-subtle">
              {order.products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 py-4">
                  <img src={product.image} alt="" className="h-16 w-16 rounded-lg bg-slate-50 object-contain p-1" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-on-surface">{product.name}</p>
                    <p className="text-sm text-secondary">Qty {product.quantity} · {money(product.price)} each</p>
                  </div>
                  <strong className="shrink-0">{money(product.price * product.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="grid gap-6 border-t border-border-subtle pt-5 sm:grid-cols-2">
              <div>
                <h2 className="font-bold text-on-surface">Delivery address</h2>
                <p className="mt-2 text-sm leading-6 text-secondary">{address.fullName}<br />{address.mobileNumber}<br />{address.address}<br />{address.city}, {address.state} {address.pincode}</p>
              </div>
              <div className="space-y-2 text-sm">
                <h2 className="mb-3 font-bold text-on-surface">Payment & total</h2>
                <p className="flex justify-between text-secondary"><span>Payment method</span><strong className="text-on-surface">{order.paymentMethod}</strong></p>
                <p className="flex justify-between border-t border-border-subtle pt-3 text-base font-bold text-on-surface"><span>Total</span><span>{money(order.totalAmount)}</span></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface-canvas px-4 pb-20 pt-4 md:pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold text-primary-container">BuildMart / My orders</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-on-surface">My orders</h1>
        {orders.length === 0 ? (
          <section className="mt-8 rounded-2xl border border-border-subtle bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-on-surface">No orders yet</h2>
            <p className="mt-2 text-secondary">Your completed purchases will appear here.</p>
            <Link to="/products" className="mt-6 inline-flex rounded-xl bg-primary-container px-5 py-3 font-semibold text-white">Browse products</Link>
          </section>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((orderItem) => (
              <article key={orderItem.orderId} className="rounded-2xl border border-border-subtle bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col justify-between gap-3 border-b border-border-subtle pb-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm text-secondary">Placed {new Date(orderItem.createdAt).toLocaleDateString()}</p>
                    <h2 className="mt-1 font-bold text-on-surface">Order {orderItem.orderId}</h2>
                  </div>
                  <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{orderItem.orderStatus}</span>
                </div>
                <div className="flex flex-col justify-between gap-4 pt-4 sm:flex-row sm:items-center">
                  <div className="flex flex-wrap gap-2 text-sm text-secondary">
                    {orderItem.products.map((product) => <span key={product.id} className="rounded-lg bg-slate-50 px-3 py-2">{product.name} × {product.quantity}</span>)}
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <strong className="text-on-surface">{money(orderItem.totalAmount)}</strong>
                    <Link to={`/my-orders/${orderItem.orderId}`} className="rounded-lg border border-border-subtle px-3 py-2 text-sm font-semibold text-on-surface hover:bg-slate-50">View details</Link>
                  </div>
                </div>
                <p className="mt-3 text-xs text-secondary">Payment: {orderItem.paymentMethod}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
