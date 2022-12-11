"use client";
import { signIn } from "next-auth/react";

type TProps = {
  id: string;
  name: string;
};

const SignInBtn = ({ id, name }: TProps) => {
  return <button onClick={() => signIn(id)}>Sign in with {name}</button>;
};

export default SignInBtn;

