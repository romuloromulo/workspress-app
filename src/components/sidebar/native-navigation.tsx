import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import CypressHomeIcon from "../icons/cypressHomeIcon";
import CypressSettingsIcon from "../icons/cypressSettingsIcon";
import CypressTrashIcon from "../icons/cypressTrashIcon";
import Trash from "../trash/trash";
import Settings from "../settings/settings";
// import Settings from "../settings/settings";
// import Trash from "../trash/trash";

interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
}

const NativeNavigation: React.FC<NativeNavigationProps> = ({
  myWorkspaceId,
  className,
}) => {
  console.log("WORKSPACEID", myWorkspaceId);
  return (
    <nav className={twMerge("my-2", className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="group/native
            flex
            items-center 
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}`}>
            <CypressHomeIcon />
            <span className="translate-y-[3px]">Minha área de trabalho</span>
          </Link>
        </li>
        <Settings>
          <li
            className="group/native
          flex
          text-Neutrals/neutrals-7
          transition-all
          gap-2
          cursor-pointer
          ">
            <CypressSettingsIcon />
            <span>Configurações</span>
          </li>
        </Settings>

        <Trash>
          <li
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          ">
            <CypressTrashIcon />
            <span>Lixeira</span>
          </li>
        </Trash>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
