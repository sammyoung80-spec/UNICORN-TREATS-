import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Move, Maximize2 } from 'lucide-react';

interface ResizableWrapperProps {
  children: ReactNode;
  id: string;
  label?: string;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  onResize?: (width: number, height: number) => void;
  className?: string;
  aspectRatioLock?: boolean;
}

export const ResizableWrapper: React.FC<ResizableWrapperProps> = ({
  children,
  id,
  label,
  initialWidth,
  initialHeight,
  minWidth = 140,
  maxWidth = 1200,
  minHeight = 120,
  maxHeight = 1000,
  onResize,
  className = '',
  aspectRatioLock = false,
}) => {
  const { isEditMode, isAdminLoggedIn } = useAdmin();
  const [width, setWidth] = useState<number | undefined>(initialWidth);
  const [height, setHeight] = useState<number | undefined>(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const startDragRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    aspectRatio: number;
  }>({ startX: 0, startY: 0, startWidth: 0, startHeight: 0, aspectRatio: 1 });

  useEffect(() => {
    if (initialWidth !== undefined) setWidth(initialWidth);
  }, [initialWidth]);

  useEffect(() => {
    if (initialHeight !== undefined) setHeight(initialHeight);
  }, [initialHeight]);

  const handleMouseDown = (e: React.MouseEvent, handle: string) => {
    if (!isEditMode || !isAdminLoggedIn) return;
    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current?.getBoundingClientRect();
    const currentW = width || (rect ? rect.width : 300);
    const currentH = height || (rect ? rect.height : 300);

    startDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: currentW,
      startHeight: currentH,
      aspectRatio: currentW / (currentH || 1),
    };

    setActiveHandle(handle);
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { startX, startY, startWidth, startHeight, aspectRatio } = startDragRef.current;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (activeHandle === 'right' || activeHandle === 'corner') {
        newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + deltaX));
      } else if (activeHandle === 'left') {
        newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth - deltaX));
      }

      if (activeHandle === 'bottom' || activeHandle === 'corner') {
        if (aspectRatioLock && activeHandle === 'corner') {
          newHeight = Math.round(newWidth / aspectRatio);
        } else {
          newHeight = Math.min(maxHeight, Math.max(minHeight, startHeight + deltaY));
        }
      } else if (activeHandle === 'top') {
        newHeight = Math.min(maxHeight, Math.max(minHeight, startHeight - deltaY));
      }

      setWidth(newWidth);
      setHeight(newHeight);
      if (onResize) {
        onResize(newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setActiveHandle(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, activeHandle, minWidth, maxWidth, minHeight, maxHeight, onResize, aspectRatioLock]);

  // If edit mode is off, simply render child with inline dimension if set
  if (!isEditMode || !isAdminLoggedIn) {
    return (
      <div
        ref={containerRef}
        style={{
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
          maxWidth: '100%',
        }}
        className={className}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        maxWidth: '100%',
      }}
      className={`relative group transition-shadow ${
        isDragging
          ? 'ring-2 ring-[#F45AA8] ring-offset-2 ring-offset-black shadow-2xl'
          : 'hover:ring-1 hover:ring-[#F4C95D]/60'
      } ${className}`}
    >
      {/* Label Badge */}
      <div className="absolute -top-7 left-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#24130D] border border-[#F45AA8] text-[10px] font-mono text-[#F4C95D] shadow-md">
        <Maximize2 className="w-3 h-3 text-[#F45AA8]" />
        <span>{label || id}</span>
        {width && height && (
          <span className="text-[#FFF4DE]/60">({Math.round(width)}×{Math.round(height)})</span>
        )}
      </div>

      {children}

      {/* Edge & Corner Drag Handles */}
      {/* Right Edge Handle */}
      <div
        onMouseDown={(e) => handleMouseDown(e, 'right')}
        className="absolute top-0 right-0 w-2.5 h-full cursor-ew-resize bg-[#F45AA8]/0 hover:bg-[#F45AA8]/40 transition-colors z-20 flex items-center justify-center group/edge"
        title="Drag left/right to resize width"
      >
        <div className="w-1 h-6 rounded-full bg-[#F4C95D] opacity-0 group-hover/edge:opacity-100 shadow" />
      </div>

      {/* Left Edge Handle */}
      <div
        onMouseDown={(e) => handleMouseDown(e, 'left')}
        className="absolute top-0 left-0 w-2.5 h-full cursor-ew-resize bg-[#F45AA8]/0 hover:bg-[#F45AA8]/40 transition-colors z-20 flex items-center justify-center group/edge"
        title="Drag left/right to resize width"
      >
        <div className="w-1 h-6 rounded-full bg-[#F4C95D] opacity-0 group-hover/edge:opacity-100 shadow" />
      </div>

      {/* Bottom Edge Handle */}
      <div
        onMouseDown={(e) => handleMouseDown(e, 'bottom')}
        className="absolute bottom-0 left-0 w-full h-2.5 cursor-ns-resize bg-[#F45AA8]/0 hover:bg-[#F45AA8]/40 transition-colors z-20 flex items-center justify-center group/edge"
        title="Drag up/down to resize height"
      >
        <div className="h-1 w-6 rounded-full bg-[#F4C95D] opacity-0 group-hover/edge:opacity-100 shadow" />
      </div>

      {/* Bottom-Right Corner Handle */}
      <div
        onMouseDown={(e) => handleMouseDown(e, 'corner')}
        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#F45AA8] border-2 border-white cursor-nwse-resize z-30 shadow-lg hover:scale-125 transition-transform flex items-center justify-center"
        title="Drag corner to resize freely"
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    </div>
  );
};
