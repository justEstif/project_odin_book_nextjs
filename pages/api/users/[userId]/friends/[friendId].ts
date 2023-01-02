import { NextApiHandler } from "next";
import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import { friendsIdSchema } from "@/lib-server/validations/users";
import { z } from "zod";

const handler: NextApiHandler<TDeleteResponse> = async (req, res) => {
  const { method, query } = req;
  if (method === "DELETE") {
    const { currentUserId, friendId } = query as z.infer<
      typeof friendsIdSchema["delete"]["query"]
    >;
    const data = await deleteFriend({ currentUserId, friendId });
    res.status(201).json(data);
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(
  withValidation(
    [
      {
        validationTarget: "query",
        requestMethod: "DELETE",
        schema: friendsIdSchema["delete"]["query"],
      },
    ],
    handler
  )
);

export type TDeleteResponse = Awaited<ReturnType<typeof deleteFriend>>;
const deleteFriend = async ({
  currentUserId,
  friendId,
}: {
  currentUserId: string;
  friendId: string;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: {
      friends: { disconnect: { id: friendId } },
      friendsOf: { disconnect: { id: friendId } },
    },
  });
};
