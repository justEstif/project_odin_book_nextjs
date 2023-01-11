import Link from "next/link";
import AuthForm from "@/components/auth-form";

type Props = {};

const Page = ({}: Props) => {
  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="font-sans text-2xl font-semibold text-primary-800">
          Welcome back
        </h1>
        <p className="text-lg text-secondary-600">Enter your email</p>
      </div>

      <AuthForm />
      <Link
        href="/sign-up"
        className="block text-center underline underline-offset-4 text-primary-800 hover:text-primary-500"
      >
        Not a member? Sign up
      </Link>
    </>
  );
};

export default Page;
