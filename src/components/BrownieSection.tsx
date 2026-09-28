import React from 'react';
import { ProductCard } from './ProductCard';
import { BrushStroke } from './BrushStroke';
import { ASSETS } from '../assets/assetMap';
import { Sparkles, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAdmin } from '../context/AdminContext';
import { InlineEditable } from './admin/InlineEditable';

export const BrownieSection: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { config, updateBrandText, isEditMode, isAdminLoggedIn, setDrawerTab, dimensions } = useAdmin();

  return (
    <section
      id="brownies"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0d0604] via-[#1a0b06] to-[#070302] overflow-hidden"
    >
      {/* Subtle backdrop glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#F4C95D]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#F45AA8]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#F45AA8]" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#F45AA8]">
              Decadent Gourmet Lineup
            </span>
            <span className="w-6 h-px bg-[#F45AA8]" />
          </div>

          <div className="mb-4">
            <BrushStroke variant="pink" size="lg">
              <span>
                <InlineEditable
                  value={config.brownies.title}
                  onSave={(v) => updateBrandText('brownies.title', v)}
                />
              </span>
            </BrushStroke>
          </div>

          <p className="font-script text-xl sm:text-2xl text-[#F4C95D] mt-2">
            <InlineEditable
              value={config.brownies.description}
              onSave={(v) => updateBrandText('brownies.description', v)}
            />
          </p>

          <p className="text-xs sm:text-sm text-[#FFF4DE]/60 mt-3 font-sans">
            Crafted with rich Dutch dark cocoa, melted chocolate morsels, and crisp edges. Hover or tap any card to reveal price and order!
          </p>
        </div>

        {/* Cinematic Showcase Row: High-res Brownie Photography Feature */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-14 rounded-3xl overflow-hidden border border-[#F4C95D]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group bg-[#150a06]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 h-72 sm:h-96 overflow-hidden relative">
              <img
                src={ASSETS.brownies}
                alt="Stacked gourmet brownies with chocolate chunks and pecans"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#150a06]/90 hidden lg:block" />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F4C95D] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Secret to Fudginess</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF4DE] leading-snug">
                Deep, Glossy, Melt-in-Your-Mouth Bliss
              </h3>
              <p className="text-sm text-[#FFF4DE]/75 mt-3 leading-relaxed font-sans">
                Each pan is gently whipped and baked slowly to create that crackly, paper-thin sugar meringue crust on top, followed by a dense, chewy chocolate center loaded with rich chunks.
              </p>
              <div className="mt-5 flex items-center gap-4 text-xs font-semibold text-[#FF9ACB]">
                <span>✓ Pure Dutch Cocoa</span>
                <span>✓ Real Butter</span>
                <span>✓ Handcrafted Small Batches</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3D Interactive Brownie Flavor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {config.brownies.flavors.map((flavor, index) => (
            <motion.div
              key={flavor.id}
              initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ProductCard
                product={flavor}
                imageFallbackSrc={ASSETS.brownies}
                accentType="brownie"
              />
            </motion.div>
          ))}

          {/* Admin "+ Add New Brownie" Button in Edit Mode */}
          {isEditMode && isAdminLoggedIn && (
            <div
              style={{ height: `${dimensions.cardHeight}px` }}
              onClick={() => setDrawerTab('products')}
              className="rounded-2xl border-2 border-dashed border-[#F45AA8]/60 hover:border-[#F45AA8] bg-[#1a0a06]/60 hover:bg-[#24130D] cursor-pointer flex flex-col items-center justify-center p-6 text-center transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#F45AA8]/20 text-[#F45AA8] group-hover:scale-110 flex items-center justify-center mb-3 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <p className="font-serif text-lg font-bold text-[#FFF4DE]">Add New Brownie</p>
              <p className="text-xs text-[#FF9ACB] mt-1 font-sans">Click to open Product Manager</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
