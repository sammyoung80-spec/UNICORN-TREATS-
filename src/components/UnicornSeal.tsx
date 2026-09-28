import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { Camera } from 'lucide-react';

interface UnicornSealProps {
  size?: number;
  className?: string;
  allowEdit?: boolean;
}

export const UnicornSeal: React.FC<UnicornSealProps> = ({
  size = 200,
  className = '',
  allowEdit = true,
}) => {
  let customSealUrl: string | undefined;
  let isEditMode = false;
  let isAdminLoggedIn = false;
  let openMediaPicker: ((target?: any) => void) | undefined;

  try {
    const admin = useAdmin();
    customSealUrl = admin.config.branding?.customSealUrl;
    isEditMode = admin.isEditMode;
    isAdminLoggedIn = admin.isAdminLoggedIn;
    openMediaPicker = admin.openMediaPicker;
  } catch {
    // If rendered outside AdminProvider
  }

  const handleEditClick = (e: React.MouseEvent) => {
    if (allowEdit && isEditMode && isAdminLoggedIn && openMediaPicker) {
      e.stopPropagation();
      openMediaPicker({ type: 'seal' });
    }
  };

  const showEdit = allowEdit && isEditMode && isAdminLoggedIn;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${showEdit ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size }}
      onClick={handleEditClick}
      title={showEdit ? 'Click to change rosette seal image' : undefined}
    >
      {customSealUrl ? (
        <img
          src={customSealUrl}
          alt="Unicorn Treats Official Seal"
          className="w-full h-full object-contain rounded-full shadow-2xl"
        />
      ) : (
        <>
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-xl animate-spin-slow"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sealPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA6D1" />
                <stop offset="50%" stopColor="#F45AA8" />
                <stop offset="100%" stopColor="#C92978" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Scalloped outer rosette ring */}
            <path
              d="M 100,10 
                 C 108,10 114,14 122,17 C 130,20 137,21 144,27 C 151,33 154,39 160,47 C 166,55 171,61 174,70 C 177,79 176,87 177,96 C 178,105 178,113 174,122 C 170,131 166,138 160,145 C 154,152 149,157 141,163 C 133,169 127,173 118,176 C 109,179 101,178 92,177 C 83,176 75,174 67,169 C 59,164 53,160 46,153 C 39,146 36,139 31,130 C 26,121 24,113 23,104 C 22,95 24,87 27,78 C 30,69 34,62 40,55 C 46,48 51,43 59,37 C 67,31 73,27 82,23 C 91,19 95,10 100,10 Z"
              fill="url(#sealPinkGrad)"
              stroke="#FFF4DE"
              strokeWidth="3"
            />

            {/* Inner dotted stitch ring */}
            <circle
              cx="100"
              cy="100"
              r="74"
              fill="#FFF6F9"
              stroke="#F45AA8"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
            {/* Crown Icon */}
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="mb-1">
              <polygon points="2,14 4,5 9,10 12,2 15,10 20,5 22,14" fill="#F4C95D" stroke="#9A690B" strokeWidth="1" />
              <circle cx="4" cy="5" r="1.5" fill="#FFFFFF" />
              <circle cx="12" cy="2" r="1.8" fill="#FFFFFF" />
              <circle cx="20" cy="5" r="1.5" fill="#FFFFFF" />
              <rect x="3" y="14" width="18" height="3" rx="1.5" fill="#F4C95D" />
            </svg>

            {/* Brand Name in script */}
            <p className="font-script text-lg sm:text-xl font-bold text-[#24130D] leading-tight">
              Unicorn Treats
            </p>
            <p className="font-script text-base text-[#F45AA8] font-semibold -mt-1">
              by Jolene
            </p>

            {/* Divider */}
            <div className="flex items-center gap-1 my-1">
              <span className="w-4 h-px bg-[#F45AA8]/40" />
              <span className="text-[#F45AA8] text-[10px]">♡</span>
              <span className="w-4 h-px bg-[#F45AA8]/40" />
            </div>

            {/* Tagline */}
            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest font-black text-[#24130D]">
              Sweet Treats
            </p>
            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest font-black text-[#F45AA8]">
              Big Dreams
            </p>
          </div>
        </>
      )}

      {/* Edit Badge Overlay */}
      {showEdit && (
        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-[#F45AA8] text-white shadow-lg group-hover:scale-110 transition-transform">
          <Camera className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
};
