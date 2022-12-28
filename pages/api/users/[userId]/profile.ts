import type { NextApiHandler } from "next";
import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import { z } from "zod";
import { profileSchema } from "@/lib-server/validations/users";

const handler: NextApiHandler<TGetResponse | TPostResponse> = async (
  req,
  res
) => {
  const { query, method, body } = req;

  if (method === "GET") {
    const { userId } = query as z.infer<typeof profileSchema["get"]["query"]>;
    const data = await getProfile({ userId });
    res.status(200).json(data);
  } else if (method === "PATCH") {
    const { currentUserId } = query as z.infer<
      typeof profileSchema["patch"]["query"]
    >;
    const profileBody = body as z.infer<typeof profileSchema["patch"]["body"]>;
    const data = await updateProfile({ currentUserId, profileBody });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET", "PATCH"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(
  withValidation(
    [
      {
        requestMethod: "GET",
        schema: profileSchema["get"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "PATCH",
        schema: profileSchema["patch"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "PATCH",
        schema: profileSchema["patch"]["body"],
        validationTarget: "body",
      },
    ],
    handler
  )
);

export type TGetResponse = Awaited<ReturnType<typeof getProfile>>;
const getProfile = async ({ userId }: { userId: string }) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: { profile: true },
  });
};

export type TPostResponse = Awaited<ReturnType<typeof updateProfile>>;
const updateProfile = async ({
  currentUserId,
  profileBody,
}: {
  currentUserId: string;
  profileBody: z.infer<typeof profileSchema["patch"]["body"]>;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: {
      profile: {
        update: {
          ...(profileBody.bio && { bio: profileBody.bio }),
          ...(profileBody.image && { image: profileBody.image }),
          ...(profileBody.name && { name: profileBody.name }),
        },
      },
    },
  });
};
