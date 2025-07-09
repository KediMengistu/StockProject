"use client";
import { use } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
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
        className="h-full w-full p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-2xl flex items-center justify-center"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-58 p-2 bg-white dark:bg-stone-950 border-black dark:border-stone-700 border-1 border-dashed dark:border-solid rounded-2xl">
              <p className="text-xs text-center cursor-default">
                Stock Selected
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Here Lies {slug} Stock Data</p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </AnimatePresence>
  );
}
