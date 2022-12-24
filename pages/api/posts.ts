import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const {
    method,
    query: { currentUserId },
  } = req;

  switch (method) {
    /**
     * @description get posts of friends of current user
     * @access any logged in user
     */
    case "GET":
      if (typeof currentUserId === "string") {
        const data = await getPosts(currentUserId);
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

export type TGetResponse = Awaited<ReturnType<typeof getPosts>>;
const getPosts = async (currentUserId: string) => {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      OR: [
        { user: { friends: { some: { id: currentUserId } } } },
        { user: { friendsOf: { some: { id: currentUserId } } } },
      ],
    },
    include: {
      user: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
    },
  });
};
