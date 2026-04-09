"use client";
import React from "react";
import { ReviewCard } from "@/components/product/ReviewCard";
import { Review } from "@/types/product";
import { motion } from "framer-motion";

export function ReviewsSection() {
  // Mock reviews for Phase 1
  const reviews: Review[] = [
    {
      id: "rev-1",
      rating: 5,
      body: "The best cakes in Busia! The signature chocolate layer cake was incredibly rich and moist. Everyone at the party loved it.",
      isVerified: true,
      createdAt: new Date().toISOString(),
      user: { name: "Sarah Wanjiku" },
    },
    {
      id: "rev-2",
      rating: 5,
      body: "Fresh artisanal bread delivered right to my door. The sourdough has the perfect crust and tang. Highly recommended!",
      isVerified: true,
      createdAt: new Date().toISOString(),
      user: { name: "David Otieno" },
    },
    {
      id: "rev-3",
      rating: 4,
      body: "Ordered croissants for our office breakfast. They were flaky and buttery. Arrived warm too!",
      isVerified: true,
      createdAt: new Date().toISOString(),
      user: { name: "Mercy Achieng" },
    },
    {
        id: "rev-4",
        rating: 5,
        body: "Impressive service. The ordering process was seamless and the delivery guy was very professional. The passion fruit cheesecake is to die for.",
        isVerified: true,
        createdAt: new Date().toISOString(),
        user: { name: "John Mutua" },
      },
  ];

  return (
    <section className="py-24 bg-[var(--color-bg)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-surface)] text-[var(--color-accent)] text-xs font-mono font-bold tracking-widest uppercase border border-[var(--color-border)]"
          >
            Kind Words
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight">
            What Our Customers Say
          </h2>
        </div>

        {/* Horizontal Scrolling Reviews */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:-mx-6 md:px-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="snap-center"
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
          
          {/* Subtle gradients to indicate scroll */}
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-[var(--color-bg)] to-transparent pointer-events-none hidden md:block" />
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[var(--color-bg)] to-transparent pointer-events-none hidden md:block" />
        </div>
      </div>
    </section>
  );
}
