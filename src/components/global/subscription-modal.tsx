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
import { Button } from "../ui/button";
import Loader from "./Loader";
import { Price, ProductWirhPrice } from "@/lib/supabase/supabase.types";
import { useToast } from "../ui/use-toast";
import { formatPrice, postData } from "@/lib/utils";
import { getStripe } from "@/lib/stripe/stripeClient";

interface SubscriptionModalProps {
  products: ProductWirhPrice[];
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ products }) => {
  const { open, setOpen } = useSubscriptionModal();
  const { toast } = useToast();
  const { subscription } = useSupabaseUser();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSupabaseUser();
  console.log("SUBSCRIPTION", user);
  console.log("SUBSCRIPTION", subscription);
  const onClickContinue = async (price: Price) => {
    try {
      setIsLoading(true);
      if (!user) {
        toast({ title: "Você precisa estar logado" });
        setIsLoading(false);
        return;
      }
      if (subscription) {
        toast({ title: "Você já esta no plano pro" });
        setIsLoading(false);
        return;
      }

      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      console.log("Getting Checkout for stripe");
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast({ title: "Opa! Alguma coisa deu errado.", variant: "destructive" });
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
          {products.length
            ? products.map((product) => (
                <div
                  className="flex justify-between items-center"
                  key={product.id}>
                  {product.prices?.map((price) => (
                    <React.Fragment key={price.id}>
                      <b className="text-3xl text-foreground">
                        {formatPrice(price)}/ <small>mês</small>
                      </b>
                      <Button
                        disabled={isLoading}
                        onClick={() => onClickContinue(price)}>
                        {isLoading ? <Loader /> : "Assinar ✅"}
                      </Button>
                    </React.Fragment>
                  ))}
                </div>
              ))
            : ""}
        </DialogContent>
      )}
    </Dialog>
  );
};

export default SubscriptionModal;
