"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { useCurrency } from "@/store/useCurrency";
import { Plus, Eye } from "lucide-react";
import toast from "react-hot-toast";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    priceKes: number;
    inStock: boolean;
    mainImage?: { asset: { url: string }; alt?: string };
  };
}

export function ProductCard({ product }: ProductProps) {
  const addItem = useCart((state) => state.addItem);
  const { formatPrice } = useCurrency();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      sanityId: product._id,
      productName: product.name,
      unitPriceKes: product.priceKes,
      quantity: 1,
      imageUrl: product.mainImage?.asset?.url,
      slug: product.slug,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className={`product-card group relative flex flex-col h-full ${!product.inStock && "opacity-60 grayscale-[0.6]"}`}>
      {/* Image Area */}
      <Link href={`/menu/${product.slug}`} className="relative block aspect-[16/9] overflow-hidden rounded-t-xl bg-bp-surface-2">
        {product.mainImage?.asset?.url ? (
          <Image
            src={product.mainImage.asset.url}
            alt={product.mainImage.alt || product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-bp-border">
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2v20M12 2L8 6M12 2l4 4M12 7l-5 4" />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-bp-surface/90 backdrop-blur-md px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-bp-text-muted border border-bp-border/50 rounded-sm">
            {product.category}
          </span>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <span className="bg-bp-error text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              Unavailable
            </span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-grow p-6 space-y-4">
        <div className="space-y-2">
          <Link href={`/menu/${product.slug}`}>
            <h3 className="font-display text-xl font-bold text-bp-text group-hover:text-bp-accent transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
          <p className="text-bp-text-muted text-xs font-body line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-4 space-y-6">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-lg font-bold text-bp-accent">
                {formatPrice(product.priceKes)}
              </span>
            </div>
            <Link 
              href={`/menu/${product.slug}`}
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted hover:text-bp-accent transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              Details
            </Link>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-bp-cta text-bp-cta-text py-3.5 rounded-md font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-bp-cta-hover active:scale-[0.98] disabled:bg-bp-border disabled:text-bp-text-muted flex items-center justify-center gap-2 group/btn"
          >
            <Plus className="w-4 h-4 transition-transform group-hover/btn:rotate-90" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
