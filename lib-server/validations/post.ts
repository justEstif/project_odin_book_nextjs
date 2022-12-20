import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(3),
});

export type TPostSchema = z.infer<typeof postSchema>;
