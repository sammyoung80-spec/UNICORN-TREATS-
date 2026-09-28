import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  Check,
  Sparkles,
  Link as LinkIcon,
  Plus,
  Search,
  Filter,
} from 'lucide-react';
import { useAdmin, MediaItem } from '../../context/AdminContext';
import { triggerCelebrationConfetti } from '../../utils/confetti';

export const MediaLibraryModal: React.FC = () => {
  const {
    isMediaModalOpen,
    closeMediaPicker,
    mediaLibrary,
    addMediaItem,
    deleteMediaItem,
    uploadFileToMedia,
    mediaPickerTarget,
    selectMediaForTarget,
  } = useAdmin();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isMediaModalOpen) return null;

  // Filter media items
  const filteredItems = mediaLibrary.filter((item) => {
    const matchesCat =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          await uploadFileToMedia(file);
        }
      }
      triggerCelebrationConfetti();
    } catch (err) {
      console.error('Failed to upload file:', err);
      alert('Could not upload image. Please try a smaller image file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSelect = (item: MediaItem) => {
    if (mediaPickerTarget) {
      selectMediaForTarget(item.url);
      triggerCelebrationConfetti();
    }
  };

  const handleAddCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    addMediaItem({
      title: `Web Image (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      url: customUrlInput.trim(),
      category: 'uploads',
      size: 'Web URL',
    });
    setCustomUrlInput('');
    setShowUrlInput(false);
    triggerCelebrationConfetti();
  };

  const handleCopyUrl = async (item: MediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // fallback
    }
  };

  const handleDelete = (item: MediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${item.title}" from Media Library?`)) {
      deleteMediaItem(item.id);
    }
  };

  // Determine target friendly name
  const targetLabel = mediaPickerTarget
    ? mediaPickerTarget.type === 'logo'
      ? 'Header / Brand Logo'
      : mediaPickerTarget.type === 'seal'
      ? 'Rosette Brand Seal'
      : mediaPickerTarget.type === 'hero'
      ? 'Hero Banner Image'
      : mediaPickerTarget.type === 'product'
      ? 'Product Image'
      : 'Custom Section Media'
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeMediaPicker}
    >
      <div
        className="relative w-full max-w-5xl h-[90vh] max-h-[850px] rounded-3xl bg-[#120704] border border-[#F4C95D]/40 shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-[#FFF4DE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#F4C95D]/20 flex flex-wrap items-center justify-between gap-4 bg-[#1a0b06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F45AA8] to-[#F4C95D] flex items-center justify-center text-black font-bold shadow-md">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FFF4DE]">
                  Media Library
                </h3>
                {mediaPickerTarget && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F45AA8] text-white animate-pulse">
                    Select for: {targetLabel}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#F4C95D] font-script text-base -mt-1">
                Upload, manage, and assign pictures to your treats, logos & sections
              </p>
            </div>
          </div>

          {/* Top Actions: Upload button & Close */}
          <div className="flex items-center gap-2.5">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] to-[#FF9ACB] text-white shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading...' : 'Upload from Device'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowUrlInput((v) => !v)}
              className="px-3 py-2 rounded-full font-bold text-xs uppercase tracking-wider bg-[#24130D] hover:bg-[#341b13] border border-[#F4C95D]/40 text-[#F4C95D] transition-all flex items-center gap-1.5"
              title="Add Image via Web URL"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add URL</span>
            </button>

            <button
              type="button"
              onClick={closeMediaPicker}
              className="p-2 rounded-full text-[#FFF4DE]/60 hover:text-white hover:bg-white/10 transition-colors ml-1"
              aria-label="Close media library"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Add by URL Bar */}
        {showUrlInput && (
          <form
            onSubmit={handleAddCustomUrl}
            className="p-3 bg-black/40 border-b border-[#F4C95D]/20 flex items-center gap-2 animate-in slide-in-from-top-2 duration-150"
          >
            <LinkIcon className="w-4 h-4 text-[#F4C95D] ml-2 shrink-0" />
            <input
              type="url"
              placeholder="Paste image link URL (e.g. https://images.unsplash.com/...)"
              value={customUrlInput}
              onChange={(e) => setCustomUrlInput(e.target.value)}
              className="flex-1 bg-black/60 border border-[#FFF4DE]/20 rounded-xl px-3 py-1.5 text-xs text-[#FFF4DE] focus:border-[#F4C95D] focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#F4C95D] text-black hover:brightness-105"
            >
              Add to Library
            </button>
          </form>
        )}

        {/* Search & Category Filter Toolbar */}
        <div className="px-5 py-3 border-b border-[#FFF4DE]/10 flex flex-wrap items-center justify-between gap-3 bg-[#150905]">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Media' },
              { id: 'products', label: 'Treats & Products' },
              { id: 'branding', label: 'Logos & Seals' },
              { id: 'combos', label: 'Combos & Gift Boxes' },
              { id: 'uploads', label: 'My Uploads' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#F4C95D] text-black shadow-sm font-bold'
                    : 'bg-[#24130D]/70 text-[#FFF4DE]/70 hover:text-white hover:bg-[#24130D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-[#FFF4DE]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-black/50 border border-[#FFF4DE]/15 text-xs text-[#FFF4DE] placeholder:text-[#FFF4DE]/40 focus:border-[#F4C95D] focus:outline-none"
            />
          </div>
        </div>

        {/* Main Body: Drag & Drop Zone + Gallery Grid */}
        <div
          className="flex-1 overflow-y-auto p-5 sm:p-6 custom-scrollbar relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Drag & Drop Visual Overlay */}
          {isDragging && (
            <div className="absolute inset-4 z-40 rounded-3xl bg-[#F45AA8]/20 border-2 border-dashed border-[#F45AA8] backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none animate-in fade-in">
              <Upload className="w-12 h-12 text-[#F45AA8] animate-bounce" />
              <p className="font-serif text-xl font-bold text-white mt-3">
                Drop your picture files here!
              </p>
              <p className="text-xs text-[#FF9ACB] mt-1 font-script text-lg">
                They will be added straight to your Unicorn Treats media library
              </p>
            </div>
          )}

          {/* Empty State */}
          {filteredItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#FFF4DE]/15 rounded-3xl">
              <ImageIcon className="w-12 h-12 text-[#FFF4DE]/30 mb-3" />
              <p className="font-serif text-base font-bold text-[#FFF4DE]">
                No pictures found in this category
              </p>
              <p className="text-xs text-[#FFF4DE]/60 mt-1 max-w-sm">
                Drag and drop image files from your computer or click "Upload from Device" above.
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider bg-[#24130D] hover:bg-[#341b13] border border-[#F4C95D]/40 text-[#F4C95D]"
              >
                Upload Picture Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.map((item) => {
                const isSelectedForTarget =
                  mediaPickerTarget &&
                  item.url === (mediaPickerTarget.id ? '' : ''); // can show active state

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`group relative rounded-2xl overflow-hidden bg-black/60 border transition-all flex flex-col ${
                      mediaPickerTarget
                        ? 'cursor-pointer hover:border-[#F4C95D] hover:scale-102 hover:shadow-[0_8px_25px_rgba(244,201,93,0.3)]'
                        : 'border-[#FFF4DE]/15 hover:border-[#FFF4DE]/40'
                    }`}
                  >
                    {/* Image Thumbnail Container */}
                    <div className="relative aspect-square w-full overflow-hidden bg-[#1c0d08] flex items-center justify-center">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Hover Overlay in Picker Mode */}
                      {mediaPickerTarget && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                          <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#F45AA8] to-[#F4C95D] text-black font-bold text-[11px] uppercase tracking-wider shadow-lg flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Use Picture</span>
                          </span>
                        </div>
                      )}

                      {/* Delete Button (for custom uploads or user items) */}
                      <button
                        type="button"
                        onClick={(e) => handleDelete(item, e)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-all shadow-md"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Category Badge */}
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[9px] uppercase tracking-wider font-bold text-[#F4C95D]">
                        {item.category}
                      </span>
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-2.5 bg-[#180905] flex items-center justify-between gap-1">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-[#FFF4DE] truncate" title={item.title}>
                          {item.title}
                        </p>
                        <p className="text-[10px] text-[#FFF4DE]/50 font-mono">
                          {item.size || 'HD Image'}
                        </p>
                      </div>

                      {/* Copy link button */}
                      <button
                        type="button"
                        onClick={(e) => handleCopyUrl(item, e)}
                        className="p-1 rounded-md text-[#FFF4DE]/60 hover:text-[#F4C95D] hover:bg-black/40 transition-colors shrink-0"
                        title="Copy Image URL"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <LinkIcon className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 px-6 border-t border-[#F4C95D]/20 bg-[#160804] flex flex-wrap items-center justify-between gap-3 text-xs text-[#FFF4DE]/70">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#F4C95D] font-bold">
              {filteredItems.length}
            </span>
            <span>assets in library</span>
            <span className="text-[#FFF4DE]/20">·</span>
            <span className="text-[11px] text-[#FF9ACB]">
              Drag & drop pictures anywhere to add instantly
            </span>
          </div>

          <div className="flex items-center gap-3">
            {mediaPickerTarget && (
              <span className="text-xs font-semibold text-[#F4C95D]">
                Click any picture above to assign it
              </span>
            )}
            <button
              type="button"
              onClick={closeMediaPicker}
              className="px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider bg-[#24130D] hover:bg-[#341b13] text-[#FFF4DE] border border-[#FFF4DE]/20"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
