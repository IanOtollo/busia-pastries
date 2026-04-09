import { Cake, Truck, Star, Lock } from "lucide-react";

export function TrustBar() {
  const trustItems = [
    { icon: Cake, label: "Baked Fresh Daily" },
    { icon: Truck, label: "Delivered in Busia" },
    { icon: Star, label: "5-Star Reviews" },
    { icon: Lock, label: "Secure Checkout" },
  ];

  return (
    <section className="py-12 bg-[var(--color-bg)] border-y border-[var(--color-border)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-24">
          {trustItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-2.5 rounded-full bg-[var(--color-surface)] text-[var(--color-accent)] border border-[var(--color-border)]">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-[var(--color-text)] tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
