import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type ProductStorage = {
  product: null | Product
  setProduct: (product: null | Product) => void
}

export const useProductStore = create<ProductStorage>()(
  persist(
    (set) => ({
      product: null,
      setProduct: (product) => set({ product }),
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
