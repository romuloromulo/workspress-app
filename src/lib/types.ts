import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().describe("Email").email({ message: "E-mail inválido." }),
  password: z.string().describe("Senha").min(6, "Senha é necessária."),
});

export const CreateWorkspaceFormSchema = z.object({
  workspaceName: z
    .string()
    .describe("Workspace Name")
    .min(1, "Workspace name must be min of 1 character"),
  logo: z.any(),
});
