import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class GetResponse {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  private async getUsers() {
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
  }

  private async getUser() {
    return await prisma.user.findUnique({
      where: {
        id: this.id,
      },
      select: {
        friends: true,
        friendsRelation: true,
        sentRequests: true,
        receivedRequests: true,
      },
    });
  }

  get response() {
    return (async () => {
      return {
        users: await this.getUsers(),
        user: await this.getUser(),
      };
    })();
  }
}

export type TGetUsers = Prisma.UserGetPayload<{
  select: {
    id: true;
    profile: {
      select: {
        name: true;
        image: true;
      };
    };
  };
}>;

export type TGetUser = Prisma.UserGetPayload<{
  select: {
    friends: true;
    friendsRelation: true;
    sentRequests: true;
    receivedRequests: true;
  };
}>;

export type TGetResponse = {
  user: TGetUser | null;
  users: TGetUsers[];
};
