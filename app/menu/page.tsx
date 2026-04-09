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

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  priceKes: number;
  inStock: boolean;
  mainImage?: { asset: { url: string }; alt?: string };
}

export default async function MenuPage() {
  const result = await sanityFetch<Product[]>({ query: ALL_PRODUCTS_QUERY });
  
  // Ensure we pass an array to MenuClient, even if empty (Zero Mock Data Policy)
  const products = Array.isArray(result) ? result : [];

  return (
     <div className="min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
           {/* Page Header */}
           <div className="max-w-4xl mx-auto text-center space-y-4 mb-20">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-bp-accent">Daily Selection</span>
              <h1 className="font-display text-6xl md:text-8xl font-bold text-bp-text leading-none">
                 The <span className="text-bp-accent italic">Bakeshop.</span>
              </h1>
              <p className="text-bp-text-muted max-w-lg mx-auto leading-relaxed">
                 Explore our daily collection of artisan pastries, custom cakes, and traditional breads.
              </p>
           </div>

           <MenuClient initialProducts={products as Product[]} />
        </div>
     </div>
  );
}
