import React from 'react';
import { Heart, ExternalLink, ArrowRight, Clock, Star } from 'lucide-react';
import { GearItem } from '../types/gear';
import { GearImage } from './GearImage';

interface GearListProps {
  items: GearItem[];
  onSelectItem: (item: GearItem) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const GearList: React.FC<GearListProps> = ({
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
    <div className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden divide-y divide-zinc-200/60 shadow-xs">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelectItem(item)}
          className="group p-4 sm:p-5 hover:bg-zinc-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
        >
          {/* Left: Thumbnail & Main Info */}
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            {/* Thumbnail */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-200/80 bg-zinc-50 flex items-center justify-center p-1">
              <GearImage
                src={item.imageUrl}
                alt={item.name}
                category={item.category}
                aspectRatio="square"
                fit="contain"
                className="w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Title, Brand, Category & Tagline */}
            <div className="min-w-0 flex-1">
              {/* Unboxed metadata line */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium mb-1">
                <span className="font-semibold text-zinc-900">{item.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{item.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums flex items-center gap-1">
                  <Clock className="w-3 h-3 text-zinc-400 inline" /> {item.yearsInUse}y in use
                </span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 tracking-tight group-hover:text-zinc-700 transition-colors truncate">
                {item.name}
              </h3>

              <p className="text-xs text-zinc-600 line-clamp-1 mt-0.5 sm:mt-1 max-w-2xl">
                {item.tagline}
              </p>
            </div>
          </div>

          {/* Right: Price, Rating & Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
            {/* Price & Rating */}
            <div className="text-left sm:text-right">
              <div className="text-sm font-bold text-zinc-900 tabular-nums">
                ₹{item.priceUSD.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-0.5 mt-0.5 sm:justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 ${
                      i < item.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-zinc-200 text-zinc-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Favorite & View Details */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => onToggleFavorite(item.id, e)}
                title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                className="w-8 h-8 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${
                    item.isFavorite
                      ? 'fill-rose-500 text-rose-500'
                      : 'text-zinc-400 hover:text-rose-500'
                  }`}
                />
              </button>

              <button
                onClick={() => onSelectItem(item)}
                className="px-3 py-1.5 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200/80 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
