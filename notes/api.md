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

| HTTP     | Route              | Description                                      |
| -------- | ------------------ | ------------------------------------------------ |
| [X] GET  | /users             | get user, friend status;                         |
| [X] GET  | /users/:id         | get user, profile, posts                         |
| [X] GET  | /users/:id/friends | get friends of user (optional current user info) |
| [ ] GET  | /users/:id/posts   | get posts of user (optional current user info)   |
| [ ] POST | /users/:id         | update profile                                   |

## Posts:

| HTTP       | Route               | Description                                  |
| ---------- | ------------------- | -------------------------------------------- |
| [ ] GET    | /posts/:id/comments | get post comments                            |
| [ ] GET    | /posts/:id/likes    | get post likes                               |
| [ ] GET    | /posts/:id          | get post & its comments(count), likes(count) |
| [ ] POST   | /posts              | create a post                                |
| [ ] PUT    | /posts/:id          | update a post                                |
| [ ] DELETE | /posts/:id          | delete post, comments, likes                 |

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

- users index page

1. get all users
   - /api/users -> get all users
2. check if user is friend, has sent a request or received a request
   - option 1: check if the current user id is in the returned user friends ??
     - backend includes all the friends of the user
   - option 2: check if the return user is in the current user friends
     - front end get all the friends of the current user
     - use pagnation to return a certain amount
3. use that to control what is seen on the website
