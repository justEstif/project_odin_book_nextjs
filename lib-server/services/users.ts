import prisma from "@/lib-server/prisma";
// TODO: prisma pagination

/**
 * get id, name and image of different users based on relation to current user
 */
export const NameImage = async (id: string) => {
  const noRelation = async () => {
    return await prisma.user.findMany({
      where: {
        sentRequests: {
          none: {
            id: id,
          },
        },
        receivedRequests: {
          none: {
            id: id,
          },
        },
        friendsOf: {
          none: {
            id: id,
          },
        },
        friends: {
          none: {
            id: id,
          },
        },
      },
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
  const receivedRequests = async () => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        receivedRequests: {
          select: {
            id: true,
            profile: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
  };
  const sentRequests = async () => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        sentRequests: {
          select: {
            id: true,
            profile: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
  };
  const friends = async () => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        friendsOf: {
          select: {
            id: true,
            profile: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
  };

  return {
    friends: await friends(),
    noRelation: await noRelation(),
    sentRequests: await sentRequests(),
    receivedRequests: await receivedRequests(),
  };
};

export type TNameProfile = Awaited<ReturnType<typeof NameImage>>;
