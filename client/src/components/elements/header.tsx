"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const headerContent: { title: string; href: string; description: string }[] = [
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
  {
    title: "Roadmap / Path",
    href: "/path",
    description: "See some optimized path to gradually learn hacking",
  },
  {
    title: "Resources",
    href: "/",
    description: "Complete view of all indexed hacking resources",
  },
  {
    title: "Latest posts",
    href: "/latest",
    description: "See the latest changes made to the library",
  }
];

function Header() {
  return (
    <NavigationMenu className="p-2">
      {headerContent.map((content) => {
        return (
          <NavigationMenuLink
            href={content.href}
            key={content.title}
            className={navigationMenuTriggerStyle()}
          >
            {content.title}
          </NavigationMenuLink>
        );
      })}
    </NavigationMenu>
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
