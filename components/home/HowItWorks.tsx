"use client";
import React from "react";
import { Search, ShoppingBag, Truck } from "lucide-react";
import { motion, Variants } from "framer-motion";

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Browse & Choose",
      description: "Explore our daily selection of artisan pastries, custom cakes, and fresh breads.",
      color: "var(--color-accent)",
    },
    {
      icon: ShoppingBag,
      title: "Place Your Order",
      description: "Quick checkout with M-Pesa. Choose delivery to your door or pickup from our store.",
      color: "var(--color-secondary, #f59e0b)",
    },
    {
      icon: Truck,
      title: "We Bake & Deliver",
      description: "Our bakers get to work immediately. Fresh bakes delivered within 45–90 minutes.",
      color: "var(--color-success)",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-[var(--color-bg)] relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/5 blur-[120px] rounded-full -translate-y-1/2 -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-success)]/5 blur-[100px] rounded-full translate-y-1/2 -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20 space-y-4"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight tracking-tight">
            How Busia Pastries <span className="text-[var(--color-accent)]">Works</span>
          </h2>
          <div className="h-1.5 w-20 bg-[var(--color-accent)] mx-auto rounded-full" />
          <p className="text-[var(--color-muted)] text-lg md:text-xl font-medium pt-2">
            Freshness guaranteed. From our oven to your hands in three simple steps.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Step Number Overlay */}
              <span className="absolute top-4 right-8 font-display text-7xl font-black text-[var(--color-muted)]/5 pointer-events-none group-hover:text-[var(--color-accent)]/10 transition-colors">
                0{index + 1}
              </span>

              <div className="relative mb-8">
                <div 
                  className="w-20 h-20 rounded-2xl bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-accent)] border border-[var(--color-border)] shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ boxShadow: `0 0 20px ${step.color}15` }}
                >
                  <step.icon className="w-10 h-10" style={{ color: step.color }} />
                </div>
                
                {/* Visual Connector bubble */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--color-cta)] text-[var(--color-cta-text)] flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[var(--color-accent)]/5 to-transparent rounded-bl-3xl rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
