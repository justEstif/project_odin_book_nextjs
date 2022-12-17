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
      profile: {
        create: {
          ...getProfileScalarData(),
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
      profile: { create: { ...getProfileScalarData() } },
      sentRequests: {
        connect: {
          id: user2.id,
        },
      },
      friends: { connect: { id: user1.id } },
    },
  });

  const user4 = await prisma.user.create({
    data: {
      ...getUserScalarData(),
      profile: { create: { ...getProfileScalarData() } },
      sentRequests: {
        connect: [{ id: user2.id }, { id: user3.id }],
      },
      friends: {
        connect: { id: user1.id },
      },
    },
  });

  const user5 = await prisma.user.create({
    data: {
      ...getUserScalarData(),
      profile: { create: { ...getProfileScalarData() } },
      friends: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
      sentRequests: {
        connect: [{ id: user3.id }, { id: user4.id }],
      },
    },
  });

  const user6 = await prisma.user.create({
    data: {
      ...getUserScalarData(),
      profile: { create: { ...getProfileScalarData() } },
      sentRequests: {
        connect: [{ id: user4.id }, { id: user5.id }],
      },
      friends: {
        connect: [{ id: user1.id }, { id: user2.id }, { id: user3.id }],
      },
    },
  });

  const user7 = await prisma.user.create({
    data: {
      id: faker.datatype.uuid(),
      email: "yesepe1201@fanneat.com",
      emailVerified: faker.date.soon(),

      profile: { create: { ...getProfileScalarData() } },
      sentRequests: {
        connect: [{ id: user1.id }, { id: user2.id }, { id: user3.id }],
      },
      friends: {
        connect: [{ id: user4.id }, { id: user5.id }, { id: user6.id }],
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
