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
    <div className="min-h-screen pt-32 pb-24 bg-cp-bg">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <div className="space-y-4">
              <h1 className="font-display text-5xl font-bold text-cp-text uppercase tracking-tight italic">
                 Welcome, <span className="text-cp-accent not-italic">{session.user?.name?.split(' ')[0]}</span>!
              </h1>
              <p className="text-cp-text-muted font-medium italic">
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
                          ? "bg-cp-accent text-cp-cta-text shadow-lg shadow-cp-accent/20 font-bold"
                          : "text-cp-text-muted hover:bg-cp-surface hover:text-cp-text font-medium"
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
                          <h2 className="text-2xl font-bold font-display uppercase tracking-tight italic">Recent <span className="text-cp-accent not-italic">Orders.</span></h2>
                          <span className="text-[10px] font-mono font-bold text-cp-text-muted uppercase tracking-[0.3em]">
                             Live Status
                          </span>
                       </div>
                       
                       {/* Sample Order Mock */}
                       <div className="bg-white border border-cp-border rounded-2xl p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                             <div className="space-y-1">
                                <p className="text-[10px] font-mono font-bold text-cp-text-muted uppercase tracking-[0.2em]">ORDER #CP-87291</p>
                                <p className="text-sm font-medium italic">Placed on Oct 24, 2023</p>
                             </div>
                             <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100 uppercase tracking-wider">
                                DELIVERED
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-4 py-4 border-y border-cp-border">
                             <div className="w-12 h-12 rounded-lg bg-cp-surface flex items-center justify-center text-cp-accent">
                                <Package className="w-6 h-6" />
                             </div>
                             <div className="flex-1">
                                <p className="text-sm font-bold">2× Signature Chocolate Layer Cake</p>
                                <p className="text-xs text-cp-text-muted italic">And 3 other items</p>
                             </div>
                             <p className="font-mono font-bold text-cp-text">
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
                    <div className="bg-white border border-cp-border rounded-3xl p-8 md:p-12 space-y-12 shadow-sm">
                       <h2 className="text-2xl font-bold font-display uppercase tracking-tight italic">Profile <span className="text-cp-accent not-italic">Information.</span></h2>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-cp-text-muted uppercase tracking-[0.2em]">
                                <User className="w-3.5 h-3.5" /> Full Name
                             </div>
                             <p className="text-lg font-bold text-cp-text">{session.user?.name}</p>
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-cp-text-muted uppercase tracking-[0.2em]">
                                <Mail className="w-3.5 h-3.5" /> Email Address
                             </div>
                             <p className="text-lg font-bold text-cp-text">{session.user?.email}</p>
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-cp-text-muted uppercase tracking-[0.2em]">
                                <Phone className="w-3.5 h-3.5" /> Phone Number
                             </div>
                             <p className="text-lg font-bold text-cp-text">0712345678</p>
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-cp-text-muted uppercase tracking-[0.2em]">
                                <Clock className="w-3.5 h-3.5" /> Account Since
                             </div>
                             <p className="text-lg font-bold text-cp-text">October 2023</p>
                          </div>
                       </div>

                       <div className="pt-8 border-t border-cp-border">
                          <Button variant="outline">Update Profile</Button>
                       </div>
                    </div>
                 )}

                 {activeTab === "settings" && (
                    <div className="bg-white border border-cp-border rounded-3xl p-8 md:p-12 space-y-8 shadow-sm">
                       <h2 className="text-2xl font-bold font-display uppercase tracking-tight italic">Account <span className="text-cp-accent not-italic">Settings.</span></h2>
                       <div className="space-y-6">
                          <div className="p-4 bg-cp-surface rounded-2xl border border-cp-border flex items-center justify-between">
                             <div className="space-y-1">
                                <p className="font-bold text-sm text-cp-text">Marketing Emails</p>
                                <p className="text-xs text-cp-text-muted italic">Receive updates about seasonal cakes.</p>
                             </div>
                             <div className="w-12 h-6 rounded-full bg-cp-accent relative">
                                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                             </div>
                          </div>
                          <div className="p-4 bg-cp-surface rounded-2xl border border-cp-border flex items-center justify-between">
                             <div className="space-y-1">
                                <p className="font-bold text-sm text-cp-text">Two-Factor Authentication</p>
                                <p className="text-xs text-cp-text-muted italic">Secure your account with SMS.</p>
                             </div>
                             <div className="w-12 h-6 rounded-full bg-cp-border relative">
                                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm" />
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
