import withValidation from "@/lib-server/middleware/with-validation";
import prisma from "@/lib-server/prisma";
import { friendsSchema } from "@/lib-server/validations/users";
import type { NextApiHandler } from "next";
import { z } from "zod";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const { query, method } = req;
  if (method === "GET") {
    const { userId } = query as z.infer<typeof friendsSchema["get"]["query"]>;
    const data = await getFriends({ userId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(
  [
    {
      validationTarget: "query",
      requestMethod: "GET",
      schema: friendsSchema["get"]["query"],
    },
  ],
  handler
);

export type TGetResponse = Awaited<ReturnType<typeof getFriends>>;
const getFriends = async ({ userId }: { userId: string }) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      friends: {
        select: { id: true, profile: { select: { name: true, image: true } } },
      },
      friendsOf: {
        select: { id: true, profile: { select: { name: true, image: true } } },
      },
    },
  });
};
