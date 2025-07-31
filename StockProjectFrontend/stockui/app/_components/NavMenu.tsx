"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useRouter } from "next/navigation";
import { signOutWithGoogle } from "../../firebase/auth_google_signout";
import { useAppStore } from "@/store/appStore";

export function NavMenu() {
  const loggedIn = useAppStore((state) => state.loggedIn);
  const router = useRouter();

  async function handleSignoutClick() {
    await signOutWithGoogle();
  }

  function handleAccountSetupClick() {
    router.replace("/start");
  }

  function handlePurposeClick() {
    router.replace("/about/purpose");
  }

  function handleArchitectureClick() {
    router.replace("/about/architecture");
  }

  function handleTechStackClick() {
    router.replace("/about/tech-stack");
  }

  return (
    <Menubar className="w-fit">
      {/* Exit / Start */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-[9px]">
          {loggedIn ? "Exit" : "Start"}
        </MenubarTrigger>
        <MenubarContent className="w-[150px]">
          {loggedIn ? (
            <button onClick={handleSignoutClick} className="w-full text-left">
              <MenubarItem className="cursor-pointer text-[9px]">
                Sign out
              </MenubarItem>
            </button>
          ) : (
            <button
              onClick={handleAccountSetupClick}
              className="w-full text-left"
            >
              <MenubarItem className="cursor-pointer text-[9px]">
                Account Setup
              </MenubarItem>
            </button>
          )}
        </MenubarContent>
      </MenubarMenu>

      {/* About — only show when logged out */}
      {!loggedIn && (
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer text-[9px]">
            About
          </MenubarTrigger>
          <MenubarContent>
            <button onClick={handlePurposeClick} className="w-full text-left">
              <MenubarItem className="cursor-pointer text-[9px]">
                Purpose
              </MenubarItem>
            </button>
            <button
              onClick={handleArchitectureClick}
              className="w-full text-left"
            >
              <MenubarItem className="cursor-pointer text-[9px]">
                Architecture
              </MenubarItem>
            </button>
            <button onClick={handleTechStackClick} className="w-full text-left">
              <MenubarItem className="cursor-pointer text-[9px]">
                Tech Stack
              </MenubarItem>
            </button>
          </MenubarContent>
        </MenubarMenu>
      )}

      {/* Contact — only show when logged out */}
      {!loggedIn && (
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer text-[9px]">
            Contact
          </MenubarTrigger>
          <MenubarContent>
            <a
              href="https://www.linkedin.com/in/kedamawi-mengistu-97371a2a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <MenubarItem className="cursor-pointer text-[9px]">
                Linkedin
              </MenubarItem>
            </a>
          </MenubarContent>
        </MenubarMenu>
      )}
    </Menubar>
  );
}
