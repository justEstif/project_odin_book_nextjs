import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const getProfileScalarData = () => ({
  id: faker.datatype.uuid(),
  bio: faker.company.catchPhrase(),
  image: faker.image.image(),
  name: faker.name.fullName(),
});

const getUserScalarData = () => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  emailVerified: faker.date.soon(),
});

const getPostAndCommentScalarData = () => ({
  id: faker.datatype.uuid(),
  content: faker.hacker.phrase(),
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

  const user1 = await prisma.user.create({
    data: {
      ...getUserScalarData(),
      profile: { create: { ...getProfileScalarData() } },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      ...getUserScalarData(),
      profile: { create: { ...getProfileScalarData() } },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      ...getUserScalarData(),
      profile: { create: { ...getProfileScalarData() } },
      sentRequests: { connect: { id: user2.id } },
      friends: { connect: { id: user1.id } },
      posts: {
        create: [
          {
            ...getPostAndCommentScalarData(),
            likes: { connect: [{ id: user1.id }, { id: user2.id }] },
            comments: {
              create: [
                {
                  ...getPostAndCommentScalarData(),
                  user: { connect: { id: user1.id } },
                  likes: { connect: { id: user2.id } },
                },
                {
                  ...getPostAndCommentScalarData(),
                  user: { connect: { id: user2.id } },
                  likes: { connect: { id: user1.id } },
                },
              ],
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
