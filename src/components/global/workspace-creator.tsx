"use client";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
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
import { Lock, Plus, Share } from "lucide-react";
import { Button } from "../ui/button";
import { v4 } from "uuid";
import { useToast } from "../ui/use-toast";
import { addCollaborators, createWorkspace } from "@/lib/supabase/queries";
import CollaboratorSearch from "./collaboratorsearch";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const WorkspaceCreateor = () => {
  const { user } = useSupabaseUser();
  const { toast } = useToast();
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
    setIsLoading(true);
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
        toast({ title: "Successo", description: "Área de trabalho criada!" });
        await createWorkspace(newWorkspace);
        console.log("CRIAADA PRIVADA");
        window.location.reload();
      }
      if (permissions === "shared") {
        toast({ title: "Successo", description: "Área de trabalho criada!" });
        await createWorkspace(newWorkspace);
        await addCollaborators(collaborators, uuid);
        console.log("CRIAADA COMPARTILHADA");
        window.location.reload();
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
      {permissions === "shared" && (
        <div>
          <CollaboratorSearch
            existingCollaborators={collaborators}
            getCollaborator={(user) => {
              addCollaborator(user);
            }}>
            <Button type="button" className="text-sm mt-4">
              <Plus />
              Adicione colaborator
            </Button>
          </CollaboratorSearch>
          <div className="mt-4">
            <span className="text-sm text-muted-foreground">
              Colaboradores{collaborators.length || ""}
            </span>
            <ScrollArea
              className="
            h-[120px]
            overflow-y-scroll
            w-full
            rounded-md
            border
            border-muted-foreground/20">
              {collaborators.length ? (
                collaborators.map((c, index) => (
                  <div
                    className="p-4 flex
                      justify-between
                      items-center
                "
                    key={c.id}>
                    <div className="flex gap-4 items-center">
                      <Avatar>
                        <AvatarImage src={`/avatars/${index + 1}.png`} />
                        <AvatarFallback>PJ</AvatarFallback>
                      </Avatar>
                      <div
                        className="text-sm 
                          gap-2
                          text-muted-foreground
                          overflow-hidden
                          overflow-ellipsis
                          sm:w-[300px]
                          w-[140px]
                        ">
                        {c.email}
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => removeCollaborator(c)}>
                      Remover
                    </Button>
                  </div>
                ))
              ) : (
                <div
                  className="absolute
                  right-0 left-0
                  top-0
                  bottom-0
                  flex
                  justify-center
                  items-center
                ">
                  <span className="text-muted-foreground text-sm">
                    Você não possui colaboradores.
                  </span>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      )}
      <Button
        type="button"
        disabled={
          !title ||
          (permissions === "shared" && collaborators.length === 0) ||
          isLoading
        }
        variant={"secondary"}
        onClick={createItem}>
        Criar{" "}
      </Button>
    </div>
  );
};

export default WorkspaceCreateor;
