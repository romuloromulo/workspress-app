"use client";
import { useSubscriptionModal } from "@/lib/providers/subscription-modal-provider";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
// import { formatPrice, postData } from "@/lib/utils";
import { Button } from "../ui/button";
import Loader from "./Loader";
import { Price, ProductWirhPrice } from "@/lib/supabase/supabase.types";
import { useToast } from "../ui/use-toast";
// import { getStripe } from "@/lib/stripe/stripeClient";

interface SubscriptionModalProps {
  // products: ProductWirhPrice[];
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = () => {
  const { open, setOpen } = useSubscriptionModal();
  const { toast } = useToast();
  const { subscription } = useSupabaseUser();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSupabaseUser();

  const onClickContinue = async (price: Price) => {
    try {
      setIsLoading(true);
      if (!user) {
        toast({ title: "You must be logged in" });
        setIsLoading(false);
        return;
      }
      if (subscription) {
        toast({ title: "Already on a paid plan" });
        setIsLoading(false);
        return;
      }
      // const { sessionId } = await postData({
      //   url: "/api/create-checkout-session",
      //   data: { price },
      // });

      console.log("Getting Checkout for stripe");
      // const stripe = await getStripe();
      // stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast({ title: "Oppse! Something went wrong.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {subscription?.status === "active" ? (
        <DialogContent>Você já esta em um plano pago!</DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assine o Plano Pro!</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Para acessar outros recursos você precisa ser assinante do Plano
            Pro.
          </DialogDescription>
          <div className="flex justify-between items-center">
            <>
              <b className="text-3xl text-foreground">
                R$12,90/<small>mês</small>
              </b>
              <Button disabled={isLoading}>
                {isLoading ? <Loader /> : "Assinar ✅"}
              </Button>
            </>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default SubscriptionModal;
