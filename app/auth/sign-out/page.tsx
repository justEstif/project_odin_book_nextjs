"use client";
import { signOut } from "next-auth/react";
type Props = {};

const Page = ({}: Props) => {
  return (
    <div>
      <h1>Sign out Page</h1>
      <button onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}>
        Sign out
      </button>
    </div>
  );
};

export default Page;
