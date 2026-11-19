import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products';
import heroImg from '../assets/hero.png';

export default function Home() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  return (
<main className="w-full pt-32 bg-surface-canvas"><div className="flex flex-col w-full">
{/* HERO SECTION / PROMOTIONAL BANNER */}
<section className="w-full bg-[#f8fafc] pt-2 pb-6">
  <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
    <Link to="/products" className="block relative w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-border-subtle">
      <img
        src={heroImg}
        alt="Hero Promotional Banner"
        className="w-full h-auto object-cover block group-hover:scale-[1.005] transition-transform duration-300"
      />
    </Link>
  </div>
</section>
{/* CATEGORIES SECTION (10 rich visual cards) */}
<section className="w-full py-space-3xl bg-surface-canvas" id="categories-section">
<div className="max-w-[1440px] mx-auto px-margin-md lg:px-margin-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm">
<div>
<span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider font-bold">Structural to Finishing</span>
<h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">Shop by Construction Category</h2>
</div>
<p className="font-body-md text-body-md text-secondary">Verified inventory sourced directly from tier-1 manufacturers</p>
</div>
{/* 10 Category Cards Grid */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-space-md">
{/* 1. Cement & Aggregates */}
<Link className="group flex flex-col bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1" to="/products">
<div className="h-28 w-full rounded-lg bg-surface-container-low overflow-hidden mb-space-sm relative flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Stacked 50kg cement bags on wooden industrial pallet in warehouse with grey Portland cement texture and high detail clean lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXNYXHS1iUB1IYXKViLd-0BMeivhei87rhAxWEQxvS4opLYZ8dBDDFfjInrr91y4rrBZviepNPEqAawwV_uaHFnZ-lBkFBF0iupSEUfqjOLcVgaiX3FAbgGbiNWFc4YqnsxCmul6GyEbQhRBEWk4j6A0tSUVZSa6Hjk4Z5Nr_6fUayS8ugkc08NSWJ8w_kl4qUUZs_KMg9NDYE5byq8Si0P9iDBv_bQN4eRpXDshKF" />
<span className="absolute top-2 left-2 bg-slate-muted text-surface-bright font-label-sm text-[10px] px-1.5 py-0.5 rounded">Bulk Rates</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary-container transition-colors">Cement &amp; Aggregates</h3>
<span className="font-body-sm text-body-sm text-secondary mt-1">1,480+ Products</span>
</Link>
{/* 2. Steel & TMT Rebar */}
<Link className="group flex flex-col bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1" to="/products">
<div className="h-28 w-full rounded-lg bg-surface-container-low overflow-hidden mb-space-sm relative flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Bundled ribbed TMT steel bars stacked horizontally with metallic sheen and blue-tinted construction industrial lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUjI2g5EUcgl5oNdKgZ7yQBZ7yAjnLS8IVb9q9KsaNLjvAA1iWaW3jAslVZBg5dPWiyGtgLEpblllg4abDdE7tQbOJKQZKSuA-z9fk9axWf-tpVbfp1RE9L_rvUYkREw9C1C4a_WMTvlpgQ8HG_YwzJhTr6xXx0i8jg4gmupIuMopHl08r1CCbJoM4aurZA8VLYsjwKnlHc6-UrrUYt7Qb1_ruLoAskKp7p4ovHFOx" />
<span className="absolute top-2 left-2 bg-tertiary text-on-tertiary font-label-sm text-[10px] px-1.5 py-0.5 rounded">Fe 550D</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary-container transition-colors">Steel &amp; TMT Rebar</h3>
<span className="font-body-sm text-body-sm text-secondary mt-1">820+ Products</span>
</Link>
{/* 3. Tiles & Flooring */}
<Link className="group flex flex-col bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1" to="/products">
<div className="h-28 w-full rounded-lg bg-surface-container-low overflow-hidden mb-space-sm relative flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Modern vitrified large format ceramic tiles showcasing marble texture and clean interior design display lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8V4nyEjsKrW_WclnRX9Z5XU50lDDD4JzQZCQmBcf6tdVxucM4wtQyOIddTslohWSJ8j9zHLtZeOkxXyWyeerSlMkSVl_H8gsNhZLtZ4kZM6cBZTV42OD5D9ZzbgktLpEY1HQOQqcQzAH4wO5lDoSuwbYxamfCB62uTffMh0oM5fVUphiDnsvbuTDt6ecOePY7Sbu3lUcBHe7fX--tn31uyxb4aY1cL4ErCn83wsNi" />
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary-container transition-colors">Tiles &amp; Flooring</h3>
<span className="font-body-sm text-body-sm text-secondary mt-1">3,450+ Products</span>
</Link>
{/* 4. Paints & Chemicals */}
<Link className="group flex flex-col bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1" to="/products">
<div className="h-28 w-full rounded-lg bg-surface-container-low overflow-hidden mb-space-sm relative flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Color paint buckets Asian Paints industrial cans waterproof chemicals arranged neatly with orange and white brand accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApjKMI11Sxem4VqgP1mT4IxybGAxHCgxE8YHE7T1aDPhZgGENmdcWba6zEiKcNEds_35Th47lwUzTuHZ_hOKnaUwBTUbWpqJZTOU6N1pXjYbZO9oeFKNwNNz_B2uRpO4p8WW2-YX0Tek2Rto-bPKqSaSSfYJX4o-kC-dajl6lhBU47VFzxhBaeNvx8YUt4G1OYATwiOUmiF4hz_E7Y6-TMNYXBjqebX-agMx_F5MVG" />
<span className="absolute top-2 left-2 bg-deal-amber text-slate-muted font-label-sm text-[10px] px-1.5 py-0.5 rounded font-bold">Top Deals</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary-container transition-colors">Paints &amp; Chemicals</h3>
<span className="font-body-sm text-body-sm text-secondary mt-1">2,100+ Products</span>
</Link>
{/* 5. Electrical & Cabling */}
<Link className="group flex flex-col bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1" to="/products">
<div className="h-28 w-full rounded-lg bg-surface-container-low overflow-hidden mb-space-sm relative flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Spools of multi-strand electrical copper wire, conduit pipes and modular circuit breaker switches on white background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDinRH9HJO9agY02UdlvPaX8y4GatlTWFkcBSm8DOnKe8168G3sKVxyFP4w7lXkSMfoT5aqqllDjQCKkauXDlN8F4mpoi2kP-fWJWBxXjeXm_uCnI1Xp8lH80J-g3Lw0pbq-XohjLRxT9Jp57U42PEnyHE3Vx_O-VwaqX_sJ9jJfgMz8MqsYsTlZ0ncVDRZ3ocGKcBk-N8MygugUPcJgiKiqdFFY4cdIlZhgyLAHJx_" />
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary-container transition-colors">Electrical &amp; Cabling</h3>
<span className="font-body-sm text-body-sm text-secondary mt-1">4,300+ Products</span>
</Link>
{/* 6. Plumbing & Drainage */}
<Link className="group flex flex-col bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1" to="/products">
<div className="h-28 w-full rounded-lg bg-surface-container-low overflow-hidden mb-space-sm relative flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="CPVC and UPVC pipes, brass ball valves and plumbing drainage fittings aligned neatly in bright studio light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAv88KAaqfDGmnXg4ktEdMDTySQQkVP-_pI-S_KF2IWWqYUlyAqklntzFaDgtCqKj6cWdlG3PMe8ScfB6D9Z16JBZrmzh_a6gOdW9f3MTh5blwWXYkLec_A5j2B82T9arCWSr7BGtaI0sd1PRNWIrhT20eyI3ls2Mnj_XH2FVvdPZNU5b_YTX6NoFVPuMOKWi1ZZ7wcKZ5Z3eRVlq8PoaaJz36Fko57v5p_4lKlPkw" />
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary-container transition-colors">Plumbing &amp; Drainage</h3>
<span className="font-body-sm text-body-sm text-secondary mt-1">1,960+ Products</span>
</Link>
{/* 7. Plywood & Laminates */}
<Link className="group flex flex-col bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1" to="/products">
<div className="h-28 w-full rounded-lg bg-surface-container-low overflow-hidden mb-space-sm relative flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Stacked marine grade commercial plywood sheets and decorative natural wood texture laminates in carpentry warehouse" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5eDLG3vhDDxuv1Kfn3FsOBq-S9Xn2GVckIO6UDEnpqal4jDVG6DNK-UMyofLnZGKtq5BNG_YckDuybA332c7-wwGC2uGPyG8jWP-6m-KMEId5QTquFUNXwUOY30qLrofKitCfmKMVs4oBfIXxPdedqMK59ICMJOpCgRyoMrt4NY7E763ehdh4Fe6OBPpFpd-tgU23F74N9bdzkKukx9EgtLDSEEq1gMMLrMPj8kkU" />
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary-container transition-colors">Plywood &amp; Laminates</h3>
<span className="font-body-sm text-body-sm text-secondary mt-1">1,120+ Products</span>
</Link>
{/* 8. Power Tools & Equipment */}
<Link className="group flex flex-col bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1" to="/products">
<div className="h-28 w-full rounded-lg bg-surface-container-low overflow-hidden mb-space-sm relative flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Heavy duty rotary hammer drill, angle grinder and battery power tool set on clean concrete surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiaO0O3JY3-30ewbhfIMVjfcD-zoZOKP7eN1s1tf4jc6xLOwol2-5VrTAe2bZ9ak83XBY6tGuf1PzSu-FRh1NfhncMPy__13X0X-BNUZ1dj8SAGglP4rS7F8ULojdTqmpVR3V9atVG2mTa_xolLiGQOI2kwVlJz1YIRJAztiShI-81FVYyrfYSJUhJJ2llbL1kmhLaInxWAqNayaxUhlBDyV18fX1cz9XJhrv3CkGG" />
<span className="absolute top-2 left-2 bg-primary-container text-on-primary font-label-sm text-[10px] px-1.5 py-0.5 rounded">Official Bosch</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary-container transition-colors">Power Tools</h3>
<span className="font-body-sm text-body-sm text-secondary mt-1">890+ Products</span>
</Link>
{/* 9. Sanitaryware & Bath */}
<Link className="group flex flex-col bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1" to="/products">
<div className="h-28 w-full rounded-lg bg-surface-container-low overflow-hidden mb-space-sm relative flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Matte black and chrome brass bathroom faucets, ceramic wash basin and luxury shower fixtures on tiled wall" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTj1A0-BJFmVjGne2MzyQKY5LF6OAgMWG9mo71WBK-hi7DpGvLaSCo3NXK7ZqJvAeisZ-jZIeqrPhh__5QU7Ok4foCoShwK1G7Oi3KwVc4b0MSl0uYS-BHtuoXp6AxY6MKWuDVe3i5OLKR83nrsXg4iFRW5f50hW9Z-XkAICIzoWyGPYvq8ys1PKExs806hySkgXElgJCD7wIKtTSknToXYpMj3vZWsdiE84UiDHeh" />
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary-container transition-colors">Sanitaryware &amp; Bath</h3>
<span className="font-body-sm text-body-sm text-secondary mt-1">2,740+ Products</span>
</Link>
{/* 10. Safety & PPE */}
<Link className="group flex flex-col bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1" to="/products">
<div className="h-28 w-full rounded-lg bg-surface-container-low overflow-hidden mb-space-sm relative flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Yellow industrial safety hard hat helmet, high visibility reflective vest, heavy safety boots and cut-proof gloves" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD70YBp65a0C8tRLoRklrJYUNeJO6MJZhUFR_zWsRRzFvlxaVm-KPJ2CjcLwgQtTXgjkOYmAUT9EjKnaY1vBsWX-1CljXmpZUzyAB23KrBN5dm8e6TtjSkJ0Oc1LFyPMoaoUvFiVMgLpm9ZB4oJ0q2fqRz5_rSXkUPWpfTlfT8B0WsCep17nfRIzPLqBkcc9QeIvL1RvMhxosTiw7VxmPr1gELSLRkklPUNHjYP1S9O" />
<span className="absolute top-2 left-2 bg-tertiary text-on-tertiary font-label-sm text-[10px] px-1.5 py-0.5 rounded">ISI Mark</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary-container transition-colors">Safety &amp; PPE</h3>
<span className="font-body-sm text-body-sm text-secondary mt-1">640+ Products</span>
</Link>
</div>
</div>
</section>
{/* BULK BUYING & CONTRACTOR CREDIT SECTION */}
<section className="w-full py-space-3xl bg-slate-muted text-surface-bright relative overflow-hidden">
<div className="max-w-[1440px] mx-auto px-margin-md lg:px-margin-lg relative z-10">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
{/* Left Content */}
<div className="lg:col-span-6 flex flex-col items-start gap-space-md">
<div className="inline-flex items-center gap-2 bg-deal-amber/20 text-deal-amber px-space-md py-1 rounded-full font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-[18px]">account_balance</span>
<span>B2B Credit Facility for Active Sites</span>
</div>
<h2 className="font-display-lg text-headline-lg md:text-display-lg font-bold text-surface-bright">
            Up to ₹50 Lakhs Trade Credit <br /><span className="text-deal-amber">with 30-Day Pay Cycle</span>
</h2>
<p className="font-body-lg text-body-lg text-secondary-fixed-dim">
            Never halt a pour due to cash-flow latency. Upload your GSTIN, approve your jobsite address, and unlock instant material drawdowns with single monthly consolidated invoicing.
          </p>
<div className="grid grid-cols-2 gap-space-md w-full pt-space-sm">
<div className="flex items-center gap-space-sm bg-surface-card/5 p-space-md rounded-xl">
<span className="material-symbols-outlined text-tertiary-fixed text-[24px]">verified</span>
<div>
<span className="font-headline-sm text-headline-sm block">0% Interest</span>
<span className="font-body-sm text-body-sm text-secondary-fixed-dim">On 15-day settlement</span>
</div>
</div>
<div className="flex items-center gap-space-sm bg-surface-card/5 p-space-md rounded-xl">
<span className="material-symbols-outlined text-primary-fixed text-[24px]">receipt_long</span>
<div>
<span className="font-headline-sm text-headline-sm block">100% ITC Eligible</span>
<span className="font-body-sm text-body-sm text-secondary-fixed-dim">Instant GST e-invoices</span>
</div>
</div>
</div>
<div className="pt-space-sm">
<button className="bg-deal-amber hover:bg-amber-600 text-slate-muted font-headline-sm text-headline-sm px-space-xl py-3 rounded-lg font-bold shadow-lg transition-colors flex items-center gap-space-sm">
<span>Apply for Credit Line</span>
<span className="material-symbols-outlined text-[20px]">north_east</span>
</button>
</div>
</div>
{/* Right Quick Interactive Material Estimate & GST Calculator Widget */}
<div className="lg:col-span-6 bg-surface-card text-on-surface p-space-xl rounded-2xl shadow-2xl">
<div className="flex items-center justify-between pb-space-sm border-b border-border-subtle mb-space-md">
<div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">Site Estimate &amp; GST Preview</h3>
<span className="font-body-sm text-body-sm text-secondary">Calculate direct tax credit claims</span>
</div>
<span className="bg-surface-container-low text-primary-container font-label-sm text-label-sm px-3 py-1 rounded-full font-bold">Active Engine</span>
</div>
{/* Interactive Calculator Inputs */}
<div className="flex flex-col gap-space-md">
<div>
<label className="font-label-md text-label-md text-secondary block mb-1">Select Material Class</label>
<select className="w-full h-11 px-space-md rounded-lg bg-surface-container-low border-0 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary-container" id="calcMaterial">
<option value="cement">Cement (UltraTech 53G) - 28% GST</option>
<option value="steel">TMT Steel Rebar (Tata Tiscon) - 18% GST</option>
<option value="paints">Paints &amp; Primer (Asian Paints) - 18% GST</option>
<option value="electrical">Modular Switches &amp; Cabling - 18% GST</option>
</select>
</div>
<div className="grid grid-cols-2 gap-space-md">
<div>
<label className="font-label-md text-label-md text-secondary block mb-1">Quantity (Units / Tons)</label>
<input  className="w-full h-11 px-space-md rounded-lg bg-surface-container-low border-0 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary-container" id="calcQty" min="1" type="number" defaultValue="100" />
</div>
<div>
<label className="font-label-md text-label-md text-secondary block mb-1">Unit Price (₹)</label>
<input  className="w-full h-11 px-space-md rounded-lg bg-surface-container-low border-0 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary-container" id="calcPrice" type="number" defaultValue="420" />
</div>
</div>
{/* Calculated Output Box */}
<div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-2 mt-space-xs">
<div className="flex justify-between items-center text-secondary font-body-sm text-body-sm">
<span>Taxable Material Subtotal:</span>
<span className="font-bold text-on-surface font-mono" id="subtotalDisplay">₹42,000</span>
</div>
<div className="flex justify-between items-center text-secondary font-body-sm text-body-sm">
<span>Input Tax Credit (ITC Claimable):</span>
<span className="font-bold text-tertiary font-mono" id="taxDisplay">₹11,760 (28.000000000000004%)</span>
</div>
<div className="h-px bg-border-subtle my-1"></div>
<div className="flex justify-between items-center font-headline-sm text-headline-sm">
<span className="text-on-surface font-bold">Net Effective Site Cost:</span>
<span className="font-bold text-primary-container font-mono text-price-card" id="netDisplay">₹36,120 (with ITC)</span>
</div>
</div>
<button className="w-full bg-slate-muted hover:bg-slate-800 text-surface-bright font-headline-sm text-headline-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2" type="button">
<span className="material-symbols-outlined text-[18px]">download</span>
<span>Generate Contractor Proforma Quote</span>
</button>
</div>
</div>
</div>
</div>
</section>
{/* SHOP BY CERTIFIED BRAND MARQUEE */}
<section className="w-full py-space-3xl bg-surface-canvas">
<div className="max-w-[1440px] mx-auto px-margin-md lg:px-margin-lg">
<div className="text-center mb-space-xl">
<span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider font-bold">100% Mill Direct Guarantee</span>
<h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">Certified Manufacturing Partners</h2>
<p className="font-body-md text-body-md text-secondary mt-1">Every order ships with genuine laboratory test certificates</p>
</div>
{/* 8 Brand Logos Cluster */}
<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-space-md">
<div className="bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
<div className="h-12 w-full flex items-center justify-center mb-2">
<span className="font-headline-md text-headline-md font-extrabold text-on-surface group-hover:text-primary-container transition-colors tracking-tighter">UltraTech</span>
</div>
<span className="font-body-sm text-[11px] text-secondary">The Engineer's Choice</span>
</div>
<div className="bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
<div className="h-12 w-full flex items-center justify-center mb-2">
<span className="font-headline-md text-headline-md font-extrabold text-on-surface group-hover:text-primary-container transition-colors tracking-tight">TATA TISCON</span>
</div>
<span className="font-body-sm text-[11px] text-secondary">550D Rebars</span>
</div>
<div className="bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
<div className="h-12 w-full flex items-center justify-center mb-2">
<span className="font-headline-md text-headline-md font-extrabold text-on-surface group-hover:text-primary-container transition-colors">asianpaints</span>
</div>
<span className="font-body-sm text-[11px] text-secondary">Apex &amp; Royale</span>
</div>
<div className="bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
<div className="h-12 w-full flex items-center justify-center mb-2">
<span className="font-headline-md text-headline-md font-extrabold text-on-surface group-hover:text-primary-container transition-colors">HAVELLS</span>
</div>
<span className="font-body-sm text-[11px] text-secondary">Wires &amp; MCBs</span>
</div>
<div className="bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
<div className="h-12 w-full flex items-center justify-center mb-2">
<span className="font-headline-md text-headline-md font-extrabold text-on-surface group-hover:text-primary-container transition-colors">ASTRAL</span>
</div>
<span className="font-body-sm text-[11px] text-secondary">Pipes &amp; Fittings</span>
</div>
<div className="bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
<div className="h-12 w-full flex items-center justify-center mb-2">
<span className="font-headline-md text-headline-md font-extrabold text-on-surface group-hover:text-primary-container transition-colors">BOSCH</span>
</div>
<span className="font-body-sm text-[11px] text-secondary">Heavy Power Tools</span>
</div>
<div className="bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
<div className="h-12 w-full flex items-center justify-center mb-2">
<span className="font-headline-md text-headline-md font-extrabold text-on-surface group-hover:text-primary-container transition-colors">LATICRETE</span>
</div>
<span className="font-body-sm text-[11px] text-secondary">Adhesives &amp; Grouts</span>
</div>
<div className="bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
<div className="h-12 w-full flex items-center justify-center mb-2">
<span className="font-headline-md text-headline-md font-extrabold text-on-surface group-hover:text-primary-container transition-colors">Kajaria</span>
</div>
<span className="font-body-sm text-[11px] text-secondary">Vitrified Slabs</span>
</div>
</div>
</div>
</section>
{/* WHY CONTRACTORS TRUST BUILDMART (4-Benefit Grid) */}
<section className="w-full py-space-3xl bg-surface-container-low">
<div className="max-w-[1440px] mx-auto px-margin-md lg:px-margin-lg">
<div className="text-center max-w-2xl mx-auto mb-space-2xl">
<span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-bold">Standard Operating Excellence</span>
<h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">Engineered for Indian Jobsites</h2>
<p className="font-body-md text-body-md text-secondary mt-1">We resolve supply friction, fraudulent weight slips, and delayed project deadlines.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
{/* Benefit 1 */}
<div className="bg-surface-card p-space-xl rounded-2xl shadow-sm flex flex-col items-start gap-space-sm hover:-translate-y-1 transition-transform">
<div className="h-14 w-14 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center mb-space-xs">
<span className="material-symbols-outlined text-[32px]">science</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Lab-Tested Quality</h3>
<p className="font-body-sm text-body-sm text-secondary">Every truckload of cement, aggregate, and rebar comes with QR-scannable batch test reports and NABL lab validation.</p>
</div>
{/* Benefit 2 */}
<div className="bg-surface-card p-space-xl rounded-2xl shadow-sm flex flex-col items-start gap-space-sm hover:-translate-y-1 transition-transform">
<div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-space-xs">
<span className="material-symbols-outlined text-[32px]">location_searching</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Live GPS Truck Tracking</h3>
<p className="font-body-sm text-body-sm text-secondary">Track your driver and tipper on live Bengaluru maps. Direct phone line with the dispatch marshal for zero gate delays.</p>
</div>
{/* Benefit 3 */}
<div className="bg-surface-card p-space-xl rounded-2xl shadow-sm flex flex-col items-start gap-space-sm hover:-translate-y-1 transition-transform">
<div className="h-14 w-14 rounded-2xl bg-deal-amber/10 text-deal-amber flex items-center justify-center mb-space-xs">
<span className="material-symbols-outlined text-[32px]">payments</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Pay on Unloading</h3>
<p className="font-body-sm text-body-sm text-secondary">Inspect material bags, verify steel gauges, and weigh batch counts on-site before completing UPI or bank settlement.</p>
</div>
{/* Benefit 4 */}
<div className="bg-surface-card p-space-xl rounded-2xl shadow-sm flex flex-col items-start gap-space-sm hover:-translate-y-1 transition-transform">
<div className="h-14 w-14 rounded-2xl bg-slate-muted/10 text-slate-muted flex items-center justify-center mb-space-xs">
<span className="material-symbols-outlined text-[32px]">description</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Automated GST Invoices</h3>
<p className="font-body-sm text-body-sm text-secondary">Download standardized GST-compliant tax invoices instantly to claim full Input Tax Credit across your chartered balance sheets.</p>
</div>
</div>
</div>
</section>
</div>
</main>
);
}
