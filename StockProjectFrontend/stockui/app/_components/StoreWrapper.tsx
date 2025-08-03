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
  const hasAuthResolved = useAppStore((state) => state.hasAuthResolved);
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
        login(); // sets loggedIn = true and hasAuthResolved = true
      } else {
        logout(); // sets loggedIn = false and hasAuthResolved = true
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!hasAuthResolved) return;
    if (loggedIn) {
      if (pathname.includes("/start") || pathname.includes("/about")) {
        //user has logged in and is on logged out protected pages, so redirect to stock-info page.
        router.replace("/stock-info");
      }
      //currently logged in user has no symbol selected.
      if (symbol === "") {
        //currently logged in user with no symbol is on a symbol page, so redirect to stock-info page.
        if (
          pathname.includes("/stock-info") &&
          !pathname.endsWith("/stock-info")
        ) {
          router.replace("/stock-info");
        }
      }
      //currently logged in user has a symbol selected.
      else {
        //user has recently selected a symbol and the status is succeeded, so redirect to stock-info page for that symbol.
        if (status === "succeeded") {
          router.replace(`/stock-info/${symbol}`);
          resetStatus();
        } else {
          //symbol that is selected has had it's data already fetched and is being displayed, where the status is idle.
          if (status === "idle") {
            //if the user is on a stock-info page that is not the current symbol, redirect to that symbol's page.
            if (
              pathname.includes("/stock-info") &&
              !pathname.endsWith("/stock-info") &&
              !pathname.includes(`/${symbol}`)
            ) {
              router.replace(`/stock-info/${symbol}`);
              resetStatus();
            }
          }
        }
      }
    } else {
      //user is logged out and is on some page that includes stock-info so redirect to start
      if (pathname.includes("/stock-info")) {
        router.replace("/start");
        resetStockState();
      }
    }
  }, [hasAuthResolved, loggedIn, pathname, symbol, status]);

  return <>{children}</>;
}
