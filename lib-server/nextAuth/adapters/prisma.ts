import type { PrismaClient, Prisma } from "@prisma/client";
import type { Adapter, AdapterAccount } from "next-auth/adapters";

const PrismaAdapter = (prisma: PrismaClient): Adapter => {
  return {
    createUser: (data) =>
      prisma.user.create({
        data: {
          email: data.email,
          emailVerified: data.emailVerified,
          profile: {
            create: {
              name: data.name || "",
              bio: "",
              image: data.image || "",
            },
          },
        },
      }),
    getUser: (id) => prisma.user.findUnique({ where: { id } }),
    getUserByEmail: (email) => prisma.user.findUnique({ where: { email } }),
    getUserByAccount: async (provider_providerAccountId) => {
      const account = await prisma.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      });
      return account?.user ?? null;
    },
    updateUser: ({ id, ...data }) =>
      prisma.user.update({ where: { id }, data }),
    deleteUser: (id) => prisma.user.delete({ where: { id } }),
    linkAccount: (data) =>
      prisma.account.create({ data }) as unknown as AdapterAccount,
    unlinkAccount: (provider_providerAccountId) =>
      prisma.account.delete({
        where: { provider_providerAccountId },
      }) as unknown as AdapterAccount,
    async getSessionAndUser(sessionToken) {
      const userAndSession = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return { user, session };
    },
    createSession: (data) => prisma.session.create({ data }),
    updateSession: (data) =>
      prisma.session.update({
        where: { sessionToken: data.sessionToken },
        data,
      }),
    deleteSession: (sessionToken) =>
      prisma.session.delete({ where: { sessionToken } }),
    async createVerificationToken(data) {
      const verificationToken = await prisma.verificationToken.create({ data });
      // @ts-expect-errors // MongoDB needs an ID, but we don't
      if (verificationToken.id) delete verificationToken.id;
      return verificationToken;
    },
    async useVerificationToken(identifier_token) {
      try {
        const verificationToken = await prisma.verificationToken.delete({
          where: { identifier_token },
        });
        // @ts-expect-errors // MongoDB needs an ID, but we don't
        if (verificationToken.id) delete verificationToken.id;
        return verificationToken;
      } catch (error) {
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
          return null;
        throw error;
      }
    },
  };
};
export default PrismaAdapter;
