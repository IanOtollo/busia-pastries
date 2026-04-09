import React from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { sanityFetch } from "@/lib/sanity/client";

/**
 * Featured Products Section
 * Strictly follows the "Zero Mock Data" policy.
 */

const FEATURED_QUERY = `*[_type == "product" && isFeatured == true] | order(_createdAt desc) [0...6] {
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

export async function FeaturedProducts() {
  const products: any = await sanityFetch({ query: FEATURED_QUERY });

  return (
    <section className="py-24 bg-bp-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-bp-accent">
              From the Oven
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-bp-text leading-none">
              Our Most Loved Bakes
            </h2>
          </div>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-8 animate-fade-in border-2 border-dashed border-bp-border rounded-3xl bg-bp-surface/30">
            <div className="w-24 h-24 bg-bp-surface rounded-full flex items-center justify-center text-bp-text-muted">
               <svg className="w-12 h-12 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 2v20M12 2L8 6M12 2l4 4M12 7l-5 4" />
               </svg>
            </div>
            <div className="space-y-3">
               <h3 className="font-display text-3xl font-bold text-bp-text">Our menu is being updated.</h3>
               <p className="text-bp-text-muted text-sm max-w-xs mx-auto leading-relaxed font-body">
                  Michael is currently hand-crafting new recipes. Please check back soon for our latest artisan bakes.
               </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
