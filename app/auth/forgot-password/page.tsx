"use client";
import React, { useState } from "react";
import { Mail, ArrowLeft, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for now since we don't have mail service setup yet
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSent(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-cp-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-cp-surface border border-cp-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-cp-accent/5">
          <div className="w-full max-w-md mx-auto space-y-10">
            <div className="text-center space-y-3">
               <Link href="/auth/login" className="inline-flex items-center text-[10px] font-bold text-cp-text-muted uppercase tracking-widest hover:text-cp-accent transition-colors mb-4 group">
                  <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Login
               </Link>
              <h1 className="font-display text-4xl font-bold text-cp-text uppercase tracking-tight italic">
                <span className="text-cp-accent border-b-2 border-cp-accent/20">Reset</span> <span className="text-cp-cta not-italic">Password.</span>
              </h1>
              <p className="text-[10px] font-bold text-cp-text-muted uppercase tracking-[0.2em] italic">
                We'll send you a link to get back into your account.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your-email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                    icon={<Mail className="w-4 h-4" />}
                  />

                  <Button fullWidth size="lg" type="submit" disabled={isLoading || !email} className="h-14 font-black uppercase text-xs tracking-[0.2em] shadow-xl group">
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      <>
                        Send Reset Link
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="bg-cp-success/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cp-success/20">
                    <CheckCircle2 className="w-10 h-10 text-cp-success" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-cp-text italic">Check your inbox.</h3>
                    <p className="text-sm text-cp-text-muted italic leading-relaxed">
                      If an account exists for <span className="text-cp-text font-bold">{email}</span>, you will receive a reset link shortly.
                    </p>
                  </div>
                  <Link href="/auth/login" className="block">
                     <Button variant="outline" fullWidth className="h-14 font-black uppercase text-xs tracking-[0.2em]">
                        Return to Login
                     </Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center pt-8 border-t border-cp-border">
               <p className="text-[10px] text-cp-text-muted font-bold uppercase tracking-widest italic leading-relaxed">
                  Need help? Contact us via{" "}
                  <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} className="text-cp-accent hover:underline not-italic">WhatsApp</a>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
