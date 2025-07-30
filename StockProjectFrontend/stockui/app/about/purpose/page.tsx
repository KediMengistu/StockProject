"use client";
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
        className="h-full w-full p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-2xl flex items-center justify-center overflow-y-hidden"
      >
        <div className="flex items-end justify-center p-1">
          <div className="bg-white dark:bg-black border-1 border-black p-2 text-[10px] md:text-[12px] dark:text-white text-left max-w-[475px] min-w-[250px] dark:border-stone-700 shadow-[5px_5px_0px_0px_rgba(0,0,0)] italic dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)] ">
            <h1 className="text-lg font-bold text-center underline dark:text-white not-italic mb-0.5">
              Stock4U Purpose
            </h1>
            Stock4U is a stock information app that allows users to view stock
            data for a specific symbol, such as AAPL, TSLA, or MSFT. The app is
            designed to be simple, visually appealing, and easy to use, with a
            focus on providing users with the information they need to make
            informed decisions about their investments, where it tracks and
            allows users to view a 72-hour 9-point history of stock prices for
            these symbols. It is made to be available on web browsers on all
            devices. Anyways, I hope you enjoy using it!
            <span className="block mt-1 font-bold"> - Kedamawi Mengistu</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
