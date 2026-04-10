import React from "react";
import { StarRating } from "./StarRating";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2 } from "lucide-react";

import { Review } from "@/types/product";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="min-w-[320px] max-w-[400px] bg-cp-surface border border-cp-border rounded-[2.5rem] p-8 space-y-6 shadow-xl shadow-cp-accent/5 hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cp-surface flex items-center justify-center text-cp-accent font-black text-sm shadow-inner">
             {review.user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h4 className="font-bold text-sm text-cp-text italic uppercase tracking-tight">{review.user?.name || "Customer"}.</h4>
            <p className="text-[10px] font-medium text-cp-text-muted font-mono">{new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        {review.isVerified && (
          <Badge variant="accent" className="flex items-center gap-1">
             <CheckCircle2 className="w-2.5 h-2.5" />
             Verified
          </Badge>
        )}
      </div>

      <StarRating rating={review.rating} size="sm" />

      <p className="text-sm text-cp-text leading-relaxed italic font-medium">
        &quot;{review.body}&quot;
      </p>

      <div className="pt-6 border-t border-cp-border flex items-center gap-3">
         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
         <span className="text-[10px] font-black text-cp-text-muted uppercase tracking-[0.2em] italic">Authentic Bite.</span>
      </div>
    </div>
  );
}
