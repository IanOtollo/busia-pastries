"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MessageCircle, ChevronRight, Minus, Plus, AlertCircle, ChevronDown } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useCurrency } from "@/store/useCurrency";
import { cn } from "@/lib/utils/cn";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  priceKes: number;
  inStock: boolean;
  images: Array<{
    asset: { url: string };
    alt?: string;
  }>;
  ingredients?: string[];
  allergens?: string[];
}

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>("ingredients");
  
  const addItem = useCart((state) => state.addItem);
  const { formatPrice } = useCurrency();

  const handleAddToCart = () => {
    addItem({
      sanityId: product._id,
      productName: product.name,
      unitPriceKes: product.priceKes,
      quantity,
      imageUrl: product.images?.[0]?.asset?.url,
      slug: product.slug,
    });
    toast.success(`${product.name} (x${quantity}) added to cart!`);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hi Michael, I'd like to order: ${product.name} x${quantity}`
    );
    window.open(`https://wa.me/254724848228?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted mb-8">
          <Link href="/" className="hover:text-bp-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/menu" className="hover:text-bp-accent transition-colors">Menu</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-bp-accent">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-[4/3] relative bg-bp-surface-2 rounded-2xl overflow-hidden border border-bp-border shadow-md">
              <AnimatePresence mode="wait">
                {product.images?.[selectedImage]?.asset?.url ? (
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[selectedImage].asset.url}
                      alt={product.images[selectedImage].alt || product.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-bp-border">
                    <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                      <path d="M12 2v20M12 2L8 6M12 2l4 4M12 7l-5 4" />
                    </svg>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pt-2">
                {product.images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                      selectedImage === idx ? "border-bp-accent shadow-md scale-105" : "border-bp-border hover:border-bp-text-muted opacity-60"
                    )}
                  >
                    <Image
                      src={img.asset.url}
                      alt={`Thumbnail ${idx}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="inline-block bg-bp-surface border border-bp-border px-4 py-1.5 text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-bp-accent rounded-full">
                {product.category}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-bp-text leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-6">
                 <span className="font-mono text-3xl font-bold text-bp-accent">
                   {formatPrice(product.priceKes)}
                 </span>
                 {!product.inStock && (
                   <span className="bg-bp-error text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                     Unstocked
                   </span>
                 )}
              </div>
            </div>

            <p className="text-bp-text-muted text-lg leading-relaxed font-body border-l-2 border-bp-accent/20 pl-6 italic">
              {product.description}
            </p>

            {/* Add to Cart / Quantity */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-bp-border rounded-md bg-bp-bg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:text-bp-accent transition-colors disabled:opacity-30"
                    disabled={quantity <= 1 || !product.inStock}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:text-bp-accent transition-colors disabled:opacity-30"
                    disabled={!product.inStock}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-xs font-mono font-bold text-bp-text-muted">Quantity Selector</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                   onClick={handleAddToCart}
                   disabled={!product.inStock}
                   className="flex-grow btn-primary flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                   <ShoppingBag className="w-5 h-5" />
                   Add to Cart
                </button>
                <button
                   onClick={handleWhatsAppOrder}
                   className="flex-grow px-10 py-4 border-2 border-bp-cta text-bp-cta rounded-md font-bold text-lg tracking-wide hover:bg-bp-cta hover:text-bp-cta-text transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                   <MessageCircle className="w-5 h-5" />
                   WhatsApp Order
                </button>
              </div>
              <p className="text-[10px] text-bp-text-muted text-center font-medium font-mono uppercase tracking-widest">
                 Available for Busia Town Delivery or In-Store Pickup
              </p>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-1 pt-8">
               {/* Ingredients */}
               <div className="border border-bp-border rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setExpandedSection(expandedSection === "ingredients" ? null : "ingredients")}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-bp-surface transition-colors"
                  >
                     <span className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text">Ingredients</span>
                     <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", expandedSection === "ingredients" ? "rotate-180" : "")} />
                  </button>
                  <AnimatePresence>
                     {expandedSection === "ingredients" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6"
                        >
                           <p className="text-sm text-bp-text-muted leading-relaxed font-body">
                             {product.ingredients?.join(", ") || "Strictly minimal local ingredients hand-selected for quality."}
                           </p>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>

               {/* Allergens */}
               {product.allergens && product.allergens.length > 0 && (
                  <div className="border border-bp-border rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setExpandedSection(expandedSection === "allergens" ? null : "allergens")}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-bp-surface transition-colors"
                    >
                       <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-bp-error" />
                          <span className="text-xs font-mono font-bold uppercase tracking-widest text-bp-error">Allergy Awareness</span>
                       </div>
                       <ChevronDown className={cn("w-4 h-4 transition-transform duration-300 text-bp-error", expandedSection === "allergens" ? "rotate-180" : "")} />
                    </button>
                    <AnimatePresence>
                       {expandedSection === "allergens" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-6"
                          >
                             <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg">
                                <p className="text-xs text-orange-800 leading-relaxed italic">
                                   This artisan bake contains or may contain traces of: <span className="font-bold underline">{product.allergens.join(", ")}</span>. 
                                   Prepared in a space that handles nuts and dairy.
                                </p>
                             </div>
                          </motion.div>
                       )}
                    </AnimatePresence>
                  </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
