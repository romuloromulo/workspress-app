"use client";
import { useAppState } from "@/lib/providers/state-providers";
import { File, Folder, workspace } from "@/lib/supabase/supabase.types";
import React, { useCallback, useState } from "react";

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
  const { state, workspaceId, folderId, dispatch } = useAppState();
  const [quill, setQuill] = useState<any>(null);

  const wrapperRef = useCallback((wrapper) => {
    if (typeof window !== "undefined") {
      if (wrapper === null) return;
      wrapper.innerHTML ='';
      const editor = document.createElement('div');
      wrapper.append(Editor)
    }
  }, []);

  return (
    <>
      <div id="container" ref={wrapperRef} className="max-w-[800]"></div>
    </>
  );
};

export default QuillEditor;
