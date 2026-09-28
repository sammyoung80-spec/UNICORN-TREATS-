import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { Camera } from 'lucide-react';

interface UnicornLogoProps {
  className?: string;
  size?: number;
  allowEdit?: boolean;
}

export const UnicornLogo: React.FC<UnicornLogoProps> = ({
  className = '',
  size = 56,
  allowEdit = true,
}) => {
  let customLogoUrl: string | undefined;
  let isEditMode = false;
  let isAdminLoggedIn = false;
  let openMediaPicker: ((target?: any) => void) | undefined;

  try {
    const admin = useAdmin();
    customLogoUrl = admin.config.branding?.customLogoUrl;
    isEditMode = admin.isEditMode;
    isAdminLoggedIn = admin.isAdminLoggedIn;
    openMediaPicker = admin.openMediaPicker;
  } catch {
    // If rendered outside AdminProvider
  }

  const handleEditClick = (e: React.MouseEvent) => {
    if (allowEdit && isEditMode && isAdminLoggedIn && openMediaPicker) {
      e.preventDefault();
      e.stopPropagation();
      openMediaPicker({ type: 'logo' });
    }
  };

  const showEditButton = allowEdit && isEditMode && isAdminLoggedIn;

  return (
    <div
      className={`relative inline-flex items-center justify-center group ${showEditButton ? 'cursor-pointer' : ''}`}
      onClick={handleEditClick}
      title={showEditButton ? 'Click to change logo from media library or device' : undefined}
    >
      {/* If custom logo image is uploaded/selected */}
      {customLogoUrl ? (
        <img
          src={customLogoUrl}
          alt="Unicorn Treats Logo"
          style={{ width: `${size}px`, height: `${size}px` }}
          className={`object-contain rounded-xl ${className}`}
        />
      ) : (
        /* Classic High-Fidelity SVG Brand Logo */
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`inline-block select-none ${className}`}
          aria-label="Unicorn Treats Logo"
          role="img"
        >
          <defs>
            <linearGradient id="goldCrown" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="50%" stopColor="#F4C95D" />
              <stop offset="100%" stopColor="#D49319" />
            </linearGradient>

            <linearGradient id="pinkMane" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9ACB" />
              <stop offset="60%" stopColor="#F45AA8" />
              <stop offset="100%" stopColor="#BD1A70" />
            </linearGradient>

            <linearGradient id="softMane" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4DE" />
              <stop offset="100%" stopColor="#FFCBE2" />
            </linearGradient>

            <linearGradient id="goldHorn" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8D6" />
              <stop offset="40%" stopColor="#F4C95D" />
              <stop offset="100%" stopColor="#D49319" />
            </linearGradient>
          </defs>

          {/* Floating Sparkles / Stars */}
          <circle cx="20" cy="24" r="1.5" fill="#F4C95D" opacity="0.8" />
          <circle cx="82" cy="18" r="1.2" fill="#FF9ACB" opacity="0.9" />
          <polygon points="18,12 20,7 22,12 27,14 22,16 20,21 18,16 13,14" fill="#F4C95D" />
          <polygon points="85,32 86,29 87,32 90,33 87,34 86,37 85,34 82,33" fill="#FFF4DE" opacity="0.8" />

          {/* Unicorn Horn */}
          <polygon points="32,22 47,4 39,26" fill="url(#goldHorn)" stroke="#050505" strokeWidth="1" />
          <line x1="36" y1="20" x2="42" y2="12" stroke="#FFF8D6" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="34" y1="24" x2="38" y2="18" stroke="#FFF8D6" strokeWidth="1" strokeLinecap="round" />

          {/* Royal Gold Crown on Horn Base */}
          <polygon points="31,24 25,17 34,20 41,13 42,22 49,19 44,27" fill="url(#goldCrown)" stroke="#7A4E08" strokeWidth="0.8" />
          <circle cx="25" cy="17" r="1.5" fill="#FFFFFF" />
          <circle cx="41" cy="13" r="1.8" fill="#FFFFFF" />
          <circle cx="49" cy="19" r="1.5" fill="#FFFFFF" />

          {/* Flowing Hot Pink / Rose Mane Waves */}
          <path
            d="M26,38 C20,44 14,56 16,68 C18,78 26,86 32,92 C24,84 22,72 26,62 C29,55 35,52 35,46 Z"
            fill="url(#pinkMane)"
          />
          <path
            d="M34,42 C28,50 24,62 26,72 C28,80 34,88 38,91 C32,82 31,70 34,60 C37,52 42,48 40,42 Z"
            fill="url(#softMane)"
          />
          <path
            d="M20,52 C16,58 14,68 18,78 C14,70 16,60 20,52 Z"
            fill="#F45AA8"
            opacity="0.8"
          />

          {/* Majestic White Unicorn Head & Neck */}
          <path
            d="M38,28 C42,28 47,32 52,36 C58,41 68,44 72,48 C74,51 75,55 72,58 C68,61 63,59 58,55 C53,62 48,72 44,80 C40,88 36,92 34,92 C36,86 42,75 46,65 C48,59 47,54 44,48 C42,44 38,40 36,36 C35,32 36,29 38,28 Z"
            fill="#FFFFFF"
            stroke="#24130D"
            strokeWidth="1.2"
          />

          {/* Pointed Ear */}
          <path
            d="M36,26 C36,21 39,20 42,24 C41,27 39,29 36,26 Z"
            fill="#FFFFFF"
            stroke="#24130D"
            strokeWidth="1"
          />
          <path d="M37,25 C37,23 39,22 40,24 Z" fill="#FF9ACB" />

          {/* Sweet Closed Eye with Eyelashes */}
          <path
            d="M56,42 Q60,46 63,43"
            stroke="#24130D"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <line x1="62" y1="44" x2="64" y2="46" stroke="#24130D" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="60" y1="45" x2="61" y2="48" stroke="#24130D" strokeWidth="1.5" strokeLinecap="round" />

          {/* Rosy Soft Blush */}
          <circle cx="56" cy="49" r="3.5" fill="#FF9ACB" opacity="0.6" />

          {/* Sweet Smiling Muzzle */}
          <path
            d="M68,54 Q71,56 70,58"
            stroke="#24130D"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Golden Heart on Shoulder */}
          <path
            d="M45,70 C43,67 39,67 39,71 C39,75 45,79 45,79 C45,79 51,75 51,71 C51,67 47,67 45,70 Z"
            fill="url(#goldCrown)"
            opacity="0.9"
          />
        </svg>
      )}

      {/* Edit Badge Overlay in Admin Live Edit Mode */}
      {showEditButton && (
        <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#F45AA8] text-white shadow-lg hover:scale-110 transition-transform">
          <Camera className="w-3 h-3" />
        </div>
      )}
    </div>
  );
};
