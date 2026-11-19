import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#131b2e] text-[#eff4ff] pt-14 pb-20 md:pb-12 border-t border-slate-700">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-container text-white flex items-center justify-center font-bold shadow-xs">
                <span className="material-symbols-outlined text-[20px]">construction</span>
              </div>
              <span className="text-[22px] font-extrabold tracking-tight text-white font-headline-md">
                Build<span className="text-primary-fixed">Mart</span>
              </span>
            </div>
            <p className="text-[13px] text-slate-400 max-w-sm leading-relaxed">
              A simple online store for quality construction materials from trusted brands, delivered to your project.
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="material-symbols-outlined text-primary-fixed text-[20px]">verified_user</span>
              <span>Direct IS 1786 / IS 1489 Manufacturer Consignments</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[14px] font-bold text-white uppercase tracking-wider">Categories</h4>
            <ul className="flex flex-col gap-2 text-[13px] text-slate-400">
              <li><Link to="/products" className="hover:text-primary-fixed transition-colors">Cement & Aggregates</Link></li>
              <li><Link to="/products" className="hover:text-primary-fixed transition-colors">TMT Steel & Rebar</Link></li>
              <li><Link to="/products" className="hover:text-primary-fixed transition-colors">Waterproofing & Chemicals</Link></li>
              <li><Link to="/products" className="hover:text-primary-fixed transition-colors">Electrical & Conduits</Link></li>
              <li><Link to="/products" className="hover:text-primary-fixed transition-colors">Pipes & Plumbing</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[16px] font-semibold text-white tracking-wide">Policy</h4>
            <ul className="flex flex-col gap-2.5 text-[14px] text-slate-300">
              <li>
                <Link to="/policy/refund" className="flex items-center gap-2 hover:text-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-[15px] text-slate-400">chevron_right</span>
                  <span>Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/policy/privacy" className="flex items-center gap-2 hover:text-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-[15px] text-slate-400">chevron_right</span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/policy/terms" className="flex items-center gap-2 hover:text-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-[15px] text-slate-400">chevron_right</span>
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link to="/policy/shipping" className="flex items-center gap-2 hover:text-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-[15px] text-slate-400">chevron_right</span>
                  <span>Shipping Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer & Site Desk */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[14px] font-bold text-white uppercase tracking-wider">Procurement Helpdesk</h4>
            <div className="flex flex-col gap-2 text-[13px] text-slate-400">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary-fixed">call</span>
                <span>+91 80 4920 1100 (24x7 Site Ops)</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary-fixed">mail</span>
                <span>site-dispatch@buildmart.in</span>
              </p>
              <div className="mt-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <span className="text-[11px] font-bold text-primary-fixed block uppercase">Bangalore Yard Hub</span>
                <span className="text-[12px] text-slate-300">Hub 4, Electronic City Expressway, Phase 1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-slate-400">
          <p>© 2026 BuildMart Technologies Private Limited. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>GST Registered</span>
            <span>RERA Compliant Supply Partner</span>
            <span>ISO 9001:2015 Certified Fleet</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
