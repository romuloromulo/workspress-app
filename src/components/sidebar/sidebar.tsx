import { getFolders, getUserSubscriptionStatus } from "@/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface SidebarProps {
  params: { worksplaceId: string };
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = async ({ params, className }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  const { data: worksplaceFolderData, error: foldersError } = await getFolders(
    params.worksplaceId
  );

  if (subscriptionError || foldersError) redirect("/dashboard");

  return <div>Sidebar</div>;
};

export default Sidebar;
