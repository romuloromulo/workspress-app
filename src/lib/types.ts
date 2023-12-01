import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().describe("Email").email({ message: "E-mail inválido." }),
  password: z.string().describe("Senha").min(6, "Senha é necessária."),
});
