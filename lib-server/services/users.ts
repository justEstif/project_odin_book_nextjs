import prisma from "@/lib-server/prisma";
// TODO: prisma pagination

export const GetResponse = async (id: string) => {
  const user = async () => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        friends: {
          select: {
            id: true,
          },
        },
        friendsRelation: {
          select: {
            id: true,
          },
        },
        sentRequests: {
          select: {
            id: true,
          },
        },
        receivedRequests: {
          select: {
            id: true,
          },
        },
      },
    });
  };
  const users = async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        profile: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  };
  const ids = async () => {
    const currentUser = await user();

    if (currentUser) {
      return {
        friendsId: [
          ...currentUser.friends.map((el) => el.id),
          ...currentUser.friendsRelation.map((el) => el.id),
        ],
        receivedRequestsId: currentUser.receivedRequests.map((el) => el.id),
        sentRequestsId: currentUser.sentRequests.map((el) => el.id),
      };
    } else {
      return {};
    }
  };
  return {
    ids: await ids(),
    users: await users(),
  };
};

export type TGet = Awaited<ReturnType<typeof GetResponse>>;
