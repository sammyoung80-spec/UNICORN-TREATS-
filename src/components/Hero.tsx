import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BRAND_CONFIG } from '../data/config';
import { ASSETS } from '../assets/assetMap';
import { Sparkles, Heart, ArrowDown, ChevronRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { triggerCelebrationConfetti } from '../utils/confetti';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Hero chocolate disassembly & dissemination transforms on scroll
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1.15, 0.95]);
  const rotateLeftPiece = useTransform(scrollYProgress, [0, 0.8], [0, -14]);
  const rotateRightPiece = useTransform(scrollYProgress, [0, 0.8], [0, 16]);
  const disperseXLeft = useTransform(scrollYProgress, [0, 0.8], [0, -60]);
  const disperseXRight = useTransform(scrollYProgress, [0, 0.8], [0, 60]);
  const disperseYTop = useTransform(scrollYProgress, [0, 0.8], [0, -45]);
  const crumbsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.8, 0.2]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-gradient-to-b from-[#050505] via-[#1a0c07] to-[#0d0604]"
    >
      {/* Background Lighting & Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-gradient-to-br from-[#F45AA8]/12 via-[#F4C95D]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#F45AA8]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#F4C95D]/8 blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: BRAND STORY & HERO TYPOGRAPHY */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Birthday Milestone Badge (From the Flyer) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#24130D] to-[#3A1C12] border border-[#F4C95D]/40 shadow-[0_4px_20px_rgba(244,201,93,0.15)] group"
            >
              <div className="w-2 h-2 rounded-full bg-[#F45AA8] animate-ping" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F4C95D]">
                {BRAND_CONFIG.birthday.milestone}
              </span>
              <span className="text-[11px] sm:text-xs text-[#FFF4DE]/60">·</span>
              <span className="text-[11px] sm:text-xs text-[#FF9ACB] font-medium">
                {BRAND_CONFIG.birthday.dateString}
              </span>
              <span className="text-[11px] sm:text-xs text-[#FFF4DE]/60 hidden sm:inline">·</span>
              <span className="text-[11px] sm:text-xs text-[#FFF4DE]/80 hidden sm:inline">
                {BRAND_CONFIG.birthday.callout}
              </span>
            </motion.div>

            {/* Main Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-[#FFF4DE]"
            >
              UNICORN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9ACB] via-[#F45AA8] to-[#F4C95D] drop-shadow-[0_4px_25px_rgba(244,90,168,0.4)]">
                TREATS
              </span>
            </motion.h1>

            {/* Script Tagline & Secondary Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 sm:mt-5"
            >
              <p className="font-script text-2xl sm:text-3xl lg:text-4xl text-[#F4C95D] flex items-center justify-center lg:justify-start gap-2">
                <span>Sweet Treats</span>
                <span className="text-[#F45AA8]">♡</span>
                <span>Big Dreams!</span>
              </p>
              <p className="mt-3 text-sm sm:text-base text-[#FFF4DE]/80 max-w-lg leading-relaxed">
                {BRAND_CONFIG.mission}
              </p>

              {/* Flyer Quality Pillars */}
              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#FFF4DE]/70">
                {BRAND_CONFIG.qualityPillars.map((pillar, idx) => (
                  <React.Fragment key={pillar}>
                    {idx > 0 && <span className="text-[#F45AA8]">✦</span>}
                    <span>{pillar}</span>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#order"
                onClick={(e) => {
                  triggerCelebrationConfetti({
                    x: e.clientX / window.innerWidth,
                    y: Math.min(0.8, e.clientY / window.innerHeight),
                  });
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] via-[#FF9ACB] to-[#F45AA8] text-white shadow-[0_6px_25px_rgba(244,90,168,0.5)] hover:shadow-[0_8px_32px_rgba(244,90,168,0.7)] hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                <span>Order Now</span>
              </a>

              <a
                href="#brownies"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#24130D]/80 hover:bg-[#3A1C12] text-[#FFF4DE] border border-[#F4C95D]/40 hover:border-[#F4C95D] transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Explore Treats</span>
                <ChevronRight className="w-4 h-4 text-[#F4C95D]" />
              </a>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: CINEMATIC DESSERT STACK & SCROLL INTERACTION */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <motion.div
              style={reducedMotion ? {} : { scale, opacity: heroOpacity }}
              className="relative w-full max-w-lg aspect-square flex items-center justify-center"
            >
              {/* Gold & Pink Ambient Radial Rings */}
              <div className="absolute inset-0 rounded-full border border-[#F4C95D]/15 scale-95 pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-[#F45AA8]/20 scale-90 pointer-events-none" />

              {/* Main Culinary Centerpiece */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-[#F4C95D]/30 group">
                <img
                  src={ASSETS.hero}
                  alt="Unicorn Treats gourmet brownies and cookies stack"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Film grain / dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20 pointer-events-none" />

                {/* Floating Brownie Pieces for the Scroll Disassembly effect */}
                {!reducedMotion && (
                  <>
                    {/* Top Left Brownie Chunk */}
                    <motion.div
                      style={{
                        x: disperseXLeft,
                        y: disperseYTop,
                        rotate: rotateLeftPiece,
                      }}
                      className="absolute top-4 left-4 p-2 rounded-xl bg-black/80 backdrop-blur-md border border-[#F4C95D]/40 text-xs font-serif text-[#FFF4DE] shadow-xl pointer-events-none"
                    >
                      <span className="text-[#F4C95D]">✦</span> Fudgy Dark Cocoa
                    </motion.div>

                    {/* Bottom Right Cookie Chunk */}
                    <motion.div
                      style={{
                        x: disperseXRight,
                        rotate: rotateRightPiece,
                      }}
                      className="absolute bottom-6 right-6 p-2 rounded-xl bg-black/80 backdrop-blur-md border border-[#F45AA8]/40 text-xs font-serif text-[#FFF4DE] shadow-xl pointer-events-none"
                    >
                      <span className="text-[#F45AA8]">♡</span> Fresh Golden Baked
                    </motion.div>

                    {/* Dissolving Crumbs & Sparkles */}
                    <motion.div
                      style={{ opacity: crumbsOpacity }}
                      className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    >
                      <div className="w-3 h-3 bg-[#F4C95D] rounded-full blur-[1px] -translate-x-24 -translate-y-20" />
                      <div className="w-2.5 h-2.5 bg-[#F45AA8] rounded-full blur-[1px] translate-x-28 translate-y-12" />
                      <div className="w-2 h-2 bg-[#3A1C12] rounded-sm translate-x-16 -translate-y-16" />
                    </motion.div>
                  </>
                )}

                {/* Floating Highlight Tag */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-[#FFF4DE]/10 text-[11px] text-[#FFF4DE]">
                  <span className="w-2 h-2 rounded-full bg-[#F4C95D]" />
                  <span>Small-Batch Artisanal Baking</span>
                </div>
              </div>

              {/* Floating Unicorn Heart Accent */}
              <div className="absolute -bottom-4 -right-4 p-3 rounded-2xl bg-gradient-to-br from-[#24130D] to-[#050505] border border-[#F45AA8]/50 shadow-2xl flex items-center gap-2 text-xs font-script text-[#FF9ACB] z-30">
                <Heart className="w-4 h-4 fill-[#F45AA8] text-[#F45AA8]" />
                <span>Made with lots of love</span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center text-center">
          <a
            href="#story"
            className="inline-flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#FFF4DE]/50 hover:text-[#F4C95D] transition-colors"
            aria-label="Scroll to discover the story"
          >
            <span>Scroll to Discover</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#F4C95D]" />
          </a>
        </div>
      </div>
    </section>
  );
};
