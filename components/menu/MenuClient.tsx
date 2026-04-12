"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ProductCard } from "@/components/product/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  priceKes: number;
  inStock: boolean;
  mainImage?: { asset: { url: string }; alt?: string };
}

interface MenuClientProps {
  initialProducts: Product[];
}


export function MenuClient({ initialProducts }: MenuClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let results = [...initialProducts];


    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      results.sort((a, b) => a.priceKes - b.priceKes);
    } else if (sortBy === "price-high") {
      results.sort((a, b) => b.priceKes - a.priceKes);
    }

    // Push out-of-stock to the end
    results.sort((a, b) => (a.inStock === b.inStock ? 0 : a.inStock ? -1 : 1));

    return results;
  }, [initialProducts, searchQuery, sortBy]);

  return (
    <div className="space-y-12">
      {/* Search & Filters Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-6 border-y border-cp-border/50 sticky top-20 z-30 bg-cp-bg/80 backdrop-blur-md">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-cp-accent">Collective Menu</span>
          <h2 className="text-2xl font-black text-cp-text uppercase italic">The Full <span className="text-cp-accent not-italic">Selection.</span></h2>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cp-text-muted group-focus-within:text-cp-accent transition-colors" />
            <input
              type="text"
              placeholder="Search bakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cp-surface border border-cp-border rounded-md pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-cp-accent transition-all"
            />
          </div>

          <div className="relative w-full sm:w-48 group">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cp-text-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-cp-surface border border-cp-border rounded-md pl-11 pr-8 py-2.5 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-cp-accent transition-all cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low-High</option>
              <option value="price-high">Price: High-Low</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cp-text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
         <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cp-text-muted">
            {filteredProducts.length} items found
         </span>
      </div>

      {/* Product Grid */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
               layout
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center space-y-6 max-w-md mx-auto"
            >
              <div className="w-20 h-20 bg-cp-accent/5 rounded-full flex items-center justify-center text-cp-accent border border-cp-accent/20">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-bold text-cp-text leading-tight uppercase tracking-tight">Handpicking Perfection</h3>
                <p className="text-cp-text-muted text-sm leading-relaxed font-body italic">
                   "Clare is handpicking this season's finest bakes with so much love. She'll be back soon with something truly special — check back shortly."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dedicated Custom Bake Section - Anchor Point */}
      <section 
        id="custom-order" 
        className="mt-32 pt-24 border-t border-cp-border/30 scroll-mt-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-cp-surface rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cp-accent/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cp-accent/10 text-cp-accent rounded-full border border-cp-accent/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Bespoke Excellence</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="font-display text-5xl md:text-7xl font-black text-cp-text uppercase leading-[0.85] tracking-tighter">
                Your Unique <br />
                <span className="text-cp-accent italic lowercase font-medium tracking-normal">Bake.</span>
              </h2>
              <p className="text-cp-text-muted text-lg leading-relaxed font-body italic">
                "Have a specific craving or a grand celebration? My favorite bakes are the ones I design specifically for you. No request is too intricate."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { step: "01", title: "Consult", desc: "Share your vision and preferences." },
                { step: "02", title: "Design", desc: "We finalize flavors and aesthetics." },
                { step: "03", title: "Bake", desc: "Hand-crafted with artisan precision." },
                { step: "04", title: "Enjoy", desc: "Delivered fresh to your doorstep." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="font-mono text-[10px] text-cp-accent font-bold tracking-widest">{item.step}</span>
                  <h4 className="font-bold text-cp-text uppercase tracking-tight">{item.title}</h4>
                  <p className="text-xs text-cp-text-muted tracking-wide">{item.desc}</p>
                </div>
              ))}
            </div>

            <a 
              href="https://wa.me/254724848228?text=Hello%20Clare!%20I'd%20like%20to%20order%20something%20special%20that%27s%20not%20on%20the%20main%20menu..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-5 bg-cp-text text-cp-bg rounded-full font-black text-xs uppercase tracking-widest hover:bg-cp-accent hover:text-white transition-all shadow-xl shadow-cp-text/10"
            >
              Share Your Taste via WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="relative group rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
            <motion.div 
              className="absolute inset-0 z-10 bg-gradient-to-t from-cp-surface/80 via-transparent to-transparent pointer-events-none" 
            />
            <Image 
              src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1936&auto=format&fit=crop"
              alt="Clare crafting a bespoke cake"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute bottom-8 left-8 z-20">
              <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl space-y-1">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/60">Bespoke Process</p>
                <p className="text-xs font-bold text-white uppercase italic">Hand-crafted by Clare.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
