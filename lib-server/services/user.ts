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
            friendsOf: true,
          },
        },
      },
    });
  },
  friends: async (id: string) => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        friends: true,
        friendsOf: true,
      },
    });
  },
  posts: async (id: string) => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        posts: true,
      },
    });
  },
};

export type TPostsFriendsCount = Awaited<
  ReturnType<typeof UserService.postsFriendsCount>
>;

export type TFriends = Awaited<ReturnType<typeof UserService.friends>>;
export type TPosts = Awaited<ReturnType<typeof UserService.posts>>;
