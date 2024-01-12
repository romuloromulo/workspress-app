import { SubscriptionModalProvider } from "@/lib/providers/subscription-modal-provider";
import db from "@/lib/supabase/db";
import React from "react";
import { products } from "../../../../migrations/schema";

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <SubscriptionModalProvider>{children}</SubscriptionModalProvider>
    </div>
  );
};

export default Layout;
