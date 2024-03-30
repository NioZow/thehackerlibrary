"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Active Directory",
    href: "/docs/primitives/alert-dialog",
    description: "All trainings about attacking Microsoft's Active Directory",
  },
  {
    title: "Malware Developpment",
    href: "/docs/primitives/hover-card",
    description: "Learn Malware Developpment to enhance your red-team skills",
  },
  {
    title: "Web",
    href: "/docs/primitives/progress",
    description: "All trainings about Web to start your web hacking journey",
  },
  {
    title: "Cloud",
    href: "/docs/primitives/scroll-area",
    description: "All trainings about cloud hacking",
  },
]

function Header() {
  return (
    <NavigationMenu className="p-4">
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Introduction">
                Discover what "The Hacker Library" is and who is behind it
              </ListItem>
              <ListItem href="/docs/installation" title="Documentation">
                Read the documentation
              </ListItem>
              <ListItem href="/docs/installation" title="Roadmap / Path">
                See some optimized path to gradually learn hacking
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>All trainings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
      <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
        Latest changes
      </NavigationMenuLink>
    </NavigationMenu>
  )
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
  )
})
ListItem.displayName = "ListItem"

export default Header