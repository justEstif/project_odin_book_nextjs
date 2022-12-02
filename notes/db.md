# Database

- The database keeps user information, posts, comments and likes made on the Facebook clone app.

- what is stored in the db?

  - users
  - posts,
  - comments,
  - like

- what do users have?

  - friends,
  - posts,
  - profile

- what can a user do?

  - post,
  - comment,
  - like,

1. Determine the purpose of the db

- The app is going to be a full- stack clone of Facebook using Next.

- The db will store the users, posts, profiles, comments, likes

  - it would be store primitive data

2. Find and organize the information required

- how to register?
  - either email and password or facebook -> store access token as password
- what type of api calls will you make?
  - register user
  - sign in user
  - create profile
  - get all users
  - send friend request
  - accept friend request
  - get friends post in chronological order
    - only friends (not pending)
    - // idea becomes friends page
  - comment on user post
  - like user post
  - make a user post

1. user logins in to fb
1. apps get access token
1. if new access token, get data from fb, and store data as new user
   else: login to user with that id

## Models

```typescript
// used while active
type Profile = {
  id: string;
  user: User; // User id
  firstName: string;
  lastName: string;
  bio: string;
  pic?: string; // user profile pic url, TODO
};

// used for login
type User = {
  id: string;
  email: string;
  password: string; // either password or access token
};

type Friends = {
  id: string;
  user: User;
  friends: User[]; // array of user id
  pendingFriends: User[]; // array of user id
};

type Post = {
  id: string;
  user: User; // User id
  content: string; // maybe this can be a url
  date: Date;
};

type Comment = {
  id: string;
  post: Post; // Post id
  user: User; // User id
  date: Date;
  content: string;
};

type Like = {
  id: string;
  post: Post; // Post id
  user: string; // User id
};
```
