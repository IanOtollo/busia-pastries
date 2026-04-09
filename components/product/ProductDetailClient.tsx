"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StarRating } from "@/components/product/StarRating";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShoppingCart, Heart, Share2, Clock, ShieldCheck, Info } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { formatPrice } from "@/lib/utils/currency";
import { SanityProduct } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailClientProps {
  product: SanityProduct;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const { currency, rate } = useCurrency();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const images = product.images || [];
  const mainImageUrl = images[activeImage]?.asset.url || "/placeholder-pastry.jpg";

  const handleAddToCart = () => {
    addItem({
      sanityId: product._id,
      productName: product.name,
      unitPriceKes: product.priceKes,
      quantity,
      imageUrl: images[0]?.asset.url || "/placeholder-pastry.jpg",
      slug: product.slug
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
      {/* Gallery Section */}
      <div className="space-y-8 sticky top-32">
        <motion.div 
           layoutId={`image-${product._id}`}
           className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image 
                src={mainImageUrl} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {images.map((img, idx) => (
               <button 
                 key={idx}
                 onClick={() => setActiveImage(idx)}
                 className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                   activeImage === idx ? "border-[var(--color-accent)] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                 }`}
               >
                  <Image src={img.asset.url} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
               </button>
            ))}
          </div>
        )}

        <div className="p-6 rounded-3xl bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/10 flex items-start gap-4">
           <Info className="w-6 h-6 text-[var(--color-accent)] shrink-0 mt-1" />
           <p className="text-sm text-[var(--color-text)]/80 leading-relaxed font-medium">
             Our artisan pastries are baked fresh every morning in our Busia bakery. Order by 10 AM for same-day delivery.
           </p>
        </div>
      </div>

      {/* Product Information Section */}
      <div className="space-y-12">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
             <Badge variant="accent" className="font-black uppercase tracking-widest px-4 py-1">{product.category}</Badge>
             {product.isFeatured && (
               <Badge variant="success" className="font-black uppercase tracking-widest px-4 py-1">Top Rated</Badge>
             )}
              {product.inStock ? (
                <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 border-none font-black uppercase tracking-tighter">In Stock</Badge>
              ) : (
                <Badge variant="danger" className="font-black uppercase tracking-tighter">Temporarily Unavailable</Badge>
              )}
          </div>
          
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black text-[var(--color-text)] leading-[0.9] tracking-tighter">
             {product.name}
          </h1>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <StarRating rating={4.8} />
                <span className="text-sm font-black text-[var(--color-text)]">4.8</span>
             </div>
             <div className="h-4 w-px bg-[var(--color-border)]" />
             <span className="text-sm font-bold text-[var(--color-muted)] underline underline-offset-4 cursor-pointer hover:text-[var(--color-accent)] transition-colors">
               Read 124 Trusted Reviews
             </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-muted)]">Artisan Description</h3>
          <p className="text-[var(--color-text)]/80 text-xl leading-relaxed font-medium">
             {product.description}
          </p>
          {!!product.richDescription && (
             <div className="prose prose-invert max-w-none text-[var(--color-muted)] lg:text-lg">
                {/* Render PortableText if library available, else just a fallback */}
                <p>Meticulously prepared following traditional French techniques infused with local Busia flavors.</p>
             </div>
          )}
        </div>

        <div className="space-y-8 pt-6 border-t border-[var(--color-border)]">
           <div className="flex items-baseline gap-3">
              <span className="text-6xl font-mono font-black text-[var(--color-accent)]">
                 {formatPrice(product.priceKes, currency, rate)}
              </span>
              <span className="text-sm font-mono font-bold text-[var(--color-muted)] uppercase tracking-widest">Tax Included</span>
           </div>
           
           <div className="flex flex-wrap gap-5 items-center">
              <div className="flex items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full p-1.5 shadow-inner">
                 <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="w-12 h-12 flex items-center justify-center font-black text-xl hover:text-[var(--color-accent)] hover:bg-white/50 rounded-full transition-all"
                 >-</button>
                 <span className="w-14 text-center font-mono font-black text-lg">{quantity}</span>
                 <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="w-12 h-12 flex items-center justify-center font-black text-xl hover:text-[var(--color-accent)] hover:bg-white/50 rounded-full transition-all"
                 >+</button>
              </div>

              <Button 
                onClick={handleAddToCart} 
                disabled={!product.inStock}
                className="flex-1 h-16 rounded-full font-black text-xl shadow-[0_20px_50px_rgba(var(--color-accent-rgb),0.2)] hover:shadow-none transition-all group"
              >
                 Order Now
                 <ShoppingCart className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>

              <div className="flex gap-3">
                <button className="w-16 h-16 flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-[var(--color-muted)] hover:text-rose-500 hover:border-rose-100 transition-all shadow-sm">
                   <Heart className="w-6 h-6" />
                </button>
                <button className="w-16 h-16 flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-all shadow-sm">
                   <Share2 className="w-6 h-6" />
                </button>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="flex items-center gap-4 p-6 bg-[var(--color-surface)] rounded-[2rem] border border-[var(--color-border)] group hover:border-[var(--color-accent)]/30 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-muted)]">Flash Prep</p>
                 <p className="font-black text-lg">45-60 Mins</p>
              </div>
           </div>
           <div className="flex items-center gap-4 p-6 bg-[var(--color-surface)] rounded-[2rem] border border-[var(--color-border)] group hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-muted)]">Verified</p>
                 <p className="font-black text-lg">100% Fresh</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
