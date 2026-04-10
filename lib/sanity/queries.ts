export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true 
    && available == true] | order(publishedAt desc) [0...6] {
    _id,
    name,
    "slug": slug.current,
    category,
    shortDescription,
    priceKes,
    available,
    "images": images[]{
      alt,
      "url": asset->url
    }
  }
`

export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(available desc, publishedAt desc) {
    _id,
    name,
    "slug": slug.current,
    category,
    shortDescription,
    priceKes,
    available,
    "images": images[]{
      alt,
      "url": asset->url
    }
  }
`

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    description,
    shortDescription,
    priceKes,
    available,
    featured,
    ingredients,
    allergens,
    servings,
    preparationTime,
    "images": images[]{
      alt,
      "url": asset->url
    }
  }
`

export const GALLERY_QUERY = `
  *[_type == "galleryImage"] 
  | order(featured desc, publishedAt desc) {
    _id,
    title,
    category,
    caption,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "linkedProductSlug": linkedProduct->slug.current
  }
`

export const FEATURED_GALLERY_QUERY = `
  *[_type == "galleryImage" && featured == true] 
  | order(publishedAt desc) [0...6] {
    _id,
    title,
    category,
    caption,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "linkedProductSlug": linkedProduct->slug.current
  }
`

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    businessName,
    phone,
    location,
    deliveryFeeKes,
    deliveryEstimate,
    pickupEstimate,
    announcementBanner
  }
`
