import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "../slices/auth/authSlice";
import { StockSlice, createStockSlice } from "../slices/stock/stockSlice";

type AppState = AuthSlice & StockSlice;

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createStockSlice(...a),
      }),
      {
        name: "app-store",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => key !== "hasAuthResolved" // ✅ exclude from persistence
            )
          ),
      }
    ),
    {
      name: "app-store", // shows up in Redux DevTools dropdown
    }
  )
);
