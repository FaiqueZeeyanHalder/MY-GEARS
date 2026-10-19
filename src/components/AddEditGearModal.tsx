import React, { useState, useEffect } from 'react';
import { X, Plus, Trash, Image as ImageIcon, Sparkles } from 'lucide-react';
import { GearCategory, GearItem } from '../types/gear';

interface AddEditGearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: GearItem) => void;
  editingItem: GearItem | null;
}

const CATEGORIES: Exclude<GearCategory, 'All'>[] = [
  'Desk & Computing',
  'Audio & Studio',
  'Everyday Carry',
];

const PRESET_IMAGES = [
  { label: 'HP Victus Gaming', url: '/images/hp-victus.jpg' },
  { label: 'Cosmic Byte Headphone', url: '/images/cosmic-byte.jpg' },
  { label: 'EvoFox Mechanical Keyboard', url: '/images/evofox-katana.jpg' },
  { label: 'EvoFox Gaming Mouse', url: '/images/evofox-mouse.jpg' },
  { label: 'Samsung Galaxy Phone', url: '/images/samsung-f06.jpg' },
  { label: 'WROGN 35L Backpack', url: '/images/wrogn-backpack.jpg' },
  { label: 'Curved Display', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80' },
];

export const AddEditGearModal: React.FC<AddEditGearModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingItem,
}) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<Exclude<GearCategory, 'All'>>('Desk & Computing');
  const [tagline, setTagline] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [priceUSD, setPriceUSD] = useState<number>(299);
  const [yearsInUse, setYearsInUse] = useState<number>(1);
  const [rating, setRating] = useState<number>(5);
  const [isFavorite, setIsFavorite] = useState(false);
  const [whyIUseIt, setWhyIUseIt] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
    { key: 'Material', value: 'Anodized Aluminum' },
    { key: 'Weight', value: '450g' },
  ]);
  const [prosText, setProsText] = useState('Excellent durability\nIntuitive controls');
  const [consText, setConsText] = useState('Requires occasional cleaning');

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setBrand(editingItem.brand);
      setCategory(editingItem.category);
      setTagline(editingItem.tagline);
      setImageUrl(editingItem.imageUrl);
      setPriceUSD(editingItem.priceUSD);
      setYearsInUse(editingItem.yearsInUse);
      setRating(editingItem.rating);
      setIsFavorite(editingItem.isFavorite);
      setWhyIUseIt(editingItem.whyIUseIt);
      setExternalUrl(editingItem.externalUrl || '');
      setSpecs(
        Object.entries(editingItem.specs).map(([key, value]) => ({ key, value }))
      );
      setProsText(editingItem.pros.join('\n'));
      setConsText((editingItem.cons || []).join('\n'));
    } else {
      setName('');
      setBrand('');
      setCategory('Desk & Computing');
      setTagline('');
      setImageUrl(PRESET_IMAGES[0].url);
      setPriceUSD(199);
      setYearsInUse(1);
      setRating(5);
      setIsFavorite(false);
      setWhyIUseIt('');
      setExternalUrl('');
      setSpecs([
        { key: 'Material', value: 'Anodized Aluminum' },
        { key: 'Weight', value: '450g' },
      ]);
      setProsText('Reliable daily performance\nPremium build finish');
      setConsText('');
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleAddSpecRow = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !brand.trim()) return;

    const specsRecord: { [key: string]: string } = {};
    specs.forEach((s) => {
      if (s.key.trim()) {
        specsRecord[s.key.trim()] = s.value.trim();
      }
    });

    const pros = prosText
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const cons = consText
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    const gear: GearItem = {
      id: editingItem ? editingItem.id : `gear-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim(),
      category,
      tagline: tagline.trim() || `${brand} ${name} for daily productivity.`,
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      priceUSD: Number(priceUSD) || 0,
      yearsInUse: Number(yearsInUse) || 1,
      rating: Number(rating) || 5,
      isFavorite,
      whyIUseIt: whyIUseIt.trim() || 'Crucial element of my daily setup workflow.',
      specs: specsRecord,
      pros: pros.length > 0 ? pros : ['High reliability', 'Well engineered'],
      cons: cons.length > 0 ? cons : undefined,
      externalUrl: externalUrl.trim() || undefined,
      dateAdded: editingItem ? editingItem.dateAdded : new Date().toISOString().slice(0, 10),
    };

    onSave(gear);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-zinc-200/80 flex items-center justify-between bg-white shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900">
              {editingItem ? 'Edit Gear Details' : 'Add New Gear to Showcase'}
            </h2>
            <p className="text-xs text-zinc-500">
              Save your hardware pieces with specs, personal notes, and photo.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          {/* Item Name & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Item Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. MacBook Pro 16 or Sony A7IV"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Brand / Maker *
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Apple, Sony, Keychron"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-900"
              />
            </div>
          </div>

          {/* Category & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Exclude<GearCategory, 'All'>)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-800 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-900"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Tagline / Quick Summary
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Main daily driver for full-stack engineering."
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-900"
              />
            </div>
          </div>

          {/* Image URL & Presets */}
          <div>
            <label className="block font-semibold text-zinc-700 mb-1">
              Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-900"
              />
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-500">
              <span className="font-medium text-zinc-400">Quick Presets:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => setImageUrl(preset.url)}
                  className="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Numerical attributes: Price, Years, Rating, Favorite */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-200/70">
            <div>
              <label className="block font-medium text-zinc-600 mb-1">
                Price (₹ INR)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={priceUSD}
                onChange={(e) => setPriceUSD(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-md font-mono text-zinc-800"
              />
            </div>
            <div>
              <label className="block font-medium text-zinc-600 mb-1">
                Years in Use
              </label>
              <input
                type="number"
                min="0"
                max="30"
                step="0.5"
                value={yearsInUse}
                onChange={(e) => setYearsInUse(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-md font-mono text-zinc-800"
              />
            </div>
            <div>
              <label className="block font-medium text-zinc-600 mb-1">
                Rating (1-5)
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-md text-zinc-800"
              >
                <option value={5}>5 - Essential Masterpiece</option>
                <option value={4}>4 - High Performer</option>
                <option value={3}>3 - Good Utility</option>
                <option value={2}>2 - Mixed Experience</option>
                <option value={1}>1 - Needs Replacement</option>
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 py-2 cursor-pointer font-medium text-zinc-700">
                <input
                  type="checkbox"
                  checked={isFavorite}
                  onChange={(e) => setIsFavorite(e.target.checked)}
                  className="rounded text-zinc-900 focus:ring-zinc-900 w-4 h-4 cursor-pointer"
                />
                <span>Core Essential</span>
              </label>
            </div>
          </div>

          {/* Why I rely on it */}
          <div>
            <label className="block font-semibold text-zinc-700 mb-1">
              Why I Rely On It (Your Real-World Review)
            </label>
            <textarea
              rows={3}
              value={whyIUseIt}
              onChange={(e) => setWhyIUseIt(e.target.value)}
              placeholder="Explain how it fits into your daily routine, ergonomics, sound quality, or performance..."
              className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-900"
            />
          </div>

          {/* Specifications Builder */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-zinc-700">
                Key Technical Specifications
              </label>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="text-[11px] font-semibold text-zinc-700 hover:text-zinc-950 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Spec Line
              </button>
            </div>
            <div className="space-y-2">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="Specification Name (e.g. Sensor, Weight)"
                    className="w-1/3 px-2.5 py-1.5 bg-white border border-zinc-200 rounded-md text-zinc-800"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 33MP Full-Frame, 1.8kg)"
                    className="flex-1 px-2.5 py-1.5 bg-white border border-zinc-200 rounded-md text-zinc-800"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(idx)}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete spec line"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Advantages / Pros (One per line)
              </label>
              <textarea
                rows={2}
                value={prosText}
                onChange={(e) => setProsText(e.target.value)}
                placeholder="Long battery life&#10;Silent operation"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Trade-offs / Cons (One per line)
              </label>
              <textarea
                rows={2}
                value={consText}
                onChange={(e) => setConsText(e.target.value)}
                placeholder="High retail cost&#10;Heavier than competitors"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15"
              />
            </div>
          </div>

          {/* Product link */}
          <div>
            <label className="block font-semibold text-zinc-700 mb-1">
              External Product Website / Store Link (Optional)
            </label>
            <input
              type="url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/15"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-zinc-200/80 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {editingItem ? 'Update Gear' : 'Add to Collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
