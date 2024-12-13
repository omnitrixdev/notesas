"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { CreditCard, DoorClosed, Home, Settings } from "lucide-react";
import { ListRenderer } from "./pattern/ListRenderer";
import { createElement } from "react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const navItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
];

export function UserNav({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage src={image} alt="" />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ListRenderer
            lists={navItems}
            renderItem={({ name, href, icon }) => (
              <DropdownMenuItem asChild>
                <Link
                  href={href}
                  className="flex w-full items-center justify-between"
                >
                  {name}
                  {createElement(icon)}
                </Link>
              </DropdownMenuItem>
            )}
            fallback={<div>No items found</div>}
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex w-full items-center justify-between"
          onClick={() => signOut()}
          asChild
        >
          <h1>
            Logout{" "}
            <span>
              <DoorClosed className="h-4 w-4" />
            </span>
          </h1>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
