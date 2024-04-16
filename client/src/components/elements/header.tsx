"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const headerContentLeft: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Introduction",
    href: "/about",
    description: 'Discover what "The Hacker Library" is and who is behind it',
  },
  {
    title: "Documentation",
    href: "https://github.com/NioZow/thehackerlibrary/wiki",
    description: "Read the documentation",
  },
];

const headerContentCenter: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Roadmaps",
    href: "/roadmaps",
    description:
      "See some optimized path to get started in hacking or learn new topics",
  },
];

const headerContentRight: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Resources",
    href: "/",
    description: "Complete view of all indexed hacking resources",
  },
];

function Header() {
  return (
    <div className="flex">
      <NavigationMenu className="p-2 justify-normal">
        {headerContentLeft.map((content) => {
          return (
            <div title={content.description}>
              <NavigationMenuLink
                href={content.href}
                key={content.title}
                className={`${navigationMenuTriggerStyle()}`}
              >
                {content.title}
              </NavigationMenuLink>
            </div>
          );
        })}
      </NavigationMenu>
      <NavigationMenu className="p-2 justify-center">
        {headerContentCenter.map((content) => {
          return (
            <div title={content.description}>
              <NavigationMenuLink
                href={content.href}
                key={content.title}
                className={`${navigationMenuTriggerStyle()}`}
              >
                {content.title}
              </NavigationMenuLink>
            </div>
          );
        })}
      </NavigationMenu>
      <NavigationMenu className="p-2 justify-end">
        {headerContentRight.map((content) => {
          return (
            <div title={content.description}>
              <NavigationMenuLink
                href={content.href}
                key={content.title}
                className={`${navigationMenuTriggerStyle()}`}
              >
                {content.title}
              </NavigationMenuLink>
            </div>
          );
        })}
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
