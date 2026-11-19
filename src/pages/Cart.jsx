import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItemsCount,
    totalWeightTons,
    subtotal,
    discountAmount,
    gstAmount,
    grandTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    selectedSlot,
    setSelectedSlot
  } = useCart();

  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError('Invalid coupon code. Try BUILDFIRST or PRO500');
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleSaveForLater = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
  };

  return (
    <main className="w-full pt-32 bg-surface-canvas min-h-screen">
      <div className="flex flex-col w-full">
        <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6 lg:px-10 py-6 flex flex-col gap-6">
          {/* Top Bar: Navigation Pathway & Operational Status */}
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 text-[13px] text-secondary">
              <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
                <span className="material-symbols-outlined text-[16px]">home</span> Home
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-semibold">Active Jobsite Cart</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-bold text-on-surface tracking-tight font-headline-lg">
                  Your Jobsite Cart
                </h1>
                <p className="text-[14px] text-secondary">
                  Consolidated Site Requisition • Bengaluru Central Stockyard
                </p>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-lg border border-border-subtle">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
                <span className="text-[13px] font-semibold text-on-surface">
                  Live Dispatch Window: <span className="text-tertiary">60-Min Express Available</span>
                </span>
              </div>
            </div>
          </div>

          {/* Logistics Capacity & Weight Progress Metric */}
          <div className="bg-surface-card rounded-xl p-5 shadow-sm border border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0">
                <span className="material-symbols-outlined text-[26px]">local_shipping</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-on-surface">Consignment Weight & Payload</span>
                  <span className="bg-surface-container text-secondary text-[11px] font-bold px-2 py-0.5 rounded">
                    Medium Tipper (16T Cap)
                  </span>
                </div>
                <p className="text-[12px] text-secondary mt-0.5">
                  Current gross weight: <strong>{totalWeightTons} Metric Tonnes</strong> across {cartItems.length} line items
                </p>
              </div>
            </div>

            <div className="w-full md:w-72 flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-bold text-secondary">
                <span>Payload Utilization</span>
                <span>{Math.min(100, Math.round((Number(totalWeightTons) / 16) * 100))}% Capacity</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-low overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(15, (Number(totalWeightTons) / 16) * 100))}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-secondary self-end">Single Tipper trip covers entire manifest</span>
            </div>
          </div>

          {/* Main 2-Column Grid: Manifest Table & Cost Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-border-subtle flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[36px]">remove_shopping_cart</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-on-surface">Your jobsite cart is currently empty</h3>
                    <p className="text-[13px] text-secondary mt-1">Browse our verified materials catalog to add building supplies.</p>
                  </div>
                  <Link
                    to="/products"
                    className="bg-primary-container hover:bg-safety-orange-hover text-white text-[13px] font-bold px-6 py-2.5 rounded-lg shadow-sm transition-all"
                  >
                    Browse Materials Catalog
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-border-subtle divide-y divide-border-subtle overflow-hidden">
                  <div className="p-4 bg-surface-container-low/50 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-on-surface uppercase tracking-wider">
                      Consignment Line Items ({totalItemsCount} Total Units)
                    </span>
                    <button
                      onClick={clearCart}
                      className="text-[12px] text-secondary hover:text-error transition-colors flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete_sweep</span> Clear All
                    </button>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-surface-container-low/30 transition-colors"
                    >
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="relative shrink-0 rounded-lg overflow-hidden bg-surface-container w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border border-border-subtle/80">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <span className="absolute top-1 left-1 bg-tertiary text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shadow-xs">
                            60m Drop
                          </span>
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-[15px] font-bold text-on-surface truncate">
                              <Link to={`/products/${item.id}`} className="hover:text-primary-container transition-colors">
                                {item.name}
                              </Link>
                            </h3>
                            <span className="bg-surface-container text-secondary text-[10px] px-2 py-0.5 rounded font-bold">
                              {item.sku || 'IS Certified'}
                            </span>
                          </div>
                          <p className="text-[12px] text-secondary mt-1">
                            Allocated to: <strong>{item.stagingYard || 'Tower 4 Core Staging'}</strong>
                          </p>

                          <div className="flex items-center gap-4 mt-3 text-secondary text-[12px]">
                            <button
                              onClick={() => handleSaveForLater(item)}
                              className="hover:text-primary-container transition-colors flex items-center gap-1 cursor-pointer font-medium"
                            >
                              <span className="material-symbols-outlined text-[16px]">bookmark</span> Save to BOQ
                            </button>
                            <span className="text-outline-variant">•</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="hover:text-error transition-colors flex items-center gap-1 cursor-pointer font-medium"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span> Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                        <div className="flex flex-col sm:items-end">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[18px] font-bold text-on-surface font-price-card">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                            <span className="text-[12px] line-through text-secondary">
                              ₹{Math.round(item.price * item.quantity * 1.15).toLocaleString()}
                            </span>
                          </div>
                          <span className="text-[11px] text-tertiary font-bold">
                            ₹{item.price.toLocaleString()} / {item.unit || 'Unit'}
                          </span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center bg-white border border-border-subtle rounded-lg shadow-xs mt-2 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-12 h-8 text-center text-[13px] font-bold text-on-surface bg-transparent focus:outline-none appearance-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Delivery Window & Offload Selector Strip */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-border-subtle flex flex-col gap-4">
                <span className="text-[13px] font-bold text-on-surface uppercase tracking-wider">
                  Site Delivery Schedule & Staging Window
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    onClick={() => setSelectedSlot('express-60m')}
                    className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all flex flex-col gap-1 ${
                      selectedSlot === 'express-60m'
                        ? 'border-primary-container bg-primary-container/5'
                        : 'border-border-subtle hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary-container text-[18px]">bolt</span>
                        60-Min Express
                      </span>
                      <span className="text-[11px] font-bold text-tertiary">Free</span>
                    </div>
                    <span className="text-[11px] text-secondary">Depot departure in 15 mins</span>
                  </div>

                  <div
                    onClick={() => setSelectedSlot('today-evening')}
                    className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all flex flex-col gap-1 ${
                      selectedSlot === 'today-evening'
                        ? 'border-primary-container bg-primary-container/5'
                        : 'border-border-subtle hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
                        Today Evening
                      </span>
                      <span className="text-[11px] font-bold text-tertiary">Free</span>
                    </div>
                    <span className="text-[11px] text-secondary">Slot: 4:00 PM – 7:00 PM</span>
                  </div>

                  <div
                    onClick={() => setSelectedSlot('tomorrow-first-pour')}
                    className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all flex flex-col gap-1 ${
                      selectedSlot === 'tomorrow-first-pour'
                        ? 'border-primary-container bg-primary-container/5'
                        : 'border-border-subtle hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[18px]">wb_sunny</span>
                        First Pour (6 AM)
                      </span>
                      <span className="text-[11px] font-bold text-tertiary">Free</span>
                    </div>
                    <span className="text-[11px] text-secondary">Dedicated early site crane slot</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Commercial Summary (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4 sticky top-28">
              {/* Commercial Breakdown Card */}
              <div className="bg-white rounded-xl shadow-sm border border-border-subtle p-5 flex flex-col gap-4">
                <span className="text-[14px] font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-border-subtle">
                  Commercial Cost Breakdown
                </span>

                <div className="flex flex-col gap-2.5 text-[13px]">
                  <div className="flex justify-between text-secondary">
                    <span>Materials Subtotal</span>
                    <span className="text-on-surface font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {coupon.applied && (
                    <div className="flex justify-between text-tertiary">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">sell</span>
                        Wholesale Discount ({coupon.code})
                      </span>
                      <span className="font-bold">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-secondary">
                    <span>Site Logistics & Tipper Freight</span>
                    <span className="text-tertiary font-bold">FREE (Contractor Tier)</span>
                  </div>

                  <div className="flex justify-between text-secondary">
                    <span>Unloading Crane Support</span>
                    <span className="text-on-surface font-semibold">Included</span>
                  </div>

                  <div className="flex justify-between text-secondary">
                    <span>GST (18% Input Tax Claimable)</span>
                    <span className="text-on-surface font-semibold">₹{gstAmount.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t border-border-subtle flex items-baseline justify-between">
                    <div>
                      <span className="text-[15px] font-bold text-on-surface">Total Payable</span>
                      <span className="block text-[11px] text-secondary">Inclusive of all duties & delivery</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[24px] font-bold text-on-surface font-price-hero">
                        ₹{grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code Section */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter Promo (BUILDFIRST)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 h-10 px-3 rounded-lg bg-surface-container-low border border-border-subtle text-[12px] font-medium uppercase focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                    <button
                      type="submit"
                      className="h-10 px-4 bg-slate-800 hover:bg-slate-900 text-white text-[12px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-error mt-1">{couponError}</p>}
                  {coupon.applied && (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-[11px] p-2 rounded mt-2 border border-emerald-200">
                      <span>✓ {coupon.code} active (5% discount)</span>
                      <button onClick={removeCoupon} className="text-error font-bold hover:underline cursor-pointer">
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Primary CTA */}
                <button
                  onClick={() => navigate('/checkout')}
                  disabled={cartItems.length === 0}
                  className="w-full h-12 rounded-lg bg-primary-container hover:bg-safety-orange-hover text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  Proceed to Secure Checkout
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-secondary">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
                  <span>100% Verified NABL Lab Tested Consignments</span>
                </div>
              </div>

              {/* Trade Credit Banner */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed">
                    Trade Credit Approved
                  </span>
                  <span className="material-symbols-outlined text-primary-fixed text-[18px]">credit_card</span>
                </div>
                <div className="text-[18px] font-bold">₹50,00,000 Credit Limit</div>
                <p className="text-[11px] text-slate-300">
                  Pay in 30 days via NACH or direct RTGS. Available during checkout selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
