import React from 'react';
import { BRAND_CONFIG } from '../data/config';
import { BrushStroke } from './BrushStroke';
import { UnicornSeal } from './UnicornSeal';
import { Sparkles, Heart, Crown, Gift, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const BirthdaySection: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="story"
      className="relative py-24 sm:py-32 bg-[#090503] overflow-hidden border-y border-[#F4C95D]/15"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-[#F45AA8]/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-[#F4C95D]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: MONUMENTAL "15" BIRTHDAY MOMENT */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
              whileInView={reducedMotion ? {} : { scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#24130D] via-[#150a06] to-[#050505] border-2 border-[#F4C95D]/40 shadow-[0_20px_50px_rgba(244,201,93,0.15)] flex flex-col items-center justify-center w-full max-w-sm"
            >
              {/* Gold Crown On Top */}
              <div className="absolute -top-7 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D49319] via-[#F4C95D] to-[#D49319] text-[#24130D] shadow-lg flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider">
                <Crown className="w-4 h-4 fill-[#24130D]" />
                <span>Birthday Milestone</span>
              </div>

              {/* Flyer Brush Header: Turning 15 on October 23rd */}
              <div className="mt-2 mb-4">
                <BrushStroke variant="pink" size="sm">
                  <span>Turning 15 on October 23rd ♡</span>
                </BrushStroke>
              </div>

              {/* Large Sculpted "15" */}
              <div className="relative my-2 select-none">
                <span className="font-serif text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#FFF8D6] via-[#F4C95D] to-[#BD7E10] drop-shadow-[0_8px_30px_rgba(244,201,93,0.4)]">
                  15
                </span>
                
                {/* Floating sparkle dots */}
                <Sparkles className="w-6 h-6 text-[#F4C95D] absolute -top-2 right-2 animate-bounce" />
                <Heart className="w-5 h-5 text-[#F45AA8] fill-[#F45AA8] absolute bottom-4 -left-3 animate-pulse" />
              </div>

              {/* Callout */}
              <p className="font-script text-xl sm:text-2xl text-[#FF9ACB] font-bold">
                {BRAND_CONFIG.birthday.callout}
              </p>

              <div className="mt-4 pt-4 border-t border-[#FFF4DE]/10 w-full flex items-center justify-center gap-2 text-xs text-[#FFF4DE]/60">
                <Gift className="w-4 h-4 text-[#F4C95D]" />
                <span>Celebrate with fresh homemade sweetness</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: JOLENE'S ENTREPRENEUR STORY */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-widest font-semibold text-[#F45AA8]">
              <Award className="w-4 h-4" />
              <span>Sweet Treats • Big Dreams</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF4DE] leading-tight">
              Meet Jolene & Her Magical Bakery Dream
            </h2>

            <p className="font-script text-2xl text-[#F4C95D] mt-2">
              Good Things Are Homemade ♡
            </p>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#FFF4DE]/80 leading-relaxed font-sans">
              <p>
                Turning 15 is a momentous milestone, and for Jolene, it marks another step in turning a passionate dream into an unforgettable dessert experience. What started as baking for family and friends in her kitchen has blossomed into <strong className="text-[#FFF4DE]">Unicorn Treats</strong>.
              </p>
              <p>
                Every single brownie is baked until it reaches that elusive balance: deep, dense fudge with a glass-thin crinkly crust. Every cookie is hand-scooped and baked fresh so the chocolate stays velvety and decadent. No shortcuts, no artificial extracts—only real butter, premium cocoa, farm-fresh eggs, and pure joy.
              </p>
              <p className="italic text-[#FF9ACB] font-medium">
                “When you support a young entrepreneur, you’re not just buying a treat—you’re helping fuel a dream that will inspire for years to come.”
              </p>
            </div>

            {/* Quality Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#F4C95D]/20 pt-6">
              <div className="text-center">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#F4C95D]">100%</p>
                <p className="text-[11px] uppercase tracking-wider text-[#FFF4DE]/60 mt-0.5">Homemade</p>
              </div>
              <div className="text-center border-x border-[#FFF4DE]/10">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#F45AA8]">Fresh</p>
                <p className="text-[11px] uppercase tracking-wider text-[#FFF4DE]/60 mt-0.5">Daily Batches</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF4DE]">Love</p>
                <p className="text-[11px] uppercase tracking-wider text-[#FFF4DE]/60 mt-0.5">In Every Bite</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
