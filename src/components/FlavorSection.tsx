import React, { useState } from 'react';
import { BRAND_CONFIG, SpecialFlavor } from '../data/config';
import { BrushStroke } from './BrushStroke';
import { Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const FlavorSection: React.FC = () => {
  const [activeFlavor, setActiveFlavor] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="flavors"
      className="relative py-24 sm:py-32 bg-[#090403] overflow-hidden border-t border-[#F4C95D]/15"
    >
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-r from-[#F45AA8]/10 via-[#F4C95D]/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Flyer Pink Brush Banner */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="mb-4">
            <BrushStroke variant="pink" size="lg">
              <span>Try Our Special Flavors!</span>
            </BrushStroke>
          </div>

          <p className="font-script text-xl sm:text-2xl text-[#F4C95D] mt-2">
            Limited Batch Inventions & Customer Favorites
          </p>

          <p className="text-xs sm:text-sm text-[#FFF4DE]/60 mt-3 font-sans">
            Created for adventurous chocolate lovers. Hover or tap each flavor card to reveal its tasting notes and aroma profile.
          </p>
        </div>

        {/* 6 Floating Flavor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_CONFIG.specialFlavors.map((flavor, index) => {
            const isActive = activeFlavor === flavor.id;

            return (
              <motion.div
                key={flavor.id}
                initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setActiveFlavor(isActive ? null : flavor.id)}
                className={`group relative p-6 rounded-2xl cursor-pointer select-none transition-all duration-300 border ${
                  isActive
                    ? 'bg-gradient-to-br from-[#2e121c] to-[#12060b] border-[#F45AA8] shadow-[0_12px_32px_rgba(244,90,168,0.35)] -translate-y-2'
                    : 'bg-gradient-to-br from-[#1c0e08] to-[#0a0503] border-[#F4C95D]/20 hover:border-[#F45AA8]/60 hover:shadow-[0_10px_28px_rgba(244,90,168,0.2)] hover:-translate-y-1.5'
                }`}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${flavor.name} special flavor. ${flavor.highlight}`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#F4C95D] font-mono">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#FFF4DE]/50 font-semibold">
                      Special Creation
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Heart
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? 'fill-[#F45AA8] text-[#F45AA8] scale-125'
                          : 'text-[#FF9ACB]/50 group-hover:text-[#F45AA8] group-hover:scale-110'
                      }`}
                    />
                  </div>
                </div>

                {/* Flavor Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF4DE] leading-tight group-hover:text-[#FFF4DE] transition-colors">
                  {flavor.name}
                </h3>

                {/* Flavor Notes / Highlight */}
                <p className="mt-3 text-xs sm:text-sm text-[#FFF4DE]/75 leading-relaxed font-sans">
                  {flavor.highlight}
                </p>

                {/* Interactive Footer / Heart Sparkle indicator */}
                <div className="mt-5 pt-3 border-t border-[#FFF4DE]/10 flex items-center justify-between text-[11px]">
                  <span className="text-[#FF9ACB] font-script text-base">
                    Chef Jolene Special
                  </span>
                  <span className="text-[#F4C95D] group-hover:underline flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Seasonal Favorite</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
