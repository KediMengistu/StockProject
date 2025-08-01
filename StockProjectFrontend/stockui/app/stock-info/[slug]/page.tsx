"use client";
import { use } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChartAreaPrice } from "@/app/_components/ChartAreaPrice";
import { ChartBarVolume } from "@/app/_components/ChartBarVolume";
import { StockInfoTable } from "@/app/_components/StockInfoTable";
import { StockSupplementaryTable } from "@/app/_components/StockSupplementaryTable";
import { useAppStore } from "@/store/appStore";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
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
        className="h-full w-full p-2 flex items-center justify-center overflow-y-hidden"
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
                  className="w-full h-full grid grid-rows-[1fr] overflow-y-auto scrollbar-hide"
                >
                  <div className="flex items-center justify-center p-1">
                    <Card className="grid grid-rows-[auto_auto] grid-cols-none md:grid-cols-[auto_auto] md:grid-rows-none gap-1 p-2 bg-transparent border-none shadow-none">
                      <Card className="grid grid-rows-[1fr_auto] gap-1 p-2">
                        <Card className="grid grid-rows-2 grid-cols-none md:grid-cols-2 md:grid-rows-none gap-1 p-2 ">
                          <Card className="flex items-center justify-center p-2 ">
                            <ChartAreaPrice />
                          </Card>
                          <Card className="flex items-center justify-center p-2 ">
                            <ChartBarVolume />
                          </Card>
                        </Card>
                        <Card className="md:flex md:items-center md:justify-center p-2">
                          <Card className="max-w-[600px] flex items-center justify-center p-2">
                            <StockSupplementaryTable />
                          </Card>
                        </Card>
                      </Card>
                      <Card className="grid grid-rows-1 p-2">
                        <Card className="grid grid-rows-1 p-2 ">
                          <Card className="grid grid-rows-1 p-2 ">
                            <StockInfoTable />
                          </Card>
                        </Card>
                      </Card>
                    </Card>
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  key={`stock-pending`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  className="w-32"
                >
                  <Card className="w-full flex flex-row items-center justify-center gap-1 p-2 rounded-2xl">
                    <span className="text-[9px]">Pending...</span>
                    <Spinner size={"small"} />
                  </Card>
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
