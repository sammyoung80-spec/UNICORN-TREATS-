import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable completely on touch devices or if reduced motion is requested
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice || reducedMotion) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
        setIsPointer(!!interactive);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [reducedMotion]);

  if (isTouch || !position || reducedMotion) return null;

  return (
    <>
      {/* Outer soft aura */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          background: isPointer
            ? 'radial-gradient(circle, rgba(244,90,168,0.3) 0%, rgba(244,201,93,0.15) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(244,201,93,0.25) 0%, rgba(244,90,168,0.1) 60%, transparent 80%)',
          filter: 'blur(2px)',
        }}
      />
      {/* Center fairy dust dot */}
      <div
        className="fixed pointer-events-none z-50 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '8px' : '5px',
          height: isPointer ? '8px' : '5px',
          backgroundColor: isPointer ? '#F45AA8' : '#F4C95D',
          boxShadow: '0 0 10px #F4C95D, 0 0 4px #F45AA8',
        }}
      />
    </>
  );
};
