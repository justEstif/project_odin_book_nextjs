import Link from "next/link";
import AuthForm from "@/components/auth-form";
import styles from "../page.module.css";

type Props = {};

const Page = ({}: Props) => {
  return (
    <>
      <h2 className={styles.h2}>Welcome back</h2>
      <AuthForm intent="sign-in" />
      <Link href="/sign-up" className={styles.link}>
        Not a member? Sign up
      </Link>
    </>
  );
};

export default Page;
