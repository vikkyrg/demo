import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

export default function OrderSuccess() {
  const { currentOrder, orders } = useOrders();
  const order = currentOrder || orders[0];

  return (
    <main className="w-full pt-32 bg-surface-canvas min-h-screen pb-20">
      <div className="flex flex-col w-full">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-6 w-full flex flex-col gap-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[13px] text-secondary">
            <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
              <span className="material-symbols-outlined text-[16px]">home</span> Home
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold">Order Dispatch Confirmation</span>
          </nav>

          {/* Success Banner Hero */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[32px]">check_circle</span>
              </div>
              <div className="flex flex-col">
                <span className="text-emerald-300 text-[11px] font-bold uppercase tracking-widest">
                  Consignment Verified &amp; Dispatched
                </span>
                <h1 className="text-[24px] sm:text-[32px] font-bold tracking-tight font-headline-lg text-white mt-1">
                  Order Placed Successfully! Site Dispatch Initiated
                </h1>
                <p className="text-[14px] text-emerald-100 mt-1 max-w-xl">
                  Order <strong>#{order?.orderId || 'BM-BLR-84920'}</strong> has been registered with Sarjapur Central Depot. Hydraulic Crane vehicle has been assigned.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-end gap-3 w-full sm:w-auto shrink-0">
              <Link
                to={`/orders/${order?.orderId || 'BM-BLR-84920'}`}
                className="w-full sm:w-auto px-6 py-3 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl font-bold text-[13px] shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                Track Consignment GPS
              </Link>
            </div>
          </div>

          {/* Telemetry Progress Bar Strip */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border-subtle flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border-subtle">
              <div>
                <h2 className="text-[16px] font-bold text-on-surface">High-Velocity Dispatch Telemetry</h2>
                <p className="text-[12px] text-secondary">Real-time status updates synced with Karnataka Logistics Depot</p>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>ETA: 28 Minutes to Site</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <span className="material-symbols-outlined text-emerald-700 text-[22px]">verified</span>
                <div>
                  <span className="text-[13px] font-bold text-emerald-900 block">1. Verified &amp; Allocated</span>
                  <span className="text-[11px] text-emerald-700">Lab Batch QA Passed</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <span className="material-symbols-outlined text-emerald-700 text-[22px]">precision_manufacturing</span>
                <div>
                  <span className="text-[13px] font-bold text-emerald-900 block">2. Crane Loaded</span>
                  <span className="text-[11px] text-emerald-700">Payload: 3.05 Metric Tonnes</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-100/80 border-2 border-emerald-600">
                <span className="material-symbols-outlined text-emerald-800 text-[22px] animate-bounce">local_shipping</span>
                <div>
                  <span className="text-[13px] font-bold text-emerald-950 block">3. En Route to Site</span>
                  <span className="text-[11px] text-emerald-800 font-semibold">Speed: 42 km/h • Outer Ring Rd</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low/50 border border-border-subtle opacity-60">
                <span className="material-symbols-outlined text-secondary text-[22px]">flag</span>
                <div>
                  <span className="text-[13px] font-bold text-on-surface block">4. Jobsite Staged</span>
                  <span className="text-[11px] text-secondary">Awaiting Engineer Sign-off</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details 2-Column: Driver/Vehicle + Staging Manifest */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Consignment Info & Manifest */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Assigned Vehicle & Driver Card */}
              <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[26px]">drive_eta</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed">
                      Dedicated Site Carrier
                    </span>
                    <h3 className="text-[16px] font-bold text-white">
                      {order?.vehicleNumber || 'KA-04-E-8821'} (Tata 1618 Hydraulic Crane Tipper)
                    </h3>
                    <p className="text-[12px] text-slate-300">
                      Driver: <strong>{order?.driverName || 'Manjunath Gowda'}</strong> • Contact: {order?.driverPhone || '+91 98452 77112'}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${order?.driverPhone || '+919845277112'}`}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  Direct Site Call
                </a>
              </div>

              {/* Staging Yard & Receiving Officer Details */}
              <div className="bg-white rounded-xl shadow-sm border border-border-subtle p-6 flex flex-col gap-4">
                <h3 className="text-[15px] font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-border-subtle">
                  Site Receiving &amp; Delivery Logistics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                      Target Staging Yard
                    </span>
                    <span className="font-semibold text-on-surface mt-0.5 block">
                      {order?.stagingYard || 'Prestige Falcon City Phase 2 - Tower 4 Staging Yard'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                      Designated Site Receiver
                    </span>
                    <span className="font-semibold text-on-surface mt-0.5 block">
                      {order?.siteEngineer || 'Rajesh Kumar (Chief Site Engineer)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                      Offloading Logistics Protocol
                    </span>
                    <span className="font-semibold text-emerald-700 mt-0.5 block">
                      {order?.unloadingMethod || 'Hydraulic Crane Offloading'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                      B2B Settlement Status
                    </span>
                    <span className="font-semibold text-on-surface mt-0.5 block">
                      {order?.paymentMethod || '30-Day B2B Trade Credit (Authorized)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Manifest Table */}
              <div className="bg-white rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                <div className="p-4 bg-surface-container-low/50 border-b border-border-subtle flex items-center justify-between">
                  <span className="text-[13px] font-bold text-on-surface uppercase tracking-wider">
                    Consignment Manifest Line Items
                  </span>
                  <span className="text-[11px] text-secondary font-medium">
                    Batch Code: TC-2026-NABL-09
                  </span>
                </div>

                <div className="divide-y divide-border-subtle">
                  {order?.items?.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[14px] font-bold text-on-surface block">{item.name}</span>
                        <span className="text-[12px] text-secondary">
                          {item.sku || 'SKU: BM-GEN'} • {item.stagingYard || 'Tower 4 Staging'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[14px] font-bold text-on-surface font-price-card block">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-[11px] text-secondary">
                          {item.quantity} {item.unit || 'Units'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Invoice Card & Action Buttons */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-border-subtle p-5 flex flex-col gap-4">
                <span className="text-[14px] font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-border-subtle">
                  Commercial Tax Invoice
                </span>

                <div className="flex flex-col gap-2 text-[13px]">
                  <div className="flex justify-between text-secondary">
                    <span>Tax Invoice Number</span>
                    <span className="font-mono font-bold text-on-surface">INV-2026-84920</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Buyer GSTIN</span>
                    <span className="font-mono text-on-surface">{order?.gstin || '29AABCB1234F1Z8'}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>e-Way Bill State Code</span>
                    <span className="text-on-surface">KA-29-ACTIVE</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Taxable Value</span>
                    <span className="font-semibold text-on-surface">₹{(order?.totalAmount || 99460).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>CGST + SGST (18%)</span>
                    <span className="font-semibold text-on-surface">₹{(order?.gstAmount || 15172).toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-border-subtle flex items-baseline justify-between">
                    <span className="text-[14px] font-bold text-on-surface">Invoice Total</span>
                    <span className="text-[20px] font-bold text-on-surface font-price-hero">
                      ₹{(order?.grandTotal || 114632).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Downloading GST e-Invoice for Order #${order?.orderId}...`)}
                  className="w-full h-11 bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-[13px] rounded-lg border border-border-subtle flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Download B2B Tax Invoice (PDF)
                </button>
              </div>

              {/* Navigation Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/orders"
                  className="w-full h-12 bg-primary-container hover:bg-safety-orange-hover text-white font-bold text-[14px] rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  View My Orders &amp; Live Tracking
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>

                <Link
                  to="/products"
                  className="w-full h-11 bg-white hover:bg-surface-container text-on-surface font-semibold text-[13px] rounded-lg border border-border-subtle flex items-center justify-center gap-2 transition-colors"
                >
                  Continue Procuring Materials
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
