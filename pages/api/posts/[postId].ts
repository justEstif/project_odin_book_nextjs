import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import prisma from "@/lib-server/prisma";
import {
  TUpdatePostSchema,
  updatePostSchema,
} from "@/lib-server/validations/post";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<
  TGetResponse | TPatchResponse | TDeleteResponse
> = async (req, res) => {
  const {
    method,
    query: { postId, currentUserId },
    body,
  } = req;

  switch (method) {
    /**
     * @description get posts, get likes and comments count, get current user like
     * @access any logged in user
     */
    case "GET":
      if (typeof postId === "string" && typeof currentUserId === "string") {
        const data = await getPost({ postId, currentUserId });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;

    /**
     * @description update post
     * @todo test
     */
    case "PATCH":
      if (typeof postId === "string" && typeof currentUserId === "string") {
        const postBody = body as TUpdatePostSchema;
        const data = await updatePost({ currentUserId, postId, postBody });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;

    /**
     * @description delete post
     * @todo test
     */
    case "DELETE":
      if (typeof postId === "string" && typeof currentUserId === "string") {
        const data = await deletePost({ currentUserId, postId });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;

    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(
  {
    requestMethod: "PATCH",
    schema: updatePostSchema,
    validationTarget: "body",
  },
  withAuth(handler)
);

export type TGetResponse = Awaited<ReturnType<typeof getPost>>;
const getPost = async ({
  postId,
  currentUserId,
}: {
  postId: string;
  currentUserId: string;
}) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: {
      likes: {
        where: { id: currentUserId },
        select: { id: true },
      },
      _count: {
        select: { comments: true, likes: true },
      },
    },
  });
};

export type TPatchResponse = Awaited<ReturnType<typeof updatePost>>;
const updatePost = async ({
  postId,
  currentUserId,
  postBody,
}: {
  postId: string;
  currentUserId: string;
  postBody: TUpdatePostSchema;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: {
      posts: {
        update: {
          where: { id: postId },
          data: { ...(postBody.content && { content: postBody.content }) },
        },
      },
    },
  });
};

export type TDeleteResponse = Awaited<ReturnType<typeof deletePost>>;
const deletePost = async ({
  postId,
  currentUserId,
}: {
  postId: string;
  currentUserId: string;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: { posts: { delete: { id: postId } } },
  });
};
