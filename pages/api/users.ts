import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import authOptions from "@/lib/nextAuth/authOptions";
import { unstable_getServerSession } from "next-auth";

const getUsers = async () =>
  await prisma.user.findMany({
    select: {
      id: true,
      profile: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
const userNameImageId = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    profile: {
      select: {
        name: true,
        image: true,
      },
    },
  },
});
type TUsers = Prisma.UserGetPayload<typeof userNameImageId>;

const getUser = async (id: string | undefined) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      friends: true,
      friendsRelation: true,
      sentRequests: true,
      receivedRequests: true,
    },
  });
};
const userRequestsFriends = Prisma.validator<Prisma.UserArgs>()({
  select: {
    friends: true,
    friendsRelation: true,
    sentRequests: true,
    receivedRequests: true,
  },
});
type TUser = Prisma.UserGetPayload<typeof userRequestsFriends>;

export type TGetResponse = {
  user: TUser | null;
  users: TUsers;
};
/**
 * @description api handler to get all users in website
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions);
    const user: TUser | null = await getUser(session?.user.id);
    const users: TUsers[] = await getUsers();
    res.json({ user, users });
  }
};

export default handler;
