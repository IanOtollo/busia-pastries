import React from "react";

export function Logo({ className = "w-8 h-8", hideText = false }: { className?: string; hideText?: boolean }) {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className={`${className} text-bp-accent transition-transform duration-500 group-hover:rotate-12`}>
        {/* Wheat Stalk Inspired SVG */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M12 2L8 6M12 2l4 4M12 7l-5 4M12 7l5 4M12 12l-6 5M12 12l6 5" />
          <path d="M12 17l-4 3M12 17l4 3" />
        </svg>
      </div>
      {!hideText && (
        <span className="font-display text-2xl font-bold tracking-tight text-bp-text leading-none pt-1">
          Busia Pastries
        </span>
      )}
    </div>
  );
}
