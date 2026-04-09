"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { SanityProduct } from "@/types/product";

interface FeaturedProductsProps {
  products: SanityProduct[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featuredProducts = products;

  return (
    <section className="py-24 bg-[var(--color-bg)]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[var(--color-accent)] font-mono text-sm uppercase tracking-[0.2em]"
            >
              Curated Selection
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] leading-tight"
            >
              Our Most Loved Bakes
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/menu" 
              className="group flex items-center gap-2 text-[var(--color-text)] font-semibold hover:text-[var(--color-accent)] transition-colors"
            >
              <span>See Full Menu</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Mobile View All (Sticky bottom on mobile if grid is long) */}
        <div className="mt-12 text-center md:hidden">
            <Link href="/menu">
                <button className="w-full h-14 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl font-bold flex items-center justify-center gap-2 text-[var(--color-text)]">
                    Explore Everything
                     <ArrowRight className="w-5 h-5" />
                </button>
            </Link>
        </div>
      </div>
    </section>
  );
}
