"use client";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

export default function TechStackPage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"tech-stack-container"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="h-full w-full p-2 flex items-center justify-center overflow-y-hidden"
      >
        <Card className="p-4 gap-1 text-[10px] md:text-[12px] max-w-[475px] min-w-[250px] italic">
          <h1 className="text-lg font-bold text-center not-italic underline underline-offset-1 dark:text-white mb-1">
            Stock4U - Tech Stack
          </h1>
          <p className="text-muted-foreground">
            Stock4U is built using a modern tech stack to ensure optimal
            performance and user experience. The key technologies used in the
            development of Stock4U include:
          </p>
          <ul className="list-disc list-inside mt-2 text-muted-foreground">
            <li>
              <strong className="text-black dark:text-white">Frontend:</strong>{" "}
              Next.js, Tailwind, Zustand, Shadcn/ui, AccernityUI, Vercel
            </li>
            <li>
              <strong className="text-black dark:text-white">Backend:</strong>{" "}
              Django, Django REST Framework
            </li>
            <li>
              <strong className="text-black dark:text-white">Database:</strong>{" "}
              MariaDB
            </li>
            <li>
              <strong className="text-black dark:text-white">
                Containerization:
              </strong>{" "}
              Docker
            </li>
            <li>
              <strong className="text-black dark:text-white">
                Cloud Hosting:
              </strong>{" "}
              AWS
            </li>
          </ul>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
