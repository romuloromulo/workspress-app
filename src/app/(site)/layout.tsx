import Header from "@/components/landing-page/header";
import { SubscriptionModalProvider } from "@/lib/providers/subscription-modal-provider";
import { getActiveProductsWithPrice } from "@/lib/supabase/queries";
import React from "react";

async function HomePageLayout({ children }: { children: React.ReactNode }) {
  const { data: products, error } = await getActiveProductsWithPrice();
  return (
    <main>
      <SubscriptionModalProvider products={products}>
        <Header />
        {children}
      </SubscriptionModalProvider>
    </main>
  );
}

export default HomePageLayout;
