"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ArchitectureImage from "@/public/Stock4U App Architecture.svg";
import { Card } from "@/components/ui/card";

export default function ArchitecturePage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"architecture-container"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="h-full w-full p-2 grid grid-rows-[1fr] overflow-y-auto scrollbar-hide"
      >
        <div className="flex items-center justify-center p-1">
          <Card className="p-4 grid grid-rows-[auto_auto] gap-3 text-[10px] md:text-[12px] max-w-[475px] min-w-[250px] italic overflow-y-auto scrollbar-hide">
            {/* Title + Ordered List */}
            <div>
              <h1 className="text-lg font-bold text-center underline dark:text-white not-italic mb-0.5">
                Stock4U - Architecture Flow
              </h1>
              <ol className="text-[10px] md:text-[12px] text-left list-decimal list-inside">
                <li className="font-bold not-italic text-black dark:text-white">
                  <span className="font-normal italic text-muted-foreground">
                    To ensure that the containerized Django app can fetch
                    up-to-date stock data, the separate CRON Job Docker
                    container is tasked with retrieving stock data for each
                    symbol at 9am, 12pm, and 3pm Monday through Friday from an
                    external stock API.
                  </span>
                </li>
                <li className="mt-2 font-bold not-italic text-black dark:text-white">
                  <span className="font-normal italic text-muted-foreground">
                    It then stores these stock data points in the MariaDB
                    database in the MariaDB Docker container, where the database
                    ensures a max of 9 data points are maintained for each
                    symbol.
                  </span>
                </li>
                <li className="mt-2 font-bold not-italic text-black dark:text-white">
                  <span className="font-normal italic text-muted-foreground">
                    NextJS + Zustand client-side app authenticates user, where
                    they must provide their Google account.
                  </span>
                </li>
                <li className="mt-2 font-bold not-italic text-black dark:text-white">
                  <span className="font-normal italic text-muted-foreground">
                    The user, who is now logged in and has this status of being
                    logged in persisted on the client-side via Zustand, makes a
                    request to the containerized Django app that exists in the
                    AWS cloud hosting environment.
                  </span>
                </li>
                <li className="mt-2 font-bold not-italic text-black dark:text-white">
                  <span className="font-normal italic text-muted-foreground">
                    Now with the database populated as a result of the CRON job,
                    and the user being logged in and authorized to make requests
                    to the server, the Django app executes the user request by
                    fetching the associated stock data for the user-specified
                    symbol from the MariaDB database.
                  </span>
                </li>
              </ol>
            </div>
            {/* Image */}
            <div className="flex items-center justify-center">
              <Card className="flex w-fit items-center justify-center dark:bg-white rounded-2xl p-2 max-w-fit">
                <Image
                  src={ArchitectureImage}
                  alt="Stock4U App Architecture"
                  className="object-contain"
                />
              </Card>
            </div>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
