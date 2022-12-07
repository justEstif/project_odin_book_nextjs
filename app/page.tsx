"use client";
import { signIn } from "next-auth/react";
import styles from "./page.module.css";

export default function Home() {
  const signInEmail = async () => {
    await signIn("email", {
      email: "dolidej255@edinel.com",
    });
  };
  return (
    <div className={styles.container}>
      <button onClick={() => signIn("facebook")}>Facebook</button>
      <button onClick={() => signInEmail()}>Email</button>
    </div>
  );
}
