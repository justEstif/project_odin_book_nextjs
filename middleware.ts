import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/sign-in", // custom sign in page
    newUser: "/auth/new-user", // redirect new user here
    signOut: "/auth/sign-out",
  },
});
