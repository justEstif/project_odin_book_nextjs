import prisma from "@/lib-server/prisma";

export const UserService = {
  postsFriendsCount: async (id: string) => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        posts: true,
        profile: true,
        _count: {
          select: {
            friends: true,
            friendsRelation: true,
          },
        },
      },
    });
  },
};

export type TPostsFriendsCount = Awaited<
  ReturnType<typeof UserService.postsFriendsCount>
>;
