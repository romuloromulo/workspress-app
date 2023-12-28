import { File, Folder, workspace } from "@/lib/supabase/supabase.types";
import React from "react";

interface QuillEditorProps {
  dirType: "workspace" | "folder" | "file";
  fileId: string;
  dirDetails: File | Folder | workspace;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  dirType,
  fileId,
  dirDetails,
}) => {
  return <div></div>;
};

export default QuillEditor;
