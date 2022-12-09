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
- [x] models and the relationship between them
  - [x] how to model a user's list of friends and friend requests?
    - [description](#how-friends-were-modeled)
  - [x] posts should be able to have likes and comments associated with them, how are you going to mode that?
    - [description](#how-posts-were-modeled)
- you can populate data like users and posts with fake data using faker module

#### How friends were modeled?

- when user-a sends a friend request to user-b
  - add user-b's id to user-a's sentRequests
  - add user-a's id to user'b's receivedRequests
- if accepted:
  - add user-b's id to user-a's friends
  - add user-a's id to user-b's friends
  - add requesters id to receivedRequests

#### How posts were modeled?

- one to many relation

- one post can have many comments, but comments can only have one post
  - in comment: have a post id
  - in posts: have a comments array
- one post can have many likes, but likes can only have one post
  - in posts: have a likes array, with user id of user who liked
  - in `likedPosts`: array of posts liked
