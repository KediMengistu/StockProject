// app/_components/StoreWrapper.tsx
"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useAppStore } from "@/store/appStore";

export default function StoreWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const login = useAppStore((state) => state.login);
  const logout = useAppStore((state) => state.logout);
  const loggedIn = useAppStore((state) => state.loggedIn);
  const symbol = useAppStore((state) => state.symbol);
  const status = useAppStore((state) => state.status);
  const resetStatus = useAppStore((state) => state.resetStatus);
  const resetStockState = useAppStore((state) => state.resetStockState);
  const pathname = usePathname();
  const router = useRouter();
  // ✅ Sync Zustand with Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        login();
      } else {
        logout();
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Handle redirect routing
  useEffect(() => {
    if (loggedIn && pathname.includes("/start")) {
      router.replace("/stock-info");
    } else if (!loggedIn && !pathname.includes("/start")) {
      router.replace("/start");
      resetStockState(); // Reset stock state when logging out
    }
  }, [loggedIn, pathname]);

  useEffect(() => {
    if (status === "succeeded") {
      router.replace(`/stock-info/${symbol}`);
      resetStatus();
    }
  }, [status]);

  useEffect(() => {
    if (
      loggedIn &&
      symbol === "" &&
      pathname.endsWith("/stock-info") === false
    ) {
      // If logged in and no symbol is selected, redirect to stock-info page
      router.replace("/stock-info");
    }
  }, [symbol]);

  return <>{children}</>;
}
