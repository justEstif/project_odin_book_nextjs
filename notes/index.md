# Project: Odin Book

- [TOP Page](https://www.theodinproject.com/lessons/nodejs-odin-book)
- [Notes from TOP](#notes-from-top)

## Notes from TOP

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
    - (Socket.io)[https://socket.io]
    - notifications

## Assignment

We won’t be worrying about some of the more flashy front-end stuff unless you really want to, but you shouldn’t need it to get a nice user experience.

This project will give you a chance to take a relatively high level set of requirements and turn it into a functioning website.

You’ll need to do some of your own research and read the documentation for a few of the modules we’ll be using. Keep the following requirements in mind. We’ll cover specific steps to get started below this list.

### Requirements

- pages

  - sign in
  - sign up
  - users: shows all the users on site and those pending friend request
  - user page: bio, profile info(friends, posts), profile pic ..
  - timeline: show all posts of friends and users in order
  - /
    - timeline: show posts from friends and user in order
    - /sign_in: redirect in no user
  - auth
    - /sign_in - sign in (using Facebook)
    - /sign_up - sign up
    - /sign_out - sign out
  - posts
      - /posts


    - /posts/:id - post page

  - /users: shows all the users on site and those pending friend request

    - /:id: bio, profile pic, posts
      - /friends: friends
      - /posts: user posts

- api

- users
  - sign in: using Facebook or default
  - sign up: profile pic(upload), use Facebook profile pic or skip
  - can only access page if signed in
  - send and accept friend requests
  - create posts (first text only, add more support later)
  - like and dislike posts
  - CRUD comments on posts
- Users must sign in to see anything
- Users can sign up using Facebook or the default
- User can create Profile with a photo(you can get this from the real Facebook)
- Users can send and accept friend requests to other users
- Users can create posts (first text only)
- Users can like and dislike posts
- Users can CRUD comments on posts
- User page contains their profile information, profile photo and posts.
- Users Index page lists all users and buttons for sending friend requests to those who are not already friends or who don’t already have a pending request.
- Posts should always display with the post content, author, comments and likes
- Timeline page should shows all posts from current user and users they are friends with

7. Posts should always display with the post content, author, comments and likes.

   - how many comments at once?
   - number of comments?

8. Treat the Posts index page like the real Facebook’s “Timeline” feature
   – show all the recent posts from the current user and users she is friends with.
9. Users can create Profile with a photo (you can get this from the real facebook when you sign in using passport)
10. The User Show page contains their profile information, profile photo and posts.
11. The Users Index page lists all users and buttons for sending friend requests to those who are not already friends or who don’t already have a pending request.
12. Deploy your app to Heroku!

- Extra

1. Make posts also allow images (either just via a url, or by uploading one.)
2. Allow Users to upload and update their own profile photo.
3. Create a guest sign-in functionality that allows visitors to bypass the login screen without creating an account or supplying credentials. This is especially useful if you are planning on putting this project on your résumé - most recruiters, hiring managers, etc. will not take the time to create an account. This feature will give them an opportunity to look at your hard work without going through a tedious sign-up process.
4. Make it pretty!
