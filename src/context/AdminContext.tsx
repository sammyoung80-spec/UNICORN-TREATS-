import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BRAND_CONFIG, BrandConfig, ProductItem, ComboDeal } from '../data/config';
import { ASSETS } from '../assets/assetMap';

export interface VisualDimensions {
  logoSize: number; // px, default 42
  heroImageWidth: number; // px, default 520
  heroImageHeight: number; // px, default 520
  cardHeight: number; // px, default 360
  cardWidth: number; // px or %
  headerPaddingY: number; // px, default 16
  footerPaddingY: number; // px, default 64
  sealSize: number; // px, default 180
}

export interface CustomSectionItem {
  id: string;
  title: string;
  desc: string;
  icon?: string;
  image?: string;
}

export interface CustomSection {
  id: string;
  type: 'cta' | 'features' | 'faq' | 'gallery' | 'story' | 'review';
  title: string;
  subtitle?: string;
  content?: string;
  badgeText?: string;
  buttonText?: string;
  buttonLink?: string;
  bgStyle?: 'chocolate' | 'dark' | 'gradient' | 'pink-accent';
  padding?: 'sm' | 'md' | 'lg';
  enabled: boolean;
  order: number;
  items?: CustomSectionItem[];
}

export interface StoredMessage {
  id: string;
  customerName: string;
  customerContact: string;
  notes: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'completed';
  items?: string[];
  totalEstimate?: number;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: 'products' | 'branding' | 'combos' | 'uploads';
  uploadedAt: string;
  size?: string;
}

export interface MediaPickerTarget {
  type: 'product' | 'logo' | 'hero' | 'seal' | 'section';
  id?: string;
  field?: string;
}

interface AdminContextType {
  // Auth & Mode
  isAdminLoggedIn: boolean;
  isEditMode: boolean;
  activeDrawerTab: 'sections' | 'products' | 'messages' | 'styling' | 'media' | 'settings' | null;
  login: (code: string) => boolean;
  logout: () => void;
  toggleEditMode: () => void;
  setDrawerTab: (tab: 'sections' | 'products' | 'messages' | 'styling' | 'media' | 'settings' | null) => void;

  // Site Configuration & Content
  config: BrandConfig;
  updateBrandText: (path: string, value: any) => void;
  updateConfig: (newConfig: Partial<BrandConfig>) => void;
  resetConfig: () => void;

  // Visual Dimensions & Resizing
  dimensions: VisualDimensions;
  updateDimension: (key: keyof VisualDimensions, value: number) => void;
  resetDimensions: () => void;

  // Custom Sections (Elementor / WordPress style)
  sections: CustomSection[];
  addSection: (section: Omit<CustomSection, 'id' | 'order'>) => void;
  updateSection: (id: string, updated: Partial<CustomSection>) => void;
  deleteSection: (id: string) => void;
  reorderSection: (id: string, direction: 'up' | 'down') => void;

  // Products Management
  addProduct: (product: Omit<ProductItem, 'id' | 'formattedPrice'> & { type: 'brownie' | 'cookie' }) => void;
  updateProduct: (id: string, type: 'brownie' | 'cookie', updated: Partial<ProductItem>) => void;
  deleteProduct: (id: string, type: 'brownie' | 'cookie') => void;
  addCombo: (combo: Omit<ComboDeal, 'id' | 'formattedPrice'>) => void;
  updateCombo: (id: string, updated: Partial<ComboDeal>) => void;
  deleteCombo: (id: string) => void;

  // Customer Messages & Inquiries
  messages: StoredMessage[];
  addCustomerMessage: (msg: { customerName: string; customerContact: string; notes: string; items?: string[]; totalEstimate?: number }) => void;
  updateMessageStatus: (id: string, status: StoredMessage['status']) => void;
  deleteMessage: (id: string) => void;
  unreadCount: number;

  // Media Library
  mediaLibrary: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  deleteMediaItem: (id: string) => void;
  uploadFileToMedia: (file: File) => Promise<string>;
  isMediaModalOpen: boolean;
  mediaPickerTarget: MediaPickerTarget | null;
  openMediaPicker: (target?: MediaPickerTarget) => void;
  closeMediaPicker: () => void;
  selectMediaForTarget: (url: string) => void;

  // Editable Logos & Branding Assets
  updateCustomLogo: (url: string) => void;
  resetCustomLogo: () => void;
  updateCustomSeal: (url: string) => void;
  updateCustomHeroImage: (url: string) => void;

  // Publish System
  publishStatus: 'published' | 'draft';
  lastPublishedAt: string | null;
  publishChanges: () => void;

  // Persistence helpers
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
}

const DEFAULT_DIMENSIONS: VisualDimensions = {
  logoSize: 42,
  heroImageWidth: 520,
  heroImageHeight: 520,
  cardHeight: 360,
  cardWidth: 0, // 0 = full responsive width
  headerPaddingY: 16,
  footerPaddingY: 64,
  sealSize: 180,
};

const DEFAULT_CUSTOM_SECTIONS: CustomSection[] = [
  {
    id: 'sec-custom-catering',
    type: 'cta',
    title: 'Party Catering & Custom Dessert Tables',
    subtitle: 'Make your sweet celebrations truly unforgettable',
    content: 'From sweet 16s and quinceañeras to birthday parties and corporate thank-yous, Jolene crafts custom dessert pyramids, color-coordinated brownies, and individually wrapped party favors.',
    badgeText: 'EVENT CATERING',
    buttonText: 'Book Event Sweet Table',
    buttonLink: '#order',
    bgStyle: 'gradient',
    padding: 'md',
    enabled: true,
    order: 1,
    items: [
      { id: 'cat-1', title: 'Custom Color Themes', desc: 'Decorated with custom matching sprinkles and gold luster.' },
      { id: 'cat-2', title: 'Individually Packaged', desc: 'Sealed with personalized Unicorn Treats bows & tags.' },
      { id: 'cat-3', title: 'Delivered Fresh', desc: 'Baked day-of for maximum fudge and crisp golden centers.' },
    ],
  },
  {
    id: 'sec-custom-faq',
    type: 'faq',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you want to know about our fresh homemade treats',
    badgeText: 'HELP & FAQ',
    bgStyle: 'chocolate',
    padding: 'md',
    enabled: true,
    order: 2,
    items: [
      { id: 'faq-1', title: 'How far in advance should I order?', desc: 'Because all treats are baked fresh in small artisanal batches, we recommend ordering 24–48 hours ahead. Large party boxes require 3–5 days notice.' },
      { id: 'faq-2', title: 'How long do brownies and cookies stay fresh?', desc: 'Store in an airtight container at room temperature for up to 5 days, or refrigerate for up to 10 days. Pop them in the microwave for 10 seconds for gooey molten perfection!' },
      { id: 'faq-3', title: 'Do you offer pickup or delivery?', desc: 'Yes! We coordinate local pickups and scheduled delivery via WhatsApp, text, or Instagram DM.' },
      { id: 'faq-4', title: 'Can I customize combo box flavors?', desc: 'Absolutely! Our 12-Piece Box and 6+6 Special Combo allow you to pick any assortment of signature brownies and cookies.' },
    ],
  },
];

const INITIAL_DEMO_MESSAGES: StoredMessage[] = [
  {
    id: 'msg-demo-1',
    customerName: 'Brianna Smith',
    customerContact: '(555) 321-9876',
    notes: 'Hi Jolene! Looking to get the 12-Piece Box for my sister’s 16th birthday party on Friday. Can we include Strawberry White Chocolate cookies and Chocolate Pecan brownies?',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'new',
    items: ['1x 12-Piece Box (mix) ($40)'],
    totalEstimate: 40,
  },
  {
    id: 'msg-demo-2',
    customerName: 'Marcus Turner',
    customerContact: 'marcus.t@example.com',
    notes: 'Loved the Cookies & Cream brownie from last week! Placing another order for the 6+6 Special Combo.',
    timestamp: new Date(Date.now() - 3600000 * 26).toISOString(),
    status: 'contacted',
    items: ['1x 6 Brownies + 6 Cookies ($45)'],
    totalEstimate: 45,
  },
];

const SEED_MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'med-hero-1',
    title: 'Hero Culinary Dessert Stack',
    url: ASSETS.hero,
    category: 'branding',
    uploadedAt: '2026-09-27',
    size: '1024x1024 HD',
  },
  {
    id: 'med-brownie-hero',
    title: 'Fudgy Dark Chocolate Brownies',
    url: ASSETS.brownies,
    category: 'products',
    uploadedAt: '2026-09-27',
    size: '1024x1024 HD',
  },
  {
    id: 'med-cookie-hero',
    title: 'Chewy Chocolate Chip Cookies',
    url: ASSETS.cookies,
    category: 'products',
    uploadedAt: '2026-09-27',
    size: '1024x1024 HD',
  },
  {
    id: 'med-combo-box',
    title: 'Handcrafted Combo Gift Box',
    url: ASSETS.combos,
    category: 'combos',
    uploadedAt: '2026-09-27',
    size: '1024x1024 HD',
  },
  {
    id: 'med-logo-svg',
    title: 'Royal Unicorn Gold Logo',
    url: '/icon.svg',
    category: 'branding',
    uploadedAt: '2026-09-27',
    size: 'SVG Vector',
  },
  {
    id: 'med-pwa-icon',
    title: 'App Mascot & Seal Badge',
    url: '/pwa-512x512.png',
    category: 'branding',
    uploadedAt: '2026-09-27',
    size: '512x512 PNG',
  },
  {
    id: 'med-matcha-brownie',
    title: 'Matcha White Chocolate Swirl',
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    category: 'products',
    uploadedAt: '2026-09-27',
    size: 'Web HD',
  },
  {
    id: 'med-red-velvet',
    title: 'Red Velvet Cream Cheese Brownie',
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    category: 'products',
    uploadedAt: '2026-09-27',
    size: 'Web HD',
  },
  {
    id: 'med-bday-cookie',
    title: 'Birthday Sprinkles Confetti Cookie',
    url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    category: 'products',
    uploadedAt: '2026-09-27',
    size: 'Web HD',
  },
  {
    id: 'med-double-choc',
    title: 'Double Fudge Brownie Slice',
    url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    category: 'products',
    uploadedAt: '2026-09-27',
    size: 'Web HD',
  },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('unicorn_admin_auth') === 'true';
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    return localStorage.getItem('unicorn_admin_edit_mode') === 'true';
  });

  const [activeDrawerTab, setActiveDrawerTab] = useState<'sections' | 'products' | 'messages' | 'styling' | 'media' | 'settings' | null>(null);

  // Publish System state
  const [publishStatus, setPublishStatus] = useState<'published' | 'draft'>('published');
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(() => {
    return localStorage.getItem('unicorn_last_published') || null;
  });

  // Media Library state
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('unicorn_admin_media_library_v1');
      return saved ? JSON.parse(saved) : SEED_MEDIA_LIBRARY;
    } catch {
      return SEED_MEDIA_LIBRARY;
    }
  });

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<MediaPickerTarget | null>(null);

  // Brand Configuration State
  const [config, setConfig] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem('unicorn_site_config');
      return saved ? JSON.parse(saved) : BRAND_CONFIG;
    } catch {
      return BRAND_CONFIG;
    }
  });

  // Visual Dimensions State
  const [dimensions, setDimensions] = useState<VisualDimensions>(() => {
    try {
      const saved = localStorage.getItem('unicorn_site_dimensions');
      return saved ? { ...DEFAULT_DIMENSIONS, ...JSON.parse(saved) } : DEFAULT_DIMENSIONS;
    } catch {
      return DEFAULT_DIMENSIONS;
    }
  });

  // Custom Dynamic Sections
  const [sections, setSections] = useState<CustomSection[]>(() => {
    try {
      const saved = localStorage.getItem('unicorn_site_sections');
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOM_SECTIONS;
    } catch {
      return DEFAULT_CUSTOM_SECTIONS;
    }
  });

  // Customer Inquiries / Messages Inbox
  const [messages, setMessages] = useState<StoredMessage[]>(() => {
    try {
      const saved = localStorage.getItem('unicorn_customer_messages');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_MESSAGES;
    } catch {
      return INITIAL_DEMO_MESSAGES;
    }
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('unicorn_site_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('unicorn_site_dimensions', JSON.stringify(dimensions));
  }, [dimensions]);

  useEffect(() => {
    localStorage.setItem('unicorn_site_sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('unicorn_customer_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('unicorn_admin_media_library_v1', JSON.stringify(mediaLibrary));
  }, [mediaLibrary]);

  useEffect(() => {
    localStorage.setItem('unicorn_admin_auth', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem('unicorn_admin_edit_mode', isEditMode ? 'true' : 'false');
  }, [isEditMode]);

  // Auth Functions
  const login = (code: string): boolean => {
    const trimmed = code.trim();
    if (trimmed === "It'sDIDS'" || trimmed === "ItsDIDS" || trimmed === "DIDS") {
      setIsAdminLoggedIn(true);
      setIsEditMode(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setIsEditMode(false);
    setActiveDrawerTab(null);
    setIsMediaModalOpen(false);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const setDrawerTab = (tab: 'sections' | 'products' | 'messages' | 'styling' | 'media' | 'settings' | null) => {
    setActiveDrawerTab(tab);
    if (tab === 'media') {
      setIsMediaModalOpen(true);
      setMediaPickerTarget(null);
    }
  };

  // Publish changes
  const publishChanges = () => {
    const timestamp = new Date().toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setLastPublishedAt(timestamp);
    setPublishStatus('published');
    localStorage.setItem('unicorn_last_published', timestamp);
  };

  // Helper to mark draft when changes occur
  const markDraft = () => {
    setPublishStatus('draft');
  };

  // Brand Text Editing (Inline & Modal)
  const updateBrandText = (path: string, value: any) => {
    markDraft();
    setConfig((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const updateConfig = (newConfig: Partial<BrandConfig>) => {
    markDraft();
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetConfig = () => {
    markDraft();
    setConfig(BRAND_CONFIG);
  };

  // Dimensions & Resizing
  const updateDimension = (key: keyof VisualDimensions, value: number) => {
    markDraft();
    setDimensions((prev) => ({ ...prev, [key]: value }));
  };

  const resetDimensions = () => {
    markDraft();
    setDimensions(DEFAULT_DIMENSIONS);
  };

  // Editable Logos & Branding Assets
  const updateCustomLogo = (url: string) => {
    markDraft();
    setConfig((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        customLogoUrl: url,
      },
    }));
  };

  const resetCustomLogo = () => {
    markDraft();
    setConfig((prev) => {
      const copy = { ...prev };
      if (copy.branding) {
        delete copy.branding.customLogoUrl;
      }
      return copy;
    });
  };

  const updateCustomSeal = (url: string) => {
    markDraft();
    setConfig((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        customSealUrl: url,
      },
    }));
  };

  const updateCustomHeroImage = (url: string) => {
    markDraft();
    setConfig((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        customHeroImageUrl: url,
      },
    }));
  };

  // Dynamic Section Management
  const addSection = (section: Omit<CustomSection, 'id' | 'order'>) => {
    markDraft();
    const newSection: CustomSection = {
      ...section,
      id: `sec-${Date.now()}`,
      order: sections.length + 1,
    };
    setSections((prev) => [...prev, newSection]);
  };

  const updateSection = (id: string, updated: Partial<CustomSection>) => {
    markDraft();
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, ...updated } : sec))
    );
  };

  const deleteSection = (id: string) => {
    markDraft();
    setSections((prev) => prev.filter((sec) => sec.id !== id));
  };

  const reorderSection = (id: string, direction: 'up' | 'down') => {
    markDraft();
    setSections((prev) => {
      const index = prev.findIndex((s) => s.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;

      const newArr = [...prev];
      const temp = newArr[index];
      newArr[index] = newArr[targetIndex];
      newArr[targetIndex] = temp;
      return newArr.map((sec, i) => ({ ...sec, order: i + 1 }));
    });
  };

  // Product Management
  const addProduct = (
    product: Omit<ProductItem, 'id' | 'formattedPrice'> & { type: 'brownie' | 'cookie' }
  ) => {
    markDraft();
    const newId = `${product.type === 'brownie' ? 'b' : 'c'}-${Date.now().toString(36)}`;
    const formattedPrice = `$${product.price.toFixed(2)}`;
    const newProduct: ProductItem = {
      id: newId,
      name: product.name,
      price: product.price,
      formattedPrice,
      category: product.category,
      subtitle: product.subtitle,
      description: product.description,
      tags: product.tags,
      isSpecial: product.isSpecial,
      image: product.image,
    };

    setConfig((prev) => {
      if (product.type === 'brownie') {
        return {
          ...prev,
          brownies: {
            ...prev.brownies,
            flavors: [...prev.brownies.flavors, newProduct],
          },
        };
      } else {
        return {
          ...prev,
          cookies: {
            ...prev.cookies,
            flavors: [...prev.cookies.flavors, newProduct],
          },
        };
      }
    });
  };

  const updateProduct = (
    id: string,
    type: 'brownie' | 'cookie',
    updated: Partial<ProductItem>
  ) => {
    markDraft();
    setConfig((prev) => {
      const field = type === 'brownie' ? 'brownies' : 'cookies';
      const updatedFlavors = prev[field].flavors.map((item) => {
        if (item.id === id) {
          const newPrice = updated.price !== undefined ? updated.price : item.price;
          const formattedPrice =
            updated.formattedPrice || `$${newPrice.toFixed(2)}`;
          return { ...item, ...updated, price: newPrice, formattedPrice };
        }
        return item;
      });
      return {
        ...prev,
        [field]: {
          ...prev[field],
          flavors: updatedFlavors,
        },
      };
    });
  };

  const deleteProduct = (id: string, type: 'brownie' | 'cookie') => {
    markDraft();
    setConfig((prev) => {
      const field = type === 'brownie' ? 'brownies' : 'cookies';
      return {
        ...prev,
        [field]: {
          ...prev[field],
          flavors: prev[field].flavors.filter((item) => item.id !== id),
        },
      };
    });
  };

  // Combos
  const addCombo = (combo: Omit<ComboDeal, 'id' | 'formattedPrice'>) => {
    markDraft();
    const newId = `combo-${Date.now().toString(36)}`;
    const formattedPrice = `$${combo.price.toFixed(2)}`;
    const newDeal: ComboDeal = {
      id: newId,
      ...combo,
      formattedPrice,
    };
    setConfig((prev) => ({
      ...prev,
      combos: [...prev.combos, newDeal],
    }));
  };

  const updateCombo = (id: string, updated: Partial<ComboDeal>) => {
    markDraft();
    setConfig((prev) => ({
      ...prev,
      combos: prev.combos.map((item) => {
        if (item.id === id) {
          const newPrice = updated.price !== undefined ? updated.price : item.price;
          const formattedPrice =
            updated.formattedPrice || `$${newPrice.toFixed(2)}`;
          return { ...item, ...updated, price: newPrice, formattedPrice };
        }
        return item;
      }),
    }));
  };

  const deleteCombo = (id: string) => {
    markDraft();
    setConfig((prev) => ({
      ...prev,
      combos: prev.combos.filter((c) => c.id !== id),
    }));
  };

  // Customer Messages
  const addCustomerMessage = (msg: {
    customerName: string;
    customerContact: string;
    notes: string;
    items?: string[];
    totalEstimate?: number;
  }) => {
    const newMsg: StoredMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      timestamp: new Date().toISOString(),
      status: 'new',
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const updateMessageStatus = (id: string, status: StoredMessage['status']) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const unreadCount = messages.filter((m) => m.status === 'new').length;

  // Media Library Operations
  const addMediaItem = (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    markDraft();
    const newItem: MediaItem = {
      id: `med-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      ...item,
    };
    setMediaLibrary((prev) => [newItem, ...prev]);
  };

  const deleteMediaItem = (id: string) => {
    markDraft();
    setMediaLibrary((prev) => prev.filter((m) => m.id !== id));
  };

  const uploadFileToMedia = async (file: File): Promise<string> => {
    markDraft();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (!result) {
          reject(new Error('Failed to read file'));
          return;
        }

        // Optimize image using canvas to prevent exceeding localStorage size
        const img = new Image();
        img.onload = () => {
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedUrl = canvas.toDataURL('image/jpeg', 0.85);

            addMediaItem({
              title: file.name.replace(/\.[^/.]+$/, ''),
              url: optimizedUrl,
              category: 'uploads',
              size: `${width}x${height}px`,
            });

            resolve(optimizedUrl);
          } else {
            addMediaItem({
              title: file.name.replace(/\.[^/.]+$/, ''),
              url: result,
              category: 'uploads',
              size: `${file.size > 1024 * 1024 ? (file.size / (1024 * 1024)).toFixed(1) + 'MB' : (file.size / 1024).toFixed(0) + 'KB'}`,
            });
            resolve(result);
          }
        };
        img.onerror = () => {
          // If SVG or direct image format
          addMediaItem({
            title: file.name.replace(/\.[^/.]+$/, ''),
            url: result,
            category: 'uploads',
            size: `${(file.size / 1024).toFixed(0)}KB`,
          });
          resolve(result);
        };
        img.src = result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const openMediaPicker = (target?: MediaPickerTarget) => {
    setMediaPickerTarget(target || null);
    setIsMediaModalOpen(true);
  };

  const closeMediaPicker = () => {
    setIsMediaModalOpen(false);
    setMediaPickerTarget(null);
  };

  const selectMediaForTarget = (url: string) => {
    markDraft();
    if (!mediaPickerTarget) return;

    if (mediaPickerTarget.type === 'logo') {
      updateCustomLogo(url);
    } else if (mediaPickerTarget.type === 'seal') {
      updateCustomSeal(url);
    } else if (mediaPickerTarget.type === 'hero') {
      updateCustomHeroImage(url);
    } else if (mediaPickerTarget.type === 'product' && mediaPickerTarget.id) {
      const isBrownie = config.brownies.flavors.some((f) => f.id === mediaPickerTarget.id);
      if (isBrownie) {
        updateProduct(mediaPickerTarget.id, 'brownie', { image: url });
      } else {
        const isCookie = config.cookies.flavors.some((f) => f.id === mediaPickerTarget.id);
        if (isCookie) {
          updateProduct(mediaPickerTarget.id, 'cookie', { image: url });
        } else {
          updateCombo(mediaPickerTarget.id, { image: url });
        }
      }
    } else if (mediaPickerTarget.type === 'section' && mediaPickerTarget.id) {
      updateSection(mediaPickerTarget.id, {
        items: sections
          .find((s) => s.id === mediaPickerTarget.id)
          ?.items?.map((it) => (it.id === mediaPickerTarget.field ? { ...it, image: url } : it)),
      });
    }

    closeMediaPicker();
  };

  // Data Export & Import
  const exportDataJSON = (): string => {
    return JSON.stringify(
      {
        config,
        dimensions,
        sections,
        messages,
        mediaLibrary,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.config) setConfig(data.config);
      if (data.dimensions) setDimensions(data.dimensions);
      if (data.sections) setSections(data.sections);
      if (data.messages) setMessages(data.messages);
      if (data.mediaLibrary) setMediaLibrary(data.mediaLibrary);
      markDraft();
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        isEditMode,
        activeDrawerTab,
        login,
        logout,
        toggleEditMode,
        setDrawerTab,
        config,
        updateBrandText,
        updateConfig,
        resetConfig,
        dimensions,
        updateDimension,
        resetDimensions,
        sections,
        addSection,
        updateSection,
        deleteSection,
        reorderSection,
        addProduct,
        updateProduct,
        deleteProduct,
        addCombo,
        updateCombo,
        deleteCombo,
        messages,
        addCustomerMessage,
        updateMessageStatus,
        deleteMessage,
        unreadCount,
        mediaLibrary,
        addMediaItem,
        deleteMediaItem,
        uploadFileToMedia,
        isMediaModalOpen,
        mediaPickerTarget,
        openMediaPicker,
        closeMediaPicker,
        selectMediaForTarget,
        updateCustomLogo,
        resetCustomLogo,
        updateCustomSeal,
        updateCustomHeroImage,
        publishStatus,
        lastPublishedAt,
        publishChanges,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
