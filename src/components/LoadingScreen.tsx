import React, { useEffect, useState } from 'react';
import { UnicornLogo } from './UnicornLogo';

export const LoadingScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Quick, elegant reveal
    const timer = setTimeout(() => {
      setFading(true);
    }, 600);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 900);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-300 pointer-events-none ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center animate-pulse">
        <UnicornLogo size={80} className="mb-4" />
        <h2 className="font-serif text-2xl font-bold tracking-widest text-[#FFF4DE] uppercase">
          Unicorn <span className="text-[#F45AA8]">Treats</span>
        </h2>
        <p className="font-script text-lg text-[#F4C95D] mt-1">Sweet Treats • Big Dreams</p>
        
        {/* Subtle gold-pink loading bar */}
        <div className="w-36 h-1 mt-6 bg-[#24130D] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#F45AA8] via-[#F4C95D] to-[#F45AA8] animate-[goldShimmer_1s_infinite]" />
        </div>
      </div>
    </div>
  );
};
