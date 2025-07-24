"use client";
import { use } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChartAreaPrice } from "@/app/_components/ChartAreaPrice";
import { ChartBarVolume } from "@/app/_components/ChartBarVolume";
import { StockInfoTable } from "@/app/_components/StockInfoTable";
import { StockSupplementaryTable } from "@/app/_components/StockSupplementaryTable";
import { useAppStore } from "@/store/appStore";
import { Spinner } from "@/components/ui/spinner";
export default function StockSelectedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const symbol = useAppStore((state) => state.symbol);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"stock-selected-container"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="h-full w-full p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-2xl flex items-center justify-center"
      >
        {slug !== "" ? (
          <>
            {symbol === slug ? (
              <>
                <motion.div
                  key={`stock-selected-${slug}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  className="w-full h-full grid grid-cols-none grid-rows-2 md:grid-cols-[1.5fr_1fr] md:grid-rows-1"
                >
                  <div className="flex items-center justify-end pr-1">
                    <div className="h-[339.05px] w-fit grid grid-rows-[1fr_auto]">
                      <div className="grid grid-cols-2 gap-1">
                        <ChartAreaPrice />
                        <ChartBarVolume />
                      </div>
                      <StockSupplementaryTable />
                    </div>
                  </div>
                  <div className="flex items-center justify-start">
                    <StockInfoTable />
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  key={"stock-selected-pending"}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  className="w-32 flex items-center justify-center gap-1 p-2 bg-white dark:bg-stone-950 border-black dark:border-stone-700 border-1 dark:border-solid rounded-2xl shadow-[5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)]"
                >
                  <span className="text-[9px]">Pending...</span>
                  <Spinner size={"small"} />
                </motion.div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
