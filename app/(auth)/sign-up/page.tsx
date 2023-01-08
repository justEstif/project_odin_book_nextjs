import Link from "next/link";
import AuthForm from "@/components/auth-form";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Welcome back</h1>
      <p>Enter your email to sign-up</p>

      <AuthForm />
      <p>
        Already a member?{" "}
        <Link href="/sign-in" className="underline hover:text-brand">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Page;
