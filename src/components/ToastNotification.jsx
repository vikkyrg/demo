import React from 'react';
import { useCart } from '../context/CartContext';

export const ToastNotification = () => {
  const { toast } = useCart();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-3 bg-[#213145] text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-slide-up">
      <span className="material-symbols-outlined text-[#4edea3] text-[24px]">check_circle</span>
      <div className="flex flex-col text-left">
        <span className="text-[13px] font-bold leading-tight">{toast.title || 'Added to Site Manifest'}</span>
        <span className="text-[11px] text-slate-300 leading-tight">{toast.message}</span>
      </div>
    </div>
  );
};

export default ToastNotification;
