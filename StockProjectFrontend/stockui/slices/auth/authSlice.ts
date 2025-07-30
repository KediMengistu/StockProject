import { StateCreator } from "zustand";

export interface AuthSlice {
  loggedIn: boolean;
  hasAuthResolved: boolean;
  login: () => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  loggedIn: false,
  hasAuthResolved: false,
  login: () => set({ loggedIn: true, hasAuthResolved: true }),
  logout: () => set({ loggedIn: false, hasAuthResolved: true }),
});
