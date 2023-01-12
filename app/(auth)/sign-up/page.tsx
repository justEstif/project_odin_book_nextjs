import Link from "next/link";
import AuthForm from "@/components/auth-form";
import styles from "../page.module.css";

type Props = {};

const Page = ({}: Props) => {
  return (
    <>
      <h2 className={styles.h2}>Welcome</h2>
      <AuthForm intent="sign-up" />
      <Link href="/sign-in" className={styles.link}>
        Already a member? Sign in
      </Link>
    </>
  );
};

export default Page;
