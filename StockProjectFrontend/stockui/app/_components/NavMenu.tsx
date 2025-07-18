"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { usePathname } from "next/navigation";
import { signOutWithGoogle } from "../../firebase/auth_google_signout";

export function NavMenu() {
  const pathname = usePathname();
  async function handleClick() {
    await signOutWithGoogle();
  }
  return (
    <Menubar className="w-fit">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-[9px]">
          {pathname.includes("stock-info") ? <>Exit</> : <>Start</>}
        </MenubarTrigger>
        <MenubarContent className="w-[150px]">
          <MenubarItem className="cursor-pointer text-[9px]">
            {pathname.includes("stock-info") ? (
              <>
                <button className="cursor-pointer" onClick={handleClick}>
                  Sign out
                </button>
              </>
            ) : (
              <>Account Setup</>
            )}
          </MenubarItem>
          {pathname.includes("start") ? (
            <MenubarItem className="cursor-pointer text-[9px]">
              App Preview
            </MenubarItem>
          ) : (
            <></>
          )}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-[9px]">
          About
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="cursor-pointer text-[9px]">
            Purpose
          </MenubarItem>
          <MenubarItem className="cursor-pointer text-[9px]">
            Architecture
          </MenubarItem>
          <MenubarItem className="cursor-pointer text-[9px]">
            Tech Stack
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-[9px]">
          Contact
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="cursor-pointer text-[9px]">
            Linkedin
          </MenubarItem>
          <MenubarItem className="cursor-pointer text-[9px]">
            Resume
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
