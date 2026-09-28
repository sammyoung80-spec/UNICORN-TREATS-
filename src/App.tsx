import React, { useState } from 'react';
import { OrderProvider } from './context/OrderContext';
import { AdminProvider } from './context/AdminContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BirthdaySection } from './components/BirthdaySection';
import { BrownieSection } from './components/BrownieSection';
import { CookieSection } from './components/CookieSection';
import { FlavorSection } from './components/FlavorSection';
import { ComboSection } from './components/ComboSection';
import { DynamicSectionRenderer } from './components/DynamicSectionRenderer';
import { OrderSection } from './components/OrderSection';
import { BrandFinale } from './components/BrandFinale';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { ParticleBackground } from './components/ParticleBackground';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { AdminBar } from './components/admin/AdminBar';
import { AdminDrawer } from './components/admin/AdminDrawer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { MediaLibraryModal } from './components/admin/MediaLibraryModal';

function AppContent() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#FFF4DE] selection:bg-[#F45AA8] selection:text-white">
      {/* WordPress / Elementor-style Admin Toolbar */}
      <AdminBar />

      {/* Admin Side Drawer (Sections, Products, Messages, Sizes) */}
      <AdminDrawer />

      {/* Admin Media Library (Drag & drop upload, picture picker) */}
      <MediaLibraryModal />

      {/* Access Code Login Modal (Code: It'sDIDS') */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      {/* Subtle Luxury Loading Screen */}
      <LoadingScreen />

      {/* Ambient Canvas Floating Particles */}
      <ParticleBackground />

      {/* Custom Fairy Dust Desktop Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />

      {/* Slide-out Order Bag Drawer */}
      <OrderDrawer />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section (With Drag Resizing on Culinary Stack) */}
        <Hero />

        {/* 2. Birthday Milestone & Young Entrepreneur Story */}
        <BirthdaySection />

        {/* 3. Signature Brownies with 3D Cards & Admin Product Controls */}
        <BrownieSection />

        {/* 4. Signature Cookies with 3D Cards & Admin Product Controls */}
        <CookieSection />

        {/* 5. Special Flavors Interactive Deck */}
        <FlavorSection />

        {/* 6. Special Combo Deals & Showcase */}
        <ComboSection />

        {/* 7. Dynamic Custom Sections Added by Admin (Elementor-style) */}
        <DynamicSectionRenderer />

        {/* 8. Place Your Order (DM • TEXT • CALL) */}
        <OrderSection />

        {/* 9. Brand Finale & Scalloped Rosette Seal (With Drag Resizing) */}
        <BrandFinale />
      </main>

      {/* Footer with Admin Login Trigger */}
      <Footer onOpenLoginModal={() => setLoginModalOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <OrderProvider>
        <AppContent />
      </OrderProvider>
    </AdminProvider>
  );
}
