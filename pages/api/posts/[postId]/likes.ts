import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import prisma from "@/lib-server/prisma";
import { likesSchema } from "@/lib-server/validations/posts";
import type { NextApiHandler } from "next";
import { z } from "zod";

const handler: NextApiHandler<TGetResponse | TPostResponse> = async (
  req,
  res
) => {
  const { method, query } = req;
  if (method === "GET") {
    const { currentUserId, postId } = query as z.infer<
      typeof likesSchema["get"]["query"]
    >;
    const data = await createLike({ postId, currentUserId });
    res.status(200).json(data);
  } else if (method === "POST") {
    const { postId, currentUserId } = query as z.infer<
      typeof likesSchema["post"]["query"]
    >;
    const data = await createLike({ postId, currentUserId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(
  [
    {
      schema: likesSchema["get"]["query"],
      requestMethod: "GET",
      validationTarget: "query",
    },
    {
      schema: likesSchema["post"]["query"],
      requestMethod: "POST",
      validationTarget: "query",
    },
  ],
  withAuth(handler)
);

export type TGetResponse = Awaited<ReturnType<typeof getPostLikes>>;
const getPostLikes = async ({ postId }: { postId: string }) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    select: {
      likes: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
    },
  });
};

export type TPostResponse = Awaited<ReturnType<typeof createLike>>;
const createLike = async ({
  postId,
  currentUserId,
}: {
  postId: string;
  currentUserId: string;
}) => {
  const like = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      likes: {
        where: { id: currentUserId },
        select: { id: true },
      },
    },
  });

  if (like) {
    if (like.likes.some((el) => el.id === currentUserId)) {
      return await prisma.post.update({
        where: { id: postId },
        data: { likes: { disconnect: { id: currentUserId } } },
      });
    } else {
      return await prisma.post.update({
        where: { id: postId },
        data: { likes: { connect: { id: currentUserId } } },
      });
    }
  }
};
