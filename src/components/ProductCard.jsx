import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getAvailableStock } from '../data/inventory';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isInWishlist(product.id);
  const stockCount = getAvailableStock(product);

  // Media carousel state
  const mediaList = product.media && product.media.length > 0 ? product.media : [
    { type: 'image', src: product.image, title: product.name }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const currentMedia = mediaList[currentIndex];

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

  const handleTogglePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Badge configuration
  const renderBadge = () => {
    if (!product.badge) return null;
    let badgeClass = "bg-primary-container text-white";
    if (product.badge === "Best Seller") badgeClass = "bg-amber-500 text-slate-900";
    else if (product.badge === "New Arrival") badgeClass = "bg-emerald-600 text-white";
    else if (product.badge === "Top Deal") badgeClass = "bg-red-600 text-white";
    else if (product.badge === "Verified Supplier") badgeClass = "bg-blue-600 text-white";

    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm ${badgeClass}`}>
        {product.badge === 'Verified Supplier' ? 'Popular' : product.badge}
      </span>
    );
  };

  const discountPercent = product.mrp && product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-border-subtle shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Media Carousel Container */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center">
        {/* Render Image or Video */}
        {currentMedia.type === 'video' ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src={currentMedia.src}
              poster={currentMedia.poster}
              preload="none"
              playsInline
              className="w-full h-full object-cover"
              onEnded={() => setIsPlaying(false)}
            />
            {/* Play/Pause Overlay Button */}
            <button
              onClick={handleTogglePlay}
              className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110 z-10 cursor-pointer shadow-lg"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              <span className="material-symbols-outlined text-[28px]">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded-md font-bold flex items-center gap-1 z-10 backdrop-blur-xs">
              <span className="material-symbols-outlined text-[13px]">videocam</span> Video Demo
            </span>
          </div>
        ) : (
          <Link to={`/products/${product.id}`} className="w-full h-full flex items-center justify-center p-3">
            <img
              src={currentMedia.src}
              alt={currentMedia.title || product.name}
              loading="lazy"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
          {renderBadge()}
          {discountPercent > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 z-20 cursor-pointer ${
            wishlisted
              ? "bg-red-50 text-red-500 scale-105"
              : "bg-white/90 text-slate-400 hover:text-red-500 hover:bg-white"
          }`}
        >
          <span
            className="material-symbols-outlined text-[20px] transition-transform active:scale-125"
            style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Carousel Left / Right Arrows (Only if multiple media) */}
        {mediaList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous Media"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Media"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1 z-20 pointer-events-none">
              <span>{currentIndex + 1}</span>
              <span>/</span>
              <span>{mediaList.length}</span>
            </div>
          </>
        )}
      </div>

      {/* Card Info Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-secondary font-medium">
            <span className="uppercase tracking-wider font-bold text-slate-500">{product.brand}</span>
            <span className="truncate max-w-[130px]">{product.category}</span>
          </div>

          {/* Product Title */}
          <Link to={`/products/${product.id}`} className="block mt-1">
            <h3 className="text-[15px] font-bold text-on-surface line-clamp-2 leading-snug group-hover:text-primary-container transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[11px] font-bold border border-amber-200">
              <span className="material-symbols-outlined text-[14px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span>{product.rating}</span>
            </div>
            <span className="text-[12px] text-slate-500 font-normal">({product.reviewsCount} reviews)</span>
            <span className="text-slate-300">•</span>
            <span className={`text-[11px] font-semibold ${stockCount > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
              {stockCount > 0 ? `${stockCount.toLocaleString()} In Stock` : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-border-subtle flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-[19px] font-extrabold text-on-surface font-price-card">
                ₹{product.price.toLocaleString()}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-[13px] text-slate-400 line-through">
                  ₹{product.mrp.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[11px] text-secondary font-medium">/{product.unit?.split(' ')[0] || 'Unit'}</span>
          </div>

          {/* Action Buttons: Add to Cart & View Product */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/products/${product.id}`}
              className="w-full h-10 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[12px] flex items-center justify-center gap-1 transition-colors cursor-pointer text-center"
            >
              <span>View Product</span>
              <span className="material-symbols-outlined text-[16px]">visibility</span>
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={stockCount < 1}
              className="w-full h-10 px-2 rounded-xl bg-primary-container hover:bg-safety-orange-hover text-white font-bold text-[12px] flex items-center justify-center gap-1 shadow-xs transition-all active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[17px]">shopping_cart</span>
              <span>{stockCount > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
