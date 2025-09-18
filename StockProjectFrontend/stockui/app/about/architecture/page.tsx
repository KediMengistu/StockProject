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
        className="h-full w-full p-2 grid grid-rows-[1fr] overflow-y-auto scrollbar-hide focus:outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <div className="flex items-center justify-center p-1">
          <Card className="p-4 grid grid-rows-[auto_auto] gap-3 text-[10px] md:text-[12px] max-w-[475px] min-w-[250px] italic overflow-y-auto scrollbar-hide">
            {/* Title + Ordered List */}
            <div>
              <h1 className="text-lg font-bold text-center underline dark:text-white not-italic mb-0.5">
                Stock4U - Architecture{" "}
              </h1>
              <ul className="list-disc list-inside text-[10px] md:text-[12px] text-left">
                <li className="font-bold not-italic text-black dark:text-white">
                  <span className="font-normal italic text-muted-foreground">
                    Data from an external Stock Market API is fetched everyday
                    from Monday to Friday at 9:45 AM, 12:45 PM, and 3:45 PM EST
                    via the CRON Job service that is in a docker container
                    inside of an AWS Elastic Beanstalk environment. The data
                    that is fetched is stored in a seperately located MariaDB
                    database that is hosted on AWS RDS.
                  </span>
                </li>
                <li className="mt-2 font-bold not-italic text-black dark:text-white">
                  <span className="font-normal italic text-muted-foreground">
                    The NextJS frontend application, which is hosted on Vercel,
                    requires users to be logged in via Firebase Authentication
                    to access the stock information. The user can log in using
                    their Google account, which is authenticated by Firebase.
                  </span>
                </li>
                <li className="mt-2 font-bold not-italic text-black dark:text-white">
                  <span className="font-normal italic text-muted-foreground">
                    Now when a logged in user requests stock information for a
                    specific stock, the NextJS frontend application sends a
                    request to the Django container that also exists in the AWS
                    Elastic Beanstalk environment.
                  </span>
                </li>
                <li className="mt-2 font-bold not-italic text-black dark:text-white">
                  <span className="font-normal italic text-muted-foreground">
                    Before actually fetching the data, the Django application
                    must ensure the user is authenticated by Firebase on the
                    backend as well. To incorporate this the Django application,
                    existing as a container in the AWS Elastic Beanstalk
                    environment, is able to carry this out only by being able to
                    access Firebase related secrets stored in AWS Secrets
                    Manager.
                  </span>
                </li>
                <li className="mt-2 font-bold not-italic text-black dark:text-white">
                  <span className="font-normal italic text-muted-foreground">
                    The Django application then queries the MariaDB database for
                    the requested stock information and returns it to the NextJS
                    frontend application for the user to view the data.
                  </span>
                </li>
              </ul>
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
