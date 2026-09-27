import React from 'react';
import { OrderProvider } from './context/OrderContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BirthdaySection } from './components/BirthdaySection';
import { BrownieSection } from './components/BrownieSection';
import { CookieSection } from './components/CookieSection';
import { FlavorSection } from './components/FlavorSection';
import { ComboSection } from './components/ComboSection';
import { OrderSection } from './components/OrderSection';
import { BrandFinale } from './components/BrandFinale';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { ParticleBackground } from './components/ParticleBackground';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  return (
    <OrderProvider>
      <div className="relative min-h-screen bg-[#050505] text-[#FFF4DE] selection:bg-[#F45AA8] selection:text-white">
        {/* Subtle Luxury Loading Screen */}
        <LoadingScreen />

        {/* Ambient Canvas Floating Particles */}
        <ParticleBackground />

        {/* Custom Fairy Dust Desktop Cursor */}
        <CustomCursor />

        {/* Navigation Bar */}
        <Navbar />

        {/* Slide-out Order Bag Drawer */}
        <OrderDrawer />

        {/* Main Content Sections */}
        <main>
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. Birthday Milestone & Young Entrepreneur Story */}
          <BirthdaySection />

          {/* 3. Signature Brownies with 3D Cards */}
          <BrownieSection />

          {/* 4. Signature Cookies with 3D Cards */}
          <CookieSection />

          {/* 5. Special Flavors Interactive Deck */}
          <FlavorSection />

          {/* 6. Special Combo Deals & Showcase */}
          <ComboSection />

          {/* 7. Place Your Order (DM • TEXT • CALL) */}
          <OrderSection />

          {/* 8. Brand Finale & Scalloped Rosette Seal */}
          <BrandFinale />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </OrderProvider>
  );
}
