export interface SanityProduct {
  _id: string
  name: string
  slug: string
  category: 'cakes' | 'pastries' | 'breads' | 'seasonal'
  shortDescription: string
  description: {
    _type: string
    _key: string
    [key: string]: unknown
  }[]
  priceKes: number
  available: boolean
  featured: boolean
  ingredients?: string[]
  allergens?: string[]
  servings?: string
  preparationTime?: string
  images: { alt: string; url: string }[]
}

export interface SanityGalleryImage {
  _id: string
  title: string
  category: string
  caption?: string
  imageUrl: string
  imageAlt: string
  linkedProductSlug?: string
}

export interface SiteSettings {
  businessName: string
  phone: string
  location: string
  deliveryFeeKes: number
  deliveryEstimate: string
  pickupEstimate: string
  announcementBanner?: {
    enabled: boolean
    message: string
    bgColor: string
  }
}
