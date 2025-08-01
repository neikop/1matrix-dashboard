import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type OrderType = "ask" | "bid" | "full"

type OrderbookStorage = {
  orderType: OrderType
  setOrderType: (orderType: OrderType) => void
}

export const useOrderbookStore = create<OrderbookStorage>()(
  persist(
    (set) => ({
      orderType: "full",
      setOrderType: (orderType) => set({ orderType }),
    }),
    {
      name: "orderbook-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
