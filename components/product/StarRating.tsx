import React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showCount?: boolean;
}

export function StarRating({
  rating,
  count,
  size = "sm",
  className,
  showCount = true,
}: StarRatingProps) {
  const iconSize = size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";

  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={cn(iconSize, "fill-[var(--color-accent)] text-[var(--color-accent)]")} />
        ))}
        {hasHalfStar && <StarHalf className={cn(iconSize, "fill-[var(--color-accent)] text-[var(--color-accent)]")} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={cn(iconSize, "text-[var(--color-border)]")} />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-sm font-medium text-[var(--color-muted)]">
          ({count} reviews)
        </span>
      )}
    </div>
  );
}
