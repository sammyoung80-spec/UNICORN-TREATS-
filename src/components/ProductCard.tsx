import React, { useState } from 'react';
import { ProductItem } from '../data/config';
import { useOrder } from '../context/OrderContext';
import { Sparkles, Heart, Plus, Check } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ProductCardProps {
  product: ProductItem;
  imageFallbackSrc?: string;
  accentType?: 'brownie' | 'cookie';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  imageFallbackSrc,
  accentType = 'brownie',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useOrder();
  const reducedMotion = useReducedMotion();

  const handleFlipToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // If pressing on card itself (not on the nested button), flip
      if ((e.target as HTMLElement).tagName !== 'BUTTON') {
        e.preventDefault();
        handleFlipToggle();
      }
    }
  };

  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const isBrownie = accentType === 'brownie';

  return (
    <div
      className="group relative h-[360px] w-full perspective-1000 cursor-pointer select-none"
      onClick={handleFlipToggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`${product.name} - ${product.formattedPrice}. Click or tap to view price and order.`}
    >
      {/* 3D Flipping Container */}
      <div
        className={`relative w-full h-full duration-700 ease-out transform-style-3d transition-transform ${
          reducedMotion
            ? isFlipped ? 'opacity-95' : 'opacity-100'
            : isFlipped
            ? 'rotate-y-180 shadow-[0_20px_40px_rgba(244,90,168,0.25)]'
            : 'group-hover:rotate-y-180 group-hover:shadow-[0_20px_40px_rgba(244,201,93,0.2)]'
        }`}
      >
        {/* ================= FRONT OF CARD ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col justify-between overflow-hidden backface-hidden border transition-all duration-300 ${
            product.isSpecial
              ? 'bg-gradient-to-b from-[#2e121a] via-[#1a0a0f] to-[#0a0507] border-[#F45AA8]/60 shadow-[0_10px_30px_rgba(244,90,168,0.2)]'
              : 'bg-gradient-to-b from-[#24130D] via-[#150a06] to-[#050505] border-[#F4C95D]/25 hover:border-[#F4C95D]/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          }`}
        >
          {/* Subtle background ambient glow */}
          <div
            className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-20"
            style={{
              backgroundColor: isBrownie ? '#F4C95D' : '#FF9ACB',
            }}
          />

          {/* Card Top: Category & Decorative Icon */}
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[#FFF4DE]/70">
              {product.category}
            </span>
            <div className="flex items-center gap-1.5 text-[#F4C95D]">
              {product.isSpecial ? (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#F45AA8] text-white px-2 py-0.5 rounded-full shadow-sm">
                  <Sparkles className="w-3 h-3" /> Special
                </span>
              ) : (
                <Heart className="w-3.5 h-3.5 text-[#FF9ACB]/80 fill-[#FF9ACB]/40" />
              )}
            </div>
          </div>

          {/* Center Graphic / Dessert Visual Badge */}
          <div className="my-auto py-2 flex flex-col items-center justify-center text-center relative z-10">
            <div className="relative w-28 h-28 mb-3 rounded-xl overflow-hidden border border-[#FFF4DE]/10 shadow-[0_8px_20px_rgba(0,0,0,0.8)] flex items-center justify-center bg-[#150a06]">
              {imageFallbackSrc ? (
                <img
                  src={imageFallbackSrc}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-3xl mb-1">{isBrownie ? '🍫' : '🍪'}</span>
                  <span className="text-[10px] text-[#FFF4DE]/60 font-mono tracking-tight">Handcrafted</span>
                </div>
              )}
              {/* Corner Gold Accent */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#F4C95D] rounded-tr" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#F4C95D] rounded-bl" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF4DE] leading-tight group-hover:text-[#F4C95D] transition-colors">
              {product.name}
            </h3>

            <p className="font-script text-sm sm:text-base text-[#FF9ACB] mt-0.5">
              {product.subtitle}
            </p>
          </div>

          {/* Card Bottom Hint: Tap/Hover to flip */}
          <div className="border-t border-[#FFF4DE]/10 pt-3 flex items-center justify-between text-xs text-[#FFF4DE]/50 z-10">
            <span className="line-clamp-1 italic text-[11px]">{product.description}</span>
            <span className="ml-2 shrink-0 text-[#F4C95D] text-[11px] font-medium hidden sm:inline">
              Hover for price →
            </span>
            <span className="ml-2 shrink-0 text-[#F4C95D] text-[11px] font-medium sm:hidden">
              Tap for price →
            </span>
          </div>
        </div>

        {/* ================= BACK OF CARD ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col justify-between overflow-hidden rotate-y-180 backface-hidden border ${
            product.isSpecial
              ? 'bg-gradient-to-b from-[#3a101f] via-[#1f0912] to-[#0d0407] border-[#F45AA8] shadow-[0_15px_35px_rgba(244,90,168,0.35)]'
              : 'bg-gradient-to-b from-[#2e1810] via-[#1a0c07] to-[#0a0503] border-[#F4C95D] shadow-[0_15px_35px_rgba(244,201,93,0.25)]'
          }`}
        >
          {/* Subtle inner gold frame */}
          <div className="absolute inset-1.5 border border-[#F4C95D]/30 rounded-xl pointer-events-none" />

          {/* Top header */}
          <div className="text-center pt-2 z-10">
            <p className="text-[10px] uppercase tracking-widest text-[#FF9ACB] font-semibold">
              {product.category}
            </p>
            <h4 className="font-serif text-lg font-bold text-[#FFF4DE] leading-tight mt-0.5">
              {product.name}
            </h4>
          </div>

          {/* Center: Large Collectible Price Tag */}
          <div className="flex flex-col items-center justify-center my-auto py-2 z-10">
            <div className="relative p-4 rounded-2xl bg-black/60 border border-[#F4C95D]/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] text-center min-w-[160px]">
              <div className="text-[9px] uppercase tracking-widest text-[#F4C95D] font-bold mb-0.5">
                Fresh Baked Price
              </div>
              <div className="font-price text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#F4C95D] to-[#E5A826] drop-shadow-[0_2px_10px_rgba(244,201,93,0.4)]">
                {product.formattedPrice}
              </div>
              <div className="text-[10px] text-[#FFF4DE]/60 mt-1 font-script">
                Single portion • Baked with love
              </div>
            </div>
          </div>

          {/* Bottom Action: ORDER THIS FLAVOR */}
          <div className="pb-1 z-10">
            <button
              type="button"
              onClick={handleOrderClick}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                justAdded
                  ? 'bg-emerald-500 text-white shadow-emerald-500/40'
                  : 'bg-gradient-to-r from-[#F45AA8] via-[#FF9ACB] to-[#F45AA8] text-white hover:brightness-110 active:scale-95 shadow-[0_4px_16px_rgba(244,90,168,0.4)]'
              }`}
              aria-label={`Add ${product.name} at ${product.formattedPrice} to order`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" /> Added to Order!
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Order This Flavor
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-[#FFF4DE]/40 mt-1.5 font-sans">
              Tap anywhere to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
