import prisma from "@/lib-server/prisma";

export const getRelation = async ({
  id,
  currentUserId,
}: {
  id: string;
  currentUserId: string;
}): Promise<
  "received-request" | "sent-request" | "friend" | "user" | "none"
> => {
  const user = id === currentUserId;
  const receivedRequests = !!(await prisma.user.findFirst({
    where: {
      id: id,
      receivedRequests: { some: { id: currentUserId } },
    },
  }));
  const sentRequest = !!(await prisma.user.findFirst({
    where: {
      id: id,
      sentRequests: { some: { id: currentUserId } },
    },
  }));
  const friend = !!(await prisma.user.findFirst({
    where: {
      id: id,
      OR: [
        { friends: { some: { id: currentUserId } } },
        { friendsOf: { some: { id: currentUserId } } },
      ],
    },
  }));

  if (receivedRequests) return "received-request";
  if (sentRequest) return "sent-request";
  if (friend) return "friend";
  if (user) return "user";
  return "none";
};
