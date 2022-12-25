import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(3).optional(),
  bio: z.string().min(3).optional(),
  image: z.string().url().optional(),
});

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;
