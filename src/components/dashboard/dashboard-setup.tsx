"use client";
import { AuthUser } from "@supabase/supabase-js";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import EmojiPicker from "../global/emoji-picker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Subscription, workspace } from "@/lib/supabase/supabase.types";
import { Button } from "../ui/button";
import Loader from "../global/Loader";
import { createWorkspace } from "@/lib/supabase/queries";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useAppState } from "../../lib/providers/state-providers";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CreateWorkspaceFormSchema } from "@/lib/types";
import { z } from "zod";
import { useSubscriptionModal } from "@/lib/providers/subscription-modal-provider";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: Subscription | null;
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
  subscription,
  user,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { dispatch } = useAppState();
  const [selectedEmoji, setSelectedEmoji] = useState("💼");
  const supabase = createClientComponentClient();
  // const { subscription } = useSubscriptionModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: "onChange",
    defaultValues: {
      logo: "",
      workspaceName: "",
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof CreateWorkspaceFormSchema>
  > = async (value) => {
    const file = value.logo?.[0];
    let filePath = null;
    const workspaceUUID = v4();
    console.log("FILE FILE FILE", file);

    if (file) {
      try {
        console.log(file, "FILE AQUI");
        const { data, error } = await supabase.storage
          .from("workspace-logos")
          .upload(`workspaceLogo.${workspaceUUID}`, file, {
            cacheControl: "3600",
            upsert: true,
          });
        if (error) throw new Error(`${error}`);
        filePath = data.path;
      } catch (error) {
        console.log("Error", error);
        toast({
          variant: "destructive",
          title: "Error! Could not upload your workspace logo",
        });
      }
    }
    try {
      const newWorkspace: workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: selectedEmoji,
        id: workspaceUUID,
        inTrash: "",
        title: value.workspaceName,
        workspaceOwner: user.id,
        logo: filePath || null,
        bannerUrl: "",
      };
      const { data, error: createError } = await createWorkspace(newWorkspace);
      if (createError) {
        throw new Error();
      }
      dispatch({
        type: "ADD_WORKSPACE",
        payload: { ...newWorkspace, folders: [] },
      });

      toast({
        title: "Workspace Created",
        description: `${newWorkspace.title} has been created successfully.`,
      });

      router.replace(`/dashboard/${newWorkspace.id}`);
    } catch (error) {
      console.log(error, "Error");
      toast({
        variant: "destructive",
        title: "Could not create your workspace",
        description:
          "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
      });
    } finally {
      reset();
    }
  };

  return (
    <Card
      className="w-[800px]
      h-screen
      sm:h-auto
  ">
      <CardHeader>
        <CardTitle>Criar área de trabalho</CardTitle>
        <CardDescription>
          Vamos criar uma área de trabalho privada para você começar. Você pode
          adicionar colaboradores posteriormente na guia de configurações do
          espaço de trabalho.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div
              className="flex
            items-center
            gap-4">
              <div className="text-5xl">
                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className="w-full ">
                <Label
                  htmlFor="workspaceName"
                  className="text-sm
                  text-muted-foreground
                ">
                  Nome
                </Label>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="Nome da área de trabalho"
                  disabled={isLoading}
                  {...register("workspaceName", {
                    required: "Nome da área de trabalho é obrigatório",
                  })}
                />
                <small className="text-red-600">
                  {errors?.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>
            <div>
              <Label
                htmlFor="logo"
                className="text-sm
                  text-muted-foreground
                ">
                Logo da área de trabalho
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                placeholder="Nome da área de trabalho"
                disabled={isLoading || subscription?.status !== "active"}
                {...register("logo", {
                  required: false,
                })}
              />
              <small className="text-red-600">
                {errors?.logo?.message?.toString()}
              </small>
              {subscription?.status !== "active" && (
                <small
                  className="
                  text-muted-foreground
                  block
              ">
                  Para customizar sua área de trabalho é necessario ser
                  assinante do Plano Pro
                </small>
              )}
            </div>
            <div className="self-end">
              <Button disabled={isLoading} type="submit">
                {!isLoading ? "Create Workspace" : <Loader />}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
