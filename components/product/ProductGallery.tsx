"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SanityImage } from "@/types/product";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  images: SanityImage[];
  mainImage?: SanityImage;
}

export function ProductGallery({ images, mainImage }: ProductGalleryProps) {
  // Combine main image and gallery images
  const allImages = mainImage ? [mainImage, ...images] : images;
  const [activeIndex, setActiveIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-cp-surface rounded-3xl flex items-center justify-center text-cp-text-muted italic border border-cp-border shadow-inner">
        No image available
      </div>
    );
  }

  const selectedImage = allImages[activeIndex];

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image */}
      <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white border border-cp-border shadow-2xl shadow-cp-accent/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={selectedImage.asset.url}
              alt={selectedImage.alt || "Product Image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0",
                activeIndex === index
                  ? "border-cp-accent scale-105 shadow-lg shadow-cp-accent/20"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.asset.url}
                alt={img.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
