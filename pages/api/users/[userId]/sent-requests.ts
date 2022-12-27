import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import prisma from "@/lib-server/prisma";
import { sentRequestsSchema } from "@/lib-server/validations/users";
import type { NextApiHandler } from "next";
import { z } from "zod";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const { method, query } = req;

  if (method === "GET") {
    const { currentUserId } = query as z.infer<
      typeof sentRequestsSchema["get"]["query"]
    >;
    const data = await getSentRequests({ currentUserId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(
  [
    {
      schema: sentRequestsSchema["get"]["query"],
      validationTarget: "query",
      requestMethod: "GET",
    },
  ],
  withAuth(handler)
);

export type TGetResponse = Awaited<ReturnType<typeof getSentRequests>>;
const getSentRequests = async ({
  currentUserId,
}: {
  currentUserId: string;
}) => {
  return await prisma.user.findUnique({
    where: { id: currentUserId },
    select: {
      sentRequests: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
    },
  });
};
