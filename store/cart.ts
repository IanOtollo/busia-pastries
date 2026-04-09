import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/types/product";

interface CartState {
  items: CartItem[];
  isHydrated: boolean;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (sanityId: string) => void;
  updateQuantity: (sanityId: string, quantity: number) => void;
  clearCart: () => void;
  setHydrated: () => void;

  // Computed
  totalItems: () => number;
  subtotalKes: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.sanityId === newItem.sanityId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.sanityId === newItem.sanityId
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (sanityId) => {
        set((state) => ({
          items: state.items.filter((i) => i.sanityId !== sanityId),
        }));
      },

      updateQuantity: (sanityId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(sanityId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.sanityId === sanityId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      setHydrated: () => set({ isHydrated: true }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotalKes: () =>
        get().items.reduce(
          (sum, item) => sum + item.unitPriceKes * item.quantity,
          0
        ),
    }),
    {
      name: "busia-pastries-cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
      // Only persist items — not computed values
      partialize: (state) => ({ items: state.items }),
    }
  )
);
