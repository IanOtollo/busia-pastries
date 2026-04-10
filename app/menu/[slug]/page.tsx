import React from "react";
import { sanityFetch } from "@/lib/sanity/client";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { Metadata } from "next";

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  category,
  description,
  richDescription,
  priceKes,
  inStock,
  ingredients,
  allergens,
  "images": images[] {
    asset-> { url },
    alt
  }
}`;

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  priceKes: number;
  inStock: boolean;
  images: Array<{ asset: { url: string }, alt?: string }>;
  ingredients?: string[];
  allergens?: string[];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await sanityFetch<Product | null>(PRODUCT_QUERY, { slug });
  
  // Handle empty array or null (Zero Mock Data Policy)
  if (!product || (Array.isArray(product) && product.length === 0)) {
    return { title: "Product Not Found | Busia Pastries" };
  }

  // Safe cast since we checked for empty array
  const p = product as Product;

  return {
    title: `${p.name} | Busia Pastries`,
    description: p.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await sanityFetch<Product | null>(PRODUCT_QUERY, { slug });

  // Handle empty array or null
  if (!result || (Array.isArray(result) && result.length === 0)) {
    return (
       <div className="min-h-screen pt-40 pb-20 text-center">
          <div className="container mx-auto px-4">
             <h1 className="font-display text-4xl font-bold">Pastry Not Found</h1>
             <p className="mt-4 text-bp-text-muted">We couldn&apos;t find the artisan bake you&apos;re looking for.</p>
          </div>
       </div>
    );
  }

  const product = result as Product;

  return <ProductDetailClient product={product} />;
}
