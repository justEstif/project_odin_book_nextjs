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
| [X] GET  | /users/:id/posts   | get posts of user (optional current user info)   |
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

# RESTFul API

| Type    | Route                           | Function                                          | Auth                                                                  |
| ------- | ------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------- |
| [X] GET | /users                          | get all users                                     | get the users in relation to the current user; don't get current user |
| [X] GET | /users/userId                   | get user using user id                            | get the users in relation to the current user                         |
| [X] GET | /users/userId/profile           | get user profile using user id                    | get the users in relation to the current user                         |
| [X] GET | /users/userId/posts             | get user posts using user id                      | get the users in relation to the current user                         |
| [X] GET | /users/userId/friends           | get user friends using user id                    | get the users in relation to the current user                         |
| [X] GET | /users/userId/liked-posts       | get user liked posts using user id                | only get posts if current user matches query id                       |
| [X] GET | /users/userId/sent-requests     | get user received-requests                        | only get requests if current user matches query id                    |
| [X] GET | /users/userId/received-requests | get user sent-requests                            | only get requests if current user matches query id                    |
| [ ] GET | /posts                          | get posts                                         | get posts in relation to current user                                 |
| [ ] GET | /posts/postId                   | get posts, likes and comments count using post id | get the post in relation to the current user                          |
| [ ] GET | /posts/postId/comments          | get post comment using post id                    | get the post in relation to the current user                          |
| [ ] GET | /posts/postId/likes             | get post likes using post id                      | get the post in relation to the current user                          |
