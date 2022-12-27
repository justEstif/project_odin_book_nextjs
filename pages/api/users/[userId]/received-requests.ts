import type { NextApiHandler } from "next";
import withValidation from "@/lib-server/middleware/with-validation";
import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import { z } from "zod";
import { receivedRequestsSchema } from "@/lib-server/validations/users";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const { method, query } = req;

  if (method === "GET") {
    const { currentUserId } = query as z.infer<
      typeof receivedRequestsSchema["get"]["query"]
    >;
    const data = await getReceivedRequests({ currentUserId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(
  [
    {
      schema: receivedRequestsSchema["get"]["query"],
      validationTarget: "query",
      requestMethod: "GET",
    },
  ],
  withAuth(handler)
);

export type TGetResponse = Awaited<ReturnType<typeof getReceivedRequests>>;
const getReceivedRequests = async ({
  currentUserId,
}: {
  currentUserId: string;
}) => {
  return await prisma.user.findUnique({
    where: { id: currentUserId },
    select: {
      receivedRequests: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
    },
  });
};
