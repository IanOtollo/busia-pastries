// Shared TypeScript types for the Clare Pastries application

// ── Sanity ──────────────────────────────────────────────
export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: { width: number; height: number };
  };
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string;
}

export interface SanityProduct {
  _id: string;
  _createdAt: string;
  name: string;
  slug: string;
  category: "Cakes" | "Pastries" | "Bread" | "Occasion" | string;
  shortDescription: string;
  richDescription?: unknown; // Sanity portable text
  priceKes: number;
  isFeatured: boolean;
  inStock: boolean;
  ingredients?: string[];
  allergens?: string[];
  mainImage?: SanityImage;
  images: SanityImage[];
}

// ── Cart ─────────────────────────────────────────────────
export interface CartItem {
  sanityId: string;
  productName: string;
  unitPriceKes: number;
  quantity: number;
  imageUrl?: string;
  slug: string;
}

// ── Currency ─────────────────────────────────────────────
export type Currency = "KES" | "UGX";

// ── Order ────────────────────────────────────────────────
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "BAKING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";
export type Fulfillment = "DELIVERY" | "PICKUP";

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillment: Fulfillment;
  totalKes: number;
  createdAt: string;
  items: {
    productName: string;
    quantity: number;
    totalPriceKes: number;
  }[];
}

// ── Review ───────────────────────────────────────────────
export interface Review {
  id: string;
  rating: number;
  body: string;
  isVerified: boolean;
  createdAt: string;
  user?: { name?: string | null } | null;
}

// ── Season ───────────────────────────────────────────────
export type Season =
  | "valentine"
  | "easter"
  | "halloween"
  | "christmas"
  | "newyear"
  | "default";
