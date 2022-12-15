"use client";
import { signOut } from "next-auth/react";

type Props = {};

const SignOutBtn = ({}: Props) => {
  return <button onClick={() => signOut()}>Sign out</button>;
};

export default SignOutBtn;
