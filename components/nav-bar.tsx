"use client";
import SignOutBtn from "@/components/signout-btn";
import { useSession } from "next-auth/react";
import { Link } from "phosphor-react";
type Props = {};

const NavBar = ({ }: Props) => {
  const { data: session } = useSession();
  return (
    <header className="flex gap-6 justify-between text-end">
      <p>OdinBook</p>
      <nav className="flex gap-6">
        <Link className="mb-2 text-xl font-bold" href="/users">
          Users
        </Link>
        {/* <Link */} {/*   className="mb-2 text-xl font-bold" */}
        {/*   href={`/users/${session?.user.id}`} */}
        {/* > */}
        {/*   Profile */}
        {/* </Link> */}
        <SignOutBtn />
      </nav>
    </header>
  );
};

export default NavBar;
