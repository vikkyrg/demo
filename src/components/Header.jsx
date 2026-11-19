import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CircleUserRound, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const { totalItemsCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  // State to track if user is currently viewing the categories section on the homepage
  const [isCategoriesActive, setIsCategoriesActive] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsCategoriesActive(false);
      return;
    }

    const checkScroll = () => {
      const el = document.getElementById('categories');
      if (!el) {
        setIsCategoriesActive(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      // Section is considered active when its top is within viewport range (e.g. within 200px from top) or visible in upper viewport
      const isInView = rect.top <= 200 && rect.bottom >= 150;
      setIsCategoriesActive(isInView);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener('scroll', checkScroll);
  }, [location.pathname, location.hash]);

  const handleHomeClick = (e) => {
    if (location.pathname === '/' && !location.hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else if (location.pathname === '/') {
      e.preventDefault();
      navigate('/', { replace: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const handleCategoriesClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('categories');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', '/#categories');
      }
    } else {
      navigate('/#categories');
    }
  };

  // Determine active states
  const isHomeActive = location.pathname === '/' && !isCategoriesActive;
  const isProductsActive = location.pathname.startsWith('/products');
  const isOrdersActive = location.pathname.startsWith('/my-orders') || location.pathname.startsWith('/orders');

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden border-b border-border-subtle bg-white/95 shadow-sm backdrop-blur-md md:block">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-10">
        <Link to="/" onClick={handleHomeClick} className="flex shrink-0 items-center gap-2" aria-label="BuildMart home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-container text-white">
            <span className="material-symbols-outlined text-[21px]">construction</span>
          </span>
          <span className="text-xl font-extrabold tracking-tight text-on-surface">Build<span className="text-primary-container">Mart</span></span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            to="/"
            onClick={handleHomeClick}
            className={`text-sm font-semibold transition-colors hover:text-primary-container ${
              isHomeActive ? 'text-primary-container font-bold' : 'text-secondary'
            }`}
          >
            Home
          </Link>
          <a
            href="/#categories"
            onClick={handleCategoriesClick}
            className={`text-sm font-semibold transition-colors hover:text-primary-container cursor-pointer ${
              isCategoriesActive ? 'text-primary-container font-bold' : 'text-secondary'
            }`}
          >
            Categories
          </a>
          <Link
            to="/products"
            className={`text-sm font-semibold transition-colors hover:text-primary-container ${
              isProductsActive ? 'text-primary-container font-bold' : 'text-secondary'
            }`}
          >
            Products
          </Link>
          <Link
            to="/my-orders"
            className={`text-sm font-semibold transition-colors hover:text-primary-container ${
              isOrdersActive ? 'text-primary-container font-bold' : 'text-secondary'
            }`}
          >
            My Orders
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link to="/wishlist" className="relative rounded-xl p-2.5 text-on-surface transition-colors hover:bg-slate-50" aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ''}`}>
            <Heart size={21} />
            {wishlistCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-container px-1 text-[10px] font-bold text-white">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="relative rounded-xl p-2.5 text-on-surface transition-colors hover:bg-slate-50" aria-label={`Cart${totalItemsCount ? `, ${totalItemsCount} items` : ''}`}>
            <ShoppingCart size={21} />
            {totalItemsCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-container px-1 text-[10px] font-bold text-white">{totalItemsCount}</span>}
          </Link>
          <Link to="/my-orders" className="hidden rounded-xl p-2.5 text-on-surface transition-colors hover:bg-slate-50 sm:inline-flex" aria-label="Profile and orders">
            <CircleUserRound size={21} />
          </Link>
        </div>
      </div>

      {/* Tablet / responsive secondary nav bar */}
      <nav className="flex items-center gap-6 overflow-x-auto border-t border-border-subtle px-4 py-2.5 text-sm font-semibold lg:hidden">
        <Link
          to="/"
          onClick={handleHomeClick}
          className={`shrink-0 transition-colors hover:text-primary-container ${
            isHomeActive ? 'text-primary-container font-bold' : 'text-secondary'
          }`}
        >
          Home
        </Link>
        <a
          href="/#categories"
          onClick={handleCategoriesClick}
          className={`shrink-0 transition-colors hover:text-primary-container cursor-pointer ${
            isCategoriesActive ? 'text-primary-container font-bold' : 'text-secondary'
          }`}
        >
          Categories
        </a>
        <Link
          to="/products"
          className={`shrink-0 transition-colors hover:text-primary-container ${
            isProductsActive ? 'text-primary-container font-bold' : 'text-secondary'
          }`}
        >
          Products
        </Link>
        <Link
          to="/my-orders"
          className={`shrink-0 transition-colors hover:text-primary-container ${
            isOrdersActive ? 'text-primary-container font-bold' : 'text-secondary'
          }`}
        >
          My Orders
        </Link>
        <Link to="/wishlist" className="shrink-0 text-secondary hover:text-primary-container">Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ''}</Link>
        <Link to="/cart" className="shrink-0 text-secondary hover:text-primary-container">Cart{totalItemsCount > 0 ? ` (${totalItemsCount})` : ''}</Link>
        <Link to="/my-orders" className="shrink-0 text-secondary hover:text-primary-container">Profile</Link>
      </nav>
    </header>
  );
}
