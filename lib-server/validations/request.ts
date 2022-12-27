import { z } from "zod";

export const requestQuerySchema = z
  .object({
    userId: z.string(),
    currentUserId: z.string(),
    requestId: z.string(),
  })
  .refine((obj) => obj.userId === obj.currentUserId, {
    message: "Unauthorized request",
  });

export type TRequestQuerySchema = z.infer<typeof requestQuerySchema>;
