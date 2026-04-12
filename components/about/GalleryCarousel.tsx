"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  caption?: string;
}

interface GalleryCarouselProps {
  images: GalleryImage[];
}

const CroissantIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6 stroke-current", className)} strokeWidth="1.5">
    <path d="M4 16C4 16 2 14 2 11C2 8 5 6 8 6C11 6 12 8 13 9" />
    <path d="M8 18C8 18 10 16 12 16C14 16 16 18 16 14C16 10 14 8 12 8" />
    <path d="M13 16C13 16 15 14 18 14C21 14 22 16 22 19" />
    <path d="M12 8C12 8 13.5 5 16 5C18.5 5 21 7 21 10C21 13 19 14 18 14" />
  </svg>
);

export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-cp-border bg-cp-surface flex flex-col items-center justify-center p-12 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-cp-accent/10 flex items-center justify-center text-cp-accent border border-cp-accent/20">
          <CroissantIcon className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <p className="font-display text-xl font-bold uppercase tracking-tight text-cp-text italic">Capturing the <span className="text-cp-accent not-italic">Art.</span></p>
          <p className="text-xs text-cp-text-muted font-body italic leading-relaxed">
            "We are hand-curating our latest gallery of artisan bakes. New photos will appear here shortly as Clare crafts more masterpieces."
          </p>
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-cp-border bg-cp-surface">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8 z-20 space-y-2">
            <div className="flex items-center gap-2">
               <div className="bg-cp-accent p-1 rounded-md shadow-lg">
                  <CroissantIcon className="w-3 h-3 text-white" />
               </div>
               <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/90 drop-shadow-md">
                 Baked by Clare
               </span>
            </div>
            <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tighter drop-shadow-md">
              {currentImage.title}
            </h3>
            {currentImage.caption && (
               <p className="text-xs text-white/70 italic font-body drop-shadow-sm line-clamp-1">
                 {currentImage.caption}
               </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => paginate(-1)}
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-cp-accent hover:border-cp-accent transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => paginate(1)}
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-cp-accent hover:border-cp-accent transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-8 right-8 z-30 flex gap-1">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "w-12 h-1 rounded-full transition-all duration-500",
                  idx === currentIndex ? "bg-cp-accent w-16" : "bg-white/20"
                )}
              />
            ))}
          </div>
        </>
      )}

      {/* Branding Anchor */}
      <div className="absolute top-8 left-8 z-30 p-2 bg-white/10 backdrop-blur-[2px] rounded-2xl border border-white/10 shadow-sm flex items-center gap-3">
         <div className="w-10 h-10 bg-cp-accent rounded-xl flex items-center justify-center text-white shadow-lg">
            <CroissantIcon className="w-6 h-6" />
         </div>
         <div className="pr-4">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">Gallery</p>
            <p className="text-[8px] font-bold text-white/60 uppercase tracking-tighter italic leading-none">Artisanal Choice</p>
         </div>
      </div>
    </div>
  );
}
