import React from 'react';
import { UnicornLogo } from './UnicornLogo';
import { BRAND_CONFIG } from '../data/config';
import { Instagram, Facebook, MessageCircle, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Story', href: '#story' },
    { label: 'Brownies', href: '#brownies' },
    { label: 'Cookies', href: '#cookies' },
    { label: 'Flavors', href: '#flavors' },
    { label: 'Combos', href: '#combos' },
    { label: 'Order', href: '#order' },
  ];

  return (
    <footer className="relative bg-[#030101] border-t border-[#FFF4DE]/10 py-16 text-[#FFF4DE]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#FFF4DE]/10">
          
          {/* Brand lockup */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <UnicornLogo size={46} />
              <div>
                <p className="font-serif text-2xl font-bold uppercase tracking-wide text-[#FFF4DE]">
                  Unicorn <span className="text-[#F45AA8]">Treats</span>
                </p>
                <p className="font-script text-base text-[#F4C95D] -mt-1">
                  by Jolene
                </p>
              </div>
            </div>
            <p className="font-price text-xs uppercase tracking-widest font-bold text-[#FF9ACB] mt-2">
              {BRAND_CONFIG.tagline}
            </p>
            <p className="text-xs text-[#FFF4DE]/50 mt-1 max-w-sm">
              Homemade treats made with fresh ingredients, real chocolate, and endless love.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-wider font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#F4C95D] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href="#order"
              aria-label="Instagram page placeholder"
              className="w-10 h-10 rounded-full bg-[#180804] border border-[#FFF4DE]/15 flex items-center justify-center hover:text-[#F45AA8] hover:border-[#F45AA8] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#order"
              aria-label="Facebook page placeholder"
              className="w-10 h-10 rounded-full bg-[#180804] border border-[#FFF4DE]/15 flex items-center justify-center hover:text-[#3b82f6] hover:border-[#3b82f6] transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#order"
              aria-label="WhatsApp direct link placeholder"
              className="w-10 h-10 rounded-full bg-[#180804] border border-[#FFF4DE]/15 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full bg-[#24130D] border border-[#F4C95D]/30 text-[#F4C95D] flex items-center justify-center hover:bg-[#F4C95D] hover:text-[#24130D] transition-all ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF4DE]/50 gap-4 text-center sm:text-left">
          <p>© 2026 Unicorn Treats by Jolene. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1 font-script text-base text-[#FF9ACB]">
            <span>Turning 15 on October 23rd</span>
            <Heart className="w-3.5 h-3.5 fill-[#F45AA8] text-[#F45AA8]" />
            <span>Support a young entrepreneur!</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
