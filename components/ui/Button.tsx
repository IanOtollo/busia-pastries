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
    "bg-[var(--color-cta)] text-[var(--color-cta-text)]",
    "hover:opacity-90 hover:-translate-y-0.5",
    "active:translate-y-0 active:opacity-80",
    "shadow-sm hover:shadow-md",
  ].join(" "),
  secondary: [
    "bg-[var(--color-accent)] text-[var(--color-cta-text)]",
    "hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5",
  ].join(" "),
  outline: [
    "border border-[var(--color-cta)] text-[var(--color-cta)]",
    "hover:bg-[var(--color-cta)] hover:text-[var(--color-cta-text)] hover:-translate-y-0.5",
    "bg-transparent",
  ].join(" "),
  ghost: [
    "text-[var(--color-text)] bg-transparent",
    "hover:bg-[var(--color-surface)] hover:text-[var(--color-cta)]",
  ].join(" "),
  danger: [
    "bg-red-600 text-white",
    "hover:bg-red-700 hover:-translate-y-0.5",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-md gap-1.5",
  md: "h-10 px-5 text-sm rounded-lg gap-2",
  lg: "h-12 px-7 text-base rounded-xl gap-2.5",
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
          "inline-flex items-center justify-center font-body font-medium",
          "transition-all duration-200 cursor-pointer select-none",
          "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
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
