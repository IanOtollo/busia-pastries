import { forwardRef, InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className, id, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    // Determine the actual type of the input
    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
    const isPassword = type === "password";

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-[10px] font-mono font-bold text-cp-text-muted uppercase tracking-widest italic"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-cp-text-muted pointer-events-none group-focus-within:text-cp-accent transition-colors">
              {icon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            type={inputType}
            className={cn(
              "flex h-12 w-full rounded-2xl border border-cp-border bg-cp-surface px-4 py-2 text-sm font-semibold text-cp-text transition-all",
              "shadow-sm shadow-black/5",
              icon && "pl-11",
              isPassword && "pr-12",
              "placeholder:text-cp-text-muted/40 placeholder:italic placeholder:font-normal",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cp-accent/50 focus-visible:ring-offset-1",
              "hover:border-cp-accent/40",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "autofill:bg-cp-surface autofill:text-cp-text",
              error && "border-rose-500 focus-visible:ring-rose-500/50",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 p-1 rounded-lg text-cp-text-muted hover:text-cp-accent hover:bg-cp-accent/5 focus:outline-none transition-all"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-1.5 px-1">
             <AlertCircle className="w-3 h-3 text-rose-500" />
             <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest italic">
               {error}
             </p>
          </div>
        )}
        {!error && helperText && (
          <p className="text-[10px] font-medium text-cp-text-muted italic px-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
