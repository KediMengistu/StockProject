"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function NavMenu() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer text-xs">
            Start
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute z-50 min-w-[8rem]">
            <ul className="grid w-full">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className="text-xs block w-full whitespace-nowrap"
                  >
                    Setup Account
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer text-xs">
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute z-50 min-w-[8rem]">
            <ul className="grid w-full">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className="text-xs block w-full whitespace-nowrap"
                  >
                    Purpose
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className="text-xs block w-full whitespace-nowrap"
                  >
                    Architecture
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className="text-xs block w-full whitespace-nowrap"
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
