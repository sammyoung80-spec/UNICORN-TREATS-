import React, { useState } from 'react';
import { ComboDeal } from '../data/config';
import { useOrder } from '../context/OrderContext';
import { useAdmin } from '../context/AdminContext';
import { ASSETS } from '../assets/assetMap';
import { Sparkles, Gift, Plus, Check, Crown, Trash2, Share2, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { InlineEditable } from './admin/InlineEditable';
import { ProductShareModal } from './ProductShareModal';

export const ComboSection: React.FC = () => {
  const { addToCart } = useOrder();
  const { config, isEditMode, isAdminLoggedIn, updateCombo, deleteCombo, setDrawerTab, openMediaPicker } = useAdmin();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [sharedCombo, setSharedCombo] = useState<ComboDeal | null>(null);
  const reducedMotion = useReducedMotion();

  const handleAddCombo = (combo: ComboDeal) => {
    addToCart(combo);
    setAddedId(combo.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handleShareClick = (combo: ComboDeal, e: React.MouseEvent) => {
    e.stopPropagation();
    setSharedCombo(combo);
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
            Special Combo Deals
          </h2>

          <p className="font-script text-2xl text-[#FF9ACB] mt-2">
            Mix, Match & Save on Jolene&apos;s Signature Bakes
          </p>

          <p className="text-xs sm:text-sm text-[#FFF4DE]/60 mt-3 font-sans max-w-xl mx-auto">
            Packaged in our signature ribbon-wrapped luxury treat boxes. Perfect for birthday parties, sweet 16 celebrations, school milestones, or family gatherings.
          </p>
        </div>

        {/* ================= HERO SPECIAL COMBO BANNER ================= */}
        {(() => {
          const specialCombo = config.combos.find((c) => c.isSpecialCombo);
          if (!specialCombo) return null;

          const comboImage = specialCombo.image || ASSETS.combos;

          return (
            <motion.div
              id={`product-${specialCombo.id}`}
              initial={reducedMotion ? {} : { opacity: 0, y: 25 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl p-1 bg-gradient-to-r from-[#F4C95D] via-[#F45AA8] to-[#F4C95D] shadow-[0_15px_50px_rgba(244,90,168,0.25)] mb-16 overflow-hidden"
            >
              <div className="relative rounded-[22px] bg-gradient-to-br from-[#2a130a] via-[#1a0905] to-[#0d0402] p-6 sm:p-8 lg:p-10 overflow-hidden">
                
                {/* Decorative badge */}
                <div className="absolute top-0 right-0 sm:right-6 transform sm:-translate-y-1">
                  <div className="bg-gradient-to-r from-[#F45AA8] to-[#FF9ACB] text-white font-bold text-xs uppercase tracking-widest py-2 px-5 rounded-b-2xl shadow-lg flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-[#FFF4DE]" />
                    <span>{specialCombo.badge || 'Signature Value'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 sm:pt-0">
                  
                  {/* Visual Gift Box Graphic */}
                  <div className="lg:col-span-3 flex justify-center">
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-[#F4C95D]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)] bg-black/50 group">
                      <img
                        src={comboImage}
                        alt="Unicorn Treats Special Combo Box"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] uppercase font-bold tracking-wider text-[#F4C95D] bg-black/60 backdrop-blur-sm py-1 rounded-lg">
                        12 Gourmet Treats
                      </div>

                      {/* Admin Image Change Button */}
                      {isEditMode && isAdminLoggedIn && (
                        <button
                          type="button"
                          onClick={() => openMediaPicker({ type: 'product', id: specialCombo.id })}
                          className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white p-2"
                        >
                          <Camera className="w-5 h-5 text-[#F4C95D]" />
                          <span className="text-[10px] font-bold uppercase bg-[#F45AA8] px-2 py-0.5 rounded-full">
                            Change Picture
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Combo Details */}
                  <div className="lg:col-span-5 text-center lg:text-left">
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                      <span className="text-xs uppercase tracking-widest font-bold text-[#FF9ACB] px-3 py-1 rounded-full bg-[#F45AA8]/20 border border-[#F45AA8]/40">
                        {specialCombo.items}
                      </span>

                      {/* Share Button */}
                      <button
                        type="button"
                        onClick={(e) => handleShareClick(specialCombo, e)}
                        className="p-1.5 rounded-full bg-black/50 hover:bg-[#F45AA8] text-[#FFF4DE] border border-[#FFF4DE]/20 transition-all hover:scale-110 active:scale-95 shadow-sm"
                        title="Share this combo deal"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFF4DE] mt-3 leading-tight">
                      <InlineEditable
                        value={specialCombo.name}
                        onSave={(v) => updateCombo(specialCombo.id, { name: v })}
                      />
                    </h3>

                    <p className="font-script text-2xl text-[#F4C95D] mt-2">
                      The Ultimate Unicorn Celebration Feast
                    </p>

                    <p className="text-sm sm:text-base text-[#FFF4DE]/80 mt-3 max-w-xl font-sans leading-relaxed">
                      <InlineEditable
                        value={specialCombo.description}
                        onSave={(v) => updateCombo(specialCombo.id, { description: v })}
                        multiline
                      />
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
                        <InlineEditable
                          value={specialCombo.formattedPrice}
                          onSave={(v) => {
                            const num = parseFloat(v.replace(/[^0-9.]/g, '')) || specialCombo.price;
                            updateCombo(specialCombo.id, { price: num, formattedPrice: v });
                          }}
                        />
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
                      aria-label={`Add Special Combo for ${specialCombo.formattedPrice} to order`}
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
          {config.combos
            .filter((c) => !c.isSpecialCombo)
            .map((combo, index) => (
              <motion.div
                id={`product-${combo.id}`}
                key={combo.id}
                initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#1f0f08] via-[#120703] to-[#080302] border border-[#F4C95D]/30 hover:border-[#F4C95D] shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Admin Delete Action Button */}
                {isEditMode && isAdminLoggedIn && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete ${combo.name}?`)) {
                        deleteCombo(combo.id);
                      }
                    }}
                    className="absolute -top-2.5 -right-2.5 z-20 p-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg"
                    title="Delete Combo"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9ACB] bg-[#F45AA8]/20 px-2.5 py-0.5 rounded-full border border-[#F45AA8]/30">
                      {combo.badge || 'Party Pack'}
                    </span>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={(e) => handleShareClick(combo, e)}
                      className="p-1 rounded-full text-[#FFF4DE]/60 hover:text-white hover:bg-white/10 transition-colors"
                      title={`Share ${combo.name}`}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-[#FFF4DE] leading-snug group-hover:text-[#F4C95D] transition-colors">
                    <InlineEditable
                      value={combo.name}
                      onSave={(v) => updateCombo(combo.id, { name: v })}
                    />
                  </h4>

                  <p className="text-xs font-semibold text-[#F4C95D] mt-1 font-mono">
                    <InlineEditable
                      value={combo.items}
                      onSave={(v) => updateCombo(combo.id, { items: v })}
                    />
                  </p>

                  <p className="text-xs text-[#FFF4DE]/70 mt-3 font-sans leading-relaxed">
                    <InlineEditable
                      value={combo.description}
                      onSave={(v) => updateCombo(combo.id, { description: v })}
                      multiline
                    />
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#FFF4DE]/10">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[10px] uppercase font-semibold text-[#FFF4DE]/50">Price:</span>
                    <span className="font-price text-2xl font-black text-[#F4C95D]">
                      <InlineEditable
                        value={combo.formattedPrice}
                        onSave={(v) => {
                          const num = parseFloat(v.replace(/[^0-9.]/g, '')) || combo.price;
                          updateCombo(combo.id, { price: num, formattedPrice: v });
                        }}
                      />
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddCombo(combo)}
                    className={`w-full py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                      addedId === combo.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#24130D] hover:bg-[#341b13] text-[#F4C95D] border border-[#F4C95D]/40 hover:border-[#F4C95D] active:scale-95'
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

          {/* Admin Add Combo Action Card */}
          {isEditMode && isAdminLoggedIn && (
            <div
              onClick={() => setDrawerTab('products')}
              className="p-6 rounded-2xl border-2 border-dashed border-[#F4C95D]/40 hover:border-[#F45AA8] bg-[#1a0a06]/40 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#1a0a06]/80 transition-all min-h-[280px]"
            >
              <div className="w-12 h-12 rounded-full bg-[#F4C95D]/20 text-[#F4C95D] flex items-center justify-center mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <p className="font-serif text-base font-bold text-[#FFF4DE]">Add New Combo</p>
              <p className="text-xs text-[#FF9ACB] mt-1 font-script text-base">Custom box deal or bundle</p>
            </div>
          )}
        </div>

      </div>

      {/* Share Modal */}
      {sharedCombo && (
        <ProductShareModal
          product={{
            ...sharedCombo,
            category: 'Special Combo Deal',
          }}
          isOpen={!!sharedCombo}
          onClose={() => setSharedCombo(null)}
          accentType="combo"
        />
      )}
    </section>
  );
};
