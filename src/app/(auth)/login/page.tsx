"use client";
import Logo from "../../../../public/cypresslogo.svg";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { actionLoginUser } from "@/lib/server-actions/auth-actions";

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    }
    router.replace("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col">
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
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6 hover:bg-violet-600 duration-300"
          size="lg"
          disabled={isLoading}>
          {!isLoading ? "Login" : <Loader />}
        </Button>
        <span className="self-center">
          Não possui uma conta?{" "}
          <Link
            href="/signup"
            className="text-primary hover:text-white duration-300">
            Se inscreva!
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginPage;
