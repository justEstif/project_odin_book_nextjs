# Project: Odin Book

- Facebook clone using Next.JS

I was trying to set up NextAuth with the Email provider for passwordless auth. I

```typescript
const user = await prisma.user.update({
  where: {
    id: "",
  },
  data: {
    sentRequests: {
      connect: {
        id: "",
      },
    },
  },
});
```

[Prisma Blog](https://www.prisma.io/blog/backend-prisma-typescript-orm-with-postgresql-data-modeling-tsjs1ps7kip1)

```javascript
import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const getProfile = async () =>
  await prisma.profile.create({
    data: {
      id: faker.datatype.uuid(),
      bio: faker.company.catchPhrase(),
      image: faker.image.image(),
      name: faker.name.fullName(),
    },
  });

const getUserScalarData = () => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  emailVerified: faker.date.soon(),
});

const main = async () => {
  await prisma.user.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.verificationToken.deleteMany({});

  const profile1 = await getProfile();
  const profile2 = await getProfile();
  const profile3 = await getProfile();
  const profile4 = await getProfile();

  const user1 = await prisma.user.create({
    data: {
      ...getUserScalarData(),
      profile: {
        connect: {
          id: profile1.id,
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      ...getUserScalarData(),
      profile: {
        connect: {
          id: profile2.id,
        },
      },

      receivedRequests: {
        connect: {
          id: user1.id,
        },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      ...getUserScalarData(),
      profile: {
        connect: {
          id: profile3.id,
        },
      },
    },
  });

  const user4 = await prisma.user.create({
    data: {
      ...getUserScalarData(),
      profile: {
        connect: {
          id: profile4.id,
        },
      },
      friendsRelation: {
        connect: {
          id: user1.id,
        },
      },
      receivedRequests: {
        connect: {
          id: user2.id,
        },
      },
      sentRequests: {
        connect: {
          id: user3.id,
        },
      },
      posts: {
        create: [
          {
            content: faker.lorem.sentence(),
            comments: {
              create: {
                content: "this is s acomment",
                user: {
                  connect: {
                    id: user1.id,
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

- When you send a friend request:
```
sentRequests: {
  connect: {
    id: user1.id,
  },
},
```

- In turn the other user, will get the user id in the receivedRequests field
