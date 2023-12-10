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
import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface CollaboratorSearchProps {
  existingCollaborator: User[] | [];
  getCollaborator: (collaborator: User) => void;
  children: React.ReactNode;
}

const CollaboratorSearch: React.FC<CollaboratorSearchProps> = ({
  existingCollaborator,
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

  function onChangeHandler() {}

  function addCollaborator() {}

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
            name="name"
            className="dark:bg-background"
            placeholder="Email"
            onChange={onChangeHandler}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CollaboratorSearch;
