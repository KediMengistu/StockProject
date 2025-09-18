"use client";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
export default function ArchitecturePage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"purpose-container"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="h-full w-full p-2 flex items-center justify-center overflow-y-hidden focus:outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <Card className="p-4 gap-1 text-[10px] md:text-[12px] max-w-[475px] min-w-[250px] italic">
          <h1 className="text-lg font-bold text-center not-italic underline underline-offset-1 dark:text-white">
            Stock4U - Purpose
          </h1>
          <p className="text-muted-foreground">
            Stock4U is a stock information app that allows users to view stock
            data for a specific symbol, such as AAPL, TSLA, or MSFT. The app is
            designed to be simple, visually appealing, and easy to use, with a
            focus on providing users with the information they need to make
            informed decisions about their investments, where it tracks and
            allows users to view a 72-hour 9-point history of stock prices for
            these symbols. It is made to be available on web browsers on all
            devices. Anyways, I hope you enjoy using it!
          </p>
          <span className="block font-bold not-italic">
            - Kedamawi Mengistu
          </span>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
