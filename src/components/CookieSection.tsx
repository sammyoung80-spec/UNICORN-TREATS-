import React from 'react';
import { ProductCard } from './ProductCard';
import { BrushStroke } from './BrushStroke';
import { ASSETS } from '../assets/assetMap';
import { Sparkles, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAdmin } from '../context/AdminContext';
import { InlineEditable } from './admin/InlineEditable';

export const CookieSection: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { config, updateBrandText, isEditMode, isAdminLoggedIn, setDrawerTab, dimensions } = useAdmin();

  return (
    <section
      id="cookies"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#070302] via-[#120804] to-[#0c0503] overflow-hidden border-t border-[#F4C95D]/10"
    >
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] rounded-full bg-[#FF9ACB]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#F4C95D]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#F4C95D]" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#F4C95D]">
              Golden & Chewy Freshness
            </span>
            <span className="w-6 h-px bg-[#F4C95D]" />
          </div>

          <div className="mb-4">
            <BrushStroke variant="pink" size="lg">
              <span>
                <InlineEditable
                  value={config.cookies.title}
                  onSave={(v) => updateBrandText('cookies.title', v)}
                />
              </span>
            </BrushStroke>
          </div>

          <p className="font-script text-xl sm:text-2xl text-[#FF9ACB] mt-2">
            <InlineEditable
              value={config.cookies.description}
              onSave={(v) => updateBrandText('cookies.description', v)}
            />
          </p>

          <p className="text-xs sm:text-sm text-[#FFF4DE]/60 mt-3 font-sans">
            Hand-scooped, thick gourmet cookies with crisp golden edges and luscious soft centers. Hover or tap to reveal collectible pricing!
          </p>
        </div>

        {/* Cinematic Showcase Row: Cookie Feature */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-14 rounded-3xl overflow-hidden border border-[#F45AA8]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group bg-[#150a06]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center order-2 lg:order-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9ACB] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Golden Standard</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF4DE] leading-snug">
                Crispy Edges, Molten Soft Centers
              </h3>
              <p className="text-sm text-[#FFF4DE]/75 mt-3 leading-relaxed font-sans">
                Our dough is chilled for 24 hours to develop rich toffee and brown sugar notes before being baked to golden perfection. Packed to the brim with chocolate pools and hand-selected toppings.
              </p>
              <div className="mt-5 flex items-center gap-4 text-xs font-semibold text-[#F4C95D]">
                <span>✓ Pure Brown Butter</span>
                <span>✓ Semi-Sweet Pools</span>
                <span>✓ Flaky Sea Salt Finish</span>
              </div>
            </div>

            <div className="lg:col-span-7 h-72 sm:h-96 overflow-hidden relative order-1 lg:order-2">
              <img
                src={ASSETS.cookies}
                alt="Freshly baked golden chocolate chip cookies with chocolate pools"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#150a06]/90 hidden lg:block" />
            </div>
          </div>
        </motion.div>

        {/* 3D Interactive Cookie Flavor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.cookies.flavors.map((flavor, index) => (
            <motion.div
              key={flavor.id}
              initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ProductCard
                product={flavor}
                imageFallbackSrc={ASSETS.cookies}
                accentType="cookie"
              />
            </motion.div>
          ))}

          {/* Admin "+ Add New Cookie" Button in Edit Mode */}
          {isEditMode && isAdminLoggedIn && (
            <div
              style={{ height: `${dimensions.cardHeight}px` }}
              onClick={() => setDrawerTab('products')}
              className="rounded-2xl border-2 border-dashed border-[#F45AA8]/60 hover:border-[#F45AA8] bg-[#1a0a06]/60 hover:bg-[#24130D] cursor-pointer flex flex-col items-center justify-center p-6 text-center transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#F45AA8]/20 text-[#F45AA8] group-hover:scale-110 flex items-center justify-center mb-3 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <p className="font-serif text-lg font-bold text-[#FFF4DE]">Add New Cookie</p>
              <p className="text-xs text-[#FF9ACB] mt-1 font-sans">Click to open Product Manager</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
