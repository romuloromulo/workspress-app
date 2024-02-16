"use client";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import React, { useEffect, useState } from "react";
import Logo from "../../../public/cypresslogo.svg";
import { animateScroll } from "react-scroll";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@/lib/supabase/supabase.types";
import LogoutButton from "../global/logout-button";
import { LogOut } from "lucide-react";
import ModeToggle from "../global/modeToggle";
import { Menu, X } from "lucide-react";
import { useSubscriptionModal } from "@/lib/providers/subscription-modal-provider";

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
  const [user, setUser] = useState<any>("");
  const [openNav, setOpenNav] = useState<boolean>(false);
  const { setOpen } = useSubscriptionModal();
  const supabaseClient = createClientComponentClient();
  function handleNav() {
    setOpenNav((prev) => !prev);
  }

  useEffect(() => {
    const getUser = async () => {
      const res = await supabaseClient.auth.getUser();
      if (res && res.data.user) {
        const theUser = res.data.user;
        setUser(theUser);
      }
    };
    getUser();
  }, []);

  // console.log("USER AQUIaaa", user);

  const [path, setPath] = useState("#products");
  return (
    <nav>
      <header
        className="p-4
  sm:flex
  justify-center
  items-center
    hidden
  
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
                  "dark:text-white/90": path !== "#recursos",
                  "font-normal": true,
                  "text-xl": true,
                  "text-black": true,
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
                
                text-black
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
                  p-4 no-underline
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
                <ul className="grid w-[400px] gap-3 p-4  dark:text-white text-black md:grid-row-2  ">
                  <li className="cursor-pointer">
                    <ListItem title="Plano Pro" onClick={() => setOpen(true)}>
                      Desbloqueie todas as ferramentas de colaboração.
                    </ListItem>
                  </li>

                  <ListItem title="Plano Gratuito" href={"/signup"}>
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
              <ScrollLink
                to="depoimentos"
                spy={true}
                smooth="easeInOutQuart"
                duration={500}>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), {
                    "dark:text-white": path === "#depoimentos",
                    "dark:text-white/40": path !== "#depoimentos",
                    "font-normal": true,
                    "text-xl": true,
                  })}>
                  Depoimentos
                </NavigationMenuLink>
              </ScrollLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <aside
          className="flex
        w-full
        gap-2
        justify-end
      ">
          <div className="w-auto mr-16">
            <ModeToggle />
          </div>
          {user ? (
            <div className="flex items-center justify-between gap-2">
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      Olá, {user.email.split("@")[0]}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="flex w-full  gap-3 dark:text-white text-black md:grid-row-2  justify-start">
                        <li className="w-full ">
                          <span className="flex w-full">
                            <LogoutButton className="w-full px-2 flex gap-20">
                              Sair <LogOut />
                            </LogoutButton>
                          </span>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link href={"/dashboard"}>
                <Button variant="btn-primary" className="whitespace-nowrap">
                  Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <Link href={"/login"}>
                <div className="py-1 text-lg px-5 dark:text-white hidden sm:block hover:text-gray-700 duration-300 border-x border-gray-200 rounderd-md dark:border-gray-700 hover:text-primary dark:hover:text-primary ml-2">
                  Login
                </div>
              </Link>
              <Link href="/signup">
                <Button variant="btn-primary" className="whitespace-nowrap">
                  Se inscreva
                </Button>
              </Link>
            </div>
          )}
        </aside>
      </header>

      <div
        className="
        sm:hidden 
        fixed 
        z-50 
        bottom-0
        top-0
        w-full
        flex
        justify-between
        items-center
        h-12
        px-2  
        "
        id="MenuMobile">
        <Link
          href={"/"}
          className="flex gap-2
    justify-left items-center">
          <Image src={Logo} alt="Cypress Logo" width={25} height={25} />{" "}
          <span
            className="font-semibold
    dark:text-white
  ">
            workspress.
          </span>
        </Link>
        {user ? (
          <Link href={"/dashboard"}>
            <Button variant="btn-primary" className="whitespace-nowrap">
              Dashboard
            </Button>
          </Link>
        ) : (
          ""
        )}

        <div className={openNav ? "hidden" : ""}>
          <Menu size={32} onClick={handleNav} />
        </div>
      </div>
      <div
        className={
          openNav
            ? "fixed left-0 top-0 w-screen sm:hidden h-2/3 backdrop-blur-lg  p-10 ease-in duration-500 z-50"
            : "fixed left-[-100%] top-0 p-10 ease-out duration-500 z-50"
        }>
        <div
          onClick={handleNav}
          className="cursor-pointer w-full justify-end flex">
          <X size={25} />
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex-col gap-2 items-start justify-start">
            <NavigationMenuItem className="bg-transparent">
              <NavigationMenuTrigger
                onClick={() => setPath("#recursos")}
                className={cn({
                  "dark:text-white": path === "#recursos",
                  "dark:text-white/40": path !== "#recursos",
                  "font-normal": true,
                  "text-xl": true,
                  "text-black": true,
                  "bg-transparent": true,
                })}>
                {" "}
                Recursos
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  className="grid
                gap-3              
                lg:grid-cols-[.75fr_1fr]
                text-black
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
                  p-4 no-underline
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
                  "dark:text-white/90": path !== "#planos",
                  "font-normal": true,
                  "text-xl": true,
                  "bg-transparent": true,
                })}>
                Planos
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4  dark:text-white text-black md:grid-row-2  ">
                  <ListItem title="Plano Pro" onClick={() => setOpenNav(true)}>
                    Desbloqueie todas as ferramentas de colaboração.
                  </ListItem>

                  <ListItem title="Plano Gratuito" href={"/signup"}>
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
              <Link href="#depoimentos" scroll={false}>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), {
                    "dark:text-white": path === "#depoimentos",
                    "dark:text-white/90": path !== "#depoimentos",
                    "font-normal": true,
                    "text-xl": true,
                    "bg-transparent": true,
                  })}>
                  Depoimentos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {user ? (
          <div className="flex-col ">
            <NavigationMenu className="w-full">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onClick={() => {}}
                    className="w-40 flex justify-start">
                    Olá, {user.email?.split("@")[0]}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="flex-col w-full  gap-3 dark:text-white text-black md:grid-row-2  justify-start">
                      <li className="w-full ">
                        <span className="flex w-full">
                          <LogoutButton className="w-full px-2 flex gap-20">
                            Sair <LogOut />
                          </LogoutButton>
                        </span>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        ) : (
          <div className="flex-col items-center w-1/2 justify-start gap-4 ml-2">
            <Link href={"/login"}>
              <div className="text-xl px-4 py-2 dark:text-white hover:text-gray-700 duration-300  border-1 border-gray-400 rounded-md">
                Login
              </div>
            </Link>
            <Link href="/signup">
              <div className="text-xl px-4 py-2 bg-purple-700 rounded-md dark:text-white hover:text-gray-700 duration-300 ">
                Se inscreva
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
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
            "group block select-none space-y-1 font-medium leading-none        bg-gray-300 bg-opacity-25 p-2 rounded-md dark:bg-transparent"
          )}
          {...props}>
          <div className="dark:text-white/80 text-sm font-medium leading-none">
            {title}
          </div>
          <p
            className="dark:group-hover:text-white/70
            line-clamp-2
            text-sm
            leading-snug
           dark:text-white/80
    
          ">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
