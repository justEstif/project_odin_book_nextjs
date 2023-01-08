import SignOutBtn from "@/components/signout-btn";
import Link from "next/link";

type Props = {};

const Page = ({ }: Props) => {
  return (
    <div>
      {/* <SignOutBtn /> */}
      <Link href="/api/auth/signout">Sign out</Link>
      <Link href="/api/auth/signin">Sign In</Link>
    </div>
  );
};

export default Page;
