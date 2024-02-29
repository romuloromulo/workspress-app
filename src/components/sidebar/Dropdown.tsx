"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import clsx from "clsx";
import EmojiPicker from "../global/emoji-picker";

import TooltipComponent from "../global/tooltip-component";
import { PlusIcon, Trash } from "lucide-react";
import { File } from "@/lib/supabase/supabase.types";
import { v4 } from "uuid";
import { useToast } from "../ui/use-toast";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { useAppState } from "@/lib/providers/state-providers";
import { updateFolder, createFile, updateFile } from "@/lib/supabase/queries";
import { workspaces } from "@/lib/supabase/schema";

interface DropdownProps {
  title: string;
  id: string;
  listType: "folder" | "file";
  iconId: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  id,
  listType,
  iconId,
  children,
  disabled,
  ...props
}) => {
  const supabase = createClientComponentClient();
  const { user } = useSupabaseUser();
  const { state, dispatch, workspaceId, folderId } = useAppState();
  const [isEditing, setIsEditing] = useState(false);
  // const [hasFiles, setHasFiles] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const folderTitle: string | undefined = useMemo(() => {
    if (listType === "folder") {
      const stateTitle = state.workspaces
        .find((workspace) => workspace.id === workspaceId)
        ?.folders.find((folder) => folder.id === id)?.title;
      if (title === stateTitle || !stateTitle) return title;
      return stateTitle;
    }
  }, [state, listType, workspaceId, id, title]);

  const fileTitle: string | undefined = useMemo(() => {
    if (listType === "file") {
      const fileAndFolderId = id.split("folder");
      const stateTitle = state.workspaces
        .find((workspace) => workspace.id === workspaceId)
        ?.folders.find((folder) => folder.id === fileAndFolderId[0])
        ?.files.find((file) => file.id === fileAndFolderId[1])?.title;
      if (title === stateTitle || !stateTitle) return title;
      return stateTitle;
    }
  }, [state, listType, workspaceId, id, title]);

  const navigatePage = (accordionId: string, type: string) => {
    if (type === "folder") {
      router.push(`/dashboard/${workspaceId}/${accordionId}`);
    }
    if (type === "file") {
      router.push(
        `/dashboard/${workspaceId}/${folderId}/${
          accordionId.split("folder")[1]
        }`
      );
    }
  };
  function folderTitleChange(e: any) {
    if (!workspaceId) return;
    const fId = id.split("folder");
    if (fId.length === 1) {
      dispatch({
        type: "UPDATE_FOLDER",
        payload: {
          folder: {
            title: e.target.value,
          },
          folderId: fId[0],
          workspaceId,
        },
      });
    }
  }

  function fileTitleChange(e: any) {
    if (!workspaceId || !folderId) return;
    const fId = id.split("folder");
    if (fId.length === 2 && fId[1]) {
      dispatch({
        type: "UPDATE_FILE",
        payload: {
          file: { title: e.target.value },
          folderId,
          workspaceId,
          fileId: fId[1],
        },
      });
    }
  }

  const isFolder = listType === "folder";
  const listStyles = useMemo(
    () =>
      clsx("relative", {
        "border-none text-md": isFolder,
        "border-none ml-6 text-[16px] py-1": !isFolder,
      }),
    [isFolder]
  );
  const groupIdentifies = clsx(
    "dark:text-white whitespace-nowrap flex justify-between items-center w-full relative",
    {
      "group/folder": isFolder,
      "group/file": !isFolder,
    }
  );
  async function onChangeEmoji(selectedEmoji: string) {
    if (!workspaceId) return;
    if (listType === "folder") {
      dispatch({
        type: "UPDATE_FOLDER",
        payload: {
          workspaceId,
          folderId: id,
          folder: { iconId: selectedEmoji },
        },
      });
      const { data, error } = await updateFolder({ iconId: selectedEmoji }, id);
      if (error) {
        toast({
          title: `${error}`,
          variant: "destructive",
          description: "O emoji não pode ser atualizado nesta pasta",
        });
      } else {
        toast({
          title: "Sucesso",
          description: "Emoji atualizado!",
        });
      }
    }
  }
  function handleDoubleClick() {
    setIsEditing(true);
  }

  async function handleBlur() {
    if (!isEditing) return;
    setIsEditing(false);
    console.log("IDDROPDOWN", id);
    const fId = id.split("folder");
    console.log("IDSPLIT", fId);
    if (fId?.length === 1) {
      if (!folderTitle) return;
      toast({ title: "Sucesso!", description: "Título da pasta editado." });
      await updateFolder(
        {
          title,
        },
        fId[0]
      );
    }
    if (fId.length === 2 && fId[1]) {
      if (!fileTitle) return;
      const { data, error } = await updateFile({ title: fileTitle }, fId[1]);
      if (error) {
        toast({
          title: `${error}`,
          variant: "destructive",
          description: "O título não pode ser atualizado neste arquivo.",
        });
      }
      toast({ title: "Sucesso!", description: "Título do arquivo editado." });
    }
  }

  const hoverStyles = useMemo(
    () =>
      clsx(
        "h-full hidden rounded-sm absolute right-0 items-center justify-center",
        {
          "group-hover/file:block": listType === "file",
          "group-hover/folder:block": listType === "folder",
        }
      ),
    [isFolder]
  );
  async function addNewFile() {
    if (!workspaceId) return;
    const newFile: File = {
      folderId: id,
      data: null,
      createdAt: new Date().toISOString(),
      inTrash: null,
      title: "Sem título",
      iconId: "📄",
      id: v4(),
      workspaceId,
      bannerUrl: "",
    };

    const { data, error } = await createFile(newFile);

    if (error) {
      toast({
        title: "Erro!",
        variant: "destructive",
        description: "Não foi possível criar arquivo.",
      });
    } else {
      dispatch({
        type: "ADD_FILE",
        payload: { file: newFile, folderId: id, workspaceId },
      });
      toast({
        title: "Successo!",
        description: "Arquivo criado.",
      });
    }
  }

  async function moveToTrash() {
    if (!user?.email || !workspaceId) return;
    const pathId = id.split("folder");
    if (listType === "folder") {
      const { data, error } = await updateFolder(
        {
          inTrash: `Pasta deletada por ${user?.email}`,
        },
        pathId[0]
      );
      if (error) {
        toast({
          title: `${error}`,
          variant: "destructive",
          description: "Pasta não pode ser movida para a lixeira",
        });
      } else {
        dispatch({
          type: "UPDATE_FOLDER",
          payload: {
            folder: { inTrash: `Deletado por ${user?.email}` },
            folderId: pathId[0],
            workspaceId,
          },
        });
        toast({
          title: "Sucesso",
          description: "Pasta movida para lixeira.",
        });
      }
    }
    if (listType === "file") {
      const { data, error } = await updateFile(
        {
          inTrash: `Arquivo deletado por ${user?.email}`,
        },
        pathId[1]
      );
      if (error) {
        toast({
          title: `${error}`,
          variant: "destructive",
          description: "Arquivo não pode ser movido para a lixeira.",
        });
      } else {
        dispatch({
          type: "UPDATE_FILE",
          payload: {
            file: { inTrash: `Deletado por ${user?.email}` },
            fileId: pathId[1],
            folderId: pathId[0],
            workspaceId,
          },
        });
        toast({
          title: "Sucesso",
          description: "Arquivo movido para lixeira.",
        });
      }
    }
  }
  // console.log("DISABLE", disable || listType);

  return (
    <AccordionItem
      value={id}
      className={listStyles}
      onClick={(e) => {
        e.stopPropagation();
        navigatePage(id, listType);
      }}>
      <AccordionTrigger
        id={listType}
        className="hover:no-underline 
        p-2 
        dark:text-muted-foreground 
        text-sm"
        disabled={listType === "file"}>
        <div className={groupIdentifies}>
          <div
            className="flex 
          gap-4 
          items-center 
          justify-center 
          overflow-hidden">
            <div className="relative">
              <EmojiPicker getValue={onChangeEmoji}>{iconId}</EmojiPicker>
            </div>
            <input
              type="text"
              value={listType === "folder" ? folderTitle : fileTitle}
              className={clsx(
                "outline-none overflow-hidden w-[140px] text-Neutrals/neutrals-7",
                {
                  "bg-muted cursor-text": isEditing,
                  "bg-transparent cursor-pointer": !isEditing,
                }
              )}
              readOnly={!isEditing}
              onDoubleClick={handleDoubleClick}
              onBlur={handleBlur}
              onChange={
                listType === "folder" ? folderTitleChange : fileTitleChange
              }
            />
          </div>
          <div className={hoverStyles}>
            <TooltipComponent message="Deletar pasta">
              <Trash
                onClick={moveToTrash}
                size={15}
                className="hover:dark:text-white dark:text-Neutrals/neutrals-7 transition-colors"
              />
            </TooltipComponent>
            {listType === "folder" && !isEditing && (
              <TooltipComponent message="Adicionar arquivo">
                <PlusIcon
                  onClick={addNewFile}
                  size={15}
                  className="hover:dark:text-white dark:text-Neutrals/neutrals-7 transition-colors"
                />
              </TooltipComponent>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {state.workspaces
          .find((workspace) => workspace.id === workspaceId)
          ?.folders.find((folder) => folder.id === id)
          ?.files.filter((file) => !file.inTrash)
          .map((file) => {
            const customFileId = `${id}folder${file.id}`;
            return (
              <Dropdown
                key={file.id}
                title={file.title}
                listType="file"
                id={customFileId}
                iconId={file.iconId}
              />
            );
          })}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Dropdown;
