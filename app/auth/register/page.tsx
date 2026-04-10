import React from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-cp-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-cp-surface border border-cp-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-cp-accent/5">
          <AuthForm mode="register" />
        </div>
      </div>
    </div>
  );
}
