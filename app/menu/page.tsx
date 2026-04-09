import React from "react";
import { sanityFetch } from "@/lib/sanity/client";
import { MenuClient } from "@/components/menu/MenuClient";

const ALL_PRODUCTS_QUERY = `*[_type == "product"] | order(isFeatured desc, _createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  category,
  description,
  priceKes,
  inStock,
  "mainImage": images[0] {
    asset-> { url },
    alt
  }
}`;

export const metadata = {
  title: "Our Menu | Busia Pastries",
  description: "Browse our hand-crafted artisan pastries, cakes, and breads. Freshly baked in Busia.",
};

export default async function MenuPage() {
  const products: any = await sanityFetch({ query: ALL_PRODUCTS_QUERY });

  return (
     <div className="min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
           {/* Page Header */}
           <div className="max-w-3xl mb-16 space-y-4">
              <h1 className="font-display text-5xl md:text-7xl font-bold text-bp-text leading-none">
                 The <span className="text-bp-accent">Menu.</span>
              </h1>
              <p className="text-bp-text-muted text-lg md:text-xl font-body leading-relaxed max-w-2xl">
                 Hand-crafted daily in Busia with the finest local ingredients. Explore our artisanal selection of pastries and cakes.
              </p>
           </div>

           <MenuClient initialProducts={products} />
        </div>
     </div>
  );
}
