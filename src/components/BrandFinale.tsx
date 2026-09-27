import React from 'react';
import { BRAND_CONFIG } from '../data/config';
import { UnicornSeal } from './UnicornSeal';
import { BrushStroke } from './BrushStroke';
import { ASSETS } from '../assets/assetMap';
import { Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { triggerCelebrationConfetti } from '../utils/confetti';

export const BrandFinale: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative py-28 sm:py-36 bg-[#050505] overflow-hidden border-t border-[#F4C95D]/20 text-center">
      {/* Soft atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-[#F45AA8]/12 via-[#F4C95D]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Gold Brush Ribbon: Thank you for supporting my dream! */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={reducedMotion ? {} : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <BrushStroke variant="gold" size="lg">
            <span>Thank you for supporting my dream! ♡ ♛</span>
          </BrushStroke>
        </motion.div>

        {/* Big Script Statement: Good Things Are Homemade */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="my-4"
        >
          <h2 className="font-script text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4DE] via-[#FF9ACB] to-[#F45AA8] drop-shadow-[0_4px_25px_rgba(244,90,168,0.4)] leading-tight">
            Good Things Are Homemade
          </h2>
        </motion.div>

        {/* Centerpiece Image & Rosette Seal */}
        <div className="relative my-8 flex items-center justify-center">
          {/* Subtle thumbnail aura */}
          <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-[#F4C95D]/40 shadow-[0_0_50px_rgba(244,201,93,0.3)] bg-[#1a0a06]">
            <img
              src={ASSETS.hero}
              alt="Unicorn Treats artisan brownies and cookies"
              className="w-full h-full object-cover scale-110"
              loading="lazy"
            />
          </div>

          {/* Overlapping Official Scalloped Rosette Seal from the Flyer */}
          <div className="absolute -bottom-10 -right-6 sm:-right-12">
            <UnicornSeal size={180} />
          </div>
        </div>

        {/* Brand Lockup */}
        <div className="mt-8 text-center">
          <p className="font-serif text-3xl sm:text-4xl font-black uppercase tracking-wider text-[#FFF4DE]">
            Unicorn Treats <span className="font-script text-3xl text-[#F45AA8] font-normal lowercase">by</span> Jolene
          </p>
          <p className="font-price text-xs sm:text-sm tracking-[0.3em] font-extrabold uppercase text-[#F4C95D] mt-2">
            Sweet Treats • Big Dreams
          </p>
        </div>

        {/* Final Call to Action */}
        <div className="mt-10">
          <a
            href="#order"
            onClick={(e) => {
              triggerCelebrationConfetti({
                x: e.clientX / window.innerWidth,
                y: Math.min(0.8, e.clientY / window.innerHeight),
              });
            }}
            className="px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-[#F45AA8] via-[#FF9ACB] to-[#F45AA8] text-white shadow-[0_8px_32px_rgba(244,90,168,0.5)] hover:shadow-[0_12px_40px_rgba(244,90,168,0.7)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Place Your Order</span>
          </a>
        </div>

      </div>
    </section>
  );
};
