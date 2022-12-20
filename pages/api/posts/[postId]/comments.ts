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
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);
export type TResponse = Awaited<ReturnType<typeof getPostComments>>;

// TODO: figure out how to work with parentComment and childComments
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
