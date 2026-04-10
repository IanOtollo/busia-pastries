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
    <div className={`group relative flex flex-col h-full bg-white rounded-[2.5rem] border border-cp-border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-cp-accent/30 hover:-translate-y-1 ${!product.inStock && "opacity-60 grayscale-[0.6]"}`}>
      {/* Image Area */}
      <Link href={`/menu/${product.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-cp-surface">
        {product.mainImage?.asset?.url ? (
          <Image
            src={product.mainImage.asset.url}
            alt={product.mainImage.alt || product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-cp-border">
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
              <path d="M12 2v20M12 2L8 6M12 2l4 4M12 7l-5 4" />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-cp-accent border border-cp-border/50 rounded-full">
            {product.category}
          </span>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-cp-bg/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-cp-error text-white text-[9px] font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-lg">
              Secret Recipe Soon
            </span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-grow p-8 space-y-6">
        <div className="space-y-3">
          <Link href={`/menu/${product.slug}`}>
            <h3 className="font-display text-2xl font-black text-cp-text group-hover:text-cp-accent transition-colors leading-[1.1] tracking-tight uppercase italic">
              {product.name}
            </h3>
          </Link>
          <p className="text-cp-text-muted text-xs font-body line-clamp-2 leading-relaxed italic">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-4 space-y-6">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-bold text-cp-text-muted uppercase tracking-widest mb-1">Artisan Price</span>
              <span className="font-mono text-xl font-bold text-cp-accent">
                {formatPrice(product.priceKes)}
              </span>
            </div>
            <Link 
              href={`/menu/${product.slug}`}
              className="w-10 h-10 rounded-full border border-cp-border flex items-center justify-center text-cp-text-muted hover:border-cp-accent hover:text-cp-accent transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full btn-primary py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}
