import { AuthUser } from "@supabase/supabase-js";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
interface DashboardSetupProps {
  user: AuthUser;
  subscription: {} | null;
}

export const DashboardSetup: React.FC<DashboardSetupProps> = ({
  subscription,
  user,
}) => {
  return (
    <Card
      className="w-[800px]
  h-screen
  sm:h-auto
">
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Vamos criar um espaço de trabalho privado para começar. Você pode
          adicionar colaboradores posteriormente na guia de configurações do
          espaço de trabalho.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={() => {}}>
          <div className="flex flex-col gap-4">
            <div
              className="flex
            items-center
            gap-4">
              <div className="text-5xl"></div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
