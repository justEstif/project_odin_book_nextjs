# Api Routes

- [Testing API](https://github.com/KennFatt/nextjs-api-routes-testing)

## Auth: Using OAuth2(Facebook and Email/PW)

| HTTP   | Route        | Description                           |
| ------ | ------------ | ------------------------------------- |
| POST   | /auth/signIn | login user(with Email/PW or OAuth2)   |
| POST   | /auth/signUp | register user(with Email/PW or OAut2) |
| DELETE | /auth/:id    | delete user                           |

## Users:

| HTTP | Route      | Description              |
| ---- | ---------- | ------------------------ |
| GET  | /users/:id | get user, profile, posts |
| POST | /users/:id | update profile           |

## Friends:

| HTTP | Route        | Description                                      |
| ---- | ------------ | ------------------------------------------------ |
| GET  | /friends/:id | get friends of user (optional current user info) |

## Posts:

| HTTP   | Route               | Description                                  |
| ------ | ------------------- | -------------------------------------------- |
| GET    | /posts/:id          | get post & its comments(count), likes(count) |
| POST   | /posts              | create a post                                |
| PUT    | /posts/:id          | update a post                                |
| DELETE | /posts/:id          | delete post, comments, likes                 |
| GET    | /posts/:id/comments | get post comments                            |

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
