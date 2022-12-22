# Project: Odin Book

- Facebook clone using Next.JS

I was trying to set up NextAuth with the Email provider for passwordless auth. I

- [Prisma Blog](https://www.prisma.io/blog/backend-prisma-typescript-orm-with-postgresql-data-modeling-tsjs1ps7kip1)

# TODO:

[ ] test create comment: POST /api/posts/postId/comments

- the useSWR hook needs to update the post on each like
- need to figure this out
  [ ] test create child comment: POST /api/posts/postId/comments/commentId

hello, i am working on the inventory application and i want to know if i organized my models well.

> i created a shoe schema,
> a price schema in case i want to sort by prices,

- I am not sure why you would need a prices schema. If you are going to sort by prices, or query by prices, you just check the price field in the shoe model.

a category schema - e.g leather shoe, sneakers etc, the shoe brand schema. does it make sense if i create a shoeinstance schema in cases where a shoe is out of stock ?

shoe {
    price: 1,
    quantity: 3,
    type
    brand
}
