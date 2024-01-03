import React from "react";
import { useAppState } from "../providers/state-providers";
import { File, Folder, workspace } from "@/lib/supabase/supabase.types";

interface DetailsProps {
  dirType: "workspace" | "folder" | "file";
  fileId: string;
  dirDetails: File | Folder | workspace;
}

export const getDetails = ({
  dirType,
  fileId,
  dirDetails,
}: DetailsProps): Partial<workspace | Folder | File> => {
  const { state, workspaceId, folderId, dispatch } = useAppState();
  let selectedDir;

  if (dirType === "file") {
    selectedDir = state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.folders.find((folder) => folder.id === folderId)
      ?.files.find((file) => file.id === fileId);
  }
  if (dirType === "folder") {
    // lógica para "folder"
    selectedDir = state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.folders.find((folder) => folder.id === fileId);
  }
  if (dirType === "workspace") {
    // lógica para "workspace"
    selectedDir = state.workspaces.find((workspace) => workspace.id === fileId);
  }
  if (selectedDir) {
    return selectedDir;
  }
  return {
    title: dirDetails?.title,
    iconId: dirDetails?.iconId,
    createdAt: dirDetails?.createdAt,
    data: dirDetails?.data,
    inTrash: dirDetails?.inTrash,
    bannerUrl: dirDetails?.bannerUrl,
  };
};
