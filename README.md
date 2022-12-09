# Project: Odin Book

- Facebook clone using Next.JS

I was trying to set up NextAuth with the Email provider for passwordless auth. I

```javascript
const obj = {
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
};
```
