("use client");
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
// import {
//   createFile,
//   updateFile,
//   updateFolder,
// } from "../../lib/supabase/queries";
import TooltipComponent from "../global/tooltip-component";
import { PlusIcon, Trash } from "lucide-react";
import { File } from "@/lib/supabase/supabase.types";
import { v4 } from "uuid";
import { useToast } from "../ui/use-toast";
import { useSupabaseUser } from "@/lib/providers/supabase-user.provider";
import { useAppState } from "@/lib/providers/state-providers";
import { updateFolder } from "@/lib/supabase/queries";

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
  const { toast } = useToast();
  const router = useRouter();

  const navigatePage = (accordionId: string, type: string) => {
    if (type === "folder") {
      router.push(`/dashboarad/${workspaceId}/${accordionId}`);
    }
    if (type === "file") {
    }
  };

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
  const onChangeEmoji = async (selectedEmoji: string) => {
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
  };

  return (
    <AccordionItem
      value={id}
      className={listStyles}
      onClick={(e) => {
        e.stopPropagation();
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
          </div>{" "}
        </div>
      </AccordionTrigger>
    </AccordionItem>
  );
};

export default Dropdown;
