import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import withAuth from "@/lib-server/middleware/with-auth";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
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

export type TGetResponse = Awaited<ReturnType<typeof getNameImage>>;
const getNameImage = async (currentUserId: string) => {
  const getFriendsNameImage = async (currentUserId: string) => {
    return await prisma.user.findMany({
      where: {
        OR: [
          { friends: { some: { id: currentUserId } } },
          { friendsOf: { some: { id: currentUserId } } },
        ],
      },
      select: {
        id: true,
        profile: { select: { name: true, image: true } },
      },
    });
  };

  const getSentRequestsNameImage = async (currentUserId: string) => {
    return await prisma.user.findMany({
      where: { sentRequests: { some: { id: currentUserId } } },
      select: {
        id: true,
        profile: { select: { name: true, image: true } },
      },
    });
  };

  const getReceivedRequestsNameImage = async (currentUserId: string) => {
    return await prisma.user.findMany({
      where: { receivedRequests: { some: { id: currentUserId } } },
      select: {
        id: true,
        profile: { select: { name: true, image: true } },
      },
    });
  };

  const getOthersNameImage = async (currentUserId: string) => {
    return await prisma.user.findMany({
      where: {
        NOT: [
          { friends: { some: { id: currentUserId } } },
          { friendsOf: { some: { id: currentUserId } } },
          { sentRequests: { some: { id: currentUserId } } },
          { receivedRequests: { some: { id: currentUserId } } },
          { id: currentUserId },
        ],
      },
      select: {
        id: true,
        profile: {
          select: { name: true, image: true },
        },
      },
    });
  };
  return {
    friends: await getFriendsNameImage(currentUserId),
    sentRequests: await getSentRequestsNameImage(currentUserId),
    receivedRequests: await getReceivedRequestsNameImage(currentUserId),
    others: await getOthersNameImage(currentUserId),
  };
};
