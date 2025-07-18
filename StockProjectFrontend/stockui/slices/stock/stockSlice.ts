import { StateCreator } from "zustand";
import { auth } from "../../firebaseConfig"; // Adjust the import path as necessary
import { StockDataDTO } from "./stockDataDTO";

export interface StockSlice {
  symbol: string;
  stockData: StockDataDTO[]; // ✅ Array of StockDataDTO objects
  error: string | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  setSymbol: (symbol: string) => void;
  fetchStockData: (symbol: string) => Promise<void>;
  resetStockData: () => void;
  resetError: () => void;
  resetStatus: () => void;
  resetStockState: () => void;
}

export const createStockSlice: StateCreator<StockSlice, [], [], StockSlice> = (
  set
) => ({
  symbol: "",
  stockData: [], // ✅ initialize as empty array
  error: null,
  status: "idle",
  setSymbol: (symbol: string) => set({ symbol }),
  fetchStockData: async (symbol: string) => {
    set({ status: "pending", error: null });
    try {
      const user = auth.currentUser;
      const token = user ? await user.getIdToken() : null;
      if (!token) {
        throw new Error("User is not authenticated");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/stocks/${symbol}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(
          errorData.message || "Failed to fetch stock data"
        );
        (error as any).status = errorData.status;
        throw error;
      }
      const data: StockDataDTO[] = await response.json();
      set({ stockData: data, status: "succeeded", error: null });
    } catch (error: any) {
      console.error("Fetch error:", error);
      set({
        stockData: [],
        error: error.message || "Unknown error",
        status: "failed",
      });
    }
  },
  resetStockData: () => set({ stockData: [] }),
  resetError: () => set({ error: null }),
  resetStatus: () => set({ status: "idle" }),
  resetStockState: () =>
    set({
      symbol: "",
      stockData: [],
      error: null,
      status: "idle",
    }),
});
