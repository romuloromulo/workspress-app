import { getFolders, getUserSubscriptionStatus } from "@/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface SidebarProps {
  params: { workspace: string };
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = async ({ params, className }) => {
  const supabase = createServerComponentClient({ cookies });
  //user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  //subscr
  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  //folders
  console.log("PARAMS", params.workspace);
  const { data: workspaceFolderData, error: foldersError } = await getFolders(
    params.workspace
  );
  //error
  console.log("FOLDER:", foldersError, "SUBS", subscriptionError);
  if (subscriptionError || foldersError) redirect("/dashboard");

  return <div>Sidebar</div>;
};

export default Sidebar;
