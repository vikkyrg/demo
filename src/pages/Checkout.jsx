import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

export default function Checkout() {
  const { cartItems, grandTotal, subtotal, discountAmount, gstAmount, selectedSlot, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  // Form State
  const [stagingYard, setStagingYard] = useState('Prestige Falcon City Phase 2 - Tower 4 Staging Yard, Kanakapura Main Road');
  const [siteReceiver, setSiteReceiver] = useState('Rajesh Kumar (Chief Site Engineer)');
  const [receiverPhone, setReceiverPhone] = useState('+91 98450 12890');
  const [offloadMethod, setOffloadMethod] = useState('hydraulic-crane');
  const [deliverySlot, setDeliverySlot] = useState(selectedSlot || 'express-60m');
  const [gstin, setGstin] = useState('29AABCB1234F1Z8');
  const [companyName, setCompanyName] = useState('Prestige Construction Infra Ltd');
  const [paymentOption, setPaymentOption] = useState('trade-credit');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder({
        stagingYard,
        siteEngineer: `${siteReceiver} (${receiverPhone})`,
        phone: receiverPhone,
        unloadingMethod: offloadMethod === 'hydraulic-crane' ? 'Hydraulic Crane Offloading' : 'Contractor Labor Unload',
        paymentMethod: paymentOption === 'trade-credit' ? '30-Day B2B Trade Credit' : paymentOption === 'upi' ? 'UPI Instant Site Pay' : 'NEFT / RTGS Bank Transfer',
        gstin,
        items: cartItems,
        totalAmount: subtotal - discountAmount,
        gstAmount,
        grandTotal
      });

      clearCart();
      setIsSubmitting(false);
      navigate('/order-success');
    }, 800);
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
              <Link className="hover:text-primary transition-colors" to="/cart">Cart</Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-semibold">Secure Site Checkout</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-bold text-on-surface tracking-tight font-headline-lg">
                  Jobsite Delivery &amp; Trade Checkout
                </h1>
                <p className="text-[14px] text-secondary">
                  Direct Stockyard Staging • Immediate Dispatch Authorization
                </p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-lg border border-emerald-200 text-[12px] font-bold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>GST Tax Invoicing &amp; Delivery Challan Active</span>
              </div>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Checkout Stages */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Step 1: Jobsite Destination & Access Yard */}
              <section className="bg-white rounded-xl shadow-sm border border-border-subtle p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-[14px]">
                      1
                    </span>
                    <div>
                      <h2 className="text-[16px] font-bold text-on-surface">Jobsite Destination &amp; Access Yard</h2>
                      <p className="text-[12px] text-secondary">Designate crane gate access and primary site engineer</p>
                    </div>
                  </div>
                  <span className="bg-surface-container text-secondary text-[11px] font-bold px-2.5 py-1 rounded">
                    Verified RERA Site
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-[12px] font-bold text-secondary mb-1 uppercase tracking-wider">
                      Designated Staging Yard / Unloading Bay
                    </label>
                    <input
                      type="text"
                      required
                      value={stagingYard}
                      onChange={(e) => setStagingYard(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg bg-surface-container-low border border-border-subtle text-[13px] text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-secondary mb-1 uppercase tracking-wider">
                      Site In-Charge / Receiver Name
                    </label>
                    <input
                      type="text"
                      required
                      value={siteReceiver}
                      onChange={(e) => setSiteReceiver(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg bg-surface-container-low border border-border-subtle text-[13px] text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-secondary mb-1 uppercase tracking-wider">
                      Receiver Mobile (For GPS Driver Coordination)
                    </label>
                    <input
                      type="text"
                      required
                      value={receiverPhone}
                      onChange={(e) => setReceiverPhone(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg bg-surface-container-low border border-border-subtle text-[13px] text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                </div>
              </section>

              {/* Step 2: Offloading Logistics & Dispatch Window */}
              <section className="bg-white rounded-xl shadow-sm border border-border-subtle p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-[14px]">
                      2
                    </span>
                    <div>
                      <h2 className="text-[16px] font-bold text-on-surface">Delivery Velocity &amp; Dispatch Slot</h2>
                      <p className="text-[12px] text-secondary">Select required arrival slot and offloading equipment</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-[12px] font-bold text-secondary uppercase tracking-wider">
                    Select Offloading Method
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      onClick={() => setOffloadMethod('hydraulic-crane')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        offloadMethod === 'hydraulic-crane'
                          ? 'border-primary-container bg-primary-container/5'
                          : 'border-border-subtle hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="offload"
                        checked={offloadMethod === 'hydraulic-crane'}
                        onChange={() => {}}
                        className="mt-1"
                      />
                      <div>
                        <span className="text-[14px] font-bold text-on-surface block">
                          Hydraulic Crane Mounted Tipper
                        </span>
                        <span className="text-[12px] text-secondary mt-0.5 block">
                          Self-unloading boom crane included. Recommended for pallets &amp; rebar bundles.
                        </span>
                        <span className="text-[11px] font-bold text-tertiary mt-2 inline-block">Free On-Site Service</span>
                      </div>
                    </div>

                    <div
                      onClick={() => setOffloadMethod('manual-contractor')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        offloadMethod === 'manual-contractor'
                          ? 'border-primary-container bg-primary-container/5'
                          : 'border-border-subtle hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="offload"
                        checked={offloadMethod === 'manual-contractor'}
                        onChange={() => {}}
                        className="mt-1"
                      />
                      <div>
                        <span className="text-[14px] font-bold text-on-surface block">
                          Contractor Manual Labor
                        </span>
                        <span className="text-[12px] text-secondary mt-0.5 block">
                          Jobsite team handles manual unloading from flatbed within 60 minutes.
                        </span>
                        <span className="text-[11px] font-bold text-tertiary mt-2 inline-block">Standard Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <span className="text-[12px] font-bold text-secondary uppercase tracking-wider">
                    Select Velocity Slot
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['express-60m', 'today-evening', 'tomorrow-first-pour'].map((slotKey) => (
                      <div
                        key={slotKey}
                        onClick={() => setDeliverySlot(slotKey)}
                        className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                          deliverySlot === slotKey
                            ? 'border-primary-container bg-primary-container/5'
                            : 'border-border-subtle hover:border-slate-300'
                        }`}
                      >
                        <span className="text-[13px] font-bold text-on-surface block">
                          {slotKey === 'express-60m' ? '⚡ 60-Min Express' : slotKey === 'today-evening' ? '🕒 Today Evening' : '🌅 6 AM First Pour'}
                        </span>
                        <span className="text-[11px] text-secondary block mt-0.5">
                          {slotKey === 'express-60m' ? 'Stockyard priority queue' : slotKey === 'today-evening' ? '4:00 PM – 7:00 PM' : 'Tomorrow dawn casting'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Step 3: Commercial Invoicing & GST Tax Claim */}
              <section className="bg-white rounded-xl shadow-sm border border-border-subtle p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-[14px]">
                      3
                    </span>
                    <div>
                      <h2 className="text-[16px] font-bold text-on-surface">Commercial Invoicing &amp; GST Tax Claim</h2>
                      <p className="text-[12px] text-secondary">Automated e-Invoice and e-Way bill issued directly to GST portal</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded">
                    Input Tax 100% Claimable
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-secondary mb-1 uppercase tracking-wider">
                      Buyer GSTIN (Tax Identification)
                    </label>
                    <input
                      type="text"
                      required
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg bg-surface-container-low border border-border-subtle text-[13px] text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary-container uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-secondary mb-1 uppercase tracking-wider">
                      Registered Corporate Entity
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg bg-surface-container-low border border-border-subtle text-[13px] text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                </div>

                {/* Payment Selection Options */}
                <div className="flex flex-col gap-3 pt-3">
                  <span className="text-[12px] font-bold text-secondary uppercase tracking-wider">
                    Select B2B Settlement Method
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div
                      onClick={() => setPaymentOption('trade-credit')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentOption === 'trade-credit'
                          ? 'border-primary-container bg-primary-container/5'
                          : 'border-border-subtle hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[13px] font-bold text-on-surface block">
                        30-Day Trade Credit
                      </span>
                      <span className="text-[11px] text-secondary block mt-0.5">
                        ₹50 Lakh approved limit. 0% interest for 30 days.
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-2 inline-block">
                        Recommended for Sites
                      </span>
                    </div>

                    <div
                      onClick={() => setPaymentOption('upi')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentOption === 'upi'
                          ? 'border-primary-container bg-primary-container/5'
                          : 'border-border-subtle hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[13px] font-bold text-on-surface block">
                        Instant Site UPI / QR
                      </span>
                      <span className="text-[11px] text-secondary block mt-0.5">
                        Zero surcharge via Google Pay, PhonePe, Paytm
                      </span>
                    </div>

                    <div
                      onClick={() => setPaymentOption('rtgs')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentOption === 'rtgs'
                          ? 'border-primary-container bg-primary-container/5'
                          : 'border-border-subtle hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[13px] font-bold text-on-surface block">
                        Direct RTGS / NEFT
                      </span>
                      <span className="text-[11px] text-secondary block mt-0.5">
                        Virtual account allocation for accounts team
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right 4 Cols: Order Manifest & Confirmation CTA */}
            <div className="lg:col-span-4 flex flex-col gap-4 sticky top-28">
              <div className="bg-white rounded-xl shadow-sm border border-border-subtle p-5 flex flex-col gap-4">
                <span className="text-[14px] font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-border-subtle">
                  Order Manifest Summary
                </span>

                <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-[12px] py-1 border-b border-border-subtle/50">
                      <div className="truncate mr-2">
                        <span className="font-semibold text-on-surface block truncate">{item.name}</span>
                        <span className="text-secondary">{item.quantity} {item.unit || 'Units'}</span>
                      </div>
                      <span className="font-bold text-on-surface shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 text-[13px] pt-2 border-t border-border-subtle">
                  <div className="flex justify-between text-secondary">
                    <span>Taxable Value</span>
                    <span className="font-semibold text-on-surface">₹{(subtotal - discountAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>GST (18%)</span>
                    <span className="font-semibold text-on-surface">₹{gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Consignment Delivery</span>
                    <span className="text-tertiary font-bold">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-border-subtle flex items-baseline justify-between">
                    <div>
                      <span className="text-[14px] font-bold text-on-surface">Total Order Value</span>
                      <span className="block text-[11px] text-secondary">Payable via {paymentOption.toUpperCase()}</span>
                    </div>
                    <span className="text-[22px] font-bold text-on-surface font-price-hero">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full h-12 rounded-lg bg-primary-container hover:bg-safety-orange-hover text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Allocating Stockyard...
                    </span>
                  ) : (
                    <>
                      Authorise Site Dispatch
                      <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-secondary leading-tight">
                  By clicking Authorise, you confirm delivery staging yard availability and authorized site engineer reception.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
