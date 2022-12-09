"use client";
import { signIn } from "next-auth/react";

export default function Home() {
  const signInEmail = async () => {
    await signIn("email", {
      email: "dolidej255@edinel.com",
    });
  };
  return (
    <div>
      <button onClick={() => signIn("facebook")}>Facebook</button>
      <button onClick={() => signInEmail()}>Email</button>
    </div>
  );
}
