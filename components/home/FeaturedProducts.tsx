import React from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { sanityFetch } from "@/lib/sanity/client";
import { ChefHat } from "lucide-react";

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
      <section className="py-24 bg-bp-bg">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="w-20 h-20 bg-bp-surface rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-bp-border">
            <ChefHat className="w-10 h-10 text-bp-text-muted" />
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-4xl font-bold text-bp-text">Our menu is being updated.</h2>
            <p className="text-bp-text-muted max-w-md mx-auto leading-relaxed">
              Michael is currently refining our seasonal selection. Check back soon for fresh, artisan bakes.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-bp-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-bp-accent">
              Michael&apos;s Favorites
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-bp-text leading-none">
              Featured <br />
              <span className="text-bp-accent italic">Creation.</span>
            </h2>
          </div>
          <p className="text-bp-text-muted max-w-sm md:text-right leading-relaxed font-body">
            Hand-picked selections from our Busia bakery, crafted with premium local ingredients.
          </p>
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
