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
      }
    ),
    {
      name: "app-store", // 👈 this name shows up in Redux DevTools dropdown
    }
  )
);
