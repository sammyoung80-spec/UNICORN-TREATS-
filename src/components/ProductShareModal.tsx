import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Send,
} from 'lucide-react';
import { ProductItem } from '../data/config';
import { triggerCelebrationConfetti } from '../utils/confetti';

interface ProductShareModalProps {
  product: ProductItem | {
    id: string;
    name: string;
    formattedPrice: string;
    subtitle?: string;
    description?: string;
    image?: string;
    category?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  accentType?: 'brownie' | 'cookie' | 'combo';
}

export const ProductShareModal: React.FC<ProductShareModalProps> = ({
  product,
  isOpen,
  onClose,
  accentType = 'brownie',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product) return null;

  // Construct absolute product link with hash anchor
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const productUrl = `${origin}${pathname}#product-${product.id}`;

  const shareText = `Check out the delicious ${product.name} (${product.formattedPrice}) from Unicorn Treats by Jolene! 🦄✨ Homemade with fresh ingredients and big dreams.`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(productUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = productUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      triggerCelebrationConfetti();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — Unicorn Treats by Jolene`,
          text: shareText,
          url: productUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  const shareChannels = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      bg: 'bg-emerald-600 hover:bg-emerald-500',
      color: 'text-white',
      getUrl: () =>
        `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${productUrl}`)}`,
    },
    {
      name: 'X (Twitter)',
      icon: () => (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      bg: 'bg-black hover:bg-neutral-800 border border-neutral-700',
      color: 'text-white',
      getUrl: () =>
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `Craving homemade sweets? Check out ${product.name} (${product.formattedPrice}) from Unicorn Treats by Jolene! 🦄🍪`
        )}&url=${encodeURIComponent(productUrl)}`,
    },
    {
      name: 'Facebook',
      icon: () => (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      bg: 'bg-[#1877F2] hover:bg-[#166fe5]',
      color: 'text-white',
      getUrl: () =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    },
    {
      name: 'Pinterest',
      icon: () => (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      ),
      bg: 'bg-[#E60023] hover:bg-[#c9001f]',
      color: 'text-white',
      getUrl: () =>
        `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          productUrl
        )}&description=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      bg: 'bg-[#229ED9] hover:bg-[#1d8bc0]',
      color: 'text-white',
      getUrl: () =>
        `https://t.me/share/url?url=${encodeURIComponent(
          productUrl
        )}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#140804] border border-[#F4C95D]/40 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-[#FFF4DE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#FFF4DE]/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F45AA8] to-[#FF9ACB] flex items-center justify-center text-white shadow-md">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFF4DE]">
              Share This Treat
            </h3>
            <p className="text-xs text-[#F4C95D] font-script text-base -mt-1">
              Spread the sweetness with friends & family!
            </p>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="mt-5 p-3.5 rounded-2xl bg-[#24130D]/80 border border-[#F4C95D]/30 flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/40 border border-[#FFF4DE]/10 shrink-0 flex items-center justify-center text-2xl">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : accentType === 'brownie' ? (
              '🍫'
            ) : accentType === 'cookie' ? (
              '🍪'
            ) : (
              '🎁'
            )}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9ACB] px-2 py-0.5 rounded-full bg-[#F45AA8]/20 border border-[#F45AA8]/30">
              {product.category || (accentType === 'brownie' ? 'Signature Brownie' : 'Signature Cookie')}
            </span>
            <h4 className="font-serif text-sm font-bold text-[#FFF4DE] truncate mt-1">
              {product.name}
            </h4>
            <p className="text-xs font-price font-extrabold text-[#F4C95D]">
              {product.formattedPrice}
            </p>
          </div>
        </div>

        {/* Social Share Grid */}
        <div className="mt-5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFF4DE]/60 block mb-2.5">
            Share Directly To:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {shareChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.name}
                  href={channel.getUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerCelebrationConfetti()}
                  className={`p-3 rounded-2xl ${channel.bg} ${channel.color} flex flex-col items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95 text-center shadow-md`}
                  title={`Share on ${channel.name}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-semibold leading-tight">
                    {channel.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Copy Link Input & Button */}
        <div className="mt-5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#FFF4DE]/60 block mb-2">
            Or Copy Direct Link:
          </label>
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-[#FFF4DE]/15 focus-within:border-[#F4C95D] transition-colors">
            <input
              type="text"
              readOnly
              value={productUrl}
              className="bg-transparent text-xs text-[#FFF4DE]/80 px-2 py-1.5 flex-1 focus:outline-none font-mono truncate"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
                copied
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-[#F45AA8] to-[#FF9ACB] text-white hover:brightness-105'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Native Share Trigger if supported */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="mt-4 w-full py-2.5 rounded-2xl bg-[#24130D] hover:bg-[#341b13] border border-[#F4C95D]/40 text-[#F4C95D] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F45AA8]" />
            <span>Open Native Share Options</span>
          </button>
        )}
      </div>
    </div>
  );
};
