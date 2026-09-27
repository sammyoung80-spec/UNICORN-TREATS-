import React, { useState, useEffect } from 'react';
import { UnicornLogo } from './UnicornLogo';
import { useOrder } from '../context/OrderContext';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';
import { PWAInstallButton } from './PWAInstallButton';
import { triggerCelebrationConfetti } from '../utils/confetti';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, openDrawer } = useOrder();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderCTAClick = (e: React.MouseEvent) => {
    triggerCelebrationConfetti({
      x: e.clientX / window.innerWidth,
      y: Math.min(0.8, e.clientY / window.innerHeight),
    });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Story', href: '#story' },
    { label: 'Brownies', href: '#brownies' },
    { label: 'Cookies', href: '#cookies' },
    { label: 'Special Flavors', href: '#flavors' },
    { label: 'Combos', href: '#combos' },
    { label: 'Order', href: '#order' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-[#F4C95D]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Lockup */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45AA8] rounded-lg"
          aria-label="Unicorn Treats Home"
        >
          <UnicornLogo size={42} className="group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-black tracking-wider uppercase text-[#FFF4DE] leading-tight">
              Unicorn <span className="text-[#F45AA8]">Treats</span>
            </span>
            <span className="font-script text-xs sm:text-sm text-[#F4C95D] -mt-0.5 tracking-wide">
              by Jolene
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-widest font-semibold text-[#FFF4DE]/80 hover:text-[#F4C95D] transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45AA8] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action: PWA Install, Cart Drawer & Order CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* PWA In-App Install Button */}
          <PWAInstallButton variant="nav" className="hidden sm:inline-flex" />

          {/* Order / Cart Trigger */}
          <button
            type="button"
            onClick={openDrawer}
            className="relative p-2 rounded-xl bg-[#24130D]/80 border border-[#F4C95D]/30 text-[#FFF4DE] hover:border-[#F45AA8] hover:text-[#F45AA8] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45AA8]"
            aria-label={`View your treat bag with ${totalCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#F45AA8] text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-md">
                {totalCount}
              </span>
            )}
          </button>

          {/* Desktop Order Now Button with Confetti */}
          <a
            href="#order"
            onClick={handleOrderCTAClick}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] via-[#FF9ACB] to-[#F45AA8] text-white shadow-[0_4px_16px_rgba(244,90,168,0.4)] hover:shadow-[0_6px_20px_rgba(244,90,168,0.6)] hover:brightness-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C95D]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Now</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-xl text-[#FFF4DE] hover:text-[#F45AA8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45AA8]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0705]/98 border-b border-[#F4C95D]/20 px-6 py-6 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest font-semibold text-[#FFF4DE] hover:text-[#F4C95D] py-1 border-b border-[#FFF4DE]/5"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-2.5">
              <PWAInstallButton variant="cta" className="w-full justify-center" />

              <a
                href="#order"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleOrderCTAClick(e);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] to-[#FF9ACB] text-white shadow-md active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Place Your Order</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
