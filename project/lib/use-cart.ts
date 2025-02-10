"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
)

