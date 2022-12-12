# Api Routes

- [Testing API](https://github.com/KennFatt/nextjs-api-routes-testing)

## Auth: Using OAuth2(Facebook and Email/PW)

| HTTP   | Route         | Description                           |
| ------ | ------------- | ------------------------------------- |
| POST   | /auth/signIn  | login user(with Email/PW or OAuth2)   |
| POST   | /auth/signUp  | register user(with Email/PW or OAut2) |
| GET    | /auth/signOut | sign out user                         |
| DELETE | /auth/:id     | delete user                           |

## Users:

| HTTP | Route              | Description                                      |
| ---- | ------------------ | ------------------------------------------------ |
| GET  | /users             | get user, friend status;                         |
| GET  | /users/:id         | get user, profile, posts                         |
| POST | /users/:id         | update profile                                   |
| GET  | /users/:id/friends | get friends of user (optional current user info) |
| GET  | /users/:id/posts   | get posts of user (optional current user info)   |

## Posts:

| HTTP   | Route               | Description                                  |
| ------ | ------------------- | -------------------------------------------- |
| POST   | /posts              | create a post                                |
| GET    | /posts/:id          | get post & its comments(count), likes(count) |
| PUT    | /posts/:id          | update a post                                |
| DELETE | /posts/:id          | delete post, comments, likes                 |
| GET    | /posts/:id/comments | get post comments                            |
| GET    | /posts/:id/likes    | get post likes                               |

## Friends:

| HTTP | Route        | Description                |
| ---- | ------------ | -------------------------- |
| GET  | /friends/:id | get friends of user        |
| POST | /friends/:id | send/unsend friend request |

## Comments

| HTTP   | Route         | Description                      |
| ------ | ------------- | -------------------------------- |
| POST   | /comments     | create a comment (pass req data) |
| PUT    | /comments/:id | update a comment                 |
| DELETE | /comments/:id | delete a comment                 |

```
api/
├─ users/
│ ├─ [id]/
│ │ ├─ friends/
│ │ │ ├─ index.ts: GET
│ │ ├─ posts/
│ │ │ ├─ index.ts: GET
│ │ ├─ index.ts: GET, POST
│ ├─ index.ts: GET
├─ posts/
│ ├─ [id]/
│ │ ├─ likes/
│ │ │ ├─ index.ts: GET
│ │ ├─ comments/
│ │ │ ├─ index.ts/: GET
│ │ ├─ index.ts: GET, PUT, DELETE
│ ├─ index.ts: POST
├─ friends/
│ ├─ [id]/
│ │ ├─ index.ts: GET, POST
├─ comments/
│ ├─ [id]/
│ │ ├─ index.ts: DELETE, PUT
│ ├─ index.ts: POST
```
