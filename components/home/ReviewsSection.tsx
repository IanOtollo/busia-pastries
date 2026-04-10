import React from "react";
import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma/client";
import { ReviewCard } from "@/components/product/ReviewCard";
import { Review } from "@/types/product";

/**
 * Reviews Section
 * Strictly follows the "Zero Mock Data" policy.
 * Only renders if approved reviews exist in the database.
 */

export async function ReviewsSection() {
  let reviews: any[] = [];
  
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not found. Skipping reviews fetch.");
      return null;
    }
    
    reviews = await prisma.review.findMany({
      where: { isApproved: true },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    // Silent fail in production to avoid crashing the home page
  }

  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-cp-bg overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-cp-accent">
              Kind Words
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-cp-text leading-tight uppercase italic drop-shadow-sm">
              Authentic <br />
              <span className="text-cp-accent not-italic">Stories.</span>
            </h2>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {reviews.map((review) => (
            <div key={review.id} className="snap-center">
               <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Artisan Background Texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cp-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
    </section>
  );
}
