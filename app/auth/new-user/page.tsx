"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Props = {};

const Page = ({}: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div>
      <h1>Profile</h1>
      <div>Created a new user</div>
      <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <Image
          width={100}
          height={100}
          src={user?.image || ""}
          alt="No image"
        />
      </div>
    </div>
  );
};

export default Page;

