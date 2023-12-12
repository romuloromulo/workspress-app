"use client";
import React from "react";
import { useAppState } from "@/lib/providers/state-providers";
import { Folder } from "@/lib/supabase/supabase.types";

interface FoldersDropdownListProps {
  workspaceFolders: Folder[];
  workspaceId: string;
}

const FoldersDropdownList: React.FC<FoldersDropdownListProps> = ({
  workspaceFolders,
  workspaceId,
}) => {
  const { state, dispatch, folderId } = useAppState();

  return <></>;
};

export default FoldersDropdownList;
