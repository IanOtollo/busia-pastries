"use client";
import { useCartStore } from "@/store/cart";
import { CartItem } from "@/types/product";

export function useCart() {
  const items = useCartStore((s) => s.items);
  const isHydrated = useCartStore((s) => s.isHydrated);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const subtotalKes = useCartStore((s) => s.subtotalKes);

  return {
    items,
    isHydrated,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: totalItems(),
    subtotalKes: subtotalKes(),
  };
}
