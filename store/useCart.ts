import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  sanityId: string;
  productName: string;
  unitPriceKes: number;
  quantity: number;
  imageUrl?: string;
  slug: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (sanityId: string) => void;
  updateQuantity: (sanityId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find((i) => i.sanityId === newItem.sanityId);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.sanityId === newItem.sanityId
                ? { ...i, quantity: i.quantity + newItem.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (sanityId) => {
        set({ items: get().items.filter((i) => i.sanityId !== sanityId) });
      },

      updateQuantity: (sanityId, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((i) =>
            i.sanityId === sanityId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (acc, item) => acc + item.unitPriceKes * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "bp-cart-storage",
    }
  )
);
