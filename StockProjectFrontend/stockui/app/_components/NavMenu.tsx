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
          {loggedIn ? <>Exit</> : <>Start</>}
        </MenubarTrigger>
        <MenubarContent className="w-[150px]">
          <MenubarItem className="cursor-pointer text-[9px]">
            {loggedIn ? (
              <button className="cursor-pointer" onClick={handleSignoutClick}>
                Sign out
              </button>
            ) : (
              <button
                className="cursor-pointer"
                onClick={handleAccountSetupClick}
              >
                Account Setup
              </button>
            )}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* About — only show when logged out */}
      {!loggedIn && (
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer text-[9px]">
            About
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem className="cursor-pointer text-[9px]">
              <button className="cursor-pointer" onClick={handlePurposeClick}>
                Purpose
              </button>
            </MenubarItem>
            <MenubarItem className="cursor-pointer text-[9px]">
              <button
                className="cursor-pointer"
                onClick={handleArchitectureClick}
              >
                Architecture
              </button>
            </MenubarItem>
            <MenubarItem className="cursor-pointer text-[9px]">
              <button className="cursor-pointer" onClick={handleTechStackClick}>
                Tech Stack
              </button>
            </MenubarItem>
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
