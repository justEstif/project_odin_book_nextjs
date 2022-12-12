import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const getRes = Prisma.validator<Prisma.UserArgs>()({
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

export type TGetRes = Prisma.UserGetPayload<typeof getRes>;

/**
 * @description  api handler to get all users in website
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const users: TGetRes[] = await prisma.user.findMany({
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
    res.status(200).json(users);
  }
};

export default handler;
