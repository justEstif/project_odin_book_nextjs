import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TGetResponse | TPostResponse> = async (
  req,
  res
) => {
  const {
    method,
    query: { postId, currentUserId },
  } = req;

  switch (method) {
    /**
     * @description get likes of a post
     * @access any logged in user
     */
    case "GET":
      if (typeof postId === "string") {
        const data = await getPostLikes({ postId });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    /**
     * @description like or unlike a post
     * @access any logged in user
     */
    case "POST":
      if (typeof postId === "string" && typeof currentUserId === "string") {
        const data = await createLike({ postId, currentUserId });
        res.status(201).json(data);
      }
      res.status(403).end();
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);

export type TGetResponse = Awaited<ReturnType<typeof getPostLikes>>;
const getPostLikes = async ({ postId }: { postId: string }) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      likes: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
          // TODO: add friend status?
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
