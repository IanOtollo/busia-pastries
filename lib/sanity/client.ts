const MOCK_PRODUCTS = [
  {
    _id: "p1",
    _createdAt: new Date().toISOString(),
    name: "Classic Chocolate Cake",
    slug: "classic-chocolate-cake",
    category: "Cakes",
    description: "Rich, decadent chocolate cake with fudge frosting.",
    priceKes: 2500,
    isFeatured: true,
    inStock: true,
    images: [{ asset: { _id: "img1", url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800" }, alt: "Chocolate Cake" }],
    mainImage: { asset: { _id: "img1", url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800" }, alt: "Chocolate Cake" }
  },
  {
    _id: "p2",
    _createdAt: new Date().toISOString(),
    name: "Busia Famous Bread",
    slug: "busia-famous-bread",
    category: "Bread",
    description: "Freshly baked artisan bread daily.",
    priceKes: 150,
    isFeatured: true,
    inStock: true,
    images: [{ asset: { _id: "img2", url: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800" }, alt: "Bread" }],
    mainImage: { asset: { _id: "img2", url: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800" }, alt: "Bread" }
  },
  {
    _id: "p3",
    _createdAt: new Date().toISOString(),
    name: "Vanilla Cupcake",
    slug: "vanilla-cupcake",
    category: "Pastries",
    description: "Sweet vanilla cupcake with buttercream.",
    priceKes: 200,
    isFeatured: true,
    inStock: true,
    images: [{ asset: { _id: "img3", url: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=800" }, alt: "Vanilla Cupcake" }],
    mainImage: { asset: { _id: "img3", url: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=800" }, alt: "Vanilla Cupcake" }
  }
];

export const sanityClient = {
  fetch: async (query: string, params?: Record<string, any>) => {
    if (query.includes("slug.current == $slug")) {
      return MOCK_PRODUCTS.find(p => p.slug === params?.slug) || null;
    }
    if (query.includes("\"slug\": slug.current")) {
      return MOCK_PRODUCTS.map(p => ({ slug: p.slug }));
    }
    return MOCK_PRODUCTS;
  }
} as any;

export const client = sanityClient;
