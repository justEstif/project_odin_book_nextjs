import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import withAuth from "@/lib-server/middleware/with-auth";

type TGetResponse = TGetNameImage | { message: string };
export type TResponse = TGetResponse;

const handler: NextApiHandler<TResponse> = async (req, res) => {
  const {
    method,
    query: { userId },
  } = req;
  switch (method) {
    case "GET":
      if (userId && typeof userId === "string") {
        const data = await getNameImage(userId);
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

const getNameImage = async (id: string) => {
  return {
    friends: await getFriendsNameImage(id),
    sentRequests: await getSentRequestsNameImage(id),
    receivedRequests: await getReceivedRequestsNameImage(id),
    others: await getOthersNameImage(id),
  };
};

type TGetNameImage = Awaited<ReturnType<typeof getNameImage>>;

const getFriendsNameImage = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      friendsOf: {
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

const getSentRequestsNameImage = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      sentRequests: {
        select: {
          id: true,
          profile: {
            select: { name: true, image: true },
          },
        },
      },
    },
  });
};

const getReceivedRequestsNameImage = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      sentRequests: {
        select: {
          id: true,
          profile: {
            select: { name: true, image: true },
          },
        },
      },
    },
  });
};

const getOthersNameImage = async (id: string) => {
  return await prisma.user.findMany({
    where: {
      sentRequests: { none: { id: id } },
      receivedRequests: { none: { id: id } },
      friendsOf: { none: { id: id } },
      friends: { none: { id: id } },
    },
    select: {
      id: true,
      profile: {
        select: { name: true, image: true },
      },
    },
  });
};
