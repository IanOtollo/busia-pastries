"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Package, Settings, LogOut, ChevronRight, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/currency";
import { useCurrency } from "@/hooks/useCurrency";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

type TabId = "orders" | "profile" | "settings";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { currency, rate } = useCurrency();
  const [activeTab, setActiveTab] = React.useState<TabId>("orders");

  // Authentication Guard
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin" />
        <p className="font-mono text-sm font-bold text-[var(--color-muted)]">LOADING ACCOUNT...</p>
      </div>
    );
  }

  if (!session) return null;

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--color-bg)]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <div className="space-y-4">
              <h1 className="font-display text-5xl font-bold text-[var(--color-text)]">
                 Welcome, <span className="text-[var(--color-accent)]">{session.user?.name?.split(' ')[0]}</span>!
              </h1>
              <p className="text-[var(--color-muted)] font-medium">
                 Manage your orders, profile, and pastry preferences.
              </p>
           </div>
           
           <Button variant="outline" onClick={() => signOut()} className="h-12 text-rose-500 hover:text-rose-600 hover:bg-rose-50 border-rose-100">
              <LogOut className="mr-2 w-4 h-4" />
              Sign Out
           </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
           {/* Sidebar Tabs */}
           <div className="lg:col-span-1 space-y-2">
              {tabs.map((tab) => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                       "w-full flex items-center justify-between p-4 rounded-xl transition-all",
                       activeTab === tab.id
                          ? "bg-[var(--color-accent)] text-[var(--color-cta-text)] shadow-lg shadow-[var(--color-accent)]/20 font-bold"
                          : "text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] font-medium"
                    )}
                 >
                    <div className="flex items-center gap-3">
                       <tab.icon className="w-5 h-5" />
                       {tab.label}
                    </div>
                    <ChevronRight className={cn("w-4 h-4 opacity-50", activeTab === tab.id ? "opacity-100" : "")} />
                 </button>
              ))}
           </div>

           {/* Content Area */}
           <div className="lg:col-span-3 min-h-[500px]">
              <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.3 }}
              >
                 {activeTab === "orders" && (
                    <div className="space-y-6">
                       <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-bold font-display">Recent Orders</h2>
                          <span className="text-xs font-mono font-bold text-[var(--color-muted)] uppercase tracking-widest">
                             Phase 1: Mock Data
                          </span>
                       </div>
                       
                       {/* Sample Order Mock */}
                       <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                             <div className="space-y-1">
                                <p className="text-xs font-mono font-bold text-[var(--color-muted)] uppercase tracking-widest">ORDER #BP-87291</p>
                                <p className="text-sm font-medium">Placed on Oct 24, 2023</p>
                             </div>
                             <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100 uppercase tracking-wider">
                                DELIVERED
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-4 py-4 border-y border-[var(--color-border)]">
                             <div className="w-12 h-12 rounded-lg bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-accent)]">
                                <Package className="w-6 h-6" />
                             </div>
                             <div className="flex-1">
                                <p className="text-sm font-bold">2× Signature Chocolate Layer Cake</p>
                                <p className="text-xs text-[var(--color-muted)]">And 3 other items</p>
                             </div>
                             <p className="font-mono font-bold">
                                {formatPrice(4500, currency, rate)}
                             </p>
                          </div>

                          <div className="flex justify-end gap-3 font-bold">
                             <Button variant="outline" size="sm">Invoice</Button>
                             <Button size="sm">Track / Reorder</Button>
                          </div>
                       </div>
                    </div>
                 )}

                 {activeTab === "profile" && (
                    <div className="bg-white border border-[var(--color-border)] rounded-3xl p-8 md:p-12 space-y-12 shadow-sm">
                       <h2 className="text-2xl font-bold font-display">Profile Information</h2>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest">
                                <User className="w-3.5 h-3.5" /> Full Name
                             </div>
                             <p className="text-lg font-bold">{session.user?.name}</p>
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest">
                                <Mail className="w-3.5 h-3.5" /> Email Address
                             </div>
                             <p className="text-lg font-bold">{session.user?.email}</p>
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest">
                                <Phone className="w-3.5 h-3.5" /> Phone Number
                             </div>
                             <p className="text-lg font-bold">0712345678</p>
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest">
                                <Clock className="w-3.5 h-3.5" /> Account Since
                             </div>
                             <p className="text-lg font-bold">October 2023</p>
                          </div>
                       </div>

                       <div className="pt-8 border-t border-[var(--color-border)]">
                          <Button variant="outline">Update Profile</Button>
                       </div>
                    </div>
                 )}

                 {activeTab === "settings" && (
                    <div className="bg-white border border-[var(--color-border)] rounded-3xl p-8 md:p-12 space-y-8 shadow-sm">
                       <h2 className="text-2xl font-bold font-display">Account Settings</h2>
                       <div className="space-y-6">
                          <div className="p-4 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] flex items-center justify-between">
                             <div className="space-y-1">
                                <p className="font-bold text-sm">Marketing Emails</p>
                                <p className="text-xs text-[var(--color-muted)]">Receive updates about seasonal cakes.</p>
                             </div>
                             <div className="w-12 h-6 rounded-full bg-[var(--color-accent)] relative">
                                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white" />
                             </div>
                          </div>
                          <div className="p-4 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] flex items-center justify-between">
                             <div className="space-y-1">
                                <p className="font-bold text-sm">Two-Factor Authentication</p>
                                <p className="text-xs text-[var(--color-muted)]">Secure your account with SMS.</p>
                             </div>
                             <div className="w-12 h-6 rounded-full bg-[var(--color-border)] relative">
                                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
                             </div>
                          </div>
                       </div>
                    </div>
                 )}
              </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
}
