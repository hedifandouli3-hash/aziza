export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subCategory?: string;
  packageSize: string;
  price: number; // in DT (e.g. 1.190)
  oldPrice?: number;
  discountPercent?: number;
  image: string;
  additionalImages?: string[];
  description: string;
  features?: string[];
  origin?: string;
  isPromo?: boolean;
  isPopular?: boolean;
  barcode?: string;
  inStock?: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  iconName: string;
  image: string;
  itemCount: number;
  slug: string;
  description: string;
}

export interface Catalogue {
  id: string;
  title: string;
  titleAr?: string;
  subtitle: string;
  period: string;
  startDate: string;
  endDate: string;
  status: 'current' | 'upcoming' | 'past';
  statusLabel: string;
  coverImage: string;
  pageCount: number;
  highlightDiscount?: string;
  pdfUrl?: string;
}

export interface CataloguePage {
  pageNumber: number;
  title: string;
  image: string;
  theme: string;
  products: {
    id: string;
    name: string;
    brand: string;
    price: number;
    oldPrice?: number;
    discount?: string;
    unit: string;
    image: string;
    top: number; // percentage position for interactive hotspot
    left: number;
  }[];
}

export interface Store {
  id: string;
  name: string;
  city: string;
  governorate: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  distanceKm?: number;
  openingHours: string;
  isOpenToday: boolean;
  services: string[];
  hasFreshBakery?: boolean;
  hasButchery?: boolean;
  hasParking?: boolean;
  hasAirConditioning?: boolean;
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  brand: string;
  onlyPromos: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'popular' | 'discount';
}
