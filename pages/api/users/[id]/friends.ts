import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import withAuth from "@/lib-server/middleware/with-auth";

type TGetResponse = TGetFriends | { message: string };
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
        const friends = await getFriends(id);
        res.status(200).json(friends);
      }
      res.status(403).end();
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);

const getFriends = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: { friends: true },
  });
};

type TGetFriends = Awaited<ReturnType<typeof getFriends>>;
