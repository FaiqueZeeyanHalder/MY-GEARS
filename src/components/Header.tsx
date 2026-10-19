import React from 'react';
import { Plus, Download, Sparkles } from 'lucide-react';
import { GearCategory } from '../types/gear';

interface HeaderProps {
  activeCategory: GearCategory;
  onSelectCategory: (category: GearCategory) => void;
  onOpenAddModal: () => void;
  onOpenExportModal: () => void;
  totalItemsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenAddModal,
  onOpenExportModal,
}) => {
  const navCategories: { label: string; value: GearCategory }[] = [
    { label: 'All Gear', value: 'All' },
    { label: 'Desk Setup', value: 'Desk & Computing' },
    { label: 'Audio & Gaming', value: 'Audio & Studio' },
    { label: 'Everyday Carry', value: 'Everyday Carry' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-zinc-900 rounded-xs" />
          <span>GEAR·ARCHIVE</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
          {navCategories.map((item) => (
            <button
              key={item.value}
              onClick={() => onSelectCategory(item.value)}
              className={`whitespace-nowrap shrink-0 transition-colors hover:text-zinc-900 cursor-pointer ${
                activeCategory === item.value
                  ? 'text-zinc-950 font-semibold border-b-2 border-zinc-900 py-1'
                  : 'text-zinc-500 py-1'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action with secondary export utility */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenExportModal}
            title="Export / Share Markdown Kit"
            className="px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-zinc-600" />
            <span className="hidden sm:inline">Export List</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Add Gear</span>
          </button>
        </div>
      </div>
    </header>
  );
};
