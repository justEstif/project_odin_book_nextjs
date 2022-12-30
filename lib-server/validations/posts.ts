import { z } from "zod";

export const postsSchema = {
  get: {
    query: z.object({
      currentUserId: z.string(),
      page: z.preprocess(
        (val) => parseInt(z.string().parse(val), 10),
        z.number().positive().min(1)
      ),
    }),
  },
  post: {
    body: z.object({
      content: z.string().min(3),
    }),
  },
  patch: {
    body: z.object({
      content: z.string().min(3).optional(),
    }),
  },
};

export const postIdSchema = {
  get: {
    query: z.object({
      postId: z.string(),
      currentUserId: z.string(),
    }),
  },
  patch: {
    query: z.object({
      postId: z.string(),
      currentUserId: z.string(),
    }),
    body: z.object({
      content: z.string().optional(),
    }),
  },
  delete: {
    query: z.object({
      postId: z.string(),
      currentUserId: z.string(),
    }),
  },
};

export const likesSchema = {
  get: {
    query: z.object({
      postId: z.string(),
      currentUserId: z.string(),
    }),
  },
  post: {
    query: z.object({
      postId: z.string(),
      currentUserId: z.string(),
    }),
  },
};

export const commentsSchema = {
  get: {
    query: z.object({
      postId: z.string(),
      currentUserId: z.string(),
    }),
  },
  post: {
    query: z.object({
      postId: z.string(),
      currentUserId: z.string(),
    }),
    body: z.object({
      content: z.string(),
    }),
  },
};

export const commentsIdSchema = {
  get: {
    query: z.object({
      commentId: z.string(),
    }),
  },
  post: {
    query: z.object({
      commentId: z.string(),
      postId: z.string(),
      currentUserId: z.string(),
    }),
    body: z.object({
      content: z.string().min(3),
    }),
  },
  patch: {
    query: z.object({
      commentId: z.string(),
      currentUserId: z.string(),
    }),
    body: z.object({
      content: z.string().min(3).optional(),
    }),
  },
  delete: {
    query: z.object({
      commentId: z.string(),
      currentUserId: z.string(),
    }),
  },
};
