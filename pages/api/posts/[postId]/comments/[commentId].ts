import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import { z } from "zod";
import { commentsIdSchema } from "@/lib-server/validations/posts";

const handler: NextApiHandler<
  TGetResponse | TPostResponse | TDeleteResponse
> = async (req, res) => {
  const { method, query, body } = req;

  if (method === "GET") {
    const { commentId } = query as z.infer<
      typeof commentsIdSchema["get"]["query"]
    >;
    const data = await getComment({ commentId });
    res.status(200).json(data);
  } else if (method === "POST") {
    const { commentId, currentUserId, postId } = query as z.infer<
      typeof commentsIdSchema["post"]["query"]
    >;
    const commentBody = body as z.infer<
      typeof commentsIdSchema["post"]["body"]
    >;
    const data = await createChildComment({
      commentId,
      currentUserId,
      postId,
      commentBody,
    });
    res.status(200).json(data);
  } else if (method === "PATCH") {
    const { currentUserId, commentId } = query as z.infer<
      typeof commentsIdSchema["patch"]["query"]
    >;
    const commentBody = body as z.infer<
      typeof commentsIdSchema["patch"]["body"]
    >;
    const data = await updateComment({
      currentUserId,
      commentId,
      commentBody,
    });
    res.status(200).json(data);
  } else if (method === "DELETE") {
    const { currentUserId, commentId } = query as z.infer<
      typeof commentsIdSchema["delete"]["query"]
    >;
    const data = await deleteComment({ currentUserId, commentId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
    res.status(403).end();
  }
};

export default withAuth(
  withValidation(
    [
      {
        requestMethod: "GET",
        schema: commentsIdSchema["get"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "POST",
        schema: commentsIdSchema["post"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "POST",
        schema: commentsIdSchema["post"]["body"],
        validationTarget: "body",
      },
      {
        requestMethod: "PATCH",
        schema: commentsIdSchema["patch"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "PATCH",
        schema: commentsIdSchema["patch"]["body"],
        validationTarget: "body",
      },
      {
        requestMethod: "DELETE",
        schema: commentsIdSchema["delete"]["query"],
        validationTarget: "query",
      },
    ],
    handler
  )
);

export type TGetResponse = Awaited<ReturnType<typeof getComment>>;
const getComment = async ({ commentId }: { commentId: string }) => {
  return await prisma.comment.findUnique({
    where: { id: commentId },
  });
};

export type TPostResponse = Awaited<ReturnType<typeof createChildComment>>;
const createChildComment = async ({
  commentId,
  currentUserId,
  commentBody,
  postId,
}: {
  commentId: string;
  currentUserId: string;
  commentBody: z.infer<typeof commentsIdSchema["post"]["body"]>;
  postId: string;
}) => {
  return await prisma.comment.create({
    data: {
      content: commentBody.content,
      parentComment: { connect: { id: commentId } },
      user: { connect: { id: currentUserId } },
      post: { connect: { id: postId } },
    },
  });
};

export type TPatchResponse = Awaited<ReturnType<typeof updateComment>>;
const updateComment = async ({
  commentId,
  currentUserId,
  commentBody,
}: {
  commentId: string;
  currentUserId: string;
  commentBody: z.infer<typeof commentsIdSchema["patch"]["body"]>;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: {
      comments: {
        update: {
          where: { id: commentId },
          data: {
            ...(commentBody.content && { content: commentBody.content }),
          },
        },
      },
    },
  });
};

export type TDeleteResponse = Awaited<ReturnType<typeof deleteComment>>;
const deleteComment = async ({
  commentId,
  currentUserId,
}: {
  commentId: string;
  currentUserId: string;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: { comments: { delete: { id: commentId } } },
  });
};
