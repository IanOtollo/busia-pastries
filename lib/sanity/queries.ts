// GROQ queries for Sanity product data

export const PRODUCT_FIELDS = `
  _id,
  _createdAt,
  name,
  slug,
  category,
  description,
  richDescription,
  priceKes,
  isFeatured,
  inStock,
  ingredients,
  allergens,
  images[] {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  }
`;

export const PRODUCT_CARD_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  category,
  description,
  priceKes,
  isFeatured,
  inStock,
  "mainImage": images[0] {
    asset-> { _id, url },
    alt
  }
`;

export const GET_FEATURED_PRODUCTS = `*[_type == "product" && isFeatured == true] | order(_createdAt desc) [0...6] {
  ${PRODUCT_CARD_FIELDS}
}`;

export const GET_ALL_PRODUCTS = `*[_type == "product"] | order(isFeatured desc, _createdAt desc) {
  ${PRODUCT_CARD_FIELDS}
}`;

export const GET_PRODUCTS_BY_CATEGORY = (category: string) =>
  `*[_type == "product" && category == "${category}"] | order(_createdAt desc) {
    ${PRODUCT_CARD_FIELDS}
  }`;

export const GET_PRODUCT_BY_SLUG = `*[_type == "product" && slug.current == $slug][0] {
  ${PRODUCT_FIELDS},
  "slug": slug.current
}`;

export const GET_ALL_SLUGS = `*[_type == "product"] {
  "slug": slug.current
}`;
