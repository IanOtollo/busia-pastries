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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product: any = await sanityFetch({ query: PRODUCT_QUERY, params: { slug: params.slug } });
  
  if (!product) {
    return { title: "Product Not Found | Busia Pastries" };
  }

  return {
    title: `${product.name} | Busia Pastries`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product: any = await sanityFetch({ query: PRODUCT_QUERY, params: { slug: params.slug } });

  if (!product) {
    return (
       <div className="min-h-screen pt-40 pb-20 text-center">
          <div className="container mx-auto px-4">
             <h1 className="font-display text-4xl font-bold">Pastry Not Found</h1>
             <p className="mt-4 text-bp-text-muted">We couldn&apos;t find the artisan bake you&apos;re looking for.</p>
          </div>
       </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
