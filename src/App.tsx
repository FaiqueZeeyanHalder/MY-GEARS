/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { GearCategory, GearItem, SortOption, ViewMode } from './types/gear';
import { INITIAL_GEARS } from './data/initialGear';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Toolbar } from './components/Toolbar';
import { GearGrid } from './components/GearGrid';
import { GearList } from './components/GearList';
import { GearDetailModal } from './components/GearDetailModal';
import { AddEditGearModal } from './components/AddEditGearModal';
import { ExportModal } from './components/ExportModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'my_gears_archive_v7';

export default function App() {
  const [gears, setGears] = useState<GearItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: GearItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback on parse failure
    }
    return INITIAL_GEARS;
  });

  const [activeCategory, setActiveCategory] = useState<GearCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // Modals state
  const [selectedItem, setSelectedItem] = useState<GearItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GearItem | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gears));
    } catch {
      // Ignore quota storage errors
    }
  }, [gears]);

  // Toggle favorite
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setGears((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  // Add / Update item
  const handleSaveItem = (item: GearItem) => {
    setGears((prev) => {
      const exists = prev.some((g) => g.id === item.id);
      if (exists) {
        return prev.map((g) => (g.id === item.id ? item : g));
      }
      return [item, ...prev];
    });
    if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(item);
    }
  };

  // Delete item
  const handleDeleteItem = (id: string) => {
    setGears((prev) => prev.filter((g) => g.id !== id));
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(null);
    }
  };

  // Reset defaults
  const handleResetDefaults = () => {
    setGears(INITIAL_GEARS);
    localStorage.removeItem(STORAGE_KEY);
    setActiveCategory('All');
    setSearchQuery('');
    setFavoritesOnly(false);
  };

  // Open edit modal
  const handleEditItem = (item: GearItem) => {
    setEditingItem(item);
    setIsAddModalOpen(true);
  };

  // Filter and sort items
  const filteredAndSortedGears = useMemo(() => {
    let result = [...gears];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((g) => g.category === activeCategory);
    }

    // Favorites only filter
    if (favoritesOnly) {
      result = result.filter((g) => g.isFavorite);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((g) => {
        const inName = g.name.toLowerCase().includes(q);
        const inBrand = g.brand.toLowerCase().includes(q);
        const inTagline = g.tagline.toLowerCase().includes(q);
        const inWhy = g.whyIUseIt.toLowerCase().includes(q);
        const inSpecs = Object.entries(g.specs).some(
          ([k, v]) => k.toLowerCase().includes(q) || v.toLowerCase().includes(q)
        );
        return inName || inBrand || inTagline || inWhy || inSpecs;
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-desc':
        result.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case 'price-asc':
        result.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case 'years-desc':
        result.sort((a, b) => b.yearsInUse - a.yearsInUse);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Prioritize favorites, then rating
        result.sort((a, b) => {
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return result;
  }, [gears, activeCategory, favoritesOnly, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* 3-Zone Top Bar */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setFavoritesOnly(false);
        }}
        onOpenAddModal={() => {
          setEditingItem(null);
          setIsAddModalOpen(true);
        }}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        totalItemsCount={gears.length}
      />

      {/* Hero Section with Light Aesthetic and Quantitative Strip */}
      <Hero
        gears={gears}
        onShowFavoritesOnly={() => setFavoritesOnly((prev) => !prev)}
        isFavoritesFilterActive={favoritesOnly}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Interactive Toolbar: Filter tabs, search, sort, grid/list view toggle */}
        <Toolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setFavoritesOnly(false);
          }}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          filteredCount={filteredAndSortedGears.length}
          totalCount={gears.length}
        />

        {/* View Mode Switching: Grid View or List View */}
        {viewMode === 'grid' ? (
          <GearGrid
            items={filteredAndSortedGears}
            onSelectItem={setSelectedItem}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <GearList
            items={filteredAndSortedGears}
            onSelectItem={setSelectedItem}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onResetDefaults={handleResetDefaults} />

      {/* Gear Inspection Detail Modal */}
      <GearDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onToggleFavorite={handleToggleFavorite}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />

      {/* Add / Edit Gear Modal */}
      <AddEditGearModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        editingItem={editingItem}
      />

      {/* Markdown / Plain Text Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        gears={gears}
      />
    </div>
  );
}
