// app/_components/StoreWrapper.tsx
"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useAppStore } from "@/store/appStore";

export default function StoreWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const login = useAppStore((state) => state.login);
  const logout = useAppStore((state) => state.logout);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("📡 onAuthStateChanged:", user);
      if (user) {
        login();
        if (pathname.startsWith("/start")) {
          router.replace("/stock-info");
        }
      } else {
        logout();
        if (pathname.startsWith("/stock-info")) {
          router.replace("/start");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}
