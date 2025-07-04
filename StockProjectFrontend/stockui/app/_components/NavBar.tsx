"use client";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "./ModeToggle";
import { NavMenu } from "./NavMenu";
import { ComboBox } from "./ComboBox";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();
  return (
    <Card className="sticky z-10 top-0 left-0 w-full h-fit flex flex-row justify-between p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:bg-stone-950 rounded-none">
      <div className="flex flex-row gap-1">
        <NavMenu />
        {pathname.includes("stock-info") ? (
          <>
            <ComboBox />
          </>
        ) : (
          <></>
        )}
      </div>

      <ModeToggle />
    </Card>
  );
}
