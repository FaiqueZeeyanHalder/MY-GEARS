import React from 'react';
import { Layers, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { GearItem } from '../types/gear';

interface HeroProps {
  gears: GearItem[];
  onShowFavoritesOnly: () => void;
  isFavoritesFilterActive: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  gears,
  onShowFavoritesOnly,
  isFavoritesFilterActive,
}) => {
  const totalItems = gears.length;
  const favoriteCount = gears.filter((g) => g.isFavorite).length;
  const totalValue = gears.reduce((sum, g) => sum + g.priceUSD, 0);
  const avgYears = (
    gears.reduce((sum, g) => sum + g.yearsInUse, 0) / (gears.length || 1)
  ).toFixed(1);

  return (
    <section className="pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Subtle text kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-3 select-none">
            <span>Hardware & Studio Equipment</span>
            <span aria-hidden="true">·</span>
            <span>2026 Archive</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 text-balance leading-[1.12]">
            The tools, setup & everyday gear I use every single day.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl text-pretty">
            A comprehensive, transparent breakdown of my workstation, camera gear, audio monitoring, and everyday carry. Tested through years of development, writing, and creative production.
          </p>

          {/* Quick filter & focus triggers */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onShowFavoritesOnly}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-2 cursor-pointer border ${
                isFavoritesFilterActive
                  ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-xs'
                  : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isFavoritesFilterActive ? 'fill-rose-500 text-rose-500' : 'text-zinc-500'
                }`}
              />
              <span>
                {isFavoritesFilterActive ? 'Showing Essentials Only' : `View Essentials (${favoriteCount})`}
              </span>
            </button>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              Every item has been vetted through daily prolonged use.
            </span>
          </div>
        </div>

        {/* Full-width strip for quantitative rigor and context */}
        <div className="mt-10 pt-6 border-t border-zinc-200/70 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Curated Items
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">
              {totalItems} <span className="text-sm font-normal text-zinc-400">pieces</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Average Longevity
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">
              {avgYears} <span className="text-sm font-normal text-zinc-400">years used</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Core Categories
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">
              {Array.from(new Set(gears.map((g) => g.category))).length} <span className="text-sm font-normal text-zinc-400">domains</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Total Investment
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">
              ₹{totalValue.toLocaleString('en-IN')} <span className="text-sm font-normal text-zinc-400">INR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
