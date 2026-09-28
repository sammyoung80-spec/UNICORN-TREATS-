import React, { useState } from 'react';
import { useAdmin, CustomSection } from '../context/AdminContext';
import { BrushStroke } from './BrushStroke';
import { ChevronDown, ChevronUp, Sparkles, ArrowRight, Trash2, ArrowUp, ArrowDown, EyeOff, Edit2 } from 'lucide-react';
import { InlineEditable } from './admin/InlineEditable';

export const DynamicSectionRenderer: React.FC = () => {
  const { sections, isEditMode, isAdminLoggedIn, updateSection, deleteSection, reorderSection, setDrawerTab } = useAdmin();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const visibleSections = sections.filter((s) => s.enabled || (isEditMode && isAdminLoggedIn));

  if (visibleSections.length === 0) return null;

  return (
    <div className="space-y-0">
      {visibleSections.map((section, index) => {
        const isHidden = !section.enabled;

        const bgClass = {
          chocolate: 'bg-[#150a06] border-y border-[#F4C95D]/15',
          dark: 'bg-[#080402] border-y border-[#FFF4DE]/10',
          gradient: 'bg-gradient-to-b from-[#1f0d07] via-[#2a0e18] to-[#120603] border-y border-[#F45AA8]/30',
          'pink-accent': 'bg-gradient-to-r from-[#24101a] via-[#1a0812] to-[#24101a] border-y border-[#F45AA8]/40',
        }[section.bgStyle || 'chocolate'];

        return (
          <section
            key={section.id}
            id={section.id}
            className={`relative py-20 sm:py-28 overflow-hidden transition-all ${bgClass} ${
              isHidden ? 'opacity-60 ring-2 ring-red-500/50' : ''
            }`}
          >
            {/* Elementor-style Admin Action Bar on Section */}
            {isEditMode && isAdminLoggedIn && (
              <div className="absolute top-3 right-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/90 border border-[#F45AA8] text-[11px] shadow-xl text-[#FFF4DE]">
                <span className="font-mono text-[#F4C95D] font-bold">Section #{index + 1} ({section.type})</span>
                {isHidden && <span className="text-red-400 font-bold">(Hidden from public)</span>}

                <div className="h-3 w-px bg-white/20 mx-1" />

                <button
                  type="button"
                  onClick={() => reorderSection(section.id, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:text-[#F4C95D] disabled:opacity-30"
                  title="Move section up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => reorderSection(section.id, 'down')}
                  disabled={index === sections.length - 1}
                  className="p-1 hover:text-[#F4C95D] disabled:opacity-30"
                  title="Move section down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => updateSection(section.id, { enabled: !section.enabled })}
                  className="p-1 hover:text-[#F45AA8]"
                  title="Toggle section visibility"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDrawerTab('sections')}
                  className="p-1 hover:text-[#F4C95D]"
                  title="Edit in Sections Drawer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteSection(section.id)}
                  className="p-1 hover:text-red-400"
                  title="Delete section"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                {section.badgeText && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F45AA8]/20 border border-[#F45AA8]/50 text-xs font-bold uppercase tracking-wider text-[#FF9ACB] mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
                    <InlineEditable
                      value={section.badgeText}
                      onSave={(v) => updateSection(section.id, { badgeText: v })}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF4DE] leading-tight">
                    <InlineEditable
                      value={section.title}
                      onSave={(v) => updateSection(section.id, { title: v })}
                    />
                  </h2>
                </div>

                {section.subtitle && (
                  <p className="font-script text-2xl text-[#F4C95D] mt-2">
                    <InlineEditable
                      value={section.subtitle}
                      onSave={(v) => updateSection(section.id, { subtitle: v })}
                    />
                  </p>
                )}

                {section.content && (
                  <p className="text-sm sm:text-base text-[#FFF4DE]/75 mt-3 max-w-2xl mx-auto font-sans leading-relaxed">
                    <InlineEditable
                      value={section.content}
                      onSave={(v) => updateSection(section.id, { content: v })}
                      multiline
                    />
                  </p>
                )}
              </div>

              {/* Render items based on section type */}
              {section.type === 'faq' && section.items && (
                <div className="max-w-3xl mx-auto space-y-3">
                  {section.items.map((item) => {
                    const isOpen = openFaqId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-[#F4C95D]/25 bg-black/40 overflow-hidden transition-all duration-200"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                          className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#24130D]/40 transition-colors"
                        >
                          <span className="font-serif text-base sm:text-lg font-bold text-[#FFF4DE]">
                            {item.title}
                          </span>
                          <span className="p-1 rounded-full bg-[#24130D] text-[#F4C95D] shrink-0">
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-sm text-[#FFF4DE]/75 font-sans border-t border-[#FFF4DE]/5 leading-relaxed">
                            {item.desc}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* CTA or Features Cards */}
              {section.items && section.type !== 'faq' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 rounded-2xl bg-black/40 border border-[#F4C95D]/30 shadow-lg text-center"
                    >
                      <h4 className="font-serif text-xl font-bold text-[#FFF4DE] mb-2">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-[#FFF4DE]/70 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Button */}
              {section.buttonText && (
                <div className="mt-10 text-center">
                  <a
                    href={section.buttonLink || '#order'}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] via-[#FF9ACB] to-[#F45AA8] text-white shadow-[0_4px_20px_rgba(244,90,168,0.5)] hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>{section.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}

            </div>
          </section>
        );
      })}
    </div>
  );
};
