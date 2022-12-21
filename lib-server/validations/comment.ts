import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(3),
});

export type TCommentSchema = z.infer<typeof commentSchema>;
