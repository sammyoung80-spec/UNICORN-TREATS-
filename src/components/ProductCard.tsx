import React, { useState, useEffect } from 'react';
import { ProductItem } from '../data/config';
import { useOrder } from '../context/OrderContext';
import { useAdmin } from '../context/AdminContext';
import { Sparkles, Heart, Plus, Check, Trash2, Edit2, Share2, Camera, Upload } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { InlineEditable } from './admin/InlineEditable';
import { ProductShareModal } from './ProductShareModal';

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isDragOverImg, setIsDragOverImg] = useState(false);

  const { addToCart } = useOrder();
  const {
    isEditMode,
    isAdminLoggedIn,
    updateProduct,
    deleteProduct,
    dimensions,
    openMediaPicker,
    uploadFileToMedia,
  } = useAdmin();
  const reducedMotion = useReducedMotion();

  // Listen for hash highlight (e.g. #product-b-classic)
  useEffect(() => {
    const checkHash = () => {
      if (typeof window !== 'undefined' && window.location.hash === `#product-${product.id}`) {
        setIsHighlighted(true);
        const timer = setTimeout(() => setIsHighlighted(false), 3500);
        return () => clearTimeout(timer);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [product.id]);

  const handleFlipToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if ((e.target as HTMLElement).tagName !== 'BUTTON' && (e.target as HTMLElement).tagName !== 'INPUT') {
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

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete ${product.name}?`)) {
      deleteProduct(product.id, accentType);
    }
  };

  const handleImagePicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    openMediaPicker({ type: 'product', id: product.id });
  };

  const handleImageDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOverImg(false);
    if (!isEditMode || !isAdminLoggedIn) return;

    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith('image/')) {
      try {
        const uploadedUrl = await uploadFileToMedia(files[0]);
        updateProduct(product.id, accentType, { image: uploadedUrl });
      } catch (err) {
        console.error('Error dropping image onto product card:', err);
      }
    }
  };

  const isBrownie = accentType === 'brownie';
  const displayImage = product.image || imageFallbackSrc;

  return (
    <>
      <div
        id={`product-${product.id}`}
        style={{ height: `${dimensions.cardHeight}px` }}
        className={`group relative w-full perspective-1000 cursor-pointer select-none rounded-2xl transition-all duration-500 ${
          isHighlighted ? 'ring-4 ring-[#F4C95D] shadow-[0_0_35px_rgba(244,201,93,0.7)] scale-102' : ''
        }`}
        onClick={handleFlipToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label={`${product.name} - ${product.formattedPrice}. Click or tap to view price and order.`}
      >
        {/* Admin Delete Action Button */}
        {isEditMode && isAdminLoggedIn && (
          <button
            type="button"
            onClick={handleDelete}
            className="absolute -top-3 -right-3 z-30 p-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg transition-transform hover:scale-110"
            title="Delete product"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* 3D Flipping Container */}
        <div
          className={`relative w-full h-full duration-700 ease-out transform-style-3d transition-transform ${
            reducedMotion
              ? isFlipped
                ? 'opacity-95'
                : 'opacity-100'
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

            {/* Card Top: Category, Share Button & Decorative Badges */}
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#FFF4DE]/70">
                {product.category}
              </span>

              <div className="flex items-center gap-2">
                {/* Social Share Button */}
                <button
                  type="button"
                  onClick={handleShareClick}
                  className="p-1.5 rounded-full bg-black/50 hover:bg-[#F45AA8] text-[#FFF4DE]/80 hover:text-white border border-[#FFF4DE]/15 hover:border-[#F45AA8] transition-all hover:scale-110 active:scale-95 shadow-sm"
                  title={`Share ${product.name} with friends on social media`}
                  aria-label={`Share ${product.name}`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

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
            </div>

            {/* Center Graphic / Dessert Visual Badge */}
            <div className="my-auto py-2 flex flex-col items-center justify-center text-center relative z-10">
              <div
                className={`relative w-28 h-28 mb-3 rounded-xl overflow-hidden border shadow-[0_8px_20px_rgba(0,0,0,0.8)] flex items-center justify-center bg-[#150a06] transition-all ${
                  isDragOverImg
                    ? 'border-[#F45AA8] ring-4 ring-[#F45AA8]/50 scale-105'
                    : 'border-[#FFF4DE]/15'
                }`}
                onDragOver={(e) => {
                  if (isEditMode && isAdminLoggedIn) {
                    e.preventDefault();
                    setIsDragOverImg(true);
                  }
                }}
                onDragLeave={() => setIsDragOverImg(false)}
                onDrop={handleImageDrop}
              >
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-3xl mb-1">{isBrownie ? '🍫' : '🍪'}</span>
                    <span className="text-[10px] text-[#FFF4DE]/60 font-mono tracking-tight">
                      Handcrafted
                    </span>
                  </div>
                )}

                {/* Admin Live Edit Mode: Change Picture Trigger */}
                {isEditMode && isAdminLoggedIn && (
                  <button
                    type="button"
                    onClick={handleImagePicker}
                    className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1 text-center"
                    title="Change picture from media library or drag & drop a file here"
                  >
                    <Camera className="w-5 h-5 text-[#F4C95D]" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#F45AA8] px-2 py-0.5 rounded-full">
                      Change Photo
                    </span>
                  </button>
                )}

                {/* Corner Gold Accent */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#F4C95D] rounded-tr pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#F4C95D] rounded-bl pointer-events-none" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF4DE] leading-tight group-hover:text-[#F4C95D] transition-colors">
                <InlineEditable
                  value={product.name}
                  onSave={(v) => updateProduct(product.id, accentType, { name: v })}
                />
              </h3>

              <p className="font-script text-sm sm:text-base text-[#FF9ACB] mt-0.5">
                <InlineEditable
                  value={product.subtitle}
                  onSave={(v) => updateProduct(product.id, accentType, { subtitle: v })}
                />
              </p>
            </div>

            {/* Card Bottom Hint: Tap/Hover to flip */}
            <div className="border-t border-[#FFF4DE]/10 pt-3 flex items-center justify-between text-xs text-[#FFF4DE]/50 z-10">
              <span className="line-clamp-1 italic text-[11px]">
                <InlineEditable
                  value={product.description}
                  onSave={(v) => updateProduct(product.id, accentType, { description: v })}
                />
              </span>
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

            {/* Top header with Share Action */}
            <div className="flex items-center justify-between pt-1 px-1 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#FF9ACB] font-semibold">
                  {product.category}
                </p>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#FFF4DE] leading-tight">
                  {product.name}
                </h4>
              </div>

              <button
                type="button"
                onClick={handleShareClick}
                className="p-1.5 rounded-full bg-black/60 hover:bg-[#F45AA8] text-[#FFF4DE]/80 hover:text-white border border-[#FFF4DE]/20 transition-all hover:scale-110 active:scale-95 shadow-sm"
                title={`Share ${product.name}`}
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Center: Large Collectible Price Tag */}
            <div className="flex flex-col items-center justify-center my-auto py-2 z-10">
              <div className="relative p-4 rounded-2xl bg-black/60 border border-[#F4C95D]/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] text-center min-w-[160px]">
                <div className="text-[9px] uppercase tracking-widest text-[#F4C95D] font-bold mb-0.5">
                  Fresh Baked Price
                </div>
                <div className="font-price text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#F4C95D] to-[#E5A826] drop-shadow-[0_2px_10px_rgba(244,201,93,0.4)]">
                  <InlineEditable
                    value={product.formattedPrice}
                    onSave={(v) => {
                      const num = parseFloat(v.replace(/[^0-9.]/g, '')) || product.price;
                      updateProduct(product.id, accentType, { price: num, formattedPrice: v });
                    }}
                  />
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
                    <Plus className="w-4 h-4" /> Add to Treat Bag
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Share Modal */}
      <ProductShareModal
        product={product}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        accentType={accentType}
      />
    </>
  );
};
