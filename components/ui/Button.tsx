import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-cp-cta text-cp-cta-text",
    "hover:opacity-90 hover:-translate-y-0.5",
    "active:translate-y-0 active:opacity-80",
    "shadow-lg hover:shadow-xl shadow-cp-cta/20",
  ].join(" "),
  secondary: [
    "bg-cp-accent text-cp-cta-text",
    "hover:opacity-90 hover:-translate-y-0.5",
    "shadow-lg hover:shadow-xl shadow-cp-accent/20",
  ].join(" "),
  outline: [
    "border-2 border-cp-cta text-cp-cta",
    "hover:bg-cp-cta hover:text-cp-cta-text hover:-translate-y-0.5",
    "bg-transparent",
  ].join(" "),
  ghost: [
    "text-cp-text bg-transparent",
    "hover:bg-cp-surface hover:text-cp-cta",
  ].join(" "),
  danger: [
    "bg-rose-600 text-white",
    "hover:bg-rose-700 hover:-translate-y-0.5 shadow-lg shadow-rose-200",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[10px] rounded-xl gap-2",
  md: "h-11 px-6 text-xs rounded-2xl gap-2.5",
  lg: "h-14 px-8 text-sm rounded-[1.25rem] gap-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base
          "inline-flex items-center justify-center font-display font-black uppercase tracking-[0.2em] italic",
          "transition-all duration-300 cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cp-accent focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
          // Variant
          variantClasses[variant],
          // Size
          sizeClasses[size],
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
