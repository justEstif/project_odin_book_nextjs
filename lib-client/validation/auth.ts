import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type TAuthSchema = z.infer<typeof AuthSchema>;
