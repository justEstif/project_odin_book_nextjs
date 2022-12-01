## Notes from [TOP Page](https://www.theodinproject.com/lessons/nodejs-odin-book)

### Introduction

- Building a full-stack Facebook clone

  - core features:
    - users
    - posts
    - profiles
    - liking
    - friending
    - news feed
    - signing in with the real Facebook
  - other features:
    - chat
    - real-time updates of the newsfeed
    - [Socket.io](https://socket.io)
    - notifications

### Assignment

- users

  - sign in: using Facebook(OAuth) or default(Auth)
  - sign up: profile pic(upload), use Facebook profile pic, upload or url img, or skip
  - can only access page if signed in
  - send and accept friend requests
  - create posts (first text only, add more support later)
  - like and dislike posts
  - CRUD comments on posts

- pages

  - users index page lists all users and buttons for friends, pending, sending friend request
  - user page contains their profile info, photo and posts
  - posts page should show all the posts from the current user and user's they are friends with
    - post should always display with the post content, author, comments and likes

- extra

  - make posts also allow images (url or upload)
  - allow user to upload and update their own profile photo
  - create a guest sign in functionality that allow visitors to bypass the login screen without creating an account or supplying credentials
    - useful for recruiters, hiring managers ...

### Getting Started

- Think about the data architecture required to make this work
  - models and the relationship between them
  - how to model a user's list of friends and friend requests?
  - posts should be able to have likes and comments associated with them, how are you going to mode that?
- you can populate data like users and posts with fake data using faker module

## Models

```ts
type User = {
  id: string;
  bio: string;
  profilePic: string;
  friends: string[]; // array of ids
};
```

```js
type Post = {
  id: string
  authorId: string
  content: string
  date: Date
  likes: []
  comments: []
}
```

```js
type Comment = {
  id: string
  authorId: string
  date: string
  content: string
}
```

## Insight

- models

  - user
    - friends
    - posts
      - comments
      - likes
  - post

    - comment
    - like

      - post
      - user

    - comment
      - post
      - user
      - time
      - id
      - text

- relationship between models
- api

- pages
  - /: redirect to sign_in if not user
  - /sign_in
  - /sign_up
  - /sign_out
  - /users: show all users, indicate friends, pending requests, and send friend request
    - api to send friend request to id
    - api to get friend requests
  - /users/:id: bio, profile pic, posts
    - check if current user or not ??
      - /users/:id/friends or query users to get only friends ...
  - /posts
  - /posts/:id
