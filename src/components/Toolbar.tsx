import React from 'react';
import { Search, LayoutGrid, List, X, ArrowUpDown } from 'lucide-react';
import { GearCategory, SortOption, ViewMode } from '../types/gear';

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: GearCategory;
  onSelectCategory: (category: GearCategory) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;
  filteredCount: number;
  totalCount: number;
}

const CATEGORIES: GearCategory[] = [
  'All',
  'Desk & Computing',
  'Audio & Studio',
  'Everyday Carry',
];

export const Toolbar: React.FC<ToolbarProps> = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortByChange,
  filteredCount,
  totalCount,
}) => {
  return (
    <div className="py-6 space-y-4">
      {/* Upper row: Categories tabs + Search & View Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Tabs (Segmented interactive buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Controls: Search, Sort, and Grid/List switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search gear, specs, maker..."
              className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-white border border-zinc-200 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-900 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as SortOption)}
              className="appearance-none pl-3 pr-8 py-1.5 text-xs font-medium bg-white border border-zinc-200 rounded-lg text-zinc-700 hover:border-zinc-300 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-900 cursor-pointer transition-all"
            >
              <option value="featured">Featured / Curated</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="years-desc">Most Time in Use</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
            <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>

          {/* View Mode Toggle: Grid vs List */}
          <div className="flex items-center p-1 bg-zinc-100 rounded-lg border border-zinc-200/60 shrink-0">
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid View with rich imagery"
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              title="List View with tabular specs"
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Counter & Active filter feedback */}
      <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
        <div>
          Showing <span className="font-semibold text-zinc-900 tabular-nums">{filteredCount}</span> of{' '}
          <span className="tabular-nums">{totalCount}</span> items
          {activeCategory !== 'All' && (
            <span>
              {' '}
              in <span className="font-medium text-zinc-800">{activeCategory}</span>
            </span>
          )}
          {searchQuery && (
            <span>
              {' '}
              matching &ldquo;<span className="font-medium text-zinc-800">{searchQuery}</span>&rdquo;
            </span>
          )}
        </div>

        {(searchQuery || activeCategory !== 'All') && (
          <button
            onClick={() => {
              onSearchChange('');
              onSelectCategory('All');
            }}
            className="text-zinc-600 hover:text-zinc-950 font-medium underline underline-offset-2 cursor-pointer transition-colors"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
};
