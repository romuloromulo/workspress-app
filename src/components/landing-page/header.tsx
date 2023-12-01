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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const routes = [
  { title: "Ferramentas", href: "#ferramentas" },
  { title: "Recursos", href: "#recursos" },
  { title: "Planos", href: "#planos" },
  { title: "Depoimentos", href: "#depoimentos" },
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alerta de Diálogo",
    href: "#",
    description:
      "Um diálogo modal que interrompe o usuário com conteúdo importante e espera por uma resposta.",
  },
  {
    title: "Cartão de Destaque",
    href: "#",
    description:
      "Para usuários com visão para visualizar o conteúdo disponível por trás de um link.",
  },
  {
    title: "Progresso",
    href: "#",
    description:
      "Exibe um indicador mostrando o progresso de conclusão de uma tarefa, geralmente exibido como uma barra de progresso.",
  },
  {
    title: "Área de Rolagem",
    href: "#",
    description: "Separa visual ou semanticamente o conteúdo.",
  },
  {
    title: "Abas",
    href: "#",
    description:
      "Um conjunto de seções de conteúdo em camadas, conhecidas como painéis de abas, que são exibidos um de cada vez.",
  },
  {
    title: "Dica de Ferramenta",
    href: "#",
    description:
      "Uma janela pop-up que exibe informações relacionadas a um elemento quando o elemento recebe o foco do teclado ou o mouse paira sobre ele.",
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
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4  md:grid-row-2  ">
                <ListItem title="Plano Pro" href={"#"}>
                  Desbloqueie todo o poder com colaboração.
                </ListItem>
                <ListItem title="Plano Gratuito" href={"#"}>
                  Ótimo para equipes que estão começando.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuContent>
              <ul
                className="grid w-[400px]
              gap-3
              p-4
              md:w-[500px]
              md:grid-cols-2 
              lg:w-[600px]
              ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#">
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), {
                  "dark:text-white": path === "#depoimentos",
                  "dark:text-white/40": path !== "#depoimentos",
                  "font-normal": true,
                  "text-xl": true,
                })}>
                Testimonial
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <aside
        className="flex
        w-full
        gap-2
        justify-end
      ">
        <Link href={"/login"}>
          <Button variant="btn-secondary" className=" p-1 hidden sm:block">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="btn-primary" className="whitespace-nowrap">
            Sign Up
          </Button>
        </Link>
      </aside>
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
