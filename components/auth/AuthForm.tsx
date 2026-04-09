"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error || "Registration failed");
        }
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        throw new Error("Invalid credentials or account locked. Please try again.");
      }

      router.push("/account");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="font-display text-4xl font-bold text-[var(--color-text)]">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-[var(--color-muted)]">
          {mode === "login" 
            ? "Fresh pastries and rewards are waiting." 
            : "Join our community for faster checkout and exclusive offers."}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-rose-800 text-sm animate-shake">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === "register" && (
          <div className="space-y-5 animate-slide-up">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="pl-10"
              icon={<User className="w-4 h-4" />}
            />
            <Input
              label="Phone Number"
              placeholder="0712345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="pl-10"
              icon={<Phone className="w-4 h-4" />}
            />
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="pl-10"
          icon={<Mail className="w-4 h-4" />}
        />

        <div className="space-y-1">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="pl-10"
            icon={<Lock className="w-4 h-4" />}
          />
          {mode === "login" && (
             <div className="flex justify-end">
                <Link href="/auth/forgot-password" className="text-xs font-bold text-[var(--color-accent)] hover:underline">
                   Forgot Password?
                </Link>
             </div>
          )}
        </div>

        <Button fullWidth size="lg" type="submit" disabled={isLoading} className="h-14 font-bold text-lg group">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            <>
              {mode === "login" ? "Sign In" : "Register Now"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-[var(--color-muted)] font-medium">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link 
            href={mode === "login" ? "/auth/register" : "/auth/login"}
            className="text-[var(--color-accent)] font-bold hover:underline"
          >
            {mode === "login" ? "Create one here" : "Sign in instead"}
          </Link>
        </p>
      </div>

      {mode === "login" && (
        <div className="pt-8 border-t border-[var(--color-border)]">
           <p className="text-center text-xs text-[var(--color-muted)] font-bold uppercase tracking-[0.2em] mb-4">Or Continue Guest</p>
           <Link href="/checkout">
              <Button fullWidth variant="outline" className="h-12 border-dashed">
                 Checkout as Guest
              </Button>
           </Link>
        </div>
      )}
    </div>
  );
}
