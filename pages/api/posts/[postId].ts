import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TResponse> = async (req, res) => {
  const {
    method,
    query: { postId, currentUserId },
  } = req;

  switch (method) {
    /**
     * @description get posts, get likes and comments count, get current user like
     * @access any logged in user
     */
    case "GET":
      if (typeof postId === "string" && typeof currentUserId === "string") {
        // TODO: make sure this includes likes count, if current user liked, comments count
        const data = await getPost(postId, currentUserId);
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
export type TResponse = Awaited<ReturnType<typeof getPost>>;

const getPost = async (postId: string, currentUserId: string) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: {
      likes: { where: { id: currentUserId } },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
};
