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

const getFriendsNameImage = async (currentUserId: string) => {
  return await prisma.profile.findMany({
    where: {
      OR: [
        { user: { friends: { some: { id: currentUserId } } } },
        { user: { friendsOf: { some: { id: currentUserId } } } },
      ],
    },
    select: {
      name: true,
      image: true,
      user: { select: { id: true } },
    },
  });
};

const getSentRequestsNameImage = async (currentUserId: string) => {
  return await prisma.profile.findMany({
    where: { user: { sentRequests: { some: { id: currentUserId } } } },
    select: {
      name: true,
      image: true,
      user: { select: { id: true } },
    },
  });
};

const getReceivedRequestsNameImage = async (currentUserId: string) => {
  return await prisma.profile.findMany({
    where: { user: { receivedRequests: { some: { id: currentUserId } } } },
    select: {
      name: true,
      image: true,
      user: { select: { id: true } },
    },
  });
};

const getOthersNameImage = async (currentUserId: string) => {
  return await prisma.profile.findMany({
    where: {
      NOT: [
        { user: { friends: { some: { id: currentUserId } } } },
        { user: { friendsOf: { some: { id: currentUserId } } } },
        { user: { sentRequests: { some: { id: currentUserId } } } },
        { user: { receivedRequests: { some: { id: currentUserId } } } },
        { user: { id: currentUserId } },
      ],
    },
    select: {
      name: true,
      image: true,
      user: { select: { id: true } },
    },
  });
};
