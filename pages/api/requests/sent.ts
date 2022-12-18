import prisma from "@/lib-server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import withAuth from "@/lib-server/middleware/with-auth";

type TGetResponse = TGetSentRequests | { message: string };
export type TResponse = TGetResponse;
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { userId },
  } = req;

  switch (method) {
    case "GET":
      if (userId && typeof userId === "string") {
        const data = await getSentRequests(userId);
        res.status(200).json(data);
        break;
      }
      res.status(403).end();
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);

const getSentRequests = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      sentRequests: true,
    },
  });
};

type TGetSentRequests = Awaited<ReturnType<typeof getSentRequests>>;
