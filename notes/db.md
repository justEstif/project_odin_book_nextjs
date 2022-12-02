# Database

- the purpose of your database

  - The database keeps user information, posts, comments and likes made on the Facebook clone app.

- gather and organize
  - what is store in the db?
    - user info, posts, comments, likes
    - what do users have?
      - friends
      - posts
      - profile
    - what can users do?
      - comment
      - post
      - like
  - what do you need to register?
    - name, email, accessToken
  - what do you need to sign in?
    - email, accessToken
  - what do you need to create a post?
    - user ,content
  - what do you need to create a comment?
    - user, content
  - what do you need to like?
    - user, content
  - what is a post?
  - what is a comment?
  - what is a user?
  - what is a friend?

1. Determine the purpose of the db

- The app is going to be a full- stack clone of Facebook using Next.

- The db will store the users, posts, profiles, comments, likes

  - it would be store primitive data

2. Find and organize the information required

```typescript
type Profile = {
  id: string;
  user: string; // User id
  bio: string;
  pic?: string; // user profile pic url, TODO
};

type User = {
  id: string;
  email: string;
  accessToken: string; // either password or access token
  friends: User[]; // array of friends
  pendingRequest: User[]; // TODO fix
};

type Post = {
  id: string;
  user: string; // User id
  content: string; //
  date: Date;
};

type Like = {
  id: string;
  post: string; // Post id
  user: string; // User id
  date: Date;
};
```

- to store
- users,
  - profile Profile
  -
- posts,

- how to register?
  - either email and password or facebook

1. user logins in to fb
2. apps get access token
3. if new access token, get data from fb, and store data as new user
   else: login to user with that id

## Models

- two people are friends if your id exists in their friends list and both exist
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



