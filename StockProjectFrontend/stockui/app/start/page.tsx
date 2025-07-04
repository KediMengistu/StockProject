// src/app/start/page.tsx
"use client";

import { LoginForm } from "@/app/_components/LoginForm";

export default function StartPage() {
  return (
    <div className="flex flex-row justify-center items-center h-full w-full">
      <LoginForm />
    </div>
  );
}
