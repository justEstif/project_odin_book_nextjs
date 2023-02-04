import Link from "next/link";
import AuthForm from "@/components/auth-form";

type Props = {};

const Page = ({ }: Props) => {
  return (
    <main className="container flex flex-1 justify-center items-center mx-auto max-w-md">
      <h2 className="mb-4 text-3xl font-bold text-center text-primary-800">
        Welcome back
      </h2>
      <AuthForm intent="sign-in" />
      <Link
        href="/sign-up"
        className="block text-center underline underline-offset-4 text-primary-800 hover:text-primary-500"
      >
        Not a member? Sign up
      </Link>
    </main>
  );
};

export default Page;
