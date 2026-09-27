import React, { useState } from 'react';
import { BRAND_CONFIG, ComboDeal } from '../data/config';
import { useOrder } from '../context/OrderContext';
import { ASSETS } from '../assets/assetMap';
import { Sparkles, Gift, Plus, Check, Crown } from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const ComboSection: React.FC = () => {
  const { addToCart } = useOrder();
  const [addedId, setAddedId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const handleAddCombo = (combo: ComboDeal) => {
    addToCart(combo);
    setAddedId(combo.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section
      id="combos"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0c0503] via-[#1a0a06] to-[#080302] overflow-hidden"
    >
      {/* Background glow and subtle gold frame accents */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#F4C95D]/8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#F45AA8]/8 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (In the style of the flyer's gold-bordered Special Combo Deals box) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#F4C95D]" />
            <span className="text-xs uppercase tracking-widest font-black text-[#F4C95D] flex items-center gap-1.5">
              <Gift className="w-4 h-4" />
              Party & Sharing Boxes
            </span>
            <span className="w-8 h-px bg-[#F4C95D]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-black text-[#FFF4DE] tracking-tight">
            Special Combo Deals <span className="text-[#F45AA8] font-script text-4xl">♡</span>
          </h2>

          <p className="font-script text-xl sm:text-2xl text-[#FF9ACB] mt-2">
            Curated gift boxes for birthdays, celebrations, and sweet cravings
          </p>

          <p className="text-xs sm:text-sm text-[#FFF4DE]/60 mt-3 font-sans">
            Save when you order in bundles. Each combo is packed fresh in bakery boxes with custom parchment and ribbon.
          </p>
        </div>

        {/* ================= THE $45 SPECIAL COMBO SHOWCASE ================= */}
        {(() => {
          const specialCombo = BRAND_CONFIG.combos.find((c) => c.isSpecialCombo);
          if (!specialCombo) return null;

          return (
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.96 }}
              whileInView={reducedMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative mb-16 rounded-3xl overflow-hidden p-1 bg-gradient-to-r from-[#F4C95D] via-[#F45AA8] to-[#F4C95D] shadow-[0_20px_60px_rgba(244,90,168,0.25)]"
            >
              <div className="bg-[#180a06] rounded-[22px] p-6 sm:p-10 relative overflow-hidden">
                {/* Background image tint */}
                <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-20 lg:opacity-35 pointer-events-none">
                  <img
                    src={ASSETS.combos}
                    alt="Special Combo Box"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#180a06] via-[#180a06]/80 to-transparent" />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F45AA8] text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                      <Crown className="w-3.5 h-3.5" />
                      <span>{specialCombo.badge || 'SPECIAL COMBO'}</span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFF4DE] leading-tight">
                      {specialCombo.name}
                    </h3>

                    <p className="font-script text-2xl text-[#F4C95D] mt-2">
                      The Ultimate Unicorn Celebration Feast
                    </p>

                    <p className="text-sm sm:text-base text-[#FFF4DE]/80 mt-3 max-w-xl font-sans leading-relaxed">
                      {specialCombo.description} Includes 6 assorted fudgy brownies and 6 golden chewy cookies. Packaged in our premium bakery box tied with a satin bow!
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#FF9ACB]">
                      <span>✓ 6 Fudgy Brownies</span>
                      <span>✓ 6 Chewy Cookies</span>
                      <span>✓ Deluxe Gift Box</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0">
                    <div className="p-5 rounded-2xl bg-black/60 border border-[#F4C95D]/40 text-center min-w-[200px] mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-[#F4C95D] font-bold">
                        Special Bundle Price
                      </span>
                      <div className="font-price text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8D6] via-[#F4C95D] to-[#E5A826]">
                        {specialCombo.formattedPrice}
                      </div>
                      <span className="text-[11px] text-[#FFF4DE]/60 font-sans">
                        Full Dozen Variety
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddCombo(specialCombo)}
                      className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-xl ${
                        addedId === specialCombo.id
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gradient-to-r from-[#F45AA8] via-[#FF9ACB] to-[#F45AA8] text-white hover:brightness-110 active:scale-95 shadow-[0_6px_25px_rgba(244,90,168,0.5)]'
                      }`}
                      aria-label={`Add Special Combo 6 Brownies + 6 Cookies for ${specialCombo.formattedPrice} to order`}
                    >
                      {addedId === specialCombo.id ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Order!
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" /> Order Special Combo
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* ================= OTHER COMBO TIERS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {BRAND_CONFIG.combos
            .filter((c) => !c.isSpecialCombo)
            .map((combo, index) => (
              <motion.div
                key={combo.id}
                initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#1f0f08] via-[#120703] to-[#080302] border border-[#F4C95D]/30 hover:border-[#F4C95D] shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#FFF4DE]/60 mb-2">
                    <span className="uppercase tracking-wider font-semibold text-[10px]">
                      Combo Deal
                    </span>
                    <Gift className="w-3.5 h-3.5 text-[#F4C95D]" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#FFF4DE] leading-tight group-hover:text-[#F4C95D] transition-colors">
                    {combo.name}
                  </h3>

                  <p className="text-xs text-[#FFF4DE]/70 mt-2 font-sans line-clamp-2">
                    {combo.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#FFF4DE]/10 flex flex-col items-center">
                  <div className="font-price text-3xl font-black text-[#F4C95D] mb-3">
                    {combo.formattedPrice}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddCombo(combo)}
                    className={`w-full py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                      addedId === combo.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#24130D] hover:bg-[#F45AA8] text-[#FFF4DE] hover:text-white border border-[#F4C95D]/30 hover:border-transparent active:scale-95'
                    }`}
                    aria-label={`Add ${combo.name} for ${combo.formattedPrice} to order`}
                  >
                    {addedId === combo.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added!
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Add Deal
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
};
