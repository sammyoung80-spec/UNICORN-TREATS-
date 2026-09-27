import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, PlusSquare, X } from 'lucide-react';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'nav' | 'cta';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'nav',
}) => {
  const { canInstall, isInstalled, isIOS, installApp } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed in standalone mode, hide button
  if (isInstalled) return null;

  const handleClick = () => {
    if (canInstall) {
      installApp();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Fallback instruction for browsers without deferred prompt
      setShowIOSGuide(true);
    }
  };

  if (!canInstall && !isIOS && variant === 'nav') {
    // Keep nav clean if browser doesn't offer prompt
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all active:scale-95 ${
          variant === 'nav'
            ? 'px-3 py-1.5 bg-[#24130D] hover:bg-[#3A1C12] text-[#F4C95D] border border-[#F4C95D]/40 hover:border-[#F4C95D]'
            : 'px-6 py-3 bg-gradient-to-r from-[#24130D] to-[#3A1C12] text-[#F4C95D] border border-[#F4C95D]/50 hover:border-[#F4C95D] shadow-lg'
        } ${className}`}
        aria-label="Install Unicorn Treats app to home screen"
      >
        <Download className="w-3.5 h-3.5 text-[#F45AA8]" />
        <span>Install App</span>
      </button>

      {/* Guided Install Modal for iOS / Safari */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-sm w-full p-6 rounded-3xl bg-[#1c0d08] border border-[#F4C95D]/40 shadow-2xl text-center relative">
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#FFF4DE]/60 hover:text-white hover:bg-black/30"
              aria-label="Close guide"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#F45AA8]/20 border border-[#F45AA8]/40 flex items-center justify-center mx-auto mb-3 text-2xl">
              🦄
            </div>

            <h4 className="font-serif text-xl font-bold text-[#FFF4DE]">
              Install Unicorn Treats
            </h4>
            <p className="text-xs text-[#FF9ACB] mt-1 font-script text-base">
              Keep homemade sweetness one tap away!
            </p>

            <div className="mt-4 p-4 rounded-xl bg-black/50 border border-[#FFF4DE]/10 text-left text-xs space-y-3 text-[#FFF4DE]/80">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F4C95D] text-[#050505] font-bold flex items-center justify-center text-[10px] shrink-0">
                  1
                </span>
                <span className="flex items-center gap-1.5">
                  Tap the <Share2 className="w-3.5 h-3.5 text-[#F4C95D]" /> <strong>Share</strong> button in Safari.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F45AA8] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                  2
                </span>
                <span className="flex items-center gap-1.5">
                  Scroll down and choose <PlusSquare className="w-3.5 h-3.5 text-[#F45AA8]" /> <strong>Add to Home Screen</strong>.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] to-[#FF9ACB] text-white"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
