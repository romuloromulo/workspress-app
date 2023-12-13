"use client";
import React, { useEffect, useState } from "react";
import { useAppState } from "@/lib/providers/state-providers";
import { Folder } from "@/lib/supabase/supabase.types";

import { Accordion } from "../ui/accordion";
import TooltipComponent from "../global/tooltip-component";
import { PlusIcon } from "lucide-react";
import { useSupabaseUser } from "@/lib/providers/supabase-user.provider";
import { v4 } from "uuid";
import { createFolder } from "@/lib/supabase/queries";
import { useToast } from "../ui/use-toast";
import Dropdown from "./Dropdown";

interface FoldersDropdownListProps {
  workspaceFolders: Folder[];
  workspaceId: string;
}

const FoldersDropdownList: React.FC<FoldersDropdownListProps> = ({
  workspaceFolders,
  workspaceId,
}) => {
  const { state, dispatch, folderId } = useAppState();
  const [folders, setFolders] = useState(workspaceFolders);
  const { toast } = useToast();
  const { subscription } = useSupabaseUser();

  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: "SET_FOLDERS",
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      });
    }
  }, [workspaceFolders, workspaceId]);

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || []
    );
  }, [state, workspaceId]);

  async function addFolderHandler() {
    if (folders.length >= 3 && !subscription) {
    }
    const newFolder: Folder = {
      data: null,
      id: v4(),
      createdAt: new Date().toISOString(),
      title: "Untitled",
      iconId: "📄",
      inTrash: null,
      workspaceId,
      bannerUrl: "",
    };
    dispatch({
      type: "ADD_FOLDER",
      payload: { workspaceId, folder: { ...newFolder, files: [] } },
    });
    const { data, error } = await createFolder(newFolder);
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Não foi posível criar a pasta",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Pasta criada",
      });
    }
  }
  console.log("FOLDER AQUI", folders);

  return (
    <>
      <div
        className="flex
        sticky 
        z-20 
        top-0 
        bg-background 
        w-full  
        h-10 
        group/title 
        justify-between 
        items-center 
        pr-4 
        text-Neutrals/neutrals-8
  ">
        <span
          className="text-Neutrals-8 
        font-bold 
        text-xs">
          FOLDERS
        </span>
        <TooltipComponent message="Criar pasta">
          <PlusIcon
            onClick={addFolderHandler}
            size={16}
            className="group-hover/title:inline-block
            hidden 
            cursor-pointer
            hover:dark:text-white
          "
          />
        </TooltipComponent>
      </div>
      <Accordion
        type="multiple"
        defaultValue={[folderId || ""]}
        className="pb-20">
        {folders
          .filter((folder) => !folder.inTrash)
          .map((folder) => (
            <Dropdown
              key={folder.id}
              title={folder.title}
              listType="folder"
              id={folder.id}
              iconId={folder.iconId}
            />
          ))}
      </Accordion>
    </>
  );
};

export default FoldersDropdownList;
