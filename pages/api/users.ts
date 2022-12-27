import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import { usersSchema } from "@/lib-server/validations/users";
import { z } from "zod";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const { method, query } = req;
  if (method === "GET") {
    const { currentUserId } = query as z.infer<
      typeof usersSchema["get"]["query"]
    >;
    const data = await getNameImage(currentUserId);
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(
  [
    {
      schema: usersSchema.get.query,
      requestMethod: "GET",
      validationTarget: "query",
    },
  ],
  withAuth(handler)
);

export type TGetResponse = Awaited<ReturnType<typeof getNameImage>>;
const getNameImage = async (currentUserId: string) => {
  return {
    friends: await getFriendsNameImage(currentUserId),
    sentRequests: await getSentRequestsNameImage(currentUserId),
    receivedRequests: await getReceivedRequestsNameImage(currentUserId),
    others: await getOthersNameImage(currentUserId),
  };
};

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
