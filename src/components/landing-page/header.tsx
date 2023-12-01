"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../../public/cypresslogo.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const routes = [
  { title: "Ferramentas", href: "#ferramentas" },
  { title: "Recursos", href: "#recursos" },
  { title: "Planos", href: "#planos" },
  { title: "Depoimentos", href: "#depoimentos" },
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function Header() {
  const [path, setPath] = useState("#products");
  return (
    <header
      className="p-4
  flex
  justify-center
  items-center
">
      <Link
        href={"/"}
        className="w-full flex gap-2
    justify-left items-center">
        <Image src={Logo} alt="Cypress Logo" width={25} height={25} />{" "}
        <span
          className="font-semibold
    dark:text-white
  ">
          workspress.
        </span>
      </Link>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#recursos")}
              className={cn({
                "dark:text-white": path === "#recursos",
                "dar:text-white/40": path !== "#recursos",
                "font-normal": true,
                "text-xl": true,
              })}>
              {" "}
              Recursos
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                className="grid
                gap-3
                p-6
                md:w-[400px]
                ld:w-[500px]
                lg:grid-cols-[.75fr_1fr]
                ">
                <li className="row-span-3">
                  <span
                    className="flex h-full w-full select-none
                  flex-col
                  justify-end
                  rounded-md
                  bg-gradient-to-b
                  from-muted/50
                  to-muted
                  p-6 no-underline
                  outline-none
                  focus:shadow-md
                  ">
                    Bem-vindo(a)
                  </span>
                </li>
                <ListItem href="#" title="Introdução">
                  Componentes reutilizáveis construídos usando Radix UI e
                  Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Instalação">
                  Como instalar dependências e estruturar seu aplicativo.
                </ListItem>
                <ListItem href="#" title="Tipografia">
                  Estilos para títulos, parágrafos, listas...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#planos")}
              className={cn({
                "dark:text-white": path === "#planos",
                "dark:text-white/40": path !== "#planos",
                "font-normal": true,
                "text-xl": true,
              })}>
              Planos
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

export default Header;

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
            "group block select-none space-y-1 font-medium leading-none"
          )}
          {...props}>
          <div className="text-white text-sm font-medium leading-none">
            {title}
          </div>
          <p
            className="group-hover:text-white/70
            line-clamp-2
            text-sm
            leading-snug
            text-white/40
          ">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
