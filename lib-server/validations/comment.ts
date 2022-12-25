import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(3),
});

export type TCommentSchema = z.infer<typeof commentSchema>;

export const updateCommentSchema = z.object({
  content: z.string().min(3),
});

export type TUpdateCommentSchema = z.infer<typeof updateCommentSchema>;
