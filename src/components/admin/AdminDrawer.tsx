import React, { useState } from 'react';
import { useAdmin, CustomSection, StoredMessage } from '../../context/AdminContext';
import {
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Cake,
  Mail,
  Sliders,
  PlusSquare,
  Send,
  Phone,
  Copy,
  Check,
  Download,
  Upload,
  Sparkles,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';

export const AdminDrawer: React.FC = () => {
  const {
    activeDrawerTab,
    setDrawerTab,
    sections,
    addSection,
    updateSection,
    deleteSection,
    reorderSection,
    config,
    addProduct,
    deleteProduct,
    addCombo,
    deleteCombo,
    messages,
    updateMessageStatus,
    deleteMessage,
    dimensions,
    updateDimension,
    exportDataJSON,
    importDataJSON,
    openMediaPicker,
    resetCustomLogo,
  } = useAdmin();

  // New section form state
  const [newSecType, setNewSecType] = useState<CustomSection['type']>('cta');
  const [newSecTitle, setNewSecTitle] = useState('');
  const [newSecSubtitle, setNewSecSubtitle] = useState('');
  const [newSecContent, setNewSecContent] = useState('');
  const [newSecBadge, setNewSecBadge] = useState('');
  const [newSecBtnText, setNewSecBtnText] = useState('Explore More');
  const [newSecBtnLink, setNewSecBtnLink] = useState('#order');
  const [newSecBg, setNewSecBg] = useState<CustomSection['bgStyle']>('chocolate');

  // New product form state
  const [prodType, setProdType] = useState<'brownie' | 'cookie'>('brownie');
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState<number>(4.5);
  const [prodSubtitle, setProdSubtitle] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodSpecial, setProdSpecial] = useState(false);

  // New combo form state
  const [comboName, setComboName] = useState('');
  const [comboItems, setComboItems] = useState('');
  const [comboPrice, setComboPrice] = useState<number>(25);
  const [comboDesc, setComboDesc] = useState('');

  // Copy indicator for messages
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Import JSON state
  const [importJsonText, setImportJsonText] = useState('');
  const [importSuccess, setImportSuccess] = useState<boolean | null>(null);

  if (!activeDrawerTab) return null;

  const handleCreateSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecTitle.trim()) return;

    addSection({
      type: newSecType,
      title: newSecTitle,
      subtitle: newSecSubtitle || undefined,
      content: newSecContent || undefined,
      badgeText: newSecBadge || undefined,
      buttonText: newSecBtnText || undefined,
      buttonLink: newSecBtnLink || undefined,
      bgStyle: newSecBg,
      padding: 'md',
      enabled: true,
      items:
        newSecType === 'faq'
          ? [
              { id: '1', title: 'Sample Question', desc: 'Sample answer explaining fresh ingredients.' },
              { id: '2', title: 'Delivery Details', desc: 'Sample answer describing local delivery pickup.' }
            ]
          : undefined,
    });

    setNewSecTitle('');
    setNewSecSubtitle('');
    setNewSecContent('');
    setNewSecBadge('');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    addProduct({
      type: prodType,
      name: prodName,
      price: Number(prodPrice) || 4.5,
      category: prodType === 'brownie' ? 'Signature Brownie' : 'Signature Cookie',
      subtitle: prodSubtitle || 'Fresh Handcrafted Batch',
      description: prodDesc || 'Rich, soft, and baked with love.',
      isSpecial: prodSpecial,
    });

    setProdName('');
    setProdSubtitle('');
    setProdDesc('');
    setProdSpecial(false);
  };

  const handleCreateCombo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comboName.trim()) return;

    addCombo({
      name: comboName,
      items: comboItems || comboName,
      price: Number(comboPrice) || 25,
      description: comboDesc || 'Curated assortment of delicious treats.',
    });

    setComboName('');
    setComboItems('');
    setComboDesc('');
  };

  const handleCopyMessage = (msg: StoredMessage) => {
    const text = `Customer: ${msg.customerName} (${msg.customerContact})\nNotes: ${msg.notes}\nItems: ${msg.items?.join(', ') || 'N/A'}`;
    navigator.clipboard.writeText(text);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleExport = () => {
    const json = exportDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unicorn-treats-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const success = importDataJSON(importJsonText);
    setImportSuccess(success);
    if (success) {
      setTimeout(() => setImportSuccess(null), 2000);
      setImportJsonText('');
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#140804] border-l border-[#F4C95D]/30 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 text-[#FFF4DE]">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#F4C95D]/20 bg-[#1c0d08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#24130D] border border-[#F4C95D]/30 text-[#F4C95D]">
            {activeDrawerTab === 'sections' && <PlusSquare className="w-4 h-4" />}
            {activeDrawerTab === 'products' && <Cake className="w-4 h-4" />}
            {activeDrawerTab === 'messages' && <Mail className="w-4 h-4" />}
            {activeDrawerTab === 'styling' && <Sliders className="w-4 h-4" />}
          </span>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FFF4DE] capitalize">
              {activeDrawerTab === 'sections' && 'Add & Manage Sections'}
              {activeDrawerTab === 'products' && 'Products & Combo Deals'}
              {activeDrawerTab === 'messages' && `Customer Inquiries (${messages.length})`}
              {activeDrawerTab === 'styling' && 'Sizes & Elementor Layout'}
            </h3>
            <p className="text-[11px] text-[#FF9ACB]">WordPress / Elementor Live Control</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDrawerTab(null)}
          className="p-1.5 rounded-lg text-[#FFF4DE]/60 hover:text-white hover:bg-black/40"
          aria-label="Close admin drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="px-4 py-2 border-b border-[#FFF4DE]/10 bg-black/40 flex items-center gap-1 overflow-x-auto text-xs">
        <button
          type="button"
          onClick={() => setDrawerTab('sections')}
          className={`px-3 py-1.5 rounded-md font-semibold shrink-0 transition-colors ${
            activeDrawerTab === 'sections' ? 'bg-[#F45AA8] text-white' : 'text-[#FFF4DE]/70 hover:text-white'
          }`}
        >
          Sections
        </button>
        <button
          type="button"
          onClick={() => setDrawerTab('products')}
          className={`px-3 py-1.5 rounded-md font-semibold shrink-0 transition-colors ${
            activeDrawerTab === 'products' ? 'bg-[#F45AA8] text-white' : 'text-[#FFF4DE]/70 hover:text-white'
          }`}
        >
          Products
        </button>
        <button
          type="button"
          onClick={() => setDrawerTab('messages')}
          className={`px-3 py-1.5 rounded-md font-semibold shrink-0 transition-colors ${
            activeDrawerTab === 'messages' ? 'bg-[#F45AA8] text-white' : 'text-[#FFF4DE]/70 hover:text-white'
          }`}
        >
          Messages Inbox
        </button>
        <button
          type="button"
          onClick={() => setDrawerTab('styling')}
          className={`px-3 py-1.5 rounded-md font-semibold shrink-0 transition-colors ${
            activeDrawerTab === 'styling' ? 'bg-[#F45AA8] text-white' : 'text-[#FFF4DE]/70 hover:text-white'
          }`}
        >
          Sizes & Scaling
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

        {/* ================= TAB 1: SECTIONS ================= */}
        {activeDrawerTab === 'sections' && (
          <>
            {/* Create New Section Card */}
            <div className="p-4 rounded-2xl bg-black/50 border border-[#F4C95D]/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F4C95D]">
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Section to Website</span>
              </div>

              <form onSubmit={handleCreateSection} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Section Type</label>
                  <select
                    value={newSecType}
                    onChange={(e) => setNewSecType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#24130D] border border-[#FFF4DE]/15 text-[#FFF4DE]"
                  >
                    <option value="cta">CTA Event Banner / Announcement</option>
                    <option value="faq">FAQ Accordion</option>
                    <option value="features">Features / Value Pillars</option>
                    <option value="story">Chef Story / Behind the Scenes</option>
                    <option value="review">Customer Reviews / Sweet Love</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Section Title *</label>
                  <input
                    type="text"
                    required
                    value={newSecTitle}
                    onChange={(e) => setNewSecTitle(e.target.value)}
                    placeholder="e.g. Birthday Party Packages"
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Subtitle / Script</label>
                  <input
                    type="text"
                    value={newSecSubtitle}
                    onChange={(e) => setNewSecSubtitle(e.target.value)}
                    placeholder="e.g. Handcrafted with love for your special day"
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Content / Description</label>
                  <textarea
                    rows={2}
                    value={newSecContent}
                    onChange={(e) => setNewSecContent(e.target.value)}
                    placeholder="Enter section description..."
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={newSecBtnText}
                      onChange={(e) => setNewSecBtnText(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Background Style</label>
                    <select
                      value={newSecBg}
                      onChange={(e) => setNewSecBg(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-[#24130D] border border-[#FFF4DE]/15 text-[#FFF4DE]"
                    >
                      <option value="chocolate">Chocolate Dark</option>
                      <option value="gradient">Pink & Gold Gradient</option>
                      <option value="dark">Deep Black</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] to-[#FF9ACB] text-white shadow-md hover:brightness-105"
                >
                  Insert Section
                </button>
              </form>
            </div>

            {/* Existing Sections List */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#F4C95D]">
                Active Custom Sections ({sections.length})
              </h4>

              {sections.map((sec, index) => (
                <div
                  key={sec.id}
                  className="p-3.5 rounded-xl bg-black/40 border border-[#FFF4DE]/15 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#F4C95D] font-bold">#{index + 1}</span>
                      <span className="font-bold text-[#FFF4DE] truncate">{sec.title}</span>
                    </div>
                    <p className="text-[11px] text-[#FFF4DE]/60 capitalize truncate">
                      Type: {sec.type} · Style: {sec.bgStyle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateSection(sec.id, { enabled: !sec.enabled })}
                      className={`p-1.5 rounded-lg border ${
                        sec.enabled ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-red-950 border-red-500 text-red-400'
                      }`}
                      title={sec.enabled ? 'Section is visible' : 'Section is hidden'}
                    >
                      {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => reorderSection(sec.id, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg bg-[#24130D] text-[#FFF4DE] disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => reorderSection(sec.id, 'down')}
                      disabled={index === sections.length - 1}
                      className="p-1.5 rounded-lg bg-[#24130D] text-[#FFF4DE] disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteSection(sec.id)}
                      className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-800 text-red-300"
                      title="Delete section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= TAB 2: PRODUCTS & DEALS ================= */}
        {activeDrawerTab === 'products' && (
          <>
            {/* Add Product Form */}
            <div className="p-4 rounded-2xl bg-black/50 border border-[#F4C95D]/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F4C95D]">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Brownie or Cookie Flavor</span>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Category</label>
                    <select
                      value={prodType}
                      onChange={(e) => setProdType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-[#24130D] border border-[#FFF4DE]/15 text-[#FFF4DE]"
                    >
                      <option value="brownie">Signature Brownie</option>
                      <option value="cookie">Signature Cookie</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      required
                      value={prodPrice}
                      onChange={(e) => setProdPrice(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Flavor Name *</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. Raspberry Dark Truffle"
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Subtitle Note</label>
                  <input
                    type="text"
                    value={prodSubtitle}
                    onChange={(e) => setProdSubtitle(e.target.value)}
                    placeholder="e.g. Sun-ripened berries & 70% cacao"
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    placeholder="Rich, fudgy brownie layered with dark chocolate ganache..."
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="prod-special"
                    checked={prodSpecial}
                    onChange={(e) => setProdSpecial(e.target.checked)}
                    className="rounded accent-[#F45AA8]"
                  />
                  <label htmlFor="prod-special" className="text-[11px] text-[#FF9ACB]">
                    Mark as Limited Seasonal Special
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] to-[#FF9ACB] text-white shadow-md hover:brightness-105"
                >
                  Save New Flavor
                </button>
              </form>
            </div>

            {/* Add Combo Form */}
            <div className="p-4 rounded-2xl bg-black/50 border border-[#F4C95D]/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F4C95D]">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Special Combo Deal</span>
              </div>

              <form onSubmit={handleCreateCombo} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Combo Title *</label>
                    <input
                      type="text"
                      required
                      value={comboName}
                      onChange={(e) => setComboName(e.target.value)}
                      placeholder="e.g. 8 Brownies Box"
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Price ($) *</label>
                    <input
                      type="number"
                      required
                      value={comboPrice}
                      onChange={(e) => setComboPrice(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#FFF4DE]/70 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={comboDesc}
                    onChange={(e) => setComboDesc(e.target.value)}
                    placeholder="Enter combo details..."
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold uppercase tracking-wider bg-[#24130D] hover:bg-[#341b12] text-[#F4C95D] border border-[#F4C95D]/40"
                >
                  Save Combo Deal
                </button>
              </form>
            </div>

            {/* List Current Items */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#F45AA8]">
                Current Brownies ({config.brownies.flavors.length})
              </h4>
              {config.brownies.flavors.map((p) => (
                <div key={p.id} className="p-2.5 rounded-lg bg-black/30 border border-[#FFF4DE]/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#FFF4DE]">{p.name}</p>
                    <p className="text-[11px] text-[#F4C95D]">{p.formattedPrice}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteProduct(p.id, 'brownie')}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#F45AA8]">
                Current Cookies ({config.cookies.flavors.length})
              </h4>
              {config.cookies.flavors.map((p) => (
                <div key={p.id} className="p-2.5 rounded-lg bg-black/30 border border-[#FFF4DE]/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#FFF4DE]">{p.name}</p>
                    <p className="text-[11px] text-[#F4C95D]">{p.formattedPrice}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteProduct(p.id, 'cookie')}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= TAB 3: CUSTOMER MESSAGES INBOX ================= */}
        {activeDrawerTab === 'messages' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#FFF4DE]/70">
                Inquiries and orders received directly from the landing page.
              </p>
              <span className="px-2 py-0.5 rounded-full bg-[#F45AA8] text-white text-[11px] font-bold">
                {messages.length} Total
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-12 text-[#FFF4DE]/50">
                <Mail className="w-12 h-12 mx-auto mb-2 text-[#F4C95D]" />
                <p>No messages received yet.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl border transition-colors ${
                    msg.status === 'new'
                      ? 'bg-[#220d07] border-[#F45AA8] shadow-[0_4px_16px_rgba(244,90,168,0.2)]'
                      : 'bg-black/40 border-[#FFF4DE]/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-bold text-[#FFF4DE]">
                      {msg.customerName}
                    </span>
                    <span className="text-[10px] text-[#FFF4DE]/50">
                      {new Date(msg.timestamp).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-[#F4C95D] mb-2">{msg.customerContact}</p>

                  {msg.notes && (
                    <p className="text-xs text-[#FFF4DE]/80 bg-black/40 p-2.5 rounded-lg border border-[#FFF4DE]/5 mb-3 leading-relaxed">
                      "{msg.notes}"
                    </p>
                  )}

                  {msg.items && msg.items.length > 0 && (
                    <div className="mb-3 text-[11px] text-[#FF9ACB] bg-[#1a0a06] p-2 rounded">
                      <strong>Cart Items:</strong> {msg.items.join(', ')}
                      {msg.totalEstimate && (
                        <span className="text-[#F4C95D] ml-2">(${msg.totalEstimate.toFixed(2)})</span>
                      )}
                    </div>
                  )}

                  {/* Actions row */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#FFF4DE]/10 text-xs">
                    <select
                      value={msg.status}
                      onChange={(e) => updateMessageStatus(msg.id, e.target.value as any)}
                      className="px-2 py-1 rounded bg-[#24130D] border border-[#FFF4DE]/15 text-[11px] text-[#FFF4DE]"
                    >
                      <option value="new">🔴 New</option>
                      <option value="contacted">🟡 In Progress</option>
                      <option value="completed">🟢 Fulfilled</option>
                    </select>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg)}
                        className="p-1.5 rounded bg-black/60 hover:bg-black text-[#FFF4DE]/80"
                        title="Copy message text"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteMessage(msg.id)}
                        className="p-1.5 rounded bg-red-950/60 hover:bg-red-800 text-red-300"
                        title="Delete message"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= TAB 4: SIZES & STYLING ================= */}
        {activeDrawerTab === 'styling' && (
          <div className="space-y-5 text-xs">
            <div className="p-3.5 rounded-xl bg-black/50 border border-[#F4C95D]/30">
              <p className="text-[#F4C95D] font-bold uppercase tracking-wider mb-1">
                Visual Dimension Controls
              </p>
              <p className="text-[#FFF4DE]/60 text-[11px]">
                Adjust sizes using sliders below or grab the edge handles of elements directly on the page!
              </p>
            </div>

            {/* Editable Logo & Branding Pictures */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#24130D] to-[#170a05] border border-[#F4C95D]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#F4C95D] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#F45AA8]" />
                  Logo &amp; Brand Media
                </span>
                <button
                  type="button"
                  onClick={() => openMediaPicker()}
                  className="text-[10px] text-[#FF9ACB] hover:underline flex items-center gap-1"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Open Media Library</span>
                </button>
              </div>

              {/* Header Logo Controls */}
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/40 border border-[#FFF4DE]/10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🦄</span>
                  <div>
                    <p className="text-xs font-semibold text-[#FFF4DE]">Header Brand Logo</p>
                    <p className="text-[10px] text-[#FFF4DE]/50">
                      {config.branding?.customLogoUrl ? 'Custom Image Active' : 'Default Royal SVG'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openMediaPicker({ type: 'logo' })}
                    className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-[#F45AA8] text-white hover:brightness-105"
                  >
                    Change Logo
                  </button>
                  {config.branding?.customLogoUrl && (
                    <button
                      type="button"
                      onClick={resetCustomLogo}
                      className="px-2 py-1 rounded-md text-[10px] font-bold text-[#FFF4DE]/60 hover:text-white"
                      title="Reset to default SVG"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Hero Banner Image */}
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/40 border border-[#FFF4DE]/10">
                <div>
                  <p className="text-xs font-semibold text-[#FFF4DE]">Hero Culinary Banner</p>
                  <p className="text-[10px] text-[#FFF4DE]/50">Primary dessert stack photo</p>
                </div>
                <button
                  type="button"
                  onClick={() => openMediaPicker({ type: 'hero' })}
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-[#24130D] hover:bg-[#341b12] text-[#F4C95D] border border-[#F4C95D]/40"
                >
                  Change Photo
                </button>
              </div>

              {/* Rosette Brand Seal */}
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/40 border border-[#FFF4DE]/10">
                <div>
                  <p className="text-xs font-semibold text-[#FFF4DE]">Closing Rosette Seal</p>
                  <p className="text-[10px] text-[#FFF4DE]/50">Official finale emblem</p>
                </div>
                <button
                  type="button"
                  onClick={() => openMediaPicker({ type: 'seal' })}
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-[#24130D] hover:bg-[#341b12] text-[#F4C95D] border border-[#F4C95D]/40"
                >
                  Change Seal
                </button>
              </div>
            </div>

            {/* Logo Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#FFF4DE]">Header Logo Size:</span>
                <span className="font-mono text-[#F4C95D]">{dimensions.logoSize}px</span>
              </div>
              <input
                type="range"
                min="28"
                max="80"
                value={dimensions.logoSize}
                onChange={(e) => updateDimension('logoSize', Number(e.target.value))}
                className="w-full accent-[#F45AA8]"
              />
            </div>

            {/* Hero Image Dimensions */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#FFF4DE]">Hero Image Width:</span>
                <span className="font-mono text-[#F4C95D]">{dimensions.heroImageWidth}px</span>
              </div>
              <input
                type="range"
                min="320"
                max="750"
                value={dimensions.heroImageWidth}
                onChange={(e) => updateDimension('heroImageWidth', Number(e.target.value))}
                className="w-full accent-[#F45AA8]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#FFF4DE]">Hero Image Height:</span>
                <span className="font-mono text-[#F4C95D]">{dimensions.heroImageHeight}px</span>
              </div>
              <input
                type="range"
                min="320"
                max="750"
                value={dimensions.heroImageHeight}
                onChange={(e) => updateDimension('heroImageHeight', Number(e.target.value))}
                className="w-full accent-[#F45AA8]"
              />
            </div>

            {/* Product Card Height */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#FFF4DE]">Product Card Height:</span>
                <span className="font-mono text-[#F4C95D]">{dimensions.cardHeight}px</span>
              </div>
              <input
                type="range"
                min="300"
                max="450"
                value={dimensions.cardHeight}
                onChange={(e) => updateDimension('cardHeight', Number(e.target.value))}
                className="w-full accent-[#F45AA8]"
              />
            </div>

            {/* Rosette Seal Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#FFF4DE]">Closing Rosette Seal Size:</span>
                <span className="font-mono text-[#F4C95D]">{dimensions.sealSize}px</span>
              </div>
              <input
                type="range"
                min="120"
                max="260"
                value={dimensions.sealSize}
                onChange={(e) => updateDimension('sealSize', Number(e.target.value))}
                className="w-full accent-[#F45AA8]"
              />
            </div>

            {/* Export & Backup */}
            <div className="pt-4 border-t border-[#FFF4DE]/10 space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#F4C95D]">
                Data Backup & Migration
              </h4>
              <button
                type="button"
                onClick={handleExport}
                className="w-full py-2.5 rounded-xl font-bold uppercase tracking-wider bg-[#24130D] hover:bg-[#341b12] text-[#F4C95D] border border-[#F4C95D]/40 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Layout & Content JSON</span>
              </button>

              <div className="pt-2">
                <textarea
                  rows={2}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste JSON backup here to restore..."
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#FFF4DE]/15 text-[#FFF4DE] text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={!importJsonText.trim()}
                  className="mt-2 w-full py-2 rounded-xl font-bold uppercase tracking-wider bg-black text-[#FFF4DE] border border-[#FFF4DE]/20 hover:border-[#F45AA8] disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Restore from JSON</span>
                </button>
                {importSuccess === true && (
                  <p className="mt-1 text-[11px] text-emerald-400 text-center">Data restored successfully!</p>
                )}
                {importSuccess === false && (
                  <p className="mt-1 text-[11px] text-red-400 text-center">Invalid JSON format.</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#F4C95D]/20 bg-[#1c0d08] flex items-center justify-between text-xs text-[#FFF4DE]/60">
        <span>Access Code: It'sDIDS'</span>
        <button
          type="button"
          onClick={() => setDrawerTab(null)}
          className="px-4 py-1.5 rounded-lg bg-black/60 text-white font-semibold"
        >
          Close Drawer
        </button>
      </div>

    </div>
  );
};
