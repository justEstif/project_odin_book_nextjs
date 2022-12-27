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
    query: { postId, currentUserId },
    body: { content },
  } = req;

  switch (method) {
    /**
     * @description get comments of a post
     * @access any logged in user
     */
    case "GET":
      if (typeof postId === "string" && typeof currentUserId === "string") {
        const data = await getPostComments(postId);
        res.status(200).json(data);
      }
      res.status(403).end();
      break;

    /**
     * @description create comment to a post
     * @access any logged in user
     */
    case "POST":
      if (typeof postId === "string" && typeof currentUserId === "string") {
        const data = await createComment({ postId, currentUserId, content });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(
  [
    {
      requestMethod: "POST",
      schema: commentSchema,
      validationTarget: "body",
    },
  ],
  withAuth(handler)
);

export type TGetResponse = Awaited<ReturnType<typeof getPostComments>>;
const getPostComments = async (postId: string) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      comments: {
        include: {
          parentComment: { select: { id: true } },
          childComments: { select: { id: true } },
        },
      },
    },
  });
};

export type TPostResponse = Awaited<ReturnType<typeof createComment>>;
const createComment = async ({
  postId,
  currentUserId,
  content,
}: {
  postId: string;
  currentUserId: string;
  content: string;
}) => {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      comments: {
        create: {
          content: content,
          user: { connect: { id: currentUserId } },
        },
      },
    },
  });
};
