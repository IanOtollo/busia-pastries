import React from "react";
import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma/client";

/**
 * Reviews Section
 * Strictly follows the "Zero Mock Data" policy.
 * Only renders if approved reviews exist in the database.
 */

interface ReviewWithUser {
  id: string;
  rating: number;
  body: string;
  isVerified: boolean;
  user: { name: string | null } | null;
}

export async function ReviewsSection() {
  let reviews: ReviewWithUser[] = [];
  
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
  }

  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-bp-bg overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-bp-accent">
              Kind Words
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-bp-text leading-none">
              What Our Customers Say
            </h2>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-8 snap-x no-scrollbar">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="min-w-[320px] md:min-w-[400px] snap-center bg-bp-surface p-8 rounded-2xl border border-bp-border space-y-6"
            >
              <div className="flex gap-1 text-bp-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? "fill-current" : "opacity-30"}`} 
                  />
                ))}
              </div>
              <p className="text-bp-text italic leading-relaxed font-body">
                &quot;{review.body}&quot;
              </p>
              <div className="pt-4 border-t border-bp-border/50 flex items-center justify-between">
                <div>
                  <span className="block font-bold text-sm text-bp-text">{review.user?.name || "Anonymous"}</span>
                  {review.isVerified && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-bp-success">
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
