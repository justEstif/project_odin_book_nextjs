# Routes

## users

| Type       | Route                            | Function                                               |
| ---------- | -------------------------------- | ------------------------------------------------------ |
| [X] GET    | /users                           | get all users                                          |
| [X] GET    | /users/:id                       | get user using user id                                 |
| [X] GET    | /users/:id/posts                 | get user posts using user id                           |
| [X] GET    | /users/:id/profile               | get user profile using user id                         |
| [X] GET    | /users/:id/liked-posts           | get user liked posts using user id                     |
| [X] GET    | /users/:id/friends               | get user friends using user id                         |
| [X] GET    | /users/:id/sent-requests         | get user received-requests                             |
| [X] GET    | /users/:id/received-requests     | get user sent-requests                                 |
| [ﭧ] POST   | /users/:id/posts                 | create a post, only if user id matches session user id |
| [ﭧ] POST   | /users/:id/sent-requests/:id     | send a friend request                                  |
| [ﭧ] POST   | /users/:id/received-requests/:id | accept a friend request                                |
| [ﭧ] PUT    | /users/:id/profile               | update profile                                         |
| [ﭧ] DELETE | /users/:id                       | delete a user                                          |
| [ﭧ] DELETE | /users/:id/friends/:id           | delete a friend                                        |
| [ﭧ] DELETE | /users/:id/sent-requests/:id     | delete a sent friend request                           |
| [ﭧ] DELETE | /users/:id/received-requests/:id | delete a received friend request                       |

## posts

| HTTP       | Route                            | Description                                          |
| ---------- | -------------------------------- | ---------------------------------------------------- |
| [X] GET    | [`/posts`](#get-posts)           | get posts                                            |
| [ ] POST   | [`/posts`](#post-postsid)        | create a post                                        |
| [ ] GET    | /posts/:id/comments              | get post comments                                    |
| [ ] GET    | /posts/:id/likes                 | get post likes                                       |
| [ ] GET    | /posts/:id                       | get post & its comments(count), likes(count)         |
| [ ] PUT    | /posts/:id                       | update a post                                        |
| [ ] DELETE | /posts/:id                       | delete post, comments, likes                         |
| [X] GET    | /posts/postId                    | get posts, likes and comments count using post id    |
| [X] GET    | /posts/postId/likes              | get post likes using post id                         |
| [X] GET    | /posts/postId/comments           | get all the comments of a post                       |
| [X] GET    | /posts/postId/comments/commentId | get a comment of a post                              |
| [X] POST   | /posts/postId/likes              | like/unlike a post                                   |
| [X] POST   | /posts/postId/comments           | comment on a post                                    |
| [X] POST   | /posts/postId/comments/commentId | comment on a comment                                 |
| [ﭧ] POST   | /posts/:id                       | update a post                                        |
| [ ] PUT    | /posts/:id/comments/:id          | update a comment                                     |
| [ﭧ] DELETE | /posts/:id                       | delete a post, only if the post if the current users |
| [ ] DELETE | /posts/:id/comments/:id          | delete a comment                                     |
| [X] POST   | /posts                           | create a post                                        |
