import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Header = () => {
  const { totalItemsCount, grandTotal } = useCart();
  const { count: wishlistCount } = useWishlist();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Civil & Interiors', path: '/products' },
    { name: 'Furniture & Architectural Hardware', path: '/products?cat=hardware' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-border-subtle">
      {/* Top Main Navigation Bar */}
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Brand Logo & Jobsite Indicator */}
        <div className="flex items-center gap-4 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-container text-white flex items-center justify-center font-bold shadow-xs">
              <span className="material-symbols-outlined text-[20px]">construction</span>
            </div>
            <span className="text-[22px] font-extrabold tracking-tight text-on-surface font-headline-md">
              Build<span className="text-primary-container">Mart</span>
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg border border-border-subtle/60 text-secondary">
            <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary">Active Project Site</span>
              <span className="text-[12px] font-bold text-on-surface flex items-center gap-1">
                Prestige Falcon City, Tower 4
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </span>
            </div>
          </div>
        </div>

        {/* Global Smart Search Bar */}
        <div className="flex-1 max-w-2xl mx-2 hidden md:block">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-secondary text-[22px]">search</span>
            <input
              type="text"
              placeholder="Search for Cement, Steel, Tiles, Paints, Electrical, Plumbing..."
              className="w-full h-11 pl-11 pr-24 rounded-lg bg-surface-container-low border-0 text-[14px] text-on-surface placeholder:text-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
            />
            <Link
              to="/products"
              className="absolute right-1.5 h-8 px-3 bg-white text-on-surface-variant text-[11px] font-bold rounded shadow-[0_1px_3px_rgba(15,23,42,0.05)] hover:bg-surface-container-high transition-colors flex items-center"
            >
              Categories
            </Link>
          </div>
        </div>

        {/* Tactical User Actions (Account, Wishlist, Cart) */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/orders"
            className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-surface-container-low transition-colors"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-border-subtle"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD443QoJ5_RdzbPHWwB10owLNIt_2Oiy6GYem331J9G5zCb3mx5ggtTcCSIvrQGKI2uJJlRrDo9Bkyv7hPvH-eMHA_qlIU3pNvdLDVM6aTdcxn98ZzNHct1fJrCZUxTfek6rppYTYEo_IYZoYSJZ6ayoQANdLbA9Atx6Fjx3eQ_8ZzjegkRLGipX7pzJAuCuxYySN5_P_dld_0HYMpci94XDpsS15Nxzk0sDvvYhu7q"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[11px] text-secondary font-medium leading-tight">Hi, Rajesh</span>
              <span className="text-[12px] font-bold text-on-surface flex items-center gap-0.5 leading-tight">
                Jobsite Pro <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </span>
            </div>
          </Link>

          <Link
            to="/wishlist"
            className="relative p-2 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors flex items-center justify-center"
            title="Saved BOQ Schedules"
          >
            <span className="material-symbols-outlined text-[24px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-deal-amber text-slate-muted text-[10px] h-4 w-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2.5 bg-primary-container hover:bg-safety-orange-hover text-white px-3.5 py-2 rounded-lg transition-colors shadow-[0_2px_4px_rgba(15,23,42,0.08)]"
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-primary-container text-[10px] h-4 w-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] leading-tight opacity-90">{totalItemsCount} Items</span>
              <span className="text-[13px] font-bold leading-tight">₹{grandTotal.toLocaleString()}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-white border-t border-border-subtle overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <nav className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-2 scrollbar-none text-[13px]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-1 transition-colors font-medium ${
                    isActive
                      ? 'text-primary-container font-bold border-b-2 border-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
