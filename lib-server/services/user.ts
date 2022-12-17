import prisma from "@/lib-server/prisma";
/**
 * get
 */
export const User = async (id: string, currentUserId: string) => {
  const isCurrentUser = id === currentUserId;
  /**
   * get all the friends of the user
   */
  const friends = async () => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        friends: true,
        friendsRelation: true,
      },
    });
  };
  /**
   * get the friend count of the user
   */
  const friendsCount = async () => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        _count: {
          select: {
            friendsRelation: true,
            friends: true,
          },
        },
      },
    });
  };
};
