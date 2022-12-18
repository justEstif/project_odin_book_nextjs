import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

type TGetResponse =
  | TGetPostsProfileFriendsCount
  | {
    message: string;
  };

export type TResponse = TGetResponse;
const handler: NextApiHandler<TResponse> = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    /** @access logged in user: not required to be the current user */
    case "GET":
      if (typeof id === "string") {
        const data = await getPostsProfileFriendsCount(id);
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

const getPostsProfileFriendsCount = async (id: string) =>
  await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      posts: true,
      profile: true,
      _count: {
        select: { friends: true },
      },
    },
  });

type TGetPostsProfileFriendsCount = Awaited<
  ReturnType<typeof getPostsProfileFriendsCount>
>;
