import React from 'react';
import { useParams, Link } from 'react-router-dom';

const POLICIES = {
  refund: {
    title: 'Refund & Cancellation Policy',
    updated: 'November 2026',
    sections: [
      {
        heading: '1. Order Cancellation',
        text: 'Orders for standard stock building materials can be cancelled free of charge prior to dispatch from our regional yard hub. Once dispatch is initiated or transit tracking is live, cancellations are subject to loading and haulage recovery fees.'
      },
      {
        heading: '2. Damaged or Non-Conforming Goods',
        text: 'All consignments are inspected at unloading. If materials (e.g. cement bags, rebar bundles, tiles, chemicals) arrive damaged, damp, or deviating from mill test certificates, report the discrepancy to the site dispatch marshal on delivery for immediate replacement or full credit note.'
      },
      {
        heading: '3. Refund Processing',
        text: 'Approved refunds are processed within 3-5 business days to the original payment method (NEFT / RTGS / Corporate Card / UPI). For credit line accounts, a credit note is applied directly to your open site ledger.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'November 2026',
    sections: [
      {
        heading: '1. Information We Collect',
        text: 'We collect company name, GSTIN, site delivery addresses, contact numbers, and billing coordinates solely to process procurement orders, issue compliant tax invoices, and coordinate logistics.'
      },
      {
        heading: '2. How We Use Your Data',
        text: 'Your information is used to fulfill deliveries, manage commercial credit facilities, and send shipment notifications. We do not sell or rent contractor or trade data to third parties.'
      },
      {
        heading: '3. Security of Data',
        text: 'All corporate transactions, GST data, and payment information are encrypted with 256-bit TLS encryption and stored in compliant cloud data centers.'
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    updated: 'November 2026',
    sections: [
      {
        heading: '1. Commercial Supply Agreement',
        text: 'By placing an order on BuildMart, you agree that you are purchasing construction and industrial materials for commercial, structural, contractor, or residential project execution in accordance with Indian standard building specifications.'
      },
      {
        heading: '2. Pricing and GST Invoicing',
        text: 'All product prices display statutory GST rates. Input Tax Credit (ITC) compliant e-invoices are generated with corresponding HSN/SAC codes automatically upon dispatch.'
      },
      {
        heading: '3. Jobsite Unloading & Safety',
        text: 'Buyers are responsible for providing clear access for commercial vehicles (tippers, cranes, trailer beds) at the designated delivery site and ensuring safety compliance during material offloading.'
      }
    ]
  },
  shipping: {
    title: 'Shipping & Delivery Policy',
    updated: 'November 2026',
    sections: [
      {
        heading: '1. Express Delivery & Dispatch',
        text: 'Fast-moving essentials and bagged materials marked with Express 60-min or same-day dispatch are fulfilled directly from the closest regional distribution yard.'
      },
      {
        heading: '2. Bulk & Trailer Consignments',
        text: 'Heavy consignments such as TMT steel bundles, bulk aggregate tippers, and manufacturer-direct cement trucks are scheduled with live GPS tracking and dedicated site marshals.'
      },
      {
        heading: '3. Delivery Inspection & Gate Passes',
        text: 'Upon delivery, material testing certificates and electronic weigh-bridge slips are handed over. The site supervisor must inspect and digitally sign off the delivery challan.'
      }
    ]
  }
};

export default function Policy() {
  const { type } = useParams();
  const currentKey = type && POLICIES[type] ? type : 'refund';
  const policy = POLICIES[currentKey];

  return (
    <div className="bg-surface-canvas min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb / Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
          <Link to="/" className="text-slate-500 hover:text-primary transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-700 font-medium">Policy</span>
          <span className="text-slate-400">/</span>
          <span className="text-primary font-semibold">{policy.title}</span>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 border-b border-outline-variant/30 pb-4 mb-8">
          <Link
            to="/policy/refund"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentKey === 'refund'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Refund Policy
          </Link>
          <Link
            to="/policy/privacy"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentKey === 'privacy'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Privacy Policy
          </Link>
          <Link
            to="/policy/terms"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentKey === 'terms'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Terms of Service
          </Link>
          <Link
            to="/policy/shipping"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentKey === 'shipping'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Shipping Policy
          </Link>
        </div>

        {/* Policy Content Card */}
        <div className="bg-white rounded-2xl p-6 md:p-10 border border-outline-variant/20 shadow-sm">
          <div className="border-b border-slate-100 pb-6 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{policy.title}</h1>
            <p className="text-xs text-slate-500">Last updated: {policy.updated}</p>
          </div>

          <div className="space-y-6">
            {policy.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h2 className="text-base md:text-lg font-bold text-slate-900">{sec.heading}</h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">{sec.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <p>Need further clarification or specific contract terms?</p>
            <a
              href="mailto:support@buildmart.in"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-xs"
            >
              <span className="material-symbols-outlined text-[16px]">mail</span>
              Contact Support Desk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
