import { z } from "zod";

export const usersSchema = {
  get: {
    query: z.object({
      currentUserId: z.string(),
    }),
  },
};

export const userIdSchema = {
  get: {
    query: z.object({
      userId: z.string(),
      currentUserId: z.string(),
    }),
  },
  delete: {
    query: z
      .object({
        userId: z.string(),
        currentUserId: z.string(),
      })
      .refine((obj) => obj.currentUserId === obj.userId, {
        message: "Unauthorized request",
      }),
  },
};

export const sentRequestsSchema = {
  get: {
    query: z
      .object({
        userId: z.string(),
        currentUserId: z.string(),
        requestId: z.string(),
      })
      .refine((obj) => obj.userId === obj.currentUserId, {
        message: "Unauthorized request",
      }),
  },
};

export const receivedRequestsSchema = {
  get: {
    query: z
      .object({
        userId: z.string(),
        currentUserId: z.string(),
        requestId: z.string(),
      })
      .refine((obj) => obj.userId === obj.currentUserId, {
        message: "Unauthorized request",
      }),
  },
};

export const profileSchema = {
  get: {
    query: z.object({
      userId: z.string(),
    }),
  },
  patch: {
    query: z
      .object({
        userId: z.string(),
        currentUserId: z.string(),
      })
      .refine((obj) => obj.userId === obj.currentUserId, {
        message: "Unauthorized request",
      }),
    body: z.object({
      name: z.string().optional(),
      bio: z.string().optional(),
      image: z.string().url().optional(),
    }),
  },
};

export const postsSchema = {
  get: {
    query: z.object({
      userId: z.string(),
    }),
  },
  post: {
    query: z
      .object({
        userId: z.string(),
        currentUserId: z.string(),
      })
      .refine((obj) => obj.currentUserId === obj.userId, {
        message: "Unauthorized request",
      }),
    body: z.object({
      content: z.string(),
    }),
  },
};

export const likedPostsSchema = {
  get: {
    query: z
      .object({
        userId: z.string(),
        currentUserId: z.string(),
      })
      .refine((obj) => obj.currentUserId === obj.userId, {
        message: "Unauthorized request",
      }),
  },
};

export const friendsSchema = {
  get: {
    query: z.object({
      userId: z.string(),
    }),
  },
};

export const sentRequestsIdSchema = {
  post: {
    query: z
      .object({
        requestId: z.string(),
        userId: z.string(),
        currentUserId: z.string(),
      })
      .refine((obj) => obj.currentUserId === obj.userId, {
        message: "Unauthorized request",
      }),
  },
  delete: {
    query: z
      .object({
        requestId: z.string(),
        userId: z.string(),
        currentUserId: z.string(),
      })
      .refine((obj) => obj.currentUserId === obj.userId, {
        message: "Unauthorized request",
      }),
  },
};

export const receivedRequestsIdSchema = {
  post: {
    query: z
      .object({
        requestId: z.string(),
        userId: z.string(),
        currentUserId: z.string(),
      })
      .refine((obj) => obj.currentUserId === obj.userId, {
        message: "Unauthorized request",
      }),
  },
  delete: {
    query: z
      .object({
        requestId: z.string(),
        userId: z.string(),
        currentUserId: z.string(),
      })
      .refine((obj) => obj.currentUserId === obj.userId, {
        message: "Unauthorized request",
      }),
  },
};

export const friendsIdSchema = {
  get: {
    query: z
      .object({
        friendId: z.string(),
        userId: z.string(),
        currentUserId: z.string(),
      })
      .refine((obj) => obj.currentUserId === obj.userId, {
        message: "Unauthorized request",
      }),
  },
  delete: {
    query: z
      .object({
        friendId: z.string(),
        userId: z.string(),
        currentUserId: z.string(),
      })
      .refine((obj) => obj.currentUserId === obj.userId, {
        message: "Unauthorized request",
      }),
  },
};
