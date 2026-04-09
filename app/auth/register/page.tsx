import React from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[var(--color-surface)]">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50">
          <AuthForm mode="register" />
        </div>
      </div>
    </div>
  );
}
