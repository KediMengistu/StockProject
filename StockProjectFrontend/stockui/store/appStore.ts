import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "@/slices/auth/authSlice";

type AppState = AuthSlice;

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
      }),
      {
        name: "app-store",
      }
    )
  )
);
