import React from 'react';
import { Heart, ExternalLink, ArrowRight, Clock, Star } from 'lucide-react';
import { GearItem } from '../types/gear';
import { GearImage } from './GearImage';

interface GearGridProps {
  items: GearItem[];
  onSelectItem: (item: GearItem) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const GearGrid: React.FC<GearGridProps> = ({
  items,
  onSelectItem,
  onToggleFavorite,
}) => {
  if (items.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-2xl border border-zinc-200/80 p-8">
        <p className="text-zinc-600 text-sm font-medium">
          No gear found matching your current filter criteria.
        </p>
        <p className="text-zinc-400 text-xs mt-1">
          Try clearing your search query or selecting another category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <article
          key={item.id}
          onClick={() => onSelectItem(item)}
          className="group relative bg-white border border-zinc-200/80 rounded-2xl overflow-hidden hover:border-zinc-300 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
        >
          {/* Card Image Container */}
          <div className="relative overflow-hidden bg-zinc-50 border-b border-zinc-100 h-56 sm:h-60 flex items-center justify-center">
            <GearImage
              src={item.imageUrl}
              alt={item.name}
              category={item.category}
              fit="contain"
              aspectRatio="auto"
              className="w-full h-full group-hover:scale-105 transition-transform duration-300"
            />

            {/* Favorite toggle button */}
            <button
              onClick={(e) => onToggleFavorite(item.id, e)}
              title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-xs border border-zinc-200/70 flex items-center justify-center hover:bg-white transition-all cursor-pointer z-10"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  item.isFavorite
                    ? 'fill-rose-500 text-rose-500'
                    : 'text-zinc-400 hover:text-rose-500'
                }`}
              />
            </button>

            {/* Price indicator in subtle light badge */}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs border border-zinc-200/80 text-xs font-semibold text-zinc-900 tabular-nums shadow-xs">
              ₹{item.priceUSD.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              {/* Unboxed metadata with typographic separators (Strict zero-pill rule) */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-2 font-medium">
                <span className="text-zinc-900 font-semibold">{item.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{item.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums flex items-center gap-0.5">
                  <Clock className="w-3 h-3 text-zinc-400 inline" /> {item.yearsInUse}y in use
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
                {item.name}
              </h3>

              {/* Tagline */}
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                {item.tagline}
              </p>

              {/* Specs preview (first 2 specs) */}
              <div className="mt-4 pt-3.5 border-t border-zinc-100 space-y-1.5">
                {Object.entries(item.specs)
                  .slice(0, 2)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between text-[11px] text-zinc-500"
                    >
                      <span className="font-medium text-zinc-400">{key}</span>
                      <span className="text-zinc-700 font-medium truncate max-w-[170px] text-right">
                        {value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < item.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-zinc-200 text-zinc-200'
                    }`}
                  />
                ))}
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 group-hover:translate-x-0.5 transition-transform">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
