import Header from "@/components/landing-page/header";
import MobilerHeader from "@/components/landing-page/mobile-header";
import { SubscriptionModalProvider } from "@/lib/providers/subscription-modal-provider";
import { getActiveProductsWithPrice } from "@/lib/supabase/queries";
import React from "react";

async function HomePageLayout({ children }: { children: React.ReactNode }) {
  const { data: products, error } = await getActiveProductsWithPrice();
  return (
    <main>
      <Header />
      <SubscriptionModalProvider products={products}>
        {children}
      </SubscriptionModalProvider>
    </main>
  );
}

export default HomePageLayout;
