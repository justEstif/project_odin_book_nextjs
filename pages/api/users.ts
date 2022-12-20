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
     * @access logged in user (current user id)
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
    friends: await getFriendsNameImage(currentUserId),
    sentRequests: await getSentRequestsNameImage(currentUserId),
    receivedRequests: await getReceivedRequestsNameImage(currentUserId),
    others: await getOthersNameImage(currentUserId),
  };
};

const getFriendsNameImage = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
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
    },
  });
};

const getSentRequestsNameImage = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      sentRequests: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
    },
  });
};

const getReceivedRequestsNameImage = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      receivedRequests: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
    },
  });
};

const getOthersNameImage = async (id: string) => {
  return await prisma.user.findMany({
    where: {
      sentRequests: { none: { id } },
      receivedRequests: { none: { id } },
      friendsOf: { none: { id } },
      friends: { none: { id } },
      NOT: { id },
    },
    select: {
      id: true,
      profile: { select: { name: true, image: true } },
    },
  });
};
