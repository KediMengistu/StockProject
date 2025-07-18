"use client";
import { use } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
export default function StockSelectedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"stock-selected"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="h-full w-full flex items-center justify-center overflow-y-hidden"
      >
        <div
          className="h-full w-full max-w-[1912px] grid grid-rows-[1fr_auto] grid-cols-none md:grid-cols-[1fr_auto] md:grid-rows-none p-2 gap-1 overflow-y-auto 
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <Card className="min-h-[250px] bg-transparent border-1 border-dashed border-stone-500"></Card>
          <Card className="w-full h-[250px] md:h-full md:w-[350px] bg-transparent border-1 border-dashed border-stone-500"></Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
