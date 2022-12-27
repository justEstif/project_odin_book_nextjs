import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import {
  commentSchema,
  TCommentSchema,
  TUpdateCommentSchema,
  updateCommentSchema,
} from "@/lib-server/validations/comment";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<
  TGetResponse | TPostResponse | TDeleteResponse
> = async (req, res) => {
  const {
    method,
    query: { postId, commentId, currentUserId },
    body,
  } = req;

  switch (method) {
    /**
     * @description get comment using id
     * @access any logged in user
     */
    case "GET":
      if (typeof commentId === "string") {
        const data = await getComment(commentId);
        res.status(200).json(data);
      }
      res.status(403).end();
      break;

    /**
     * @description create a child comment
     * @access any logged in user
     */
    case "POST":
      if (
        typeof commentId === "string" &&
        typeof currentUserId === "string" &&
        typeof postId === "string"
      ) {
        const commentBody = body as TCommentSchema;
        const data = await createChildComment({
          commentId,
          currentUserId,
          postId,
          commentBody,
        });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    /**
     * @description update comment
     * @todo test
     * @todo improve sanitation
     * BUG this route isn't being validated because I don't know how to pass the updateSchema on patch and the create schema on post
     */
    case "PATCH":
      if (typeof commentId == "string" && typeof currentUserId === "string") {
        const commentBody = body as TUpdateCommentSchema;
        const data = await updateComment({
          currentUserId,
          commentId,
          commentBody,
        });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;

    /**
     * @description delete comment
     * @todo test
     */
    case "DELETE":
      if (typeof commentId == "string" && typeof currentUserId === "string") {
        const data = await deleteComment({ currentUserId, commentId });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(403).end();
  }
};

export default withValidation(
  {
    requestMethod: "POST",
    schema: commentSchema,
    validationTarget: "body",
  },
  withValidation(
    {
      requestMethod: "PATCH",
      schema: updateCommentSchema,
      validationTarget: "body",
    },
    withAuth(handler)
  )
);

export type TGetResponse = Awaited<ReturnType<typeof getComment>>;
const getComment = async (commentId: string) => {
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
  commentBody: TCommentSchema;
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
  commentBody: TUpdateCommentSchema;
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
