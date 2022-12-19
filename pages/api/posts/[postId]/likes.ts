import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TResponse> = async (req, res) => {
  const {
    method,
    query: { postId },
  } = req;

  switch (method) {
    /** @access only if current user matches request id */
    case "GET":
      if (typeof postId === "string") {
        const data = await getPostLikes(postId);
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);
export type TResponse = Awaited<ReturnType<typeof getPostLikes>>;

const getPostLikes = async (postId: string) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      likes: {
        select: {
          id: true,
          profile: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
};
