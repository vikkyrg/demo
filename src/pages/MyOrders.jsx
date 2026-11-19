import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';

export default function MyOrders() {
  const { id } = useParams();
  const { orders, getOrderById } = useOrders();
  const { addToCart } = useCart();

  const selectedOrder = id ? getOrderById(id) : orders[0];
  const [activeTab, setActiveTab] = useState('live'); // 'live', 'history'

  const handleReorder = (item) => {
    addToCart(item, item.quantity || 1);
  };

  return (
    <main className="w-full pt-32 bg-surface-canvas min-h-screen pb-20">
      <div className="flex flex-col w-full">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-6 w-full flex flex-col gap-6">
          {/* Top Breadcrumb & Status */}
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 text-[13px] text-secondary">
              <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
                <span className="material-symbols-outlined text-[16px]">home</span> Home
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-semibold">Jobsite Orders &amp; Live Tracking</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-bold text-on-surface tracking-tight font-headline-lg">
                  My Jobsite Orders &amp; Dispatches
                </h1>
                <p className="text-[14px] text-secondary">
                  Live Consignment Telemetry • Bengaluru Central Stockyard
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/products"
                  className="bg-primary-container hover:bg-safety-orange-hover text-white text-[13px] font-bold px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  New Site Requisition
                </Link>
              </div>
            </div>
          </div>

          {/* Active Order Telemetry Card */}
          {selectedOrder && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col gap-6 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[28px]">local_shipping</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[18px] font-bold">Order #{selectedOrder.orderId}</span>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                        Live Tracking Active
                      </span>
                    </div>
                    <span className="text-[12px] text-slate-400 mt-0.5 block">
                      Placed on {selectedOrder.date} • {selectedOrder.stagingYard}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Estimated Site Arrival</span>
                    <span className="text-[20px] font-bold text-primary-fixed">~28 Mins Remaining</span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col gap-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Step 1 (11:15 AM)
                  </span>
                  <span className="text-[13px] font-bold text-white">Stock Allocation</span>
                  <span className="text-[11px] text-slate-400">NABL Tested Batch Verified</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col gap-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Step 2 (11:32 AM)
                  </span>
                  <span className="text-[13px] font-bold text-white">Hydraulic Crane Loading</span>
                  <span className="text-[11px] text-slate-400">Boom crane secured on vehicle</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/60 border-2 border-emerald-500 flex flex-col gap-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Step 3 (Live Now)
                  </span>
                  <span className="text-[13px] font-bold text-emerald-200">En Route on Expressway</span>
                  <span className="text-[11px] text-emerald-300">Passing Electronic City Toll</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col gap-1 opacity-50">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Step 4 (Pending)
                  </span>
                  <span className="text-[13px] font-bold text-white">Site Offloading</span>
                  <span className="text-[11px] text-slate-400">Engineer OTP Verification</span>
                </div>
              </div>

              {/* Carrier & Vehicle Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-fixed text-[24px]">pin_drop</span>
                  <div className="text-[13px]">
                    <span className="text-white font-bold block">
                      Vehicle: {selectedOrder.vehicleNumber || 'KA-04-E-8821'} (Tata 1618 Hydraulic Crane)
                    </span>
                    <span className="text-slate-400">
                      Driver: {selectedOrder.driverName || 'Manjunath Gowda'} ({selectedOrder.driverPhone || '+91 98452 77112'})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedOrder.driverPhone || '+919845277112'}`}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[12px] rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    Call Driver
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Order Manifest Breakdown & Items Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Manifest Line Items */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                <div className="p-4 bg-surface-container-low/50 border-b border-border-subtle flex items-center justify-between">
                  <h3 className="text-[14px] font-bold text-on-surface uppercase tracking-wider">
                    Manifest Breakdown ({selectedOrder?.items?.length || 0} Line Items)
                  </h3>
                  <span className="text-[11px] text-secondary">
                    Total Gross Weight: ~3.05 Metric Tonnes
                  </span>
                </div>

                <div className="divide-y divide-border-subtle">
                  {selectedOrder?.items?.map((item, idx) => (
                    <div key={idx} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center shrink-0 border border-border-subtle">
                          <span className="material-symbols-outlined text-secondary text-[28px]">inventory_2</span>
                        </div>
                        <div>
                          <h4 className="text-[14px] font-bold text-on-surface">{item.name}</h4>
                          <span className="text-[12px] text-secondary">{item.sku || 'IS Standard Batch'}</span>
                          <span className="text-[11px] text-secondary block mt-0.5">
                            Staging Location: {item.stagingYard || 'Tower 4 Core Staging'}
                          </span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                        <div className="text-right">
                          <span className="text-[16px] font-bold text-on-surface font-price-card block">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-[12px] text-secondary">
                            {item.quantity} {item.unit || 'Units'} @ ₹{item.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleReorder(item)}
                          className="mt-2 text-[12px] text-primary-container font-bold hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">refresh</span>
                          Reorder Item
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Order Commercial Details & Invoicing */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-border-subtle p-5 flex flex-col gap-4">
                <span className="text-[14px] font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-border-subtle">
                  Consignment Commercials
                </span>

                <div className="flex flex-col gap-2.5 text-[13px]">
                  <div className="flex justify-between text-secondary">
                    <span>Tax Invoice Number</span>
                    <span className="font-mono font-bold text-on-surface">INV-2026-84920</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>GSTIN</span>
                    <span className="font-mono text-on-surface">{selectedOrder?.gstin || '29AABCB1234F1Z8'}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Payment Terms</span>
                    <span className="font-semibold text-on-surface">{selectedOrder?.paymentMethod || '30-Day B2B Trade Credit'}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Unloading Method</span>
                    <span className="font-semibold text-emerald-700">{selectedOrder?.unloadingMethod || 'Hydraulic Crane Offloading'}</span>
                  </div>

                  <div className="pt-3 border-t border-border-subtle flex items-baseline justify-between">
                    <span className="text-[14px] font-bold text-on-surface">Total Order Value</span>
                    <span className="text-[22px] font-bold text-on-surface font-price-hero">
                      ₹{(selectedOrder?.grandTotal || 114632).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Downloading Delivery Challan & e-Way Bill for #${selectedOrder?.orderId}...`)}
                  className="w-full h-11 bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-[13px] rounded-lg border border-border-subtle flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">description</span>
                  Download Site Delivery Challan
                </button>
              </div>

              {/* All Orders History Switcher */}
              <div className="bg-white rounded-xl shadow-sm border border-border-subtle p-5 flex flex-col gap-3">
                <span className="text-[13px] font-bold text-on-surface uppercase tracking-wider">
                  Recent Consignment Orders
                </span>
                <div className="flex flex-col gap-2">
                  {orders.map((o) => (
                    <Link
                      key={o.orderId}
                      to={`/orders/${o.orderId}`}
                      className={`p-3 rounded-lg border transition-all flex items-center justify-between text-[12px] ${
                        o.orderId === selectedOrder?.orderId
                          ? 'border-primary-container bg-primary-container/5 font-bold'
                          : 'border-border-subtle hover:bg-surface-container-low'
                      }`}
                    >
                      <div>
                        <span className="text-on-surface block font-mono">#{o.orderId}</span>
                        <span className="text-secondary font-normal">{o.date}</span>
                      </div>
                      <span className="text-on-surface font-semibold font-price-card">
                        ₹{(o.grandTotal || 0).toLocaleString()}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
