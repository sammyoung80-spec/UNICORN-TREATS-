import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Sliders,
  PlusSquare,
  Cake,
  Mail,
  Eye,
  Edit2,
  LogOut,
  Maximize2,
  Download,
  RotateCcw,
  Image as ImageIcon,
  Send,
  CheckCircle,
  Globe,
} from 'lucide-react';
import { triggerCelebrationConfetti } from '../../utils/confetti';

export const AdminBar: React.FC = () => {
  const {
    isAdminLoggedIn,
    isEditMode,
    toggleEditMode,
    setDrawerTab,
    activeDrawerTab,
    unreadCount,
    logout,
    resetConfig,
    resetDimensions,
    publishStatus,
    lastPublishedAt,
    publishChanges,
  } = useAdmin();

  const [justPublished, setJustPublished] = useState(false);

  if (!isAdminLoggedIn) return null;

  const handlePublish = () => {
    publishChanges();
    setJustPublished(true);
    triggerCelebrationConfetti();
    setTimeout(() => setJustPublished(false), 2500);
  };

  return (
    <aside
      aria-label="Admin bar"
      className="fixed top-0 left-0 right-0 z-50 bg-[#160a06]/98 border-b border-[#F4C95D]/40 backdrop-blur-md shadow-2xl px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-[#FFF4DE]"
    >
      {/* Left: Brand Badge & Edit Mode Switch */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#24130D] border border-[#F4C95D]/30 font-bold text-[#F4C95D]">
          <span>🦄 Admin Editor</span>
        </div>

        {/* Live Edit Mode Toggle */}
        <button
          type="button"
          onClick={toggleEditMode}
          className={`px-3 py-1.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
            isEditMode
              ? 'bg-gradient-to-r from-[#F45AA8] to-[#FF9ACB] text-white ring-2 ring-[#F45AA8]/50'
              : 'bg-black/60 text-[#FFF4DE]/70 hover:text-white border border-[#FFF4DE]/20'
          }`}
          title="Toggle live Elementor visual editing mode"
        >
          {isEditMode ? (
            <>
              <Edit2 className="w-3.5 h-3.5" />
              <span>Editing Active</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Mode</span>
            </>
          )}
        </button>

        {isEditMode && (
          <span className="hidden xl:inline text-[11px] text-[#FF9ACB] italic">
            ✦ Drag edges of photos & cards to resize • Click any text to edit
          </span>
        )}
      </div>

      {/* Middle: Feature Panels & Media Library */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Media Library */}
        <button
          type="button"
          onClick={() => setDrawerTab('media')}
          className="px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors bg-[#24130D] hover:bg-[#341b12] text-[#F4C95D] border-[#F4C95D]/40 hover:border-[#F4C95D]"
          title="Open Media Library to upload and manage pictures"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#F45AA8]" />
          <span>Media Library</span>
        </button>

        {/* Add Section */}
        <button
          type="button"
          onClick={() => setDrawerTab(activeDrawerTab === 'sections' ? null : 'sections')}
          className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
            activeDrawerTab === 'sections'
              ? 'bg-[#F45AA8] text-white border-transparent'
              : 'bg-[#24130D] hover:bg-[#341b12] text-[#FFF4DE] border-[#F4C95D]/30'
          }`}
        >
          <PlusSquare className="w-3.5 h-3.5 text-[#F4C95D]" />
          <span>Add Section</span>
        </button>

        {/* Products Manager */}
        <button
          type="button"
          onClick={() => setDrawerTab(activeDrawerTab === 'products' ? null : 'products')}
          className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
            activeDrawerTab === 'products'
              ? 'bg-[#F45AA8] text-white border-transparent'
              : 'bg-[#24130D] hover:bg-[#341b12] text-[#FFF4DE] border-[#F4C95D]/30'
          }`}
        >
          <Cake className="w-3.5 h-3.5 text-[#F45AA8]" />
          <span>Products & Deals</span>
        </button>

        {/* Messages Inbox */}
        <button
          type="button"
          onClick={() => setDrawerTab(activeDrawerTab === 'messages' ? null : 'messages')}
          className={`relative px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
            activeDrawerTab === 'messages'
              ? 'bg-[#F45AA8] text-white border-transparent'
              : 'bg-[#24130D] hover:bg-[#341b12] text-[#FFF4DE] border-[#F4C95D]/30'
          }`}
        >
          <Mail className="w-3.5 h-3.5 text-[#F4C95D]" />
          <span>Messages</span>
          {unreadCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#F45AA8] text-white font-bold text-[10px] flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Layout & Resizing Dimensions */}
        <button
          type="button"
          onClick={() => setDrawerTab(activeDrawerTab === 'styling' ? null : 'styling')}
          className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
            activeDrawerTab === 'styling'
              ? 'bg-[#F45AA8] text-white border-transparent'
              : 'bg-[#24130D] hover:bg-[#341b12] text-[#FFF4DE] border-[#F4C95D]/30'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#F4C95D]" />
          <span>Sizes & Styles</span>
        </button>
      </div>

      {/* Right: Publish Button, Reset & Logout */}
      <div className="flex items-center gap-2">
        {/* Prominent Publish Button */}
        <button
          type="button"
          onClick={handlePublish}
          className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
            justPublished
              ? 'bg-emerald-600 text-white'
              : publishStatus === 'draft'
              ? 'bg-gradient-to-r from-[#F4C95D] via-[#FFE27A] to-[#F4C95D] text-black shadow-[0_0_15px_rgba(244,201,93,0.5)] animate-pulse'
              : 'bg-[#24130D] text-[#F4C95D] border border-[#F4C95D]/40 hover:bg-[#341b12]'
          }`}
          title={
            lastPublishedAt
              ? `Last published: ${lastPublishedAt}. Click to save and publish all changes.`
              : 'Click to publish all live edits'
          }
        >
          {justPublished ? (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Published!</span>
            </>
          ) : publishStatus === 'draft' ? (
            <>
              <Globe className="w-3.5 h-3.5 text-black" />
              <span>Publish Changes</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Published ✓</span>
            </>
          )}
        </button>

        {/* Reset to Default */}
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset all content & dimensions back to default flyer settings?')) {
              resetConfig();
              resetDimensions();
            }
          }}
          className="p-1.5 rounded-lg hover:bg-black/50 text-[#FFF4DE]/60 hover:text-white"
          title="Reset to default settings"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={logout}
          className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-200 font-semibold flex items-center gap-1.5 transition-colors"
          title="Log out of admin"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
