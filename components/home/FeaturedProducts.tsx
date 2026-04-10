import React from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { sanityFetch } from "@/lib/sanity/client";
import { ChefHat, Star } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  category: string;
  description: string;
  priceKes: number;
  inStock: boolean;
  mainImage?: { asset: { url: string }; alt?: string };
}

export async function FeaturedProducts() {
  /**
   * ZERO MOCK DATA POLICY:
   * We fetch real products from Sanity. If empty, we show the 
   * "Under Maintenance" state instead of placeholders.
   */
  const result = await sanityFetch<Product[]>(
    `*[_type == "product" && featured == true][0...4] {
      _id,
      name,
      slug,
      category,
      description,
      priceKes,
      inStock,
      "mainImage": images[0] {
        asset-> { url },
        alt
      }
    }`
  );

  const products = Array.isArray(result) ? result : [];

  if (products.length === 0) {
    return (
      <section className="py-32 bg-cp-bg">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="w-24 h-24 bg-cp-surface rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-cp-border">
            <ChefHat className="w-12 h-12 text-cp-text-muted opacity-50" />
          </div>
          <div className="space-y-6">
            <h2 className="font-display text-4xl md:text-6xl font-black text-cp-text tracking-tighter uppercase">Our menu is evolving.</h2>
            <p className="text-cp-text-muted max-w-lg mx-auto leading-relaxed font-body text-lg italic">
              Clare is currently handpicking this season&apos;s finest bakes 
              with so much love. She&apos;ll be back soon with 
              something truly special — check back shortly.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-cp-bg border-y border-cp-border relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cp-accent/10 text-cp-accent text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
               <Star className="w-3 h-3 fill-cp-accent" />
               Baker&apos;s Choice
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-cp-text leading-[0.8] tracking-[ -0.05em] uppercase italic">
              Clare&apos;s <br />
              <span className="text-cp-accent not-italic">Favorites.</span>
            </h2>
          </div>
          <div className="md:text-right space-y-4">
             <p className="text-cp-text-muted max-w-sm ml-auto leading-relaxed font-body text-lg">
                Hand-picked selections from our Busia bakery, crafted with premium local ingredients 
                and baked with passion.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product._id} 
              product={{
                ...product,
                slug: product.slug.current // Flatten the slug for the ProductCard
              }} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
