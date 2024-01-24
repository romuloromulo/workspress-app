"use client";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";

interface MobilerHeaderProps {
  children: React.ReactNode;
}

export const nativeNavigations = [
  {
    title: "Menu",
    id: "sidebar",
    customIcon: Menu,
  },
] as const;

const MobilerHeader: React.FC<MobilerHeaderProps> = ({ children }) => {
  const [selectedNav, setSelectedNav] = useState("");
  console.log("SELECTEDNAV", selectedNav);
  return (
    <>
      {selectedNav === "sidebar" && <>{children}</>}
      <nav
        className="bg-black/10
      backdrop-blur-lg
      sm:hidden 
      fixed 
      z-50 
      bottom-0 
      right-0 
      top-0
      ">
        <ul
          className="flex 
        justify-between 
        items-center 
        p-4">
          {nativeNavigations.map((item) => (
            <li
              className="flex
              items-center
              flex-col
              justify-center
              cursor-pointer
            "
              key={item.id}
              onClick={() => {
                setSelectedNav(item.id);
              }}>
              <item.customIcon></item.customIcon>
              <small
                className={clsx("", {
                  "text-muted-foreground": selectedNav !== item.id,
                })}>
                {item.title}
              </small>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MobilerHeader;
