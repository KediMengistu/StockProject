// app/home/page.tsx (StockHomePage)
"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "../../store/appStore";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";

export default function StockHomePage() {
  const symbol = useAppStore((state) => state.symbol);
  const status = useAppStore((state) => state.status);
  const error = useAppStore((state) => state.error);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"stock-home"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="h-full w-full p-2 flex items-center justify-center"
      >
        {status !== "failed" ? (
          <>
            {status === "pending" ||
            status === "succeeded" ||
            (status === "idle" && symbol !== "") ? (
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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card className="w-full flex flex-row items-center justify-center gap-1 p-2 rounded-2xl">
                        <span className="text-[9px]">Pending...</span>
                        <Spinner size={"small"} />
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="w-48 flex flex-row items-center justify-center">
                        <p className="text-center">
                          If stuck on pending, deselect stock and return to
                          Home.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  key={"stock-home-default"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card className="w-48 p-2 rounded-2xl ">
                        <p className="text-xs text-center cursor-default">
                          Stock4U Dashboard
                        </p>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="w-48 flex flex-row items-center justify-center">
                        <p className="text-center">
                          Choose Stock in Navbar to View Data. For Latest Data,
                          refresh App @9:45am, 12:45pm, and 3:45pm EST.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              </>
            )}
          </>
        ) : (
          <>
            <motion.div
              key={"stock-home-error"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="w-48 p-2 rounded-2xl">
                <p className="text-xs text-center cursor-default">{error}</p>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
