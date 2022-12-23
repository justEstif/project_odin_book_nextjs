import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(3).optional(),
  bio: z.string().min(3).optional(),
  image: z.string().url().optional(),
});

export type TProfileSchema = z.infer<typeof profileSchema>;
