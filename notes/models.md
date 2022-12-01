```ts
model User {
    id: string
    profile: Profile
    email: string
    posts:   Post[]
    friends: User[]
}

model Profile {
    id: string
    bio: string
    pic: string
    user: User
}

model Post {
    id: string
    user: User
    content: string
    date: Date
}

model Like {
    id: string
    post: Post
    user: User
}

```

- two people are friends if your id exists in their friends list and both exist
