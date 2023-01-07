import Link from "next/link";
import AuthForm from "../(components)/AuthForm";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Welcome back</h1>
      <p>Enter your email to sign-in</p>

      <AuthForm />
      <p>
        Not a member?{" "}
        <Link href="/sign-up" className="underline hover:text-brand">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Page;
