"use client";
import { useSupabaseUser } from "@/lib/providers/supabase-user.provider";
import { User } from "@/lib/supabase/supabase.types";
import React, { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { getUsersFromSearch } from "@/lib/supabase/queries";

interface CollaboratorSearchProps {
  existingCollaborators: User[] | [];
  getCollaborator: (collaborator: User) => void;
  children: React.ReactNode;
}

const CollaboratorSearch: React.FC<CollaboratorSearchProps> = ({
  existingCollaborators,
  getCollaborator,
  children,
}) => {
  const { user } = useSupabaseUser();
  const [searchResults, setSearchResults] = useState<User[] | []>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (timerRef) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      const res = await getUsersFromSearch(e.target.value);
      console.log("RESPOSTA AQUII", res);
      setSearchResults(res);
    }, 450);
  }

  function addCollaborator(user: User) {
    getCollaborator(user);
  }

  return (
    <Sheet>
      <SheetTrigger className="w-full">{children}</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Procure por colaboladores.</SheetTitle>
          <SheetDescription>
            <p className="text-sm text-muted-foreground">
              Você também pode remover colaboradores após adicioná-los na guia
              de configurações.
            </p>
          </SheetDescription>
        </SheetHeader>
        <div
          className="flex justify-center
          items-center
          gap-2
          mt-2
        ">
          <Search />
          <Input
            name="Email"
            className="dark:bg-background"
            placeholder="Email"
            onChange={onChangeHandler}
          />
        </div>
        <ScrollArea
          className="mt-6
          overflow-y-scroll
          w-full
          rounded-md
        ">
          {searchResults
            .filter(
              (result) =>
                !existingCollaborators.some(
                  (existing) => existing.id === result.id
                )
            )
            .filter((result) => result.id !== user?.id)
            .map((user, index) => (
              <div
                key={user.id}
                className=" p-4 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={`/avatars/${index}.png`} />
                    <AvatarFallback>CP</AvatarFallback>
                  </Avatar>
                  <div
                    className="text-sm 
                gap-2 
                overflow-hidden 
                overflow-ellipsis 
                w-[180px] 
                text-muted-foreground
                ">
                    {user.email}
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => addCollaborator(user)}>
                  Adicionar
                </Button>
              </div>
            ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CollaboratorSearch;
