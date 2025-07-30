"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ArchitectureImage from "@/public/Stock4U App Architecture.svg";
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
        className="h-full w-full p-2 grid grid-rows-[1fr_1fr] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-2xl overflow-y-auto                   
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <div className="flex items-end justify-center p-1">
          <ol className="bg-white dark:bg-black border-1 border-black p-2 text-[10px] md:text-[12px] dark:text-white text-left list-decimal list-inside max-w-[475px] min-w-[250px] dark:border-stone-700 shadow-[5px_5px_0px_0px_rgba(0,0,0)] italic dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)] ">
            <h1 className="text-lg font-bold text-center underline dark:text-white not-italic mb-0.5">
              Stock4U Architecture Flow
            </h1>
            <li>
              To ensure that the containerized Django app can fetch up-to-date
              stock data, the seperate CRON Job Docker container is tasked with
              retreiving stock data for each symbol at 9am, 12pm, and 3pm Monday
              through Friday from an external stock API.
            </li>
            <li>
              It then stores these up-to-date stock data points in the MariaDB
              database in the MariaDB Docker container, where the database
              ensures a max of 9 data points are maintained for each symbol.
            </li>
            <li>
              NextJS + Zustand client-side app authenticates user, where they
              must provide their google mail account.
            </li>
            <li>
              The user, who is now logged in and has this status of being logged
              in persisted on the client-side via Zustand, makes a request to
              the containerized Django app that exists in the AWS cloud hosting
              environment.
            </li>
            <li>
              Now with the database populated as a result of the CRON job, and
              the user being logged in and authorized to make requests to the
              server, the Django app executes the user request by fetching the
              associated stock data for the user-specified symbol from the
              MariaDB database.
            </li>
          </ol>
        </div>
        <div className="flex items-start justify-center p-1">
          <div className="flex w-fit items-center justify-center dark:bg-white border-1 border-black rounded-2xl p-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] max-w-[475px] dark:border-none dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)]">
            <Image
              src={ArchitectureImage}
              alt="Stock4U App Architecture"
              className="object-contain"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
