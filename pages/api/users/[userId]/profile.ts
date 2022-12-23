import type { NextApiHandler } from "next";
import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import {
  profileSchema,
  TProfileSchema,
} from "@/lib-server/validations/profile";

const handler: NextApiHandler<TGetResponse | TPostResponse> = async (
  req,
  res
) => {
  const {
    query: { userId, currentUserId },
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
    /**
     * @description update profile
     * @access any logged in user
     */
    case "POST":
      if (
        typeof userId === "string" &&
        typeof currentUserId === "string" &&
        userId === currentUserId
      ) {
        const profileBody = req.body as TProfileSchema;
        const data = await updateProfile({ currentUserId, profileBody });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    // TODO handle deleting profile field
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(profileSchema, withAuth(handler));

export type TGetResponse = Awaited<ReturnType<typeof getProfile>>;
const getProfile = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { profile: true },
  });
};

export type TPostResponse = Awaited<ReturnType<typeof updateProfile>>;
const updateProfile = async ({
  currentUserId,
  profileBody,
}: {
  currentUserId: string;
  profileBody: TProfileSchema;
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
