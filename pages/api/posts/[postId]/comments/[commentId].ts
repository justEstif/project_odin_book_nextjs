import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import { commentSchema } from "@/lib-server/validations/comment";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TGetResponse | TPostResponse> = async (
  req,
  res
) => {
  const {
    method,
    query: { postId, commentId, currentUserId },
    body: { content },
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
        const data = await createChildComment({
          commentId,
          currentUserId,
          postId,
          content,
        });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    // TODO: handle delete commment
    // TODO: handle update commment
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(403).end();
  }
};

export default withValidation(commentSchema, withAuth(handler));

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
  content,
  postId,
}: {
  commentId: string;
  currentUserId: string;
  content: string;
  postId: string;
}) => {
  return await prisma.comment.create({
    data: {
      content: content,
      parentComment: { connect: { id: commentId } },
      user: { connect: { id: currentUserId } },
      post: { connect: { id: postId } },
    },
  });
};
