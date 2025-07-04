"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { usePathname } from "next/navigation";

export function NavMenu() {
  const pathname = usePathname();
  return (
    <Menubar className="w-fit">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-xs">
          {pathname.includes("stock-info") ? <>Exit</> : <>Start</>}
        </MenubarTrigger>
        <MenubarContent className="w-[150px]">
          <MenubarItem className="cursor-pointer text-xs">
            {pathname.includes("stock-info") ? (
              <>Sign out</>
            ) : (
              <>Account Setup</>
            )}
          </MenubarItem>
          {pathname.includes("start") ? (
            <MenubarItem className="cursor-pointer text-xs">
              App Preview
            </MenubarItem>
          ) : (
            <></>
          )}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-xs">
          About
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="cursor-pointer text-xs">Purpose</MenubarItem>
          <MenubarItem className="cursor-pointer text-xs">
            Architecture
          </MenubarItem>
          <MenubarItem className="cursor-pointer text-xs">
            Tech Stack
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-xs">
          Contact
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="cursor-pointer text-xs">Linkedin</MenubarItem>
          <MenubarItem className="cursor-pointer text-xs">Resume</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
