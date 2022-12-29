import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import prisma from "@/lib-server/prisma";
import { postIdSchema } from "@/lib-server/validations/posts";
import type { NextApiHandler } from "next";
import { z } from "zod";

const handler: NextApiHandler<
  TGetResponse | TPatchResponse | TDeleteResponse
> = async (req, res) => {
  const { method, query, body } = req;

  if (method === "GET") {
    const { postId, currentUserId } = query as z.infer<
      typeof postIdSchema["get"]["query"]
    >;
    const data = await getPost({ postId, currentUserId });
    res.status(200).json(data);
  } else if (method === "PATCH") {
    const { postId, currentUserId } = query as z.infer<
      typeof postIdSchema["patch"]["query"]
    >;
    const postBody = body as z.infer<typeof postIdSchema["patch"]["body"]>;
    const data = await updatePost({ currentUserId, postId, postBody });
    res.status(200).json(data);
  } else if (method === "DELETE") {
    const { postId, currentUserId } = query as z.infer<
      typeof postIdSchema["delete"]["query"]
    >;
    const data = await deletePost({ currentUserId, postId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(
  withValidation(
    [
      {
        requestMethod: "GET",
        schema: postIdSchema["get"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "PATCH",
        schema: postIdSchema["patch"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "PATCH",
        schema: postIdSchema["patch"]["body"],
        validationTarget: "body",
      },
      {
        requestMethod: "DELETE",
        schema: postIdSchema["delete"]["query"],
        validationTarget: "query",
      },
    ],
    handler
  )
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
      _count: { select: { comments: true, likes: true } },
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
  postBody: z.infer<typeof postIdSchema["patch"]["body"]>;
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
