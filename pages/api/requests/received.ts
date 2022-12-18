import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";
import { NextApiRequest, NextApiResponse } from "next";

type TGetResponse = TGetReceivedRequests | { message: string };
export type TResponse = TGetResponse;
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { userId },
  } = req;

  switch (method) {
    case "GET":
      if (userId && typeof userId === "string") {
        const data = await getReceivedRequests(userId);
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

const getReceivedRequests = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      receivedRequests: true,
    },
  });
};

type TGetReceivedRequests = Awaited<ReturnType<typeof getReceivedRequests>>;
