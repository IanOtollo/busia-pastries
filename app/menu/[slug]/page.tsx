import React from "react";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { client } from "@/lib/sanity/client";
import { GET_PRODUCT_BY_SLUG, GET_ALL_SLUGS } from "@/lib/sanity/queries";
import { SanityProduct } from "@/types/product";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
  const slugs = (await client.fetch(GET_ALL_SLUGS)) as { slug: string }[];
  return slugs.map((s) => ({
    slug: s.slug,
  }));
}

interface PageProps {
  params: { slug: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = (await client.fetch(GET_PRODUCT_BY_SLUG, {
    slug: params.slug,
  })) as SanityProduct | null;

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <Link 
          href="/menu" 
          className="inline-flex items-center text-sm font-black uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors mb-12 group gap-2"
        >
           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
           Back to Menu
        </Link>

        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}
