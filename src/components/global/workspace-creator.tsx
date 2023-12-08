"use client";
import { useSupabaseUser } from "@/lib/providers/supabase-user.provider";
import { User, workspace } from "@/lib/supabase/supabase.types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, Share } from "lucide-react";
import { Button } from "../ui/button";
import { v4 } from "uuid";
import { toast } from "../ui/use-toast";
import { addCollaborators, createWorkspace } from "@/lib/supabase/queries";

const WorkspaceCreateor = () => {
  const { user } = useSupabaseUser();
  const router = useRouter();

  const [permissions, setPermissions] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function addCollaborator(user: User) {
    setCollaborators([...collaborators, user]);
  }

  function removeCollaborator(user: User) {
    setCollaborators(collaborators.filter((c) => c.id !== user.id));
  }
  async function createItem() {
    const uuid = v4();
    if (user?.id) {
      const newWorkspace: workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: "💼",
        id: uuid,
        inTrash: "",
        title,
        workspaceOwner: user.id,
        logo: null,
        bannerUrl: "",
      };
      if (permissions === "private") {
        toast({ title: "Success", description: "Created the workspace" });
        await createWorkspace(newWorkspace);
        router.refresh();
      }
      if (permissions === "shared") {
        toast({ title: "Success", description: "Created the workspace" });
        await createWorkspace(newWorkspace);
        await addCollaborators(collaborators, uuid);
        router.refresh();
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="flex gap-4 flex-col">
      <div>
        <Label htmlFor="nome" className="text-sm text-muted-foreground">
          Nome
        </Label>
        <div className="flex justify-center items-center gap-2">
          <Input
            name="nome"
            value={title}
            placeholder="Nome da área de trabalho"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <>
        <Label htmlFor="permissões" className="text-sm text-muted-foreground">
          Permições
        </Label>
        <Select
          onValueChange={(val) => {
            setPermissions(val);
          }}
          defaultValue={permissions}>
          <SelectTrigger className="w-full h-26 -mt-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="private">
                <div className="p-2 flex gap-4 justify-center items-center">
                  <Lock />
                  <article className="text-left flex flex-col box-content">
                    <span>Privada</span>
                    <p>
                      Sua área de trabalha é privada e visível apenas a você.
                      <br /> Você pode escolher compartilha-la no futuro.
                    </p>
                  </article>
                </div>
              </SelectItem>
              <SelectItem value="shared">
                <div className="p-2 flex gap-4 justify-center items-center">
                  <Share />
                  <article className="text-left flex flex-col box-content">
                    <span>Compartilhada</span>
                    <p>Você pode convidar colaboradores.</p>
                  </article>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </>
      {permissions === "shared" && <div></div>}
      <Button
        type="button"
        disabled={
          !title || (permissions === "shared" && collaborators.length === 0)
        }
        variant={"secondary"}
        onClick={createItem}>
        Criar{" "}
      </Button>
    </div>
  );
};

export default WorkspaceCreateor;
