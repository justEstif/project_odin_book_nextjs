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
