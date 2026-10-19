import React, { useState } from 'react';
import { Package, Laptop, Headphones, Backpack } from 'lucide-react';
import { GearCategory } from '../types/gear';

interface GearImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: GearCategory;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  fit?: 'contain' | 'cover';
}

export const GearImage: React.FC<GearImageProps> = ({
  src,
  alt,
  className = '',
  category,
  aspectRatio = 'video',
  fit = 'contain',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'video':
        return 'aspect-[16/11]';
      default:
        return '';
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'Desk & Computing':
        return <Laptop className="w-8 h-8 text-zinc-400 stroke-[1.5]" />;
      case 'Audio & Studio':
        return <Headphones className="w-8 h-8 text-zinc-400 stroke-[1.5]" />;
      case 'Everyday Carry':
        return <Backpack className="w-8 h-8 text-zinc-400 stroke-[1.5]" />;
      default:
        return <Package className="w-8 h-8 text-zinc-400 stroke-[1.5]" />;
    }
  };

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${getAspectClass()} bg-zinc-50 border border-zinc-200/60 rounded-xl flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-lg bg-white shadow-xs border border-zinc-200/80 flex items-center justify-center mb-2.5">
          {getCategoryIcon()}
        </div>
        <p className="text-xs font-medium text-zinc-700 tracking-tight max-w-[200px] truncate">
          {alt}
        </p>
        <span className="text-[11px] text-zinc-400 font-mono mt-0.5">
          {category || 'Hardware'}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-white flex items-center justify-center ${getAspectClass()} ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-50 animate-pulse z-0" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full transition-all duration-300 ${
          fit === 'contain'
            ? 'object-contain p-3.5 sm:p-4'
            : 'object-cover'
        } ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      />
    </div>
  );
};
