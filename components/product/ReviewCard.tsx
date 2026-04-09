import React from "react";
import { StarRating } from "./StarRating";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2 } from "lucide-react";

interface ReviewCardProps {
  review: {
    userName: string;
    rating: number;
    date: string;
    body: string;
    verified: boolean;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="min-w-[320px] max-w-[400px] bg-white border border-[var(--color-border)] rounded-3xl p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-accent)] font-bold text-sm">
             {review.userName?.charAt(0) || "U"}
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--color-text)]">{review.userName || "Customer"}</h4>
            <p className="text-[10px] text-[var(--color-muted)]">{review.date}</p>
          </div>
        </div>
        {review.verified && (
          <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-100 flex items-center gap-1">
             <CheckCircle2 className="w-2.5 h-2.5" />
             Verified
          </Badge>
        )}
      </div>

      <StarRating rating={review.rating} size="sm" />

      <p className="text-sm text-[var(--color-text)] leading-relaxed italic">
        &quot;{review.body}&quot;
      </p>

      <div className="pt-4 border-t border-[var(--color-border)] flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-emerald-500" />
         <span className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider">Verified Purchase</span>
      </div>
    </div>
  );
}
