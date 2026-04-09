"use client";
import React, { useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Search, SlidersHorizontal } from "lucide-react";
import { SanityProduct } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["ALL", "CAKES", "PASTRIES", "BREADS", "SEASONAL"];

interface MenuClientProps {
  initialProducts: SanityProduct[];
}

export function MenuClient({ initialProducts }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = initialProducts.filter(p => 
    (activeCategory === "ALL" || p.category?.toUpperCase() === activeCategory) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-12">
      {/* Dynamic Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
         <div className="space-y-4">
            <h1 className="font-display text-6xl md:text-8xl font-black tracking-tighter text-[var(--color-text)]">
              The <span className="text-[var(--color-accent)]">Menu.</span>
            </h1>
            <p className="text-[var(--color-muted)] text-xl max-w-xl leading-relaxed">
               Hand-crafted daily in Busia with the finest local ingredients. 
               Explore our artisanal selection of pastries and cakes.
            </p>
         </div>
         
         <div className="relative w-full md:w-96 group">
            <div className="absolute inset-0 bg-[var(--color-accent)]/5 blur-xl group-focus-within:bg-[var(--color-accent)]/10 transition-all rounded-full" />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted)] group-focus-within:text-[var(--color-accent)] transition-colors" />
            <input 
              type="text"
              placeholder="Search our artisan bakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl py-5 pl-14 pr-8 text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all shadow-sm"
            />
         </div>
      </div>

      {/* Categories & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-[var(--color-border)]/50">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? "text-white" 
                : "bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeCat"
                  className="absolute inset-0 bg-[var(--color-accent)] rounded-full shadow-lg shadow-[var(--color-accent)]/20"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-mono font-bold text-[var(--color-muted)] uppercase tracking-wider">
           <SlidersHorizontal className="w-4 h-4" />
           <span>Showing {filteredProducts.length} Artisan Creations</span>
        </div>
      </div>

      {/* Results */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <ProductGrid products={filteredProducts} isLoading={false} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center space-y-4"
            >
               <div className="w-20 h-20 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
                  <Search className="w-8 h-8 text-[var(--color-muted)]" />
               </div>
               <h3 className="text-2xl font-display font-bold text-[var(--color-text)]">No matches found</h3>
               <p className="text-[var(--color-muted)] max-w-xs">
                 We couldn't find any pastries matching "{searchQuery}". Try a different search term or category.
               </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
