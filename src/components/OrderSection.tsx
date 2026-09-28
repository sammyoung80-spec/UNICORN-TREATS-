import React, { useState } from 'react';
import { BRAND_CONFIG } from '../data/config';
import { BrushStroke } from './BrushStroke';
import { useOrder } from '../context/OrderContext';
import {
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Sparkles,
  ShoppingBag,
  Send,
  CheckCircle2,
  Info,
  Heart,
} from 'lucide-react';
import { triggerCelebrationConfetti } from '../utils/confetti';
import { PWAInstallButton } from './PWAInstallButton';
import { useAdmin } from '../context/AdminContext';
import { InlineEditable } from './admin/InlineEditable';

export const OrderSection: React.FC = () => {
  const { openDrawer, totalCount, cart, totalPrice } = useOrder();
  const { config, updateBrandText, addCustomerMessage } = useAdmin();
  const [modalNotice, setModalNotice] = useState<{ title: string; content: string } | null>(null);

  // Quick inquiry form states
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam bot trap
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const contact = config.contact;

  const isRealPhone =
    contact.phoneNumber &&
    !contact.phoneNumber.includes('[') &&
    !contact.phoneNumber.includes('PHONE');

  const isRealWhatsApp =
    contact.whatsappNumber &&
    !contact.whatsappNumber.includes('[') &&
    !contact.whatsappNumber.includes('WHATSAPP');

  const isRealInstagram =
    contact.instagramHandle &&
    !contact.instagramHandle.includes('[') &&
    !contact.instagramHandle.includes('INSTAGRAM');

  const isRealFacebook =
    contact.facebookPage &&
    !contact.facebookPage.includes('[') &&
    !contact.facebookPage.includes('FACEBOOK');

  const handleWhatsApp = (e: React.MouseEvent) => {
    triggerCelebrationConfetti({
      x: e.clientX / window.innerWidth,
      y: Math.min(0.8, e.clientY / window.innerHeight),
    });
    if (isRealWhatsApp) {
      const clean = contact.whatsappNumber.replace(/[^0-9]/g, '');
      window.open(
        `https://wa.me/${clean}?text=${encodeURIComponent(
          "Hi Jolene! 🦄 I'd like to place an order from Unicorn Treats!"
        )}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      setModalNotice({
        title: 'WhatsApp Ordering',
        content: `WhatsApp number is currently set to placeholder ${contact.whatsappNumber}. Once Jolene updates this in src/data/config.ts, this will automatically launch WhatsApp with your pre-filled treat order! You can also click "View Treat Bag" to copy your order summary right now.`,
      });
    }
  };

  const handleCall = (e: React.MouseEvent) => {
    triggerCelebrationConfetti({
      x: e.clientX / window.innerWidth,
      y: Math.min(0.8, e.clientY / window.innerHeight),
    });
    if (isRealPhone) {
      window.location.href = `tel:${contact.phoneNumber.replace(/[^0-9+]/g, '')}`;
    } else {
      setModalNotice({
        title: 'Phone Calling',
        content: `Phone number is currently set to placeholder ${contact.phoneNumber}. You can update this in src/data/config.ts anytime!`,
      });
    }
  };

  const handleInstagram = (e: React.MouseEvent) => {
    triggerCelebrationConfetti({
      x: e.clientX / window.innerWidth,
      y: Math.min(0.8, e.clientY / window.innerHeight),
    });
    if (isRealInstagram && contact.instagramUrl) {
      window.open(contact.instagramUrl, '_blank', 'noopener,noreferrer');
    } else {
      setModalNotice({
        title: 'Instagram DM',
        content: `Instagram handle is currently set to placeholder ${contact.instagramHandle}. Update in src/data/config.ts to direct followers right to your profile!`,
      });
    }
  };

  const handleFacebook = (e: React.MouseEvent) => {
    triggerCelebrationConfetti({
      x: e.clientX / window.innerWidth,
      y: Math.min(0.8, e.clientY / window.innerHeight),
    });
    if (isRealFacebook && contact.facebookUrl) {
      window.open(contact.facebookUrl, '_blank', 'noopener,noreferrer');
    } else {
      setModalNotice({
        title: 'Facebook Page',
        content: `Facebook page is currently set to placeholder ${contact.facebookPage}. Update in src/data/config.ts to connect your page!`,
      });
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Spam honeypot check
    if (honeypot) {
      return; // Silently drop bot submission
    }

    if (!formName.trim() || !formContact.trim()) {
      setFormError('Please provide your name and contact details (phone or email).');
      return;
    }

    if (formName.length > 80 || formContact.length > 80 || formNotes.length > 500) {
      setFormError('Input exceeds maximum allowed length.');
      return;
    }

    setIsSubmitting(true);

    // Save message persistently in Admin Backend Inbox
    addCustomerMessage({
      customerName: formName.trim(),
      customerContact: formContact.trim(),
      notes: formNotes.trim(),
      items: cart.length > 0 ? cart.map((i) => `${i.quantity}x ${i.name}`) : undefined,
      totalEstimate: cart.length > 0 ? totalPrice : undefined,
    });

    // Trigger joyful celebration confetti
    triggerCelebrationConfetti();

    // Simulate safe local reservation queue
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormName('');
      setFormContact('');
      setFormNotes('');
    }, 700);
  };

  return (
    <section
      id="order"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#080302] via-[#1a0c07] to-[#050505] overflow-hidden border-t border-[#F4C95D]/20"
    >
      {/* Background glow ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-r from-[#F45AA8]/10 via-[#F4C95D]/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title with Flyer Pink Ribbon */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="mb-4">
            <BrushStroke variant="pink" size="lg">
              <span>Place Your Order</span>
            </BrushStroke>
          </div>

          {/* Flyer Subtitle: DM • TEXT • CALL */}
          <p className="font-serif text-2xl sm:text-3xl font-black tracking-widest text-[#FFF4DE] uppercase mt-4">
            DM <span className="text-[#F45AA8]">✦</span> TEXT <span className="text-[#F4C95D]">✦</span> CALL
          </p>

          <p className="font-script text-xl sm:text-2xl text-[#FF9ACB] mt-1">
            Follow for new flavors, updates & specials!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT: DIRECT CONTACT CHANNELS (As on Flyer) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1e0f09] to-[#0a0503] border border-[#F4C95D]/30 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#F4C95D]" />
                <span className="text-xs uppercase tracking-widest font-bold text-[#F4C95D]">
                  Quick Order Channels
                </span>
              </div>

              <h3 className="font-serif text-3xl font-bold text-[#FFF4DE]">
                How Would You Like to Connect?
              </h3>

              <p className="text-sm text-[#FFF4DE]/70 mt-3 font-sans leading-relaxed">
                Whether you need a box of warm fudgy brownies for tonight or a dozen cookies for an upcoming birthday celebration, reaching Jolene is easy!
              </p>

              {/* Treat Bag / Cart Status */}
              <div className="mt-6 p-4 rounded-2xl bg-black/50 border border-[#F45AA8]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F45AA8]/20 text-[#F45AA8] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#FFF4DE]">
                      Current Treat Bag ({totalCount} items)
                    </p>
                    <p className="text-[11px] text-[#FF9ACB]">
                      Ready to build your message
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openDrawer}
                  className="px-4 py-2 rounded-xl bg-[#F45AA8] hover:bg-[#ff70b7] text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  View Bag
                </button>
              </div>

              {/* 4 Primary Channel Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="p-4 rounded-2xl bg-[#162e20] hover:bg-[#1e3d2b] border border-emerald-500/40 text-emerald-300 font-bold text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 shadow-md"
                >
                  <MessageCircle className="w-6 h-6 text-emerald-400" />
                  <span>WhatsApp</span>
                  <span className="text-[10px] text-emerald-400/70 font-mono font-normal">
                    {contact.whatsappNumber}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleCall}
                  className="p-4 rounded-2xl bg-[#24130D] hover:bg-[#341b13] border border-[#F4C95D]/40 text-[#F4C95D] font-bold text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 shadow-md"
                >
                  <Phone className="w-6 h-6 text-[#F4C95D]" />
                  <span>Call / Text</span>
                  <span className="text-[10px] text-[#F4C95D]/70 font-mono font-normal">
                    {contact.phoneNumber}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleInstagram}
                  className="p-4 rounded-2xl bg-gradient-to-br from-[#2e1021] to-[#1a0812] hover:brightness-110 border border-[#F45AA8]/40 text-[#FF9ACB] font-bold text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 shadow-md"
                >
                  <Instagram className="w-6 h-6 text-[#F45AA8]" />
                  <span>Instagram</span>
                  <span className="text-[10px] text-[#FF9ACB]/70 font-mono font-normal">
                    {contact.instagramHandle}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleFacebook}
                  className="p-4 rounded-2xl bg-[#101b2e] hover:bg-[#16253e] border border-blue-400/40 text-blue-300 font-bold text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 shadow-md"
                >
                  <Facebook className="w-6 h-6 text-blue-400" />
                  <span>Facebook</span>
                  <span className="text-[10px] text-blue-400/70 font-mono font-normal">
                    {contact.facebookPage}
                  </span>
                </button>
              </div>

              {/* PWA Home Screen Install Shortcut */}
              <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-[#24130D] to-[#1a0c07] border border-[#F4C95D]/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">📱</span>
                  <div>
                    <p className="text-xs font-bold text-[#FFF4DE]">
                      Install App on Home Screen
                    </p>
                    <p className="text-[10px] text-[#FF9ACB] font-sans">
                      One-tap access to fresh menus & birthday specials
                    </p>
                  </div>
                </div>
                <PWAInstallButton variant="nav" />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#FFF4DE]/10 text-center">
              <p className="text-xs text-[#FFF4DE]/50 font-sans">
                {contact.locationNote} · Small batch baking with fresh ingredients
              </p>
            </div>
          </div>

          {/* RIGHT: INQUIRY & PRE-ORDER FORM */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#180a06] to-[#070302] border border-[#F45AA8]/30 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-[#F45AA8]" />
                <span className="text-xs uppercase tracking-widest font-bold text-[#F45AA8]">
                  Custom Orders & Questions
                </span>
              </div>

              <h3 className="font-serif text-3xl font-bold text-[#FFF4DE]">
                Send Jolene a Direct Note
              </h3>

              <p className="text-sm text-[#FFF4DE]/70 mt-2 font-sans">
                Have a special birthday request, allergen questions, or want a custom mix box? Leave your note below!
              </p>

              {isSubmitted ? (
                <div className="mt-8 p-6 rounded-2xl bg-[#162e20] border border-emerald-500/40 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="font-serif text-2xl font-bold text-[#FFF4DE]">
                    Thank You for Supporting My Dream!
                  </h4>
                  <p className="text-xs text-[#FFF4DE]/80 mt-2 font-sans max-w-sm mx-auto">
                    Your inquiry has been recorded. Jolene will follow up with you as soon as the oven timers chime!
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
                  {/* Anti-Spam Honeypot (Hidden from human users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website-hp">Leave this empty</label>
                    <input
                      id="website-hp"
                      type="text"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#FFF4DE]/70 mb-1.5">
                      Your Name <span className="text-[#F45AA8]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      maxLength={80}
                      placeholder="e.g. Maya Lin"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE] text-sm placeholder:text-[#FFF4DE]/30 focus:outline-none focus:border-[#F4C95D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#FFF4DE]/70 mb-1.5">
                      Phone Number or Email <span className="text-[#F45AA8]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formContact}
                      onChange={(e) => setFormContact(e.target.value)}
                      maxLength={80}
                      placeholder="e.g. (555) 019-2834 or maya@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE] text-sm placeholder:text-[#FFF4DE]/30 focus:outline-none focus:border-[#F4C95D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#FFF4DE]/70 mb-1.5">
                      Order Details or Flavors You'd Like
                    </label>
                    <textarea
                      rows={3}
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      maxLength={500}
                      placeholder="Tell us about your event, favorite brownie/cookie flavors, or date needed..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE] text-sm placeholder:text-[#FFF4DE]/30 focus:outline-none focus:border-[#F4C95D]"
                    />
                  </div>

                  {formError && (
                    <p className="text-xs text-red-400 font-medium">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] via-[#FF9ACB] to-[#F45AA8] text-white shadow-[0_4px_20px_rgba(244,90,168,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending note...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Order Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#FFF4DE]/10 text-center">
              <p className="text-xs text-[#FFF4DE]/40 font-script text-base">
                Sweet Treats • Big Dreams ♡
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Friendly Informational Modal for Placeholders */}
      {modalNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full p-6 rounded-3xl bg-[#1c0d08] border border-[#F4C95D]/40 shadow-2xl text-center">
            <Info className="w-10 h-10 text-[#F4C95D] mx-auto mb-3" />
            <h4 className="font-serif text-2xl font-bold text-[#FFF4DE]">
              {modalNotice.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#FFF4DE]/80 mt-3 font-sans leading-relaxed">
              {modalNotice.content}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  setModalNotice(null);
                  openDrawer();
                }}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] to-[#FF9ACB] text-white shadow-md"
              >
                View Treat Bag
              </button>
              <button
                type="button"
                onClick={() => setModalNotice(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#24130D] text-[#FFF4DE] border border-[#FFF4DE]/20"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
