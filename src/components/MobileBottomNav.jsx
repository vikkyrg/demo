import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItemsCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const navItems = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Products', icon: 'grid_view', path: '/products' },
    { label: 'Wishlist', icon: 'favorite', path: '/wishlist', badge: wishlistCount },
    { label: 'My Orders', icon: 'receipt_long', path: '/my-orders' },
    { label: 'Cart', icon: 'shopping_cart', path: '/cart', badge: totalItemsCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex min-h-16 items-stretch border-t border-border-subtle bg-white/95 px-1 pt-2 shadow-lg backdrop-blur-md md:hidden" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-0.5 py-1 ${
              isActive ? 'text-primary font-bold' : 'text-secondary hover:text-on-surface'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[23px]">{item.icon}</span>
              {Boolean(item.badge && item.badge > 0) && (
                <span className="absolute -top-1.5 -right-2 bg-primary-container text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-xs">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="whitespace-nowrap text-[10px] leading-none tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
