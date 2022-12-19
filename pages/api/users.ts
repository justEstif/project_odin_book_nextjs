import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import withAuth from "@/lib-server/middleware/with-auth";

const handler: NextApiHandler<TResponse> = async (req, res) => {
  const {
    method,
    query: { currentUserId },
  } = req;
  switch (method) {
    /**
     * @description get all users name, image and id in relation to the current user
     * @access any logged in user
     */
    case "GET":
      if (currentUserId && typeof currentUserId === "string") {
        const data = await getNameImage(currentUserId);
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
export type TResponse = Awaited<ReturnType<typeof getNameImage>>;

const getNameImage = async (currentUserId: string) => {
  return {
    relatedUsers: await getRelatedUsers(currentUserId),
    unrelatedUsers: await getUnRelatedUsers(currentUserId),
  };
};

const getRelatedUsers = async (currentUserId: string) => {
  return await prisma.user.findUnique({
    where: { id: currentUserId },
    select: {
      friends: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
      friendsOf: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
      sentRequests: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
      receivedRequests: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
    },
  });
};

const getUnRelatedUsers = async (currentUserId: string) => {
  return await prisma.user.findMany({
    where: {
      sentRequests: { none: { id: currentUserId } },
      receivedRequests: { none: { id: currentUserId } },
      friendsOf: { none: { id: currentUserId } },
      friends: { none: { id: currentUserId } },
      NOT: { id: currentUserId },
    },
    select: {
      id: true,
      profile: { select: { name: true, image: true } },
    },
  });
};
