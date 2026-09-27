import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { BRAND_CONFIG } from '../data/config';
import { X, Trash2, Plus, Minus, Send, Phone, MessageSquare, Copy, Check, Info } from 'lucide-react';
import { triggerCelebrationConfetti } from '../utils/confetti';

export const OrderDrawer: React.FC = () => {
  const {
    cart,
    isOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    generateOrderMessage,
  } = useOrder();

  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [placeholderNotice, setPlaceholderNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const orderText = `${generateOrderMessage()}${
    customerName ? `\nCustomer: ${customerName}` : ''
  }${customerNote ? `\nNote: ${customerNote}` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(orderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isRealPhone =
    BRAND_CONFIG.contact.phoneNumber &&
    !BRAND_CONFIG.contact.phoneNumber.includes('[') &&
    !BRAND_CONFIG.contact.phoneNumber.includes('PHONE');

  const isRealWhatsApp =
    BRAND_CONFIG.contact.whatsappNumber &&
    !BRAND_CONFIG.contact.whatsappNumber.includes('[') &&
    !BRAND_CONFIG.contact.whatsappNumber.includes('WHATSAPP');

  const isRealInstagram =
    BRAND_CONFIG.contact.instagramHandle &&
    !BRAND_CONFIG.contact.instagramHandle.includes('[') &&
    !BRAND_CONFIG.contact.instagramHandle.includes('INSTAGRAM');

  const isRealFacebook =
    BRAND_CONFIG.contact.facebookPage &&
    !BRAND_CONFIG.contact.facebookPage.includes('[') &&
    !BRAND_CONFIG.contact.facebookPage.includes('FACEBOOK');

  const handleWhatsAppClick = () => {
    triggerCelebrationConfetti();
    if (isRealWhatsApp) {
      const cleanNumber = BRAND_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, '');
      const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(orderText)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setPlaceholderNotice(
        `WhatsApp ordering is configured with placeholder ${BRAND_CONFIG.contact.whatsappNumber}. You can copy the generated order summary and message Jolene directly on your preferred channel!`
      );
    }
  };

  const handleCallClick = () => {
    triggerCelebrationConfetti();
    if (isRealPhone) {
      window.location.href = `tel:${BRAND_CONFIG.contact.phoneNumber.replace(/[^0-9+]/g, '')}`;
    } else {
      setPlaceholderNotice(
        `Phone ordering is currently set to placeholder ${BRAND_CONFIG.contact.phoneNumber}. You can update this in src/data/config.ts anytime!`
      );
    }
  };

  const handleInstagramClick = () => {
    if (isRealInstagram && BRAND_CONFIG.contact.instagramUrl) {
      window.open(BRAND_CONFIG.contact.instagramUrl, '_blank', 'noopener,noreferrer');
    } else {
      setPlaceholderNotice(
        `Instagram handle is currently set to placeholder ${BRAND_CONFIG.contact.instagramHandle}. Update in src/data/config.ts to connect directly!`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#120704] border-l border-[#F4C95D]/30 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#F4C95D]/20 flex items-center justify-between bg-[#1f0d07]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#F4C95D] font-bold">
                Your Treat Selection
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FFF4DE] leading-tight">
                Order Summary
              </h3>
            </div>
            <button
              type="button"
              onClick={closeDrawer}
              className="p-2 rounded-xl text-[#FFF4DE]/70 hover:text-white hover:bg-black/40 transition-colors"
              aria-label="Close treat bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Cart Items */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {placeholderNotice && (
              <div className="p-3.5 rounded-xl bg-[#24130D] border border-[#F4C95D]/40 text-xs text-[#FFF4DE] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#F4C95D] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p>{placeholderNotice}</p>
                  <button
                    type="button"
                    onClick={() => setPlaceholderNotice(null)}
                    className="text-[10px] text-[#F45AA8] underline mt-1 block"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-5xl">🧁</span>
                <p className="font-serif text-xl text-[#FFF4DE] font-bold mt-3">
                  Your treat bag is empty!
                </p>
                <p className="text-xs text-[#FFF4DE]/60 mt-1 max-w-xs mx-auto">
                  Browse our brownies and cookies above and tap "Order This Flavor" or combo deals to build your custom box.
                </p>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="mt-6 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#24130D] text-[#F4C95D] border border-[#F4C95D]/30 hover:border-[#F4C95D]"
                >
                  Explore Treats
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-black/40 border border-[#FFF4DE]/10 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-[#FFF4DE] truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#FF9ACB] font-sans">
                          ${item.price.toFixed(2)} each ·{' '}
                          <span className="text-[#F4C95D]">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-[#24130D] text-[#FFF4DE] hover:bg-[#3A1C12] flex items-center justify-center border border-[#FFF4DE]/10 text-xs"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#FFF4DE]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-[#24130D] text-[#FFF4DE] hover:bg-[#3A1C12] flex items-center justify-center border border-[#FFF4DE]/10 text-xs"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="ml-1 text-red-400/70 hover:text-red-400 p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Customer Name & Dietary Notes */}
                <div className="pt-2 border-t border-[#FFF4DE]/10 space-y-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#FFF4DE]/60 mb-1">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Sarah M."
                      maxLength={60}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-black/50 border border-[#FFF4DE]/15 text-[#FFF4DE] placeholder:text-[#FFF4DE]/30 focus:outline-none focus:border-[#F45AA8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#FFF4DE]/60 mb-1">
                      Special Note or Pickup Date (Optional)
                    </label>
                    <input
                      type="text"
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      placeholder="e.g. Pickup on Saturday afternoon"
                      maxLength={120}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-black/50 border border-[#FFF4DE]/15 text-[#FFF4DE] placeholder:text-[#FFF4DE]/30 focus:outline-none focus:border-[#F45AA8]"
                    />
                  </div>
                </div>

                {/* Clear Cart Button */}
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] text-[#FFF4DE]/40 hover:text-red-400 underline block text-center w-full"
                >
                  Clear all items
                </button>
              </>
            )}
          </div>

          {/* Drawer Footer: Total & Ordering Channels */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#F4C95D]/20 bg-[#180804] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#FFF4DE]/60 uppercase tracking-wider font-semibold">
                    Estimated Subtotal
                  </span>
                  <p className="text-[10px] text-[#FF9ACB] font-script">
                    Baked fresh to order
                  </p>
                </div>
                <div className="font-price text-3xl font-black text-[#F4C95D]">
                  ${totalPrice.toFixed(2)}
                </div>
              </div>

              {/* Order Channel Buttons (DM • TEXT • CALL) */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCallClick}
                  className="py-3 px-3 rounded-xl bg-[#24130D] hover:bg-[#3A1C12] text-[#F4C95D] border border-[#F4C95D]/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Jolene</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleInstagramClick}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F45AA8] to-[#9B2C6B] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>DM Instagram</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="py-2.5 px-3 rounded-xl bg-black/60 hover:bg-black/90 text-[#FFF4DE] border border-[#FFF4DE]/20 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Order</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-[#FFF4DE]/40">
                DM • TEXT • CALL · Follow for new flavors, updates & specials!
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
