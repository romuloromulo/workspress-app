import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";
import { useAppState } from "../providers/state-providers";
import { useRouter } from "next/navigation";

const useSupabaseRealTime = () => {
  const supabase = createClientComponentClient();
  const { dispatch, state, workspaceId: selectedWorkspace } = useAppState();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase.channel("db.changes").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "files",
      },
      async (payload) => {
        if (payload.eventType === "INSERT") {
          console.log("🟢EVENTO EM TEMPO REAL RECEBIDO");
        }
      }
    );
  }, [supabase]);

  return <div>useSupabaseRealTime</div>;
};

export default useSupabaseRealTime;
