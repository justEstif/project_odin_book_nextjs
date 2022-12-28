import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import prisma from "@/lib-server/prisma";
import { likedPostsSchema } from "@/lib-server/validations/users";
import { NextApiHandler } from "next";
import { z } from "zod";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const { method, query } = req;
  if (method === "GET") {
    const { currentUserId } = query as z.infer<
      typeof likedPostsSchema["get"]["query"]
    >;
    const data = await getLikedPosts({ currentUserId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(
  withValidation(
    [
      {
        schema: likedPostsSchema["get"]["query"],
        validationTarget: "query",
        requestMethod: "GET",
      },
    ],
    handler
  )
);

export type TGetResponse = Awaited<ReturnType<typeof getLikedPosts>>;
const getLikedPosts = async ({ currentUserId }: { currentUserId: string }) => {
  return await prisma.user.findUnique({
    where: { id: currentUserId },
    select: { likedPosts: true },
  });
};
