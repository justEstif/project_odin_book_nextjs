"use client";
import { signOut } from "next-auth/react";
type Props = {};

const Page = ({}: Props) => {
  return (
    <div>
      <title>Sign out | Odin</title>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Page;
