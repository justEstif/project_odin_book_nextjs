import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email(),
});

export type TAuthSchema = z.infer<typeof AuthSchema>;
