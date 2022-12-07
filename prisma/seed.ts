import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from "lib/prisma";

const user = (): Prisma.UserCreateInput => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),

  profile: {
    create: {
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      bio: faker.company.catchPhrase(),
      pic: faker.image.image(),
    },
  },
});

const userWithProfile = (): Prisma.UserCreateInput => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),

  profile: {
    create: {
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      bio: faker.company.catchPhrase(),
      pic: faker.image.image(),
    },
  },
});

const userWithPost = (): Prisma.UserCreateInput => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),

  profile: {
    create: {
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      bio: faker.company.catchPhrase(),
      pic: faker.image.image(),
    },
  },
  posts: {
    create: [
      {
        id: faker.datatype.uuid(),
        content: faker.lorem.sentence(),
      },
    ],
  },
});

const userWithPosts = (): Prisma.UserCreateInput => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),

  profile: {
    create: {
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      bio: faker.company.catchPhrase(),
      pic: faker.image.image(),
    },
  },
  posts: {
    create: [
      {
        id: faker.datatype.uuid(),
        content: faker.lorem.sentence(),
      },
      {
        id: faker.datatype.uuid(),
        content: faker.lorem.sentence(),
      },
    ],
  },
});

const userData: Prisma.UserCreateInput[] = [
  user(),
  user(),
  user(),
  userWithProfile(),
  userWithProfile(),
  userWithProfile(),
  userWithProfile(),
  userWithPost(),
  userWithPost(),
  userWithPost(),
  userWithPosts(),
  userWithPosts(),
  userWithPosts(),
  userWithPosts(),
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({ data: u });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
