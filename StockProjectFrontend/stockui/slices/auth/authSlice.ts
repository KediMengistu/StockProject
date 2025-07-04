// app/store/slices/authSlice.ts
import { StateCreator } from "zustand";

export interface AuthSlice {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  loggedIn: false,
  login: () => set({ loggedIn: true }),
  logout: () => set({ loggedIn: false }),
});
