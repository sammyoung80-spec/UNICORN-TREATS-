import React from 'react';

interface BrushStrokeProps {
  children: React.ReactNode;
  variant?: 'pink' | 'gold' | 'chocolate';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrushStroke: React.FC<BrushStrokeProps> = ({
  children,
  variant = 'pink',
  className = '',
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'px-4 py-1 text-sm sm:text-base',
    md: 'px-6 py-2 text-xl sm:text-2xl',
    lg: 'px-8 py-3 text-2xl sm:text-4xl',
  }[size];

  const variantStyles = {
    pink: 'bg-gradient-to-r from-[#F45AA8] via-[#FF9ACB] to-[#F45AA8] text-white shadow-[0_8px_24px_rgba(244,90,168,0.35)]',
    gold: 'bg-gradient-to-r from-[#D49319] via-[#F4C95D] to-[#D49319] text-[#24130D] shadow-[0_8px_24px_rgba(244,201,93,0.35)]',
    chocolate: 'bg-gradient-to-r from-[#24130D] via-[#3A1C12] to-[#24130D] text-[#FFF4DE] shadow-[0_8px_24px_rgba(0,0,0,0.5)] border border-[#F4C95D]/30',
  }[variant];

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Hand-painted jagged brush edge effect via CSS clip-path */}
      <div
        className={`font-script font-bold tracking-wide transform -rotate-1 transition-transform hover:rotate-0 duration-300 select-none ${sizeStyles} ${variantStyles}`}
        style={{
          clipPath:
            'polygon(2% 12%, 97% 4%, 100% 86%, 98% 96%, 3% 92%, 0% 22%)',
          borderRadius: '4px',
        }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
          {children}
        </span>
      </div>
    </div>
  );
};
