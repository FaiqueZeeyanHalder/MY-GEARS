export type GearCategory =
  | 'All'
  | 'Desk & Computing'
  | 'Audio & Studio'
  | 'Everyday Carry';

export interface GearItem {
  id: string;
  name: string;
  brand: string;
  category: Exclude<GearCategory, 'All'>;
  tagline: string;
  imageUrl: string;
  priceUSD: number;
  yearsInUse: number;
  rating: number; // 1 to 5
  isFavorite: boolean;
  whyIUseIt: string;
  specs: { [key: string]: string };
  pros: string[];
  cons?: string[];
  externalUrl?: string;
  dateAdded: string;
}

export type ViewMode = 'grid' | 'list';

export type SortOption =
  | 'featured'
  | 'price-desc'
  | 'price-asc'
  | 'years-desc'
  | 'name-asc';
