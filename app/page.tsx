"use client";
import { useSession } from "next-auth/react";

type Props = {};

const Page = ({}: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div>
      <div>Home Page</div>
      <div>{user?.name}</div>
    </div>
  );
};

export default Page;
