"use client";
import { AnimatePresence, motion } from "framer-motion";
export default function ArchitecturePage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"tech-stack-container"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="h-full w-full p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-2xl flex items-center justify-center overflow-y-hidden"
      >
        <div className="flex items-end justify-center p-1">
          <div className="bg-white dark:bg-black border-1 border-black p-2 text-[10px] md:text-[12px] dark:text-white text-left max-w-[475px] min-w-[250px] dark:border-stone-700 shadow-[5px_5px_0px_0px_rgba(0,0,0)] italic dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)]">
            <h1 className="text-lg font-bold text-center underline dark:text-white not-italic mb-0.5">
              Stock4U Tech Stack
            </h1>
            <p>
              Stock4U is built using a modern tech stack to ensure optimal
              performance and user experience. The key technologies used in the
              development of Stock4U include:
            </p>
            <ul className="list-disc list-inside mt-1">
              <li>
                <strong>Frontend:</strong> Next.js, Tailwind, Zustand,
                Shadcn/ui, AccernityUI, Vercel
              </li>
              <li>
                <strong>Backend:</strong> Django, Django REST Framework
              </li>
              <li>
                <strong>Database:</strong> MariaDB
              </li>
              <li>
                <strong>Containerization:</strong> Docker
              </li>
              <li>
                <strong>Cloud Hosting:</strong> AWS
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
