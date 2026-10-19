import React, { useEffect } from 'react';
import { X, Heart, ExternalLink, Check, AlertCircle, Clock, Star, Edit, Trash2 } from 'lucide-react';
import { GearItem } from '../types/gear';
import { GearImage } from './GearImage';

interface GearDetailModalProps {
  item: GearItem | null;
  onClose: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onEdit: (item: GearItem) => void;
  onDelete: (id: string) => void;
}

export const GearDetailModal: React.FC<GearDetailModalProps> = ({
  item,
  onClose,
  onToggleFavorite,
  onEdit,
  onDelete,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop click handler */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Modal Header Bar */}
        <div className="p-4 sm:px-6 border-b border-zinc-200/80 flex items-center justify-between bg-white shrink-0">
          {/* Unboxed breadcrumb metadata */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <span className="font-semibold text-zinc-900">{item.brand}</span>
            <span aria-hidden="true">/</span>
            <span>{item.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleFavorite(item.id, e)}
              className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer"
              title={item.isFavorite ? 'Saved to essentials' : 'Save to essentials'}
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
              onClick={() => onEdit(item)}
              className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer"
              title="Edit this item"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to remove "${item.name}" from your gear archive?`)) {
                  onDelete(item.id);
                  onClose();
                }
              }}
              className="p-1.5 rounded-lg border border-zinc-200 hover:bg-rose-50 hover:border-rose-200 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer ml-1"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Visual Banner */}
          <div className="rounded-xl overflow-hidden border border-zinc-200/80 bg-zinc-50 h-72 sm:h-88 flex items-center justify-center p-4">
            <GearImage
              src={item.imageUrl}
              alt={item.name}
              category={item.category}
              fit="contain"
              aspectRatio="auto"
              className="w-full h-full"
            />
          </div>

          {/* Title & Key Highlights Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                {item.name}
              </h2>
              <p className="mt-1 text-sm text-zinc-600 font-medium">
                {item.tagline}
              </p>
            </div>

            <div className="flex items-baseline sm:flex-col sm:items-end gap-3 sm:gap-1 shrink-0">
              <span className="text-2xl font-bold text-zinc-900 tabular-nums">
                ₹{item.priceUSD.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-zinc-400 font-mono">Retail MSRP</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/60">
            <div>
              <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Time in Service
              </div>
              <div className="text-sm font-semibold text-zinc-800 tabular-nums mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-400" /> {item.yearsInUse} Years Daily Use
              </div>
            </div>

            <div>
              <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Reliability Rating
              </div>
              <div className="text-sm font-semibold text-zinc-800 mt-0.5 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {item.rating} / 5 Score
              </div>
            </div>

            <div>
              <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Manufacturer
              </div>
              <div className="text-sm font-semibold text-zinc-800 mt-0.5 truncate">
                {item.brand}
              </div>
            </div>
          </div>

          {/* Why I rely on it section */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Why I Rely On It & Real-World Verdict
            </h3>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed bg-white p-4 rounded-xl border border-zinc-200/80">
              {item.whyIUseIt}
            </p>
          </div>

          {/* Technical Specifications */}
          {Object.keys(item.specs).length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                Technical Specifications
              </h3>
              <div className="border border-zinc-200/80 rounded-xl overflow-hidden divide-y divide-zinc-100 bg-white">
                {Object.entries(item.specs).map(([key, val]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center py-2.5 px-4 text-xs">
                    <span className="w-44 font-medium text-zinc-500 shrink-0 mb-0.5 sm:mb-0">
                      {key}
                    </span>
                    <span className="font-semibold text-zinc-800 break-words flex-1">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros and Considerations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                Key Advantages
              </h4>
              <ul className="space-y-1.5">
                {item.pros.map((pro, index) => (
                  <li key={index} className="text-xs text-emerald-950 flex items-start gap-2">
                    <span className="text-emerald-500 font-bold leading-none mt-0.5">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons / Tradeoffs */}
            {item.cons && item.cons.length > 0 && (
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
                  Trade-Offs & Notes
                </h4>
                <ul className="space-y-1.5">
                  {item.cons.map((con, index) => (
                    <li key={index} className="text-xs text-amber-950 flex items-start gap-2">
                      <span className="text-amber-500 font-bold leading-none mt-0.5">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 bg-zinc-50 border-t border-zinc-200/80 flex items-center justify-between shrink-0">
          <span className="text-xs text-zinc-400">
            Catalog ID: <code className="font-mono">{item.id}</code>
          </span>

          <div className="flex items-center gap-2">
            {item.externalUrl && (
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="px-4 py-2 text-xs font-semibold text-zinc-900 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Product Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
