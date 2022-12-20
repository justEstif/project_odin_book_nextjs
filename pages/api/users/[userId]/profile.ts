import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const {
    query: { userId },
    method,
  } = req;

  switch (method) {
    /**
     * @description get profile of user
     * @access any logged in user
     */
    case "GET":
      if (typeof userId === "string") {
        const data = await getProfile(userId);
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

export type TGetResponse = Awaited<ReturnType<typeof getProfile>>;
const getProfile = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { profile: true },
  });
};
