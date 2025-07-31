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

  // // ✅ Protected route redirection (wait for auth to resolve first)
  // useEffect(() => {
  //   if (!hasAuthResolved) return;

  //   if (loggedIn && pathname.includes("/start")) {
  //     router.replace("/stock-info");
  //   } else if (!loggedIn && pathname.includes("/start") == false) {
  //     router.replace("/start");
  //     resetStockState();
  //   }
  // }, [loggedIn, pathname, hasAuthResolved]);

  // useEffect(() => {
  //   if (!hasAuthResolved) return;

  //   if (status === "succeeded") {
  //     router.replace(`/stock-info/${symbol}`);
  //     resetStatus();
  //   }
  // }, [status, hasAuthResolved]);

  // useEffect(() => {
  //   if (!hasAuthResolved) return;

  //   if (
  //     loggedIn &&
  //     symbol === "" &&
  //     pathname.endsWith("/stock-info") === false
  //   ) {
  //     router.replace("/stock-info");
  //   }
  // }, [symbol, loggedIn, pathname, hasAuthResolved]);

  useEffect(() => {
    if (!hasAuthResolved) return;
    if (loggedIn) {
      if (pathname.includes("/start")) {
        //user has logged in and is on start page so redirect to stock info
        //this is where the history stack should be cleared
        router.replace("/stock-info");
      }
      if (symbol === "") {
        if (!pathname.endsWith("/stock-info") && !pathname.includes("/about")) {
          router.replace("/stock-info");
        }
      } else {
        if (status === "succeeded") {
          router.replace(`/stock-info/${symbol}`);
          resetStatus();
        } else {
          if (status === "idle") {
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
      //this is where the history stack should be cleared
      if (pathname.includes("/stock-info")) {
        router.replace("/start");
        resetStockState();
      }
    }
  }, [hasAuthResolved, loggedIn, pathname, symbol, status]);

  return <>{children}</>;
}
