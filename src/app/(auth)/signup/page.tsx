"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import Logo from "../../../../public/cypresslogo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";

const SignUpFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "E-mail inválido" }),
    password: z
      .string()
      .describe("Senha")
      .min(6, "Senha precisa ter no mínimo 6 caractéres."),
    confirmPassword: z
      .string()
      .describe("Confirmar Senha")
      .min(6, "Senha precisa ter no mínimo 6 caractéres."),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Senhas não coincidem!",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "border-red-500/50": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    [codeExchangeError]
  );

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });
  const onSubmit = () => {};
  const signUpHandler = () => {};
  const isLoading = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm-w-[440px] space-y-6 flex flex-col">
        <Link href="/" className="w-full flex justify-center items-center">
          <Image src={Logo} alt="worspress Logo" width={50} height={50} />
          <span className="font-semibold dark:text-white text-4xl first-letter:ml-2 ">
            workspress.
          </span>
        </Link>
        <FormDescription
          className="
      text-foreground/60">
          Uma plataforma completa de colaboração e produtividade
        </FormDescription>
        {!confirmation && !codeExchangeError && (
          <>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirmar Senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full p-6" disabled={isLoading}>
              {!isLoading ? "Criar Conta" : <Loader />}
            </Button>
          </>
        )}

        {submitError && <FormMessage>{submitError}</FormMessage>}
        {/* <Button
          type="submit"
          className="w-full p-6 hover:bg-violet-600 duration-300"
          size="lg"
          disabled={isLoading}>
          {!isLoading ? "Login" : <Loader />}
        </Button> */}
        <span className="self-center">
          Já possui uma conta?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-white duration-300">
            Faça seu login.
          </Link>
        </span>
        {confirmation ||
          (codeExchangeError && (
            <>
              <Alert className={confirmationAndErrorStyles}>
                {!codeExchangeError && <MailCheck className="h-4 w-4" />}
                <AlertTitle>
                  {codeExchangeError ? "Invalid Link" : "Check your email."}
                </AlertTitle>
                <AlertDescription>
                  {codeExchangeError || "An email confirmation has been sent."}
                </AlertDescription>
              </Alert>
            </>
          ))}
      </form>
      Signup
    </Form>
  );
};

export default Signup;
