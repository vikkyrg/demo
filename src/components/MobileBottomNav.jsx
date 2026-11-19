import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItemsCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const navItems = [
    { label: 'Storefront', icon: 'storefront', path: '/' },
    { label: 'Catalog', icon: 'grid_view', path: '/products' },
    { label: 'Saved BOQ', icon: 'favorite', path: '/wishlist', badge: wishlistCount },
    { label: 'Live Tracking', icon: 'local_shipping', path: '/orders' },
    { label: 'Cart', icon: 'shopping_bag', path: '/cart', badge: totalItemsCount },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border-subtle flex items-center justify-around py-2 shadow-lg">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center relative py-1 px-3 ${
              isActive ? 'text-primary font-bold' : 'text-secondary hover:text-on-surface'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              {Boolean(item.badge && item.badge > 0) && (
                <span className="absolute -top-1.5 -right-2 bg-primary-container text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-xs">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
