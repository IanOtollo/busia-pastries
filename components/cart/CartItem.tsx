"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { formatPrice } from "@/lib/utils/currency";
import { CartItem as CartItemType } from "@/types/product";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { currency, rate } = useCurrency();

  return (
    <div className="flex items-center gap-4 py-6 border-b border-[var(--color-border)] last:border-0">
      {/* Product Image */}
      <Link 
        href={`/menu/${item.slug}`} 
        className="relative w-24 h-24 rounded-xl overflow-hidden bg-white border border-[var(--color-border)] flex-shrink-0"
      >
        <Image
          src={item.imageUrl || "/placeholder-pastry.jpg"}
          alt={item.productName}
          fill
          className="object-cover"
        />
      </Link>

      {/* Item info */}
      <div className="flex-1 min-w-0 space-y-1">
        <Link href={`/menu/${item.slug}`}>
          <h4 className="font-display text-lg font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors truncate">
            {item.productName}
          </h4>
        </Link>
        <p className="text-sm font-mono text-[var(--color-muted)]">
          {formatPrice(item.unitPriceKes, currency, rate)} / unit
        </p>
      </div>

      {/* Controls and Total */}
      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-3 p-1.5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
          <button
            onClick={() => updateQuantity(item.sanityId, item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.sanityId, item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="font-mono font-bold text-[var(--color-text)]">
            {formatPrice(item.unitPriceKes * item.quantity, currency, rate)}
          </span>
          <button
            onClick={() => removeItem(item.sanityId)}
            className="p-1 text-[var(--color-muted)] hover:text-rose-500 transition-colors"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
