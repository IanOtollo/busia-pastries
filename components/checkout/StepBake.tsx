"use client";
import React, { useState } from "react";
import { ArrowLeft, Clock, Calendar, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

interface StepBakeProps {
  onNext: (data: Partial<{
    name: string;
    email: string;
    phone: string;
  }>) => void;
  onBack: () => void;
  data: {
    name: string;
    email: string;
    phone: string;
  };
}

export function StepBake({ onNext, onBack, data }: StepBakeProps) {
  const [name, setName] = useState(data.name || "");
  const [email, setEmail] = useState(data.email || "");
  const [phone, setPhone] = useState(data.phone || "");

  const handleNext = () => {
    onNext({ name, email, phone });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--color-muted)]">
          Baker Details
        </h3>
        <p className="text-sm text-[var(--color-text)]">
          Who are we baking for today?
        </p>
      </div>

      <div className="space-y-6">
        <Input
          label="Full Name"
          placeholder="e.g. Robert Aswani"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="robert@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Phone Number"
            placeholder="0712 345 678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="p-6 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center">
             <Clock className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm">Estimated Baking Time</h4>
        </div>
        <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Ordered Today</span>
          <span className="flex items-center gap-1.5 font-bold text-[var(--color-text)]"><Check className="w-3.5 h-3.5 text-emerald-500" /> Guaranteed Fresh</span>
        </div>
      </div>

      <div className="flex gap-4 pt-8 border-t border-[var(--color-border)]">
        <Button variant="ghost" className="flex-1 h-14" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Mix Step
        </Button>
        <Button className="flex-1 h-14 font-bold group" onClick={handleNext}>
          Box It Up
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="text-center">
         <p className="text-[10px] text-[var(--color-muted)]">
            Already have an account? <Link href="/auth/login" className="text-[var(--color-accent)] font-bold hover:underline">Sign in</Link> for faster checkout.
         </p>
      </div>
    </div>
  );
}
