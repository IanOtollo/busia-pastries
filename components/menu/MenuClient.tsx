"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  priceKes: number;
  inStock: boolean;
  mainImage?: { asset: { url: string }; alt?: string };
}

interface MenuClientProps {
  initialProducts: Product[];
}

const CATEGORIES = ["All", "Cakes", "Pastries", "Breads", "Seasonal"];

export function MenuClient({ initialProducts }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let results = [...initialProducts];

    // Filter by Category
    if (activeCategory !== "All") {
      results = results.filter((p) => p.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
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
  }, [initialProducts, activeCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-12">
      {/* Search & Filters Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-6 border-y border-bp-border/50 sticky top-20 z-30 bg-bp-bg/80 backdrop-blur-md">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border",
                activeCategory === cat
                  ? "bg-bp-cta border-bp-cta text-bp-cta-text shadow-sm"
                  : "bg-bp-surface border-bp-border text-bp-text-muted hover:text-bp-text"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-text-muted group-focus-within:text-bp-accent transition-colors" />
            <input
              type="text"
              placeholder="Search bakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bp-surface border border-bp-border rounded-md pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-bp-accent transition-all"
            />
          </div>

          <div className="relative w-full sm:w-48 group">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-text-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-bp-surface border border-bp-border rounded-md pl-11 pr-8 py-2.5 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-bp-accent transition-all cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low-High</option>
              <option value="price-high">Price: High-Low</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
         <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-bp-text-muted">
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
              className="flex flex-col items-center justify-center py-32 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-bp-surface rounded-full flex items-center justify-center text-bp-text-muted border border-bp-border">
                <Search className="w-6 h-6 opacity-30" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-bp-text">No matches found</h3>
                <p className="text-bp-text-muted text-sm max-w-xs font-body">
                   Try adjusting your filters or search terms to find what you&apos;re looking for.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
