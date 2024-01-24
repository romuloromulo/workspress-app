"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { Button } from "../ui/button";
import { useAppState } from "@/lib/providers/state-providers";

interface LogoutButtonProps {
  children: React.ReactNode;
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children, className }) => {
  const { dispatch } = useAppState();
  const supabase = createClientComponentClient();
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
    dispatch({ type: "SET_WORKSPACES", payload: { workspaces: [] } });
  };
  return (
    <Button variant="ghost" size="icon" className={className} onClick={logout}>
      {children}
    </Button>
  );
};

export default LogoutButton;
