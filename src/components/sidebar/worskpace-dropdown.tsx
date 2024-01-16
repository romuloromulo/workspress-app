"use client";
import { useAppState } from "@/lib/providers/state-providers";

import { workspace } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";
import SelectedWorkspace from "./selected-workspace";
import CustomDialogTrigger from "../global/custom-dialog-trigger";
import WorkspaceCreateor from "../global/workspace-creator";

interface WorkspaceDropdownProps {
  privateWorkspaces: workspace[] | [];
  sharedWorkspaces: workspace[] | [];
  collaboratingWorkspaces: workspace[] | [];
  defaultValue: workspace | undefined;
}

const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({
  privateWorkspaces,
  sharedWorkspaces,
  collaboratingWorkspaces,
  defaultValue,
}) => {
  const { dispatch, state } = useAppState();
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({ ...workspace, folders: [] })),
        },
      });
    }
  }, [
    privateWorkspaces,
    sharedWorkspaces,
    collaboratingWorkspaces,
    dispatch,
    state.workspaces.length,
  ]);

  useEffect(() => {
    const findSelectedWorkspace = state.workspaces.find(
      (workspace) => workspace.id === defaultValue?.id
    );
    // console.log("findSelectedWorkspace", findSelectedWorkspace);
    if (findSelectedWorkspace) setSelectedOption(findSelectedWorkspace);
  }, [state, defaultValue]);

  const handleSelect = (option: workspace) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <span onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? (
            <SelectedWorkspace workspace={selectedOption}></SelectedWorkspace>
          ) : (
            "Selecione uma área de trabalho"
          )}
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute w-full rounded-md shadow-md z-50 h-[190px] bg-black/10 backdrop-blur-lg group overflow-scroll border-[1px] border-muted">
          <div className="rounded-md flex flex-col">
            <div className="!p-2">
              {!!privateWorkspaces.length && (
                <>
                  <p className="text-muted-foreground">Privada</p>
                  <hr></hr>
                  {privateWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              )}
              {!!sharedWorkspaces.length && (
                <>
                  <p className="text-muted-foreground">Compartilhada</p>
                  <hr></hr>
                  {sharedWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              )}
              {!!collaboratingWorkspaces.length && (
                <>
                  <p className="text-muted-foreground">Collaborating</p>
                  <hr />
                  {collaboratingWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}{" "}
                </>
              )}
              <CustomDialogTrigger
                header="Criar uma área de trabalho"
                content={<WorkspaceCreateor />}
                description="Áreas de trabalho dão a você poder para colaborar com outras pessoas. Você pode mudar as configurações de privacidade da sua área de trabalho mesmo após já ter a criado">
                <div
                  className="flex 
              transition-all 
              hover:bg-muted 
              justify-center 
              items-center 
              gap-2 
              p-2 
              w-full">
                  <article
                    className="text-slate-500 
                rounded-full
                 bg-slate-800 
                 w-4 
                 h-4 
                 flex 
                 items-center 
                 justify-center">
                    +
                  </article>
                  Criar área de trabalho
                </div>
              </CustomDialogTrigger>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropdown;
